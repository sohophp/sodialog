import './lab-style.css'
import { bindContextMenu, configureContextMenu, configureDialog, confirmModal, formModal, openDialog, openModal, promptModal, pushMessage } from './lib'
import { renderLabHeader, wireCodeCopyButtons } from './lab-shared'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Cannot find #app root element')

app.innerHTML = `
${renderLabHeader('modal', 'Modal Lab', '独立页面展示 Modal 常见与进阶用法。')}

<main class="grid">
  <section class="card">
    <h2>基础打开</h2>
    <p>最小参数 + 自定义按钮文案。</p>
    <div class="row"><button class="btn primary" id="modal-basic">运行</button></div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="modal-basic-code" type="button">复制代码</button></div>
      <div class="code"><pre id="modal-basic-code">openModal({
  title: '基础示例',
  content: '&lt;p&gt;这是 Modal Lab 的基础示例。&lt;/p&gt;',
  confirmText: '确认',
  cancelText: '取消',
})</pre></div>
      <p class="note">说明：适合替换传统 alert/confirm 的基础弹窗场景。</p>
    </details>
  </section>

  <section class="card">
    <h2>布局稳定钩子 + trace</h2>
    <p>适合第三方组件初始化时机控制。</p>
    <div class="row"><button class="btn primary" id="modal-stable">运行</button></div>
    <div class="result" id="modal-result">结果输出：等待执行...</div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="modal-stable-code" type="button">复制代码</button></div>
      <div class="code"><pre id="modal-stable-code">openDialog({
  title: '稳定时机示例',
  content: '&lt;p&gt;观察 onLayoutStable 与 action 回调输出。&lt;/p&gt;',
  traceId: 'trace-modal-lab-001',
  onLayoutStable: ({ traceId }) =&gt; {
    pushMessage('success', '布局已稳定', { traceId, duration: 1300 })
  },
  onAction: ({ action, traceId }) =&gt; {
    console.log(action, traceId)
  },
})</pre></div>
      <p class="note">说明：推荐把富文本编辑器/图表初始化放在 onLayoutStable 中。</p>
    </details>
  </section>

  <section class="card">
    <h2>Promise 组合流程</h2>
    <p>confirm + prompt + form 串行。</p>
    <div class="row"><button class="btn primary" id="modal-flow">运行</button></div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="modal-flow-code" type="button">复制代码</button></div>
      <div class="code"><pre id="modal-flow-code">const ok = await confirmModal({ title: '确认', content: '&lt;p&gt;继续执行串行流程？&lt;/p&gt;' })
if (!ok) return

const note = await promptModal({ title: '输入备注', placeholder: '请输入内容' })
if (note === null) return

await formModal({
  title: '补充信息',
  fields: [{ name: 'owner', label: '负责人', required: true }],
})

pushMessage('info', '&#96;流程完成，备注：\${note}&#96;', { duration: 1400, traceId: 'trace-modal-lab-001' })</pre></div>
      <p class="note">说明：该模式适合审批链、删除确认、信息补录等串行交互。</p>
    </details>
  </section>

  <section class="card">
    <h2>全局配置示例</h2>
    <p>通过 configureDialog / configureContextMenu 统一默认行为。</p>
    <div class="row">
      <button class="btn primary" id="modal-config-apply">应用默认配置</button>
      <button class="btn" id="modal-config-open">按默认值打开 Modal</button>
    </div>
    <div class="result" id="modal-config-result">结果输出：等待执行...</div>
    <div class="result" id="modal-menu-zone" tabindex="0">右键这里，观察 context menu 的全局默认行为（Esc 不关闭，最小宽度 220）。</div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="modal-config-code" type="button">复制代码</button></div>
      <div class="code"><pre id="modal-config-code">configureDialog({
  modalDefaults: { footerAlign: 'center', closeOnEsc: false },
})

configureContextMenu({
  closeOnEsc: false,
  minWidth: 220,
})</pre></div>
      <p class="note">说明：配置后无需在每次 open/bind 调用重复传默认参数。</p>
    </details>
  </section>
</main>
`

wireCodeCopyButtons()

document.querySelector<HTMLButtonElement>('#modal-basic')?.addEventListener('click', () => {
  openModal({
    title: '基础示例',
    content: '<p>这是 Modal Lab 的基础示例。</p>',
    confirmText: '确认',
    cancelText: '取消',
  })
})

document.querySelector<HTMLButtonElement>('#modal-stable')?.addEventListener('click', () => {
  const result = document.querySelector<HTMLDivElement>('#modal-result')
  openDialog({
    title: '稳定时机示例',
    content: '<p>观察 onLayoutStable 与 action 回调输出。</p>',
    traceId: 'trace-modal-lab-001',
    onLayoutStable: ({ traceId }) => {
      if (result) result.textContent = `结果输出：onLayoutStable 已触发（traceId=${traceId ?? '-'})`
      pushMessage('success', '布局已稳定', { traceId, duration: 1300 })
    },
    onAction: ({ action, traceId }) => {
      if (result) result.textContent = `结果输出：action=${action}（traceId=${traceId ?? '-'})`
    },
  })
})

document.querySelector<HTMLButtonElement>('#modal-flow')?.addEventListener('click', async () => {
  const ok = await confirmModal({ title: '确认', content: '<p>继续执行串行流程？</p>' })
  if (!ok) return
  const note = await promptModal({ title: '输入备注', placeholder: '请输入内容' })
  if (note === null) return
  await formModal({
    title: '补充信息',
    fields: [{ name: 'owner', label: '负责人', required: true }],
  })
  pushMessage('info', `流程完成，备注：${note}`, { duration: 1400, traceId: 'trace-modal-lab-001' })
})

let menuBound = false
document.querySelector<HTMLButtonElement>('#modal-config-apply')?.addEventListener('click', () => {
  configureDialog({
    modalDefaults: {
      footerAlign: 'center',
      closeOnEsc: false,
    },
  })

  configureContextMenu({
    closeOnEsc: false,
    minWidth: 220,
  })

  if (!menuBound) {
    const zone = document.querySelector<HTMLElement>('#modal-menu-zone')
    if (zone) {
      bindContextMenu({
        target: zone,
        items: [
          {
            id: 'open-via-global',
            label: '打开默认 Modal',
            onClick: () => {
              openModal({
                title: '来自全局配置',
                content: '<p>footerAlign 与 closeOnEsc 已由全局配置接管。</p>',
              })
            },
          },
        ],
      })
      menuBound = true
    }
  }

  const result = document.querySelector<HTMLDivElement>('#modal-config-result')
  if (result) {
    result.textContent = '结果输出：全局配置已应用（Dialog + ContextMenu）'
  }
})

document.querySelector<HTMLButtonElement>('#modal-config-open')?.addEventListener('click', () => {
  openModal({
    title: '默认配置生效验证',
    content: '<p>本次调用未传 footerAlign/closeOnEsc，使用 configureDialog 默认值。</p>',
  })
})
