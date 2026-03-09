import './lab-style.css'
import { renderLabHeader } from './lab-shared'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Cannot find #app root element')

app.innerHTML = `
${renderLabHeader('hub', 'Examples Hub', '每个组件独立一页，页面内再细分示例场景。')}

<main class="grid">
  <section class="card">
    <h2>Modal Lab</h2>
    <p>基础打开、layout-stable、trace、Promise 串行流程。</p>
    <div class="row"><a class="btn primary" href="./modal.html">进入 Modal Lab</a></div>
  </section>

  <section class="card">
    <h2>Offcanvas Lab</h2>
    <p>位置/动画组合与生命周期动作示例。</p>
    <div class="row"><a class="btn primary" href="./offcanvas.html">进入 Offcanvas Lab</a></div>
  </section>

  <section class="card">
    <h2>Toast Lab</h2>
    <p>基础提示、队列、重复策略与清空控制。</p>
    <div class="row"><a class="btn primary" href="./toast.html">进入 Toast Lab</a></div>
  </section>

  <section class="card">
    <h2>ContextMenu Lab</h2>
    <p>基础菜单、关闭策略、键盘交互与菜单触发弹窗时序。</p>
    <div class="row"><a class="btn primary" href="./context-menu.html">进入 ContextMenu Lab</a></div>
  </section>

  <section class="card">
    <h2>Legacy Demo</h2>
    <p>保留原版 Demo 供回归与对比。</p>
    <div class="row"><a class="btn" href="./demo.html">打开原版 Demo</a></div>
  </section>
</main>
`
