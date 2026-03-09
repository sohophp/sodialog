import './lab-style.css'
import { SoToast, pushMessage, toast } from './lib'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Cannot find #app root element')

app.innerHTML = `
<header class="hero">
  <h1>Toast Lab</h1>
  <p>独立页面展示 Toast 的样式、队列与重复策略。</p>
  <nav class="nav">
    <a href="./examples.html">Examples Hub</a>
    <a href="./modal.html">Modal Lab</a>
    <a href="./offcanvas.html">Offcanvas Lab</a>
    <a href="./api.html">API</a>
    <a href="./workflow.html">流程页</a>
  </nav>
</header>
<main class="grid">
  <section class="card">
    <h2>基础消息</h2>
    <div class="row">
      <button class="btn primary" id="toast-info">info</button>
      <button class="btn" id="toast-success">success</button>
      <button class="btn" id="toast-warning">warning</button>
      <button class="btn" id="toast-danger">danger</button>
    </div>
  </section>

  <section class="card">
    <h2>队列与重复策略</h2>
    <div class="row">
      <button class="btn primary" id="toast-queue">批量队列</button>
      <button class="btn" id="toast-update">update</button>
      <button class="btn" id="toast-stack">stack</button>
      <button class="btn" id="toast-clear">清空</button>
    </div>
  </section>
</main>
`

document.querySelector<HTMLButtonElement>('#toast-info')?.addEventListener('click', () => pushMessage('info', '普通提示'))
document.querySelector<HTMLButtonElement>('#toast-success')?.addEventListener('click', () => pushMessage('success', '保存成功'))
document.querySelector<HTMLButtonElement>('#toast-warning')?.addEventListener('click', () => pushMessage('warning', '请注意输入'))
document.querySelector<HTMLButtonElement>('#toast-danger')?.addEventListener('click', () => pushMessage('danger', '请求失败'))

document.querySelector<HTMLButtonElement>('#toast-queue')?.addEventListener('click', () => {
  SoToast.configure({ maxVisible: 3 })
  for (let index = 1; index <= 6; index += 1) {
    toast({ title: `队列 ${index}`, content: `消息 ${index}`, duration: 1000 + index * 180 })
  }
})

document.querySelector<HTMLButtonElement>('#toast-update')?.addEventListener('click', () => {
  toast({ id: 'sync-task', title: '同步任务', content: '策略 update', duplicateStrategy: 'update', variant: 'info', duration: 1600 })
})

document.querySelector<HTMLButtonElement>('#toast-stack')?.addEventListener('click', () => {
  toast({ id: 'sync-task', title: '同步任务', content: '策略 stack', duplicateStrategy: 'stack', variant: 'success', duration: 1600 })
})

document.querySelector<HTMLButtonElement>('#toast-clear')?.addEventListener('click', () => {
  SoToast.closeAll()
})
