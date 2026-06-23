<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

type CodeExample = {
  id: string
  label: string
  code: string
  highlighted: string
}

const examples: CodeExample[] = [
  {
    id: 'alert',
    label: 'Alert',
    code: `import { openModal } from 'sodialog'

openModal({
  title: 'Deployment ready',
  content: 'Your changes are live.',
  footerButtons: [
    { label: 'Got it', role: 'confirm', action: 'destroy' },
  ],
})`,
    highlighted: `<span class="token-keyword">import</span> { openModal } <span class="token-keyword">from</span> <span class="token-string">'sodialog'</span>

<span class="token-fn">openModal</span>({
  <span class="token-prop">title</span>: <span class="token-string">'Deployment ready'</span>,
  <span class="token-prop">content</span>: <span class="token-string">'Your changes are live.'</span>,
  <span class="token-prop">footerButtons</span>: [
    { <span class="token-prop">label</span>: <span class="token-string">'Got it'</span>, <span class="token-prop">role</span>: <span class="token-string">'confirm'</span>, <span class="token-prop">action</span>: <span class="token-string">'destroy'</span> },
  ],
})`,
  },
  {
    id: 'confirm',
    label: 'Confirm',
    code: `import { confirmModal } from 'sodialog'

const approved = await confirmModal({
  title: 'Ship this release?',
  content: 'Version 0.2.5 will be published.',
  confirmText: 'Ship it',
  cancelText: 'Not yet',
})`,
    highlighted: `<span class="token-keyword">import</span> { confirmModal } <span class="token-keyword">from</span> <span class="token-string">'sodialog'</span>

<span class="token-keyword">const</span> approved = <span class="token-keyword">await</span> <span class="token-fn">confirmModal</span>({
  <span class="token-prop">title</span>: <span class="token-string">'Ship this release?'</span>,
  <span class="token-prop">content</span>: <span class="token-string">'Version 0.2.5 will be published.'</span>,
  <span class="token-prop">confirmText</span>: <span class="token-string">'Ship it'</span>,
  <span class="token-prop">cancelText</span>: <span class="token-string">'Not yet'</span>,
})`,
  },
  {
    id: 'prompt',
    label: 'Prompt',
    code: `import { promptModal } from 'sodialog'

const branch = await promptModal({
  title: 'Create branch',
  placeholder: 'feature/dialog-api',
  validate: (value) =>
    value.includes(' ') ? 'Spaces are not allowed' : true,
})`,
    highlighted: `<span class="token-keyword">import</span> { promptModal } <span class="token-keyword">from</span> <span class="token-string">'sodialog'</span>

<span class="token-keyword">const</span> branch = <span class="token-keyword">await</span> <span class="token-fn">promptModal</span>({
  <span class="token-prop">title</span>: <span class="token-string">'Create branch'</span>,
  <span class="token-prop">placeholder</span>: <span class="token-string">'feature/dialog-api'</span>,
  <span class="token-prop">validate</span>: (value) =&gt;
    value.<span class="token-fn">includes</span>(<span class="token-string">' '</span>) ? <span class="token-string">'Spaces are not allowed'</span> : <span class="token-bool">true</span>,
})`,
  },
  {
    id: 'loading',
    label: 'Loading',
    code: `import { toast } from 'sodialog'

const task = toast({
  id: 'deploy',
  title: 'Deploying',
  content: 'Uploading assets…',
  duration: false,
})

task.update({
  title: 'Deployed',
  content: 'Production is up to date.',
  variant: 'success',
  duration: 2400,
})`,
    highlighted: `<span class="token-keyword">import</span> { toast } <span class="token-keyword">from</span> <span class="token-string">'sodialog'</span>

<span class="token-keyword">const</span> task = <span class="token-fn">toast</span>({
  <span class="token-prop">id</span>: <span class="token-string">'deploy'</span>,
  <span class="token-prop">title</span>: <span class="token-string">'Deploying'</span>,
  <span class="token-prop">content</span>: <span class="token-string">'Uploading assets…'</span>,
  <span class="token-prop">duration</span>: <span class="token-bool">false</span>,
})

task.<span class="token-fn">update</span>({
  <span class="token-prop">title</span>: <span class="token-string">'Deployed'</span>,
  <span class="token-prop">content</span>: <span class="token-string">'Production is up to date.'</span>,
  <span class="token-prop">variant</span>: <span class="token-string">'success'</span>,
  <span class="token-prop">duration</span>: <span class="token-number">2400</span>,
})`,
  },
  {
    id: 'custom',
    label: 'Custom dialog',
    code: `import { openModal } from 'sodialog'

const content = document.createElement('div')
content.className = 'settings-panel'
content.innerHTML = '<strong>Production</strong>'

openModal({
  title: 'Environment settings',
  content,
  width: 'min(42rem, 92vw)',
  animation: 'zoom',
})`,
    highlighted: `<span class="token-keyword">import</span> { openModal } <span class="token-keyword">from</span> <span class="token-string">'sodialog'</span>

<span class="token-keyword">const</span> content = document.<span class="token-fn">createElement</span>(<span class="token-string">'div'</span>)
content.<span class="token-prop">className</span> = <span class="token-string">'settings-panel'</span>
content.<span class="token-prop">innerHTML</span> = <span class="token-string">'&lt;strong&gt;Production&lt;/strong&gt;'</span>

<span class="token-fn">openModal</span>({
  <span class="token-prop">title</span>: <span class="token-string">'Environment settings'</span>,
  <span class="token-prop">content</span>,
  <span class="token-prop">width</span>: <span class="token-string">'min(42rem, 92vw)'</span>,
  <span class="token-prop">animation</span>: <span class="token-string">'zoom'</span>,
})`,
  },
]

