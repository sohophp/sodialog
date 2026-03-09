import './examples-style.css'
import { setupPinnedHeroTop } from './pinned-hero-top'
import {
  SoToast,
  bindDialogContextMenu,
  bindContextMenu,
  configureAdapter,
  confirmModal,
  formModal,
  openDialog,
  openModal,
  openOffcanvas,
  pushMessage,
  promptModal,
  type SoContextMenuItem,
  toast,
} from './lib'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Cannot find #app root element')
}

function ensureBootstrapIconsLoaded(): void {
  const href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
  const existed = document.querySelector(`link[data-sod-icons="bootstrap"][href="${href}"]`)
  if (existed) {
    return
  }

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.sodIcons = 'bootstrap'
  document.head.append(link)
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
          <span class="tag">Examples</span>
        </div>
      </div>
      <nav class="quick-nav">
        <a href="./index.html#quick-start">快速开始</a>
        <a href="./examples.html#modal-example">功能示例</a>
        <a href="./demo.html">原版 Demo</a>
        <a href="./api.html">API</a>
        <a href="./index.html#dev-flow">开发流程</a>
        <a href="./index.html#release-flow">发布流程</a>
      </nav>
    </div>

    <h1>SoDialog 功能示例与实战</h1>
    <p>独立页面，按组件拆分详细说明使用方法，并提供可直接运行的交互示例与代码片段。</p>

    <div class="hero-banner" aria-hidden="true">
      <span>Modal</span>
      <span>Offcanvas</span>
      <span>Toast</span>
    </div>

    <div class="hero-actions">
      <a class="btn primary" href="./index.html">返回文档首页</a>
      <a class="btn secondary" href="./demo.html">打开原版 Demo</a>
      <a class="btn secondary" href="https://www.npmjs.com/package/sodialog" target="_blank" rel="noreferrer">NPM 包</a>
    </div>
  </header>

  <main class="layout">
    <aside class="card side-nav" aria-label="示例导航">
      <h2>示例导航</h2>
      <div class="nav-group">
        <a class="nav-l1" href="#modal-example">Modal</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#modal-1">1. 最小调用</a>
          <a class="nav-l2" href="#modal-2">2. 基础参数</a>
          <a class="nav-l2" href="#modal-3">3. 位置与关闭行为</a>
          <a class="nav-l2" href="#modal-4">4. 高级参数</a>
          <a class="nav-l2" href="#modal-5">5. confirmModal</a>
          <a class="nav-l2" href="#modal-6">6. promptModal</a>
          <a class="nav-l2" href="#modal-7">7. formModal</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#adapter-example">Adapter First</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#adapter-1">1. 统一入口 + trace</a>
          <a class="nav-l2" href="#adapter-2">2. legacy-skin + 右键菜单</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#offcanvas-example">Offcanvas</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#offcanvas-1">1. 最小调用</a>
          <a class="nav-l2" href="#offcanvas-2">2. 位置与动画</a>
          <a class="nav-l2" href="#offcanvas-3">3. 顶部/底部</a>
          <a class="nav-l2" href="#offcanvas-4">4. 高级参数</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#toast-example">Toast</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#toast-1">1. 最小调用</a>
          <a class="nav-l2" href="#toast-2">2. 样式与位置</a>
          <a class="nav-l2" href="#toast-3">3. 手动控制</a>
          <a class="nav-l2" href="#toast-4">4. 队列</a>
          <a class="nav-l2" href="#toast-5">5. 重复策略</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#context-menu-example">Context Menu</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#context-menu-1">1. 图标右键菜单</a>
          <a class="nav-l2" href="#context-menu-2">2. 手动打开与动态更新</a>
        </div>
      </div>
    </aside>

    <div class="content-stack">
    <section class="card" id="modal-example">
      <h2>1) Modal 示例</h2>
      <p class="section-lead">按“最基础 -> 参数增强 -> Promise 流程 -> 表单采集”逐步展示 Modal 的常见用法。</p>
      <div class="example-grid">
        <article class="example-card" id="modal-1">
          <h3>示例 1：最小调用（只传核心参数）</h3>
          <div class="row">
            <button class="btn primary" id="open-modal-minimal">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-minimal-code" type="button">复制</button>
            <pre id="modal-minimal-code"><code>openModal({
  title: '最小示例',
  content: '&lt;p&gt;这是最小可用的 Modal 调用。&lt;/p&gt;',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-2">
          <h3>示例 2：基础参数（标题、内容、动画、按钮）</h3>
          <div class="row">
            <button class="btn primary" id="open-modal-basic">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-basic-code" type="button">复制</button>
            <pre id="modal-basic-code"><code>openModal({
  title: '订单确认',
  content: '&lt;p&gt;这是一个基础 Modal 示例，支持自定义内容和按钮。&lt;/p&gt;',
  animation: 'zoom',
  confirmText: '确认',
  cancelText: '取消',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-3">
          <h3>示例 3：位置与关闭行为</h3>
          <div class="row">
            <button class="btn primary" id="open-modal-position">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-position-code" type="button">复制</button>
            <pre id="modal-position-code"><code>openModal({
  title: '顶部提示弹窗',
  content: '&lt;p&gt;演示 top 定位与关闭策略。&lt;/p&gt;',
  position: 'top',
  animation: 'slide',
  useModal: true,
  closeOnBackdrop: true,
  closeOnEsc: true,
  confirmText: '我知道了',
  cancelText: '关闭',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-4">
          <h3>示例 4：高级参数（拖拽、自动尺寸、生命周期）</h3>
          <div class="row">
            <button class="btn primary" id="open-modal-advanced">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-advanced-code" type="button">复制</button>
            <pre id="modal-advanced-code"><code>openModal({
  id: 'advanced-modal-demo',
  title: '高级参数示例',
  content: '&lt;div class="drag-anchor" style="margin-bottom:8px;font-weight:700;cursor:move;"&gt;拖拽锚点（也可拖动）&lt;/div&gt;&lt;p&gt;该示例演示 draggable / dragHandle / autoFitSize / scrollMode / 生命周期回调。&lt;/p&gt;&lt;p&gt;当内容较长时，会按 hybrid 规则切换滚动容器。&lt;/p&gt;',
  animation: 'fade',
  position: 'center',
  draggable: true,
  dragHandle: ['header', '.drag-anchor'],
  autoFitSize: true,
  scrollMode: 'hybrid',
  hybridSwitchRatio: 1.25,
  confirmText: '确认',
  cancelText: '取消',
  onAfterOpen: () =&gt; {
    toast({ title: 'after-open', content: '高级 Modal 已打开', variant: 'info', duration: 1200 })
  },
  onAfterClose: () =&gt; {
    toast({ title: 'after-close', content: '高级 Modal 已关闭', variant: 'default', duration: 1200 })
  },
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-5">
          <h3>示例 5：Promise 确认（<code>confirmModal</code>）</h3>
          <div class="row">
            <button class="btn primary" id="open-confirm">运行示例</button>
          </div>
          <div id="modal-result" class="result-box">结果输出：等待执行...</div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-confirm-code" type="button">复制</button>
            <pre id="modal-confirm-code"><code>const ok = await confirmModal({
  title: '删除确认',
  content: '&lt;p&gt;确定删除这条记录吗？该操作不可恢复。&lt;/p&gt;',
  confirmText: '删除',
  cancelText: '返回',
})

toast({
  title: ok ? '已确认' : '已取消',
  content: ok ? '用户确认执行删除。' : '用户取消了删除。',
  variant: ok ? 'danger' : 'info',
  duration: 1800,
})

if (modalResult) {
  modalResult.textContent = \`结果输出：confirmModal =&gt; \${ok ? 'true' : 'false'}\`
}</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-6">
          <h3>示例 6：Promise 输入（<code>promptModal</code>）</h3>
          <div class="row">
            <button class="btn primary" id="open-prompt">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-prompt-code" type="button">复制</button>
            <pre id="modal-prompt-code"><code>const result = await promptModal({
  title: '请输入标签名',
  placeholder: '例如 release-note',
  validate: (value) =&gt; (value.length &lt; 2 ? '至少输入 2 个字符' : true),
})

if (result === null) {
  toast({ title: '已取消', content: '你取消了输入。', variant: 'info', duration: 1700 })
  if (modalResult) {
    modalResult.textContent = '结果输出：promptModal =&gt; null'
  }
  return
}

toast({
  title: '输入完成',
  content: \`你输入的是: \${result}\`,
  variant: 'success',
  duration: 2200,
})

if (modalResult) {
  modalResult.textContent = \`结果输出：promptModal =&gt; "\${result}"\`
}</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-7">
          <h3>示例 7：表单采集（<code>formModal</code>）</h3>
          <div class="row">
            <button class="btn primary" id="open-form">运行示例</button>
          </div>
          <div id="form-result" class="result-box">结果输出：等待执行...</div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-form-code" type="button">复制</button>
            <pre id="modal-form-code"><code>const values = await formModal({
  title: '创建发布计划',
  content: '&lt;p&gt;请填写发布信息，用于生成计划卡片。&lt;/p&gt;',
  submitText: '创建',
  fields: [
    {
      name: 'title',
      label: '计划标题',
      placeholder: '例如 v0.1.18 发布',
      required: true,
      validate: (value) => (String(value ?? '').length &lt; 4 ? '标题至少 4 个字符' : true),
    },
    {
      name: 'owner',
      label: '负责人',
      placeholder: '例如 Alice',
      required: true,
    },
    {
      name: 'priority',
      label: '优先级',
      type: 'select',
      options: [
        { label: 'P0 - 紧急', value: 'p0' },
        { label: 'P1 - 高', value: 'p1' },
        { label: 'P2 - 常规', value: 'p2' },
      ],
      defaultValue: 'p1',
    },
    {
      name: 'estimate',
      label: '预估工时(小时)',
      type: 'number',
      defaultValue: 6,
      required: true,
    },
    {
      name: 'notes',
      label: '备注',
      type: 'textarea',
      placeholder: '写下本次发布重点...',
      rows: 3,
    },
    {
      name: 'notify',
      label: '发布后通知团队',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  validate: (formValues) => {
    const estimate = formValues.estimate
    if (typeof estimate === 'number' && estimate &gt; 24) {
      return { estimate: '单次计划建议不超过 24 小时' }
    }
    return true
  },
})

if (values === null) {
  toast({ title: '已取消', content: '你取消了表单提交。', variant: 'info', duration: 1600 })
  if (formResult) {
    formResult.textContent = '结果输出：formModal =&gt; null'
  }
  return
}

toast({
  title: '表单已提交',
  content: \`标题: \${String(values.title ?? '')}\`,
  variant: 'success',
  duration: 2200,
})
if (formResult) {
  formResult.textContent = \`结果输出：formModal =&gt; \${JSON.stringify(values)}\`
}</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="card" id="adapter-example">
      <h2>2) Adapter First 示例</h2>
      <p class="section-lead">演示推荐接入路径：统一配置、统一入口、traceId 透传与兼容皮肤切换。</p>
      <div class="example-grid">
        <article class="example-card" id="adapter-1">
          <h3>示例 1：<code>configureAdapter + openDialog + pushMessage</code></h3>
          <div class="row">
            <button class="btn primary" id="run-adapter-open">运行示例</button>
          </div>
          <div id="adapter-result" class="result-box">结果输出：等待执行...</div>
          <div class="code">
            <button class="copy-btn" data-copy-target="adapter-open-code" type="button">复制</button>
            <pre id="adapter-open-code"><code>configureAdapter({
  modalDefaults: {
    closeOnEsc: true,
    closeOnBackdrop: true,
    footerAlign: 'center',
  },
  toastDefaults: {
    placement: 'top-end',
    maxVisible: 4,
    newestOnTop: true,
    duplicateStrategy: 'stack',
    duration: 3800,
  },
})

openDialog({
  title: 'Adapter Dialog',
  content: '&lt;p&gt;通过统一入口打开 Dialog。&lt;/p&gt;',
  traceId: 'trace-example-001',
  onLayoutStable: ({ traceId }) =&gt; {
    pushMessage('success', '布局稳定，可初始化第三方组件', { traceId, duration: 1400 })
  },
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="adapter-2">
          <h3>示例 2：兼容皮肤 + 适配层右键菜单</h3>
          <div class="row">
            <button class="btn primary" id="toggle-legacy-skin">切换 legacy-skin</button>
            <button class="btn secondary" id="enable-adapter-context">启用适配层右键菜单</button>
          </div>
          <div class="context-demo-board" id="adapter-context-board">
            <button class="context-demo-row" data-file-name="adapter-guidelines.md" type="button">adapter-guidelines.md</button>
            <button class="context-demo-row" data-file-name="migration-guide.md" type="button">migration-guide.md</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="adapter-context-code" type="button">复制</button>
            <pre id="adapter-context-code"><code>document.body.classList.toggle('legacy-skin')

bindDialogContextMenu({
  target: '#adapter-context-board .context-demo-row',
  traceId: 'trace-example-ctx-001',
  items: [
    { id: 'copy', label: '复制', icon: 'bi bi-copy' },
    { id: 'inspect', label: '查看', icon: 'bi bi-eye' },
  ],
})</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="card" id="offcanvas-example">
      <h2>3) Offcanvas 示例</h2>
      <p class="section-lead">按“最基础 -> 位置动画 -> 边缘类型 -> 高级参数”逐步展示 Offcanvas 的用法。</p>
      <div class="example-grid">
        <article class="example-card" id="offcanvas-1">
          <h3>示例 1：最小调用</h3>
          <div class="row">
            <button class="btn primary" id="open-offcanvas-minimal">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-minimal-code" type="button">复制</button>
            <pre id="offcanvas-minimal-code"><code>openOffcanvas({
  title: '最小 Offcanvas',
  content: '&lt;p&gt;这是最小可用的 Offcanvas 调用。&lt;/p&gt;',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="offcanvas-2">
          <h3>示例 2：位置与动画（右侧滑入）</h3>
          <div class="row">
            <button class="btn primary" id="open-offcanvas-basic">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-basic-code" type="button">复制</button>
            <pre id="offcanvas-basic-code"><code>openOffcanvas({
  title: '系统设置',
  placement: 'end',
  animation: 'slide',
  content: '&lt;p&gt;这里放筛选与配置项。&lt;/p&gt;',
  confirmText: '保存',
  cancelText: '关闭',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="offcanvas-3">
          <h3>示例 3：顶部/底部面板</h3>
          <div class="row">
            <button class="btn primary" id="open-offcanvas-top">顶部示例</button>
            <button class="btn secondary" id="open-offcanvas-bottom">底部示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-edge-code" type="button">复制</button>
            <pre id="offcanvas-edge-code"><code>openOffcanvas({
  title: '顶部通知面板',
  placement: 'top',
  animation: 'fade',
  content: '&lt;p&gt;适合展示全局通知或快捷操作。&lt;/p&gt;',
  confirmText: '知道了',
  cancelText: '关闭',
})

openOffcanvas({
  title: '底部操作面板',
  placement: 'bottom',
  animation: 'zoom',
  content: '&lt;p&gt;适合移动端的底部操作入口。&lt;/p&gt;',
  confirmText: '继续',
  cancelText: '取消',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="offcanvas-4">
          <h3>示例 4：高级参数（拖拽、滚动、生命周期）</h3>
          <div class="row">
            <button class="btn primary" id="open-offcanvas-advanced">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-advanced-code" type="button">复制</button>
            <pre id="offcanvas-advanced-code"><code>openOffcanvas({
  id: 'offcanvas-advanced-demo',
  title: '高级 Offcanvas',
  placement: 'start',
  animation: 'slide',
  draggable: true,
  dragHandle: ['header', 'body'],
  autoFitSize: true,
  scrollMode: 'hybrid',
  hybridSwitchRatio: 1.2,
  closeOnBackdrop: true,
  closeOnEsc: true,
  content: '&lt;p&gt;左侧高级面板：支持拖拽、内容自适配和生命周期提示。&lt;/p&gt;',
  confirmText: '保存',
  cancelText: '关闭',
  onAfterOpen: () =&gt; {
    toast({ title: 'offcanvas', content: '高级 Offcanvas 已打开', variant: 'info', duration: 1200 })
  },
  onAfterClose: () =&gt; {
    toast({ title: 'offcanvas', content: '高级 Offcanvas 已关闭', variant: 'default', duration: 1200 })
  },
})</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="card" id="toast-example">
      <h2>4) Toast 示例</h2>
      <p class="section-lead">按“最基础 -> 样式位置 -> 手动控制 -> 队列 -> 重复策略”逐步展示 Toast 用法。</p>
      <div class="example-grid">
        <article class="example-card" id="toast-1">
          <h3>示例 1：最小调用</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-minimal">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-minimal-code" type="button">复制</button>
            <pre id="toast-minimal-code"><code>toast({
  content: '最小通知示例',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="toast-2">
          <h3>示例 2：样式与位置</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-basic">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-basic-code" type="button">复制</button>
            <pre id="toast-basic-code"><code>toast({
  title: '保存成功',
  content: '配置已同步',
  placement: 'top-end',
  variant: 'success',
  duration: 2200,
  maxVisible: 3,
  showProgress: true,
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="toast-3">
          <h3>示例 3：手动控制（handle）</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-handle">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-handle-code" type="button">复制</button>
            <pre id="toast-handle-code"><code>const handle = toast({
  id: 'manual-toast',
  title: '上传任务',
  content: '准备上传...',
  duration: false,
  closable: true,
  variant: 'info',
})

window.setTimeout(() =&gt; {
  handle.update({ content: '上传中 65%', variant: 'warning' })
}, 700)

window.setTimeout(() =&gt; {
  handle.update({ content: '上传完成', variant: 'success', duration: 1200 })
  handle.resume()
}, 1500)</code></pre>
          </div>
        </article>

        <article class="example-card" id="toast-4">
          <h3>示例 4：队列（maxVisible）</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-queue">批量队列</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-queue-code" type="button">复制</button>
            <pre id="toast-queue-code"><code>SoToast.configure({ maxVisible: 3 })

for (let index = 1; index &lt;= 6; index += 1) {
  toast({
    title: \`队列消息 \${index}\`,
    content: \`第 \${index} 条示例提醒\`,
    placement: 'top-end',
    variant: 'default',
    duration: 1000 + index * 250,
  })
}</code></pre>
          </div>
        </article>

        <article class="example-card" id="toast-5">
          <h3>示例 5：重复策略与清空</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-dup-update">update</button>
            <button class="btn secondary" id="open-toast-dup-restart">restart-timer</button>
            <button class="btn secondary" id="open-toast-dup-stack">stack</button>
            <button class="btn secondary" id="clear-toast">清空 Toast</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-dup-code" type="button">复制</button>
            <pre id="toast-dup-code"><code>toast({
  id: 'sync-job',
  title: '同步任务',
  content: '策略: update',
  variant: 'info',
  duration: 1800,
  duplicateStrategy: 'update',
})

toast({
  id: 'sync-job',
  title: '同步任务',
  content: '策略: restart-timer',
  variant: 'warning',
  duration: 1800,
  duplicateStrategy: 'restart-timer',
})

toast({
  id: 'sync-job',
  title: '同步任务',
  content: '策略: stack',
  variant: 'success',
  duration: 1800,
  duplicateStrategy: 'stack',
})

SoToast.closeAll()
</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="card" id="context-menu-example">
      <h2>5) Context Menu 示例</h2>
      <p class="section-lead">演示带图标的右键菜单、动态更新菜单项，以及手动在指定坐标打开菜单。</p>
      <div class="example-grid">
        <article class="example-card" id="context-menu-1">
          <h3>示例 1：Bootstrap Icons 图标右键菜单</h3>
          <div class="row">
            <button class="btn primary" id="enable-context-menu">启用右键示例</button>
          </div>
          <p class="context-menu-tip">启用后，在下方任意“文件行”上点击右键触发菜单。</p>
          <div class="context-demo-board" id="context-demo-board">
            <button class="context-demo-row" data-file-name="release-notes.md" type="button">release-notes.md</button>
            <button class="context-demo-row" data-file-name="api-main.ts" type="button">api-main.ts</button>
            <button class="context-demo-row" data-file-name="examples-main.ts" type="button">examples-main.ts</button>
          </div>
          <div id="context-menu-result" class="result-box">结果输出：等待执行...</div>
          <div class="code">
            <button class="copy-btn" data-copy-target="context-menu-icon-code" type="button">复制</button>
            <pre id="context-menu-icon-code"><code>bindContextMenu({
  target: '.context-demo-row',
  items: [
    { id: 'copy', label: '复制文件名', icon: 'bi bi-copy' },
    { id: 'rename', label: '重命名', icon: 'bi bi-pencil-square' },
    { id: 'delete', label: '删除', icon: 'bi bi-trash', iconAriaLabel: 'Delete' },
  ],
  onAction: ({ itemId, triggerElement }) =&gt; {
    console.log(itemId, triggerElement.dataset.fileName)
  },
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="context-menu-2">
          <h3>示例 2：手动打开与动态菜单项</h3>
          <div class="row">
            <button class="btn primary" id="open-context-menu-manual">手动打开菜单</button>
            <button class="btn secondary" id="update-context-menu-items">切换菜单项</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="context-menu-manual-code" type="button">复制</button>
            <pre id="context-menu-manual-code"><code>const handle = bindContextMenu({
  target: '.context-demo-row',
  items: [{ id: 'inspect', label: '查看详情', icon: 'bi bi-eye' }],
})

handle.openAt(320, 240)
handle.setItems([
  { id: 'pin', label: '置顶', icon: 'bi bi-pin-angle' },
  { id: 'share', label: '分享', icon: 'bi bi-share' },
])</code></pre>
          </div>
        </article>
      </div>
    </section>
  </div>
  </main>

  <footer class="footer">
    <p>SoDialog · GitHub Pages 首页</p>
  </footer>
`

const modalMinimalBtn = document.querySelector<HTMLButtonElement>('#open-modal-minimal')
const modalBtn = document.querySelector<HTMLButtonElement>('#open-modal-basic')
const modalPositionBtn = document.querySelector<HTMLButtonElement>('#open-modal-position')
const modalAdvancedBtn = document.querySelector<HTMLButtonElement>('#open-modal-advanced')
const confirmBtn = document.querySelector<HTMLButtonElement>('#open-confirm')
const promptBtn = document.querySelector<HTMLButtonElement>('#open-prompt')
const formBtn = document.querySelector<HTMLButtonElement>('#open-form')
const modalResult = document.querySelector<HTMLDivElement>('#modal-result')
const formResult = document.querySelector<HTMLDivElement>('#form-result')
const adapterOpenBtn = document.querySelector<HTMLButtonElement>('#run-adapter-open')
const adapterLegacyToggleBtn = document.querySelector<HTMLButtonElement>('#toggle-legacy-skin')
const adapterEnableContextBtn = document.querySelector<HTMLButtonElement>('#enable-adapter-context')
const adapterResult = document.querySelector<HTMLDivElement>('#adapter-result')

configureAdapter({
  modalDefaults: {
    closeOnEsc: true,
    closeOnBackdrop: true,
    footerAlign: 'center',
  },
  toastDefaults: {
    placement: 'top-end',
    maxVisible: 4,
    newestOnTop: true,
    duplicateStrategy: 'stack',
    duration: 3800,
  },
})

modalMinimalBtn?.addEventListener('click', () => {
  openModal({
    title: '最小示例',
    content: '<p>这是最小可用的 Modal 调用。</p>',
  })
})

modalBtn?.addEventListener('click', () => {
  openModal({
    title: '订单确认',
    content: '<p>这是一个基础 Modal 示例，支持自定义内容和按钮。</p>',
    animation: 'zoom',
    confirmText: '确认',
    cancelText: '取消',
  })
})

modalPositionBtn?.addEventListener('click', () => {
  openModal({
    title: '顶部提示弹窗',
    content: '<p>演示 top 定位与关闭策略。</p>',
    position: 'top',
    animation: 'slide',
    useModal: true,
    closeOnBackdrop: true,
    closeOnEsc: true,
    confirmText: '我知道了',
    cancelText: '关闭',
  })
})

modalAdvancedBtn?.addEventListener('click', () => {
  openModal({
    id: 'advanced-modal-demo',
    title: '高级参数示例',
    content:
      '<div class="drag-anchor" style="margin-bottom:8px;font-weight:700;cursor:move;">拖拽锚点（也可拖动）</div>' +
      '<p>该示例演示 draggable / dragHandle / autoFitSize / scrollMode / 生命周期回调。</p>' +
      '<p>当内容较长时，会按 hybrid 规则切换滚动容器。</p>',
    animation: 'fade',
    position: 'center',
    draggable: true,
    dragHandle: ['header', '.drag-anchor'],
    autoFitSize: true,
    scrollMode: 'hybrid',
    hybridSwitchRatio: 1.25,
    confirmText: '确认',
    cancelText: '取消',
    onAfterOpen: () => {
      toast({ title: 'after-open', content: '高级 Modal 已打开', variant: 'info', duration: 1200 })
    },
    onAfterClose: () => {
      toast({ title: 'after-close', content: '高级 Modal 已关闭', variant: 'default', duration: 1200 })
    },
  })
})

let adapterContextReady = false

adapterOpenBtn?.addEventListener('click', () => {
  openDialog({
    title: 'Adapter Dialog',
    content: '<p>通过统一入口打开 Dialog，并带 traceId。</p>',
    traceId: 'trace-example-001',
    onLayoutStable: ({ traceId }) => {
      pushMessage('success', '布局稳定，可初始化第三方组件', {
        traceId,
        duration: 1400,
      })

      if (adapterResult) {
        adapterResult.textContent = `结果输出：onLayoutStable 已触发（traceId=${traceId ?? '-'})`
      }
    },
    onAction: ({ action, traceId }) => {
      if (adapterResult) {
        adapterResult.textContent = `结果输出：action=${action}（traceId=${traceId ?? '-'})`
      }
    },
  })
})

adapterLegacyToggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('legacy-skin')
  const enabled = document.body.classList.contains('legacy-skin')
  if (adapterResult) {
    adapterResult.textContent = `结果输出：legacy-skin ${enabled ? '已启用' : '已关闭'}`
  }
  pushMessage('info', enabled ? '已启用 legacy-skin 兼容主题' : '已关闭 legacy-skin 兼容主题', {
    duration: 1200,
    traceId: 'trace-example-theme-001',
  })
})

adapterEnableContextBtn?.addEventListener('click', () => {
  if (!adapterContextReady) {
    ensureBootstrapIconsLoaded()
    bindDialogContextMenu({
      target: '#adapter-context-board .context-demo-row',
      traceId: 'trace-example-ctx-001',
      items: [
        { id: 'copy', label: '复制', icon: 'bi bi-copy' },
        { id: 'inspect', label: '查看', icon: 'bi bi-eye' },
      ],
      onAction: ({ itemId, triggerElement, traceId }) => {
        const fileName = triggerElement.dataset.fileName ?? '(unknown)'
        if (adapterResult) {
          adapterResult.textContent = `结果输出：adapter-menu ${itemId} -> ${fileName}（traceId=${traceId ?? '-'})`
        }
      },
    })
    adapterContextReady = true
  }

  if (adapterResult) {
    adapterResult.textContent = '结果输出：适配层右键菜单已启用，请在卡片中文件行右键。'
  }
})

confirmBtn?.addEventListener('click', async () => {
  const ok = await confirmModal({
    title: '删除确认',
    content: '<p>确定删除这条记录吗？该操作不可恢复。</p>',
    confirmText: '删除',
    cancelText: '返回',
  })

  toast({
    title: ok ? '已确认' : '已取消',
    content: ok ? '用户确认执行删除。' : '用户取消了删除。',
    variant: ok ? 'danger' : 'info',
    duration: 1800,
  })

  if (modalResult) {
    modalResult.textContent = `结果输出：confirmModal => ${ok ? 'true' : 'false'}`
  }
})

promptBtn?.addEventListener('click', async () => {
  const result = await promptModal({
    title: '请输入标签名',
    placeholder: '例如 release-note',
    validate: (value) => (value.length < 2 ? '至少输入 2 个字符' : true),
  })

  if (result === null) {
    toast({ title: '已取消', content: '你取消了输入。', variant: 'info', duration: 1700 })
    if (modalResult) {
      modalResult.textContent = '结果输出：promptModal => null'
    }
    return
  }

  toast({
    title: '输入完成',
    content: `你输入的是: ${result}`,
    variant: 'success',
    duration: 2200,
  })

  if (modalResult) {
    modalResult.textContent = `结果输出：promptModal => "${result}"`
  }
})

formBtn?.addEventListener('click', async () => {
  const values = await formModal({
    title: '创建发布计划',
    content: '<p>请填写发布信息，用于生成计划卡片。</p>',
    submitText: '创建',
    fields: [
      {
        name: 'title',
        label: '计划标题',
        placeholder: '例如 v0.1.18 发布',
        required: true,
        validate: (value) => (String(value ?? '').length < 4 ? '标题至少 4 个字符' : true),
      },
      {
        name: 'owner',
        label: '负责人',
        placeholder: '例如 Alice',
        required: true,
      },
      {
        name: 'priority',
        label: '优先级',
        type: 'select',
        options: [
          { label: 'P0 - 紧急', value: 'p0' },
          { label: 'P1 - 高', value: 'p1' },
          { label: 'P2 - 常规', value: 'p2' },
        ],
        defaultValue: 'p1',
      },
      {
        name: 'estimate',
        label: '预估工时(小时)',
        type: 'number',
        defaultValue: 6,
        required: true,
      },
      {
        name: 'notes',
        label: '备注',
        type: 'textarea',
        placeholder: '写下本次发布重点...',
        rows: 3,
      },
      {
        name: 'notify',
        label: '发布后通知团队',
        type: 'checkbox',
        defaultValue: true,
      },
    ],
    validate: (formValues) => {
      const estimate = formValues.estimate
      if (typeof estimate === 'number' && estimate > 24) {
        return { estimate: '单次计划建议不超过 24 小时' }
      }
      return true
    },
  })

  if (values === null) {
    toast({ title: '已取消', content: '你取消了表单提交。', variant: 'info', duration: 1600 })
    if (formResult) {
      formResult.textContent = '结果输出：formModal => null'
    }
    return
  }

  toast({
    title: '表单已提交',
    content: `标题: ${String(values.title ?? '')}`,
    variant: 'success',
    duration: 2200,
  })
  if (formResult) {
    formResult.textContent = `结果输出：formModal => ${JSON.stringify(values)}`
  }
})

const offcanvasMinimalBtn = document.querySelector<HTMLButtonElement>('#open-offcanvas-minimal')
const offcanvasBasicBtn = document.querySelector<HTMLButtonElement>('#open-offcanvas-basic')
const offcanvasTopBtn = document.querySelector<HTMLButtonElement>('#open-offcanvas-top')
const offcanvasBottomBtn = document.querySelector<HTMLButtonElement>('#open-offcanvas-bottom')
const offcanvasAdvancedBtn = document.querySelector<HTMLButtonElement>('#open-offcanvas-advanced')

offcanvasMinimalBtn?.addEventListener('click', () => {
  openOffcanvas({
    title: '最小 Offcanvas',
    content: '<p>这是最小可用的 Offcanvas 调用。</p>',
  })
})

offcanvasBasicBtn?.addEventListener('click', () => {
  openOffcanvas({
    title: '系统设置',
    placement: 'end',
    animation: 'slide',
    content: '<p>这里放筛选与配置项。</p>',
    confirmText: '保存',
    cancelText: '关闭',
  })
})

offcanvasTopBtn?.addEventListener('click', () => {
  openOffcanvas({
    title: '顶部通知面板',
    placement: 'top',
    animation: 'fade',
    content: '<p>适合展示全局通知或快捷操作。</p>',
    confirmText: '知道了',
    cancelText: '关闭',
  })
})

offcanvasBottomBtn?.addEventListener('click', () => {
  openOffcanvas({
    title: '底部操作面板',
    placement: 'bottom',
    animation: 'zoom',
    content: '<p>适合移动端的底部操作入口。</p>',
    confirmText: '继续',
    cancelText: '取消',
  })
})

offcanvasAdvancedBtn?.addEventListener('click', () => {
  openOffcanvas({
    id: 'offcanvas-advanced-demo',
    title: '高级 Offcanvas',
    placement: 'start',
    animation: 'slide',
    draggable: true,
    dragHandle: ['header', 'body'],
    autoFitSize: true,
    scrollMode: 'hybrid',
    hybridSwitchRatio: 1.2,
    closeOnBackdrop: true,
    closeOnEsc: true,
    content: '<p>左侧高级面板：支持拖拽、内容自适配和生命周期提示。</p>',
    confirmText: '保存',
    cancelText: '关闭',
    onAfterOpen: () => {
      toast({ title: 'offcanvas', content: '高级 Offcanvas 已打开', variant: 'info', duration: 1200 })
    },
    onAfterClose: () => {
      toast({ title: 'offcanvas', content: '高级 Offcanvas 已关闭', variant: 'default', duration: 1200 })
    },
  })
})

const toastMinimalBtn = document.querySelector<HTMLButtonElement>('#open-toast-minimal')
const toastBasicBtn = document.querySelector<HTMLButtonElement>('#open-toast-basic')
const toastHandleBtn = document.querySelector<HTMLButtonElement>('#open-toast-handle')
const toastQueueBtn = document.querySelector<HTMLButtonElement>('#open-toast-queue')
const toastDupUpdateBtn = document.querySelector<HTMLButtonElement>('#open-toast-dup-update')
const toastDupRestartBtn = document.querySelector<HTMLButtonElement>('#open-toast-dup-restart')
const toastDupStackBtn = document.querySelector<HTMLButtonElement>('#open-toast-dup-stack')
const toastClearBtn = document.querySelector<HTMLButtonElement>('#clear-toast')
const enableContextMenuBtn = document.querySelector<HTMLButtonElement>('#enable-context-menu')
const openContextMenuManualBtn = document.querySelector<HTMLButtonElement>('#open-context-menu-manual')
const updateContextMenuItemsBtn = document.querySelector<HTMLButtonElement>('#update-context-menu-items')
const contextMenuResult = document.querySelector<HTMLDivElement>('#context-menu-result')
const contextDemoBoard = document.querySelector<HTMLElement>('#context-demo-board')

let contextMenuReady = false
let contextMenuAltItems = false
let contextMenuHandle: ReturnType<typeof bindContextMenu> | null = null

const getContextMenuPrimaryItems = (): SoContextMenuItem[] => {
  return [
    {
      id: 'copy',
      label: '复制文件名',
      icon: 'bi bi-copy',
      onClick: ({ triggerElement }) => {
        const fileName = triggerElement.dataset.fileName ?? '(unknown)'
        void navigator.clipboard.writeText(fileName)
      },
    },
    {
      id: 'rename',
      label: '重命名',
      icon: 'bi bi-pencil-square',
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'bi bi-trash',
      iconAriaLabel: 'Delete',
    },
  ]
}

const getContextMenuAltItems = (): SoContextMenuItem[] => {
  return [
    {
      id: 'pin',
      label: '置顶文件',
      icon: 'bi bi-pin-angle',
    },
    {
      id: 'share',
      label: '分享链接',
      icon: 'bi bi-share',
    },
    {
      id: 'inspect',
      label: '查看详情',
      icon: 'bi bi-eye',
    },
  ]
}

const ensureContextMenuReady = () => {
  if (contextMenuReady) {
    return
  }

  ensureBootstrapIconsLoaded()

  contextMenuHandle = bindContextMenu({
    target: '.context-demo-row',
    items: getContextMenuPrimaryItems(),
    closeOnOutsideClick: true,
    closeOnEsc: true,
    closeOnWindowBlur: true,
    closeOnScroll: true,
    closeOnResize: true,
    onAction: ({ itemId, triggerElement }) => {
      const fileName = triggerElement.dataset.fileName ?? '(unknown)'
      if (contextMenuResult) {
        contextMenuResult.textContent = `结果输出：${itemId} -> ${fileName}`
      }
      toast({
        title: 'ContextMenu',
        content: `${itemId} -> ${fileName}`,
        variant: 'info',
        duration: 1200,
      })
    },
    onClose: (reason) => {
      if (contextMenuResult) {
        contextMenuResult.textContent = `结果输出：菜单已关闭（${reason}）`
      }
    },
  })

  contextMenuReady = true
}

toastMinimalBtn?.addEventListener('click', () => {
  toast({
    content: '最小通知示例',
  })
})

toastBasicBtn?.addEventListener('click', () => {
  toast({
    title: '保存成功',
    content: '配置已同步',
    placement: 'top-end',
    variant: 'success',
    duration: 2200,
    maxVisible: 3,
    showProgress: true,
  })
})

toastHandleBtn?.addEventListener('click', () => {
  const handle = toast({
    id: 'manual-toast',
    title: '上传任务',
    content: '准备上传...',
    duration: false,
    closable: true,
    variant: 'info',
  })

  window.setTimeout(() => {
    handle.update({ content: '上传中 65%', variant: 'warning' })
  }, 700)

  window.setTimeout(() => {
    handle.update({ content: '上传完成', variant: 'success', duration: 1200 })
    handle.resume()
  }, 1500)
})

toastQueueBtn?.addEventListener('click', () => {
  SoToast.configure({ maxVisible: 3 })
  for (let index = 1; index <= 6; index += 1) {
    toast({
      title: `队列消息 ${index}`,
      content: `第 ${index} 条示例提醒`,
      placement: 'top-end',
      variant: 'default',
      duration: 1000 + index * 250,
    })
  }
})

toastDupUpdateBtn?.addEventListener('click', () => {
  toast({
    id: 'sync-job',
    title: '同步任务',
    content: '策略: update',
    variant: 'info',
    duration: 1800,
    duplicateStrategy: 'update',
  })
})

toastDupRestartBtn?.addEventListener('click', () => {
  toast({
    id: 'sync-job',
    title: '同步任务',
    content: '策略: restart-timer',
    variant: 'warning',
    duration: 1800,
    duplicateStrategy: 'restart-timer',
  })
})

toastDupStackBtn?.addEventListener('click', () => {
  toast({
    id: 'sync-job',
    title: '同步任务',
    content: '策略: stack',
    variant: 'success',
    duration: 1800,
    duplicateStrategy: 'stack',
  })
})

toastClearBtn?.addEventListener('click', () => {
  SoToast.closeAll()
})

enableContextMenuBtn?.addEventListener('click', () => {
  ensureContextMenuReady()
  if (contextMenuResult) {
    contextMenuResult.textContent = '结果输出：右键任意文件行以触发菜单。'
  }
  toast({
    title: 'ContextMenu 已启用',
    content: '请在下方文件行点击右键。',
    variant: 'success',
    duration: 1500,
  })
})

openContextMenuManualBtn?.addEventListener('click', () => {
  ensureContextMenuReady()
  const trigger = contextDemoBoard?.querySelector<HTMLElement>('.context-demo-row')
  contextMenuHandle?.openAt(320, 240, trigger ?? undefined)
  if (contextMenuResult) {
    contextMenuResult.textContent = '结果输出：已手动在 (320, 240) 打开菜单。'
  }
})

updateContextMenuItemsBtn?.addEventListener('click', () => {
  ensureContextMenuReady()
  contextMenuAltItems = !contextMenuAltItems
  contextMenuHandle?.setItems(contextMenuAltItems ? getContextMenuAltItems() : getContextMenuPrimaryItems())
  if (contextMenuResult) {
    contextMenuResult.textContent = `结果输出：菜单项已切换为${contextMenuAltItems ? '备用组' : '默认组'}。`
  }
  toast({
    title: 'ContextMenu',
    content: contextMenuAltItems ? '已切换为备用菜单项' : '已恢复默认菜单项',
    variant: 'default',
    duration: 1200,
  })
})

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

setupPinnedHeroTop({ adjustSidebarOffset: true })
