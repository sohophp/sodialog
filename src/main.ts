import './style.css'
import { setupPinnedHeroTop } from './pinned-hero-top'

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
        <a href="./index.html#quick-start">快速开始</a>
        <a href="/examples/">示例导航</a>
        <a href="/components/modal">Modal</a>
        <a href="/components/offcanvas">Offcanvas</a>
        <a href="/components/toast">Toast</a>
        <a href="./demo.html">原版 Demo</a>
        <a href="/api/">API</a>
        <a href="/guides/workflow">开发/发布流程</a>
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
      <a class="btn secondary" href="/examples/">Examples Hub</a>
      <a class="btn secondary" href="/components/modal">Modal</a>
      <a class="btn secondary" href="/components/offcanvas">Offcanvas</a>
      <a class="btn secondary" href="/components/toast">Toast</a>
      <a class="btn secondary" href="/api/">API 全量文档</a>
      <a class="btn secondary" href="/guides/workflow">开发/发布流程</a>
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
        <pre id="usage-code"><code>import { openModal, openOffcanvas, toast } from 'sodialog'
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
})

toast({
  title: '保存成功',
  content: '配置已更新',
  variant: 'success',
  duration: 2400,
})</code></pre>
      </div>
    </section>

    <section id="toast-playbook" class="card reveal">
      <h2>Toast 快速指南</h2>
      <p>支持位置、队列、重复策略、失焦暂停与倒计时条，适合做全局提醒中心。</p>
      <div class="grid two-col">
        <article class="mini-card">
          <h3>固定 ID + 重启计时</h3>
          <div class="code-wrap compact">
            <button class="copy-btn" data-copy-target="toast-dedupe-code" type="button">复制</button>
            <pre id="toast-dedupe-code"><code>toast({
  id: 'sync-job',
  title: '同步任务',
  content: '正在更新数据...',
  duplicateStrategy: 'restart-timer',
  duration: 2200,
})</code></pre>
          </div>
        </article>
        <article class="mini-card">
          <h3>全局配置</h3>
          <div class="code-wrap compact">
            <button class="copy-btn" data-copy-target="toast-config-code" type="button">复制</button>
            <pre id="toast-config-code"><code>import { SoToast } from 'sodialog'

SoToast.configure({
  placement: 'top-end',
  maxVisible: 4,
  pauseOnWindowBlur: true,
  showProgress: true,
})</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section id="api" class="card reveal">
      <h2>核心 API 摘要</h2>
      <p class="lead">完整方法和参数请查看 API 文档页：<a href="/api/">API 全量参考</a></p>
      <div class="grid three-col">
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
        <article class="mini-card">
          <h3><code>toast(options)</code></h3>
          <ul>
            <li><code>placement</code>：6 个角落/中轴位置</li>
            <li><code>maxVisible</code>：超出自动队列</li>
            <li><code>duplicateStrategy</code>：update/ignore/restart-timer/stack</li>
            <li><code>pauseOnWindowBlur</code>：切窗暂停倒计时</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="live-demo" class="card reveal">
      <h2>原版 Demo 演示</h2>
      <p>文档页内嵌了原有完整交互 Demo。你可以在下方直接操作，也可以新窗口打开。</p>
      <div class="demo-actions">
        <a class="btn secondary" href="/examples/" target="_blank" rel="noreferrer">打开 Examples 页</a>
        <a class="btn secondary" href="./demo.html" target="_blank" rel="noreferrer">新窗口打开 Demo</a>
      </div>
      <div class="demo-frame-wrap">
        <iframe class="demo-frame" src="./demo.html" title="SoDialog Legacy Demo"></iframe>
      </div>
    </section>

    <section id="workflow-overview" class="card reveal">
      <h2>开发与发布流程（统一入口）</h2>
      <p>开发流程、API 每次 commit 后同步、发布流程与核对清单已合并到独立详情页。</p>
      <div class="grid command-grid">
        <article class="mini-card">
          <h3>关键命令</h3>
          <div class="code-wrap compact">
            <button class="copy-btn" data-copy-target="workflow-code" type="button">复制</button>
            <pre id="workflow-code"><code>npm run hooks:enable
npm run dev
npm run test:run
npm run lint
npm run build
npm run build:demo
npm run release:check -- vX.Y.Z</code></pre>
          </div>
        </article>
        <article class="mini-card">
          <h3>详情页</h3>
          <p class="muted">查看完整流程说明：</p>
          <div class="demo-actions">
            <a class="btn secondary" href="/guides/workflow">打开开发/发布流程页</a>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>SoDialog · GitHub Pages 首页</p>
  </footer>
`

const copyButtons = document.querySelectorAll<HTMLButtonElement>('.copy-btn')

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

setupPinnedHeroTop()
