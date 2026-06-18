import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { PROVIDER_LIST, getProvider } from '../config/aiProviders';
import type { ProviderId } from '../config/aiProviders';
import {
  getStudentAllocations,
  getApiKey,
  recordUsage,
  remaining,
  type Allocation,
} from '../utils/tokenAllocation';
import { chat, type ChatMessage } from '../utils/aiClient';
import { isOpenAccess } from '../config/openAccess';
import type { ReactElement } from 'react';

const CALLABLE = PROVIDER_LIST.filter((p) => p.api.callable);

interface UIMessage extends ChatMessage {
  tokens?: number;
}

const Playground = (): ReactElement => {
  const { user, profile } = useAuth();
  const { showToast } = useToast();
  const email = (profile?.email || user?.email || '').toLowerCase();

  const [allocations, setAllocations] = useState<Partial<Record<ProviderId, Allocation>>>({});
  const [provider, setProvider] = useState<ProviderId>('chatgpt');
  const [model, setModel] = useState<string>(getProvider('chatgpt')!.api.defaultModel);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reloadAllocations = useCallback(async () => {
    if (!email) return;
    setAllocations(await getStudentAllocations(email));
  }, [email]);

  useEffect(() => { reloadAllocations(); }, [reloadAllocations]);

  useEffect(() => {
    const p = getProvider(provider)!;
    setModel(p.api.defaultModel);
    setMessages([]);
  }, [provider]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const current = allocations[provider] ?? { allocated: 0, used: 0 };
  const left = remaining(current);
  const open = isOpenAccess(provider); // 오늘 공개 사용(배당 없이) 여부
  const canSend = open || left > 0;     // 전송 가능 여부

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    if (!open && left <= 0) {
      showToast('배당된 토큰이 모두 소진되었습니다. 강사에게 토큰 배당을 요청하세요.', 'warning');
      return;
    }

    const apiKey = await getApiKey(provider);
    if (!apiKey) {
      showToast(`${getProvider(provider)!.name} API 키가 아직 충전되지 않았습니다. 강사에게 문의하세요.`, 'error');
      return;
    }

    const nextMessages: UIMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages: ChatMessage[] = [
        { role: 'system', content: '너는 친절한 AI 학습 도우미야. 한국어로 명확하고 간결하게 답해줘.' },
        ...nextMessages.map((m) => ({ role: m.role, content: m.content })),
      ];
      const result = await chat(provider, apiKey, model, apiMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: result.text, tokens: result.tokens }]);

      await recordUsage(email, provider, result.tokens);
      await reloadAllocations();

      if (!open && result.tokens >= left) {
        showToast('이번 응답으로 배당 토큰을 모두 사용했습니다.', 'warning');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '요청 중 오류가 발생했습니다.';
      setMessages((prev) => [...prev, { role: 'assistant', content: `⚠️ ${msg}` }]);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const pct = current.allocated > 0 ? Math.min(100, Math.round((current.used / current.allocated) * 100)) : 0;

  return (
    <>
      <SEOHead title="AI 실습실" description="배당된 토큰으로 유료 AI 모델을 직접 실습하는 공간" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Playground</div>
          <h2>AI 실습실</h2>
          <p>강사가 배당한 토큰만큼 유료 AI 모델을 직접 호출해 보세요. 사용한 토큰은 자동 차감됩니다.</p>
        </div>
      </section>

      <section className="section-ed" style={{ paddingTop: 'var(--s-6)' }}>
        <div className="container">
          <div className="aifree-pg">
            {/* 사이드: 토큰 잔여량 */}
            <aside className="aifree-pg-side">
              <div className="aifree-pg-side-title">나의 토큰 잔여량</div>
              <div className="aifree-pg-user">{email || '로그인이 필요합니다'}</div>

              {CALLABLE.map((p) => {
                const a = allocations[p.id] ?? { allocated: 0, used: 0 };
                const r = remaining(a);
                const isActive = p.id === provider;
                const pOpen = isOpenAccess(p.id);
                return (
                  <button
                    key={p.id}
                    className={`aifree-pg-prov${isActive ? ' active' : ''}`}
                    onClick={() => setProvider(p.id)}
                    style={isActive ? { borderColor: p.color } : undefined}
                  >
                    <div className="aifree-pg-prov-top">
                      <span><i className={p.icon} style={{ color: p.color }} /> {p.name}</span>
                      <span className="aifree-pg-prov-left">{pOpen ? '공개' : r.toLocaleString()}</span>
                    </div>
                    <div className="aifree-pg-bar">
                      <div
                        className="aifree-pg-bar-fill"
                        style={{
                          width: `${pOpen ? 100 : a.allocated > 0 ? Math.min(100, (a.used / a.allocated) * 100) : 0}%`,
                          background: p.color,
                        }}
                      />
                    </div>
                    <div className="aifree-pg-prov-meta">
                      {pOpen ? '오늘 배당 없이 공개 사용' : `배당 ${a.allocated.toLocaleString()} · 사용 ${a.used.toLocaleString()}`}
                    </div>
                  </button>
                );
              })}

              <div className="aifree-note" style={{ marginTop: 'var(--s-5)' }}>
                <i className="fa-solid fa-circle-info" />
                <div>토큰이 부족하면 무료요금제로 먼저 연습하세요. <Link to="/tools">무료 가이드 보기</Link></div>
              </div>
            </aside>

            {/* 메인: 채팅 */}
            <div className="aifree-pg-main">
              <div className="aifree-pg-bar-top">
                <div className="aifree-pg-model">
                  <i className={getProvider(provider)!.icon} style={{ color: getProvider(provider)!.color }} />
                  <select value={model} onChange={(e) => setModel(e.target.value)}>
                    {getProvider(provider)!.api.models.map((m) => (
                      <option key={m.id} value={m.id}>{m.label}{m.note ? ` — ${m.note}` : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="aifree-pg-quota">
                  {open ? (
                    <span className="aifree-pg-open"><i className="fa-solid fa-unlock" /> 오늘 공개 사용 중</span>
                  ) : (
                    <>
                      잔여 <strong>{left.toLocaleString()}</strong> 토큰
                      <span className="aifree-pg-quota-pct">({pct}% 사용)</span>
                    </>
                  )}
                </div>
              </div>

              <div className="aifree-pg-chat" ref={scrollRef}>
                {messages.length === 0 && (
                  <div className="aifree-pg-empty">
                    <i className={getProvider(provider)!.icon} style={{ fontSize: '32px', color: getProvider(provider)!.color }} />
                    <p>{getProvider(provider)!.name}에게 무엇이든 물어보세요.</p>
                    <span>예: "신제품 홍보 문구 3가지 만들어줘"</span>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`aifree-msg aifree-msg-${m.role}`}>
                    <div className="aifree-msg-role">
                      {m.role === 'user' ? '나' : getProvider(provider)!.name}
                      {typeof m.tokens === 'number' && (
                        <span className="aifree-msg-tokens">-{m.tokens.toLocaleString()} 토큰</span>
                      )}
                    </div>
                    <div className="aifree-msg-content">{m.content}</div>
                  </div>
                ))}
                {loading && (
                  <div className="aifree-msg aifree-msg-assistant">
                    <div className="aifree-msg-role">{getProvider(provider)!.name}</div>
                    <div className="aifree-msg-content"><span className="aifree-typing"><i /><i /><i /></span></div>
                  </div>
                )}
              </div>

              <div className="aifree-pg-input">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={canSend ? '메시지를 입력하세요 (Enter 전송, Shift+Enter 줄바꿈)' : '배당된 토큰이 없습니다 — 강사에게 문의하세요'}
                  rows={2}
                  disabled={loading || !email}
                />
                <button className="btn btn-primary" onClick={send} disabled={loading || !input.trim() || !canSend || !email}>
                  {loading ? '응답 중…' : '전송'}
                </button>
              </div>
              {!email && (
                <p className="aifree-pg-login-hint">
                  실습실을 사용하려면 <Link to="/login">로그인</Link>이 필요합니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Playground;