type HomeLocale = 'zh-CN' | 'zh-TW' | 'en-US'

const homeCopy: Record<HomeLocale, {
  prefix: string
  eyebrow: string
  headline: string
  headlineAccent: string
  description: string
  quickStart: string
  copied: string
  copyCode: string
  whyKicker: string
  whyTitle: string
  whyAccent: string
  whyDescription: string
  codeKicker: string
  codeTitle: string
  codeDescription: string
  comparisonKicker: string
  comparisonTitle: string
  comparisonDescription: string
  ecosystemKicker: string
  ecosystemTitle: string
  ecosystemDescription: string
  docsKicker: string
  docsTitle: string
  docsDescription: string
  ctaKicker: string
  ctaTitle: string
  ctaDescription: string
  browseExamples: string
  footerTagline: string
  footerDescription: string
  benefits: string[][]
  docs: string[][]
}> = {
  'zh-CN': {
    prefix: '',
    eyebrow: 'SoDialog 0.2.5 · 零运行时必需依赖',
    headline: 'Modern Dialogs',
    headlineAccent: 'for Every Web Project',
    description: '一套轻量、框架无关、面向现代 Web 应用的 Dialog 解决方案。',
    quickStart: '快速开始',
    copied: '已复制',
    copyCode: '复制代码',
    whyKicker: 'WHY SODIALOG',
    whyTitle: 'Everything a dialog library should be.',
    whyAccent: "Nothing it shouldn't.",
    whyDescription: '一套专注、可预测的交互基础设施。保持宿主项目的技术选择权，不把依赖树变成意外。',
    codeKicker: 'EXPRESSIVE BY DEFAULT',
    codeTitle: 'Simple API. Serious capability.',
    codeDescription: '从简单提醒到完整业务流程，保持代码清晰、类型安全并且容易维护。',
    comparisonKicker: 'BUILT FOR THE LONG RUN',
    comparisonTitle: 'Choose less complexity.',
    comparisonDescription: 'SoDialog 聚焦现代 Dialog 体验，同时保留框架独立、轻量和可维护的核心优势。',
    ecosystemKicker: 'WORKS WHERE YOU WORK',
    ecosystemTitle: 'One library. Every modern stack.',
    ecosystemDescription: 'Bootstrap 是兼容对象，而不是依赖。SoDialog 的核心始终属于 Web Platform。',
    docsKicker: 'DOCUMENTATION',
    docsTitle: 'Build something thoughtful.',
    docsDescription: '从首次安装到高级主题和完整 API，每个入口都为快速找到答案而设计。',
    ctaKicker: 'READY WHEN YOU ARE',
    ctaTitle: 'Your next dialog starts here.',
    ctaDescription: '零强依赖。完整 TypeScript 类型。几分钟即可接入。',
    browseExamples: '浏览示例',
    footerTagline: 'Modern dialogs for every web project.',
    footerDescription: 'Built for the open web. Bootstrap compatible, never Bootstrap dependent.',
    benefits: [
      ['00', '零强依赖', '无需框架运行时、jQuery、Popper 或 Bootstrap。'],
      ['TS', 'TypeScript First', '从选项到返回句柄，公共 API 均有完整类型。'],
      ['↗', 'Promise API', '用 async/await 编排 confirm、prompt 与表单流程。'],
      ['⌘', 'Framework Agnostic', '同一套核心能力服务原生项目和主流框架。'],
      ['A11Y', 'Accessibility Friendly', '原生 dialog 语义、键盘路径与焦点恢复。'],
      ['M', 'Mobile Friendly', '响应式尺寸、触控友好，并覆盖窄屏交互。'],
      ['~', 'Lightweight', '聚焦 Dialog 领域，不携带大型 UI Framework。'],
    ],
    docs: [
      ['01', 'Installation', '安装包并完成 ESM 与样式引入。', '/getting-started#第-1-步安装'],
      ['02', 'Quick Start', '在几分钟内打开第一个现代 Dialog。', '/getting-started'],
      ['03', 'API Reference', '查询完整选项、类型、句柄和生命周期。', '/api/'],
      ['04', 'Examples', '浏览 Modal、Toast、Offcanvas 等可运行示例。', '/examples/'],
      ['05', 'Themes', '使用 CSS Variables 打造自己的产品主题。', '/guides/themes'],
      ['06', 'FAQ', '快速解决接入、样式和框架使用问题。', '/guides/faq'],
    ],
  },
  'zh-TW': {
    prefix: '/zh-TW',
    eyebrow: 'SoDialog 0.2.5 · 零執行時必需依賴',
    headline: 'Modern Dialogs',
    headlineAccent: 'for Every Web Project',
    description: '一套輕量、框架無關、面向現代 Web 應用的 Dialog 解決方案。',
    quickStart: '快速開始',
    copied: '已複製',
    copyCode: '複製程式碼',
    whyKicker: 'WHY SODIALOG',
    whyTitle: 'Everything a dialog library should be.',
    whyAccent: "Nothing it shouldn't.",
    whyDescription: '一套專注、可預測的互動基礎設施。保留宿主專案的技術選擇權，不讓依賴樹成為意外。',
    codeKicker: 'EXPRESSIVE BY DEFAULT',
    codeTitle: 'Simple API. Serious capability.',
    codeDescription: '從簡單提醒到完整業務流程，保持程式碼清晰、型別安全並且容易維護。',
    comparisonKicker: 'BUILT FOR THE LONG RUN',
    comparisonTitle: 'Choose less complexity.',
    comparisonDescription: 'SoDialog 聚焦現代 Dialog 體驗，同時保留框架獨立、輕量和可維護的核心優勢。',
    ecosystemKicker: 'WORKS WHERE YOU WORK',
    ecosystemTitle: 'One library. Every modern stack.',
    ecosystemDescription: 'Bootstrap 是相容對象，而不是依賴。SoDialog 的核心始終屬於 Web Platform。',
    docsKicker: 'DOCUMENTATION',
    docsTitle: 'Build something thoughtful.',
    docsDescription: '從首次安裝到進階主題和完整 API，每個入口都為快速找到答案而設計。',
    ctaKicker: 'READY WHEN YOU ARE',
    ctaTitle: 'Your next dialog starts here.',
    ctaDescription: '零強依賴。完整 TypeScript 型別。幾分鐘即可接入。',
    browseExamples: '瀏覽範例',
    footerTagline: 'Modern dialogs for every web project.',
    footerDescription: 'Built for the open web. Bootstrap compatible, never Bootstrap dependent.',
    benefits: [
      ['00', '零強依賴', '無需框架執行時、jQuery、Popper 或 Bootstrap。'],
      ['TS', 'TypeScript First', '從選項到返回句柄，公共 API 均有完整型別。'],
      ['↗', 'Promise API', '用 async/await 編排 confirm、prompt 與表單流程。'],
      ['⌘', 'Framework Agnostic', '同一套核心能力服務原生專案和主流框架。'],
      ['A11Y', 'Accessibility Friendly', '原生 dialog 語義、鍵盤路徑與焦點恢復。'],
      ['M', 'Mobile Friendly', '響應式尺寸、觸控友好，並覆蓋窄屏互動。'],
      ['~', 'Lightweight', '聚焦 Dialog 領域，不攜帶大型 UI Framework。'],
    ],
    docs: [
      ['01', 'Installation', '安裝套件並完成 ESM 與樣式引入。', '/getting-started#第-1-步安装'],
      ['02', 'Quick Start', '在幾分鐘內打開第一個現代 Dialog。', '/getting-started'],
      ['03', 'API Reference', '查詢完整選項、型別、句柄和生命週期。', '/api/'],
      ['04', 'Examples', '瀏覽 Modal、Toast、Offcanvas 等可執行範例。', '/examples/'],
      ['05', 'Themes', '使用 CSS Variables 打造自己的產品主題。', '/guides/themes'],
      ['06', 'FAQ', '快速解決接入、樣式和框架使用問題。', '/guides/faq'],
    ],
  },
  'en-US': {
    prefix: '/en',
    eyebrow: 'SoDialog 0.2.5 · Zero required dependencies',
    headline: 'Modern Dialogs',
    headlineAccent: 'for Every Web Project',
    description: 'A lightweight, framework-agnostic dialog library built for modern web applications.',
    quickStart: 'Quick Start',
    copied: 'Copied!',
    copyCode: 'Copy code',
    whyKicker: 'WHY SODIALOG',
    whyTitle: 'Everything a dialog library should be.',
    whyAccent: "Nothing it shouldn't.",
    whyDescription: 'Focused, predictable interaction infrastructure that keeps your host app in control of its stack.',
    codeKicker: 'EXPRESSIVE BY DEFAULT',
    codeTitle: 'Simple API. Serious capability.',
    codeDescription: 'From simple alerts to complete product flows, keep code clear, typed, and maintainable.',
    comparisonKicker: 'BUILT FOR THE LONG RUN',
    comparisonTitle: 'Choose less complexity.',
    comparisonDescription: 'SoDialog focuses on modern dialog experiences while staying framework-agnostic, lightweight, and maintainable.',
    ecosystemKicker: 'WORKS WHERE YOU WORK',
    ecosystemTitle: 'One library. Every modern stack.',
    ecosystemDescription: 'Bootstrap is a compatibility target, not a dependency. The SoDialog core belongs to the Web Platform.',
    docsKicker: 'DOCUMENTATION',
    docsTitle: 'Build something thoughtful.',
    docsDescription: 'From first install to advanced themes and complete APIs, every entry point is designed for fast answers.',
    ctaKicker: 'READY WHEN YOU ARE',
    ctaTitle: 'Your next dialog starts here.',
    ctaDescription: 'Zero required dependencies. Complete TypeScript types. Ready in minutes.',
    browseExamples: 'Browse Examples',
    footerTagline: 'Modern dialogs for every web project.',
    footerDescription: 'Built for the open web. Bootstrap compatible, never Bootstrap dependent.',
    benefits: [
      ['00', 'Zero required dependencies', 'No framework runtime, jQuery, Popper, or Bootstrap required.'],
      ['TS', 'TypeScript First', 'Public APIs are typed from options to return handles.'],
      ['↗', 'Promise API', 'Compose confirm, prompt, and form flows with async/await.'],
      ['⌘', 'Framework Agnostic', 'Use the same core in vanilla apps and major frameworks.'],
      ['A11Y', 'Accessibility Friendly', 'Native dialog semantics, keyboard paths, and focus restoration.'],
      ['M', 'Mobile Friendly', 'Responsive sizing and touch-friendly narrow-screen interactions.'],
      ['~', 'Lightweight', 'Focused on dialog interactions without a large UI framework.'],
    ],
    docs: [
      ['01', 'Installation', 'Install the package and import ESM plus styles.', '/getting-started#第-1-步安装'],
      ['02', 'Quick Start', 'Open your first modern dialog in minutes.', '/getting-started'],
      ['03', 'API Reference', 'Look up options, types, handles, and lifecycle behavior.', '/api/'],
      ['04', 'Examples', 'Browse runnable Modal, Toast, and Offcanvas examples.', '/examples/'],
      ['05', 'Themes', 'Create product themes with CSS Variables.', '/guides/themes'],
      ['06', 'FAQ', 'Solve integration, styling, and framework questions quickly.', '/guides/faq'],
    ],
  },
}

