import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

/* ── 시나리오 ── */
interface Scenario {
  id: number;
  category: string;
  title: string;
  situation: string;
  goal: string;
  keywords: string[];        // 상황/맥락 가점 키워드
  roleKeywords: string[];    // 역할 키워드
  formatKeywords: string[];  // 출력 형식 키워드
  exampleAnswer: string;     // 모범 프롬프트
}

const SCENARIOS: Scenario[] = [
  {
    id: 1, category: '이메일', title: '거래처 납기 지연 사과 이메일',
    situation: '자재 수급 문제로 거래처에 약속한 납기를 1주일 못 지키게 되었습니다. 사과와 함께 대안을 제시해야 합니다.',
    goal: '공손하고 전문적인 사과 이메일을 작성하는 프롬프트를 만드세요.',
    keywords: ['사과', '납기', '지연', '대안', '일정', '원인', '재발방지'],
    roleKeywords: ['담당자', '전문가', '역할', '비서', '매니저'],
    formatKeywords: ['문단', '형식', '제목', '서명', '이메일', '구성', '순서'],
    exampleAnswer: `너는 우리 회사의 영업 담당자야.
거래처에 보낼 납기 지연 사과 이메일을 작성해줘.

[상황]
- 원자재 수급 지연으로 납품이 1주일 지연
- 기존 납기 4/25 → 변경 5/2
- 대안: 일부 물량 4/28 선납품 가능

[조건]
- 공손하고 전문적인 비즈니스 어투
- 사과 → 원인 → 대안 → 재발방지 순서, 3문단
- 마지막에 담당자 서명 포함`,
  },
  {
    id: 2, category: '보고서', title: '주간 업무 보고서 작성',
    situation: '이번 주에 처리한 일(미팅 2건, 제안서 1건, 재고 실사)을 팀장 보고용 주간 보고서로 정리해야 합니다.',
    goal: '체계적인 주간 보고서를 요청하는 프롬프트를 작성하세요.',
    keywords: ['주간', '보고', '실적', '계획', '이슈', '진행'],
    roleKeywords: ['담당자', '사원', '팀원', '역할', '전문가'],
    formatKeywords: ['표', '목록', '항목', '형식', '분량', '페이지', '구성'],
    exampleAnswer: `너는 우리 팀의 실무 담당자야.
아래 메모로 팀장 보고용 주간 업무 보고서를 작성해줘.

[이번 주 실적]
- 신규 거래처 미팅 2건
- 제안서 작성 1건 제출
- 재고 실사 및 오차 정리

[형식]
1) 금주 실적 (표: 업무/내용/결과)
2) 주요 이슈
3) 차주 계획 3가지
- A4 1페이지 이내, 간결한 보고체`,
  },
  {
    id: 3, category: '데이터', title: '매출 데이터 분석 요청',
    situation: '최근 6개월 매출 데이터의 추세를 분석하고 다음 분기를 전망하는 자료가 필요합니다.',
    goal: '데이터 분석과 전망을 요청하는 프롬프트를 작성하세요.',
    keywords: ['분석', '추세', '비교', '증감', '전망', '원인', '매출'],
    roleKeywords: ['분석가', '전문가', '역할', '컨설턴트'],
    formatKeywords: ['표', '그래프', '항목', '형식', '요약', '구성'],
    exampleAnswer: `너는 데이터 분석 전문가야.
아래 6개월 매출 데이터를 분석해줘.

[데이터]
- 1월 1.0억 / 2월 1.1억 / ... (수치 입력)

[분석 내용]
1) 월별 추세 요약 (표)
2) 전월·전년 대비 증감과 원인 추정
3) 다음 분기 전망
4) 개선 제안 3가지
- 숫자와 비율 중심, A4 1페이지`,
  },
  {
    id: 4, category: '마케팅', title: '신메뉴 SNS 홍보 문구',
    situation: '카페 신메뉴를 인스타그램에 홍보할 문구가 필요합니다. 여러 톤으로 받아 고르고 싶습니다.',
    goal: '여러 버전의 홍보 문구를 요청하는 프롬프트를 작성하세요.',
    keywords: ['홍보', '신메뉴', '톤', '대상', 'SNS', '인스타'],
    roleKeywords: ['마케터', '전문가', '역할', '카피라이터'],
    formatKeywords: ['개', '버전', '해시태그', '형식', '목록'],
    exampleAnswer: `너는 카페 마케터야.
신메뉴 '흑임자 라떼' 인스타그램 홍보 문구를 5가지 톤으로 만들어줘.
(감성 / 유머 / 정보전달 / 짧고 강렬 / MZ 말투)

- 각 버전은 2문장 내외
- 버전마다 해시태그 5개 포함
- 20대 여성을 주 대상으로`,
  },
  {
    id: 5, category: '회의', title: '회의록 정리 요청',
    situation: '회의 중 받아 적은 거친 메모를 정식 회의록으로 정리해야 합니다.',
    goal: '메모를 회의록으로 정리하는 프롬프트를 작성하세요.',
    keywords: ['회의', '결정', '안건', '실행', '메모', '정리'],
    roleKeywords: ['담당자', '전문가', '역할', '비서'],
    formatKeywords: ['표', '구조', '항목', '형식', '담당', '기한'],
    exampleAnswer: `너는 회의 운영 담당자야.
아래 회의 메모를 정식 회의록으로 정리해줘.

[형식]
- 일시 / 참석자 / 안건 / 결정사항 / 실행항목
- 실행항목은 표로 (담당자·기한 포함)

[메모]
"""
(회의 메모 붙여넣기)
"""`,
  },
  {
    id: 6, category: '개인', title: '학습 계획 요청',
    situation: '직장인이 퇴근 후 하루 1시간씩 새 분야를 4주 안에 배우려고 합니다.',
    goal: '나에게 맞는 학습 계획을 요청하는 프롬프트를 작성하세요.',
    keywords: ['학습', '계획', '주차', '목표', '기간', '하루'],
    roleKeywords: ['튜터', '전문가', '코치', '역할'],
    formatKeywords: ['표', '주차별', '항목', '형식', '목록'],
    exampleAnswer: `너는 학습 코치야.
나는 직장인이고 하루 1시간 공부 가능해. '엑셀 데이터 분석'을 4주에 배우고 싶어.

[요청]
- 주차별 학습 계획표 (표: 주차/목표/학습내용/실습과제)
- 무료로 볼 수 있는 자료 추천
- 매주 복습 퀴즈 아이디어도`,
  },
];

