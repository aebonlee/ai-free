# 개발일지 — AI Free Academy

> 무료요금제로 시작하는 생성형 AI 학습 플랫폼
> ChatGPT · Claude · Gemini · Genspark 무료 실습 + 강사 토큰 배당 유료 실습

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 목표 | 생성형 AI 입문자가 **무료요금제**로 충분히 연습하고, 강사가 배당한 **토큰만큼** 유료 모델까지 직접 체험 |
| 기반 | DreamIT Biz 하위 사이트 템플릿(`dasco`)의 기본 인프라를 상속 (동일 기본 셋팅) |
| 스택 | React 19 · TypeScript · Vite 7 · React Router 7 · Supabase |
| 배포 | 단일 `gh-pages` 브랜치 + GitHub Actions 자동 빌드·배포 (Pages Source: GitHub Actions) |
| 도메인 | https://ai-free.dreamitbiz.com |

---

## 2026-06-01 — 초기 구축

### 1) dasco 기본 셋팅 상속
- 인증(Supabase: Google/Kakao/Email), 테마(다크/라이트/5색), 다국어(한/영),
  레이아웃(Navbar/Footer), 토스트, 디자인 토큰(`base.css`)을 그대로 이식
- `config/site.ts` 를 AI Free Academy 정보로 교체, 브랜딩/메타/CNAME 갱신
- dasco 전용 페이지(커리큘럼·강의안·프롬프트평가·쇼핑·주문) 정리

### 2) AI 도구 가이드 (무료요금제)
- `config/aiProviders.ts`: 4대 AI의 무료요금제 한도·강점·모델·키 발급 정보 정의
- `/tools`(허브) + `/tools/:provider`(개별 가이드: 무료 한도·주의점·절약 팁·관련 예제)
- Genspark는 공개 Chat API 부재 → 무료 실습/링크 안내만 제공

### 3) 학습 예제 라이브러리
- `data/examples.ts`: 8개 카테고리 25+ 실전 프롬프트
  (글쓰기·업무·학습·아이디어·번역·데이터·코딩·발표)
- `/examples`: 카테고리 필터 + 펼침 카드 + **프롬프트 복사** + 추천 AI/기대결과/팁

### 4) 토큰 배당 실습실 (핵심)
- `utils/tokenAllocation.ts`: 배당/사용량/키 저장 (Supabase ↔ localStorage 폴백)
- `utils/aiClient.ts`: 브라우저에서 OpenAI/Anthropic/Gemini 직접 호출 + usage 반환
- `/playground`: 배당 토큰으로 유료 모델 호출 → **응답 토큰만큼 자동 차감**,
  소진 시 차단 → 무료요금제로 유도 (로그인 필요)
- `/admin/allocation`(강사 전용): API 키 충전 + 학생 이메일별 토큰 배당/초기화
- `scripts/supabase-setup.sql`: (선택) Supabase 전체 설정 — user_profiles·aifree_settings·check_user_status·RLS·Storage

### 5) 코드 리뷰 반영 (gemini-code-assist)
- **[High] 동시성**: 배당을 학생별 개별 키(`alloc_<email>`)로 분리 →
  여러 학생 동시 사용 시 잔여량 덮어쓰기(Lost Update) 경쟁 상태 제거
- **[High] 성능**: 학생 추가 시 provider별 순차 저장 → 배치 단일 저장
- **[High] 안정성**: `PaymentNudgePopup` 동적 import → 정적 import
- **[Medium]**: AuthContext 프로필 생성 try/catch, SearchModal/ImageUpload 타이머
  언마운트 정리, CodeBlock 정규식 `g` 플래그 방어

### 13) 배포 구조를 클래식(main=소스 / gh-pages=빌드)으로 전환
- 기존 DreamIT 사이트와 동일 구조로 통일: 소스는 main, 빌드 결과만 gh-pages 루트
- `npm run deploy`(gh-pages -d dist --dotfiles)로 게시, Pages는 gh-pages /(root) 서빙
- main에서 docs/ 제거, outDir dist, gh-pages devDependency 추가

### 12) 학습하기 ↔ 프롬프트 메뉴 역할 분리 (중복 제거)
- 학습하기(/learn): 프롬프트 작성 관련 그룹 제거 → **AI 기초/입문 전용**
  (AI 이해하기 / AI 안전하게 쓰기, 6섹션 + 프롬프트 메뉴로 연결)
