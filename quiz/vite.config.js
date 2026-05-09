import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,vue}'],
      exclude: ['src/main.js', 'src/**/*.spec.js'],
      thresholds: {
        lines: 70,
        branches: 60,
        functions: 70,
        statements: 70
      }
    }
  }
})
