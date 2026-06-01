-- =====================================================================
--  AI Free Academy — Supabase 설정 스크립트 (접두사 aifree_ 전용)
--
--  이 프로젝트는 DreamIT Biz의 여러 사이트가 공유하는 Supabase를 사용합니다.
--  → 공용 인증 인프라(`user_profiles` 테이블, `check_user_status` 함수,
--     `media` Storage 버킷 등)는 부모/다스코 설정으로 "이미 존재"하므로
--     여기서 다시 만들지 않습니다(데이터·트리거 충돌 방지).
--  → 이 스크립트는 본 사이트 전용 접두사 테이블 `aifree_settings` 만 생성합니다.
--
--  Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요. (멱등 — 재실행 안전)
--
--  ⚠️ 보안: 실습실은 클라이언트에서 API 키로 직접 호출합니다(폐쇄 교육용 전제).
--     운영 환경에서는 Edge Function 프록시로 키를 숨기는 것을 권장합니다.
-- =====================================================================


-- =====================================================================
--  aifree_settings — 강사 API 키 + 학생 토큰 배당 저장
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

-- 쓰기(INSERT): 강사 전체 OR 학생 본인 배당 키(alloc_<본인 이메일>)
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
--  강사(관리자) 지정 — 공용 user_profiles 의 role 을 'admin' 으로
--  (해당 강사가 한 번 로그인해 user_profiles 행이 생성된 뒤 실행)
--  앱 메뉴 노출은 src/config/admin.ts 의 ADMIN_EMAILS 로도 제어됩니다.
-- =====================================================================
UPDATE public.user_profiles
   SET role = 'admin'
 WHERE lower(email) IN (
   'aebon@kakao.com',
   'aebon@kyonggi.ac.kr',
   'radical8566@gmail.com'
 );

-- 완료!  (공용 user_profiles / check_user_status / media 버킷은 부모 설정 사용)
