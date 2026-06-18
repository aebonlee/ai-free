import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

/**
 * 프롬프트 평가 — 자유 입력 프롬프트를 6대 기준으로 자동 채점하는 실습 도구.
 * (claude.dreamitbiz.com/prompt-evaluation 이식 · 키워드·구조 기반 휴리스틱)
 */

// 6대 평가 기준 (각 0~3점, 총 18점) — 좋은 프롬프트의 핵심 요소
// detect(): 입력된 프롬프트 텍스트를 휴리스틱으로 분석해 0~3점과 근거를 반환
const criteria = [
  {
    key: 'role',
    icon: 'fa-user-tie',
    title: '역할·페르소나',
    titleEn: 'Role / Persona',
    desc: '명확한 역할(전문성, 관점)을 부여했는가?',
    descEn: 'Did you assign a clear role (expertise, perspective)?',
    why: '역할을 지정하면 모델이 해당 전문가의 어휘·판단 기준·디테일로 답합니다. 같은 질문도 "전문가로서" 답하면 깊이가 달라집니다.',
    whyEn: 'A role makes the model answer with that expert\'s vocabulary, judgment, and detail. The same question answered "as an expert" yields far more depth.',
    tip: '"당신은 10년 경력의 시니어 백엔드 개발자입니다"처럼 역할과 전문성을 구체적으로 지정하세요.',
    tipEn: 'Assign a concrete role and expertise, e.g. "You are a senior backend developer with 10 years of experience."',
    detect: (t: string) => {
      const role = /당신은|너는|역할|as an?\s|you are|act as|전문가|시니어|senior|경력|개발자|디자이너|마케터|컨설턴트|카피라이터|분석가|변호사|의사|expert|engineer|designer|consultant|writer|analyst/i.test(t);
      const specific = /시니어|senior|\d+\s*년|\d+\s*years|경력|전문가|expert|박사|phd/i.test(t);
      if (role && specific) return { score: 3, ko: '역할과 전문성이 구체적으로 지정됨', en: 'Role and expertise are specified' };
      if (role) return { score: 2, ko: '역할은 있으나 전문성 묘사가 약함', en: 'Role present, but expertise is thin' };
      return { score: 0, ko: '역할/페르소나 지정이 없음', en: 'No role/persona assigned' };
    },
  },
  {
    key: 'context',
    icon: 'fa-layer-group',
    title: '맥락·배경',
    titleEn: 'Context / Background',
    desc: '작업에 필요한 배경 정보와 목적을 제공했는가?',
    descEn: 'Did you provide the background and the goal behind the task?',
    why: '모델은 당신의 상황을 모릅니다. 대상 독자·목적·도메인을 알려주면 추측 대신 맥락에 맞는 결과를 냅니다.',
    whyEn: 'The model doesn\'t know your situation. Telling it the audience, goal, and domain replaces guesswork with context-fit output.',
    tip: '대상 독자, 제품/도메인, 이 결과물이 쓰일 곳 등 "왜"를 함께 적으면 품질이 크게 올라갑니다.',
    tipEn: 'State the audience, product/domain, and where the output will be used — giving the "why" sharply improves quality.',
    detect: (t: string) => {
      let n = 0;
      if (/<context>|배경|맥락|목적|우리(는|\s?회사)|제품|서비스|대상|타겟|target|고객|상황|프로젝트|because|since|audience|goal/i.test(t)) n++;
      if (t.length > 150) n++;
      if (/\[[^\]]+\]/.test(t)) n++; // [제품], [목표] 같은 라벨
      if (n >= 2) return { score: 3, ko: '배경·목적 등 맥락이 충분함', en: 'Rich context and goal provided' };
      if (n === 1) return { score: 2, ko: '맥락이 일부 제공됨', en: 'Some context provided' };
      return { score: 0, ko: '배경/목적 정보가 없음', en: 'No background/goal given' };
    },
  },
  {
    key: 'task',
    icon: 'fa-bullseye',
    title: '구체적 지시',
    titleEn: 'Specific Instruction',
    desc: '무엇을 해야 하는지 모호하지 않고 구체적인가?',
    descEn: 'Is the task specific and unambiguous?',
    why: '모호한 지시는 모호한 답을 부릅니다. 측정 가능한 수치(개수·길이·범위)가 있으면 결과가 예측 가능해집니다.',
    whyEn: 'Vague asks produce vague answers. Measurable targets (count, length, scope) make the result predictable.',
    tip: '"좋게 만들어줘" 대신 "X를 3개 항목으로, 각 1~2문장으로 작성"처럼 측정 가능하게 지시하세요.',
    tipEn: 'Replace "make it good" with measurable asks like "write 3 bullet points, 1–2 sentences each."',
    detect: (t: string) => {
      const verb = /작성|만들|생성|분석|요약|설명|리뷰|평가|번역|수정|개선|추천|정리|작성해|write|create|generate|analyz|summariz|explain|review|translat|improve|list|draft/i.test(t);
      const quant = /\d+\s*(개|가지|줄|문장|단어|자|단계|items?|points?|words?|sentences?|steps?)|이내|이하|이상|최대|최소|within|under|at most/i.test(t);
      if (verb && quant) return { score: 3, ko: '구체적 동작 + 측정 가능한 범위 지시', en: 'Specific action with measurable scope' };
      if (verb) return { score: 2, ko: '할 일은 있으나 구체성이 부족함', en: 'Task present but lacks specifics' };
      if (t.trim().length > 0) return { score: 1, ko: '지시가 모호함', en: 'Instruction is vague' };
      return { score: 0, ko: '지시가 없음', en: 'No instruction' };
    },
  },
  {
    key: 'format',
    icon: 'fa-table-list',
    title: '출력 형식',
    titleEn: 'Output Format',
    desc: '원하는 출력 형식·구조를 명시했는가?',
    descEn: 'Did you specify the desired output format/structure?',
    why: '형식을 정하지 않으면 매번 다른 모양의 답이 옵니다. 형식을 못박으면 자동화·재사용이 쉬워집니다.',
    whyEn: 'Without a format you get a different shape every time. Pinning the format makes outputs automatable and reusable.',
    tip: '표, JSON, 마크다운, 항목 수, 글자 수 등 원하는 형식을 명확히 지정하세요(구조화 출력 활용도 가능).',
    tipEn: 'Specify table, JSON, markdown, item count, character limits, etc. (structured outputs can enforce this).',
    detect: (t: string) => {
      let n = 0;
      if (/형식|포맷|format|<format>|표(로|\s?형식)?|테이블|table|json|마크다운|markdown|불릿|bullet|리스트|목록|번호|단계별|항목|csv/i.test(t)) n++;
      if (/(^|\n)\s*(-|\d+\.|•|\*)\s/.test(t)) n++; // 목록/번호 구조 포함
      if (n >= 2) return { score: 3, ko: '출력 형식이 명확히 지정됨', en: 'Output format clearly specified' };
      if (n === 1) return { score: 2, ko: '형식 힌트가 일부 있음', en: 'Some format hints present' };
      return { score: 0, ko: '출력 형식 지정이 없음', en: 'No output format specified' };
    },
  },
  {
    key: 'constraints',
    icon: 'fa-ruler-combined',
    title: '제약·규칙',
    titleEn: 'Constraints / Rules',
    desc: '톤, 길이, 금지사항 등 제약을 제시했는가?',
    descEn: 'Did you set constraints — tone, length, prohibitions?',
    why: '제약은 결과의 경계를 정합니다. 길이·톤·금지사항을 정하면 엉뚱하거나 과한 답을 막을 수 있습니다.',
    whyEn: 'Constraints set the boundaries. Length, tone, and prohibitions prevent off-target or bloated answers.',
    tip: '"전문 용어 금지", "200자 이내", "정중한 톤"처럼 경계를 정하면 결과가 안정적입니다.',
    tipEn: 'Boundaries like "no jargon", "under 200 characters", "polite tone" make outputs more reliable.',
    detect: (t: string) => {
      const c = /이내|이하|글자|단어\s?이내|금지|하지\s?마|말\s?것|제외|제한|톤|말투|어조|tone|정중|격식|formal|반드시|필수|must|avoid|don'?t|do not|없이|만\s?사용|간결|concise|한국어로|영어로/gi;
      const hits = (t.match(c) || []).length;
      if (hits >= 2) return { score: 3, ko: '톤·길이·금지 등 제약이 충분함', en: 'Clear constraints (tone/length/avoid)' };
      if (hits === 1) return { score: 2, ko: '제약이 일부 있음', en: 'Some constraints present' };
      return { score: 0, ko: '제약/규칙이 없음', en: 'No constraints given' };
    },
  },
  {
    key: 'examples',
    icon: 'fa-list-check',
    title: '예시(Few-shot)',
    titleEn: 'Examples (Few-shot)',
    desc: '원하는 결과의 예시를 1개 이상 제공했는가?',
    descEn: 'Did you provide at least one example of the desired result?',
    why: '예시는 백 마디 설명보다 강력합니다. 입력→출력 예를 보여주면 모델이 패턴을 그대로 따라합니다.',
    whyEn: 'An example beats a hundred words of explanation. Show input→output and the model mirrors the pattern.',
    tip: '입력→출력 예시를 한두 개 보여주면 모델이 패턴을 빠르게 학습합니다(가장 강력한 기법 중 하나).',
    tipEn: 'Showing one or two input→output examples lets the model learn the pattern fast (one of the strongest techniques).',
    detect: (t: string) => {
      const ex = /예시|예:|예\)|보기|example|e\.?g\.|<example>|샘플|sample|다음과\s?같|아래와\s?같|input.*output|입력.*출력|few-?shot/gi;
      const hits = (t.match(ex) || []).length;
      if (hits >= 1 && /<example>|예시|example/i.test(t)) return { score: 3, ko: '예시(Few-shot)가 포함됨', en: 'Includes example(s)' };
      if (hits >= 1) return { score: 2, ko: '예시 유사 표현이 있음', en: 'Example-like cues present' };
      return { score: 0, ko: '예시가 없음', en: 'No examples provided' };
    },
  },
];

