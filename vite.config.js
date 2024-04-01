import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015'
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  }
})
