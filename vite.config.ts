import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  if (mode === 'demo') {
    return {
      base: '/SoDialog/',
      build: {
        outDir: 'dist-pages',
      },
    }
  }

  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/lib.ts'),
        name: 'SoDialog',
        fileName: (format) => `sodialog.${format}.js`,
        cssFileName: 'sodialog',
      },
    },
  }
})