const levelLabels = [
  { ko: '없음', en: 'None' },
  { ko: '미흡', en: 'Weak' },
  { ko: '보통', en: 'OK' },
  { ko: '우수', en: 'Strong' },
];

// Before → After 개선 예시
const examples = [
  {
    topic: '마케팅 카피',
    topicEn: 'Marketing Copy',
    before: '신제품 마케팅 문구 써줘.',
    beforeEn: 'Write marketing copy for a new product.',
    beforeScore: 3,
    after: `당신은 B2B SaaS 카피라이터입니다.
[제품] 50~200명 규모 중소기업용 프로젝트 관리 도구
[목표] 무료 체험 가입 전환

랜딩 페이지 카피를 작성하세요.
- 헤드라인(10단어 이내) 1개
- 서브헤드라인(20단어 이내) 1개
- CTA 버튼 문구 2개
- 핵심 특징 3가지(각 1문장)
전문 용어는 피하고 신뢰감 있는 톤으로 작성하세요.`,
    afterEn: `You are a B2B SaaS copywriter.
[Product] A project management tool for SMBs of 50–200 people
[Goal] Convert visitors to a free trial signup

Write landing page copy:
- 1 headline (under 10 words)
- 1 subheadline (under 20 words)
- 2 CTA button texts
- 3 key features (1 sentence each)
Avoid jargon; use a trustworthy tone.`,
    afterScore: 16,
  },
  {
    topic: '코드 리뷰',
    topicEn: 'Code Review',
    before: '이 코드 고쳐줘.',
    beforeEn: 'Fix this code.',
    beforeScore: 2,
    after: `당신은 Python 보안에 밝은 시니어 리뷰어입니다.
아래 FastAPI 라우터를 리뷰하세요.

<목표> 운영 배포 전 보안·성능 점검 </목표>
<출력 형식>
1. 발견한 문제 (심각도: 높음/중간/낮음)
2. 수정 코드 (타입 힌트 포함, PEP 8)
3. 한 줄 요약
</출력 형식>
추측이 아니라 코드에 근거해 지적하세요.

[여기에 코드]`,
    afterEn: `You are a senior reviewer strong in Python security.
Review the FastAPI router below.

<goal> Pre-production security & performance check </goal>
<output_format>
1. Issues found (severity: high/medium/low)
2. Fixed code (with type hints, PEP 8)
3. One-line summary
</output_format>
Ground every point in the code, not guesses.

[code here]`,
    afterScore: 17,
  },
  {
    topic: '문서 요약',
    topicEn: 'Document Summary',
    before: '이 문서 요약해줘.',
    beforeEn: 'Summarize this document.',
    beforeScore: 2,
    after: `당신은 임원 보고를 돕는 비서입니다.
아래 보고서를 바쁜 CEO가 30초 안에 읽도록 요약하세요.

<형식>
- 핵심 결론 1문장
- 주요 근거 3개(불릿)
- 권장 다음 행동 1개
</형식>
숫자·고유명사는 원문 그대로 유지하고, 추측은 넣지 마세요.

[여기에 문서]`,
    afterEn: `You are an assistant supporting executive briefings.
Summarize the report below so a busy CEO can read it in 30 seconds.

<format>
- 1-sentence key takeaway
- 3 supporting points (bullets)
- 1 recommended next action
</format>
Keep numbers and proper nouns verbatim; add no speculation.

[document here]`,
    afterScore: 16,
  },
];

