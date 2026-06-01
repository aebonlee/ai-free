/**
 * AI 제공자 정의
 *
 * - 무료요금제(free tier) 정보: 학습/실습 안내용
 * - 실습실(Playground) API 설정: 강사가 충전한 키로 호출하는 유료 모델
 *
 * Genspark는 공개 Chat API가 없어 무료 실습/링크 안내만 제공합니다.
 */

export type ProviderId = 'chatgpt' | 'claude' | 'gemini' | 'genspark';

export interface FreeTierItem {
  label: string;
  value: string;
}

export interface AIProvider {
  id: ProviderId;
  name: string;            // 표시 이름
  vendor: string;          // 제공사
  icon: string;            // Font Awesome class
  color: string;           // 브랜드 컬러
  tagline: string;         // 한 줄 소개
  siteUrl: string;         // 공식 사이트 (무료 가입)
  /** 무료요금제 핵심 정보 */
  freeTier: {
    summary: string;
    items: FreeTierItem[];
    limits: string[];
    tips: string[];
  };
  /** 실습실(Playground) 연동 — 강사 API 키 기반 유료 호출 */
  api: {
    /** 공개 브라우저 호출 가능 여부 (Genspark=false) */
    callable: boolean;
    /** 실습용 기본 모델 (저렴/입문용) */
    defaultModel: string;
    /** 선택 가능한 모델 목록 */
    models: { id: string; label: string; note?: string }[];
    /** API 키 발급 안내 URL */
    keyUrl: string;
    /** 키 환경변수/설정 키 이름 */
    keyName: string;
  };
}

