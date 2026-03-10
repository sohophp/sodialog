import { defineConfig, devices } from '@playwright/test'

const docsBaseUrl = process.env.DOCS_BASE_URL || 'http://127.0.0.1:5173'

export default defineConfig({
  testDir: './tests/docs-smoke',
  fullyParallel: true,
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/docs-smoke', open: 'never' }],
  ],
  use: {
    baseURL: docsBaseUrl,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