// 실습 과제 — 학습자가 직접 개선
const challenges = [
  {
    weak: '블로그 글 써줘.',
    weakEn: 'Write a blog post.',
    hint: '주제, 대상 독자, 길이, 톤, 구조(소제목/리스트), 포함할 키워드를 더해보세요.',
    hintEn: 'Add topic, audience, length, tone, structure (headings/lists), and keywords to include.',
  },
  {
    weak: '데이터 분석해줘.',
    weakEn: 'Analyze the data.',
    hint: '데이터의 형태, 분석 목적, 원하는 지표, 결과 형식(표/차트 설명), 가정 처리 방식을 명시하세요.',
    hintEn: 'Specify the data shape, the analysis goal, target metrics, output format (table/chart description), and how to handle assumptions.',
  },
  {
    weak: '이메일 답장 써줘.',
    weakEn: 'Write an email reply.',
    hint: '발신자 관계, 답장의 목적, 톤, 길이, 반드시 포함/배제할 내용을 더하고 원문 맥락을 붙이세요.',
    hintEn: 'Add the relationship, the reply’s goal, tone, length, must-include/exclude points, and paste the original context.',
  },
];

const PromptEvaluation = (): ReactElement => {
  const { language } = useLanguage();
  const isKo = language === 'ko';

  const [promptText, setPromptText] = useState('');
  const [scores, setScores] = useState<(number | null)[]>(Array(criteria.length).fill(null));
  const [reasons, setReasons] = useState<({ ko: string; en: string } | null)[]>(Array(criteria.length).fill(null));
  const [scored, setScored] = useState(false);

  // "채점해보기" — 입력 프롬프트를 자동 분석
  const handleScore = () => {
    const results = criteria.map((c) => c.detect(promptText));
    setScores(results.map((r) => r.score));
    setReasons(results.map((r) => ({ ko: r.ko, en: r.en })));
    setScored(true);
  };

  // 수동 미세 조정(자동 채점 결과를 강사/학습자가 보정 가능)
  const setScore = (idx: number, val: number) => {
    setScores((prev) => {
      const next = [...prev];
      next[idx] = next[idx] === val ? null : val;
      return next;
    });
    setScored(true);
  };

  const total = useMemo(() => scores.reduce<number>((sum, s) => sum + (s ?? 0), 0), [scores]);
  const answered = scores.filter((s) => s !== null).length;
  const maxScore = criteria.length * 3;

  const grade = useMemo(() => {
    if (answered === 0) return null;
    if (total >= 16) return { letter: 'A', ko: '우수한 프롬프트', en: 'Excellent prompt', color: '#00855A' };
    if (total >= 12) return { letter: 'B', ko: '좋은 프롬프트', en: 'Good prompt', color: '#3D6FE0' };
    if (total >= 7) return { letter: 'C', ko: '보통 — 보완 필요', en: 'Average — needs work', color: '#D4760A' };
    return { letter: 'D', ko: '초안 — 대폭 개선 필요', en: 'Draft — needs major work', color: '#C8102E' };
  }, [total, answered]);

  // 점수가 낮은(<=1) 기준에 대한 개선 제안
  const weakPoints = criteria
    .map((c, i) => ({ c, s: scores[i] }))
    .filter((x) => x.s !== null && (x.s as number) <= 1);

  const resetAll = () => {
    setScores(Array(criteria.length).fill(null));
    setReasons(Array(criteria.length).fill(null));
    setScored(false);
    setPromptText('');
  };

  return (
    <>
      <SEOHead
        title={isKo ? '프롬프트 평가' : 'Prompt Evaluation'}
        description={
          isKo
            ? '프롬프트를 입력하면 6대 기준으로 자동 채점하고 개선점을 알려줍니다.'
            : 'Paste a prompt and get an automatic 6-criteria score with improvement tips.'
        }
        path="/prompt/evaluation"
      />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Prompt Evaluation</div>
          <h2>{isKo ? '프롬프트 평가' : 'Prompt Evaluation'}</h2>
          <p>
            {isKo
              ? '평가할 프롬프트를 입력하고 "채점해보기"를 누르면 6대 기준으로 자동 채점합니다. 항목별 점수 근거와 개선점을 확인하고, 직접 점수를 보정할 수도 있습니다.'
              : 'Paste a prompt and click "Score it" for an automatic 6-criteria evaluation. See per-criterion reasons and improvement tips — and adjust the scores yourself if you like.'}
          </p>
        </div>
      </section>

      <section className="section-ed eval-page" style={{ paddingTop: 'var(--s-6)' }}>
        <div className="container">
          {/* 평가기 */}
          <div className="eval-grid">
            {/* 왼쪽: 프롬프트 입력 + 채점 버튼 */}
            <div className="eval-input-panel">
              <h3>{isKo ? '평가할 프롬프트' : 'Prompt to Evaluate'}</h3>
              <textarea
                className="practice-textarea"
                placeholder={isKo ? '평가하고 싶은 프롬프트를 붙여넣으세요...' : 'Paste the prompt you want to evaluate...'}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <div className="eval-input-actions">
                <span className="eval-charcount">
                  {isKo ? '글자 수' : 'Characters'}: {promptText.length}
                </span>
                <div className="practice-actions">
                  <button className="btn btn-primary" onClick={handleScore} disabled={!promptText.trim()}>
                    <i className="fa-solid fa-gauge-high" /> {isKo ? '채점해보기' : 'Score it'}
                  </button>
                  <button className="btn btn-ghost" onClick={resetAll}>
                    <i className="fa-solid fa-rotate-left" /> {isKo ? '초기화' : 'Reset'}
                  </button>
                </div>
              </div>
              <p className="eval-disclaimer">
                {isKo
                  ? '※ 키워드·구조 기반 자동 분석으로 점수를 추정합니다. 학습용 가이드이며, 각 항목을 직접 보정해 최종 판단하세요.'
                  : '※ Scores are estimated by keyword/structure analysis. It is a learning guide — adjust each item to make the final call.'}
              </p>
            </div>

            {/* 오른쪽: 점수 요약 */}
            <div className="eval-score-panel">
              <h3>{isKo ? '평가 결과' : 'Result'}</h3>
              <div className="eval-score-big" style={{ color: grade ? grade.color : 'var(--text-light)' }}>
                {total}
                <span className="eval-score-max">/ {maxScore}</span>
              </div>
              {grade ? (
                <>
                  <div className="eval-grade-badge" style={{ background: grade.color }}>
                    {grade.letter}
                  </div>
                  <p className="eval-grade-label">{isKo ? grade.ko : grade.en}</p>
                </>
              ) : (
                <p className="eval-grade-label muted">
                  {isKo ? '프롬프트를 입력하고 "채점해보기"를 눌러보세요.' : 'Paste a prompt and click "Score it".'}
                </p>
              )}
              <div className="eval-progress">
                <div
                  className="eval-progress-bar"
                  style={{ width: `${(total / maxScore) * 100}%`, background: grade ? grade.color : 'var(--primary-blue)' }}
                />
              </div>
            </div>
          </div>

          {/* 루브릭 채점 + 항목 설명 + 감지 근거 */}
          <h2 className="eval-section-title">{isKo ? '6대 평가 기준' : 'The 6 Criteria'}</h2>
          <p className="eval-section-sub">
            {isKo
              ? '각 기준은 0~3점입니다. 채점 후 항목마다 "왜 중요한지"와 자동 분석 근거가 표시됩니다.'
              : 'Each criterion is scored 0–3. After scoring, every item shows "why it matters" and the analysis reason.'}
          </p>
          <div className="eval-rubric">
            {criteria.map((c, i) => (
              <div key={c.key} className="eval-criterion">
                <div className="eval-criterion-head">
                  <span className="eval-criterion-icon">
                    <i className={`fa-solid ${c.icon}`} />
                  </span>
                  <div>
                    <div className="eval-criterion-title">
                      {isKo ? c.title : c.titleEn}
                      {scores[i] !== null && <span className="eval-criterion-score">{scores[i]}/3</span>}
                    </div>
                    <div className="eval-criterion-desc">{isKo ? c.desc : c.descEn}</div>
                  </div>
                </div>

                <p className="eval-criterion-why">
                  <i className="fa-solid fa-circle-info" /> {isKo ? c.why : c.whyEn}
                </p>

                <div className="eval-levels">
                  {levelLabels.map((lv, val) => (
                    <button
                      key={val}
                      className={`eval-level-btn${scores[i] === val ? ' active' : ''}`}
                      onClick={() => setScore(i, val)}
                    >
                      <span className="eval-level-num">{val}</span>
                      <span className="eval-level-label">{isKo ? lv.ko : lv.en}</span>
                    </button>
                  ))}
                </div>

                {reasons[i] && (
                  <div className="eval-detect">
                    <i className="fa-solid fa-magnifying-glass" /> {isKo ? reasons[i]!.ko : reasons[i]!.en}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 맞춤 개선 제안 */}
          {scored && (
            weakPoints.length > 0 ? (
              <div className="eval-feedback">
                <h3>
                  <i className="fa-solid fa-lightbulb" /> {isKo ? '개선 제안' : 'Improvement Tips'}
                </h3>
                <ul>
                  {weakPoints.map((x) => (
                    <li key={x.c.key}>
                      <strong>{isKo ? x.c.title : x.c.titleEn}:</strong> {isKo ? x.c.tip : x.c.tipEn}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="eval-feedback good">
                <h3>
                  <i className="fa-solid fa-circle-check" /> {isKo ? '잘 작성된 프롬프트입니다!' : 'Well-crafted prompt!'}
                </h3>
                <p style={{ margin: 0 }}>
                  {isKo
                    ? '6대 기준을 고르게 충족했습니다. 실제 결과를 보며 세부 표현을 다듬어 보세요.'
                    : 'It covers the 6 criteria evenly. Refine the wording while watching real outputs.'}
                </p>
              </div>
            )
          )}

          {/* Before → After 예시 */}
          <h2 className="eval-section-title">{isKo ? 'Before → After 개선 사례' : 'Before → After Examples'}</h2>
          <div className="eval-examples">
            {examples.map((ex, idx) => (
              <div key={idx} className="eval-example-card">
                <div className="eval-example-topic">{isKo ? ex.topic : ex.topicEn}</div>
                <div className="eval-example-cols">
                  <div className="eval-example-col before">
                    <div className="eval-example-head">
                      <span className="eval-tag bad">Before</span>
                      <span className="eval-example-score">{ex.beforeScore} / 18</span>
                    </div>
                    <pre>{isKo ? ex.before : ex.beforeEn}</pre>
                  </div>
                  <div className="eval-example-col after">
                    <div className="eval-example-head">
                      <span className="eval-tag good">After</span>
                      <span className="eval-example-score">{ex.afterScore} / 18</span>
                    </div>
                    <pre>{isKo ? ex.after : ex.afterEn}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 실습 과제 */}
          <h2 className="eval-section-title">{isKo ? '실습 과제 — 직접 개선해보세요' : 'Challenges — Improve These Yourself'}</h2>
          <div className="eval-challenges">
            {challenges.map((ch, idx) => (
              <div key={idx} className="eval-challenge-card">
                <div className="eval-challenge-num">{idx + 1}</div>
                <div className="eval-challenge-body">
                  <pre className="eval-challenge-weak">{isKo ? ch.weak : ch.weakEn}</pre>
                  <p className="eval-challenge-hint">
                    <i className="fa-solid fa-wand-magic-sparkles" /> {isKo ? ch.hint : ch.hintEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="eval-footnote">
            {isKo
              ? '→ 위 과제를 개선한 뒤, 상단 입력창에 붙여넣고 "채점해보기"로 점수를 확인하세요. 12점 이상을 목표로!'
              : '→ After improving each challenge, paste it into the box above and click "Score it". Aim for 12+!'}
          </p>

          <div className="aifree-note" style={{ marginTop: 'var(--s-5)' }}>
            <i className="fa-solid fa-circle-info" />
            <div>
              {isKo ? (
                <>
                  평가 기준의 배경이 궁금하면 <Link to="/prompt/learn">프롬프트 학습(SCORE)</Link>을,
                  시나리오 기반 작성 연습은 <Link to="/prompt/practice">작성 실습</Link>에서 이어가세요.
                </>
              ) : (
                <>
                  Learn the rationale in <Link to="/prompt/learn">Prompt Learning (SCORE)</Link>, or
                  practice writing by scenario in <Link to="/prompt/practice">Writing Practice</Link>.
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PromptEvaluation;
