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
| 배포 | 단일 `gh-pages` 브랜치 (소스 + `docs/` 빌드 공존, GitHub Pages `/docs` 서빙) |
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
- `scripts/create-aifree-settings.sql`: (선택) Supabase 테이블 + RLS

### 5) 코드 리뷰 반영 (gemini-code-assist)
- **[High] 동시성**: 배당을 학생별 개별 키(`alloc_<email>`)로 분리 →
  여러 학생 동시 사용 시 잔여량 덮어쓰기(Lost Update) 경쟁 상태 제거
- **[High] 성능**: 학생 추가 시 provider별 순차 저장 → 배치 단일 저장
- **[High] 안정성**: `PaymentNudgePopup` 동적 import → 정적 import
- **[Medium]**: AuthContext 프로필 생성 try/catch, SearchModal/ImageUpload 타이머
  언마운트 정리, CodeBlock 정규식 `g` 플래그 방어

### 6) 배포 구조 전환 — 단일 `gh-pages` 브랜치
- `vite.config.ts` `outDir: dist → docs`, `public/.nojekyll` 추가
- 소스(루트) + 빌드(`docs/`)를 한 브랜치에서 운영, Pages는 `gh-pages /docs` 서빙
- `npm run deploy` = 빌드 → `docs/` 커밋·푸시

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
