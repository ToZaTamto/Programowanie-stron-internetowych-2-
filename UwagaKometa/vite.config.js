import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Programowanie-stron-internetowych-2-/UwagaKometa/',
  server: {
    port: 5173,
    open: true
  }
})
