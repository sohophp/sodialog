import './lab-style.css'
import { confirmModal, formModal, openDialog, openModal, promptModal, pushMessage } from './lib'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Cannot find #app root element')

app.innerHTML = `
<header class="hero">
  <h1>Modal Lab</h1>
  <p>独立页面展示 Modal 常见与进阶用法。</p>
  <nav class="nav">
    <a href="./examples.html">Examples Hub</a>
    <a href="./offcanvas.html">Offcanvas Lab</a>
    <a href="./toast.html">Toast Lab</a>
    <a href="./api.html">API</a>
    <a href="./workflow.html">流程页</a>
  </nav>
</header>

<main class="grid">
  <section class="card">
    <h2>基础打开</h2>
    <p>最小参数 + 自定义按钮文案。</p>
    <div class="row"><button class="btn primary" id="modal-basic">运行</button></div>
  </section>

  <section class="card">
    <h2>布局稳定钩子 + trace</h2>
    <p>适合第三方组件初始化时机控制。</p>
    <div class="row"><button class="btn primary" id="modal-stable">运行</button></div>
    <div class="result" id="modal-result">结果输出：等待执行...</div>
    <div class="code"><pre>openDialog({ traceId, onLayoutStable, onAction })</pre></div>
  </section>

  <section class="card">
    <h2>Promise 组合流程</h2>
    <p>confirm + prompt + form 串行。</p>
    <div class="row"><button class="btn primary" id="modal-flow">运行</button></div>
  </section>
</main>
`

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
