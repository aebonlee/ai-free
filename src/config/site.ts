/**
 * AI Free Academy — 무료 생성형AI 활용 학습 사이트 설정
 *
 * dasco 템플릿의 기본 인프라(인증·테마·다국어·레이아웃)를 상속합니다.
 */

import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'ai-free',

  name: 'AI Free Academy',
  nameKo: '무료 AI 활용 학습',
  description: 'ChatGPT · Claude · Gemini · Genspark 등 다양한 생성형 AI를 무료요금제 범위에서 실습하며 배우는 입문 학습 플랫폼',
  url: 'https://ai-free.dreamitbiz.com',

  dbPrefix: 'aifree_',

  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },

  brand: {
    parts: [
      { text: 'AI', className: 'brand-dream' },
      { text: ' Free', className: 'brand-it' },
      { text: ' Academy', className: 'brand-biz' }
    ]
  },

  themeColor: '#1B2A4A',

  company: {
    name: '드림아이티비즈(DreamIT Biz)',
    ceo: '이애본',
    bizNumber: '601-45-20154',
    salesNumber: '제2024-수원팔달-0584호',
    publisherNumber: '제2026-000026호',
    address: '경기도 수원시 팔달구 매산로 45, 419호',
    email: 'aebon@dreamitbiz.com',
    phone: '010-3700-0629',
    kakao: 'aebon',
    businessHours: '평일: 09:00 ~ 18:00',
  },

  features: {
    shop: false,
    community: false,
    search: false,
    auth: true,
    license: false,
  },

  colors: [
    { name: 'blue', color: '#1B2A4A' },
    { name: 'red', color: '#C8102E' },
    { name: 'green', color: '#00855A' },
    { name: 'purple', color: '#5B2C8B' },
    { name: 'orange', color: '#D4760A' },
  ],

  menuItems: [
    {
      labelKey: 'site.nav.about',
      path: '/about',
      activePath: '/about',
      dropdown: [
        { path: '/about', labelKey: 'site.nav.aboutIntent' },
        { path: '/about/instructor', labelKey: 'site.nav.aboutInstructor' },
      ]
    },
    {
      labelKey: 'site.nav.learn',
      path: '/learn',
      activePath: '/learn',
      dropdown: [
        { path: '/learn', labelKey: 'site.nav.learnUnderstand' },
        { path: '/learn', labelKey: 'site.nav.learnWisely' },
      ]
    },
    {
      labelKey: 'site.nav.tools',
      path: '/tools',
      activePath: '/tools',
      dropdown: [
        { path: '/tools', labelKey: 'site.nav.toolsHub' },
        { path: '/tools/chatgpt', labelKey: 'site.nav.toolChatgpt' },
        { path: '/tools/claude', labelKey: 'site.nav.toolClaude' },
        { path: '/tools/gemini', labelKey: 'site.nav.toolGemini' },
        { path: '/tools/genspark', labelKey: 'site.nav.toolGenspark' },
      ]
    },
    { path: '/examples', labelKey: 'site.nav.examples', activePath: '/examples',
      dropdown: [
        { path: '/examples', labelKey: 'site.nav.examplesAll' },
        { path: '/examples/beginner', labelKey: 'site.nav.examplesBeginner' },
        { path: '/examples/basic', labelKey: 'site.nav.examplesBasic' },
        { path: '/examples/advanced', labelKey: 'site.nav.examplesAdvanced' },
      ]
    },
    {
      labelKey: 'site.nav.prompt',
      path: '/prompt/learn',
      activePath: '/prompt',
      dropdown: [
        { path: '/prompt/learn', labelKey: 'site.nav.promptLearn' },
        { path: '/prompt/practice', labelKey: 'site.nav.promptPractice' },
        { path: '/prompt/cases', labelKey: 'site.nav.promptCases' },
      ]
    },
    { path: '/prompt/evaluation', labelKey: 'site.nav.promptEvaluation', activePath: '/prompt/evaluation' },
    { path: '/playground', labelKey: 'site.nav.playground', activePath: '/playground' },
    { path: '/recommended', labelKey: 'site.nav.recommended', activePath: '/recommended' },
  ],

  footerLinks: [
    { path: '/tools', labelKey: 'site.nav.tools' },
    { path: '/examples', labelKey: 'site.nav.examples' },
    { path: '/playground', labelKey: 'site.nav.playground' },
    { path: '/recommended', labelKey: 'site.nav.recommended' }
  ],

  familySites: [
    { name: 'DreamIT Biz (본사이트)', url: 'https://www.dreamitbiz.com' },
    { name: 'DASCO AI Academy', url: 'https://dasco.dreamitbiz.com' },
    { name: 'AI 프롬프트 교육', url: 'https://ai-prompt.dreamitbiz.com' },
    { name: 'ChatGPT 활용', url: 'https://chatgpt.dreamitbiz.com' }
  ]
};

export default site;
