import { expect, test } from '@playwright/test'

type SmokeCase = {
  path: string
  expected: string
  selector?: string
}

const cases: SmokeCase[] = [
  { path: '/', expected: 'SoDialog' },
  { path: '/getting-started', expected: '快速开始', selector: 'h1' },
  { path: '/components/modal', expected: 'Modal', selector: 'h1' },
  { path: '/components/offcanvas', expected: 'Offcanvas', selector: 'h1' },
  { path: '/components/toast', expected: 'Toast', selector: 'h1' },
  { path: '/components/context-menu', expected: 'Context Menu', selector: 'h1' },
  { path: '/examples/', expected: '示例中心', selector: 'h1' },
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
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
  await expect(page.locator('meta[property="og:description"]')).toHaveCount(1)
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1)
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
})

test('getting-started modal demo is ready and can open', async ({ page }) => {
  const response = await page.goto('/getting-started', { waitUntil: 'domcontentloaded' })
  expect(response?.ok()).toBeTruthy()

  const previewFrame = page
    .frameLocator('iframe[src="/components/modal-basic.html"]')
    .first()

  const status = previewFrame.locator('#status')
  await expect(status).not.toHaveText('正在加载示例脚本...', { timeout: 15_000 })
  await expect(status).toHaveText('已就绪，点击按钮查看效果。', { timeout: 15_000 })

  const openButton = previewFrame.locator('#open')
  await expect(openButton).toBeEnabled()
  await openButton.click()

  await expect(previewFrame.locator('dialog[open]')).toBeVisible()
})
