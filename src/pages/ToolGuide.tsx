import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getProvider } from '../config/aiProviders';
import { EXAMPLES } from '../data/examples';
import type { ReactElement } from 'react';

const ToolGuide = (): ReactElement => {
  const { provider: pid } = useParams<{ provider: string }>();
  const provider = getProvider(pid || '');

  if (!provider) {
    return (
      <section className="section-ed">
        <div className="container">
          <h2>존재하지 않는 AI 도구입니다.</h2>
          <Link className="btn btn-primary" to="/tools">AI 도구 목록으로</Link>
        </div>
      </section>
    );
  }

  const related = EXAMPLES.filter((e) => e.bestFor.includes(provider.id)).slice(0, 6);

  return (
    <>
      <SEOHead
        title={`${provider.name} 무료 활용 가이드`}
        description={`${provider.name}(${provider.vendor}) 무료요금제 범위와 실습 방법`}
      />

      {/* Header */}
      <section className="page-header-ed" style={{ background: undefined }}>
        <div className="container">
          <div className="eyebrow">{provider.vendor}</div>
          <h2>
            <i className={provider.icon} style={{ marginRight: '12px' }} />
            {provider.name}
          </h2>
          <p>{provider.tagline}</p>
          <div className="hero-actions-ed" style={{ marginTop: '20px' }}>
            <a className="btn btn-primary" href={provider.siteUrl} target="_blank" rel="noopener noreferrer">
              무료로 가입하기 <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: '8px' }} />
            </a>
            {provider.api.callable && (
              <Link className="btn btn-ghost" to="/playground">실습실에서 사용하기</Link>
            )}
          </div>
        </div>
      </section>

      <section className="section-ed">
        <div className="container aifree-guide">
          {/* 무료요금제 요약 */}
          <div className="aifree-block">
            <h3 className="aifree-h3"><span className="accent">01</span> 무료요금제 한눈에 보기</h3>
            <p className="aifree-lead">{provider.freeTier.summary}</p>
            <div className="aifree-spec-grid">
              {provider.freeTier.items.map((it) => (
                <div className="aifree-spec" key={it.label}>
                  <div className="aifree-spec-label">{it.label}</div>
                  <div className="aifree-spec-value">{it.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 한도 / 주의 */}
          <div className="aifree-block">
            <h3 className="aifree-h3"><span className="accent">02</span> 무료 사용 한도 & 주의점</h3>
            <ul className="aifree-list aifree-list-warn">
              {provider.freeTier.limits.map((l, i) => (
                <li key={i}><i className="fa-solid fa-triangle-exclamation" /> {l}</li>
              ))}
            </ul>
          </div>

          {/* 팁 */}
          <div className="aifree-block">
            <h3 className="aifree-h3"><span className="accent">03</span> 무료로 잘 쓰는 팁</h3>
            <ul className="aifree-list aifree-list-tip">
              {provider.freeTier.tips.map((t, i) => (
                <li key={i}><i className="fa-solid fa-lightbulb" /> {t}</li>
              ))}
            </ul>
          </div>

          {/* 실습실 안내 */}
          <div className="aifree-block">
            <h3 className="aifree-h3"><span className="accent">04</span> 실습실(유료 토큰)에서 사용하기</h3>
            {provider.api.callable ? (
              <>
                <p className="aifree-lead">
                  강사가 {provider.name} API 키를 충전하고 토큰을 배당하면, 무료 한도를 넘어서도
                  실습실에서 <strong>{provider.name}</strong>를 직접 호출해 볼 수 있습니다. 사용한 토큰만큼 배당량에서 차감됩니다.
                </p>
                <div className="aifree-spec-grid">
                  <div className="aifree-spec">
                    <div className="aifree-spec-label">실습 권장 모델</div>
                    <div className="aifree-spec-value">{provider.api.models[0]?.label}</div>
                  </div>
                  <div className="aifree-spec">
                    <div className="aifree-spec-label">API 키 발급</div>
                    <div className="aifree-spec-value">
                      <a href={provider.api.keyUrl} target="_blank" rel="noopener noreferrer">{provider.vendor} 콘솔</a>
                    </div>
                  </div>
                </div>
                <Link className="btn btn-primary" to="/playground" style={{ marginTop: '16px' }}>
                  실습실 열기
                  <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </>
            ) : (
              <p className="aifree-lead">
                {provider.name}는 공개 Chat API가 없어 실습실의 유료 토큰 호출은 지원하지 않습니다.
                대신 공식 사이트의 무료 크레딧으로 직접 체험해 보세요. (Sparkpage, AI Slides 등)
              </p>
            )}
          </div>

          {/* 관련 예제 */}
          {related.length > 0 && (
            <div className="aifree-block">
              <h3 className="aifree-h3"><span className="accent">05</span> {provider.name}로 해볼 만한 예제</h3>
              <div className="aifree-example-mini-grid">
                {related.map((ex) => (
                  <Link key={ex.id} to="/examples" className="aifree-example-mini">
                    <span className="aifree-badge">{ex.category}</span>
                    <span className="aifree-example-mini-title">{ex.title}</span>
                    <span className="aifree-example-mini-scenario">{ex.scenario}</span>
                  </Link>
                ))}
              </div>
              <Link className="btn btn-ghost" to="/examples" style={{ marginTop: '16px' }}>전체 예제 보기</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ToolGuide;
