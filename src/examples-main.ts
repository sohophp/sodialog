import './examples-style.css'
import {
  SoToast,
  confirmModal,
  formModal,
  openModal,
  openOffcanvas,
  promptModal,
  toast,
  type SoToastDuplicateStrategy,
  type SoToastPlacement,
  type SoToastVariant,
} from './lib'

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
          <span class="tag">Examples</span>
        </div>
      </div>
      <nav class="quick-nav">
        <a href="./index.html#quick-start">快速开始</a>
        <a href="./examples.html#modal-example">功能示例</a>
        <a href="./demo.html">原版 Demo</a>
        <a href="./index.html#api">API</a>
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
    <section class="card" id="modal-example">
      <h2>1) Modal 示例</h2>
      <p class="section-lead">适合需要“阻断式确认”的场景，例如删除确认、输入补充信息、表单提交前二次确认。</p>
      <div class="example-grid">
        <article class="example-card">
          <h3>基础打开：<code>openModal</code></h3>
          <p>用于完全自定义内容与按钮行为，适合复杂内容展示。</p>
          <div class="row">
            <button class="btn primary" id="open-modal-basic">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-basic-code" type="button">复制</button>
            <pre id="modal-basic-code"><code>openModal({
  title: '订单确认',
  content: '&lt;p&gt;这是一个基础 Modal 示例。&lt;/p&gt;',
  animation: 'zoom',
  confirmText: '确认',
  cancelText: '取消',
})</code></pre>
          </div>
        </article>

        <article class="example-card">
          <h3>Promise 调用：<code>confirmModal</code> / <code>promptModal</code></h3>
          <p>返回 Promise，天然适合串行流程控制（先确认，再输入）。</p>
          <div class="row">
            <button class="btn primary" id="open-confirm">confirmModal</button>
            <button class="btn secondary" id="open-prompt">promptModal</button>
          </div>
          <div id="modal-result" class="result-box">结果输出：等待执行...</div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-promise-code" type="button">复制</button>
            <pre id="modal-promise-code"><code>const ok = await confirmModal({
  title: '删除确认',
  content: '&lt;p&gt;确定删除当前记录吗？&lt;/p&gt;',
})

const name = await promptModal({
  title: '请输入备注',
  placeholder: '最少 2 个字符',
  validate: (value) => (value.length &lt; 2 ? '至少输入 2 个字符' : true),
})</code></pre>
          </div>
        </article>

        <article class="example-card">
          <h3>表单调用：<code>formModal</code></h3>
          <p>声明式字段配置，适合在同一个弹窗内采集多字段并返回结构化结果。</p>
          <div class="row">
            <button class="btn primary" id="open-form">formModal</button>
          </div>
          <div id="form-result" class="result-box">结果输出：等待执行...</div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-form-code" type="button">复制</button>
            <pre id="modal-form-code"><code>const values = await formModal({
  title: '创建发布计划',
  fields: [
    { name: 'title', label: '标题', required: true },
    { name: 'owner', label: '负责人', required: true },
    {
      name: 'priority',
      label: '优先级',
      type: 'select',
      options: [
        { label: 'P0', value: 'p0' },
        { label: 'P1', value: 'p1' },
      ],
    },
    { name: 'notify', label: '通知团队', type: 'checkbox', defaultValue: true },
  ],
})</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="card" id="offcanvas-example">
      <h2>2) Offcanvas 示例</h2>
      <p class="section-lead">适合“边缘进入”的非阻断信息面板，例如筛选器、设置抽屉、详情补充信息。</p>
      <div class="example-grid">
        <article class="example-card">
          <h3>参数化演示：位置 + 动画</h3>
          <p>在一个调用中切换 placement 和 animation，快速验证 UI 动线。</p>
          <div class="row">
            <label for="off-placement">位置</label>
            <select id="off-placement">
              <option value="start">start</option>
              <option value="end" selected>end</option>
              <option value="top">top</option>
              <option value="bottom">bottom</option>
            </select>
            <label for="off-animation">动画</label>
            <select id="off-animation">
              <option value="slide" selected>slide</option>
              <option value="fade">fade</option>
              <option value="zoom">zoom</option>
            </select>
            <button class="btn primary" id="open-offcanvas">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-code" type="button">复制</button>
            <pre id="offcanvas-code"><code>openOffcanvas({
  title: '系统设置',
  placement: 'end',
  animation: 'slide',
  content: '&lt;p&gt;这里放筛选与配置项。&lt;/p&gt;',
  confirmText: '保存',
  cancelText: '关闭',
})</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="card" id="toast-example">
      <h2>3) Toast 示例</h2>
      <p class="section-lead">适合全局轻提示与状态反馈，支持位置、队列、重复策略、自动消失和进度条。</p>
      <div class="example-grid">
        <article class="example-card">
          <h3>基础通知</h3>
          <p>可选位置、类型、持续时间，快速覆盖大部分提醒场景。</p>
          <div class="row">
            <label for="toast-placement">位置</label>
            <select id="toast-placement">
              <option value="top-start">top-start</option>
              <option value="top-center">top-center</option>
              <option value="top-end" selected>top-end</option>
              <option value="bottom-start">bottom-start</option>
              <option value="bottom-center">bottom-center</option>
              <option value="bottom-end">bottom-end</option>
            </select>
            <label for="toast-variant">类型</label>
            <select id="toast-variant">
              <option value="default">default</option>
              <option value="info">info</option>
              <option value="success" selected>success</option>
              <option value="warning">warning</option>
              <option value="danger">danger</option>
            </select>
            <label for="toast-duration">时长(ms)</label>
            <input id="toast-duration" type="number" min="0" step="100" value="2200" />
            <button class="btn primary" id="open-toast">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-code" type="button">复制</button>
            <pre id="toast-code"><code>toast({
  title: '保存成功',
  content: '配置已同步',
  placement: 'top-end',
  variant: 'success',
  duration: 2200,
  maxVisible: 3,
})</code></pre>
          </div>
        </article>

        <article class="example-card">
          <h3>队列与重复策略</h3>
          <p>演示并发上限、批量排队与同 ID 重复触发策略。</p>
          <div class="row">
            <label for="toast-dup">重复策略</label>
            <select id="toast-dup">
              <option value="update" selected>update</option>
              <option value="ignore">ignore</option>
              <option value="restart-timer">restart-timer</option>
              <option value="stack">stack</option>
            </select>
            <button class="btn primary" id="open-toast-queue">批量队列</button>
            <button class="btn secondary" id="open-toast-duplicate">同 ID 重复触发</button>
            <button class="btn secondary" id="clear-toast">清空 Toast</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-dup-code" type="button">复制</button>
            <pre id="toast-dup-code"><code>toast({
  id: 'sync-job',
  content: '正在同步',
  duplicateStrategy: 'restart-timer',
  duration: 1800,
})</code></pre>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>SoDialog · GitHub Pages 首页</p>
  </footer>
