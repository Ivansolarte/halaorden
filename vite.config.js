import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // Esto permite que la aplicación escuche en todas las interfaces de red
    port: 5173,      // Puedes usar el puerto 5173 o cambiarlo si lo prefieres
    historyApiFallback: true,
  },
  base: "https://ivansolarte.github.io/your_store_frontend"
})
