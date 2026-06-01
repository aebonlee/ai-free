import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import type { ReactElement } from 'react';

const INTENT = [
  {
    icon: 'fa-solid fa-door-open',
    title: '진입 장벽 낮추기',
    desc: '카드 등록도, 결제도 없이 무료요금제 범위에서 4대 AI를 직접 만져보며 "AI는 어렵다"는 인식을 깹니다.',
  },
  {
    icon: 'fa-solid fa-layer-group',
    title: '비교하며 익히기',
    desc: 'ChatGPT · Claude · Gemini · Genspark의 강점과 무료 한도를 한곳에서 비교하고, 상황에 맞는 도구를 고르는 감각을 기릅니다.',
  },
  {
    icon: 'fa-solid fa-coins',
    title: '배당된 만큼 유료 체험',
    desc: '강사가 API 키를 충전하고 토큰을 배당하면, 학생은 배당량 내에서 유료 모델까지 안전하게 경험합니다. 비용 부담 없이 "진짜 AI"를 써봅니다.',
  },
  {
    icon: 'fa-solid fa-list-check',
    title: '예제로 바로 실전',
    desc: '글쓰기·업무·학습·코딩 등 카테고리별 실전 예제를 복사해 바로 따라 합니다. 이론보다 손으로 익히는 학습을 지향합니다.',
  },
];

const About = (): ReactElement => {
  return (
    <>
      <SEOHead title={`제작의도 | ${site.name}`} description="무료 생성형 AI 입문 학습 플랫폼의 제작 의도" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">About This Site</div>
          <h2>제작의도</h2>
          <p>{site.description}</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="aifree-intent-lead">
            <strong>처음 AI를 접하는 분도, 부담 없이 시작할 수 있도록.</strong>
            <p>
              드림아이티비즈(DreamIT Biz)는 기업·교육 현장의 실제 니즈를 반영한 맞춤형 학습 플랫폼을 제작합니다.
              본 사이트는 생성형 AI를 처음 접하는 학습자가 <b>무료요금제로 충분히 연습</b>하고,
              필요할 때 <b>강사가 배당한 토큰으로 유료 모델까지 직접 체험</b>할 수 있도록 설계되었습니다.
            </p>
          </div>

          <div className="aifree-intent-grid">
            {INTENT.map((it) => (
              <div className="aifree-intent-card" key={it.title}>
                <div className="aifree-intent-icon"><i className={it.icon} /></div>
                <h4>{it.title}</h4>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>

          <div className="aifree-cta-row">
            <Link className="btn btn-primary" to="/tools">AI 도구 둘러보기</Link>
            <Link className="btn btn-ghost" to="/examples">학습 예제 보기</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
