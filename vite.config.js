import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    cors: true,
    // Configuración mejorada para evitar problemas con Mercado Pago
    proxy: {
      // Opcional: Proxy para API local si es necesario
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Configuración para producción
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mercadopago: ['@mercadopago/sdk-react']
        }
      }
    }
  },
  optimizeDeps: {
    // Incluir Mercado Pago en las dependencias pre-optimizadas
    include: ['@mercadopago/sdk-react']
  },
  define: {
    // Variables de entorno globales
    global: 'globalThis',
  }
})