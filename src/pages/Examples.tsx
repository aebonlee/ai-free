import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useToast } from '../contexts/ToastContext';
import { EXAMPLES, CATEGORIES } from '../data/examples';
import { getProvider } from '../config/aiProviders';
import type { Example } from '../data/examples';
import type { ReactElement } from 'react';

const LEVEL_COLORS: Record<Example['level'], string> = {
  입문: '#00855A',
  기초: '#1B2A4A',
  활용: '#C8102E',
};

/** URL 슬러그 → 한글 레벨 */
const LEVELS: { slug: string; level: Example['level']; label: string; desc: string }[] = [
  { slug: 'beginner', level: '입문', label: '입문', desc: '처음 AI를 써보는 단계' },
  { slug: 'basic', level: '기초', label: '기초', desc: '기본 활용에 익숙해지는 단계' },
  { slug: 'advanced', level: '활용', label: '활용', desc: '실무에 응용하는 단계' },
];

const ExampleCard = ({ ex }: { ex: Example }): ReactElement => {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ex.prompt);
      showToast('프롬프트를 복사했습니다. AI에 붙여넣어 보세요!', 'success');
    } catch {
      showToast('복사에 실패했습니다. 직접 선택해 복사하세요.', 'error');
    }
  };

  return (
    <div className={`aifree-ex-card${open ? ' open' : ''}`}>
      <div className="aifree-ex-head" onClick={() => setOpen((v) => !v)}>
        <div className="aifree-ex-head-main">
          <span className="aifree-level" style={{ background: LEVEL_COLORS[ex.level] }}>{ex.level}</span>
          <span className="aifree-ex-title">{ex.title}</span>
        </div>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`} />
      </div>
      <div className="aifree-ex-scenario">{ex.scenario}</div>

      <div className="aifree-ex-providers">
        <span className="aifree-ex-providers-label">추천 AI</span>
        {ex.bestFor.map((pid) => {
          const p = getProvider(pid);
          return p ? (
            <span key={pid} className="aifree-chip" style={{ borderColor: p.color, color: p.color }}>
              <i className={p.icon} /> {p.name}
            </span>
          ) : null;
        })}
      </div>

      {open && (
        <div className="aifree-ex-body">
          <div className="aifree-ex-prompt-head">
            <span>프롬프트</span>
            <button className="aifree-copy-btn" onClick={copy}>
              <i className="fa-solid fa-copy" /> 복사
            </button>
          </div>
          <pre className="aifree-ex-prompt">{ex.prompt}</pre>

          <div className="aifree-ex-expect">
            <strong><i className="fa-solid fa-wand-magic-sparkles" /> 기대 결과</strong>
            <span>{ex.expect}</span>
          </div>

          <div className="aifree-ex-tips">
            <strong><i className="fa-solid fa-lightbulb" /> 더 잘 쓰는 팁</strong>
            <ul>
              {ex.tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <Link className="btn btn-ghost aifree-ex-try" to="/playground">
            실습실에서 바로 해보기
          </Link>
        </div>
      )}
    </div>
  );
};

const Examples = (): ReactElement => {
  const { level: levelSlug } = useParams<{ level: string }>();
  const activeLevelDef = LEVELS.find((l) => l.slug === levelSlug);
  const activeLevel = activeLevelDef?.level ?? null;

  const [cat, setCat] = useState<string>('전체');

  // 현재 레벨로 1차 필터된 집합 (카테고리 카운트 계산용)
  const levelFiltered = useMemo(
    () => (activeLevel ? EXAMPLES.filter((e) => e.level === activeLevel) : EXAMPLES),
    [activeLevel]
  );

  const filtered = cat === '전체' ? levelFiltered : levelFiltered.filter((e) => e.category === cat);

  const heading = activeLevelDef ? `${activeLevelDef.label} 예제` : '학습 예제';
  const sub = activeLevelDef
    ? `${activeLevelDef.desc} — 복사해서 무료 AI에 붙여넣어 보세요.`
    : '수준과 카테고리를 골라, 복사해서 무료 AI에 붙여넣기만 하면 됩니다.';

  return (
    <>
      <SEOHead title={heading} description="수준별·카테고리별 실전 AI 프롬프트 예제 모음" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Examples · {EXAMPLES.length}+</div>
          <h2>{heading}</h2>
          <p>{sub}</p>
        </div>
      </section>

      <section className="section-ed" style={{ paddingTop: 'var(--s-6)' }}>
        <div className="container">
          <div className="aifree-ex-layout">
            {/* 왼쪽 사이드바 */}
            <aside className="aifree-ex-side">
              <div className="aifree-ex-side-group">
                <div className="aifree-ex-side-title">수준별</div>
                <Link
                  to="/examples"
                  className={`aifree-ex-side-link${!activeLevel ? ' active' : ''}`}
                >
                  <span>전체</span><span className="aifree-ex-side-count">{EXAMPLES.length}</span>
                </Link>
                {LEVELS.map((l) => {
                  const count = EXAMPLES.filter((e) => e.level === l.level).length;
                  return (
                    <Link
                      key={l.slug}
                      to={`/examples/${l.slug}`}
                      className={`aifree-ex-side-link${activeLevel === l.level ? ' active' : ''}`}
                    >
                      <span>
                        <i className="fa-solid fa-circle" style={{ color: LEVEL_COLORS[l.level], fontSize: '8px', marginRight: '8px' }} />
                        {l.label}
                      </span>
                      <span className="aifree-ex-side-count">{count}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="aifree-ex-side-group">
                <div className="aifree-ex-side-title">카테고리</div>
                <button
                  className={`aifree-ex-side-link${cat === '전체' ? ' active' : ''}`}
                  onClick={() => setCat('전체')}
                >
                  <span>전체</span><span className="aifree-ex-side-count">{levelFiltered.length}</span>
                </button>
                {CATEGORIES.map((c) => {
                  const count = levelFiltered.filter((e) => e.category === c).length;
                  return (
                    <button
                      key={c}
                      className={`aifree-ex-side-link${cat === c ? ' active' : ''}`}
                      onClick={() => setCat(c)}
                      disabled={count === 0}
                    >
                      <span>{c}</span><span className="aifree-ex-side-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* 메인: 예제 카드 */}
            <div className="aifree-ex-main">
              <div className="aifree-ex-resultbar">
                <strong>{filtered.length}</strong>개 예제
                {activeLevelDef && <span className="aifree-ex-resulttag" style={{ background: LEVEL_COLORS[activeLevelDef.level] }}>{activeLevelDef.label}</span>}
                {cat !== '전체' && <span className="aifree-ex-resulttag aifree-ex-resulttag-cat">{cat}</span>}
              </div>

              {filtered.length === 0 ? (
                <p className="aifree-lead">해당 조건의 예제가 없습니다.</p>
              ) : (
                <div className="aifree-ex-grid">
                  {filtered.map((ex) => <ExampleCard key={ex.id} ex={ex} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Examples;
