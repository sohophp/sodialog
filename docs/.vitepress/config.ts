import { defineConfig, type DefaultTheme } from 'vitepress'

const SITE_URL = 'https://sodialog.sohophp.app'
const SITE_NAME = 'SoDialog'
const DEFAULT_DESCRIPTION =
  'A lightweight, framework-agnostic dialog library built for modern web applications.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.svg`

type LocaleKey = 'root' | 'zh-TW' | 'en'

type LocaleCopy = {
  lang: string
  ogLocale: string
  description: string
  nav: DefaultTheme.NavItem[]
  sidebar: DefaultTheme.Sidebar
  footerMessage: string
}

const localePrefixes: Record<LocaleKey, string> = {
  root: '',
  'zh-TW': '/zh-TW',
  en: '/en',
}

function withLocale(path: string, locale: LocaleKey): string {
  return `${localePrefixes[locale]}${path}`
}

function createNav(locale: LocaleKey, copy: {
  gettingStarted: string
  components: string
  api: string
  examples: string
  guides: string
  blog: string
}): DefaultTheme.NavItem[] {
  return [
    { text: copy.gettingStarted, link: withLocale('/getting-started', locale) },
    { text: copy.components, link: withLocale('/components/modal', locale) },
    { text: copy.api, link: withLocale('/api/', locale) },
    { text: copy.examples, link: withLocale('/examples/', locale) },
    { text: copy.guides, link: withLocale('/guides/', locale) },
    { text: copy.blog, link: withLocale('/blog/', locale) },
  ]
}

function createSidebar(locale: LocaleKey, copy: {
  start: string
  home: string
  gettingStarted: string
  components: string
  api: string
  apiOverview: string
  guides: string
  guidesOverview: string
  workflow: string
  examples: string
  blog: string
  blogHome: string
  tags: string
  archive: string
}): DefaultTheme.Sidebar {
  return [
    {
      text: copy.start,
      items: [
        { text: copy.home, link: withLocale('/', locale) },
        { text: copy.gettingStarted, link: withLocale('/getting-started', locale) },
      ],
    },
    {
      text: copy.components,
      items: [
        { text: 'Modal', link: withLocale('/components/modal', locale) },
        { text: 'Offcanvas', link: withLocale('/components/offcanvas', locale) },
        { text: 'Toast', link: withLocale('/components/toast', locale) },
        { text: 'Context Menu', link: withLocale('/components/context-menu', locale) },
      ],
    },
    {
      text: copy.api,
      items: [
        { text: copy.apiOverview, link: withLocale('/api/', locale) },
        { text: 'Dialog API', link: withLocale('/api/dialog', locale) },
        { text: 'Toast API', link: withLocale('/api/toast', locale) },
        { text: 'Context Menu API', link: withLocale('/api/context-menu', locale) },
        { text: 'Adapter API', link: withLocale('/api/adapter', locale) },
      ],
    },
    {
      text: copy.guides,
      items: [
        { text: copy.guidesOverview, link: withLocale('/guides/', locale) },
        { text: copy.workflow, link: withLocale('/guides/workflow', locale) },
        { text: 'Adapter Guidelines', link: withLocale('/guides/adapter-guidelines', locale) },
        { text: 'Migration Guide', link: withLocale('/guides/migration-guide', locale) },
        { text: 'Troubleshooting', link: withLocale('/guides/troubleshooting', locale) },
        { text: 'Themes', link: withLocale('/guides/themes', locale) },
        { text: 'FAQ', link: withLocale('/guides/faq', locale) },
        { text: copy.examples, link: withLocale('/examples/', locale) },
      ],
    },
    {
      text: copy.blog,
      items: [
        { text: copy.blogHome, link: withLocale('/blog/', locale) },
        { text: copy.tags, link: withLocale('/blog/tags', locale) },
        { text: copy.archive, link: withLocale('/blog/archive', locale) },
        { text: '2026-06-21：统一尺寸 API', link: withLocale('/blog/2026-06-21-devlog', locale) },
        { text: '2026-03-11：Playwright Smoke 实战', link: withLocale('/blog/2026-03-11-playwright-smoke-devlog', locale) },
        { text: '2026-03-11：docs-smoke-ci 串联', link: withLocale('/blog/2026-03-11-docs-smoke-ci-devlog', locale) },
        { text: '2026-03-11：SEO 元信息基线', link: withLocale('/blog/2026-03-11-seo-metadata-devlog', locale) },
        { text: '2026-03-11：Demo 可交互回归', link: withLocale('/blog/2026-03-11-demo-readiness-devlog', locale) },
        { text: '2026-03-11：Blog 上线', link: withLocale('/blog/2026-03-11-devlog', locale) },
        { text: '2026-03-10：Context Menu 补记', link: withLocale('/blog/2026-03-10-devlog', locale) },
        { text: '2026-03-09：Toast 与发布补记', link: withLocale('/blog/2026-03-09-devlog', locale) },
      ],
    },
  ]
}