- 프롬프트(/prompt/*): 프롬프트 학습·기법·평가·실습·사례 전담
- 학습하기 드롭다운/번역/배너를 비프롬프트 주제로 갱신

### 11) "프롬프트" 메뉴 신설 (dasco 3메뉴 응용)
- 상단 드롭다운 「프롬프트」: 학습 / 작성실습 / 사례
- **프롬프트 학습**(/prompt/learn): GuidePage + 범용 자료 4그룹(기초·기법·SCORE 평가·예시)
- **프롬프트 작성실습**(/prompt/practice): SCORE 5기준 자동 채점 엔진 + 일반 업무 시나리오 6종, 점수·등급·피드백·모범답안
- **프롬프트 사례**(/prompt/cases): 8개 카테고리 20개 일반 업무 프롬프트(복사)
- 예제 페이지: 아코디언화(다른 예제 열면 이전 것 자동 닫힘)

### 10) OG(미리보기) 이미지 — 다크블루 + 5색 테마
- `scripts/generate-og.cjs`를 AI Free Academy용으로 재작성(sharp)
- 1200x630, 다크블루 배경, 5색 테마 점, 4대 AI 태그, 도메인
- `public/og-image.png`, `og-image-v2.png` 생성, index.html OG 태그(og:url/title/description/type/image/site_name) 정합

### 9) "학습하기" 메뉴 추가 (AI 기초 ~ 프롬프트)
- 상단 메뉴 About 다음에 「학습하기」 추가, 라우트 `/learn`
- GuidePage(좌측 접이식 사이드바 + 마크다운)로 3개 그룹 학습자료 제작:
  인공지능 기초 / 프롬프트 기초 / 프롬프트 활용 (총 14개 섹션)
- 데이터: `src/pages/learn/learnData.ts`
- 예제 카드: 2열 → 1열 배치, 펼침 시 "상세 설명" 추가

### 8) 예제 UX 개선 — 수준별 상단 메뉴 + 좌측 사이드바
- 상단 메뉴 「학습 예제」에 드롭다운(전체/입문/기초/활용) 추가
- 라우트 `/examples/:level`(beginner·basic·advanced) 추가
- 예제 페이지를 좌측 사이드바(수준별 + 카테고리) + 본문 그리드로 재구성, 가독성 향상

### 7) "빈 저장소/빈 페이지" 원인 해결 — 코드를 기본 브랜치(main)로 통일
- 증상: 저장소 첫 화면이 비어 보이고 사이트가 빈 페이지
- 원인: 모든 코드가 `gh-pages`에만 있고 기본 브랜치 `main`은 비어 있었음
  (GitHub 저장소/Pages는 기본 브랜치를 기준으로 표시·배포)
- 조치: `main`을 전체 코드로 fast-forward, Actions가 `main`·`gh-pages` 모두에서 배포
- 로컬 프리뷰로 빌드 정상 렌더 확인(코드 문제 아님을 검증)

### 6) 배포 구조 — 단일 `gh-pages` 브랜치 + GitHub Actions
- `gh-pages` 한 브랜치에서 개발, 푸시 시 Actions가 자동 빌드·배포
- `.github/workflows/deploy.yml`: build → `dist` 업로드 → `actions/deploy-pages`
- Pages Source는 "GitHub Actions"로 설정 (폴더 선택 불필요 → 빈 페이지 이슈 해소)
- 빌드 산출물(`dist/`)은 커밋하지 않음(매 푸시마다 새로 빌드)

---

## 라우팅 맵

| 경로 | 페이지 | 비고 |
|------|--------|------|
| `/` | Home | 소개·흐름·4대 AI |
| `/tools`, `/tools/:provider` | Tools / ToolGuide | 무료요금제 가이드 |
| `/examples` | Examples | 학습 예제 |
| `/playground` | Playground | 실습실 (로그인) |
| `/admin/allocation` | AdminAllocation | 토큰 배당 (강사) |
| `/about`, `/about/instructor` | About / InstructorIntro | 소개 |
| `/recommended` | RecommendedSites | 추천 사이트 |
| `/login` `/register` `/forgot-password` `/mypage` | Auth | dasco 상속 |

---

## 향후 과제
- [ ] 운영 보안: API 키를 Edge Function 프록시로 이전(클라이언트 노출 제거)
- [ ] 사용량 검증을 서버에서 수행(학생 임의 배당 증가 방지)
- [ ] 예제 추가 및 난이도별 학습 경로
- [ ] 실습 결과(대화) 저장/회고 기능
