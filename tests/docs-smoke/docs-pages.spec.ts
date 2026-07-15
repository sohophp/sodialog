import { expect, test } from '@playwright/test'

type SmokeCase = {
  path: string
  expected: string
  selector?: string
}

const cases: SmokeCase[] = [
  { path: '/', expected: 'SoDialog' },
  { path: '/getting-started', expected: '快速开始', selector: 'h1' },
  { path: '/zh-TW/', expected: 'SoDialog' },
  { path: '/zh-TW/getting-started', expected: '快速开始', selector: 'h1' },
  { path: '/en/', expected: 'SoDialog' },
  { path: '/en/getting-started', expected: '快速开始', selector: 'h1' },
  { path: '/components/modal', expected: 'Modal', selector: 'h1' },
  { path: '/components/offcanvas', expected: 'Offcanvas', selector: 'h1' },
  { path: '/components/toast', expected: 'Toast', selector: 'h1' },
  { path: '/components/context-menu', expected: 'Context Menu', selector: 'h1' },
  { path: '/examples/', expected: '示例', selector: 'h1' },
  { path: '/examples/offcanvas', expected: 'Offcanvas', selector: 'h1' },
  { path: '/guides/themes', expected: 'Themes', selector: 'h1' },
  { path: '/guides/faq', expected: 'FAQ', selector: 'h1' },
  { path: '/blog/', expected: '更新与开发笔记', selector: 'h1' },
  { path: '/blog/2026-03-11-devlog', expected: '2026-03-11 开发日志', selector: 'h1' },
  { path: '/blog/2026-06-23-devlog', expected: '2026-06-23 开发日志', selector: 'h1' },
  { path: '/blog/2026-06-23-docs-ia-ux-devlog', expected: '文档站从漂亮项目页升级到组件库工作台', selector: 'h1' },
  { path: '/changelog/', expected: '更新日志', selector: 'h1' },
  { path: '/versions/', expected: '版本', selector: 'h1' },
  { path: '/en/changelog/', expected: 'Changelog', selector: 'h1' },
  { path: '/en/changelog/v0.3.x', expected: 'SoDialog v0.3.10', selector: 'h1' },
  { path: '/en/versions/', expected: 'Versions', selector: 'h1' },
  { path: '/en/installation', expected: 'Installation', selector: 'h1' },
  { path: '/en/cdn', expected: 'CDN', selector: 'h1' },
  { path: '/en/frameworks', expected: 'Frameworks', selector: 'h1' },
  { path: '/en/themes', expected: 'Themes', selector: 'h1' },
  { path: '/en/migration', expected: 'Migration', selector: 'h1' },
  { path: '/en/troubleshooting', expected: 'Troubleshooting', selector: 'h1' },
  { path: '/en/faq', expected: 'FAQ', selector: 'h1' },
  { path: '/en/components/', expected: 'Components', selector: 'h1' },
  { path: '/en/examples/modal-lab', expected: 'Modal Lab', selector: 'h1' },
  { path: '/zh-TW/changelog/', expected: '更新日誌', selector: 'h1' },
  { path: '/zh-TW/changelog/v0.3.x', expected: 'SoDialog v0.3.10', selector: 'h1' },
  { path: '/zh-TW/versions/', expected: '版本', selector: 'h1' },
  { path: '/zh-TW/installation', expected: '安裝', selector: 'h1' },
  { path: '/zh-TW/cdn', expected: 'CDN 使用', selector: 'h1' },
  { path: '/zh-TW/frameworks', expected: '框架整合', selector: 'h1' },
  { path: '/zh-TW/themes', expected: '主題與樣式', selector: 'h1' },
  { path: '/zh-TW/migration', expected: 'Migration', selector: 'h1' },
  { path: '/zh-TW/troubleshooting', expected: 'Troubleshooting', selector: 'h1' },
  { path: '/zh-TW/faq', expected: 'FAQ', selector: 'h1' },
  { path: '/zh-TW/components/', expected: '元件', selector: 'h1' },
  { path: '/zh-TW/examples/modal-lab', expected: 'Modal Lab', selector: 'h1' },
  { path: '/development-log/', expected: '更新与开发笔记', selector: 'h1' },
  { path: '/devlog/', expected: '更新与开发笔记', selector: 'h1' },
  { path: '/legacy-demo/offcanvas.html', expected: 'Offcanvas 位置演示', selector: 'h2' },
]

for (const item of cases) {
  test(`docs page loads: ${item.path}`, async ({ page }) => {
    const response = await page.goto(item.path, { waitUntil: 'domcontentloaded' })
    expect(response?.ok()).toBeTruthy()

    const locator = page.locator(item.selector ?? 'body')
    await expect(locator).toContainText(item.expected)
  })
}

test('homepage exposes core SEO metadata', async ({ page }) => {
  const response = await page.goto('/', { waitUntil: 'domcontentloaded' })
  expect(response?.ok()).toBeTruthy()

  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://sodialog.sohophp.app/')
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
  await expect(page.locator('meta[property="og:description"]')).toHaveCount(1)
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://sodialog.sohophp.app/')
  await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1)
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
})