const localeCopy: Record<LocaleKey, LocaleCopy> = {
  root: {
    lang: 'zh-CN',
    ogLocale: 'zh_CN',
    description: DEFAULT_DESCRIPTION,
    nav: createNav('root', {
      gettingStarted: '快速开始',
      components: '组件指南',
      api: 'API 参考',
      examples: '示例中心',
      guides: '指南',
      blog: '开发日志',
    }),
    sidebar: createSidebar('root', {
      start: '开始使用',
      home: '首页',
      gettingStarted: '快速开始',
      components: '组件指南',
      api: 'API 参考',
      apiOverview: 'API 总览',
      guides: '指南',
      guidesOverview: '指南总览',
      workflow: '开发与发布流程',
      examples: '示例中心',
      blog: '开发日志',
      blogHome: '日志首页',
      tags: '标签总览',
      archive: '月度归档',
    }),
    footerMessage: 'Released under the MIT License.',
  },
  'zh-TW': {
    lang: 'zh-Hant',
    ogLocale: 'zh_TW',
    description: '面向現代 Web 應用的輕量、框架無關 Dialog 函式庫。',
    nav: createNav('zh-TW', {
      gettingStarted: '快速開始',
      components: '元件指南',
      api: 'API 參考',
      examples: '範例中心',
      guides: '指南',
      blog: '開發日誌',
    }),
    sidebar: createSidebar('zh-TW', {
      start: '開始使用',
      home: '首頁',
      gettingStarted: '快速開始',
      components: '元件指南',
      api: 'API 參考',
      apiOverview: 'API 總覽',
      guides: '指南',
      guidesOverview: '指南總覽',
      workflow: '開發與發布流程',
      examples: '範例中心',
      blog: '開發日誌',
      blogHome: '日誌首頁',
      tags: '標籤總覽',
      archive: '月度歸檔',
    }),
    footerMessage: 'Released under the MIT License.',
  },
  en: {
    lang: 'en-US',
    ogLocale: 'en_US',
    description: DEFAULT_DESCRIPTION,
    nav: createNav('en', {
      gettingStarted: 'Quick Start',
      components: 'Components',
      api: 'API Reference',
      examples: 'Examples',
      guides: 'Guides',
      blog: 'Dev Log',
    }),
    sidebar: createSidebar('en', {
      start: 'Getting Started',
      home: 'Home',
      gettingStarted: 'Quick Start',
      components: 'Components',
      api: 'API Reference',
      apiOverview: 'API Overview',
      guides: 'Guides',
      guidesOverview: 'Guides Overview',
      workflow: 'Development Workflow',
      examples: 'Examples',
      blog: 'Dev Log',
      blogHome: 'Dev Log Home',
      tags: 'Tags',
      archive: 'Archive',
    }),
    footerMessage: 'Released under the MIT License.',
  },
}

function getLocaleFromPath(relativePath: string): LocaleKey {
  if (relativePath.startsWith('zh-TW/')) return 'zh-TW'
  if (relativePath.startsWith('en/')) return 'en'
  return 'root'
}

function toCanonicalPath(relativePath: string): string {
  if (!relativePath || relativePath === 'index.md') return '/'
  const path = relativePath.replace(/\.md$/, '')
  if (path.endsWith('/index')) return `/${path.slice(0, -'/index'.length)}/`
  return `/${path}`
}

function createThemeConfig(locale: LocaleKey): DefaultTheme.Config {
  const copy = localeCopy[locale]

  return {
    logo: '/logo.svg',
    nav: copy.nav,
    sidebar: copy.sidebar,
    search: {
      provider: 'local',
    },
    footer: {
      message: copy.footerMessage,
      copyright: 'Copyright (c) 2026 SoDialog',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/sohophp/sodialog' }],
  }
}

export default defineConfig({
  lang: localeCopy.root.lang,
  title: SITE_NAME,
  description: localeCopy.root.description,
  base: '/',
  cleanUrls: true,
  srcDir: '.',
  locales: {
    root: {
      label: '简体中文',
      lang: localeCopy.root.lang,
      link: '/',
    },
    'zh-TW': {
      label: '繁體中文',
      lang: localeCopy['zh-TW'].lang,
      link: '/zh-TW/',
      description: localeCopy['zh-TW'].description,
      themeConfig: createThemeConfig('zh-TW'),
    },
    en: {
      label: 'English',
      lang: localeCopy.en.lang,
      link: '/en/',
      description: localeCopy.en.description,
      themeConfig: createThemeConfig('en'),
    },
  },
  sitemap: {
    hostname: `${SITE_URL}/`,
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0a0d12' }],
    ['meta', { name: 'author', content: 'SoDialog' }],
    ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:image', content: DEFAULT_OG_IMAGE }],
    ['meta', { property: 'og:image:alt', content: 'SoDialog Logo' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: DEFAULT_OG_IMAGE }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  transformHead: ({ pageData }) => {
    const locale = getLocaleFromPath(pageData.relativePath)
    const localeMeta = localeCopy[locale]
    const canonicalPath = toCanonicalPath(pageData.relativePath)
    const canonicalUrl = `${SITE_URL}${canonicalPath}`
    const description =
      (typeof pageData.frontmatter.description === 'string' && pageData.frontmatter.description) ||
      pageData.description ||
      localeMeta.description
    const title = pageData.title ? `${pageData.title} | ${SITE_NAME}` : SITE_NAME
    const isHome = canonicalPath === '/' || canonicalPath === '/zh-TW/' || canonicalPath === '/en/'

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': isHome ? 'WebSite' : 'TechArticle',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: localeMeta.lang,
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
      ['meta', { property: 'og:locale', content: localeMeta.ogLocale }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)],
    ]
  },
  lastUpdated: true,
  themeConfig: createThemeConfig('root'),
})
