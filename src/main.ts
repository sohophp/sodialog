import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Cannot find #app root element')
}

app.innerHTML = `
  <div class="page-bg" aria-hidden="true">
    <span class="shape shape-a"></span>
    <span class="shape shape-b"></span>
    <span class="shape shape-c"></span>
  </div>

  <header class="hero">
    <div class="hero-top">
      <div class="brand-block">
        <img class="brand-logo" src="./logo.ico" alt="SoDialog Logo" width="36" height="36" />
        <div class="brand-copy">
          <strong class="brand-name">SoDialog</strong>
          <span class="tag">Documentation</span>
        </div>
      </div>
      <nav class="quick-nav">
        <a href="#quick-start">快速开始</a>
        <a href="#live-demo">原版 Demo</a>
        <a href="#api">API</a>
        <a href="#dev-flow">开发流程</a>
        <a href="#release-flow">发布流程</a>
      </nav>
    </div>

    <h1>SoDialog 开发文档与使用说明</h1>
    <p>
      一个基于 HTML5 <code>dialog</code> 的弹窗库，支持 <strong>Modal</strong> 与
      <strong>Offcanvas</strong>，适合快速集成到 TypeScript 前端项目。
    </p>

    <div class="hero-metrics">
      <span>TypeScript First</span>
      <span>Modal + Offcanvas</span>
      <span>GitHub Actions Ready</span>
    </div>

    <div class="hero-actions">
      <a class="btn primary" href="https://www.npmjs.com/package/sodialog" target="_blank" rel="noreferrer">NPM 包</a>
      <a class="btn secondary" href="https://github.com/sohophp/sodialog" target="_blank" rel="noreferrer">GitHub 仓库</a>
      <a class="btn secondary" href="https://github.com/sohophp/sodialog/blob/master/CHANGELOG.md" target="_blank" rel="noreferrer">更新日志</a>
    </div>

    <div class="hero-panel">
      <div class="hero-panel-logo-wrap" aria-hidden="true">
        <img class="hero-panel-logo" src="./logo.ico" alt="" width="54" height="54" />
      </div>
      <div class="hero-panel-copy">
        <strong>SoDialog Docs Home</strong>
        <span>当前文档页已集成 API、开发流程、发布流程和原版可交互 Demo。</span>
      </div>
    </div>
  </header>

  <nav class="section-nav" aria-label="文档章节导航">
    <a href="#quick-start">快速开始</a>
    <a href="#live-demo">原版 Demo</a>
    <a href="#api">API</a>
    <a href="#dev-flow">开发流程</a>
    <a href="#release-flow">发布流程</a>
  </nav>

  <main class="content">
    <section id="quick-start" class="card reveal">
      <h2>快速开始</h2>
      <p class="lead">3 步即可接入: 安装、引入样式、调用 API。</p>
      <ol>
        <li>安装：<code>npm install sodialog</code></li>
        <li>引入 API 与样式</li>
        <li>调用 <code>openModal</code> 或 <code>openOffcanvas</code></li>
      </ol>
      <div class="code-wrap">
        <button class="copy-btn" data-copy-target="install-code" type="button">复制</button>
        <pre id="install-code"><code>npm install sodialog</code></pre>
      </div>
      <div class="code-wrap">
        <button class="copy-btn" data-copy-target="usage-code" type="button">复制</button>
        <pre id="usage-code"><code>import { openModal, openOffcanvas } from 'sodialog'
import 'sodialog/style.css'

openModal({
  title: '提示',
  content: '&lt;p&gt;这是 Modal&lt;/p&gt;',
  animation: 'fade',
  useModal: true,
})

openOffcanvas({
  title: '侧边栏',
  content: '&lt;p&gt;这是 Offcanvas&lt;/p&gt;',
  placement: 'end',
})</code></pre>
      </div>
    </section>

    <section id="api" class="card reveal">
      <h2>核心 API 摘要</h2>
      <div class="grid two-col">
        <article class="mini-card">
          <h3><code>openModal(options)</code></h3>
          <ul>
            <li><code>title</code> / <code>content</code>：标题与内容</li>
            <li><code>id</code>：可复用实例 ID</li>
            <li><code>position</code>：<code>center | top | bottom</code></li>
            <li><code>animation</code>：<code>slide | fade | zoom</code></li>
            <li><code>draggable</code>：支持拖动弹窗</li>
            <li><code>autoFitSize</code>：内容变化后自动适配尺寸</li>
          </ul>
        </article>
        <article class="mini-card">
          <h3><code>openOffcanvas(options)</code></h3>
          <ul>
            <li>继承 Modal 大部分参数</li>
            <li><code>placement</code>：<code>start | end | top | bottom</code></li>
            <li>默认动画：<code>slide</code></li>
            <li>适合做侧栏配置、详情抽屉</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="live-demo" class="card reveal">
      <h2>原版 Demo 演示</h2>
      <p>文档页内嵌了原有完整交互 Demo。你可以在下方直接操作，也可以新窗口打开。</p>
      <div class="demo-actions">
        <a class="btn secondary" href="./demo.html" target="_blank" rel="noreferrer">新窗口打开 Demo</a>
      </div>
      <div class="demo-frame-wrap">
        <iframe class="demo-frame" src="./demo.html" title="SoDialog Legacy Demo"></iframe>
      </div>
    </section>

    <section id="dev-flow" class="card reveal">
      <h2>开发流程</h2>
      <div class="grid command-grid">
        <article class="mini-card">
          <h3>常用命令</h3>
          <div class="code-wrap compact">
            <button class="copy-btn" data-copy-target="dev-code" type="button">复制</button>
            <pre id="dev-code"><code>npm run dev
npm run lint
npm run build
npm run docs:changelog</code></pre>
          </div>
        </article>
        <article class="mini-card">
          <h3>文档文件</h3>
          <ul>
            <li><code>README.md</code>：完整使用说明</li>
            <li><code>CHANGELOG.md</code>：版本变更记录</li>
            <li><code>RELEASE_CHECKLIST.md</code>：发布检查清单</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="release-flow" class="card reveal">
      <h2>发布流程（Tag 驱动）</h2>
      <p>
        推荐流程：更新版本号后进行校验，提交并打 tag，推送后由 GitHub Actions 自动发布 npm。
      </p>
      <div class="code-wrap">
        <button class="copy-btn" data-copy-target="release-code" type="button">复制</button>
        <pre id="release-code"><code>npm version patch --no-git-tag-version
npm run release:check -- vX.Y.Z
git add -A
git commit -m "release: vX.Y.Z"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push --follow-tags</code></pre>
      </div>
      <p class="muted">
        更多细节可查看
        <a href="https://github.com/sohophp/sodialog/blob/master/README.md" target="_blank" rel="noreferrer">README</a>
        与
        <a href="https://github.com/sohophp/sodialog/blob/master/RELEASE_CHECKLIST.md" target="_blank" rel="noreferrer">RELEASE_CHECKLIST</a>
      </p>
    </section>
  </main>

  <footer class="footer">
    <p>SoDialog · GitHub Pages 首页</p>
  </footer>
`

