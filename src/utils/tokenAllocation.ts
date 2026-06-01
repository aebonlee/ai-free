/**
 * tokenAllocation.ts — 토큰 배당 & API 키 관리
 *
 * 강사(관리자)가 각 AI에 API 키를 "충전"해 두고, 학생별로 토큰량을 배당하면
 * 학생은 배당된 만큼 실습실(Playground)에서 유료 모델을 사용할 수 있습니다.
 * 사용한 토큰은 차감되어 배당량을 초과하면 더 이상 호출되지 않습니다.
 *
 * 저장소:
 *  - Supabase(`aifree_settings`)가 설정되어 있으면 그곳에 저장 → 여러 기기/학생 공유
 *  - 없으면 localStorage로 폴백 → 단일 브라우저 데모용
 *
 * 동시성: 학생별 배당은 `alloc_${email}` 개별 키에 저장합니다. 각 학생의 사용량
 * 기록(recordUsage)이 자기 키만 갱신하므로, 여러 학생이 동시에 실습실을 사용해도
 * 서로의 잔여량을 덮어쓰는 경쟁 상태(Lost Update)가 발생하지 않습니다.
 *
 * 보안 주의: API 키를 브라우저에서 직접 사용하므로 폐쇄된 교육용 환경에서만
 * 사용하세요. 운영 환경에서는 서버(Edge Function) 프록시 사용을 권장합니다.
 */

import { getSetting, setSetting, deleteSetting, getSettingsByPrefix } from './settings';
import type { ProviderId } from '../config/aiProviders';

export interface Allocation {
  allocated: number; // 배당 토큰
  used: number;      // 사용 토큰
}

/** provider → Allocation (학생 1명) */
export type StudentAllocations = Partial<Record<ProviderId, Allocation>>;

/** email → provider → Allocation (전체) */
export type AllocationMap = Record<string, StudentAllocations>;

const LS_KEYS = 'aifree_apikeys';
const LS_ALLOC = 'aifree_allocations';
const ALLOC_PREFIX = 'alloc_';
const settingKeyName = (p: ProviderId) => `apikey_${p}`;
const allocKey = (email: string) => `${ALLOC_PREFIX}${email}`;

/* ─────────────── localStorage helpers ─────────────── */

function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

