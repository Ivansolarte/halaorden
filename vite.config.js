import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    historyApiFallback: true,
  },
  base: mode === 'production' ? '/your_store_frontend/' : '/', // Usa '/' en desarrollo y '/your_store_frontend/' en producción
}))