const { lang } = useData()
const activeExampleId = ref(examples[0].id)
const copied = ref(false)
const currentLocale = computed<HomeLocale>(() => {
  if (lang.value === 'zh-Hant') return 'zh-TW'
  if (lang.value === 'en-US') return 'en-US'
  return 'zh-CN'
})
const copy = computed(() => homeCopy[currentLocale.value])
const benefits = computed(() => copy.value.benefits)
const docs = computed(() => copy.value.docs)
const activeExample = computed(() => examples.find((item) => item.id === activeExampleId.value) ?? examples[0])

function localizedPath(path: string): string {
  return `${copy.value.prefix}${path}`
}

async function copyActiveCode(): Promise<void> {
  try {
    await navigator.clipboard.writeText(activeExample.value.code)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1400)
  } catch {
    copied.value = false
  }
}

const ecosystems = [
  ['JS', 'Vanilla JS'],
  ['TS', 'TypeScript'],
  ['B', 'Bootstrap'],
  ['TW', 'Tailwind'],
  ['⚛', 'React'],
  ['V', 'Vue'],
  ['N', 'Next.js'],
  ['Nu', 'Nuxt'],
]

</script>

<template>
  <main class="sod-home">
    <section class="sod-hero" aria-labelledby="sod-hero-title">
      <div class="sod-hero__glow sod-hero__glow--one" aria-hidden="true" />
      <div class="sod-hero__glow sod-hero__glow--two" aria-hidden="true" />

      <div class="sod-hero__copy">
        <a class="sod-eyebrow" :href="localizedPath('/getting-started')">
          <span class="sod-eyebrow__dot" />
          {{ copy.eyebrow }}
          <span aria-hidden="true">→</span>
        </a>
        <h1 id="sod-hero-title">{{ copy.headline }}<br><span>{{ copy.headlineAccent }}</span></h1>
        <p>{{ copy.description }}</p>
        <div class="sod-hero__actions">
          <a class="sod-button sod-button--primary" :href="localizedPath('/getting-started')">{{ copy.quickStart }} <span aria-hidden="true">→</span></a>
          <a class="sod-button sod-button--secondary" href="https://github.com/sohophp/sodialog" target="_blank" rel="noreferrer">
            <span class="sod-github-mark" aria-hidden="true">●</span> GitHub
          </a>
        </div>
        <div class="sod-install" aria-label="npm install sodialog">
          <span aria-hidden="true">$</span>
          <code>npm install sodialog</code>
          <span class="sod-install__status">v0.2.5</span>
        </div>
      </div>

      <div class="sod-hero-visual" aria-label="SoDialog code and interface preview">
        <div class="sod-window">
          <div class="sod-window__bar">
            <div class="sod-window__dots" aria-hidden="true"><i /><i /><i /></div>
            <span>release-dialog.ts</span>
            <span class="sod-window__ready"><i /> Ready</span>
          </div>
          <pre><code><span class="token-keyword">import</span> { confirmModal } <span class="token-keyword">from</span> <span class="token-string">'sodialog'</span>

