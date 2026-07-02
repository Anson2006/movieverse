import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/movieverse/', // 👈 Must match your repository URL folder slug name exactly
})
