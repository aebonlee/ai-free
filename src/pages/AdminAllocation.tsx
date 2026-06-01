import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { PROVIDER_LIST } from '../config/aiProviders';
import type { ProviderId } from '../config/aiProviders';
import {
  getAllocationMap,
  setAllocation,
  setApiKey,
  isKeyConfigured,
  resetUsage,
  removeStudent,
  remaining,
  type AllocationMap,
} from '../utils/tokenAllocation';
import type { ReactElement } from 'react';

const CALLABLE = PROVIDER_LIST.filter((p) => p.api.callable);

const AdminAllocation = (): ReactElement => {
  const { isAdmin, loading } = useAuth();
  const { showToast } = useToast();

  const [map, setMap] = useState<AllocationMap>({});
  const [keyStatus, setKeyStatus] = useState<Partial<Record<ProviderId, boolean>>>({});
  const [keyDraft, setKeyDraft] = useState<Partial<Record<ProviderId, string>>>({});

  const [newEmail, setNewEmail] = useState('');
  const [newAmounts, setNewAmounts] = useState<Partial<Record<ProviderId, string>>>({});

  const reload = useCallback(async () => {
    setMap(await getAllocationMap());
    const status: Partial<Record<ProviderId, boolean>> = {};
    for (const p of CALLABLE) status[p.id] = await isKeyConfigured(p.id);
    setKeyStatus(status);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  if (loading) {
    return <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div className="loading-spinner" /></div>;
  }

  if (!isAdmin) {
    return (
      <section className="section-ed">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--s-9) 0' }}>
          <h2>강사 전용 페이지</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>토큰 배당 관리는 강사(관리자) 계정만 접근할 수 있습니다.</p>
          <Link className="btn btn-primary" to="/">홈으로</Link>
        </div>
      </section>
    );
  }

  const saveKey = async (pid: ProviderId) => {
    const v = (keyDraft[pid] || '').trim();
    if (!v) { showToast('API 키를 입력하세요.', 'warning'); return; }
    await setApiKey(pid, v);
    setKeyDraft((d) => ({ ...d, [pid]: '' }));
    await reload();
    showToast('API 키를 충전했습니다.', 'success');
  };

  const clearKey = async (pid: ProviderId) => {
    await setApiKey(pid, '');
    await reload();
    showToast('API 키를 삭제했습니다.', 'info');
  };

  const addStudent = async () => {
    const email = newEmail.trim().toLowerCase();
    if (!email || !email.includes('@')) { showToast('올바른 이메일을 입력하세요.', 'warning'); return; }
    for (const p of CALLABLE) {
      const amt = parseInt(newAmounts[p.id] || '0', 10);
      if (amt > 0) await setAllocation(email, p.id, amt);
    }
    // 배당이 하나도 없으면 0으로라도 학생 등록
    const hasAny = CALLABLE.some((p) => parseInt(newAmounts[p.id] || '0', 10) > 0);
    if (!hasAny) await setAllocation(email, CALLABLE[0].id, 0);
    setNewEmail('');
    setNewAmounts({});
    await reload();
    showToast(`${email} 학생에게 토큰을 배당했습니다.`, 'success');
  };

  const updateAlloc = async (email: string, pid: ProviderId, value: string) => {
    const amt = parseInt(value, 10);
    if (isNaN(amt)) return;
    await setAllocation(email, pid, amt);
    await reload();
  };

  const onReset = async (email: string, pid: ProviderId) => {
    await resetUsage(email, pid);
    await reload();
    showToast('사용량을 초기화했습니다.', 'info');
  };

  const onRemove = async (email: string) => {
    if (!confirm(`${email} 학생의 배당을 모두 삭제할까요?`)) return;
    await removeStudent(email);
    await reload();
    showToast('학생을 삭제했습니다.', 'info');
  };

  const students = Object.keys(map).sort();

  return (
    <>
      <SEOHead title="토큰 배당 관리 (강사)" description="API 키 충전 및 학생별 토큰 배당" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Instructor</div>
          <h2>토큰 배당 관리</h2>
          <p>각 AI에 API 키를 충전하고, 학생별로 토큰을 배당하세요. 학생은 배당된 만큼 실습실에서 유료 모델을 사용합니다.</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          {/* API 키 충전 */}
          <div className="aifree-block">
            <h3 className="aifree-h3"><span className="accent">01</span> API 키 충전</h3>
            <p className="aifree-lead">강사가 결제한 각 AI의 API 키를 등록합니다. 키는 학생에게 노출되지 않습니다.</p>
            <div className="aifree-key-grid">
              {CALLABLE.map((p) => (
                <div className="aifree-key-card" key={p.id}>
                  <div className="aifree-key-head">
                    <span><i className={p.icon} style={{ color: p.color }} /> {p.name}</span>
                    <span className={`aifree-key-status${keyStatus[p.id] ? ' on' : ''}`}>
                      {keyStatus[p.id] ? '충전됨' : '미충전'}
                    </span>
                  </div>
                  <div className="aifree-key-input">
                    <input
                      type="password"
                      value={keyDraft[p.id] || ''}
                      onChange={(e) => setKeyDraft((d) => ({ ...d, [p.id]: e.target.value }))}
                      placeholder={keyStatus[p.id] ? '새 키로 교체하려면 입력' : `${p.api.keyName} 입력`}
                      autoComplete="off"
                    />
                    <button className="btn btn-primary" onClick={() => saveKey(p.id)}>저장</button>
                    {keyStatus[p.id] && (
                      <button className="aifree-link-btn" onClick={() => clearKey(p.id)}>삭제</button>
                    )}
                  </div>
                  <a className="aifree-key-link" href={p.api.keyUrl} target="_blank" rel="noopener noreferrer">
                    {p.vendor} 키 발급 <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 학생 추가 */}
          <div className="aifree-block">
            <h3 className="aifree-h3"><span className="accent">02</span> 학생 토큰 배당</h3>
            <div className="aifree-add-row">
              <input
                type="email"
                className="aifree-add-email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="학생 이메일 (로그인 이메일과 동일)"
              />
              {CALLABLE.map((p) => (
                <input
                  key={p.id}
                  type="number"
                  min={0}
                  className="aifree-add-amt"
                  value={newAmounts[p.id] || ''}
                  onChange={(e) => setNewAmounts((a) => ({ ...a, [p.id]: e.target.value }))}
                  placeholder={p.name}
                />
              ))}
              <button className="btn btn-primary" onClick={addStudent}>배당</button>
            </div>
            <p className="aifree-hint">숫자는 배당할 토큰량입니다. 비워두면 0으로 처리됩니다.</p>
          </div>

          {/* 학생 목록 */}
          <div className="aifree-block">
            <h3 className="aifree-h3"><span className="accent">03</span> 배당 현황 ({students.length}명)</h3>
            {students.length === 0 ? (
              <p className="aifree-lead">아직 배당된 학생이 없습니다. 위에서 학생을 추가하세요.</p>
            ) : (
              <div className="table-responsive">
                <table className="aifree-alloc-table">
                  <thead>
                    <tr>
                      <th>학생 이메일</th>
                      {CALLABLE.map((p) => <th key={p.id}>{p.name} (배당 / 잔여)</th>)}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((email) => (
                      <tr key={email}>
                        <td className="aifree-alloc-email">{email}</td>
                        {CALLABLE.map((p) => {
                          const a = map[email]?.[p.id] ?? { allocated: 0, used: 0 };
                          return (
                            <td key={p.id}>
                              <div className="aifree-alloc-cell">
                                <input
                                  type="number"
                                  min={0}
                                  defaultValue={a.allocated}
                                  onBlur={(e) => updateAlloc(email, p.id, e.target.value)}
                                />
                                <span className="aifree-alloc-left">잔여 {remaining(a).toLocaleString()}</span>
                                <button className="aifree-link-btn" onClick={() => onReset(email, p.id)} title="사용량 초기화">
                                  <i className="fa-solid fa-rotate-left" />
                                </button>
                              </div>
                            </td>
                          );
                        })}
                        <td>
                          <button className="aifree-link-btn danger" onClick={() => onRemove(email)}>삭제</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminAllocation;
