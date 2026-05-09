import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Programowanie-stron-internetowych-2-/',
  server: {
    port: 5173,
    open: true
  }
})