const copyButtons = document.querySelectorAll<HTMLButtonElement>('.copy-btn')
const sectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.quick-nav a, .section-nav a'))
const sectionTargets = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.dataset.copyTarget
    if (!targetId) {
      return
    }

    const codeEl = document.querySelector(`#${targetId} code`)
    if (!codeEl) {
      return
    }

    try {
      await navigator.clipboard.writeText(codeEl.textContent ?? '')
      button.textContent = '已复制'
      window.setTimeout(() => {
        button.textContent = '复制'
      }, 1200)
    } catch {
      button.textContent = '复制失败'
      window.setTimeout(() => {
        button.textContent = '复制'
      }, 1200)
    }
  })
})

sectionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetHash = link.getAttribute('href')
    if (!targetHash || !targetHash.startsWith('#')) {
      return
    }

    const targetEl = document.querySelector<HTMLElement>(targetHash)
    if (!targetEl) {
      return
    }

    event.preventDefault()
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', targetHash)
  })
})

const setActiveSection = (id: string) => {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`
    link.classList.toggle('is-active', isActive)
    if (isActive) {
      link.setAttribute('aria-current', 'true')
    } else {
      link.removeAttribute('aria-current')
    }
  })
}

if (sectionTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (!visible) {
        return
      }

      const visibleId = (visible.target as HTMLElement).id
      if (visibleId) {
        setActiveSection(visibleId)
      }
    },
    {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: [0.1, 0.25, 0.5],
    },
  )

  sectionTargets.forEach((section) => observer.observe(section))
  setActiveSection(sectionTargets[0].id)
}
