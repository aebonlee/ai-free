-- =====================================================================
-- 회원가입 복구 — "Database error saving new user" (HTTP 500) 해결
-- 적용일: 2026-06-19 (운영 DB에 적용 완료)
-- =====================================================================
-- [증상]
--   /auth/v1/signup → 500 "Database error saving new user"
--   이메일·구글·카카오 가입 전면 불가. 단일 공유 Supabase 프로젝트라
--   해당 프로젝트의 모든 하위 사이트(111+)가 동시에 영향.
--
-- [근본 원인]
--   auth.users 에는 사이트별 AFTER INSERT 트리거가 12개 걸려 있고,
--   신규 가입 시 전부 실행된다. 이 중 하나라도 실패하면 트랜잭션 전체가
--   롤백되어 가입이 막힌다.
--
--   GoTrue는 `supabase_auth_admin` 롤(= search_path=auth)로 트리거를 실행한다.
--   그런데 일부 핸들러 함수가
--     (1) `SET search_path` 미고정(proconfig=null) 이고
--     (2) 대상 테이블을 스키마 없이 참조(`tpl_profiles`, `www_members`)
--     (3) 예외 처리(EXCEPTION)도 없음
--   → search_path=auth 에서 `auth.tpl_profiles` 로 해석되어
--     "relation does not exist" 발생 → 가입 롤백.
--
--   ※ postgres(superuser, search_path 에 public 포함)로 테스트하면 통과하므로
--     원인 파악이 까다로웠음. supabase_auth_admin 의 search_path=auth 가 핵심.
--
-- [조치] 문제 함수 2개를 재정의:
--   - SET search_path = public 고정
--   - 테이블 스키마 명시(public.)
--   - EXCEPTION 처리 추가(프로필 생성 실패가 가입을 막지 못하도록 방어)
--   create or replace 라 기존 트리거는 그대로 유지됨(함수 oid 참조).
-- =====================================================================

create or replace function public.tpl_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $fn$
begin
  insert into public.tpl_profiles (id, email, display_name, avatar_url)
  values (new.id, new.email,
          coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'),
          new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
exception when others then
  raise warning 'tpl_handle_new_user failed for %: %', new.email, sqlerrm;
  return new;
end; $fn$;

create or replace function public.www_handle_new_member()
returns trigger language plpgsql security definer set search_path = public as $fn$
begin
  insert into public.www_members (id, email, display_name, avatar_url)
  values (new.id, new.email,
          coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'),
          new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
exception when others then
  raise warning 'www_handle_new_member failed for %: %', new.email, sqlerrm;
  return new;
end; $fn$;

-- =====================================================================
-- [예방 권고] auth.users 에 트리거를 추가하는 모든 사이트는 핸들러 함수에
--   반드시 `SET search_path = public` + 스키마 명시 + EXCEPTION 처리를 둘 것.
--   하나의 깨진 트리거가 공유 프로젝트 전체의 회원가입을 마비시킨다.
--
-- [점검 쿼리] search_path 미고정 핸들러 탐지:
--   select p.proname, p.proconfig
--   from pg_trigger t join pg_proc p on p.oid=t.tgfoid
--   where t.tgrelid='auth.users'::regclass and not t.tgisinternal
--     and (p.proconfig is null
--          or not exists (select 1 from unnest(p.proconfig) c where c like 'search_path=%'));
-- =====================================================================