test('localized pages expose locale-aware metadata and navigation', async ({ page }) => {
  const locales = [
    { path: '/', canonical: 'https://sodialog.sohophp.app/', lang: 'zh-CN', ogLocale: 'zh_CN' },
    { path: '/zh-TW/', canonical: 'https://sodialog.sohophp.app/zh-TW/', lang: 'zh-Hant', ogLocale: 'zh_TW' },
    { path: '/en/', canonical: 'https://sodialog.sohophp.app/en/', lang: 'en-US', ogLocale: 'en_US' },
  ]

  for (const locale of locales) {
    await page.goto(locale.path, { waitUntil: 'domcontentloaded' })

    await expect(page.locator('html')).toHaveAttribute('lang', locale.lang)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', locale.canonical)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', locale.canonical)
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', locale.ogLocale)
  }

  await page.goto('/zh-TW/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('link', { name: /快速開始/ }).first()).toHaveAttribute('href', '/zh-TW/getting-started')

  await page.goto('/en/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('link', { name: /Quick Start/ }).first()).toHaveAttribute('href', '/en/getting-started')
})

test('homepage exposes product sections and interactive code examples', async ({ page }) => {
  const response = await page.goto('/', { waitUntil: 'domcontentloaded' })
  expect(response?.ok()).toBeTruthy()

  await expect(page.getByRole('heading', { name: 'Modern Dialogs for Every Web Project' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Everything a dialog library should be. Nothing it shouldn\'t.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Simple API. Serious capability.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Choose less complexity.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'One library. Every modern stack.' })).toBeVisible()

  const loadingTab = page.getByRole('tab', { name: 'Loading' })
  await loadingTab.click()
  await expect(loadingTab).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel')).toContainText('Uploading assets')
})

test('clean URL canonical and crawler files use the production domain', async ({ page }) => {
  await page.goto('/getting-started', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://sodialog.sohophp.app/getting-started',
  )
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://sodialog.sohophp.app/getting-started',
  )

  const robotsResponse = await page.request.get('/robots.txt')
  expect(robotsResponse.ok()).toBeTruthy()
  expect(await robotsResponse.text()).toContain('Sitemap: https://sodialog.sohophp.app/sitemap.xml')
})

test('utility sections live in footer without mixing into top nav or API sidebar', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const topNavText = (await page.locator('.VPNavBarMenuLink').allTextContents()).join(' ')
  expect(topNavText).not.toContain('开发笔记')
  expect(topNavText).not.toContain('更新日志')
  expect(topNavText).not.toContain('版本')

  await page.goto('/api/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('.VPSidebar')).not.toContainText('开发笔记')
  await expect(page.locator('.site-footer-links')).toContainText('开发笔记')
  await expect(page.locator('.site-footer-links')).toContainText('更新日志')
  await expect(page.locator('.site-footer-links')).toContainText('版本')

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.locator('.VPNavBarHamburger').click()
  await expect(page.locator('#VPNavScreen').getByRole('link', { name: '开发笔记' })).toHaveCount(0)
})

test('blog images are published and rendered', async ({ page }) => {
  const imagePaths = [
    '/blog/devlog-2026-03-09.svg',
    '/blog/devlog-2026-03-10.svg',
    '/blog/devlog-2026-03-11.svg',
    '/blog/photos/docs-workflow.jpg',
    '/blog/photos/interaction-debug.jpg',
    '/blog/photos/playwright-workstation.jpg',
    '/blog/photos/ci-task-board.jpg',
    '/blog/photos/release-check.jpg',
  ]

  for (const imagePath of imagePaths) {
    const response = await page.request.get(imagePath)
    expect(response.ok(), `${imagePath} should be published`).toBeTruthy()
  }

  await page.goto('/blog/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('.blog-card__visual')).toHaveCount(10)
  await expect(page.locator('.blog-card__visual').first()).toHaveJSProperty('complete', true)

  await page.goto('/en/blog/2026-03-11-devlog', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('img[src="/blog/devlog-2026-03-11.svg"]')).toBeVisible()
})

test('homepage has no horizontal overflow across responsive viewports', async ({ page }) => {
  const viewports = [
    { width: 390, height: 844 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 },
  ]

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    await expect(page.getByRole('heading', { name: 'Modern Dialogs for Every Web Project' })).toBeVisible()
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))
    expect(dimensions.scrollWidth, `horizontal overflow at ${viewport.width}px`).toBe(dimensions.clientWidth)
  }
})

test('getting-started modal demo is ready and can open', async ({ page }) => {
  const response = await page.goto('/getting-started', { waitUntil: 'domcontentloaded' })
  expect(response?.ok()).toBeTruthy()

  const previewFrame = page
    .frameLocator('iframe[src="/components/modal-basic.html"]')
    .first()

  const html = await page.request.get('/components/modal-basic.html')
  expect(await html.text()).toContain('./sodialog-loader.js')

  const status = previewFrame.locator('#status')
  await expect(status).not.toHaveText('正在加载示例脚本...', { timeout: 15_000 })
  const statusText = await status.textContent()
  if (statusText !== '已就绪，点击按钮查看效果。') {
    expect(statusText).toContain('加载失败：无法访问示例依赖')
    return
  }

  const openButton = previewFrame.locator('#open')
  await expect(openButton).toBeEnabled()
  await openButton.click()

  await expect(previewFrame.locator('dialog[open]')).toBeVisible()
})
