import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import { PROVIDER_LIST } from '../config/aiProviders';
import { CATEGORIES, EXAMPLES } from '../data/examples';
import type { ReactElement } from 'react';

const STEPS = [
  {
    n: '01', title: 'AI 둘러보기',
    desc: 'ChatGPT · Claude · Gemini · Genspark의 무료요금제 범위와 강점을 한눈에 비교합니다.',
    link: '/tools', cta: 'AI 도구 보기',
  },
  {
    n: '02', title: '예제 따라하기',
    desc: '글쓰기·업무·학습·코딩 등 카테고리별 실전 프롬프트 예제를 그대로 복사해 무료로 실습합니다.',
    link: '/examples', cta: '예제 보기',
  },
  {
    n: '03', title: '실습실에서 직접',
    desc: '강사가 배당한 토큰만큼, 실습실에서 유료 모델까지 직접 호출하며 결과를 비교해 봅니다.',
    link: '/playground', cta: '실습실 열기',
  },
];

const PILLARS = [
  { n: '/01', t: '무료부터 시작', d: '카드 등록 없이 무료요금제 범위에서 4대 AI를 모두 경험합니다. 한도와 절약 팁까지 함께 안내합니다.' },
  { n: '/02', t: '배당된 만큼 유료 체험', d: '강사가 API 키를 충전하고 학생별 토큰을 배당하면, 배당량 내에서 유료 모델을 안전하게 사용해 봅니다.' },
  { n: '/03', t: '예제로 바로 실전', d: `${EXAMPLES.length}개 이상의 실전 예제를 8개 카테고리로 제공합니다. 복사 → 붙여넣기 → 응용까지.` },
];

const Home = (): ReactElement => {
  const marqueePhrase = 'ChatGPT · Claude · Gemini · Genspark · Prompting · Free Tier · Tokens · Hands-on';

  return (
    <>
      <SEOHead title={`${site.name} | ${site.nameKo}`} description={site.description} />

      {/* ── Hero ── */}
      <section className="hero-editorial">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">
                <span>AI Free Academy / 2026 · 무료로 시작하는 생성형 AI</span>
              </div>
              <h1 className="hero-title-ed">
                무료로 배우고,<br />
                <span className="accent">배당받은 만큼</span><br />
                <span className="accent">유료까지</span>
              </h1>
              <p className="hero-lead">
                ChatGPT · Claude · Gemini · Genspark를 무료요금제 범위에서 직접 실습합니다.
                강사가 충전한 API 키와 배당 토큰으로, 실습실에서 유료 모델까지
                안전하게 경험하는 입문 학습 플랫폼입니다.
              </p>
              <div className="hero-actions-ed">
                <Link className="btn btn-primary" to="/tools">
                  AI 도구 둘러보기
                  <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <Link className="btn btn-ghost" to="/playground">실습실 시작하기</Link>
              </div>
            </div>

            <div className="hero-side">
              <div className="metric-stack">
                <div className="metric">
                  <div className="metric-num"><span className="accent">4</span></div>
                  <div className="metric-label">AI 서비스</div>
                </div>
                <div className="metric">
                  <div className="metric-num">{EXAMPLES.length}<span className="small">+</span></div>
                  <div className="metric-label">실전 예제</div>
                </div>
                <div className="metric">
                  <div className="metric-num">{CATEGORIES.length}</div>
                  <div className="metric-label">학습 카테고리</div>
                </div>
                <div className="metric">
                  <div className="metric-num"><span className="accent">0</span><span className="small">원</span></div>
                  <div className="metric-label">무료로 시작</div>
                </div>
              </div>

              <div className="hero-card">
                <div className="hero-card-eyebrow">How it works</div>
                <div className="hero-card-title">3단계로 AI에 입문하세요</div>
                <ul className="hero-card-list">
                  <li>① 무료요금제로 4대 AI 둘러보기</li>
                  <li>② 카테고리별 예제 그대로 실습</li>
                  <li>③ 배당 토큰으로 실습실에서 유료 체험</li>
                  <li>강사 충전 키 · 학생별 토큰 배당 지원</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee">
        <div className="marquee-track">
          <span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                {marqueePhrase.split(' · ').map((w, j) => (
                  <span key={`${i}-${j}`}>{w}<span className="dot">&#10022;</span></span>
                ))}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* ── AI 도구 ── */}
      <section className="section-ed" id="tools">
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 01 / AI Tools</div>
            <h2 className="section-title-ed">무료로 만나는 <span className="accent">4대 AI</span></h2>
            <div className="section-meta">free tier · hands-on</div>
          </div>
          <div className="tools-grid">
            {PROVIDER_LIST.map((p) => (
              <Link className="tool" key={p.id} to={`/tools/${p.id}`} style={{ textDecoration: 'none' }}>
                <div className="tool-mark" style={{ color: p.color }}>
                  <i className={p.icon} />
                </div>
                <div>
                  <div className="tool-cat">{p.vendor}</div>
                  <div className="tool-name">{p.name}</div>
                </div>
                <p className="tool-desc">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 학습 흐름 ── */}
      <section className="section-ed" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 02 / Flow</div>
            <h2 className="section-title-ed">이렇게 <span className="accent">학습합니다</span></h2>
            <div className="section-meta">3 steps</div>
          </div>
          <div className="pillars">
            {STEPS.map((s) => (
              <Link className="pillar" key={s.n} to={s.link} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="pillar-num">/{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <span className="course-cta" style={{ marginTop: '12px' }}>
                  {s.cta}
                  <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="section-ed" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 03 / Why</div>
            <h2 className="section-title-ed">이 학습의 <span className="accent">특징</span></h2>
            <div className="section-meta">3 principles</div>
          </div>
          <div className="pillars">
            {PILLARS.map((p, i) => (
              <div className="pillar" key={i}>
                <div className="pillar-num">{p.n}</div>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-ed">
        <div className="container">
          <div className="cta-inner">
            <div>
              <div className="cta-eyebrow">&mdash; 지금 시작</div>
              <h2 className="cta-title-ed">
                돈 들이지 않고,<br />
                <span className="accent">AI와 친해지기.</span>
              </h2>
            </div>
            <div className="cta-side">
              <p>
                무료요금제로 충분히 연습하고, 강사가 배당한 토큰으로 유료 모델까지 경험하세요.
                로그인하면 나의 토큰 잔여량과 실습실을 바로 사용할 수 있습니다.
              </p>
              <Link className="btn btn-cta" to="/login">
                로그인하고 시작하기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
