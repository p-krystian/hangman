import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: { target: 'es2020' },
  plugins: [svgr(), react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  },
  resolve: {
    alias: {
      '@/': '/src/'
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  esbuild: { target: 'es2020' }
});
