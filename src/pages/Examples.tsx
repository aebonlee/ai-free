import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [cat, setCat] = useState<string>('전체');
  const filtered = cat === '전체' ? EXAMPLES : EXAMPLES.filter((e) => e.category === cat);

  return (
    <>
      <SEOHead title="학습 예제" description="카테고리별 실전 AI 프롬프트 예제 모음" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Examples · {EXAMPLES.length}+</div>
          <h2>바로 따라 하는 학습 예제</h2>
          <p>복사해서 무료 AI에 붙여넣기만 하면 됩니다. 카테고리별로 골라 연습해 보세요.</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          {/* 카테고리 필터 */}
          <div className="aifree-filter">
            <button
              className={`aifree-filter-btn${cat === '전체' ? ' active' : ''}`}
              onClick={() => setCat('전체')}
            >
              전체 <span>{EXAMPLES.length}</span>
            </button>
            {CATEGORIES.map((c) => {
              const count = EXAMPLES.filter((e) => e.category === c).length;
              return (
                <button
                  key={c}
                  className={`aifree-filter-btn${cat === c ? ' active' : ''}`}
                  onClick={() => setCat(c)}
                >
                  {c} <span>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="aifree-ex-grid">
            {filtered.map((ex) => <ExampleCard key={ex.id} ex={ex} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Examples;
