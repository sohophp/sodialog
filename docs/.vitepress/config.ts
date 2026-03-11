import { defineConfig } from 'vitepress'

const SITE_URL = 'https://sohophp.github.io/sodialog'
const SITE_NAME = 'SoDialog'
const DEFAULT_DESCRIPTION =
  'SoDialog 文档站：覆盖 Modal、Offcanvas、Toast、Context Menu，提供 API 参考、可运行示例与工作流指南。'
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.svg`

function toCanonicalPath(relativePath: string): string {
  if (!relativePath || relativePath === 'index.md') return '/'
  return `/${relativePath.replace(/\.md$/, '.html')}`
}

export default defineConfig({
  lang: 'zh-CN',
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  base: '/sodialog/',
  cleanUrls: true,
  srcDir: '.',
  sitemap: {
    hostname: `${SITE_URL}/`,
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0d9488' }],
    ['meta', { name: 'author', content: 'SoDialog' }],
    ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: DEFAULT_OG_IMAGE }],
    ['meta', { property: 'og:image:alt', content: 'SoDialog Logo' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: DEFAULT_OG_IMAGE }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  transformHead: ({ pageData }) => {
    const canonicalPath = toCanonicalPath(pageData.relativePath)
    const canonicalUrl = `${SITE_URL}${canonicalPath}`
    const description =
      (typeof pageData.frontmatter.description === 'string' && pageData.frontmatter.description) ||
      pageData.description ||
      DEFAULT_DESCRIPTION
    const title = pageData.title ? `${pageData.title} | ${SITE_NAME}` : SITE_NAME
    const isHome = canonicalPath === '/'

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': isHome ? 'WebSite' : 'TechArticle',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: 'zh-CN',
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: DEFAULT_OG_IMAGE,
        },
      },
    }

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)],
    ]
  },
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '快速开始', link: '/getting-started' },
      { text: '组件指南', link: '/components/modal' },
      { text: 'API 参考', link: '/api/' },
      { text: '示例中心', link: '/examples/' },
      { text: '指南', link: '/guides/' },
      { text: '开发日志', link: '/blog/' },
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '首页', link: '/' },
          { text: '快速开始', link: '/getting-started' },
        ],
      },
      {
        text: '组件指南',
        items: [
          { text: 'Modal', link: '/components/modal' },
          { text: 'Offcanvas', link: '/components/offcanvas' },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Context Menu', link: '/components/context-menu' },
        ],
      },
      {
        text: 'API 参考',
        items: [
          { text: 'API 总览', link: '/api/' },
          { text: 'Dialog API', link: '/api/dialog' },
          { text: 'Toast API', link: '/api/toast' },
          { text: 'Context Menu API', link: '/api/context-menu' },
          { text: 'Adapter API', link: '/api/adapter' },
        ],
      },
      {
        text: '指南',
        items: [
          { text: '指南总览', link: '/guides/' },
          { text: '开发与发布流程', link: '/guides/workflow' },
          { text: 'Adapter Guidelines', link: '/guides/adapter-guidelines' },
          { text: 'Migration Guide', link: '/guides/migration-guide' },
          { text: 'Troubleshooting', link: '/guides/troubleshooting' },
          { text: '示例中心', link: '/examples/' },
        ],
      },
      {
        text: '开发日志',
        items: [
          { text: '日志首页', link: '/blog/' },
          { text: '标签总览', link: '/blog/tags' },
          { text: '月度归档', link: '/blog/archive' },
          { text: '2026-03-11：Playwright Smoke 实战', link: '/blog/2026-03-11-playwright-smoke-devlog' },
          { text: '2026-03-11：docs-smoke-ci 串联', link: '/blog/2026-03-11-docs-smoke-ci-devlog' },
          { text: '2026-03-11：SEO 元信息基线', link: '/blog/2026-03-11-seo-metadata-devlog' },
          { text: '2026-03-11：Demo 可交互回归', link: '/blog/2026-03-11-demo-readiness-devlog' },
          { text: '2026-03-11：Blog 上线', link: '/blog/2026-03-11-devlog' },
          { text: '2026-03-10：Context Menu 补记', link: '/blog/2026-03-10-devlog' },
          { text: '2026-03-09：Toast 与发布补记', link: '/blog/2026-03-09-devlog' },
        ],
      },
    ],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright (c) 2026 SoDialog',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/sohophp/sodialog' }],
  },
})
