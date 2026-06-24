/* global document, window, URLSearchParams */

const defaultVersion = '0.3.7'

const versionPattern = /^(latest|\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)$/

export function getSoDialogVersion() {
  const params = new URLSearchParams(window.location.search)
  const requestedVersion =
    params.get('sodialogVersion') ||
    params.get('cdnVersion') ||
    params.get('version') ||
    defaultVersion

  return versionPattern.test(requestedVersion) ? requestedVersion : defaultVersion
}

export function getSoDialogCdnUrls() {
  const version = getSoDialogVersion()
  const packagePath = `sodialog@${version}/dist`

  return {
    version,
    css: `https://cdn.jsdelivr.net/npm/${packagePath}/sodialog.css`,
    cssFallback: `https://unpkg.com/${packagePath}/sodialog.css`,
    modules: [
      `https://cdn.jsdelivr.net/npm/${packagePath}/sodialog.es.js`,
      `https://unpkg.com/${packagePath}/sodialog.es.js`,
    ],
  }
}

export function loadSoDialogStyle() {
  const { css, cssFallback } = getSoDialogCdnUrls()
  const existing = document.querySelector('link[data-sodialog-style]')

  if (existing) return existing

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = css
  link.dataset.sodialogStyle = 'true'
  link.addEventListener('error', () => {
    if (link.href !== cssFallback) {
      link.href = cssFallback
    }
  })
  document.head.append(link)

  return link
}

export async function loadSoDialog() {
  loadSoDialogStyle()

  for (const url of getSoDialogCdnUrls().modules) {
    try {
      return await import(url)
    } catch {
      // Try next CDN endpoint.
    }
  }

  return null
}
