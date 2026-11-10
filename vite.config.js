import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // En GitHub Pages el sitio cuelga de /canoniks/, pero en desarrollo se
  // sirve desde la raíz.
  base: command === 'build' ? '/canoniks/' : '/',
  plugins: [react(), tailwindcss()],
}))
