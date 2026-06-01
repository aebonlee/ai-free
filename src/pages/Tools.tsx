import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { PROVIDER_LIST } from '../config/aiProviders';
import type { ReactElement } from 'react';

const Tools = (): ReactElement => {
  return (
    <>
      <SEOHead title="AI 도구 가이드" description="ChatGPT · Claude · Gemini · Genspark 무료요금제 활용 가이드" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">AI Tools</div>
          <h2>무료로 시작하는 AI 도구</h2>
          <p>각 AI의 무료요금제 범위, 강점, 그리고 절약하며 실습하는 방법을 안내합니다.</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="rec-grid">
            {PROVIDER_LIST.map((p, i) => (
              <Link
                key={p.id}
                to={`/tools/${p.id}`}
                className="rec-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="rec-card-top">
                  <span className="rec-tag" style={{ background: p.color, color: '#fff', borderColor: p.color }}>
                    {p.vendor}
                  </span>
                  <i className={p.icon} style={{ color: p.color, fontSize: '20px' }} />
                </div>
                <h3 className="rec-name">{p.name}</h3>
                <span className="rec-name-en">{p.tagline}</span>
                <p className="rec-desc">{p.freeTier.summary}</p>
                <span className="rec-url">
                  {p.api.callable ? '실습실 유료 호출 지원' : '무료 실습 · 링크 안내'}
                </span>
              </Link>
            ))}
          </div>

          <div className="aifree-note" style={{ marginTop: 'var(--s-7)' }}>
            <i className="fa-solid fa-circle-info" />
            <div>
              <strong>무료요금제란?</strong> 카드 등록 없이 가입만 하면 일정 한도까지 무료로 쓸 수 있는 요금제입니다.
              한도를 넘으면 잠시 기다리거나 경량 모델로 전환됩니다. 학습·연습에는 무료요금제로도 충분합니다.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tools;