`

const modalBtn = document.querySelector<HTMLButtonElement>('#open-modal-basic')
const confirmBtn = document.querySelector<HTMLButtonElement>('#open-confirm')
const promptBtn = document.querySelector<HTMLButtonElement>('#open-prompt')
const formBtn = document.querySelector<HTMLButtonElement>('#open-form')
const modalResult = document.querySelector<HTMLDivElement>('#modal-result')
const formResult = document.querySelector<HTMLDivElement>('#form-result')

modalBtn?.addEventListener('click', () => {
  openModal({
    title: '订单确认',
    content: '<p>这是一个基础 Modal 示例，支持自定义内容和按钮。</p>',
    animation: 'zoom',
    confirmText: '确认',
    cancelText: '取消',
  })
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

const offcanvasBtn = document.querySelector<HTMLButtonElement>('#open-offcanvas')
const offPlacement = document.querySelector<HTMLSelectElement>('#off-placement')
const offAnimation = document.querySelector<HTMLSelectElement>('#off-animation')

offcanvasBtn?.addEventListener('click', () => {
  const placement = offPlacement?.value ?? 'end'
  const animation = offAnimation?.value ?? 'slide'
  openOffcanvas({
    title: `Offcanvas (${placement})`,
    placement: placement as 'start' | 'end' | 'top' | 'bottom',
    animation: animation as 'slide' | 'fade' | 'zoom',
    content: `<p>当前位置: <strong>${placement}</strong></p><p>当前动画: <strong>${animation}</strong></p>`,
    confirmText: '保存',
    cancelText: '关闭',
  })
})

const toastBtn = document.querySelector<HTMLButtonElement>('#open-toast')
const toastQueueBtn = document.querySelector<HTMLButtonElement>('#open-toast-queue')
const toastDupBtn = document.querySelector<HTMLButtonElement>('#open-toast-duplicate')
const toastClearBtn = document.querySelector<HTMLButtonElement>('#clear-toast')
const toastPlacement = document.querySelector<HTMLSelectElement>('#toast-placement')
const toastVariant = document.querySelector<HTMLSelectElement>('#toast-variant')
const toastDuration = document.querySelector<HTMLInputElement>('#toast-duration')
const toastDupStrategy = document.querySelector<HTMLSelectElement>('#toast-dup')

toastBtn?.addEventListener('click', () => {
  const placement = (toastPlacement?.value ?? 'top-end') as SoToastPlacement
  const variant = (toastVariant?.value ?? 'success') as SoToastVariant
  toast({
    title: '通知示例',
    content: `位置 ${placement}，类型 ${variant}`,
    placement,
    variant,
    duration: Number(toastDuration?.value || '2200') || 2200,
    maxVisible: 3,
    showProgress: true,
  })
})

toastQueueBtn?.addEventListener('click', () => {
  const placement = (toastPlacement?.value ?? 'top-end') as SoToastPlacement
  SoToast.configure({ maxVisible: 3 })
  for (let index = 1; index <= 6; index += 1) {
    toast({
      title: `队列消息 ${index}`,
      content: `第 ${index} 条示例提醒`,
      placement,
      variant: 'default',
      duration: 1000 + index * 250,
    })
  }
})

toastDupBtn?.addEventListener('click', () => {
  const strategy = (toastDupStrategy?.value ?? 'update') as SoToastDuplicateStrategy
  toast({
    id: 'sync-job',
    title: '同步任务',
    content: `策略: ${strategy}`,
    duplicateStrategy: strategy,
    duration: 1800,
    variant: 'info',
  })
})

toastClearBtn?.addEventListener('click', () => {
  SoToast.closeAll()
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
