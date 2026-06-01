# AI Free Academy — 무료로 시작하는 생성형 AI 학습

ChatGPT · Claude · Gemini · Genspark 등 다양한 생성형 AI를 **무료요금제 범위**에서
실습하며 배우는 입문 학습 플랫폼입니다. 강사가 API 키를 충전하고 학생별로 토큰을
배당하면, 학생은 **배당받은 만큼** 실습실(Playground)에서 유료 모델까지 직접
사용해 볼 수 있습니다.

> DreamIT Biz 하위 사이트 템플릿(`dasco`)의 핵심 인프라(인증·테마·다국어·레이아웃)를
> 그대로 상속받아 동일한 기본 셋팅 위에 제작되었습니다.

## 주요 기능

| 영역 | 설명 |
|------|------|
| **AI 도구 가이드** (`/tools`) | 4대 AI의 무료요금제 한도·강점·절약 팁을 비교 안내 |
| **학습 예제** (`/examples`) | 8개 카테고리 · 25+ 실전 프롬프트 예제 (복사 → 붙여넣기) |
| **AI 실습실** (`/playground`) | 배당 토큰으로 유료 모델(OpenAI/Anthropic/Gemini)을 직접 호출, 사용량 자동 차감 |
| **토큰 배당 관리** (`/admin/allocation`) | 강사 전용. API 키 충전 + 학생별 토큰 배당/초기화 |
| 상속 기능 | Supabase 인증, 다크/라이트/5색 테마, 한/영 다국어, 토스트 알림 |

## 토큰 배당 흐름

```
강사(관리자)                          학생
─────────────                        ──────
1. API 키 충전        ──────────▶
   (OpenAI/Anthropic/Gemini)
2. 학생 이메일별 토큰 배당  ──────▶   3. 로그인 후 실습실 입장
                                     4. 배당 토큰 내에서 유료 모델 호출
                      ◀──────────    5. 응답의 usage 만큼 자동 차감
6. 사용 현황 확인/초기화
```

- **무료 한도**: 토큰 없이도 각 AI 가이드를 보고 공식 사이트에서 무료요금제로 연습 가능
- **유료 체험**: 배당된 토큰만큼만 사용, 소진 시 호출 차단 → 무료요금제로 유도
- **Genspark**: 공개 Chat API가 없어 무료 실습/링크 안내만 제공

## 빠른 시작

```bash
npm install
cp .env.example .env   # (선택) Supabase 키 입력
npm run dev            # http://localhost:5174
npm run build          # 프로덕션 빌드 → dist/
```

## 개발 & 배포 방식 (단일 `gh-pages` 브랜치 + `/docs` 서빙)

이 저장소는 **`gh-pages` 브랜치 하나로 통일**해서 운영합니다.
소스코드는 루트에 있고, **빌드 결과물을 `docs/`에 커밋**해 GitHub Pages가 `/docs`를 서빙합니다.

```
gh-pages 브랜치 (유일한 작업·배포 브랜치)
├── src/ · index.html …   ← 개발용 소스 (루트)
└── docs/                 ← 빌드 결과 (GitHub Pages가 /docs 서빙)
```

### 개발 & 배포 흐름

1. `gh-pages` 브랜치에서 작업 → `npm run dev` 로 로컬 확인 (http://localhost:5174)
2. 배포: `npm run build` (→ `docs/` 생성) → `git add docs && git commit && git push`

### GitHub 저장소 설정 (최초 1회) ★ 빈 페이지 해결의 핵심

- **Settings → Pages → Build and deployment**
  - Source: **Deploy from a branch**
  - Branch: **`gh-pages`** · 폴더: **`/docs`** → **Save**
- ⚠️ 폴더를 **`/(root)` 로 두면 흰 화면**입니다 — 루트의 개발용 `index.html`(`/src/main.tsx` 참조)이 떠서 깨집니다. 반드시 **`/docs`**.
- **Settings → General → Default branch → `gh-pages`**
- 커스텀 도메인(`ai-free.dreamitbiz.com`)은 `public/CNAME`(→ `docs/CNAME`)로 포함됩니다.

### 브랜치 정책
- **`gh-pages`** : 유일한 작업·배포 브랜치
- 기본 브랜치를 gh-pages로 바꾼 뒤 `main`, `claude/*` 브랜치는 삭제 권장
  (저장소 Branches 페이지에서 삭제 — 소유자 권한 필요)

### 강사 계정(관리자) 설정

`src/config/admin.ts` 의 `ADMIN_EMAILS` 에 강사 이메일을 추가하면 해당 계정으로
로그인 시 상단 메뉴 → **토큰 배당 관리** 가 노출됩니다.

### 저장소(백엔드)

- **Supabase 미설정**: 토큰 배당/API 키가 `localStorage`에 저장됩니다(단일 브라우저 데모).
- **Supabase 설정**: `scripts/supabase-setup.sql` 을 SQL Editor에서 실행하면
  `user_profiles`(인증) · `aifree_settings`(배당/키) · `check_user_status` 등이
  한 번에 생성되어, 배당/키가 DB에 저장되고 여러 기기·학생 간 공유됩니다.

## ⚠️ 보안 주의

실습실은 브라우저에서 AI API를 직접 호출합니다. 따라서 API 키가 클라이언트에 노출될
수 있어 **폐쇄된 교육용 환경**에서만 사용하세요. 운영 환경에서는 Supabase Edge
Function 등 **서버 프록시**를 통해 키를 숨기고 호출하도록 변경하는 것을 권장합니다.

## 커스터마이징

- 사이트 정보/메뉴: `src/config/site.ts`
- AI 제공자/무료요금제/모델: `src/config/aiProviders.ts`
- 학습 예제: `src/data/examples.ts`
- 전용 스타일: `src/styles/aifree.css` (디자인 토큰은 `src/styles/base.css`)

## 기술 스택

React 19 · TypeScript · Vite 7 · React Router 7 · Supabase

---

**Copyright (c) 2025-2026 DreamIT Biz (Ph.D Aebon Lee). All Rights Reserved.**
문의: aebon@dreamitbiz.com · https://www.dreamitbiz.com
