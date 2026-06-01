-- =============================================
-- aifree_settings 테이블 (선택)
-- 강사 API 키 충전 + 학생 토큰 배당(JSON) 저장용
-- Supabase SQL Editor에서 실행하세요.
--
-- ⚠️ 보안 주의:
--   - 이 테이블은 클라이언트에서 API 키를 읽어 직접 호출하는 구조이므로
--     폐쇄된 교육용 프로젝트에서만 사용하세요.
--   - 운영 환경에서는 API 키를 SELECT로 노출하지 말고,
--     Edge Function 프록시를 통해 호출하도록 변경하는 것을 권장합니다.
-- =============================================

CREATE TABLE IF NOT EXISTS aifree_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE aifree_settings ENABLE ROW LEVEL SECURITY;

-- 로그인 사용자만 읽기 (배당 조회 + 실습실 호출에 필요)
CREATE POLICY "aifree_settings_auth_select"
  ON aifree_settings FOR SELECT
  USING (auth.role() = 'authenticated');

-- 관리자(강사)만 쓰기
CREATE POLICY "aifree_settings_admin_insert"
  ON aifree_settings FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin','superadmin'))
  );

CREATE POLICY "aifree_settings_admin_update"
  ON aifree_settings FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin','superadmin'))
  );

CREATE POLICY "aifree_settings_admin_delete"
  ON aifree_settings FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin','superadmin'))
  );
