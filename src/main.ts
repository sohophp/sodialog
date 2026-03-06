import './style.css'
import { openModal, openOffcanvas } from './lib'

function renderApp(root: HTMLDivElement) {
  root.innerHTML = ''

  const container = document.createElement('main')
  container.className = 'demo'

  const title = document.createElement('h1')
  title.textContent = 'HTML5 dialog 多功能弹窗'

  const subtitle = document.createElement('p')
  subtitle.className = 'subtitle'
  subtitle.textContent = '模仿 Bootstrap 的 Modal 与 Offcanvas（DOM 由 JavaScript 动态创建）'

  const actions = document.createElement('div')
  actions.className = 'actions'

  const modalButton = document.createElement('button')
  modalButton.className = 'btn btn-primary'
  modalButton.textContent = '打开 Modal'
  modalButton.addEventListener('click', () => {
    openModal({
      title: '确认删除',
      content:
        '<p>这是一个基于 HTML5 <strong>dialog</strong> 的 Modal 示例。</p><p>点击背景、关闭按钮或任意操作按钮都可关闭。</p>',
      cancelText: '取消',
      confirmText: '删除',
    })
  })

  const offcanvasButton = document.createElement('button')
  offcanvasButton.className = 'btn btn-dark'
  offcanvasButton.textContent = '打开 Offcanvas'
  offcanvasButton.addEventListener('click', () => {
    openOffcanvas({
      placement: 'end',
      title: '侧边栏菜单',
      content:
        '<p>这是 Offcanvas 示例（右侧滑入）。</p><ul><li>支持背景遮罩</li><li>支持 ESC 关闭</li><li>支持动态注入内容</li></ul>',
      cancelText: '关闭',
      confirmText: '保存',
    })
  })

  actions.append(modalButton, offcanvasButton)
  container.append(title, subtitle, actions)
  root.append(container)
}

const root = document.querySelector<HTMLDivElement>('#app')
if (root) {
  renderApp(root)
}
