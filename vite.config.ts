import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react/template/', // 👈 required for sub-path deployment
  resolve: {
    alias: {
      '@': '/src',
      moment: 'moment/moment.js'
    },
  },
})
