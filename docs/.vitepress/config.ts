import { defineConfig, type DefaultTheme } from 'vitepress'
import { createRequire } from 'node:module'

const SITE_URL = 'https://sodialog.sohophp.app'
const SITE_NAME = 'SoDialog'
const DEFAULT_DESCRIPTION =
  'A lightweight, framework-agnostic dialog library built for modern web applications.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.svg`
const require = createRequire(import.meta.url)
const packageJson = require('../../package.json') as { version: string }
const DOC_VERSION = packageJson.version

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
  docs: string
  components: string
  api: string
  examples: string
}): DefaultTheme.NavItem[] {
  return [
    { text: copy.docs, link: withLocale('/getting-started', locale), activeMatch: `^${withLocale('/(getting-started|installation|cdn|guides|frameworks|themes|migration|troubleshooting|faq)', locale)}` },
    { text: copy.components, link: withLocale('/components/', locale), activeMatch: `^${withLocale('/components/', locale)}` },
    { text: copy.api, link: withLocale('/api/', locale), activeMatch: `^${withLocale('/api/', locale)}` },
    { text: copy.examples, link: withLocale('/examples/', locale), activeMatch: `^${withLocale('/examples/', locale)}` },
  ]
}

function createSidebar(locale: LocaleKey, copy: {
  docs: string
  gettingStarted: string
  installation: string
  cdn: string
  concepts: string
  components: string
  componentsOverview: string
  otherComponents: string
  api: string
  apiOverview: string
  types: string
  globalConfig: string
  guides: string
  guidesOverview: string
  frameworks: string
  themes: string
  migration: string
  troubleshooting: string
  faq: string
  workflow: string
  examples: string
  examplesOverview: string
  runnableExamples: string
  labs: string
  legacyDemo: string
  changelog: string
  latest: string
  versions: string
  notes: string
  notesHome: string
  tags: string
  archive: string
}): DefaultTheme.Sidebar {
  const docsSidebar = [
    {
      text: copy.docs,
      items: [
        { text: copy.gettingStarted, link: withLocale('/getting-started', locale) },
        { text: copy.installation, link: withLocale('/installation', locale) },
        { text: copy.cdn, link: withLocale('/cdn', locale) },
      ],
    },
    {
      text: copy.guides,
      items: [
        { text: copy.guidesOverview, link: withLocale('/guides/', locale) },
        { text: copy.frameworks, link: withLocale('/frameworks', locale) },
        { text: copy.themes, link: withLocale('/themes', locale) },
        { text: copy.migration, link: withLocale('/migration', locale) },
        { text: copy.troubleshooting, link: withLocale('/troubleshooting', locale) },
        { text: copy.faq, link: withLocale('/faq', locale) },
        { text: copy.workflow, link: withLocale('/guides/workflow', locale) },
        { text: 'Adapter Guidelines', link: withLocale('/guides/adapter-guidelines', locale) },
      ],
    },
  ]
  const componentSidebar = [
    {
      text: copy.components,
      items: [
        { text: copy.componentsOverview, link: withLocale('/components/', locale) },
        { text: 'Modal', link: withLocale('/components/modal', locale) },
        { text: 'Offcanvas', link: withLocale('/components/offcanvas', locale) },
        { text: 'Toast', link: withLocale('/components/toast', locale) },
        { text: 'Context Menu', link: withLocale('/components/context-menu', locale) },
        { text: copy.otherComponents, link: withLocale('/components/#other-components', locale) },
      ],
    },
  ]
  const apiSidebar = [
    {
      text: copy.api,
      items: [
        { text: copy.apiOverview, link: withLocale('/api/', locale) },
        { text: 'Dialog API', link: withLocale('/api/dialog', locale) },
        { text: 'Toast API', link: withLocale('/api/toast', locale) },
        { text: 'Context Menu API', link: withLocale('/api/context-menu', locale) },
        { text: 'Adapter API', link: withLocale('/api/adapter', locale) },
        { text: copy.types, link: withLocale('/api/#types', locale) },
        { text: copy.globalConfig, link: withLocale('/api/#global-config', locale) },
      ],
    },
  ]
  const examplesSidebar = [
    {
      text: copy.examples,
      items: [
        { text: copy.examplesOverview, link: withLocale('/examples/', locale) },
        { text: 'Modal Basic', link: withLocale('/examples/modal-basic', locale) },
        { text: 'Modal Promise', link: withLocale('/examples/modal-promise', locale) },
        { text: 'Offcanvas', link: withLocale('/examples/offcanvas', locale) },
        { text: 'Toast Basic', link: withLocale('/examples/toast-basic', locale) },
        { text: 'Toast Queue', link: withLocale('/examples/toast-queue', locale) },
        { text: 'Context Menu', link: withLocale('/examples/context-menu', locale) },
        { text: 'Menu to Dialog', link: withLocale('/examples/menu-to-dialog', locale) },
        { text: 'Modal Lab', link: withLocale('/examples/modal-lab', locale) },
        { text: copy.legacyDemo, link: withLocale('/demo', locale) },
      ],
    },
  ]
  const changelogSidebar = [
    {
      text: copy.changelog,
      items: [
        { text: copy.latest, link: withLocale('/changelog/', locale) },
        { text: 'v0.3.x', link: withLocale('/changelog/v0.3.x', locale) },
        { text: 'v0.2.x', link: withLocale('/changelog/v0.2.x', locale) },
        { text: 'v0.1.x', link: withLocale('/changelog/v0.1.x', locale) },
        { text: copy.archive, link: withLocale('/changelog/archive', locale) },
      ],
    },
  ]
  const versionsSidebar = [
    {
      text: copy.versions,
      items: [
        { text: 'Latest stable', link: withLocale('/versions/', locale) },
        { text: 'Historical versions', link: withLocale('/versions/#historical-versions', locale) },
      ],
    },
  ]
  const blogSidebar = [
    {
      text: copy.notes,
      items: [
        { text: copy.notesHome, link: withLocale('/blog/', locale) },
        { text: copy.changelog, link: withLocale('/changelog/', locale) },
        { text: copy.tags, link: withLocale('/blog/tags', locale) },
        { text: copy.archive, link: withLocale('/blog/archive', locale) },
        { text: '2026-06-23：文档 IA 与内页 UX', link: withLocale('/blog/2026-06-23-docs-ia-ux-devlog', locale) },
        { text: '2026-06-23：三语言文档与发布流程', link: withLocale('/blog/2026-06-23-devlog', locale) },
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

  return {
    [withLocale('/getting-started', locale)]: docsSidebar,
    [withLocale('/installation', locale)]: docsSidebar,
    [withLocale('/cdn', locale)]: docsSidebar,
    [withLocale('/components/', locale)]: componentSidebar,
    [withLocale('/api/', locale)]: apiSidebar,
    [withLocale('/examples/', locale)]: examplesSidebar,
    [withLocale('/guides/', locale)]: docsSidebar,
    [withLocale('/frameworks', locale)]: docsSidebar,
    [withLocale('/themes', locale)]: docsSidebar,
    [withLocale('/migration', locale)]: docsSidebar,
    [withLocale('/troubleshooting', locale)]: docsSidebar,
    [withLocale('/faq', locale)]: docsSidebar,
    [withLocale('/changelog/', locale)]: changelogSidebar,
    [withLocale('/versions/', locale)]: versionsSidebar,
    [withLocale('/blog/', locale)]: blogSidebar,
  }
}

const localeCopy: Record<LocaleKey, LocaleCopy> = {
  root: {
    lang: 'zh-CN',
    ogLocale: 'zh_CN',
    description: DEFAULT_DESCRIPTION,
    nav: createNav('root', {
      docs: '文档',
      components: '组件',
      api: 'API 参考',
      examples: '示例',
    }),
    sidebar: createSidebar('root', {
      docs: '文档',
      gettingStarted: '快速开始',
      installation: '安装',
      cdn: 'CDN 使用',
      concepts: '基础概念',
      components: '组件',
      componentsOverview: '组件总览',
      otherComponents: '其它组件',
      api: 'API 参考',
      apiOverview: 'API 总览',
      types: 'Types',
      globalConfig: 'Global Config',
      guides: '指南',
      guidesOverview: '指南总览',
      frameworks: '框架集成',
      themes: '主题与样式',
      migration: 'Migration',
      troubleshooting: 'Troubleshooting',
      faq: 'FAQ',
      workflow: '开发与发布流程',
      examples: '示例',
      examplesOverview: '示例总览',
      runnableExamples: '可运行示例',
      labs: '实验室',
      legacyDemo: '旧版演示',
      changelog: '更新日志',
      latest: 'Latest',
      versions: 'Versions',
      notes: '更新与开发笔记',
      notesHome: '开发笔记',
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
      docs: '文件',
      components: '元件',
      api: 'API 參考',
      examples: '範例',
    }),
    sidebar: createSidebar('zh-TW', {
      docs: '文件',
      gettingStarted: '快速開始',
      installation: '安裝',
      cdn: 'CDN 使用',
      concepts: '基礎概念',
      components: '元件',
      componentsOverview: '元件總覽',
      otherComponents: '其它元件',
      api: 'API 參考',
      apiOverview: 'API 總覽',
      types: 'Types',
      globalConfig: 'Global Config',
      guides: '指南',
      guidesOverview: '指南總覽',
      frameworks: '框架整合',
      themes: '主題與樣式',
      migration: 'Migration',
      troubleshooting: 'Troubleshooting',
      faq: 'FAQ',
      workflow: '開發與發布流程',
      examples: '範例',
      examplesOverview: '範例總覽',
      runnableExamples: '可執行範例',
      labs: '實驗室',
      legacyDemo: '舊版演示',
      changelog: '更新日誌',
      latest: 'Latest',
      versions: '版本',
      notes: '更新與開發筆記',
      notesHome: '開發筆記',
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
      docs: 'Docs',
      components: 'Components',
      api: 'API Reference',
      examples: 'Examples',
    }),
    sidebar: createSidebar('en', {
      docs: 'Docs',
      gettingStarted: 'Quick Start',
      installation: 'Installation',
      cdn: 'CDN',
      concepts: 'Core Concepts',
      components: 'Components',
      componentsOverview: 'Components Overview',
      otherComponents: 'Other Components',
      api: 'API Reference',
      apiOverview: 'API Overview',
      types: 'Types',
      globalConfig: 'Global Config',
      guides: 'Guides',
      guidesOverview: 'Guides Overview',
      frameworks: 'Frameworks',
      themes: 'Themes',
      migration: 'Migration',
      troubleshooting: 'Troubleshooting',
      faq: 'FAQ',
      workflow: 'Development Workflow',
      examples: 'Examples',
      examplesOverview: 'Examples Overview',
      runnableExamples: 'Runnable Examples',
      labs: 'Labs',
      legacyDemo: 'Legacy Demo',
      changelog: 'Changelog',
      latest: 'Latest',
      versions: 'Versions',
      notes: 'Changelog & Notes',
      notesHome: 'Notes',
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
  const docFooter =
    locale === 'en'
      ? { prev: 'Previous page', next: 'Next page' }
      : locale === 'zh-TW'
        ? { prev: '上一頁', next: '下一頁' }
        : { prev: '上一页', next: '下一页' }

  const config: DefaultTheme.Config & { version: string } = {
    logo: '/logo.svg',
    nav: copy.nav,
    sidebar: copy.sidebar,
    docFooter,
    outline: false,
    search: {
      provider: 'local',
    },
    footer: {
      message: copy.footerMessage,
      copyright: 'Copyright (c) 2026 SoDialog',
    },
    version: DOC_VERSION,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sohophp/sodialog' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/sodialog' },
    ],
  }

  return config
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