function hasSupabase(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

const normEmail = (email: string) => email.trim().toLowerCase();

/* ─────────────── API 키 (강사 충전) ─────────────── */

export async function getApiKey(provider: ProviderId): Promise<string | null> {
  if (hasSupabase()) {
    const v = await getSetting(settingKeyName(provider));
    if (v) return v;
  }
  const keys = lsGet<Record<string, string>>(LS_KEYS, {});
  return keys[provider] || null;
}

export async function setApiKey(provider: ProviderId, key: string): Promise<void> {
  const trimmed = key.trim();
  if (hasSupabase()) {
    try {
      await setSetting(settingKeyName(provider), trimmed);
      return;
    } catch {
      /* fall back to localStorage */
    }
  }
  const keys = lsGet<Record<string, string>>(LS_KEYS, {});
  if (trimmed) keys[provider] = trimmed;
  else delete keys[provider];
  lsSet(LS_KEYS, keys);
}

/** 키 설정 여부만 확인 (값 노출 없이) */
export async function isKeyConfigured(provider: ProviderId): Promise<boolean> {
  const k = await getApiKey(provider);
  return Boolean(k);
}

/* ─────────────── 학생별 배당 (개별 키) ─────────────── */

/** 학생 한 명의 전체 배당 조회 */
export async function getStudentAllocations(email: string): Promise<StudentAllocations> {
  const e = normEmail(email);
  if (hasSupabase()) {
    const raw = await getSetting(allocKey(e));
    if (raw) {
      try {
        return JSON.parse(raw) as StudentAllocations;
      } catch {
        /* fall through to localStorage */
      }
    }
    // Supabase 사용 중이면 학생 키가 없으면 빈 값 (localStorage 혼용 방지)
    return {};
  }
  const map = lsGet<AllocationMap>(LS_ALLOC, {});
  return map[e] ?? {};
}

/** 학생 한 명의 배당 전체 저장 (자기 키만 갱신 → 학생 간 경쟁 상태 없음) */
async function saveStudentAllocations(email: string, allocs: StudentAllocations): Promise<void> {
  const e = normEmail(email);
  if (hasSupabase()) {
    try {
      await setSetting(allocKey(e), JSON.stringify(allocs));
      return;
    } catch {
      /* fall back to localStorage */
    }
  }
  const map = lsGet<AllocationMap>(LS_ALLOC, {});
  map[e] = allocs;
  lsSet(LS_ALLOC, map);
}

/** 학생 한 명의 특정 provider 배당 조회 */
export async function getAllocation(email: string, provider: ProviderId): Promise<Allocation> {
  const allocs = await getStudentAllocations(email);
  return allocs[provider] ?? { allocated: 0, used: 0 };
}

/** 전체 배당 맵 조회 — 강사 화면용 */
export async function getAllocationMap(): Promise<AllocationMap> {
  if (hasSupabase()) {
    const rows = await getSettingsByPrefix(ALLOC_PREFIX);
    const map: AllocationMap = {};
    for (const { key, value } of rows) {
      const email = key.slice(ALLOC_PREFIX.length);
      try {
        map[email] = JSON.parse(value) as StudentAllocations;
      } catch {
        map[email] = {};
      }
    }
    return map;
  }
  return lsGet<AllocationMap>(LS_ALLOC, {});
}

/** 배당량 설정(절대값) — 강사 전용 */
export async function setAllocation(email: string, provider: ProviderId, allocated: number): Promise<void> {
  const allocs = await getStudentAllocations(email);
  const prev = allocs[provider] ?? { allocated: 0, used: 0 };
  allocs[provider] = { allocated: Math.max(0, Math.floor(allocated)), used: prev.used };
  await saveStudentAllocations(email, allocs);
}

/** 여러 provider 배당을 한 번에 설정 — 단일 저장(네트워크 왕복 1회) */
export async function setStudentAllocations(
  email: string,
  amounts: Partial<Record<ProviderId, number>>
): Promise<void> {
  const allocs = await getStudentAllocations(email);
  for (const [pid, amount] of Object.entries(amounts) as [ProviderId, number][]) {
    const prev = allocs[pid] ?? { allocated: 0, used: 0 };
    allocs[pid] = { allocated: Math.max(0, Math.floor(amount)), used: prev.used };
  }
  await saveStudentAllocations(email, allocs);
}

/** 사용량 차감 기록 — 호출 후 실제 사용 토큰만큼 증가 (자기 키만 갱신) */
export async function recordUsage(email: string, provider: ProviderId, tokens: number): Promise<Allocation> {
  const allocs = await getStudentAllocations(email);
  const prev = allocs[provider] ?? { allocated: 0, used: 0 };
  const next: Allocation = { allocated: prev.allocated, used: prev.used + Math.max(0, Math.ceil(tokens)) };
  allocs[provider] = next;
  await saveStudentAllocations(email, allocs);
  return next;
}

/** 사용량 초기화 — 강사 전용 */
export async function resetUsage(email: string, provider: ProviderId): Promise<void> {
  const allocs = await getStudentAllocations(email);
  if (allocs[provider]) {
    allocs[provider]!.used = 0;
    await saveStudentAllocations(email, allocs);
  }
}

/** 학생 삭제 — 강사 전용 */
export async function removeStudent(email: string): Promise<void> {
  const e = normEmail(email);
  if (hasSupabase()) {
    try {
      await deleteSetting(allocKey(e));
      return;
    } catch {
      /* fall back */
    }
  }
  const map = lsGet<AllocationMap>(LS_ALLOC, {});
  delete map[e];
  lsSet(LS_ALLOC, map);
}

/** 남은 토큰 */
export function remaining(a: Allocation): number {
  return Math.max(0, a.allocated - a.used);
}
