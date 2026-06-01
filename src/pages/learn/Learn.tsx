import { Link } from 'react-router-dom';
import GuidePage from '../../components/GuidePage';
import { LEARN_FILES } from './learnData';
import type { ReactElement } from 'react';

/**
 * 학습하기 — 인공지능 기초부터 프롬프트 학습까지.
 * GuidePage가 좌측 메뉴(접이식 그룹)와 마크다운 본문을 렌더링합니다.
 */
const Learn = (): ReactElement => {
  return (
    <GuidePage
      heroEyebrow="Learn"
      seoTitle="학습하기"
      seoTitleEn="Learn"
      seoDescription="생성형 AI를 처음 만나는 분을 위한 입문 가이드 — AI를 이해하고 안전하게 시작하기"
      path="/learn"
      dataFiles={LEARN_FILES}
      ctaBanner={
        <div className="aifree-note" style={{ marginTop: 'var(--s-6)' }}>
          <i className="fa-solid fa-arrow-right-long" />
          <div>
            AI를 이해했다면 다음은 <b>잘 부리는 법</b>입니다 —{' '}
            <Link to="/prompt/learn">프롬프트 학습</Link>으로 넘어가거나,{' '}
            <Link to="/examples">학습 예제</Link>·<Link to="/playground">실습실</Link>에서 직접 해보세요.
          </div>
        </div>
      }
    />
  );
};

export default Learn;
