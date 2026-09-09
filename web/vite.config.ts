import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain https://www.bournace.com serves from site root → base must be `/`
export default defineConfig({
  plugins: [react()],
  base: '/',
})
