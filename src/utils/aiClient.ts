/**
 * aiClient.ts — 실습실에서 각 AI API를 직접 호출하는 클라이언트
 *
 * 강사가 충전한 API 키로 브라우저에서 직접 호출하고, 응답에 포함된
 * 토큰 사용량(usage)을 반환합니다. 반환된 토큰량은 학생 배당에서 차감됩니다.
 *
 * 지원: OpenAI(ChatGPT), Anthropic(Claude), Google(Gemini)
 * 미지원: Genspark (공개 Chat API 없음)
 */

import type { ProviderId } from '../config/aiProviders';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResult {
  text: string;
  tokens: number; // 총 사용 토큰 (입력+출력)
}

const MAX_TOKENS = 1024;

/** 대략적 토큰 추정 (usage 미제공 시 폴백) */
function estimateTokens(messages: ChatMessage[], reply: string): number {
  const all = messages.map((m) => m.content).join(' ') + ' ' + reply;
  // 한글/영문 혼합 대략치: 4자 ≒ 1토큰
  return Math.ceil(all.length / 4);
}

async function callOpenAI(apiKey: string, model: string, messages: ChatMessage[]): Promise<ChatResult> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: MAX_TOKENS }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || `OpenAI 오류 (${res.status})`);
  const text = data.choices?.[0]?.message?.content ?? '';
  const tokens = data.usage?.total_tokens ?? estimateTokens(messages, text);
  return { text, tokens };
}

async function callAnthropic(apiKey: string, model: string, messages: ChatMessage[]): Promise<ChatResult> {
  // system 메시지는 별도 필드로 분리
  const system = messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n');
  const chat = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({ role: m.role, content: m.content }));

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS,
      ...(system ? { system } : {}),
      messages: chat,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || `Anthropic 오류 (${res.status})`);
  const text = Array.isArray(data.content)
    ? data.content.map((c: { text?: string }) => c.text || '').join('')
    : '';
  const usage = data.usage || {};
  const tokens = (usage.input_tokens ?? 0) + (usage.output_tokens ?? 0) || estimateTokens(messages, text);
  return { text, tokens };
}

async function callGemini(apiKey: string, model: string, messages: ChatMessage[]): Promise<ChatResult> {
  const systemText = messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n');
  const contents = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...(systemText ? { systemInstruction: { parts: [{ text: systemText }] } } : {}),
      contents,
      generationConfig: { maxOutputTokens: MAX_TOKENS },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || `Gemini 오류 (${res.status})`);
  const text =
    data.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') ?? '';
  const tokens = data.usageMetadata?.totalTokenCount ?? estimateTokens(messages, text);
  return { text, tokens };
}

/** provider별 호출 라우팅 */
export async function chat(
  provider: ProviderId,
  apiKey: string,
  model: string,
  messages: ChatMessage[]
): Promise<ChatResult> {
  switch (provider) {
    case 'chatgpt':
      return callOpenAI(apiKey, model, messages);
    case 'claude':
      return callAnthropic(apiKey, model, messages);
    case 'gemini':
      return callGemini(apiKey, model, messages);
    default:
      throw new Error('이 AI는 실습실 API 호출을 지원하지 않습니다.');
  }
}
