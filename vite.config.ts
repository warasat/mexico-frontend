import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ root ke liye
  resolve: {
    alias: {
      '@': '/src',
      moment: 'moment/moment.js'
    },
  },
})