export const AI_PROVIDERS: Record<ProviderId, AIProvider> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    icon: 'fa-solid fa-comment-dots',
    color: '#10A37F',
    tagline: '가장 대중적인 범용 AI 대화 서비스',
    siteUrl: 'https://chatgpt.com',
    freeTier: {
      summary: '무료 계정으로 GPT-5 계열의 기본 모델을 제한적으로 사용할 수 있습니다. 사용량이 많으면 자동으로 경량 모델로 전환됩니다.',
      items: [
        { label: '가입 비용', value: '무료 (이메일/구글/MS 계정)' },
        { label: '사용 모델', value: 'GPT-5 mini 등 기본 모델' },
        { label: '이미지 생성', value: '제한적 (DALL·E, 1일 소량)' },
        { label: '음성 대화', value: '기본 음성 모드 지원' },
      ],
      limits: [
        '일정 시간당 메시지 수에 한도가 있으며, 한도 초과 시 대기하거나 경량 모델로 전환됩니다.',
        '최신 고급 모델(추론 모델)과 고급 데이터 분석은 유료(Plus)에서 더 넉넉합니다.',
        '파일 업로드/분석, 맞춤 GPT 생성 등 일부 기능은 횟수 제한이 있습니다.',
      ],
      tips: [
        '무료에서도 충분히 글쓰기·요약·번역·아이디어 발상 실습이 가능합니다.',
        '긴 작업은 한 번에 몰아서 하지 말고 단계를 나눠 한도를 아껴 쓰세요.',
        '응답이 평소보다 단순해지면 경량 모델로 전환된 신호 — 잠시 후 다시 시도하세요.',
      ],
    },
    api: {
      callable: true,
      defaultModel: 'gpt-4o-mini',
      models: [
        { id: 'gpt-4o-mini', label: 'GPT-4o mini', note: '저렴·빠름 (실습 권장)' },
        { id: 'gpt-4o', label: 'GPT-4o', note: '고품질·멀티모달' },
      ],
      keyUrl: 'https://platform.openai.com/api-keys',
      keyName: 'OPENAI_API_KEY',
    },
  },

  claude: {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    icon: 'fa-solid fa-feather',
    color: '#D97757',
    tagline: '긴 문서 분석·글쓰기·코딩에 강한 AI',
    siteUrl: 'https://claude.ai',
    freeTier: {
      summary: '무료 계정으로 최신 Claude 모델을 하루 일정량까지 사용할 수 있습니다. 긴 문서 업로드 분석과 자연스러운 글쓰기가 강점입니다.',
      items: [
        { label: '가입 비용', value: '무료 (이메일/구글 계정)' },
        { label: '사용 모델', value: '최신 Claude (사용량 한도 내)' },
        { label: '파일 분석', value: 'PDF·문서 업로드 분석 지원' },
        { label: '프로젝트', value: '유료(Pro)에서 더 넉넉' },
      ],
      limits: [
        '하루 사용량(메시지/토큰) 한도가 있으며, 대화가 길어질수록 한도가 빨리 소모됩니다.',
        '한도에 도달하면 일정 시간(보통 몇 시간) 뒤 초기화됩니다.',
        '대용량 파일·매우 긴 대화는 무료 한도를 빠르게 소진합니다.',
      ],
      tips: [
        '문서 요약·교정·번역 등 "긴 글" 작업에 특히 잘 맞습니다.',
        '한도를 아끼려면 새 주제는 새 대화로 시작하세요(이전 맥락 누적 방지).',
        '코드 리뷰·기술 문서 작성 실습에 활용해 보세요.',
      ],
    },
    api: {
      callable: true,
      defaultModel: 'claude-haiku-4-5-20251001',
      models: [
        { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5', note: '저렴·빠름 (실습 권장)' },
        { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6', note: '고품질 범용' },
      ],
      keyUrl: 'https://console.anthropic.com/settings/keys',
      keyName: 'ANTHROPIC_API_KEY',
    },
  },

  gemini: {
    id: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    icon: 'fa-solid fa-gem',
    color: '#4285F4',
    tagline: 'Google 검색·워크스페이스와 통합된 AI',
    siteUrl: 'https://gemini.google.com',
    freeTier: {
      summary: 'Google 계정으로 무료 사용. 최신 정보 검색 연동과 이미지 인식, Google 문서/스프레드시트 연계가 강점입니다.',
      items: [
        { label: '가입 비용', value: '무료 (Google 계정)' },
        { label: '사용 모델', value: 'Gemini Flash 등 기본 모델' },
        { label: '검색 연동', value: '실시간 정보 기반 답변' },
        { label: 'API 무료 한도', value: 'AI Studio에서 분당/일일 무료 호출 제공' },
      ],
      limits: [
        '고급 모델(Pro/Deep Research 등)은 유료 구독에서 더 넉넉합니다.',
        'API도 무료 등급은 분당 요청수(RPM)·일일 요청수(RPD) 한도가 있습니다.',
        '대용량/대량 호출은 유료 등급이 필요합니다.',
      ],
      tips: [
        'Google AI Studio에서 무료 API 키를 발급해 실습실에서도 사용할 수 있습니다.',
        '최신 정보가 필요한 질문(뉴스·시세·검색형)에 강점이 있습니다.',
        'Gmail·Docs 등 Google 도구와 연계 실습을 해보세요.',
      ],
    },
    api: {
      callable: true,
      defaultModel: 'gemini-2.0-flash',
      models: [
        { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', note: '무료 한도·빠름 (실습 권장)' },
        { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', note: '향상된 추론' },
      ],
      keyUrl: 'https://aistudio.google.com/app/apikey',
      keyName: 'GEMINI_API_KEY',
    },
  },

  genspark: {
    id: 'genspark',
    name: 'Genspark',
    vendor: 'Genspark AI',
    icon: 'fa-solid fa-bolt',
    color: '#6C5CE7',
    tagline: 'AI 에이전트 기반 차세대 검색·자동화',
    siteUrl: 'https://www.genspark.ai',
    freeTier: {
      summary: '무료 가입 시 일정량의 크레딧을 제공합니다. Sparkpage(주제 종합 페이지)와 AI 슬라이드·시트 등 에이전트형 기능이 특징입니다.',
      items: [
        { label: '가입 비용', value: '무료 (가입 시 크레딧 제공)' },
        { label: '핵심 기능', value: 'Sparkpage, AI Slides/Sheets/Docs' },
        { label: '에이전트', value: '자동 리서치·작업 수행' },
        { label: '추가 사용', value: '크레딧 소진 시 유료 충전' },
      ],
      limits: [
        '공개된 Chat API가 없어 본 실습실의 유료 토큰 호출은 지원하지 않습니다.',
        '무료 크레딧 소진 후에는 유료 플랜으로 전환해야 합니다.',
        '에이전트 작업은 일반 대화보다 크레딧을 많이 사용합니다.',
      ],
      tips: [
        '주제 리서치 → Sparkpage 생성으로 자료조사 실습을 해보세요.',
        'AI Slides로 발표자료 초안을 빠르게 만들어 볼 수 있습니다.',
        '무료 크레딧은 "에이전트형 작업"을 한 번 경험하는 데 집중해서 쓰세요.',
      ],
    },
    api: {
      callable: false,
      defaultModel: '',
      models: [],
      keyUrl: 'https://www.genspark.ai',
      keyName: 'GENSPARK_API_KEY',
    },
  },
};

export const PROVIDER_LIST: AIProvider[] = [
  AI_PROVIDERS.chatgpt,
  AI_PROVIDERS.claude,
  AI_PROVIDERS.gemini,
  AI_PROVIDERS.genspark,
];

export function getProvider(id: string): AIProvider | undefined {
  return AI_PROVIDERS[id as ProviderId];
}
