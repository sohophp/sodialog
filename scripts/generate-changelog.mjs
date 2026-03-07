import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

function run(command) {
  return execSync(command, { encoding: 'utf8' }).trim()
}

function runSafe(command) {
  try {
    return run(command)
  } catch {
    return ''
  }
}

function normalizeRepoUrl(rawUrl) {
  if (!rawUrl) {
    return ''
  }

  return rawUrl
    .replace(/^git\+/, '')
    .replace(/\.git$/, '')
    .replace(/^git@github.com:/, 'https://github.com/')
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
const repositoryUrl = normalizeRepoUrl(
  typeof packageJson.repository === 'string' ? packageJson.repository : packageJson.repository?.url,
)

const tagsOutput = runSafe('git tag --list "v*.*.*" --sort=version:refname')
const tags = tagsOutput
  .split(/\r?\n/)
  .map((item) => item.trim())
  .filter(Boolean)

if (tags.length === 0) {
  throw new Error('No version tags found. Expected tags like v0.1.0')
}

const entries = []

for (let index = tags.length - 1; index >= 0; index -= 1) {
  const tag = tags[index]
  const previousTag = index > 0 ? tags[index - 1] : null
  const range = previousTag ? `${previousTag}..${tag}` : tag

  const commitOutput = runSafe(`git log --no-merges --pretty=format:%s ${range}`)
  const commits = commitOutput
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^release:\s*v\d+/i.test(line))
    .filter((line) => !/^v\d+\.\d+\.\d+$/i.test(line))
    .filter((line) => !/^npm-publish$/i.test(line))

  const uniqueCommits = Array.from(new Set(commits))
  const date = runSafe(`git log -1 --format=%cs ${tag}`) || new Date().toISOString().slice(0, 10)

  entries.push({
    tag,
    version: tag.slice(1),
    date,
    commits: uniqueCommits,
  })
}

const changelogLines = [
  '# Changelog',
  '',
  'All notable changes to this project will be documented in this file.',
  '',
  'The format is inspired by Keep a Changelog and generated from git tags/commits.',
  '',
  '## [Unreleased]',
  '',
]

for (const entry of entries) {
  changelogLines.push(`## [${entry.version}] - ${entry.date}`)
  changelogLines.push('')
  changelogLines.push('### Commits')

  if (entry.commits.length === 0) {
    changelogLines.push('- No user-facing commit messages recorded in this range.')
  } else {
    for (const commit of entry.commits) {
      changelogLines.push(`- ${commit}`)
    }
  }

  changelogLines.push('')
}

if (repositoryUrl) {
  const latestTag = entries[0]?.tag
  if (latestTag) {
    changelogLines.push(`[Unreleased]: ${repositoryUrl}/compare/${latestTag}...HEAD`)
  }

  for (const entry of entries) {
    changelogLines.push(`[${entry.version}]: ${repositoryUrl}/releases/tag/${entry.tag}`)
  }
}

changelogLines.push('')

writeFileSync('CHANGELOG.md', changelogLines.join('\n'))
