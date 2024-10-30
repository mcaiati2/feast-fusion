import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is referencing the dev server that runs on 5173
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:3333',
        changeOrigin: true
      }
    }
  }
})
