import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const packageVersion = String(packageJson.version ?? '').trim()

function normalizeTag(rawTag) {
  return String(rawTag ?? '').trim().replace(/^v/, '')
}

function getHeadTag() {
  try {
    const output = execSync('git tag --points-at HEAD', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    const firstTag = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean)

    return firstTag ?? ''
  } catch {
    return ''
  }
}

const rawTagVersion = process.argv[2] || process.env.TAG_VERSION || process.env.GITHUB_REF_NAME || getHeadTag()

if (!rawTagVersion) {
  console.error('[release-check] Missing tag version input.')
  console.error('[release-check] Pass one via: TAG_VERSION=vX.Y.Z npm run release:check')
  console.error('[release-check] Or run it on a tagged commit (script will read current HEAD tag).')
  process.exit(1)
}

const normalizedTagVersion = normalizeTag(rawTagVersion)

if (!packageVersion) {
  console.error('[release-check] package.json version is empty.')
  process.exit(1)
}

if (normalizedTagVersion !== packageVersion) {
  console.error(
    `[release-check] Tag version (${normalizedTagVersion}) does not match package.json version (${packageVersion}).`
  )
  process.exit(1)
}

console.log(`[release-check] OK: v${packageVersion} matches package.json.`)
