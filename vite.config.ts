import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  if (mode === 'demo') {
    return {
      base: '/SoDialog/',
      build: {
        outDir: 'dist-pages',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            demo: resolve(__dirname, 'demo.html'),
          },
        },
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
