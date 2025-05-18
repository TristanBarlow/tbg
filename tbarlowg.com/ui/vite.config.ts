import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    checker({
      // e.g. use TypeScript check
      typescript: true,
      eslint: {
        lintCommand: 'lint',
        useFlatConfig: true,
      },
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
