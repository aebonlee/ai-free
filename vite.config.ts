import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // 빌드 결과를 docs/에 출력해 커밋합니다.
    // → GitHub Pages를 "Deploy from a branch: gh-pages /docs"로도,
    //   "GitHub Actions"로도 모두 서빙할 수 있습니다(빈 페이지 방지).
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    host: true,
    port: 5174
  }
})
