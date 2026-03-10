import { spawn } from 'node:child_process'
import http from 'node:http'

const HOST = '127.0.0.1'
const PORT = Number(process.env.DOCS_SMOKE_PORT || 5174)
const BASE_URL = `http://${HOST}:${PORT}`

function formatMs(ms) {
  if (ms < 1_000) return `${ms}ms`
  return `${(ms / 1_000).toFixed(2)}s`
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'null'}`))
      }
    })
  })
}

function waitForServer(url, timeoutMs = 120_000) {
  const startedAt = Date.now()

  return new Promise((resolve, reject) => {
    const probe = () => {
      const req = http.get(url, (res) => {
        res.resume()
        if ((res.statusCode ?? 500) < 500) {
          resolve()
          return
        }
        retry()
      })

      req.on('error', retry)
      req.setTimeout(2_000, () => {
        req.destroy(new Error('timeout'))
      })
    }

    const retry = () => {
      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for docs server: ${url}`))
        return
      }
      globalThis.setTimeout(probe, 500)
    }

    probe()
  })
}

function killProcessTree(pid) {
  if (!pid) return Promise.resolve()

  if (process.platform === 'win32') {
    return run('taskkill', ['/pid', String(pid), '/t', '/f']).catch(() => {})
  }

  try {
    process.kill(-pid, 'SIGTERM')
  } catch {
    // Ignore best-effort shutdown failures.
  }
  return Promise.resolve()
}

async function main() {
  const totalStart = Date.now()

  const buildStart = Date.now()
  console.log('[docs-smoke-ci] Building docs...')
  await run('npm', ['run', 'docs:build'])
  console.log(`[docs-smoke-ci] Build completed in ${formatMs(Date.now() - buildStart)}`)

  console.log(`[docs-smoke-ci] Starting docs preview server at ${BASE_URL} ...`)
  const server = spawn('npx', ['vitepress', 'preview', 'docs', '--host', HOST, '--port', String(PORT)], {
    stdio: 'inherit',
    shell: true,
    detached: process.platform !== 'win32',
  })

  try {
    const waitStart = Date.now()
    await waitForServer(BASE_URL)
    console.log(`[docs-smoke-ci] Server ready in ${formatMs(Date.now() - waitStart)}`)
    console.log('[docs-smoke-ci] Preview server is ready. Running Playwright smoke tests...')

    const smokeStart = Date.now()
    await run('npx', ['playwright', 'test', '-c', 'playwright.docs.config.ts'], {
      env: {
        ...process.env,
        DOCS_BASE_URL: BASE_URL,
      },
    })
    console.log(`[docs-smoke-ci] Smoke tests completed in ${formatMs(Date.now() - smokeStart)}`)
  } finally {
    console.log('[docs-smoke-ci] Stopping docs preview server...')
    await killProcessTree(server.pid)
  }

  console.log(`[docs-smoke-ci] Total elapsed: ${formatMs(Date.now() - totalStart)}`)
}

main().catch((error) => {
  console.error('[docs-smoke-ci] Failed:', error.message)
  process.exit(1)
})
