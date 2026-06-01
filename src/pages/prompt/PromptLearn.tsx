import { Link } from 'react-router-dom';
import GuidePage from '../../components/GuidePage';
import promptBasics from './data/prompt-basics.js';
import promptTechniques from './data/prompt-techniques.js';
import promptEvaluation from './data/prompt-evaluation.js';
import promptExamples from './data/prompt-examples.js';
import type { ReactElement } from 'react';

/**
 * 프롬프트 학습 — 기초 · 기법 · 평가기준(SCORE) · 실전 예시.
 * 좌측 메뉴(접이식 그룹)로 4개 자료를 구분해 제공합니다.
 */
const PromptLearn = (): ReactElement => {
  return (
    <GuidePage
      seoTitle="프롬프트 학습"
      seoTitleEn="Prompt Learning"
      seoDescription="프롬프트 기초부터 기법, SCORE 평가기준, 실전 예시까지 단계별 학습 자료"
      path="/prompt/learn"
      dataFiles={[promptBasics, promptTechniques, promptEvaluation, promptExamples] as never}
      ctaBanner={
        <div className="aifree-note" style={{ marginTop: 'var(--s-6)' }}>
          <i className="fa-solid fa-pen-ruler" />
          <div>
            배운 기준으로 직접 써보세요 —{' '}
            <Link to="/prompt/practice">작성 실습</Link>에서 점수 평가를 받고,{' '}
            <Link to="/prompt/cases">사례</Link>에서 업무별 프롬프트를 참고하세요.
          </div>
        </div>
      }
    />
  );
};

export default PromptLearn;
