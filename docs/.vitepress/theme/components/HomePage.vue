<script setup lang="ts">
import { computed, ref } from 'vue'

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

const activeExampleId = ref(examples[0].id)
const copied = ref(false)
const activeExample = computed(() => examples.find((item) => item.id === activeExampleId.value) ?? examples[0])

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

const benefits = [
  ['00', '零强依赖', '无需框架运行时、jQuery、Popper 或 Bootstrap。'],
  ['TS', 'TypeScript First', '从选项到返回句柄，公共 API 均有完整类型。'],
  ['↗', 'Promise API', '用 async/await 编排 confirm、prompt 与表单流程。'],
  ['⌘', 'Framework Agnostic', '同一套核心能力服务原生项目和主流框架。'],
  ['A11Y', 'Accessibility Friendly', '原生 dialog 语义、键盘路径与焦点恢复。'],
  ['M', 'Mobile Friendly', '响应式尺寸、触控友好，并覆盖窄屏交互。'],
  ['~', 'Lightweight', '聚焦 Dialog 领域，不携带大型 UI Framework。'],
]

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

const docs = [
  ['01', 'Installation', '安装包并完成 ESM 与样式引入。', '/getting-started#第-1-步安装'],
  ['02', 'Quick Start', '在几分钟内打开第一个现代 Dialog。', '/getting-started'],
  ['03', 'API Reference', '查询完整选项、类型、句柄和生命周期。', '/api/'],
  ['04', 'Examples', '浏览 Modal、Toast、Offcanvas 等可运行示例。', '/examples/'],
  ['05', 'Themes', '使用 CSS Variables 打造自己的产品主题。', '/guides/themes'],
  ['06', 'FAQ', '快速解决接入、样式和框架使用问题。', '/guides/faq'],
]
</script>

<template>
  <main class="sod-home">
    <section class="sod-hero" aria-labelledby="sod-hero-title">
      <div class="sod-hero__glow sod-hero__glow--one" aria-hidden="true" />
      <div class="sod-hero__glow sod-hero__glow--two" aria-hidden="true" />

      <div class="sod-hero__copy">
        <a class="sod-eyebrow" href="/getting-started">
          <span class="sod-eyebrow__dot" />
          SoDialog 0.2.5 · Zero required dependencies
          <span aria-hidden="true">→</span>
        </a>
        <h1 id="sod-hero-title">Modern Dialogs<br><span>for Every Web Project</span></h1>
        <p>A lightweight, framework-agnostic dialog library built for modern web applications.</p>
        <div class="sod-hero__actions">
          <a class="sod-button sod-button--primary" href="/getting-started">快速开始 <span aria-hidden="true">→</span></a>
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
        <span>WHY SODIALOG</span>
        <h2 id="why-title">Everything a dialog library should be.<br><em>Nothing it shouldn't.</em></h2>
        <p>一套专注、可预测的交互基础设施。保持宿主项目的技术选择权，不把依赖树变成意外。</p>
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
        <span>EXPRESSIVE BY DEFAULT</span>
        <h2 id="code-title">Simple API. Serious capability.</h2>
        <p>从简单提醒到完整业务流程，保持代码清晰、类型安全并且容易维护。</p>
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
            <button type="button" class="sod-copy" @click="copyActiveCode">{{ copied ? 'Copied!' : 'Copy code' }}</button>
          </div>
          <pre><code v-html="activeExample.highlighted" /></pre>
          <div class="sod-code-window__status"><span><i /> TypeScript</span><span>UTF-8</span></div>
        </div>
      </div>
    </section>

    <section class="sod-section" aria-labelledby="comparison-title">
      <div class="sod-section-heading sod-section-heading--center">
        <span>BUILT FOR THE LONG RUN</span>
        <h2 id="comparison-title">Choose less complexity.</h2>
        <p>SoDialog 聚焦现代 Dialog 体验，同时保留框架独立、轻量和可维护的核心优势。</p>
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
        <span>WORKS WHERE YOU WORK</span>
        <h2 id="ecosystem-title">One library. Every modern stack.</h2>
        <p>Bootstrap 是兼容对象，而不是依赖。SoDialog 的核心始终属于 Web Platform。</p>
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
        <div><span>DOCUMENTATION</span><h2 id="docs-title">Build something thoughtful.</h2></div>
        <p>从首次安装到高级主题和完整 API，每个入口都为快速找到答案而设计。</p>
      </div>
      <div class="sod-doc-grid">
        <a v-for="item in docs" :key="item[1]" :href="item[3]" class="sod-doc-card">
          <span>{{ item[0] }}</span>
          <div><h3>{{ item[1] }}</h3><p>{{ item[2] }}</p></div>
          <i aria-hidden="true">↗</i>
        </a>
      </div>
    </section>

    <section class="sod-cta" aria-labelledby="cta-title">
      <div><span>READY WHEN YOU ARE</span><h2 id="cta-title">Your next dialog starts here.</h2><p>零强依赖。完整 TypeScript 类型。几分钟即可接入。</p></div>
      <div class="sod-cta__actions"><a class="sod-button sod-button--light" href="/getting-started">快速开始 →</a><a href="/examples/">浏览示例</a></div>
    </section>

    <footer class="sod-home-footer">
      <div class="sod-home-footer__brand"><span class="sod-footer-logo">S</span><div><strong>SoDialog</strong><small>Modern dialogs for every web project.</small></div></div>
      <nav aria-label="Footer navigation"><a href="https://github.com/sohophp/sodialog">GitHub</a><a href="/getting-started">Documentation</a><span>MIT License</span><span>v0.2.5</span></nav>
      <p>Built for the open web. Bootstrap compatible, never Bootstrap dependent.</p>
    </footer>
  </main>
</template>
