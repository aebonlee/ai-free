import{j as e,L as t}from"./index-BXW0EjzL.js";import{G as n}from"./GuidePage-xo0ldQUU.js";import"./SEOHead-BXlvup10.js";const a={id:"understand-ai",icon:"fa-solid fa-robot",title:"AI 이해하기",titleEn:"Understanding AI",sections:[{title:"생성형 AI란 무엇인가",titleEn:"What is Generative AI",content:`## 생성형 AI(Generative AI)란?

**생성형 AI**는 사람이 만든 방대한 글·이미지·코드를 학습해서, 새로운 내용을 *만들어내는* 인공지능입니다. 기존의 "검색"이 이미 있는 자료를 **찾아주는** 것이라면, 생성형 AI는 질문에 맞춰 문장을 **새로 써주는** 것이 가장 큰 차이입니다.

### 어떻게 답을 만들까?
대규모 언어모델(LLM)은 "지금까지의 문맥에서 **다음에 올 가장 그럴듯한 단어**"를 한 글자씩 이어붙이며 답을 만듭니다. 그래서:

- 매번 답이 조금씩 다를 수 있습니다(확률 기반).
- 사실이 아닌 내용을 그럴듯하게 지어낼 수 있습니다(→ "환각", 뒤에서 설명).

> 핵심: 생성형 AI는 **만능 정답기**가 아니라, 내가 잘 시키면 잘 도와주는 **똑똑한 조수**입니다.

*"어떻게 잘 시키는가"(프롬프트)는 상단 **프롬프트** 메뉴에서 따로 깊이 배웁니다.*`,contentEn:`## What is Generative AI?

Generative AI learns from huge amounts of human text/images/code and *creates* new content. Unlike search (which finds existing material), it writes new text tailored to your question. It predicts the next likely word, so answers vary and it can confidently make things up ("hallucination"). It's a smart assistant, not an oracle.`},{title:"AI로 무엇을 할 수 있나",titleEn:"What AI Can Do",content:`## AI로 할 수 있는 일 (그리고 못하는 일)

### 잘하는 일
| 분야 | 예시 |
|------|------|
| 글쓰기 | 이메일·보고서·홍보문구 초안 |
| 요약·번역 | 긴 문서 3줄 요약, 자연스러운 번역 |
| 아이디어 | 기획·브레인스토밍 |
| 학습 | 어려운 개념을 눈높이에 맞게 설명 |
| 코딩 | 코드 작성·설명·오류 수정 |
| 정리 | 줄글을 표로, 메모를 회의록으로 |

### 아직 서툰 일 (주의)
- **최신·정확한 사실**: 모르는 것도 자신 있게 지어낼 수 있음
- **계산·숫자**: 복잡한 수치는 틀릴 수 있음(검산 필요)
- **개인적·전문적 판단**: 법률·의료·투자 등은 참고용일 뿐

> "초안·정리·설명"은 AI에게, "검증·결정"은 사람에게. 이 역할 분담이 핵심입니다.`,contentEn:`## What AI can (and can't) do

Great at: writing drafts, summarizing/translating, brainstorming, explaining, coding, structuring. Weak at: up-to-date facts, exact math, and professional judgment (legal/medical/finance). Let AI draft; humans verify and decide.`},{title:"ChatGPT · Claude · Gemini · Genspark 차이",titleEn:"Comparing the 4 AIs",content:`## 주요 생성형 AI 비교

각 AI는 잘하는 영역이 조금씩 다릅니다. 상황에 맞게 골라 쓰는 감각이 중요합니다.

| AI | 제공사 | 강점 | 이런 일에 |
|----|--------|------|-----------|
| **ChatGPT** | OpenAI | 범용·균형, 사용자 많음 | 일상 업무 전반, 글쓰기, 코딩 |
| **Claude** | Anthropic | 긴 문서 분석, 자연스러운 글 | 문서 요약·교정, 회의록, 코드 리뷰 |
| **Gemini** | Google | 최신 정보 검색 연동 | 시사·검색형 질문, 구글 도구 연계 |
| **Genspark** | Genspark | 에이전트·자동 리서치 | 주제 리서치(Sparkpage), 발표자료 |

### 고르는 기준
- **최신 정보**가 필요 → Gemini · **긴 문서** → Claude
- **무난하게 다 되는** 도구 → ChatGPT · **자동 리서치/슬라이드** → Genspark

> 같은 질문을 두세 AI에 던져보고 결과를 **비교**하는 것이 가장 좋은 학습법입니다.
> 각 서비스의 무료 한도·가입 방법은 상단 **AI 도구** 메뉴에서 자세히 볼 수 있습니다.`,contentEn:`## Comparing the major AIs

ChatGPT (versatile), Claude (long docs, natural writing), Gemini (latest info via search), Genspark (agentic research/slides). Try the same prompt on a few and compare. See the **AI Tools** menu for each free tier.`}]},i={id:"use-ai-wisely",icon:"fa-solid fa-shield-halved",title:"AI, 안전하고 똑똑하게",titleEn:"Use AI Safely & Smartly",sections:[{title:"무료요금제 이해하기",titleEn:"Understanding Free Tiers",content:`## 무료요금제로 어디까지?

대부분의 AI는 **카드 등록 없이** 가입만 하면 무료로 쓸 수 있습니다. 학습·연습 용도로는 무료요금제로도 충분합니다.

### 무료요금제의 공통 특징
- **사용량 한도**가 있습니다(시간당/하루 메시지 수 등).
- 한도를 넘으면 **잠시 대기**하거나 **경량 모델로 자동 전환**됩니다.
- 최신 고급 모델·대용량 분석은 유료에서 더 넉넉합니다.

### 무료로 아껴 쓰는 법
1. **긴 작업은 단계로 나누기** — 한 번에 몰아치지 않기.
2. **새 주제는 새 대화로** — 이전 맥락이 쌓이면 한도가 빨리 소모됩니다.
3. **핵심만 붙여넣기** — 불필요하게 긴 글은 줄여서.

> 각 서비스의 구체적 한도·절약 팁은 **AI 도구** 메뉴에서, 강사 배당 토큰으로 유료 모델을 써보려면 **AI 실습실**을 이용하세요.`,contentEn:`## How far can free tiers go?

Most AIs are free after sign-up (no card). Free tiers have usage limits and may switch to lighter models when exceeded. Split long tasks, start new chats for new topics, paste only what's needed. See the **AI Tools** menu for details.`},{title:"꼭 알아야 할 주의점 (환각·개인정보)",titleEn:"Cautions (Hallucination & Privacy)",content:`## AI를 쓸 때 꼭 지킬 것

### 1) 환각(Hallucination) — 그럴듯한 거짓
AI는 모르는 것도 **자신 있게 지어낼 수 있습니다.** 특히 통계 수치, 인용, 법·의학 정보, 최신 사건은 그대로 믿지 마세요.

- ✅ 중요한 내용은 **출처로 교차 검증**
- ✅ "출처와 함께 알려줘"라고 근거 요청
- ✅ 검색 연동 AI(Gemini 등) 활용

### 2) 개인정보·기밀 보호
입력한 내용은 서비스 개선에 쓰일 수 있습니다. **민감정보는 넣지 마세요.**

- ❌ 주민번호·카드번호·비밀번호·고객 개인정보
- ❌ 회사 기밀·미공개 계약 내용
- ✅ 넣어야 한다면 이름·숫자를 가린 뒤 사용

### 3) 저작권·책임
- AI 결과물은 그대로 쓰기 전 **검토·수정**이 필요하며, 최종 책임은 사용자에게 있습니다.

> "AI는 초안을 빠르게, 사람은 검증과 결정을." 이 원칙만 지켜도 안전하게 활용할 수 있습니다.`,contentEn:`## Key cautions

**Hallucination**: verify facts, ask for sources, use search-connected AIs. **Privacy**: never enter personal/confidential data; mask names and numbers. **Responsibility**: humans review and decide.`},{title:"AI 시작하기 — 가입부터 첫 대화까지",titleEn:"Getting Started",content:`## 처음 시작하는 3단계

### 1) 가입하기
- **AI 도구** 메뉴에서 원하는 서비스(ChatGPT·Claude·Gemini·Genspark)의 공식 사이트로 이동
- 구글/이메일 계정으로 무료 가입 (카드 불필요)

### 2) 첫 대화 해보기
부담 없이 이렇게 시작해 보세요:
- "안녕, 너를 어떻게 활용하면 좋을지 5가지만 알려줘."
- "직장인이 너로 시간 아끼는 방법 알려줘."

### 3) 점점 잘 시키기
처음엔 막연해도 괜찮습니다. **더 잘 시키는 법(프롬프트)**은 따로 배웁니다.

| 다음 단계 | 메뉴 |
|-----------|------|
| 프롬프트 작성법·기법·평가 | **프롬프트 → 프롬프트 학습** |
| 직접 써보고 점수 받기 | **프롬프트 → 작성실습** |
| 업무별 바로 쓰는 프롬프트 | **프롬프트 → 사례** |
| 따라 하는 짧은 예제 | **학습 예제** |
| 배당 토큰으로 유료 모델 체험 | **AI 실습실** |

> 이 페이지(학습하기)는 **AI 자체를 이해**하는 곳, **프롬프트** 메뉴는 **AI를 잘 부리는 법**을 배우는 곳입니다.`,contentEn:`## Getting started in 3 steps

1) Sign up free (no card) via the **AI Tools** menu. 2) Try a first chat ("tell me 5 ways to use you"). 3) Learn to prompt well — see the **Prompt** menu (learning, practice, cases), **Examples**, and **Playground**. This page explains AI itself; the Prompt menu teaches how to direct it.`}]},s=[a,i],c=()=>e.jsx(n,{heroEyebrow:"Learn",seoTitle:"학습하기",seoTitleEn:"Learn",seoDescription:"생성형 AI를 처음 만나는 분을 위한 입문 가이드 — AI를 이해하고 안전하게 시작하기",path:"/learn",dataFiles:s,ctaBanner:e.jsxs("div",{className:"aifree-note",style:{marginTop:"var(--s-6)"},children:[e.jsx("i",{className:"fa-solid fa-arrow-right-long"}),e.jsxs("div",{children:["AI를 이해했다면 다음은 ",e.jsx("b",{children:"잘 부리는 법"}),"입니다 —"," ",e.jsx(t,{to:"/prompt/learn",children:"프롬프트 학습"}),"으로 넘어가거나,"," ",e.jsx(t,{to:"/examples",children:"학습 예제"}),"·",e.jsx(t,{to:"/playground",children:"실습실"}),"에서 직접 해보세요."]})]})});export{c as default};
