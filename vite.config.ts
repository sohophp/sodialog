import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  if (mode === 'demo') {
    return {
      base: '/sodialog/',
      build: {
        outDir: 'dist-pages',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            demo: resolve(__dirname, 'demo.html'),
            examples: resolve(__dirname, 'examples.html'),
            api: resolve(__dirname, 'api.html'),
            modal: resolve(__dirname, 'modal.html'),
            offcanvas: resolve(__dirname, 'offcanvas.html'),
            toast: resolve(__dirname, 'toast.html'),
            workflow: resolve(__dirname, 'workflow.html'),
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
