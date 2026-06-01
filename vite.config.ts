import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // 단일 gh-pages 브랜치 운영: 소스(루트) + 빌드(docs/) 공존.
    // GitHub Pages는 gh-pages 브랜치의 /docs 폴더를 서빙합니다.
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    host: true,
    port: 5174
  }
})
