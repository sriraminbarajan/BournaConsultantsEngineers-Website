import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoBase = '/BournaConsultantsEngineers-Website/'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Project Pages URL: https://sriraminbarajan.github.io/BournaConsultantsEngineers-Website/
  // Keep `/` for local `npm run dev`
  base: command === 'build' ? repoBase : '/',
}))
