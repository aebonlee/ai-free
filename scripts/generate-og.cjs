/**
 * OG 이미지 생성 (1200x630) — AI Free Academy
 * 기본 컬러: 다크 블루 / 5색 테마 포인트
 *
 *   node scripts/generate-og.cjs
 *
 * sharp(devDependency)로 SVG → PNG 변환. public/og-image.png, og-image-v2.png 생성.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const W = 1200;
const H = 630;

// 다크 블루 팔레트
const NAVY_900 = '#0A1428';
const NAVY_700 = '#1B2A4A';
const BLUE = '#3D6FE0';
const BLUE_LIGHT = '#5B8AF0';

// 5가지 테마 컬러 (밝게 보정 — 다크 배경 대비)
const THEMES = [
  { name: 'blue',   c: '#3D6FE0' },
  { name: 'red',    c: '#E74A5A' },
  { name: 'green',  c: '#2ECC8F' },
  { name: 'purple', c: '#9B6DD6' },
  { name: 'orange', c: '#F0A030' },
];

const dots = THEMES.map((t, i) =>
  `<circle cx="${740 + i * 70}" cy="150" r="22" fill="${t.c}"/>`
).join('\n  ');

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY_900}"/>
      <stop offset="55%" stop-color="${NAVY_700}"/>
      <stop offset="100%" stop-color="#24365C"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BLUE}"/>
      <stop offset="100%" stop-color="${BLUE_LIGHT}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="1050" cy="120" r="300" fill="${BLUE}" opacity="0.05"/>
  <circle cx="1090" cy="70" r="180" fill="${BLUE}" opacity="0.04"/>
  <circle cx="90" cy="600" r="200" fill="${BLUE}" opacity="0.03"/>

  <!-- Grid overlay -->
  <line x1="400" y1="0" x2="400" y2="${H}" stroke="white" stroke-width="0.3" opacity="0.04"/>
  <line x1="800" y1="0" x2="800" y2="${H}" stroke="white" stroke-width="0.3" opacity="0.04"/>
  <line x1="0" y1="210" x2="${W}" y2="210" stroke="white" stroke-width="0.3" opacity="0.04"/>
  <line x1="0" y1="420" x2="${W}" y2="420" stroke="white" stroke-width="0.3" opacity="0.04"/>

  <!-- 5색 테마 점 (우상단) -->
  ${dots}
  <text x="740" y="205" fill="rgba(255,255,255,0.45)" font-family="Arial, sans-serif" font-size="15" font-weight="600" letter-spacing="1">5 COLOR THEMES</text>

  <!-- Eyebrow -->
  <rect x="72" y="62" width="34" height="3" fill="url(#accent)" rx="1.5"/>
  <text x="72" y="94" fill="${BLUE_LIGHT}" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" letter-spacing="3">DREAMIT BIZ</text>

  <!-- Main title -->
  <text x="70" y="250" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="900" letter-spacing="-2">AI <tspan fill="${BLUE_LIGHT}">Free</tspan></text>
  <text x="72" y="338" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="900" letter-spacing="-2">Academy</text>

  <!-- Korean subtitle -->
  <text x="74" y="398" fill="rgba(255,255,255,0.72)" font-family="Arial, sans-serif" font-size="26" font-weight="400">무료로 시작하는 생성형 AI 학습</text>

  <!-- Accent line -->
  <rect x="74" y="424" width="110" height="4" fill="url(#accent)" rx="2"/>

  <!-- Tags: 4 AIs -->
  <rect x="72" y="476" width="118" height="38" rx="8" fill="rgba(61,111,224,0.16)" stroke="${BLUE}" stroke-width="1"/>
  <text x="131" y="501" fill="${BLUE_LIGHT}" font-family="Arial, sans-serif" font-size="15" font-weight="700" text-anchor="middle">ChatGPT</text>

  <rect x="202" y="476" width="100" height="38" rx="8" fill="rgba(61,111,224,0.16)" stroke="${BLUE}" stroke-width="1"/>
  <text x="252" y="501" fill="${BLUE_LIGHT}" font-family="Arial, sans-serif" font-size="15" font-weight="700" text-anchor="middle">Claude</text>

  <rect x="314" y="476" width="104" height="38" rx="8" fill="rgba(61,111,224,0.16)" stroke="${BLUE}" stroke-width="1"/>
  <text x="366" y="501" fill="${BLUE_LIGHT}" font-family="Arial, sans-serif" font-size="15" font-weight="700" text-anchor="middle">Gemini</text>

  <rect x="430" y="476" width="120" height="38" rx="8" fill="rgba(61,111,224,0.16)" stroke="${BLUE}" stroke-width="1"/>
  <text x="490" y="501" fill="${BLUE_LIGHT}" font-family="Arial, sans-serif" font-size="15" font-weight="700" text-anchor="middle">Genspark</text>

  <!-- Bottom URL -->
  <text x="74" y="582" fill="rgba(255,255,255,0.42)" font-family="monospace" font-size="17" letter-spacing="1">ai-free.dreamitbiz.com</text>

  <!-- Large decorative AI -->
  <text x="860" y="540" fill="rgba(255,255,255,0.04)" font-family="Arial, Helvetica, sans-serif" font-size="320" font-weight="900">AI</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#accent)"/>
</svg>`;

(async () => {
  const pub = path.join(__dirname, '..', 'public');
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

  for (const name of ['og-image.png', 'og-image-v2.png']) {
    const out = path.join(pub, name);
    fs.writeFileSync(out, png);
    const kb = (fs.statSync(out).size / 1024).toFixed(1);
    console.log(`OG image: ${out}  (${kb} KB, ${W}x${H})`);
  }
})();
