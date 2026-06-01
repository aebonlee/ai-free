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
 * 보안 주의: API 키를 브라우저에서 직접 사용하므로 폐쇄된 교육용 환경에서만
 * 사용하세요. 운영 환경에서는 서버(Edge Function) 프록시 사용을 권장합니다.
 */

import { getSetting, setSetting } from './settings';
import type { ProviderId } from '../config/aiProviders';

export interface Allocation {
  allocated: number; // 배당 토큰
  used: number;      // 사용 토큰
}

/** email → provider → Allocation */
export type AllocationMap = Record<string, Partial<Record<ProviderId, Allocation>>>;

const LS_KEYS = 'aifree_apikeys';
const LS_ALLOC = 'aifree_allocations';
const SETTING_ALLOC = 'allocations';
const settingKeyName = (p: ProviderId) => `apikey_${p}`;

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

/* ─────────────── 배당 맵 ─────────────── */

export async function getAllocationMap(): Promise<AllocationMap> {
  if (hasSupabase()) {
    const raw = await getSetting(SETTING_ALLOC);
    if (raw) {
      try {
        return JSON.parse(raw) as AllocationMap;
      } catch {
        /* fall through */
      }
    }
  }
  return lsGet<AllocationMap>(LS_ALLOC, {});
}

async function saveAllocationMap(map: AllocationMap): Promise<void> {
  if (hasSupabase()) {
    try {
      await setSetting(SETTING_ALLOC, JSON.stringify(map));
      return;
    } catch {
      /* fall back */
    }
  }
  lsSet(LS_ALLOC, map);
}

/** 학생 한 명의 특정 provider 배당 조회 */
export async function getAllocation(email: string, provider: ProviderId): Promise<Allocation> {
  const map = await getAllocationMap();
  return map[normEmail(email)]?.[provider] ?? { allocated: 0, used: 0 };
}

/** 학생 한 명의 전체 배당 조회 */
export async function getStudentAllocations(email: string): Promise<Partial<Record<ProviderId, Allocation>>> {
  const map = await getAllocationMap();
  return map[normEmail(email)] ?? {};
}

/** 배당량 설정(절대값) — 강사 전용 */
export async function setAllocation(email: string, provider: ProviderId, allocated: number): Promise<void> {
  const e = normEmail(email);
  const map = await getAllocationMap();
  if (!map[e]) map[e] = {};
  const prev = map[e][provider] ?? { allocated: 0, used: 0 };
  map[e][provider] = { allocated: Math.max(0, Math.floor(allocated)), used: prev.used };
  await saveAllocationMap(map);
}

/** 사용량 차감 기록 — 호출 후 실제 사용 토큰만큼 증가 */
export async function recordUsage(email: string, provider: ProviderId, tokens: number): Promise<Allocation> {
  const e = normEmail(email);
  const map = await getAllocationMap();
  if (!map[e]) map[e] = {};
  const prev = map[e][provider] ?? { allocated: 0, used: 0 };
  const next: Allocation = { allocated: prev.allocated, used: prev.used + Math.max(0, Math.ceil(tokens)) };
  map[e][provider] = next;
  await saveAllocationMap(map);
  return next;
}

/** 사용량 초기화 — 강사 전용 */
export async function resetUsage(email: string, provider: ProviderId): Promise<void> {
  const e = normEmail(email);
  const map = await getAllocationMap();
  if (map[e]?.[provider]) {
    map[e][provider]!.used = 0;
    await saveAllocationMap(map);
  }
}

/** 학생 삭제 — 강사 전용 */
export async function removeStudent(email: string): Promise<void> {
  const e = normEmail(email);
  const map = await getAllocationMap();
  delete map[e];
  await saveAllocationMap(map);
}

/** 남은 토큰 */
export function remaining(a: Allocation): number {
  return Math.max(0, a.allocated - a.used);
}
