import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const destination = resolve(root, 'docs/public/components/runtime')

await mkdir(destination, { recursive: true })
await Promise.all([
  copyFile(resolve(root, 'dist/sodialog.es.js'), resolve(destination, 'sodialog.es.js')),
  copyFile(resolve(root, 'dist/sodialog.css'), resolve(destination, 'sodialog.css')),
])
