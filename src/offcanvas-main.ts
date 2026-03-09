import './lab-style.css'
import { openOffcanvas, pushMessage } from './lib'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Cannot find #app root element')

app.innerHTML = `
<header class="hero">
  <h1>Offcanvas Lab</h1>
  <p>独立页面展示 Offcanvas 的位置、动画和交互策略。</p>
  <nav class="nav">
    <a href="./examples.html">Examples Hub</a>
    <a href="./modal.html">Modal Lab</a>
    <a href="./toast.html">Toast Lab</a>
    <a href="./api.html">API</a>
    <a href="./workflow.html">流程页</a>
  </nav>
</header>
<main class="grid">
  <section class="card">
    <h2>位置与动画</h2>
    <div class="row">
      <button class="btn primary" id="open-end">右侧</button>
      <button class="btn" id="open-start">左侧</button>
      <button class="btn" id="open-top">顶部</button>
      <button class="btn" id="open-bottom">底部</button>
    </div>
  </section>

  <section class="card">
    <h2>业务动作示例</h2>
    <p>在 onAfterOpen/onAfterClose 做轻量消息通知。</p>
    <div class="row"><button class="btn primary" id="open-advanced">运行</button></div>
  </section>
</main>
`

const openPanel = (placement: 'start' | 'end' | 'top' | 'bottom') => {
  openOffcanvas({
    title: `Offcanvas ${placement}`,
    placement,
    animation: placement === 'top' || placement === 'bottom' ? 'fade' : 'slide',
    content: `<p>当前位置：${placement}</p>`,
  })
}

document.querySelector<HTMLButtonElement>('#open-end')?.addEventListener('click', () => openPanel('end'))
document.querySelector<HTMLButtonElement>('#open-start')?.addEventListener('click', () => openPanel('start'))
document.querySelector<HTMLButtonElement>('#open-top')?.addEventListener('click', () => openPanel('top'))
document.querySelector<HTMLButtonElement>('#open-bottom')?.addEventListener('click', () => openPanel('bottom'))

document.querySelector<HTMLButtonElement>('#open-advanced')?.addEventListener('click', () => {
  openOffcanvas({
    title: '高级 Offcanvas',
    placement: 'end',
    animation: 'slide',
    draggable: true,
    content: '<p>带生命周期通知。</p>',
    onAfterOpen: () => pushMessage('success', 'Offcanvas 已打开', { duration: 1100 }),
    onAfterClose: () => pushMessage('info', 'Offcanvas 已关闭', { duration: 1100 }),
  })
})