interface ScoreResult {
  total: number; situation: number; context: number; objective: number;
  responseFormat: number; extras: number; feedback: string[]; grade: string;
}

/* ── SCORE 채점 엔진 ── */
function evaluatePrompt(input: string, scenario: Scenario): ScoreResult {
  const text = input.toLowerCase().replace(/\s+/g, ' ');
  const len = input.trim().length;
  const feedback: string[] = [];

  // S: 상황/맥락 키워드
  let situation = 0;
  const matchedKw = scenario.keywords.filter((kw) => text.includes(kw.toLowerCase()));
  if (matchedKw.length >= 5) situation = 20;
  else if (matchedKw.length >= 3) situation = 15;
  else if (matchedKw.length >= 2) situation = 10;
  else if (matchedKw.length >= 1) situation = 5;
  if (situation < 15) feedback.push(`상황/맥락 키워드를 더 포함하세요 (예: ${scenario.keywords.slice(0, 3).join(', ')})`);

  // C: 구체적 데이터
  let context = 0;
  if (/\d+/.test(input)) context += 5;
  if (/[가-힣]+(주|건|개|명|억|만|원|%|km|m)/.test(input)) context += 5;
  if (/(20\d{2}|[0-9]+월|[0-9]+일|[0-9]+시간|[0-9]+분)/.test(input)) context += 5;
  if (/\[.+\]|"""/.test(input)) context += 5;
  if (context < 10) feedback.push('구체적인 숫자·날짜·조건([상황] 등)을 추가하면 점수가 올라갑니다');

  // O: 명확한 지시
  let objective = 0;
  const actionRe = /(작성|만들|분석|정리|요약|생성|제안|검토|수립|설계|평가|비교|추천|도출|번역)/;
  const hasMultiTask = (input.match(new RegExp(actionRe, 'g')) || []).length;
  if (actionRe.test(input)) objective += 8;
  if (hasMultiTask >= 2) objective += 6;
  if (/(해줘|해주세요|부탁|하시오|만들어)/.test(input)) objective += 3;
  if (len >= 100) objective += 3;
  objective = Math.min(objective, 20);
  if (objective < 10) feedback.push('"~작성해줘", "~분석해줘" 등 명확한 지시문을 포함하세요');

  // R(형식): 출력 형식
  let responseFormat = 0;
  const fmtMatched = scenario.formatKeywords.filter((kw) => text.includes(kw.toLowerCase()));
  if (fmtMatched.length >= 2) responseFormat += 8;
  else if (fmtMatched.length >= 1) responseFormat += 4;
  if (/[1-9][.)]\s|[-·•]\s|#{1,3}\s|[①②③④⑤]/.test(input)) responseFormat += 6;
  if (/(페이지|문단|자|단어|이내|분량|줄|A4|표)/.test(input)) responseFormat += 6;
  responseFormat = Math.min(responseFormat, 20);
  if (responseFormat < 10) feedback.push('출력 형식(표·목록·분량 등)을 지정하면 더 좋은 결과를 얻습니다');

  // E: 역할/제약/예시
  let extras = 0;
  const roleMatched = scenario.roleKeywords.filter((kw) => text.includes(kw.toLowerCase()));
  const hasRole = /(너는|당신은|역할|전문가|담당자|으로서)/.test(input);
  if (hasRole || roleMatched.length > 0) extras += 8;
  if (/(금지|하지 ?마|제외|제한|조건|주의|참고|단,|어투|톤)/.test(input)) extras += 4;
  if (/(예[시를:]|예를 들|예컨대|다음과 같|sample|example)/.test(input)) extras += 4;
  if (len >= 200) extras += 2;
  if (len >= 400) extras += 2;
  extras = Math.min(extras, 20);
  if (!hasRole && roleMatched.length === 0) feedback.push('"너는 ~전문가야" 등 역할 설정을 추가하세요');

  const total = situation + context + objective + responseFormat + extras;
  if (len < 50) feedback.unshift('프롬프트가 너무 짧습니다. 100자 이상으로 작성해보세요.');
  if (len >= 300 && total >= 60) feedback.push('프롬프트 길이와 구조 모두 우수합니다!');

  let grade = 'D';
  if (total >= 90) grade = 'S';
  else if (total >= 80) grade = 'A';
  else if (total >= 65) grade = 'B';
  else if (total >= 50) grade = 'C';

  return { total, situation, context, objective, responseFormat, extras, feedback, grade };
}

const GRADE_COLOR: Record<string, string> = { S: '#00855A', A: '#1B2A4A', B: '#3D6FE0', C: '#D4760A', D: '#C8102E' };
const DIMENSIONS: { key: keyof ScoreResult; label: string }[] = [
  { key: 'situation', label: '구체성·맥락' },
  { key: 'context', label: '데이터' },
  { key: 'objective', label: '명확한 지시' },
  { key: 'responseFormat', label: '출력 형식' },
  { key: 'extras', label: '역할·제약' },
];

const PromptPractice = (): ReactElement => {
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const pick = (s: Scenario) => { setScenario(s); setInput(''); setResult(null); setShowAnswer(false); };
  const evaluate = () => { if (input.trim().length > 0) setResult(evaluatePrompt(input, scenario)); };

  return (
    <>
      <SEOHead title="프롬프트 작성 실습" description="시나리오에 맞는 프롬프트를 직접 쓰고 SCORE 기준으로 점수·피드백을 받는 실습" />
      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Prompt Practice</div>
          <h2>프롬프트 작성 실습</h2>
          <p>상황에 맞는 프롬프트를 직접 작성하면, SCORE 5기준으로 점수와 개선 피드백을 드립니다.</p>
        </div>
      </section>

      <section className="section-ed" style={{ paddingTop: 'var(--s-6)' }}>
        <div className="container">
          <div className="aifree-pp-layout">
            {/* 좌: 시나리오 선택 */}
            <aside className="aifree-pp-side">
              <div className="aifree-ex-side-title">시나리오</div>
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  className={`aifree-pp-scenario${scenario.id === s.id ? ' active' : ''}`}
                  onClick={() => pick(s)}
                >
                  <span className="aifree-pp-cat">{s.category}</span>
                  <span>{s.title}</span>
                </button>
              ))}
            </aside>

            {/* 우: 작성 + 평가 */}
            <div className="aifree-pp-main">
              <div className="aifree-pp-brief">
                <h3>{scenario.title}</h3>
                <p><strong>상황</strong> {scenario.situation}</p>
                <p><strong>목표</strong> {scenario.goal}</p>
              </div>

              <textarea
                className="aifree-pp-input"
                value={input}
                onChange={(e) => { setInput(e.target.value); setResult(null); }}
                placeholder="여기에 프롬프트를 작성하세요. (역할·맥락·지시·형식·제약을 담아보세요)"
                rows={9}
              />
              <div className="aifree-pp-actions">
                <span className="aifree-pp-len">{input.trim().length}자</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-ghost" onClick={() => setShowAnswer((v) => !v)}>
                    {showAnswer ? '모범답안 숨기기' : '모범답안 보기'}
                  </button>
                  <button className="btn btn-primary" onClick={evaluate} disabled={!input.trim()}>평가받기</button>
                </div>
              </div>

              {result && (
                <div className="aifree-pp-result">
                  <div className="aifree-pp-score">
                    <div className="aifree-pp-grade" style={{ background: GRADE_COLOR[result.grade] }}>{result.grade}</div>
                    <div>
                      <div className="aifree-pp-total">{result.total}<span> / 100</span></div>
                      <div className="aifree-pp-total-label">SCORE 종합 점수</div>
                    </div>
                  </div>
                  <div className="aifree-pp-bars">
                    {DIMENSIONS.map((d) => {
                      const v = result[d.key] as number;
                      return (
                        <div className="aifree-pp-bar-row" key={d.key}>
                          <span className="aifree-pp-bar-label">{d.label}</span>
                          <div className="aifree-pp-bar"><div className="aifree-pp-bar-fill" style={{ width: `${(v / 20) * 100}%` }} /></div>
                          <span className="aifree-pp-bar-val">{v}/20</span>
                        </div>
                      );
                    })}
                  </div>
                  {result.feedback.length > 0 && (
                    <div className="aifree-pp-feedback">
                      <strong><i className="fa-solid fa-comment-dots" /> 개선 피드백</strong>
                      <ul>{result.feedback.map((f, i) => <li key={i}>{f}</li>)}</ul>
                    </div>
                  )}
                </div>
              )}

              {showAnswer && (
                <div className="aifree-pp-answer">
                  <div className="aifree-ex-prompt-head"><span>모범 프롬프트 예시</span></div>
                  <pre className="aifree-ex-prompt">{scenario.exampleAnswer}</pre>
                </div>
              )}

              <div className="aifree-note" style={{ marginTop: 'var(--s-5)' }}>
                <i className="fa-solid fa-circle-info" />
                <div>
                  점수는 키워드·구조 기반 자동 추정입니다. 기준이 궁금하면{' '}
                  <Link to="/prompt/learn">프롬프트 학습(SCORE)</Link>을, 실제 답변은{' '}
                  <Link to="/playground">실습실</Link>에서 받아보세요.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PromptPractice;
