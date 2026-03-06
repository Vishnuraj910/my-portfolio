import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    tanstackStart({
      server: {
        build: {
          staticNodeEnv: true,
        },
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/lib': resolve(__dirname, 'src/lib'),
      '@/content': resolve(__dirname, 'src/content'),
      '@/messages': resolve(__dirname, 'src/messages'),
      '@/components': resolve(__dirname, 'src/components'),
    },
  },
})
