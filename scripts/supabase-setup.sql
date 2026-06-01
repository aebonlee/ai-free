-- =====================================================================
--  AI Free Academy — Supabase 설정 스크립트
--  Supabase 대시보드 → SQL Editor 에 붙여넣고 한 번에 실행하세요.
--  (멱등 작성 — 여러 번 실행해도 안전)
--
--  .env 설정:
--    VITE_SUPABASE_URL=https://<project>.supabase.co
--    VITE_SUPABASE_ANON_KEY=<anon key>
--  → Supabase가 설정되면 토큰 배당/API 키가 DB에 저장되어 기기 간 공유됩니다.
--    (미설정 시 localStorage로 동작 — 단일 브라우저 데모)
--
--  ⚠️ 보안: 실습실은 클라이언트에서 API 키로 직접 호출합니다(폐쇄 교육용 전제).
--     운영 환경에서는 Edge Function 프록시로 키를 숨기는 것을 권장합니다.
-- =====================================================================


-- =====================================================================
-- 1) user_profiles — 로그인/프로필 (상속된 인증 인프라가 사용)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT,
  name            TEXT,
  display_name    TEXT,
  avatar_url      TEXT,
  phone           TEXT,
  provider        TEXT,
  role            TEXT DEFAULT 'member',
  signup_domain   TEXT,
  visited_sites   TEXT[] DEFAULT '{}',
  last_sign_in_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 본인 프로필 읽기 (+ 강사는 전체 읽기)
DROP POLICY IF EXISTS "user_profiles_select" ON public.user_profiles;
CREATE POLICY "user_profiles_select" ON public.user_profiles
  FOR SELECT USING (
    auth.uid() = id
    OR EXISTS (SELECT 1 FROM public.user_profiles p
               WHERE p.id = auth.uid() AND p.role IN ('admin','superadmin'))
  );

-- 본인 프로필 생성/수정
DROP POLICY IF EXISTS "user_profiles_insert" ON public.user_profiles;
CREATE POLICY "user_profiles_insert" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "user_profiles_update" ON public.user_profiles;
CREATE POLICY "user_profiles_update" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- (선택) 신규 가입 시 프로필 자동 생성 트리거
-- 앱에서도 자동 생성하므로 필수는 아니지만, 켜두면 더 견고합니다.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name, display_name, provider, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email'),
    'member'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =====================================================================
-- 2) check_user_status — 계정 상태 확인 RPC (앱이 로그인 시 호출)
--    기본은 'active' 반환. 차단/정지 정책이 필요하면 여기서 확장하세요.
-- =====================================================================
CREATE OR REPLACE FUNCTION public.check_user_status(target_user_id UUID, current_domain TEXT)
RETURNS JSONB LANGUAGE sql STABLE AS $$
  SELECT jsonb_build_object('status', 'active', 'reason', '', 'suspended_until', NULL);
$$;

GRANT EXECUTE ON FUNCTION public.check_user_status(UUID, TEXT) TO anon, authenticated;


-- =====================================================================
-- 3) aifree_settings — 강사 API 키 + 학생 토큰 배당 저장
--    key 규칙:
--      apikey_<provider>  : 강사 API 키 (강사만 읽기/쓰기)
--      alloc_<email>      : 학생별 배당 JSON (본인/강사만 쓰기)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.aifree_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.aifree_settings ENABLE ROW LEVEL SECURITY;

-- 읽기: 로그인 사용자 전체 (배당 조회 + 실습실 호출에 필요)
DROP POLICY IF EXISTS "aifree_settings_select" ON public.aifree_settings;
CREATE POLICY "aifree_settings_select" ON public.aifree_settings
  FOR SELECT USING (auth.role() = 'authenticated');

-- 쓰기(INSERT): 강사 전체 OR 학생 본인 배당 키
DROP POLICY IF EXISTS "aifree_settings_insert" ON public.aifree_settings;
CREATE POLICY "aifree_settings_insert" ON public.aifree_settings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role IN ('admin','superadmin'))
    OR key = 'alloc_' || lower(auth.jwt() ->> 'email')
  );

-- 쓰기(UPDATE): 강사 전체 OR 학생 본인 배당 키
DROP POLICY IF EXISTS "aifree_settings_update" ON public.aifree_settings;
CREATE POLICY "aifree_settings_update" ON public.aifree_settings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role IN ('admin','superadmin'))
    OR key = 'alloc_' || lower(auth.jwt() ->> 'email')
  );

-- 삭제: 강사만
DROP POLICY IF EXISTS "aifree_settings_delete" ON public.aifree_settings;
CREATE POLICY "aifree_settings_delete" ON public.aifree_settings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role IN ('admin','superadmin'))
  );


-- =====================================================================
-- 4) 강사(관리자) 지정
--    아래 이메일로 로그인하면 '토큰 배당 관리' 메뉴가 보입니다.
--    (앱의 src/config/admin.ts ADMIN_EMAILS 와 함께, DB role도 맞춰두면
--     RLS상 강사 권한이 적용됩니다.)
-- =====================================================================
-- 먼저 해당 강사가 한 번 로그인해 user_profiles 행이 생성된 뒤 실행하세요.
UPDATE public.user_profiles
   SET role = 'admin'
 WHERE lower(email) IN (
   'aebon@kakao.com',
   'aebon@kyonggi.ac.kr',
   'radical8566@gmail.com'
 );


-- =====================================================================
-- 5) (선택) 이미지 업로드용 Storage 버킷
--    프로필 이미지 등 업로드 기능을 쓸 때만 필요합니다.
-- =====================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "media_public_read" ON storage.objects;
CREATE POLICY "media_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

DROP POLICY IF EXISTS "media_auth_write" ON storage.objects;
CREATE POLICY "media_auth_write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- 완료!
