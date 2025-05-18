import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
    react(),
  ],
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    include: [
      '@tbg/ui',
      '@tbg/util',
    ],
  },
})
