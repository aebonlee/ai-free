/**
 * openAccess.ts — "오늘 공개 사용" 설정
 *
 * 특정 AI provider를 로그인한 사용자 전원에게 토큰 배당 없이 개방합니다.
 * (Supabase에 등록된 강사 API 키를 그대로 사용 — RLS상 로그인 사용자만 키를 읽으므로
 *  로그인은 여전히 필요합니다.)
 *
 *  - providers : 배당 없이 개방할 provider 목록
 *  - until     : 'YYYY-MM-DD' (이 날짜까지 포함 개방, 다음 날 자동 종료) · null이면 무기한
 *
 * 공개를 끄려면 providers 를 빈 배열로 두거나 until 을 지난 날짜로 바꾸세요.
 */

import type { ProviderId } from './aiProviders';

export const OPEN_ACCESS: {
  providers: ProviderId[];
  until: string | null;
} = {
  providers: ['chatgpt'],
  until: '2026-06-18', // 오늘 하루 공개, 익일 0시(현지) 자동 종료
};

/** 해당 provider가 지금 배당 없이 공개 사용 가능한지 */
export function isOpenAccess(provider: ProviderId): boolean {
  if (!OPEN_ACCESS.providers.includes(provider)) return false;
  if (!OPEN_ACCESS.until) return true;
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  return today <= OPEN_ACCESS.until;
}
