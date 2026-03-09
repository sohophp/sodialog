import './lab-style.css'
import { bindContextMenu, openDialogFromContextMenu, openModal, pushMessage } from './lib'
import { renderLabHeader, wireCodeCopyButtons } from './lab-shared'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Cannot find #app root element')

app.innerHTML = `
${renderLabHeader('context-menu', 'ContextMenu Lab', '独立页面展示 ContextMenu 的基础绑定、关闭策略和菜单触发弹窗时序。')}

<main class="grid">
  <section class="card">
    <h2>基础右键菜单</h2>
    <p>右键目标区域，触发基础菜单动作。</p>
    <div class="result" id="cm-basic-zone" tabindex="0">右键此区域（基础菜单）</div>
    <div class="result" id="cm-basic-result">结果输出：等待执行...</div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="cm-basic-code" type="button">复制代码</button></div>
      <div class="code"><pre id="cm-basic-code">bindContextMenu({
  target: '#cm-basic-zone',
  items: [
    { id: 'copy', label: '复制' },
    { id: 'rename', label: '重命名' },
  ],
  onAction: ({ itemId }) => console.log(itemId),
})</pre></div>
      <p class="note">说明：支持字符串选择器、单元素和元素集合绑定。</p>
    </details>
  </section>

  <section class="card">
    <h2>关闭策略与键盘交互</h2>
    <p>验证 Esc、滚动、窗口失焦等关闭路径；并观察方向键与字母快速定位（支持混合标签）。</p>
    <div class="result" id="cm-policy-zone" tabindex="0">右键此区域后，按 ArrowUp/ArrowDown，或按 d/r 定位；连续按 d 会在 Download/Delete 间轮转</div>
    <div class="result" id="cm-policy-focus-result">焦点定位：等待菜单打开...</div>
    <div class="result" id="cm-policy-action-result">最近动作：等待触发...</div>
    <div class="result" id="cm-policy-close-result">关闭原因：等待关闭...</div>
    <div class="row"><button class="btn" id="cm-open-modal">打开普通 Modal（对比入口）</button></div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="cm-policy-code" type="button">复制代码</button></div>
      <div class="code"><pre id="cm-policy-code">bindContextMenu({
  target: '#cm-policy-zone',
  closeOnEsc: true,
  closeOnScroll: true,
  closeOnWindowBlur: true,
  items: [
    { id: 'download', label: '下载 Download' },
    { id: 'rename', label: '重命名 Rename' },
    { id: 'delete', label: '删除 Delete' },
  ],
  onOpen: (handle) => {
    // 监听焦点定位回显
    handle.element.addEventListener('sod:context-menu-focus-item', (event) => {
      console.log(event.detail)
    })
  },
  onClose: (reason) => {
    console.log('close reason', reason)
  },
})</pre></div>
      <p class="note">说明：当前支持 ArrowUp/ArrowDown/Home/End/Tab 导航，Enter/Space 激活；字母定位支持混合标签（如 删除 Delete），并在匹配项间循环。回显区会显示 focus/action/close reason。</p>
    </details>
  </section>

  <section class="card">
    <h2>菜单触发弹窗（close-first）</h2>
    <p>先关闭菜单再打开 Dialog，避免焦点和层级冲突。</p>
    <div class="result" id="cm-dialog-zone" tabindex="0">右键此区域（菜单触发弹窗）</div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="cm-dialog-code" type="button">复制代码</button></div>
      <div class="code"><pre id="cm-dialog-code">const handle = bindContextMenu({
  target: '#cm-dialog-zone',
  items: [{
    id: 'open-dialog',
    label: '打开确认弹窗',
    onClick: () => {
      openDialogFromContextMenu(handle, {
        title: '来自 ContextMenu',
        content: '已执行 close-first-open-next。',
      })
    },
  }],
})</pre></div>
      <p class="note">说明：推荐通过 openDialogFromContextMenu 统一时序。</p>
    </details>
  </section>
</main>
`

wireCodeCopyButtons()

const basicResult = document.querySelector<HTMLDivElement>('#cm-basic-result')

bindContextMenu({
  target: '#cm-basic-zone',
  items: [
    { id: 'copy', label: '复制' },
    { id: 'rename', label: '重命名' },
  ],
  onAction: ({ itemId }) => {
    if (basicResult) {
      basicResult.textContent = `结果输出：执行 action=${itemId}`
    }
    pushMessage('success', `已执行 ${itemId}`, { duration: 1100 })
  },
})

bindContextMenu({
  target: '#cm-policy-zone',
  closeOnEsc: true,
  closeOnScroll: true,
  closeOnWindowBlur: true,
  items: [
    { id: 'download', label: '下载 Download' },
    { id: 'rename', label: '重命名 Rename' },
    { id: 'delete', label: '删除 Delete' },
  ],
  onOpen: (handle) => {
    const focusResult = document.querySelector<HTMLDivElement>('#cm-policy-focus-result')
    if (focusResult) {
      focusResult.textContent = '焦点定位：菜单已打开，使用方向键或字母进行定位。'
    }

    handle.element.addEventListener('sod:context-menu-focus-item', (event: Event) => {
      const customEvent = event as CustomEvent<{ itemId?: string; label?: string }>
      const itemId = customEvent.detail?.itemId ?? '-'
      const label = customEvent.detail?.label ?? '-'
      if (focusResult) {
        focusResult.textContent = `焦点定位：${itemId} (${label})`
      }
    })
  },
  onAction: ({ itemId }) => {
    const actionResult = document.querySelector<HTMLDivElement>('#cm-policy-action-result')
    if (actionResult) {
      actionResult.textContent = `最近动作：${itemId}`
    }
    pushMessage('warning', `已触发动作: ${itemId}`, { duration: 1200 })
  },
  onClose: (reason) => {
    const closeResult = document.querySelector<HTMLDivElement>('#cm-policy-close-result')
    if (closeResult) {
      closeResult.textContent = `关闭原因：${reason}`
    }
  },
})

document.querySelector<HTMLButtonElement>('#cm-open-modal')?.addEventListener('click', () => {
  openModal({
    title: '普通入口 Modal',
    content: '<p>用于与 ContextMenu 入口对比。</p>',
  })
})

let dialogHandleRef: ReturnType<typeof bindContextMenu> | null = null
dialogHandleRef = bindContextMenu({
  target: '#cm-dialog-zone',
  items: [
    {
      id: 'open-dialog',
      label: '打开确认弹窗',
      onClick: () => {
        if (!dialogHandleRef) {
          return
        }
        openDialogFromContextMenu(dialogHandleRef, {
          title: '来自 ContextMenu',
          content: '<p>已执行 close-first-open-next。</p>',
        })
      },
    },
  ],
})