<span class="token-keyword">const</span> approved = <span class="token-keyword">await</span> <span class="token-fn">confirmModal</span>({
  <span class="token-prop">title</span>: <span class="token-string">'Deploy to production?'</span>,
  <span class="token-prop">content</span>: <span class="token-string">'All checks have passed.'</span>,
  <span class="token-prop">confirmText</span>: <span class="token-string">'Deploy now'</span>,
})</code></pre>
        </div>
        <div class="sod-dialog-preview" aria-hidden="true">
          <div class="sod-dialog-preview__head">
            <span class="sod-dialog-preview__icon">✓</span>
            <span>Ready to deploy</span>
            <i>×</i>
          </div>
          <p>All checks passed. Production is ready.</p>
          <div class="sod-dialog-preview__meta"><span><i /> 12 checks</span><span>Just now</span></div>
          <div class="sod-dialog-preview__actions"><span>Cancel</span><strong>Deploy now</strong></div>
        </div>
      </div>
    </section>

    <section class="sod-section" aria-labelledby="why-title">
      <div class="sod-section-heading">
        <span>{{ copy.whyKicker }}</span>
        <h2 id="why-title">{{ copy.whyTitle }}<br><em>{{ copy.whyAccent }}</em></h2>
        <p>{{ copy.whyDescription }}</p>
      </div>
      <div class="sod-benefit-grid">
        <article v-for="benefit in benefits" :key="benefit[1]" class="sod-benefit-card">
          <span class="sod-benefit-card__icon">{{ benefit[0] }}</span>
          <h3>{{ benefit[1] }}</h3>
          <p>{{ benefit[2] }}</p>
        </article>
      </div>
    </section>

    <section class="sod-section sod-code-section" aria-labelledby="code-title">
      <div class="sod-section-heading sod-section-heading--center">
        <span>{{ copy.codeKicker }}</span>
        <h2 id="code-title">{{ copy.codeTitle }}</h2>
        <p>{{ copy.codeDescription }}</p>
      </div>
      <div class="sod-code-showcase">
        <div class="sod-code-tabs" role="tablist" aria-label="Code examples">
          <button
            v-for="example in examples"
            :id="`tab-${example.id}`"
            :key="example.id"
            type="button"
            role="tab"
            :aria-selected="activeExampleId === example.id"
            :aria-controls="`panel-${example.id}`"
            :class="{ active: activeExampleId === example.id }"
            @click="activeExampleId = example.id"
          >
            {{ example.label }}
          </button>
        </div>
        <div
          :id="`panel-${activeExample.id}`"
          class="sod-code-window"
          role="tabpanel"
          :aria-labelledby="`tab-${activeExample.id}`"
        >
          <div class="sod-code-window__bar">
            <div class="sod-window__dots" aria-hidden="true"><i /><i /><i /></div>
            <span>example.ts</span>
            <button type="button" class="sod-copy" @click="copyActiveCode">{{ copied ? copy.copied : copy.copyCode }}</button>
          </div>
          <pre><code v-html="activeExample.highlighted" /></pre>
          <div class="sod-code-window__status"><span><i /> TypeScript</span><span>UTF-8</span></div>
        </div>
      </div>
    </section>

    <section class="sod-section" aria-labelledby="comparison-title">
      <div class="sod-section-heading sod-section-heading--center">
        <span>{{ copy.comparisonKicker }}</span>
        <h2 id="comparison-title">{{ copy.comparisonTitle }}</h2>
        <p>{{ copy.comparisonDescription }}</p>
      </div>
      <div class="sod-table-wrap">
        <table class="sod-comparison">
          <thead><tr><th>Solution</th><th>Promise API</th><th>Framework agnostic</th><th>Required UI runtime</th><th>Maintenance</th></tr></thead>
          <tbody>
            <tr><th>Native Alert</th><td>—</td><td><span class="sod-check">✓</span></td><td>None</td><td>Browser-limited</td></tr>
            <tr><th>Bootstrap Modal</th><td>—</td><td><span class="sod-check">✓</span></td><td>Bootstrap JS</td><td>Framework coupled</td></tr>
            <tr><th>SweetAlert2</th><td><span class="sod-check">✓</span></td><td><span class="sod-check">✓</span></td><td>Package runtime</td><td>General-purpose</td></tr>
            <tr class="sod-comparison__highlight"><th><span class="sod-mini-logo">S</span> SoDialog <small>Recommended</small></th><td><span class="sod-check">✓</span></td><td><span class="sod-check">✓</span></td><td><strong>None</strong></td><td><strong>Focused &amp; typed</strong></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="sod-ecosystem" aria-labelledby="ecosystem-title">
      <div class="sod-section-heading sod-section-heading--center">
        <span>{{ copy.ecosystemKicker }}</span>
        <h2 id="ecosystem-title">{{ copy.ecosystemTitle }}</h2>
        <p>{{ copy.ecosystemDescription }}</p>
      </div>
      <div class="sod-logo-grid">
        <div v-for="item in ecosystems" :key="item[1]" class="sod-logo-item">
          <span :class="`sod-logo-item__mark sod-logo-item__mark--${item[1].toLowerCase().replace('.', '').replace(' ', '-')}`">{{ item[0] }}</span>
          <strong>{{ item[1] }}</strong>
        </div>
      </div>
    </section>

    <section class="sod-section" aria-labelledby="docs-title">
      <div class="sod-section-heading sod-section-heading--split">
        <div><span>{{ copy.docsKicker }}</span><h2 id="docs-title">{{ copy.docsTitle }}</h2></div>
        <p>{{ copy.docsDescription }}</p>
      </div>
      <div class="sod-doc-grid">
        <a v-for="item in docs" :key="item[1]" :href="localizedPath(item[3])" class="sod-doc-card">
          <span>{{ item[0] }}</span>
          <div><h3>{{ item[1] }}</h3><p>{{ item[2] }}</p></div>
          <i aria-hidden="true">↗</i>
        </a>
      </div>
    </section>

    <section class="sod-cta" aria-labelledby="cta-title">
      <div><span>{{ copy.ctaKicker }}</span><h2 id="cta-title">{{ copy.ctaTitle }}</h2><p>{{ copy.ctaDescription }}</p></div>
      <div class="sod-cta__actions"><a class="sod-button sod-button--light" :href="localizedPath('/getting-started')">{{ copy.quickStart }} →</a><a :href="localizedPath('/examples/')">{{ copy.browseExamples }}</a></div>
    </section>

    <footer class="sod-home-footer">
      <div class="sod-home-footer__brand"><span class="sod-footer-logo">S</span><div><strong>SoDialog</strong><small>{{ copy.footerTagline }}</small></div></div>
      <nav aria-label="Footer navigation"><a href="https://github.com/sohophp/sodialog">GitHub</a><a :href="localizedPath('/getting-started')">Documentation</a><span>MIT License</span><span>v0.2.5</span></nav>
      <p>{{ copy.footerDescription }}</p>
    </footer>
  </main>
</template>
