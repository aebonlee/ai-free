/**
 * learnData.ts — "학습하기" 자료
 *
 * GuidePage 컴포넌트에 전달하는 학습 데이터.
 * dataFiles 가 2개 이상이면 좌측 메뉴가 접이식 그룹으로 표시됩니다.
 *   1) 인공지능 기초
 *   2) 프롬프트 기초
 *   3) 프롬프트 활용
 */

export interface LearnSection {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

export interface LearnFile {
  id: string;
  icon: string;
  title: string;
  titleEn: string;
  sections: LearnSection[];
}

/* ─────────────────────────── 1) 인공지능 기초 ─────────────────────────── */
const aiBasics: LearnFile = {
  id: 'ai-basics',
  icon: 'fa-solid fa-robot',
  title: '인공지능 기초',
  titleEn: 'AI Basics',
  sections: [
    {
      title: '생성형 AI란 무엇인가',
      titleEn: 'What is Generative AI',
      content: `## 생성형 AI(Generative AI)란?

**생성형 AI**는 사람이 만든 방대한 글·이미지·코드를 학습해서, 새로운 내용을 *만들어내는* 인공지능입니다. 기존의 "검색"이 이미 있는 자료를 **찾아주는** 것이라면, 생성형 AI는 질문에 맞춰 문장을 **새로 써주는** 것이 가장 큰 차이입니다.

### 어떻게 답을 만들까?
대규모 언어모델(LLM)은 "지금까지의 문맥에서 **다음에 올 가장 그럴듯한 단어**"를 한 글자씩 이어붙이며 답을 만듭니다. 그래서:

- 매번 답이 조금씩 다를 수 있습니다(확률 기반).
- 사실이 아닌 내용을 그럴듯하게 지어낼 수 있습니다(→ "환각", 뒤에서 설명).

### 무엇을 할 수 있나
| 분야 | 예시 |
|------|------|
| 글쓰기 | 이메일, 보고서, 홍보문구 초안 |
| 요약·번역 | 긴 문서 3줄 요약, 자연스러운 번역 |
| 아이디어 | 기획·브레인스토밍 |
| 코딩 | 코드 작성·설명·오류 수정 |
| 학습 | 어려운 개념을 눈높이에 맞게 설명 |

> 핵심: 생성형 AI는 **만능 정답기**가 아니라, 내가 잘 시키면 잘 도와주는 **똑똑한 조수**입니다.`,
      contentEn: `## What is Generative AI?

Generative AI learns from huge amounts of human text/images/code and *creates* new content. Unlike search (which finds existing material), generative AI **writes new text** tailored to your question.

It predicts the most likely next word given the context, so answers can vary and it may confidently make up facts ("hallucination").`,
    },
    {
      title: 'ChatGPT · Claude · Gemini · Genspark 차이',
      titleEn: 'Comparing the 4 AIs',
      content: `## 주요 생성형 AI 비교

각 AI는 잘하는 영역이 조금씩 다릅니다. 상황에 맞게 골라 쓰는 감각이 중요합니다.

| AI | 제공사 | 강점 | 이런 일에 |
|----|--------|------|-----------|
| **ChatGPT** | OpenAI | 범용·균형, 사용자 많음 | 일상 업무 전반, 글쓰기, 코딩 |
| **Claude** | Anthropic | 긴 문서 분석, 자연스러운 글 | 문서 요약·교정, 회의록, 코드 리뷰 |
| **Gemini** | Google | 최신 정보 검색 연동 | 시사·검색형 질문, 구글 도구 연계 |
| **Genspark** | Genspark | 에이전트·자동 리서치 | 주제 리서치(Sparkpage), 발표자료 |

### 고르는 기준
- **최신 정보**가 필요하다 → Gemini(검색 연동)
- **긴 문서**를 다룬다 → Claude
- **무난하게 다 되는** 도구가 필요하다 → ChatGPT
- **자동 리서치/슬라이드** → Genspark

> 정답은 없습니다. 같은 질문을 두세 AI에 던져보고 결과를 **비교**하는 것이 가장 좋은 학습법입니다.`,
      contentEn: `## Comparing the major AIs

- **ChatGPT (OpenAI)** — versatile, balanced, huge user base.
- **Claude (Anthropic)** — long documents, natural writing.
- **Gemini (Google)** — search-connected, latest info.
- **Genspark** — agentic research, slides.

Try the same prompt on two or three and compare.`,
    },
    {
      title: '무료요금제 이해하기',
      titleEn: 'Understanding Free Tiers',
      content: `## 무료요금제로 어디까지?

대부분의 AI는 **카드 등록 없이** 가입만 하면 무료로 쓸 수 있습니다. 학습·연습 용도로는 무료요금제로도 충분합니다.

### 무료요금제의 공통 특징
- **사용량 한도**가 있습니다(시간당/하루 메시지 수 등).
- 한도를 넘으면 **잠시 대기**하거나 **경량 모델로 자동 전환**됩니다.
- 최신 고급 모델·대용량 분석은 유료에서 더 넉넉합니다.

### 무료로 아껴 쓰는 법
1. **긴 작업은 단계로 나누기** — 한 번에 몰아치지 않기.
2. **새 주제는 새 대화로** — 이전 맥락이 쌓이면 한도가 빨리 소모됩니다.
3. **핵심만 붙여넣기** — 불필요하게 긴 글은 줄여서.

> 이 사이트의 **AI 도구** 메뉴에서 각 서비스의 무료 한도와 절약 팁을 자세히 볼 수 있습니다.`,
      contentEn: `## How far can free tiers go?

Most AIs are free to use after sign-up (no card). Free tiers have usage limits and may switch to lighter models when exceeded. Split long tasks, start new chats for new topics, and paste only what's needed.`,
    },
    {
      title: '꼭 알아야 할 주의점 (환각·개인정보)',
      titleEn: 'Cautions (Hallucination & Privacy)',
      content: `## AI를 쓸 때 꼭 지킬 것

### 1) 환각(Hallucination) — 그럴듯한 거짓
AI는 모르는 것도 **자신 있게 지어낼 수 있습니다.** 특히 통계 수치, 인용, 법·의학 정보, 최신 사건은 그대로 믿지 마세요.

- ✅ **사실 확인**: 중요한 내용은 반드시 출처로 교차 검증
- ✅ 근거를 요청: "출처와 함께 알려줘"
- ✅ 검색 연동 AI(Gemini 등)를 활용

### 2) 개인정보·기밀 보호
입력한 내용은 서비스 개선에 쓰일 수 있습니다. **민감정보는 넣지 마세요.**

- ❌ 주민번호, 카드번호, 비밀번호, 고객 개인정보
- ❌ 회사 기밀·미공개 계약 내용
- ✅ 넣어야 한다면 이름·숫자를 가린 뒤 사용

### 3) 저작권·책임
- AI 결과물을 그대로 쓰기 전, **검토·수정**은 사람의 몫입니다.
- 최종 책임은 사용자에게 있습니다.

> "AI는 초안을 빠르게, 사람은 검증과 결정을." 이 원칙만 지켜도 안전하게 활용할 수 있습니다.`,
      contentEn: `## Key cautions

**Hallucination**: AI can confidently make things up — verify facts, ask for sources, use search-connected AIs.

**Privacy**: don't enter personal/confidential data; mask names and numbers.

**Responsibility**: humans review and decide; AI just drafts.`,
    },
  ],
};

/* ─────────────────────────── 2) 프롬프트 기초 ─────────────────────────── */
const promptBasics: LearnFile = {
  id: 'prompt-basics',
  icon: 'fa-solid fa-pen-to-square',
  title: '프롬프트 기초',
  titleEn: 'Prompt Basics',
  sections: [
    {
      title: '프롬프트란 무엇인가',
      titleEn: 'What is a Prompt',
      content: `## 프롬프트(Prompt)란?

**프롬프트**는 AI에게 시키는 **명령·질문·요청**, 즉 우리가 입력하는 글 전체를 말합니다. AI의 답 품질은 **프롬프트의 품질에 직접 비례**합니다.

### 같은 일, 다른 프롬프트
| 프롬프트 | 결과 |
|---------|------|
| "보고서 써줘" | 무엇에 대한? 막연한 일반론 |
| "신제품 출시 결과를 팀장 보고용으로, 실적 표 + 이슈 + 차주계획 순서로 A4 1장" | 바로 쓸 수 있는 구체적 결과 |

> 프롬프트는 "검색어"가 아니라 **"업무 지시서"**라고 생각하세요. 신입에게 일을 시키듯 구체적으로 적을수록 좋습니다.`,
      contentEn: `## What is a prompt?

A prompt is the instruction/question you give the AI. Answer quality is directly proportional to prompt quality. Think of it as a work order, not a search keyword — the more specific, the better.`,
    },
    {
      title: '좋은 프롬프트의 5원칙',
      titleEn: '5 Principles',
      content: `## 좋은 프롬프트의 5원칙

좋은 프롬프트는 다음 5가지를 갖춥니다. 머리글자로 **"역-맥-구-형-제"**로 기억하세요.

1. **역할(Role)** — "너는 ○○ 담당자야"
2. **맥락(Context)** — 상황·배경 정보 제공
3. **구체적 지시(Task)** — 무엇을 해야 하는지 명확히
4. **형식(Format)** — 표/목록/분량 등 출력 형태 지정
5. **제약(Constraint)** — 톤, 글자 수, 금지사항

### 적용 예시
\`\`\`
[역할] 너는 카페 마케터야.
[맥락] 신메뉴 '흑임자 라떼'를 인스타에 홍보하려 해.
[지시] 홍보 문구를 만들어줘.
[형식] 3개, 각 2문장 + 해시태그 5개.
[제약] 20대가 좋아할 친근한 말투로.
\`\`\`

> 5가지를 다 넣지 않아도 됩니다. 하지만 **결과가 마음에 안 들면 빠진 항목부터 보충**하세요.`,
      contentEn: `## 5 principles

Role, Context, Task, Format, Constraint. Include what's needed; when results disappoint, add the missing piece first.`,
    },
    {
      title: '역할 부여하기 (Role)',
      titleEn: 'Assigning a Role',
      content: `## 역할을 주면 답이 달라진다

AI에게 **전문가 역할**을 부여하면, 그 분야의 어투·관점·깊이로 답합니다.

| 역할 없음 | 역할 부여 |
|-----------|-----------|
| "이력서 봐줘" | "너는 10년차 인사담당자야. 채용 관점에서 이 이력서를 평가해줘" |
| "코드 검토해줘" | "너는 시니어 백엔드 개발자야. 보안·성능 관점에서 리뷰해줘" |

### 역할 표현 패턴
- "너는 \`{직업/전문가}\`야."
- "\`{대상}\`에게 설명하듯 답해줘." (예: 초등학생에게)
- "\`{관점}\` 입장에서 검토해줘." (예: 고객 입장)

> 역할은 **답의 톤과 깊이**를 결정하는 가장 쉬운 스위치입니다.`,
      contentEn: `## Assigning a role

Give the AI an expert role and it answers with that field's tone, perspective, and depth. Patterns: "You are a {role}", "Explain as if to {audience}", "Review from the {viewpoint} perspective".`,
    },
    {
      title: '출력 형식 지정하기 (Format)',
      titleEn: 'Specifying Format',
      content: `## 원하는 모양으로 받기

형식을 지정하지 않으면 AI는 줄글로 길게 답하기 쉽습니다. **출력 형태**를 정해주면 바로 쓸 수 있는 결과가 나옵니다.

### 자주 쓰는 형식 지정
- "**표**로 정리해줘 (열: 항목/내용/비고)"
- "**번호 목록**으로, 5개"
- "**3문단**, 각 문단 100자 내외"
- "**JSON** 형식으로" (개발용)
- "**마크다운 제목**으로 구분해서"

### 분량 제어
- "A4 1페이지 이내로"
- "한 문장으로 요약"
- "초등학생도 이해하게 쉽게"

> 표·목록은 그대로 복사해 엑셀·문서·협업툴에 붙여 쓸 수 있어 업무 효율이 크게 올라갑니다.`,
      contentEn: `## Get the shape you want

Without a format the AI tends to ramble. Specify tables, numbered lists, paragraph counts, length limits, or JSON to get directly usable output.`,
    },
    {
      title: '맥락 제공하기 (Context)',
      titleEn: 'Providing Context',
      content: `## 배경을 알려주면 정확해진다

AI는 내 상황을 모릅니다. **배경·목적·대상**을 알려줄수록 헛다리를 짚지 않습니다.

### 넣으면 좋은 맥락
- **목적**: "왜" 필요한지 (예: 신입 교육용)
- **대상 독자**: 누가 읽는지 (예: 임원 보고용)
- **배경 사실**: 관련 데이터·상황 (\`\`\`로 감싸 붙여넣기)
- **하지 말 것**: 피해야 할 내용

### 자료를 붙여넣는 법
\`\`\`
다음 자료를 바탕으로 답해줘:
"""
(여기에 참고 자료 붙여넣기)
"""
\`\`\`
이렇게 큰따옴표 3개로 자료를 감싸면 AI가 "지시"와 "자료"를 헷갈리지 않습니다.

> 맥락이 부족하면 AI는 **일반론**을, 충분하면 **내 상황에 맞는 답**을 줍니다.`,
      contentEn: `## Context makes it accurate

The AI doesn't know your situation. Provide purpose, audience, background facts (wrap reference text in triple quotes), and what to avoid.`,
    },
  ],
};

/* ─────────────────────────── 3) 프롬프트 활용 ─────────────────────────── */
const promptAdvanced: LearnFile = {
  id: 'prompt-advanced',
  icon: 'fa-solid fa-wand-magic-sparkles',
  title: '프롬프트 활용',
  titleEn: 'Prompt Techniques',
  sections: [
    {
      title: '단계적 사고 (Chain of Thought)',
      titleEn: 'Chain of Thought',
      content: `## "차근차근 생각해줘"

복잡한 문제는 AI에게 **사고 과정을 단계별로** 펼치게 하면 정답률이 올라갑니다.

### 방법
- "**단계별로 차근차근** 생각해서 풀어줘."
- "먼저 문제를 작은 단위로 **나누고**, 각각 해결한 뒤 종합해줘."
- "결론을 내기 전에 **근거를 먼저** 설명해줘."

### 예시
\`\`\`
다음 일정 문제를 단계별로 풀어줘.
1) 주어진 조건 정리
2) 가능한 경우 나열
3) 각 경우 검토
4) 최종 추천 + 이유
\`\`\`

> 특히 계산·논리·기획처럼 **여러 단계**가 필요한 문제에 효과적입니다.`,
      contentEn: `## "Think step by step"

For complex problems, ask the AI to lay out its reasoning step by step, or to break the problem into parts, solve each, then combine. Effective for calculation, logic, and planning.`,
    },
    {
      title: '예시 제공하기 (Few-shot)',
      titleEn: 'Few-shot Examples',
      content: `## 원하는 답을 "예시"로 보여주기

말로 설명하기 어려운 형식·톤은 **예시 1~2개**를 직접 보여주면 AI가 그대로 따라 합니다.

### 방법
\`\`\`
다음 형식으로 제품 설명을 써줘.

[예시]
제품: 텀블러
한 줄 카피: "온기를 오래, 하루 종일 따뜻하게"
특징: 6시간 보온 / 350ml / 식기세척기 가능

[작성할 것]
제품: 무선 이어폰
\`\`\`

### 언제 쓰나
- 일정한 **양식**으로 여러 개 만들 때
- 특정 **말투·스타일**을 흉내 내고 싶을 때
- 분류·태깅처럼 **규칙**이 있는 작업

> "설명 < 예시." 보여주는 것이 백 마디 설명보다 정확할 때가 많습니다.`,
      contentEn: `## Show, don't just tell

For hard-to-describe formats or tones, give 1–2 concrete examples and the AI will mimic them. Great for templated output, style imitation, and rule-based tasks.`,
    },
    {
      title: '반복 개선하기 (Iteration)',
      titleEn: 'Iterating',
      content: `## 한 번에 완성하려 하지 말기

좋은 결과는 보통 **여러 번 다듬어** 나옵니다. AI와의 대화는 한 번의 질문이 아니라 **협업 과정**입니다.

### 개선 요청 패턴
- "**더 짧게/길게** 해줘"
- "**3번 항목**을 더 구체적으로"
- "톤을 **더 정중하게**"
- "방금 답에서 **○○만 바꿔서** 다시"
- "다른 **3가지 버전**으로"

### 흐름 예시
1. 초안 요청 → 2. 부족한 부분 지적 → 3. 부분 수정 요청 → 4. 톤·분량 조정 → 완성

> 첫 답이 70점이어도 괜찮습니다. **대화로 90점까지** 끌어올리는 것이 진짜 실력입니다.`,
      contentEn: `## Don't aim for one-shot perfection

Good output usually comes from refining. Ask for shorter/longer, more specific sections, tone changes, or alternative versions. Treat it as collaboration.`,
    },
    {
      title: '프롬프트 자가 점검 체크리스트',
      titleEn: 'Self-check Checklist',
      content: `## 보내기 전 5초 점검

프롬프트를 입력하기 전, 아래를 빠르게 확인하면 결과가 확 좋아집니다.

- [ ] **역할**을 줬는가? (너는 ○○야)
- [ ] **맥락**(목적·대상·배경)을 적었는가?
- [ ] **무엇을** 해야 하는지 구체적인가?
- [ ] **출력 형식**(표/목록/분량)을 정했는가?
- [ ] **톤·제약**을 명시했는가?
- [ ] 민감정보를 빼고 넣었는가?

### 결과가 별로일 때 진단
| 증상 | 보충할 것 |
|------|-----------|
| 너무 일반적이다 | 맥락·구체적 지시 |
| 형식이 엉망이다 | 출력 형식 지정 |
| 톤이 안 맞는다 | 역할·제약 |
| 사실이 틀렸다 | 근거 요청 + 사실 확인 |

> 이 체크리스트를 **실습실**과 **예제**에서 직접 적용해 보세요. 보는 것보다 해보는 것이 빠릅니다.`,
      contentEn: `## A 5-second pre-send check

Did you set a role? Provide context? Make the task specific? Define the output format? State tone/constraints? Remove sensitive data? When results are poor, add the missing element.`,
    },
  ],
};

export const LEARN_FILES: LearnFile[] = [aiBasics, promptBasics, promptAdvanced];
