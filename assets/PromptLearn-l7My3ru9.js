import{j as e,L as t}from"./index-D6rqHpGN.js";import{G as o}from"./GuidePage-ChkjrVKG.js";import"./SEOHead-BIfUxhDK.js";const i={id:"prompt-basics",icon:"fa-lightbulb",title:"프롬프트 기초",titleEn:"Prompt Fundamentals",sections:[{title:"프롬프트란 무엇인가",titleEn:"What is a Prompt",content:`AI 모델에게 원하는 결과를 얻기 위해 전달하는 입력 텍스트를 **프롬프트(Prompt)**라고 합니다.

### 프롬프트의 정의

프롬프트는 단순한 질문이 아니라, AI와의 **소통 인터페이스**입니다. 좋은 프롬프트는 명확한 지시, 충분한 맥락, 원하는 출력 형식을 포함합니다.

### 프롬프트의 4대 구성요소

| 구성요소 | 설명 | 예시 |
|---------|------|------|
| **역할(Role)** | AI에게 부여할 전문가 역할 | "당신은 시니어 프로젝트 매니저입니다" |
| **맥락(Context)** | 배경 정보 및 상황 설명 | "팀원 5명의 신규 웹 프로젝트에서..." |
| **지시(Instruction)** | 수행할 구체적 작업 | "프로젝트 일정표를 작성해주세요" |
| **출력형식(Format)** | 원하는 응답 형태 | "표 형식으로, 주차별로 구분하여" |

### Copilot에서의 프롬프트 유형

| 유형 | 사용 환경 | 특징 |
|------|----------|------|
| 코드 프롬프트 | GitHub Copilot (IDE) | 주석, 함수명으로 코드 생성 유도 |
| 채팅 프롬프트 | Copilot Chat | 자연어 대화로 질문/요청 |
| 업무 프롬프트 | M365 Copilot | Word, Excel 등에서 문서 작업 지시 |
| 자동화 프롬프트 | Power Platform | 워크플로우/앱 생성 지시 |

> 좋은 프롬프트의 핵심은 **구체성**, **명확성**, **맥락 제공** 세 가지입니다.`,contentEn:`The input text you provide to an AI model to get desired results is called a **Prompt**.

### Definition of a Prompt

A prompt is not just a simple question — it's a **communication interface** with AI. Good prompts include clear instructions, sufficient context, and desired output format.

### Four Core Components of a Prompt

| Component | Description | Example |
|-----------|-------------|---------|
| **Role** | Expert role assigned to AI | "You are a senior project manager" |
| **Context** | Background information and situation | "In a new web project with 5 team members..." |
| **Instruction** | Specific task to perform | "Create a project schedule" |
| **Format** | Desired response format | "In table format, organized by week" |

### Prompt Types in Copilot

| Type | Environment | Characteristics |
|------|-------------|-----------------|
| Code Prompts | GitHub Copilot (IDE) | Guide code generation via comments, function names |
| Chat Prompts | Copilot Chat | Natural language Q&A |
| Work Prompts | M365 Copilot | Document tasks in Word, Excel, etc. |
| Automation Prompts | Power Platform | Workflow/app creation instructions |

> The keys to good prompts are **specificity**, **clarity**, and **context**.`},{title:"프롬프트 작성 원칙",titleEn:"Prompt Writing Principles",content:`효과적인 프롬프트를 작성하기 위한 핵심 원칙을 알아봅니다.

### CLEAR 프레임워크

| 원칙 | 설명 | 실천 방법 |
|------|------|----------|
| **C**oncise (간결) | 불필요한 표현 제거 | 핵심 키워드 중심으로 작성 |
| **L**ogical (논리적) | 단계적·구조적 지시 | 번호 매기기, 순서 지정 |
| **E**xplicit (명시적) | 모호함 배제 | 구체적 수치, 범위 지정 |
| **A**daptive (적응적) | 결과 기반 반복 개선 | 출력 확인 후 프롬프트 조정 |
| **R**ole-based (역할 기반) | 전문가 역할 부여 | "~의 관점에서" 지정 |

### 좋은 프롬프트 vs 나쁜 프롬프트

| 구분 | 나쁜 예시 | 좋은 예시 |
|------|----------|----------|
| 코드 작성 | "로그인 만들어줘" | "React + TypeScript로 이메일/비밀번호 로그인 폼을 만들어줘. Supabase Auth를 사용하고, 유효성 검사를 포함해줘" |
| 문서 요약 | "이거 요약해줘" | "이 보고서를 경영진 대상 브리핑용으로 3개 핵심 포인트와 1개 액션 아이템으로 요약해줘" |
| 데이터 분석 | "데이터 분석해줘" | "지난 6개월 매출 데이터에서 월별 성장률을 계산하고, 하락 추세가 있는 제품군을 차트로 시각화해줘" |
| 이메일 작성 | "이메일 써줘" | "고객에게 납기 지연을 알리는 공식 이메일을 작성해줘. 사과 + 새 일정 + 보상안을 포함하고, 전문적이고 진지한 톤으로" |

### 프롬프트 개선 체크리스트

| 체크 항목 | 설명 |
|----------|------|
| 목적이 명확한가? | 무엇을 얻고 싶은지 분명히 명시 |
| 맥락이 충분한가? | 배경 정보, 대상, 용도 포함 |
| 제약 조건이 있는가? | 글자 수, 형식, 스타일 지정 |
| 출력 형식을 지정했는가? | 표, 목록, 코드 등 원하는 형태 |
| 예시를 제공했는가? | 원하는 결과의 샘플 포함 |

> 프롬프트 작성은 "한 번에 완벽하게"가 아니라 "반복적으로 개선"하는 과정입니다.`,contentEn:`Learn the core principles for writing effective prompts.

### CLEAR Framework

| Principle | Description | Practice |
|-----------|-------------|----------|
| **C**oncise | Remove unnecessary expressions | Focus on key terms |
| **L**ogical | Step-by-step, structured instructions | Use numbering, specify order |
| **E**xplicit | Eliminate ambiguity | Specify exact numbers, ranges |
| **A**daptive | Iterative improvement based on results | Adjust prompt after checking output |
| **R**ole-based | Assign expert roles | Specify "from the perspective of..." |

### Good Prompts vs Bad Prompts

| Category | Bad Example | Good Example |
|----------|------------|--------------|
| Code | "Make a login" | "Create an email/password login form with React + TypeScript. Use Supabase Auth and include validation" |
| Summary | "Summarize this" | "Summarize this report for an executive briefing with 3 key points and 1 action item" |
| Analysis | "Analyze the data" | "Calculate monthly growth rates from the last 6 months of sales data and visualize product lines with declining trends in a chart" |
| Email | "Write an email" | "Write a formal email notifying a customer of a delivery delay. Include apology + new schedule + compensation, in a professional and sincere tone" |

### Prompt Improvement Checklist

| Check Item | Description |
|-----------|-------------|
| Is the purpose clear? | Clearly state what you want to achieve |
| Is context sufficient? | Include background, audience, use case |
| Are there constraints? | Specify word count, format, style |
| Is output format specified? | Table, list, code, etc. |
| Are examples provided? | Include samples of desired output |

> Prompt writing is not about "getting it perfect the first time" but about "iterative improvement."`}]},n={id:"prompt-techniques",icon:"fa-wand-magic-sparkles",title:"프롬프트 기법",titleEn:"Prompt Techniques",sections:[{title:"핵심 프롬프트 기법",titleEn:"Core Prompt Techniques",content:`AI에서 효과적으로 사용되는 핵심 프롬프트 기법들을 소개합니다.

### 주요 프롬프트 기법 비교

| 기법 | 설명 | 난이도 | 효과 |
|------|------|--------|------|
| Zero-shot | 예시 없이 바로 지시 | 쉬움 | 보통 |
| Few-shot | 2-3개 예시를 포함하여 지시 | 보통 | 높음 |
| Chain-of-Thought | 단계별 사고 과정을 유도 | 보통 | 높음 |
| Role Prompting | 전문가 역할을 부여 | 쉬움 | 높음 |
| Template Prompting | 미리 정한 틀에 맞춰 요청 | 쉬움 | 높음 |
| Tree-of-Thought | 여러 사고 경로를 탐색 | 어려움 | 매우 높음 |

### 1. Zero-shot 프롬프팅

예시 없이 직접 지시하는 가장 기본적인 기법입니다.

| 상황 | 프롬프트 |
|------|---------|
| 번역 | "다음 문장을 영어로 번역해주세요: 오늘 회의 자료를 준비했습니다" |
| 분류 | "다음 이메일이 스팸인지 정상인지 분류해주세요: ..." |
| 요약 | "다음 기사를 3줄로 요약해주세요: ..." |

### 2. Few-shot 프롬프팅

예시를 제공하여 패턴을 학습시키는 기법입니다.

| 구분 | 내용 |
|------|------|
| 예시 1 | 입력: "이 제품 정말 좋아요!" → 감정: 긍정 |
| 예시 2 | 입력: "배송이 너무 느려요" → 감정: 부정 |
| 예시 3 | 입력: "보통이에요, 그냥 그래요" → 감정: 중립 |
| **실제 요청** | 입력: "가격 대비 품질이 뛰어납니다" → 감정: ? |

### 3. Chain-of-Thought (CoT)

단계별 사고 과정을 명시적으로 유도하는 기법입니다.

| 일반 프롬프트 | CoT 프롬프트 |
|-------------|------------|
| "이 코드의 버그를 찾아줘" | "이 코드를 분석해줘: 1) 먼저 각 함수의 역할을 파악하고, 2) 데이터 흐름을 추적하고, 3) 잠재적 에러 포인트를 식별하고, 4) 버그의 원인과 해결책을 제시해줘" |
| "마케팅 전략을 세워줘" | "마케팅 전략을 단계별로 수립해줘: 1) 현재 시장 상황 분석, 2) 목표 고객 정의, 3) 경쟁사 대비 차별점 도출, 4) 채널별 전략 수립, 5) KPI 설정" |

### 4. Role Prompting

| 역할 | 프롬프트 시작 | 효과 |
|------|-------------|------|
| 코드 리뷰어 | "당신은 10년 경력의 시니어 개발자입니다" | 코드 품질, 보안, 성능 관점의 리뷰 |
| 비즈니스 컨설턴트 | "당신은 McKinsey 출신 경영 컨설턴트입니다" | 전략적, 구조화된 비즈니스 분석 |
| UX 디자이너 | "당신은 사용자 중심 설계 전문가입니다" | 사용성, 접근성 관점의 피드백 |
| 데이터 사이언티스트 | "당신은 통계학 박사 데이터 분석가입니다" | 데이터 기반의 인사이트 도출 |

> 상황에 따라 여러 기법을 조합하면 더 좋은 결과를 얻을 수 있습니다.`,contentEn:`Introducing core prompt techniques effectively used with AI.

### Major Prompt Techniques Comparison

| Technique | Description | Difficulty | Effectiveness |
|-----------|-------------|-----------|---------------|
| Zero-shot | Direct instruction without examples | Easy | Moderate |
| Few-shot | Instructions with 2-3 examples | Medium | High |
| Chain-of-Thought | Guide step-by-step reasoning | Medium | High |
| Role Prompting | Assign expert roles | Easy | High |
| Template Prompting | Request within predefined templates | Easy | High |
| Tree-of-Thought | Explore multiple reasoning paths | Hard | Very High |

### 1. Zero-shot Prompting

The most basic technique — direct instruction without examples.

| Situation | Prompt |
|-----------|--------|
| Translation | "Translate the following sentence to Korean: I prepared today's meeting materials" |
| Classification | "Classify whether this email is spam or legitimate: ..." |
| Summarization | "Summarize this article in 3 sentences: ..." |

### 2. Few-shot Prompting

Provide examples to teach patterns.

| Type | Content |
|------|---------|
| Example 1 | Input: "I love this product!" → Sentiment: Positive |
| Example 2 | Input: "Shipping is too slow" → Sentiment: Negative |
| Example 3 | Input: "It's okay, nothing special" → Sentiment: Neutral |
| **Actual Request** | Input: "Excellent quality for the price" → Sentiment: ? |

### 3. Chain-of-Thought (CoT)

Explicitly guide step-by-step reasoning.

| Regular Prompt | CoT Prompt |
|---------------|-----------|
| "Find the bug in this code" | "Analyze this code: 1) First identify each function's role, 2) Trace the data flow, 3) Identify potential error points, 4) Present the bug cause and solution" |
| "Create a marketing strategy" | "Develop a marketing strategy step by step: 1) Current market analysis, 2) Define target customers, 3) Identify differentiators vs competitors, 4) Channel-specific strategies, 5) Set KPIs" |

### 4. Role Prompting

| Role | Prompt Start | Effect |
|------|-------------|--------|
| Code Reviewer | "You are a senior developer with 10 years of experience" | Review focusing on quality, security, performance |
| Business Consultant | "You are a McKinsey management consultant" | Strategic, structured business analysis |
| UX Designer | "You are a user-centered design expert" | Usability and accessibility feedback |
| Data Scientist | "You are a PhD statistician and data analyst" | Data-driven insights |

> Combining multiple techniques based on the situation yields better results.`},{title:"Copilot 환경별 기법",titleEn:"Copilot-Specific Techniques",content:`각 Copilot 환경에 최적화된 프롬프트 작성 기법입니다.

### GitHub Copilot 프롬프트 기법

**1. 주석 기반 코드 생성**

| 기법 | 예시 |
|------|------|
| 함수 목적 주석 | \`// 이메일 형식 유효성 검사 함수\` |
| JSDoc 스타일 | \`/** @param {string} email @returns {boolean} */\` |
| 단계별 주석 | \`// Step 1: 이메일 형식 검증 → Step 2: 도메인 확인 → Step 3: 결과 반환\` |
| TODO 활용 | \`// TODO: 에러 핸들링 추가 - try/catch로 네트워크 에러 처리\` |

**2. Chat 슬래시 명령어 활용**

| 명령어 | 용도 | 예시 |
|--------|------|------|
| /explain | 코드 설명 요청 | "/explain 이 정규식의 동작 원리" |
| /fix | 버그 수정 요청 | "/fix TypeError가 발생하는 원인과 해결책" |
| /tests | 테스트 생성 | "/tests 이 함수의 유닛 테스트 작성" |
| /doc | 문서화 | "/doc 이 클래스의 JSDoc 문서 생성" |

### M365 Copilot 프롬프트 기법

**Word에서의 효과적 프롬프트**

| 목적 | 프롬프트 패턴 |
|------|-------------|
| 문서 초안 | "[대상]을 위한 [목적]에 대한 [문서 유형]을 [톤]으로 작성해줘" |
| 문서 요약 | "이 문서를 [대상]이 이해할 수 있도록 [길이]로 요약해줘. [핵심 관점] 중심으로" |
| 문서 개선 | "이 문서의 [측면]을 개선해줘. [구체적 지시]를 적용하여" |

**Excel에서의 효과적 프롬프트**

| 목적 | 프롬프트 패턴 |
|------|-------------|
| 데이터 분석 | "[데이터]에서 [분석 목표]를 [방법]으로 분석해줘" |
| 수식 생성 | "[조건]을 만족하는 [계산]을 수행하는 수식을 만들어줘" |
| 차트 생성 | "[데이터 범위]를 [차트 유형]으로 시각화해줘. [강조 포인트] 중심으로" |

**PowerPoint에서의 효과적 프롬프트**

| 목적 | 프롬프트 패턴 |
|------|-------------|
| 프레젠테이션 생성 | "[주제]에 대한 [슬라이드 수]장의 프레젠테이션을 만들어줘. 대상: [청중]" |
| 슬라이드 디자인 | "이 슬라이드를 [스타일]로 재디자인해줘. [레이아웃 지시]" |
| 발표 노트 | "각 슬라이드에 [시간]분 분량의 발표 노트를 추가해줘" |

### Power Platform 프롬프트 기법

| 도구 | 프롬프트 패턴 | 예시 |
|------|-------------|------|
| Power Automate | "[트리거] 시 [액션]을 수행하는 플로우" | "새 이메일 수신 시 첨부파일을 SharePoint에 저장하는 플로우를 만들어줘" |
| Power Apps | "[기능]을 가진 [대상]용 앱" | "영업팀이 고객 방문 기록을 입력하고 조회할 수 있는 모바일 앱을 만들어줘" |
| Copilot Studio | "[목적]을 수행하는 봇" | "직원들의 연차/경조사 신청을 처리하는 HR 봇을 만들어줘" |

> 각 환경의 고유한 기능과 제약을 이해하면 더 효과적인 프롬프트를 작성할 수 있습니다.`,contentEn:`Prompt writing techniques optimized for each Copilot environment.

### GitHub Copilot Prompt Techniques

**1. Comment-Based Code Generation**

| Technique | Example |
|-----------|---------|
| Function purpose comment | \`// Email format validation function\` |
| JSDoc style | \`/** @param {string} email @returns {boolean} */\` |
| Step-by-step comments | \`// Step 1: Validate email format → Step 2: Check domain → Step 3: Return result\` |
| TODO usage | \`// TODO: Add error handling - handle network errors with try/catch\` |

**2. Chat Slash Commands**

| Command | Purpose | Example |
|---------|---------|---------|
| /explain | Request code explanation | "/explain how this regex works" |
| /fix | Request bug fix | "/fix the cause and solution for this TypeError" |
| /tests | Generate tests | "/tests write unit tests for this function" |
| /doc | Documentation | "/doc generate JSDoc documentation for this class" |

### M365 Copilot Prompt Techniques

**Effective Prompts in Word**

| Purpose | Prompt Pattern |
|---------|---------------|
| Draft document | "Write a [document type] about [purpose] for [audience] in [tone]" |
| Summarize | "Summarize this document in [length] for [audience] to understand, focusing on [key perspective]" |
| Improve | "Improve the [aspect] of this document by applying [specific instructions]" |

**Effective Prompts in Excel**

| Purpose | Prompt Pattern |
|---------|---------------|
| Data analysis | "Analyze [data] for [analysis goal] using [method]" |
| Formula creation | "Create a formula that performs [calculation] satisfying [conditions]" |
| Chart creation | "Visualize [data range] as [chart type], focusing on [emphasis points]" |

**Effective Prompts in PowerPoint**

| Purpose | Prompt Pattern |
|---------|---------------|
| Create presentation | "Create a [slide count]-slide presentation about [topic]. Audience: [audience]" |
| Slide design | "Redesign this slide in [style]. [Layout instructions]" |
| Speaker notes | "Add [time]-minute speaker notes to each slide" |

### Power Platform Prompt Techniques

| Tool | Prompt Pattern | Example |
|------|---------------|---------|
| Power Automate | "A flow that performs [action] when [trigger]" | "Create a flow that saves attachments to SharePoint when a new email is received" |
| Power Apps | "An app for [audience] with [features]" | "Create a mobile app for the sales team to log and view customer visit records" |
| Copilot Studio | "A bot that performs [purpose]" | "Create an HR bot that handles employee leave and event requests" |

> Understanding each environment's unique features and constraints helps write more effective prompts.`},{title:"고급 프롬프트 전략",titleEn:"Advanced Prompt Strategies",content:`전문가 수준의 고급 프롬프트 전략입니다.

### 메타 프롬프팅

AI에게 프롬프트 자체를 개선하도록 요청하는 전략입니다.

| 단계 | 메타 프롬프트 |
|------|-------------|
| 분석 요청 | "내가 작성한 다음 프롬프트를 분석해줘: [프롬프트]" |
| 개선 요청 | "이 프롬프트의 약점을 3가지 찾고, 개선된 버전을 작성해줘" |
| 비교 요청 | "원본과 개선 버전의 예상 결과 차이를 설명해줘" |

### 페르소나 체이닝

여러 전문가 역할을 순차적으로 활용하는 전략입니다.

| 단계 | 페르소나 | 작업 |
|------|---------|------|
| 1단계 | 비즈니스 분석가 | 요구사항 정의 및 범위 설정 |
| 2단계 | 시스템 아키텍트 | 기술 구조 및 설계 결정 |
| 3단계 | 시니어 개발자 | 코드 구현 및 최적화 |
| 4단계 | QA 엔지니어 | 테스트 케이스 및 검증 |
| 5단계 | 테크니컬 라이터 | 문서화 및 가이드 작성 |

### 제약 기반 프롬프팅

의도적으로 제약 조건을 추가하여 결과 품질을 높이는 전략입니다.

| 제약 유형 | 예시 | 효과 |
|----------|------|------|
| 길이 제약 | "200자 이내로 작성" | 핵심만 추출 |
| 난이도 제약 | "중학생이 이해할 수준으로" | 명확한 설명 |
| 형식 제약 | "반드시 표 형식으로만" | 구조화된 결과 |
| 금지 제약 | "전문 용어 사용 금지" | 접근성 향상 |
| 시간 제약 | "5분 안에 발표할 수 있는 분량" | 핵심 압축 |

### 반복 정제 (Iterative Refinement)

| 라운드 | 프롬프트 전략 | 목적 |
|--------|-------------|------|
| 1차 | 넓은 범위로 초안 요청 | 전체 구조 파악 |
| 2차 | 부족한 부분 구체화 요청 | 깊이 보강 |
| 3차 | 특정 섹션 집중 개선 | 품질 향상 |
| 4차 | 전체 일관성 검토 요청 | 최종 정제 |

### 프롬프트 템플릿 라이브러리

**코드 리뷰 템플릿**

| 항목 | 내용 |
|------|------|
| 역할 | "시니어 [언어/프레임워크] 개발자로서" |
| 관점 | "보안, 성능, 가독성, 유지보수성 관점에서" |
| 형식 | "각 항목별로 심각도(높/중/낮)와 개선 코드를 제시하고" |
| 제약 | "긍정적 피드백도 1개 이상 포함해줘" |

**비즈니스 보고서 템플릿**

| 항목 | 내용 |
|------|------|
| 역할 | "[산업] 분야의 비즈니스 애널리스트로서" |
| 구조 | "Executive Summary → 현황 분석 → 핵심 발견 → 제안 → 다음 단계" |
| 형식 | "각 섹션별 2-3문장, 핵심 수치는 볼드 처리" |
| 톤 | "경영진 대상, 전문적이지만 이해하기 쉽게" |

> 고급 전략은 기본 기법을 충분히 익힌 후 활용하면 더욱 효과적입니다.`,contentEn:`Expert-level advanced prompt strategies.

### Meta Prompting

A strategy where you ask AI to improve the prompt itself.

| Step | Meta Prompt |
|------|------------|
| Analysis Request | "Analyze the following prompt I wrote: [prompt]" |
| Improvement Request | "Find 3 weaknesses in this prompt and write an improved version" |
| Comparison Request | "Explain the expected result differences between original and improved versions" |

### Persona Chaining

A strategy that sequentially utilizes multiple expert roles.

| Step | Persona | Task |
|------|---------|------|
| Step 1 | Business Analyst | Define requirements and scope |
| Step 2 | System Architect | Technical structure and design decisions |
| Step 3 | Senior Developer | Code implementation and optimization |
| Step 4 | QA Engineer | Test cases and verification |
| Step 5 | Technical Writer | Documentation and guide creation |

### Constraint-Based Prompting

A strategy that intentionally adds constraints to improve result quality.

| Constraint Type | Example | Effect |
|----------------|---------|--------|
| Length | "Write within 200 characters" | Extract essentials only |
| Difficulty | "At a level a middle schooler can understand" | Clear explanation |
| Format | "Must be in table format only" | Structured results |
| Prohibition | "No technical jargon" | Improved accessibility |
| Time | "Content suitable for a 5-minute presentation" | Core compression |

### Iterative Refinement

| Round | Prompt Strategy | Purpose |
|-------|----------------|---------|
| 1st | Request broad draft | Understand overall structure |
| 2nd | Request specifics for weak areas | Depth reinforcement |
| 3rd | Focus on improving specific sections | Quality enhancement |
| 4th | Request overall consistency review | Final refinement |

### Prompt Template Library

**Code Review Template**

| Item | Content |
|------|---------|
| Role | "As a senior [language/framework] developer" |
| Perspective | "From security, performance, readability, maintainability perspectives" |
| Format | "Present severity (high/medium/low) and improved code for each item" |
| Constraint | "Include at least 1 positive feedback" |

**Business Report Template**

| Item | Content |
|------|---------|
| Role | "As a business analyst in the [industry] field" |
| Structure | "Executive Summary → Current Analysis → Key Findings → Recommendations → Next Steps" |
| Format | "2-3 sentences per section, bold key figures" |
| Tone | "For executives, professional but easy to understand" |

> Advanced strategies are most effective when applied after mastering fundamental techniques.`}]},r={id:"prompt-evaluation",icon:"fa-clipboard-check",title:"평가 기준 & 루브릭",titleEn:"Evaluation Criteria & Rubrics",sections:[{title:"프롬프트 평가 기준",titleEn:"Prompt Evaluation Criteria",content:`프롬프트의 품질을 객관적으로 평가하기 위한 5대 평가 기준입니다.

### 5대 평가 기준 (SCORE)

| 기준 | 약자 | 설명 | 배점 |
|------|------|------|------|
| **구체성** (Specificity) | S | 요청이 구체적이고 명확한가 | 20점 |
| **맥락** (Context) | C | 충분한 배경 정보를 제공했는가 | 20점 |
| **출력지정** (Output) | O | 원하는 결과 형식을 명시했는가 | 20점 |
| **역할부여** (Role) | R | 적절한 전문가 역할을 지정했는가 | 20점 |
| **효과성** (Effectiveness) | E | 실제로 원하는 결과를 얻었는가 | 20점 |

### 평가 등급 체계

| 등급 | 점수 범위 | 설명 |
|------|----------|------|
| S (탁월) | 90-100 | 모든 요소가 완벽하게 갖춰진 프롬프트 |
| A (우수) | 80-89 | 대부분의 요소가 잘 갖춰진 프롬프트 |
| B (보통) | 70-79 | 기본 요소는 있으나 개선 여지가 있음 |
| C (미흡) | 60-69 | 핵심 요소가 부족하여 결과가 불만족 |
| D (부족) | 0-59 | 프롬프트로서 기본 기능을 하지 못함 |

### 기준별 세부 평가 항목

**S - 구체성 (Specificity)**

| 점수 | 수준 | 설명 |
|------|------|------|
| 17-20 | 탁월 | 정확한 수치, 범위, 조건이 모두 명시됨 |
| 13-16 | 우수 | 대부분 구체적이나 일부 모호한 부분 존재 |
| 9-12 | 보통 | 기본적인 요청은 명확하나 세부 사항 부족 |
| 5-8 | 미흡 | 막연한 요청으로 해석의 여지가 큼 |
| 0-4 | 부족 | 무엇을 요청하는지 파악이 어려움 |

**C - 맥락 (Context)**

| 점수 | 수준 | 설명 |
|------|------|------|
| 17-20 | 탁월 | 배경, 대상, 용도, 제약조건이 모두 포함 |
| 13-16 | 우수 | 핵심 맥락은 있으나 일부 정보 누락 |
| 9-12 | 보통 | 기본 배경만 제공, 추가 맥락 필요 |
| 5-8 | 미흡 | 맥락이 거의 없어 AI가 추측해야 함 |
| 0-4 | 부족 | 맥락 정보가 전혀 없음 |

> SCORE 평가 모델을 활용하면 프롬프트 품질을 체계적으로 측정하고 개선할 수 있습니다.`,contentEn:`Five key evaluation criteria for objectively assessing prompt quality.

### 5 Evaluation Criteria (SCORE)

| Criterion | Code | Description | Points |
|-----------|------|-------------|--------|
| **Specificity** | S | Is the request specific and clear? | 20 |
| **Context** | C | Is sufficient background information provided? | 20 |
| **Output** | O | Is the desired result format specified? | 20 |
| **Role** | R | Is an appropriate expert role assigned? | 20 |
| **Effectiveness** | E | Does it actually produce the desired result? | 20 |

### Grading System

| Grade | Score Range | Description |
|-------|-----------|-------------|
| S (Excellent) | 90-100 | All elements perfectly covered |
| A (Great) | 80-89 | Most elements well covered |
| B (Average) | 70-79 | Basic elements present but room for improvement |
| C (Below Average) | 60-69 | Key elements lacking, unsatisfactory results |
| D (Poor) | 0-59 | Fails to function as a proper prompt |

### Detailed Evaluation Items by Criterion

**S - Specificity**

| Score | Level | Description |
|-------|-------|-------------|
| 17-20 | Excellent | Exact numbers, ranges, and conditions all specified |
| 13-16 | Great | Mostly specific with minor ambiguities |
| 9-12 | Average | Basic request is clear but lacks details |
| 5-8 | Below Average | Vague request with much room for interpretation |
| 0-4 | Poor | Difficult to understand what is being requested |

**C - Context**

| Score | Level | Description |
|-------|-------|-------------|
| 17-20 | Excellent | Background, audience, purpose, constraints all included |
| 13-16 | Great | Core context present but some info missing |
| 9-12 | Average | Only basic background provided, needs more context |
| 5-8 | Below Average | Almost no context, AI must guess |
| 0-4 | Poor | No context information at all |

> Using the SCORE evaluation model allows systematic measurement and improvement of prompt quality.`},{title:"평가 루브릭 & 채점표",titleEn:"Rubric & Scoring Sheet",content:`실무에서 바로 사용할 수 있는 프롬프트 평가 루브릭과 채점표입니다.

### 종합 평가 루브릭

| 평가 영역 | 탁월 (5점) | 우수 (4점) | 보통 (3점) | 미흡 (2점) | 부족 (1점) |
|----------|-----------|-----------|-----------|-----------|-----------|
| 목적 명확성 | 목표가 구체적이고 측정 가능 | 목표가 명확함 | 목표가 있으나 모호 | 목표가 불분명 | 목표 없음 |
| 맥락 제공 | 완벽한 배경 정보 | 핵심 맥락 포함 | 기본 맥락만 제공 | 맥락 부족 | 맥락 없음 |
| 구조 & 형식 | 체계적 구조 + 형식 지정 | 구조적 + 일부 형식 | 기본 구조 있음 | 구조 미흡 | 비구조적 |
| 제약 조건 | 범위, 길이, 톤 등 명시 | 주요 제약 포함 | 일부 제약 있음 | 제약 부족 | 제약 없음 |
| 예시 & 참고 | 구체적 예시 + 참고자료 | 예시 포함 | 간단한 참고 | 예시 부족 | 예시 없음 |

### Copilot 환경별 특화 기준

**GitHub Copilot (코드)**

| 항목 | 평가 내용 | 비중 |
|------|----------|------|
| 주석 품질 | 함수 목적, 매개변수, 반환값 설명 | 25% |
| 네이밍 | 의미 있는 함수명/변수명 사용 | 20% |
| 컨텍스트 파일 | 관련 파일/타입 import 유무 | 20% |
| 테스트 케이스 | 엣지 케이스 포함 여부 | 15% |
| 단계적 분해 | 복잡한 작업의 단계 구분 | 20% |

**M365 Copilot (업무)**

| 항목 | 평가 내용 | 비중 |
|------|----------|------|
| 작업 목적 | 문서/분석의 목적 명시 | 25% |
| 대상 독자 | 결과물의 수신자/활용자 | 20% |
| 톤 & 스타일 | 공식/비공식, 전문적/친근 | 15% |
| 분량 & 형식 | 길이, 구조, 시각적 요소 | 20% |
| 참고 자료 | 활용할 데이터/문서 명시 | 20% |

### 채점 예시

**프롬프트**: "React로 할 일 목록 앱 만들어줘"

| 평가 기준 | 점수 | 이유 |
|----------|------|------|
| 구체성 (S) | 8/20 | 기본 요구만 있고 세부 기능 미지정 |
| 맥락 (C) | 4/20 | 프로젝트 배경, 사용 환경 미제공 |
| 출력지정 (O) | 6/20 | "앱"이라는 큰 범위만 지정 |
| 역할부여 (R) | 0/20 | 역할 미지정 |
| 효과성 (E) | 8/20 | 기본 기능만 생성 가능 |
| **총점** | **26/100** | **등급: D (부족)** |

**개선된 프롬프트**: "시니어 React 개발자로서, TypeScript + Zustand 상태관리를 사용한 할 일 목록 앱을 만들어줘. 기능: 추가/삭제/완료처리/필터(전체·미완료·완료). localStorage 영속성 포함. 컴포넌트는 TodoInput, TodoList, TodoItem, FilterBar로 분리해줘."

| 평가 기준 | 점수 | 이유 |
|----------|------|------|
| 구체성 (S) | 18/20 | 기능, 컴포넌트 구조까지 명확 |
| 맥락 (C) | 14/20 | 기술 스택 명시 (배경은 약간 부족) |
| 출력지정 (O) | 16/20 | 컴포넌트 구조 지정 |
| 역할부여 (R) | 18/20 | 시니어 React 개발자 역할 |
| 효과성 (E) | 17/20 | 원하는 결과를 높은 확률로 달성 |
| **총점** | **83/100** | **등급: A (우수)** |

> 같은 주제라도 프롬프트 품질에 따라 결과물의 수준이 극적으로 달라집니다.`,contentEn:`Ready-to-use prompt evaluation rubrics and scoring sheets for practical use.

### Comprehensive Evaluation Rubric

| Area | Excellent (5) | Great (4) | Average (3) | Below Avg (2) | Poor (1) |
|------|-------------|----------|-----------|-------------|---------|
| Purpose Clarity | Specific & measurable goal | Clear goal | Goal exists but vague | Unclear goal | No goal |
| Context | Complete background info | Core context included | Basic context only | Lacking context | No context |
| Structure & Format | Systematic + format specified | Structured + some format | Basic structure | Poor structure | Unstructured |
| Constraints | Scope, length, tone specified | Key constraints included | Some constraints | Few constraints | No constraints |
| Examples & Refs | Specific examples + references | Examples included | Simple references | Lacking examples | No examples |

### Environment-Specific Criteria

**GitHub Copilot (Code)**

| Item | Evaluation Content | Weight |
|------|-------------------|--------|
| Comment Quality | Function purpose, params, return value | 25% |
| Naming | Meaningful function/variable names | 20% |
| Context Files | Related file/type imports | 20% |
| Test Cases | Edge case coverage | 15% |
| Step Decomposition | Breaking complex tasks into steps | 20% |

**M365 Copilot (Business)**

| Item | Evaluation Content | Weight |
|------|-------------------|--------|
| Task Purpose | Document/analysis purpose specified | 25% |
| Target Audience | Result recipients/users | 20% |
| Tone & Style | Formal/informal, professional/friendly | 15% |
| Volume & Format | Length, structure, visual elements | 20% |
| References | Data/documents to use | 20% |

### Scoring Example

**Prompt**: "Make a to-do list app with React"

| Criterion | Score | Reason |
|-----------|-------|--------|
| Specificity (S) | 8/20 | Only basic request, no detailed features |
| Context (C) | 4/20 | No project background or environment |
| Output (O) | 6/20 | Only "app" as broad scope |
| Role (R) | 0/20 | No role assigned |
| Effectiveness (E) | 8/20 | Only basic functionality possible |
| **Total** | **26/100** | **Grade: D (Poor)** |

**Improved Prompt**: "As a senior React developer, create a to-do list app using TypeScript + Zustand state management. Features: add/delete/complete/filter (all·incomplete·complete). Include localStorage persistence. Separate components into TodoInput, TodoList, TodoItem, FilterBar."

| Criterion | Score | Reason |
|-----------|-------|--------|
| Specificity (S) | 18/20 | Features and component structure clear |
| Context (C) | 14/20 | Tech stack specified (background slightly lacking) |
| Output (O) | 16/20 | Component structure specified |
| Role (R) | 18/20 | Senior React developer role |
| Effectiveness (E) | 17/20 | High probability of achieving desired result |
| **Total** | **83/100** | **Grade: A (Great)** |

> Even with the same topic, the quality of results dramatically changes based on prompt quality.`},{title:"자기 평가 워크시트",titleEn:"Self-Assessment Worksheet",content:`프롬프트를 작성한 후 스스로 점검할 수 있는 자기 평가 워크시트입니다.

### 작성 전 체크리스트

| # | 체크 항목 | 확인 |
|---|----------|------|
| 1 | 이 프롬프트로 달성하려는 목표를 한 문장으로 말할 수 있는가? | ☐ |
| 2 | AI가 아닌 사람에게 같은 요청을 한다면 충분히 이해할 수 있는가? | ☐ |
| 3 | 결과물의 형태(코드, 문서, 표 등)를 미리 정했는가? | ☐ |
| 4 | 필요한 배경 정보를 모두 파악했는가? | ☐ |
| 5 | 한 번에 하나의 작업만 요청하는가? (복합 작업은 분리) | ☐ |

### 작성 후 자기 평가표

| 영역 | 질문 | 1 | 2 | 3 | 4 | 5 |
|------|------|---|---|---|---|---|
| 명확성 | 요청이 한 가지로만 해석되는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 구체성 | 수치, 범위, 조건을 명시했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 맥락 | 배경과 목적을 충분히 제공했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 역할 | AI에게 적절한 전문가 역할을 부여했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 형식 | 출력 형식을 지정했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 제약 | 길이, 톤, 스타일 등 제약을 명시했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 예시 | 원하는 결과의 예시를 포함했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 간결성 | 불필요한 정보를 제거했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |

### 결과 분석 가이드

| 총점 | 등급 | 조언 |
|------|------|------|
| 35-40 | S | 탁월한 프롬프트! 그대로 사용하세요 |
| 28-34 | A | 우수합니다. 약간의 보완으로 완벽해질 수 있습니다 |
| 20-27 | B | 기본은 갖추었으나 구체성과 맥락을 보강하세요 |
| 12-19 | C | 핵심 요소가 부족합니다. 역할과 형식을 추가하세요 |
| 8-11 | D | 전면 재작성이 필요합니다 |

### 개선 반복 프로세스

| 단계 | 활동 | 핵심 질문 |
|------|------|----------|
| 1. 초안 작성 | 첫 번째 프롬프트 작성 | "무엇을 원하는가?" |
| 2. 자기 평가 | 위 체크리스트로 점검 | "빠진 요소는 없는가?" |
| 3. 실행 & 확인 | AI에 입력 후 결과 확인 | "기대한 결과인가?" |
| 4. 분석 | 부족한 부분 파악 | "왜 기대와 다른가?" |
| 5. 개선 | 프롬프트 수정 후 재실행 | "어떤 요소를 보강할까?" |
| 6. 기록 | 성공 패턴 정리 | "재사용할 수 있는가?" |

> 프롬프트 작성 능력은 타고나는 것이 아니라, 반복 연습으로 향상됩니다.`,contentEn:`A self-assessment worksheet for reviewing your prompts after writing them.

### Pre-Writing Checklist

| # | Check Item | Done |
|---|-----------|------|
| 1 | Can you describe the goal of this prompt in one sentence? | ☐ |
| 2 | Would a person (not AI) understand this request sufficiently? | ☐ |
| 3 | Have you decided the output format (code, document, table, etc.)? | ☐ |
| 4 | Have you gathered all necessary background information? | ☐ |
| 5 | Are you requesting only one task at a time? (separate complex tasks) | ☐ |

### Post-Writing Self-Assessment

| Area | Question | 1 | 2 | 3 | 4 | 5 |
|------|----------|---|---|---|---|---|
| Clarity | Can the request be interpreted in only one way? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Specificity | Are numbers, ranges, conditions specified? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Context | Is background and purpose sufficiently provided? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Role | Is an appropriate expert role assigned to AI? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Format | Is the output format specified? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Constraints | Are length, tone, style constraints specified? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Examples | Are examples of desired output included? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Conciseness | Is unnecessary information removed? | ☐ | ☐ | ☐ | ☐ | ☐ |

### Result Analysis Guide

| Total | Grade | Advice |
|-------|-------|--------|
| 35-40 | S | Excellent prompt! Use as is |
| 28-34 | A | Great. Minor refinements can make it perfect |
| 20-27 | B | Basics covered but strengthen specificity and context |
| 12-19 | C | Key elements missing. Add role and format |
| 8-11 | D | Complete rewrite needed |

### Iterative Improvement Process

| Step | Activity | Key Question |
|------|----------|-------------|
| 1. Draft | Write first prompt | "What do I want?" |
| 2. Self-assess | Review with checklist | "Are any elements missing?" |
| 3. Execute & Check | Input to AI, check results | "Is this the expected result?" |
| 4. Analyze | Identify gaps | "Why is it different from expectations?" |
| 5. Improve | Modify prompt and re-run | "Which elements should I strengthen?" |
| 6. Record | Document successful patterns | "Can this be reused?" |

> Prompt writing skill is not innate — it improves with repeated practice.`}]},a={id:"prompt-examples",icon:"fa-flask",title:"실전 예시 & 실습",titleEn:"Examples & Practice",sections:[{title:"GitHub Copilot 프롬프트 예시",titleEn:"GitHub Copilot Prompt Examples",content:`GitHub Copilot에서 실제 사용하는 프롬프트 예시와 평가입니다.

### 코드 생성 프롬프트

**예시 1: API 엔드포인트 생성**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "Express.js + TypeScript로 사용자 CRUD API를 만들어줘. Prisma ORM 사용, 입력 검증은 Zod, 에러 핸들링 미들웨어 포함. RESTful 규칙을 따르고 각 엔드포인트에 JSDoc 주석을 달아줘" |
| 평가 점수 | S: 18 / C: 16 / O: 17 / R: 14 / E: 18 = **83점 (A등급)** |
| 강점 | 기술 스택, 구조, 규칙이 모두 명확 |
| 개선점 | "시니어 백엔드 개발자" 역할 추가 시 더 좋은 결과 |

**예시 2: 리팩토링 요청**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "이 컴포넌트를 리팩토링해줘: 1) 커스텀 훅으로 로직 분리, 2) 메모이제이션 적용, 3) TypeScript strict 모드 대응, 4) 각 변경 이유를 주석으로 설명" |
| 평가 점수 | S: 19 / C: 15 / O: 18 / R: 12 / E: 17 = **81점 (A등급)** |
| 강점 | 4단계 구체적 지시, 이유 설명 요청 |
| 개선점 | 대상 컴포넌트의 현재 문제점 설명 추가 |

**예시 3: 테스트 코드 작성**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "QA 엔지니어로서 이 함수의 Jest 테스트를 작성해줘. 정상 케이스 3개, 에러 케이스 3개, 엣지 케이스 2개를 포함. describe/it 구조로, 각 테스트의 의도를 명확한 이름으로 표현해줘" |
| 평가 점수 | S: 19 / C: 14 / O: 19 / R: 18 / E: 18 = **88점 (A등급)** |
| 강점 | 역할, 수량, 구조, 네이밍 규칙까지 지정 |
| 개선점 | 테스트 커버리지 목표 추가 시 완벽 |

### Copilot Chat 프롬프트

| 용도 | 프롬프트 | 등급 |
|------|---------|------|
| 코드 설명 | "@workspace 이 프로젝트의 인증 플로우를 설명해줘. 시퀀스 다이어그램 형태의 마크다운으로" | A |
| 버그 분석 | "/fix 이 useEffect에서 무한 렌더링이 발생해. 의존성 배열과 상태 변경 로직을 분석해줘" | A |
| 성능 개선 | "성능 전문가로서 이 컴포넌트의 렌더링 성능을 분석해줘. React Profiler 기준으로 문제점과 개선안을 표로 정리" | S |

> GitHub Copilot에서는 코드의 맥락(주변 파일, import)이 자동으로 제공되므로, 기술적 지시에 집중하세요.`,contentEn:`Real-world prompt examples and evaluations for GitHub Copilot.

### Code Generation Prompts

**Example 1: API Endpoint Creation**

| Item | Content |
|------|---------|
| Prompt | "Create a user CRUD API with Express.js + TypeScript. Use Prisma ORM, Zod for input validation, include error handling middleware. Follow RESTful conventions and add JSDoc comments to each endpoint" |
| Score | S: 18 / C: 16 / O: 17 / R: 14 / E: 18 = **83 (Grade A)** |
| Strengths | Tech stack, structure, and conventions all clear |
| Improvement | Adding "senior backend developer" role would improve results |

**Example 2: Refactoring Request**

| Item | Content |
|------|---------|
| Prompt | "Refactor this component: 1) Extract logic into custom hooks, 2) Apply memoization, 3) Support TypeScript strict mode, 4) Explain each change reason in comments" |
| Score | S: 19 / C: 15 / O: 18 / R: 12 / E: 17 = **81 (Grade A)** |
| Strengths | 4-step specific instructions, explanation requested |
| Improvement | Add description of current component problems |

**Example 3: Test Code Writing**

| Item | Content |
|------|---------|
| Prompt | "As a QA engineer, write Jest tests for this function. Include 3 normal cases, 3 error cases, 2 edge cases. Use describe/it structure, with clear test names expressing intent" |
| Score | S: 19 / C: 14 / O: 19 / R: 18 / E: 18 = **88 (Grade A)** |
| Strengths | Role, quantity, structure, naming conventions all specified |
| Improvement | Adding test coverage target would be perfect |

### Copilot Chat Prompts

| Purpose | Prompt | Grade |
|---------|--------|-------|
| Code explanation | "@workspace Explain this project's auth flow. In markdown sequence diagram format" | A |
| Bug analysis | "/fix Infinite rendering occurs in this useEffect. Analyze the dependency array and state change logic" | A |
| Performance | "As a performance expert, analyze this component's rendering performance. Organize problems and improvements in a table based on React Profiler criteria" | S |

> In GitHub Copilot, code context (surrounding files, imports) is automatically provided, so focus on technical instructions.`},{title:"M365 Copilot 프롬프트 예시",titleEn:"M365 Copilot Prompt Examples",content:`Microsoft 365 Copilot에서 실제 사용하는 프롬프트 예시와 평가입니다.

### Word Copilot 프롬프트

**예시 1: 제안서 작성**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "IT 컨설턴트로서, 중소기업 대상 클라우드 마이그레이션 제안서를 작성해줘. 구성: 1) 현황 분석, 2) 클라우드 전환 필요성, 3) 마이그레이션 로드맵(3단계), 4) 예상 비용/절감효과, 5) 리스크 관리 방안. A4 5페이지 분량, 전문적이지만 비기술 경영진도 이해 가능한 톤으로" |
| 평가 | S: 20 / C: 18 / O: 19 / R: 18 / E: 19 = **94점 (S등급)** |
| 분석 | 역할, 대상, 구조, 분량, 톤 모두 완벽하게 지정 |

**예시 2: 회의록 정리**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "이 회의 녹취록을 다음 형식으로 정리해줘: [참석자], [주요 논의 사항 (3-5개)], [결정 사항], [액션 아이템 - 담당자/기한 포함], [다음 회의 일정]" |
| 평가 | S: 18 / C: 14 / O: 19 / R: 10 / E: 17 = **78점 (B등급)** |
| 개선 | "프로젝트 매니저" 역할 부여 + 회의 배경 설명 추가 |

### Excel Copilot 프롬프트

| 용도 | 프롬프트 | 등급 |
|------|---------|------|
| 매출 분석 | "데이터 분석가로서, 이 매출 데이터에서 1) 월별 성장률 계산, 2) 상위 5개 제품 파레토 분석, 3) 계절 패턴 식별을 해줘. 결과는 각각 별도 시트에 차트 포함" | S |
| 수식 생성 | "B열의 날짜가 이번 달이고 C열 금액이 10만원 이상인 행의 D열 합계를 구하는 SUMPRODUCT 수식을 만들어줘" | A |
| 피벗 테이블 | "이 고객 데이터로 지역별, 분기별 매출 피벗 테이블을 만들고, 전년 동기 대비 증감률을 계산해줘" | A |

### PowerPoint Copilot 프롬프트

| 용도 | 프롬프트 | 등급 |
|------|---------|------|
| 프레젠테이션 | "마케팅 매니저로서, 신제품 런칭 발표 자료를 15장으로 만들어줘. 구성: 시장분석(3) → 제품소개(4) → 마케팅전략(4) → 일정&예산(2) → Q&A(1). 시각적 데이터 차트 포함" | S |
| 요약 발표 | "이 30장 보고서를 경영회의용 5장 요약으로 압축해줘. 핵심 KPI 수치와 전략적 의사결정 포인트만 추출" | A |

### Outlook Copilot 프롬프트

| 용도 | 프롬프트 | 등급 |
|------|---------|------|
| 공식 이메일 | "클라이언트에게 프로젝트 진행상황을 알리는 이메일을 써줘. 완료된 마일스톤 3개, 진행 중인 작업 2개, 다음 주 일정을 포함. 전문적이지만 긍정적인 톤으로" | A |
| 회신 작성 | "이 불만 이메일에 대한 공식 회신을 써줘. 사과 → 원인 설명 → 해결 조치 → 보상안 순서로. 공감적이고 해결 지향적 톤으로" | S |

> M365 Copilot에서는 대상 독자와 톤을 명시하는 것이 결과 품질을 크게 좌우합니다.`,contentEn:`Real-world prompt examples and evaluations for Microsoft 365 Copilot.

### Word Copilot Prompts

**Example 1: Proposal Writing**

| Item | Content |
|------|---------|
| Prompt | "As an IT consultant, write a cloud migration proposal for SMBs. Structure: 1) Current state analysis, 2) Cloud transition necessity, 3) Migration roadmap (3 phases), 4) Estimated costs/savings, 5) Risk management plan. 5 A4 pages, professional but understandable by non-technical executives" |
| Score | S: 20 / C: 18 / O: 19 / R: 18 / E: 19 = **94 (Grade S)** |
| Analysis | Role, audience, structure, volume, tone all perfectly specified |

**Example 2: Meeting Minutes**

| Item | Content |
|------|---------|
| Prompt | "Organize these meeting transcripts in this format: [Attendees], [Key Discussion Points (3-5)], [Decisions Made], [Action Items - with owner/deadline], [Next Meeting Schedule]" |
| Score | S: 18 / C: 14 / O: 19 / R: 10 / E: 17 = **78 (Grade B)** |
| Improvement | Add "project manager" role + meeting background description |

### Excel Copilot Prompts

| Purpose | Prompt | Grade |
|---------|--------|-------|
| Sales analysis | "As a data analyst, from this sales data: 1) Calculate monthly growth rates, 2) Pareto analysis of top 5 products, 3) Identify seasonal patterns. Results on separate sheets with charts" | S |
| Formula creation | "Create a SUMPRODUCT formula to sum column D where column B date is this month and column C amount is over 100,000" | A |
| Pivot table | "Create a regional and quarterly sales pivot table from this customer data, and calculate YoY growth rates" | A |

### PowerPoint Copilot Prompts

| Purpose | Prompt | Grade |
|---------|--------|-------|
| Presentation | "As a marketing manager, create a 15-slide new product launch presentation. Structure: Market Analysis(3) → Product Intro(4) → Marketing Strategy(4) → Timeline&Budget(2) → Q&A(1). Include visual data charts" | S |
| Summary | "Compress this 30-slide report into a 5-slide executive summary. Extract only key KPI figures and strategic decision points" | A |

### Outlook Copilot Prompts

| Purpose | Prompt | Grade |
|---------|--------|-------|
| Formal email | "Write an email to the client updating project progress. Include 3 completed milestones, 2 in-progress tasks, next week's schedule. Professional but positive tone" | A |
| Reply | "Write a formal reply to this complaint email. Order: Apology → Cause explanation → Resolution → Compensation. Empathetic and solution-oriented tone" | S |

> In M365 Copilot, specifying the target audience and tone significantly impacts result quality.`},{title:"실습 과제",titleEn:"Practice Exercises",content:`프롬프트 작성 능력을 향상시키기 위한 단계별 실습 과제입니다.

### 초급 실습 (Level 1)

| # | 과제 | 목표 | 평가 포인트 |
|---|------|------|-----------|
| 1 | "자기소개서 작성" 프롬프트를 SCORE 80점 이상으로 작성 | 구체성 + 맥락 연습 | 대상 회사, 직무, 톤 지정 여부 |
| 2 | 나쁜 프롬프트 3개를 찾아 개선 버전 작성 | 비교 분석 능력 | Before/After 점수 차이 |
| 3 | 같은 요청을 Zero-shot과 Few-shot으로 각각 작성 | 기법 차이 이해 | 결과물 품질 비교 |

### 중급 실습 (Level 2)

| # | 과제 | 목표 | 평가 포인트 |
|---|------|------|-----------|
| 1 | 하나의 비즈니스 시나리오를 Word, Excel, PowerPoint 프롬프트로 각각 변환 | 환경별 특화 | 각 앱 특성에 맞는 지시 |
| 2 | Chain-of-Thought 기법을 적용한 코드 디버깅 프롬프트 작성 | CoT 기법 실습 | 단계 구분의 논리성 |
| 3 | 페르소나 체이닝을 활용한 프로젝트 기획 프롬프트 시리즈 작성 | 고급 기법 실습 | 역할 간 연결 자연스러움 |

### 고급 실습 (Level 3)

| # | 과제 | 목표 | 평가 포인트 |
|---|------|------|-----------|
| 1 | 동료의 프롬프트를 SCORE 기준으로 평가하고 피드백 문서 작성 | 평가 능력 | 기준별 구체적 점수와 근거 |
| 2 | 특정 업무를 위한 재사용 가능한 프롬프트 템플릿 3개 설계 | 템플릿 설계 | 범용성, 커스터마이즈 용이성 |
| 3 | 메타 프롬프팅을 활용하여 자신의 프롬프트를 3회 반복 개선 | 반복 정제 | 각 라운드별 개선 폭 |

### 팀 실습 과제

| 과제명 | 인원 | 시간 | 내용 |
|--------|------|------|------|
| 프롬프트 배틀 | 2인 | 30분 | 같은 과제를 각자 프롬프트로 작성 → 결과 비교 → 상호 평가 |
| 릴레이 개선 | 3-4인 | 45분 | 한 명이 초안 작성 → 다음 사람이 개선 → 최종 점수 측정 |
| 프롬프트 해커톤 | 4-6인 | 2시간 | 실제 업무 시나리오 3개를 프롬프트로 해결 → 팀별 발표 |
| 평가 워크숍 | 전체 | 1시간 | 수집된 프롬프트를 SCORE 루브릭으로 그룹 평가 |

### 실습 평가 기준

| 등급 | 조건 | 역량 수준 |
|------|------|----------|
| Master | 모든 실습 SCORE 90+ 달성 | 프롬프트 코치/멘토 가능 |
| Expert | Level 3 실습 SCORE 85+ 달성 | 팀 내 프롬프트 리더 |
| Advanced | Level 2 실습 SCORE 80+ 달성 | 독립적 프롬프트 작성 가능 |
| Intermediate | Level 1 실습 SCORE 70+ 달성 | 기본 프롬프트 작성 가능 |
| Beginner | Level 1 실습 진행 중 | 학습 초기 단계 |

> 실습은 혼자보다 동료와 함께할 때 더 빠르게 성장합니다. 팀 실습을 적극 활용하세요.`,contentEn:`Step-by-step practice exercises to improve prompt writing skills.

### Beginner Exercises (Level 1)

| # | Exercise | Goal | Evaluation Points |
|---|----------|------|-------------------|
| 1 | Write a "self-introduction" prompt scoring SCORE 80+ | Specificity + context practice | Target company, position, tone specified |
| 2 | Find 3 bad prompts and write improved versions | Comparative analysis ability | Before/After score difference |
| 3 | Write the same request using both Zero-shot and Few-shot | Understand technique differences | Result quality comparison |

### Intermediate Exercises (Level 2)

| # | Exercise | Goal | Evaluation Points |
|---|----------|------|-------------------|
| 1 | Convert one business scenario into Word, Excel, PowerPoint prompts | Environment-specific skills | Instructions matching each app |
| 2 | Write a code debugging prompt using Chain-of-Thought | CoT technique practice | Logical step separation |
| 3 | Write a project planning prompt series using persona chaining | Advanced technique practice | Natural connections between roles |

### Advanced Exercises (Level 3)

| # | Exercise | Goal | Evaluation Points |
|---|----------|------|-------------------|
| 1 | Evaluate a colleague's prompt using SCORE criteria and write feedback | Evaluation ability | Specific scores and justification per criterion |
| 2 | Design 3 reusable prompt templates for specific tasks | Template design | Versatility, ease of customization |
| 3 | Use meta prompting to iteratively improve your prompt 3 times | Iterative refinement | Improvement margin per round |

### Team Practice Exercises

| Exercise | People | Time | Description |
|----------|--------|------|-------------|
| Prompt Battle | 2 | 30 min | Each writes prompt for same task → Compare results → Mutual evaluation |
| Relay Improvement | 3-4 | 45 min | One writes draft → Next person improves → Measure final score |
| Prompt Hackathon | 4-6 | 2 hours | Solve 3 real work scenarios with prompts → Team presentations |
| Evaluation Workshop | All | 1 hour | Group evaluate collected prompts using SCORE rubric |

### Practice Evaluation Criteria

| Grade | Condition | Competency Level |
|-------|-----------|-----------------|
| Master | All exercises SCORE 90+ | Prompt coach/mentor capable |
| Expert | Level 3 exercises SCORE 85+ | Team prompt leader |
| Advanced | Level 2 exercises SCORE 80+ | Independent prompt writing |
| Intermediate | Level 1 exercises SCORE 70+ | Basic prompt writing |
| Beginner | Working on Level 1 | Early learning stage |

> Practice grows faster with colleagues than alone. Actively use team exercises.`}]},p=()=>e.jsx(o,{heroEyebrow:"Prompt",seoTitle:"프롬프트 학습",seoTitleEn:"Prompt Learning",seoDescription:"프롬프트 기초부터 기법, SCORE 평가기준, 실전 예시까지 단계별 학습 자료",path:"/prompt/learn",dataFiles:[i,n,r,a],ctaBanner:e.jsxs("div",{className:"aifree-note",style:{marginTop:"var(--s-6)"},children:[e.jsx("i",{className:"fa-solid fa-pen-ruler"}),e.jsxs("div",{children:["배운 기준으로 직접 써보세요 —"," ",e.jsx(t,{to:"/prompt/practice",children:"작성 실습"}),"에서 점수 평가를 받고,"," ",e.jsx(t,{to:"/prompt/cases",children:"사례"}),"에서 업무별 프롬프트를 참고하세요."]})]})});export{p as default};
