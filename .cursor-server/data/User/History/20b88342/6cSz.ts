import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    preview: {
      host: '0.0.0.0',
      port: 5173,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      minify: mode === 'production' ? 'terser' : false,
      terserOptions: mode === 'production' ? {
        compress: {
          drop_console: false,
        },
      } : undefined,
    },
    define: {
      'process.env': env
    }
  }
})
