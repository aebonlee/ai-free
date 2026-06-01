-- =============================================
-- aifree_settings 테이블 (선택)
-- 저장 항목:
--   - apikey_<provider>  : 강사 API 키 (강사만 읽기/쓰기)
--   - alloc_<email>      : 학생별 토큰 배당 JSON (본인/강사만 쓰기)
-- Supabase SQL Editor에서 실행하세요.
--
-- ⚠️ 보안 주의:
--   - 실습실은 클라이언트에서 API 키를 읽어 직접 호출하는 구조이므로
--     폐쇄된 교육용 프로젝트에서만 사용하세요.
--   - 운영 환경에서는 API 키를 클라이언트에 노출하지 말고,
--     Edge Function 프록시를 통해 호출하도록 변경하는 것을 권장합니다.
-- =============================================

CREATE TABLE IF NOT EXISTS aifree_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE aifree_settings ENABLE ROW LEVEL SECURITY;

-- 헬퍼: 현재 사용자가 강사(관리자)인지
-- (user_profiles.role 이 admin/superadmin 인 경우)
-- 정책 내에서 EXISTS 서브쿼리로 직접 확인합니다.

-- ── 읽기: 로그인 사용자 전체 (배당 조회 + 실습실 호출에 필요) ──
CREATE POLICY "aifree_settings_auth_select"
  ON aifree_settings FOR SELECT
  USING (auth.role() = 'authenticated');

-- ── 쓰기(INSERT): 강사 전체 OR 학생 본인 배당 키(alloc_<본인 이메일>) ──
CREATE POLICY "aifree_settings_insert"
  ON aifree_settings FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin','superadmin'))
    OR key = 'alloc_' || lower(auth.jwt() ->> 'email')
  );

-- ── 쓰기(UPDATE): 강사 전체 OR 학생 본인 배당 키 ──
CREATE POLICY "aifree_settings_update"
  ON aifree_settings FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin','superadmin'))
    OR key = 'alloc_' || lower(auth.jwt() ->> 'email')
  );

-- ── 삭제: 강사만 ──
CREATE POLICY "aifree_settings_admin_delete"
  ON aifree_settings FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin','superadmin'))
  );

-- 참고: 학생은 본인 'alloc_<email>' 행만 쓸 수 있으므로 강사가 정한 배당량을
-- 임의로 늘릴 수 있습니다(used 차감만이 목적). 부정 사용을 막아야 한다면
-- 사용량 기록을 Edge Function으로 옮겨 서버에서 검증하세요.
