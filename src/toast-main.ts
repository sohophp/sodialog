import './lab-style.css'
import { SoToast, pushMessage, toast } from './lib'
import { renderLabHeader, wireCodeCopyButtons } from './lab-shared'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Cannot find #app root element')

app.innerHTML = `
${renderLabHeader('toast', 'Toast Lab', '独立页面展示 Toast 的样式、队列与重复策略。')}
<main class="grid">
  <section class="card">
    <h2>基础消息</h2>
    <div class="row">
      <button class="btn primary" id="toast-info">info</button>
      <button class="btn" id="toast-success">success</button>
      <button class="btn" id="toast-warning">warning</button>
      <button class="btn" id="toast-danger">danger</button>
    </div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="toast-basic-code" type="button">复制代码</button></div>
      <div class="code"><pre id="toast-basic-code">pushMessage('info', '普通提示')
pushMessage('success', '保存成功')
pushMessage('warning', '请注意输入')
pushMessage('danger', '请求失败')</pre></div>
      <p class="note">说明：业务层推荐统一走 pushMessage，便于后续全局策略收敛。</p>
    </details>
  </section>

  <section class="card">
    <h2>队列与重复策略</h2>
    <div class="row">
      <button class="btn primary" id="toast-queue">批量队列</button>
      <button class="btn" id="toast-update">update</button>
      <button class="btn" id="toast-stack">stack</button>
      <button class="btn" id="toast-clear">清空</button>
    </div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="toast-queue-code" type="button">复制代码</button></div>
      <div class="code"><pre id="toast-queue-code">SoToast.configure({ maxVisible: 3 })
for (let index = 1; index &lt;= 6; index += 1) {
  toast({ title: '&#96;队列 \${index}&#96;', content: '&#96;消息 \${index}&#96;', duration: 1000 + index * 180 })
}

toast({ id: 'sync-task', content: '策略 update', duplicateStrategy: 'update' })
toast({ id: 'sync-task', content: '策略 stack', duplicateStrategy: 'stack' })
SoToast.closeAll()</pre></div>
      <p class="note">说明：相同 id 下，update 复用实例，stack 会叠加新实例。</p>
    </details>
  </section>
</main>
`

wireCodeCopyButtons()

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
