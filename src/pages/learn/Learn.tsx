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
      seoTitle="학습하기"
      seoTitleEn="Learn"
      seoDescription="생성형 AI 기초부터 프롬프트 작성법까지 단계별 학습 자료"
      path="/learn"
      dataFiles={LEARN_FILES}
      ctaBanner={
        <div className="aifree-note" style={{ marginTop: 'var(--s-6)' }}>
          <i className="fa-solid fa-flask" />
          <div>
            배운 내용을 바로 적용해 보세요 —{' '}
            <Link to="/examples">학습 예제</Link>에서 따라 하고,{' '}
            <Link to="/playground">실습실</Link>에서 직접 대화해 봅니다.
          </div>
        </div>
      }
    />
  );
};

export default Learn;
