import './style.css'
import { openModal, openOffcanvas } from './lib'

type DemoPlacement = 'start' | 'end' | 'top' | 'bottom'
type DemoAnimation = 'slide' | 'fade' | 'zoom'
type DemoModalPosition = 'center' | 'top' | 'bottom'
type DemoDragHandle = 'header' | 'title' | 'body' | 'panel'
type DemoImagePreset = 'small' | 'medium' | 'large' | 'xlarge' | 'tall'
type DemoScrollMode = 'body' | 'viewport' | 'none' | 'hybrid'

function getPresetImage(preset: DemoImagePreset): { src: string; label: string } {
  if (preset === 'small') {
    return { src: 'https://picsum.photos/seed/sod-small/220/120', label: '小图 220x120' }
  }
  if (preset === 'large') {
    return { src: 'https://picsum.photos/seed/sod-large/640/360', label: '大图 640x360' }
  }
  if (preset === 'xlarge') {
    return { src: 'https://picsum.photos/seed/sod-xlarge/1200/760', label: '超大图 1200x760' }
  }
  if (preset === 'tall') {
    return { src: 'https://picsum.photos/seed/sod-tall/300/520', label: '竖图 300x520' }
  }

  return { src: 'https://picsum.photos/seed/sod-medium/360/180', label: '中图 360x180' }
}

function buildMarkdownEditorChildForm(): HTMLElement {
  const wrapper = document.createElement('div')
  wrapper.style.display = 'grid'
  wrapper.style.gap = '0.6rem'

  const titleInput = document.createElement('input')
  titleInput.type = 'text'
  titleInput.placeholder = '文章标题'
  titleInput.style.width = '100%'
  titleInput.style.padding = '0.4rem'

  const modeRow = document.createElement('div')
  modeRow.style.display = 'flex'
  modeRow.style.alignItems = 'center'
  modeRow.style.gap = '0.5rem'

  const modeLabel = document.createElement('label')
  modeLabel.textContent = '显示模式'

  const modeSelect = document.createElement('select')
  modeSelect.style.padding = '0.3rem 0.4rem'

  const editorOnlyOption = document.createElement('option')
  editorOnlyOption.value = 'editor'
  editorOnlyOption.textContent = '仅编辑'

  const splitOption = document.createElement('option')
  splitOption.value = 'split'
  splitOption.textContent = '编辑 + 预览'
  splitOption.selected = true

  modeSelect.append(editorOnlyOption, splitOption)
  modeRow.append(modeLabel, modeSelect)

  const toolbar = document.createElement('div')
  toolbar.style.display = 'flex'
  toolbar.style.gap = '0.5rem'
  toolbar.style.flexWrap = 'wrap'

  const markdownInput = document.createElement('textarea')
  markdownInput.rows = 10
  markdownInput.style.width = '100%'
  markdownInput.style.minHeight = '200px'
  markdownInput.style.border = '1px solid #ced4da'
  markdownInput.style.borderRadius = '0.375rem'
  markdownInput.style.padding = '0.6rem'
  markdownInput.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  markdownInput.style.lineHeight = '1.5'
  markdownInput.value = '# 这里是 Markdown 编辑器\n\n- 支持标题\n- 支持列表\n- 支持 **加粗** / *斜体* / `行内代码`\n\n> 用于演示“含编辑器表单”的自适应与复用行为。'

  const previewWrapper = document.createElement('div')
  previewWrapper.style.display = 'grid'
  previewWrapper.style.gap = '0.4rem'

  const previewLabel = document.createElement('p')
  previewLabel.style.margin = '0.25rem 0 0'
  previewLabel.innerHTML = '<strong>预览</strong>'

  const preview = document.createElement('div')
  preview.style.minHeight = '140px'
  preview.style.border = '1px solid #ced4da'
  preview.style.borderRadius = '0.375rem'
  preview.style.padding = '0.6rem'
  preview.style.background = '#fff'
  preview.style.overflow = 'auto'

  previewWrapper.append(previewLabel, preview)

  const escapeHtml = (text: string) =>
    text
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;')

  const inlineMarkdown = (text: string) =>
    text
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')

  const renderMarkdown = (source: string) => {
    const escaped = escapeHtml(source)
    const lines = escaped.split('\n')
    const html: string[] = []
    let inList = false

    const closeList = () => {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
    }

    for (const line of lines) {
      const trimmed = line.trim()

      if (trimmed.length === 0) {
        closeList()
        html.push('<p style="margin:0.25rem 0;">&nbsp;</p>')
        continue
      }

      if (trimmed.startsWith('# ')) {
        closeList()
        html.push(`<h1 style="margin:0.25rem 0;">${inlineMarkdown(trimmed.slice(2))}</h1>`)
        continue
      }

      if (trimmed.startsWith('## ')) {
        closeList()
        html.push(`<h2 style="margin:0.25rem 0;">${inlineMarkdown(trimmed.slice(3))}</h2>`)
        continue
      }

      if (trimmed.startsWith('### ')) {
        closeList()
        html.push(`<h3 style="margin:0.25rem 0;">${inlineMarkdown(trimmed.slice(4))}</h3>`)
        continue
      }

      if (trimmed.startsWith('- ')) {
        if (!inList) {
          html.push('<ul style="margin:0.25rem 0 0.25rem 1.2rem;">')
          inList = true
        }
        html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`)
        continue
      }

      if (trimmed.startsWith('> ')) {
        closeList()
        html.push(
          `<blockquote style="margin:0.25rem 0;padding-left:0.6rem;border-left:3px solid #ced4da;">${inlineMarkdown(trimmed.slice(2))}</blockquote>`,
        )
        continue
      }

      closeList()
      html.push(`<p style="margin:0.25rem 0;">${inlineMarkdown(trimmed)}</p>`)
    }

    closeList()
    preview.innerHTML = html.join('')
  }

  const insertAtCursor = (snippet: string) => {
    const start = markdownInput.selectionStart
    const end = markdownInput.selectionEnd
    const before = markdownInput.value.slice(0, start)
    const after = markdownInput.value.slice(end)
    markdownInput.value = `${before}${snippet}${after}`
    const nextPos = start + snippet.length
    markdownInput.setSelectionRange(nextPos, nextPos)
    markdownInput.focus()
    renderMarkdown(markdownInput.value)
  }

  const boldButton = document.createElement('button')
  boldButton.type = 'button'
  boldButton.className = 'btn btn-outline'
  boldButton.textContent = '插入加粗'
  boldButton.addEventListener('click', () => insertAtCursor('**粗体文本**'))

  const italicButton = document.createElement('button')
  italicButton.type = 'button'
  italicButton.className = 'btn btn-outline'
  italicButton.textContent = '插入斜体'
  italicButton.addEventListener('click', () => insertAtCursor('*斜体文本*'))

  const listButton = document.createElement('button')
  listButton.type = 'button'
  listButton.className = 'btn btn-outline'
  listButton.textContent = '插入列表'
  listButton.addEventListener('click', () => insertAtCursor('- 列表项\n- 列表项\n'))

  const headingButton = document.createElement('button')
  headingButton.type = 'button'
  headingButton.className = 'btn btn-outline'
  headingButton.textContent = '插入标题'
  headingButton.addEventListener('click', () => insertAtCursor('## 二级标题\n'))

  const updatePreviewMode = () => {
    previewWrapper.style.display = modeSelect.value === 'split' ? 'grid' : 'none'
  }

  markdownInput.addEventListener('input', () => renderMarkdown(markdownInput.value))
  modeSelect.addEventListener('change', updatePreviewMode)
  renderMarkdown(markdownInput.value)
  updatePreviewMode()

  const tip = document.createElement('p')
  tip.style.margin = '0'
  tip.textContent = '该子窗口用于演示 Markdown 编辑器表单的自适应与复用行为。'

  toolbar.append(boldButton, italicButton, listButton, headingButton)
  wrapper.append(titleInput, modeRow, toolbar, markdownInput, previewWrapper, tip)
  return wrapper
}

function buildInteractiveModalContent(modalId: string | undefined, initialPreset: DemoImagePreset): HTMLElement {
  const wrapper = document.createElement('div')

  const desc = document.createElement('p')
  desc.innerHTML = '点击下方图片切换按钮，可观察 <strong>autoFitSize</strong> 自动扩/缩宽高。'

  const presetInfo = document.createElement('p')
  presetInfo.style.marginBottom = '0.5rem'

  const image = document.createElement('img')
  image.alt = 'demo image'
  image.style.display = 'block'
  image.style.maxWidth = '100%'
  image.style.height = 'auto'
  image.style.borderRadius = '0.375rem'

  const presetActions = document.createElement('div')
  presetActions.style.display = 'flex'
  presetActions.style.flexWrap = 'wrap'
  presetActions.style.gap = '0.5rem'
  presetActions.style.margin = '0.75rem 0'

  const applyPreset = (preset: DemoImagePreset) => {
    const imagePreset = getPresetImage(preset)
    image.src = imagePreset.src
    presetInfo.textContent = `当前图片：${imagePreset.label}`
  }

  ;(['small', 'medium', 'large', 'xlarge', 'tall'] as const).forEach((preset) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn btn-outline'
    button.textContent = `切换 ${preset}`
    button.addEventListener('click', () => applyPreset(preset))
    presetActions.append(button)
  })

  const stressTitle = document.createElement('p')
  stressTitle.style.margin = '0.75rem 0 0.5rem'
  stressTitle.innerHTML = '<strong>溢出压力测试</strong>'

  const stressActions = document.createElement('div')
  stressActions.style.display = 'flex'
  stressActions.style.flexWrap = 'wrap'
  stressActions.style.gap = '0.5rem'
  stressActions.style.margin = '0 0 0.75rem'

  const stressContainer = document.createElement('div')

  const longWordButton = document.createElement('button')
  longWordButton.type = 'button'
  longWordButton.className = 'btn btn-outline'
  longWordButton.textContent = '超长单词'
  longWordButton.addEventListener('click', () => {
    const block = document.createElement('p')
    block.textContent =
      'LooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooongWord'
    stressContainer.replaceChildren(block)
  })

  const wideTableButton = document.createElement('button')
  wideTableButton.type = 'button'
  wideTableButton.className = 'btn btn-outline'
  wideTableButton.textContent = '超宽表格'
  wideTableButton.addEventListener('click', () => {
    const table = document.createElement('table')
    table.style.width = '1200px'
    table.style.borderCollapse = 'collapse'

    const headerRow = document.createElement('tr')
    for (let columnIndex = 1; columnIndex <= 8; columnIndex += 1) {
      const th = document.createElement('th')
      th.textContent = `列 ${columnIndex}`
      th.style.border = '1px solid #adb5bd'
      th.style.padding = '0.35rem'
      th.style.background = '#f1f3f5'
      headerRow.append(th)
    }

    table.append(headerRow)

    for (let rowIndex = 1; rowIndex <= 3; rowIndex += 1) {
      const row = document.createElement('tr')
      for (let columnIndex = 1; columnIndex <= 8; columnIndex += 1) {
        const td = document.createElement('td')
        td.textContent = `R${rowIndex}C${columnIndex} 这是用于测试超宽表格的内容`
        td.style.border = '1px solid #ced4da'
        td.style.padding = '0.35rem'
        row.append(td)
      }
      table.append(row)
    }

    stressContainer.replaceChildren(table)
  })

  const clearStressButton = document.createElement('button')
  clearStressButton.type = 'button'
  clearStressButton.className = 'btn btn-outline'
  clearStressButton.textContent = '清空测试内容'
  clearStressButton.addEventListener('click', () => {
    stressContainer.replaceChildren()
  })

  stressActions.append(longWordButton, wideTableButton, clearStressButton)

  const buildChildForm = () => {
    const form = document.createElement('form')
    form.style.display = 'grid'
    form.style.gap = '0.6rem'

    form.innerHTML = `
      <label>姓名<input type="text" name="name" placeholder="输入姓名" style="width:100%;padding:0.4rem;" /></label>
      <label>邮箱<input type="email" name="email" placeholder="you@example.com" style="width:100%;padding:0.4rem;" /></label>
      <label>日期<input type="date" name="date" style="width:100%;padding:0.4rem;" /></label>
      <label>数量<input type="number" name="count" min="1" max="99" value="1" style="width:100%;padding:0.4rem;" /></label>
      <label>类别
        <select name="category" style="width:100%;padding:0.4rem;">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
      </label>
      <label><input type="checkbox" name="agree" /> 同意协议</label>
      <label>备注<textarea name="memo" rows="3" style="width:100%;padding:0.4rem;">用于测试多种表单元素布局</textarea></label>
    `

    const submitHint = document.createElement('p')
    submitHint.style.margin = '0'
    submitHint.textContent = '点击底部确认仅关闭弹窗，此处用于展示表单元素。'
    form.append(submitHint)
    return form
  }

  const childButton = document.createElement('button')
  childButton.type = 'button'
  childButton.className = 'btn btn-primary'
  childButton.textContent = '打开子窗口'
  childButton.addEventListener('click', () => {
    openModal({
      id: modalId ? `${modalId}-child` : undefined,
      title: '子窗口',
      content: buildChildForm(),
      cancelText: '关闭',
      confirmText: '确认',
    })
  })

  const editorChildButton = document.createElement('button')
  editorChildButton.type = 'button'
  editorChildButton.className = 'btn btn-primary'
  editorChildButton.textContent = '打开编辑器子窗口'
  editorChildButton.addEventListener('click', () => {
    openModal({
      id: modalId ? `${modalId}-editor-child` : undefined,
      title: '编辑器子窗口',
      content: buildMarkdownEditorChildForm(),
      cancelText: '关闭',
      confirmText: '保存',
    })
  })

  applyPreset(initialPreset)
  wrapper.append(
    desc,
    presetInfo,
    image,
    presetActions,
    stressTitle,
    stressActions,
    stressContainer,
    childButton,
    editorChildButton,
  )
  return wrapper
}

function renderApp(root: HTMLDivElement) {
  root.innerHTML = ''

  const container = document.createElement('main')
  container.className = 'demo'

  const title = document.createElement('h1')
  title.textContent = 'HTML5 dialog 多功能弹窗'

  const subtitle = document.createElement('p')
  subtitle.className = 'subtitle'
  subtitle.textContent = '模仿 Bootstrap 的 Modal 与 Offcanvas（DOM 由 JavaScript 动态创建）'

  const eventLogSection = document.createElement('section')
  eventLogSection.className = 'event-log'

  const eventLogTitle = document.createElement('h2')
  eventLogTitle.textContent = '事件日志（onCreated / onReused）'

  const eventLogList = document.createElement('ul')
  eventLogList.className = 'event-log-list'

  const appendLog = (eventName: 'onCreated' | 'onReused', id?: string) => {
    const item = document.createElement('li')
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    item.textContent = `${time} | ${eventName} | id: ${id ?? '(undefined)'}`
    eventLogList.prepend(item)

    while (eventLogList.children.length > 12) {
      const last = eventLogList.lastElementChild
      if (!last) {
        break
      }
      eventLogList.removeChild(last)
    }
  }

  eventLogSection.append(eventLogTitle, eventLogList)

  const actions = document.createElement('div')
  actions.className = 'actions'

  const modalSection = document.createElement('section')
  modalSection.className = 'offcanvas-demo'

  const modalTitle = document.createElement('h2')
  modalTitle.textContent = 'Modal 演示（位置 + 动画 + 模态模式）'

  const modalControlRow = document.createElement('div')
  modalControlRow.className = 'animation-row'

  const modalIdLabel = document.createElement('label')
  modalIdLabel.className = 'animation-label'
  modalIdLabel.textContent = 'Modal ID'
  modalIdLabel.setAttribute('for', 'modal-id')

  const modalIdInput = document.createElement('input')
  modalIdInput.id = 'modal-id'
  modalIdInput.className = 'animation-input'
  modalIdInput.placeholder = '留空自动生成；输入后可复用同 ID'

  const modalPositionLabel = document.createElement('label')
  modalPositionLabel.className = 'animation-label'
  modalPositionLabel.textContent = '位置'
  modalPositionLabel.setAttribute('for', 'modal-position')

  const modalPositionSelect = document.createElement('select')
  modalPositionSelect.id = 'modal-position'
  modalPositionSelect.className = 'animation-select'

  ;(['center', 'top', 'bottom'] as const).forEach((position) => {
    const option = document.createElement('option')
    option.value = position
    option.textContent = position
    modalPositionSelect.append(option)
  })

  const modalAnimationLabel = document.createElement('label')
  modalAnimationLabel.className = 'animation-label'
  modalAnimationLabel.textContent = '动画'
  modalAnimationLabel.setAttribute('for', 'modal-animation')

  const modalAnimationSelect = document.createElement('select')
  modalAnimationSelect.id = 'modal-animation'
  modalAnimationSelect.className = 'animation-select'

  ;(['fade', 'zoom', 'slide'] as const).forEach((animation) => {
    const option = document.createElement('option')
    option.value = animation
    option.textContent = animation
    modalAnimationSelect.append(option)
  })
  modalAnimationSelect.value = 'zoom'

  const modalImageLabel = document.createElement('label')
  modalImageLabel.className = 'animation-label'
  modalImageLabel.textContent = '默认图片'
  modalImageLabel.setAttribute('for', 'modal-image')

  const modalImageSelect = document.createElement('select')
  modalImageSelect.id = 'modal-image'
  modalImageSelect.className = 'animation-select'

  ;(['small', 'medium', 'large', 'xlarge', 'tall'] as const).forEach((preset) => {
    const option = document.createElement('option')
    option.value = preset
    option.textContent = preset
    modalImageSelect.append(option)
  })

  modalImageSelect.value = 'medium'

  const modalModeLabel = document.createElement('label')
  modalModeLabel.className = 'check-label'

  const modalModeCheckbox = document.createElement('input')
  modalModeCheckbox.type = 'checkbox'
  modalModeCheckbox.checked = true

  const modalModeText = document.createElement('span')
  modalModeText.textContent = '使用 showModal()'

  modalModeLabel.append(modalModeCheckbox, modalModeText)

  const modalDragLabel = document.createElement('label')
  modalDragLabel.className = 'check-label'

  const modalDragCheckbox = document.createElement('input')
  modalDragCheckbox.type = 'checkbox'

  const modalDragText = document.createElement('span')
  modalDragText.textContent = '允许拖动'

  modalDragLabel.append(modalDragCheckbox, modalDragText)

  const modalAutoFitLabel = document.createElement('label')
  modalAutoFitLabel.className = 'check-label'

  const modalAutoFitCheckbox = document.createElement('input')
  modalAutoFitCheckbox.type = 'checkbox'
  modalAutoFitCheckbox.checked = true

  const modalAutoFitText = document.createElement('span')
  modalAutoFitText.textContent = '自动适配内容尺寸'

  modalAutoFitLabel.append(modalAutoFitCheckbox, modalAutoFitText)

  const modalScrollModeLabel = document.createElement('label')
  modalScrollModeLabel.className = 'animation-label'
  modalScrollModeLabel.textContent = '滚动模式'
  modalScrollModeLabel.setAttribute('for', 'modal-scroll-mode')

  const modalScrollModeSelect = document.createElement('select')
  modalScrollModeSelect.id = 'modal-scroll-mode'
  modalScrollModeSelect.className = 'animation-select'

  ;(['body', 'hybrid', 'viewport', 'none'] as const).forEach((mode) => {
    const option = document.createElement('option')
    option.value = mode
    option.textContent = mode
    modalScrollModeSelect.append(option)
  })

  modalScrollModeSelect.value = 'none'

  const modalHybridRatioLabel = document.createElement('label')
  modalHybridRatioLabel.className = 'animation-label'
  modalHybridRatioLabel.textContent = 'Hybrid 阈值'
  modalHybridRatioLabel.setAttribute('for', 'modal-hybrid-ratio')

  const modalHybridRatioInput = document.createElement('input')
  modalHybridRatioInput.id = 'modal-hybrid-ratio'
  modalHybridRatioInput.className = 'animation-input'
  modalHybridRatioInput.type = 'number'
  modalHybridRatioInput.min = '1'
  modalHybridRatioInput.step = '0.05'
  modalHybridRatioInput.value = '1.35'

  const modalHandleLabel = document.createElement('label')
  modalHandleLabel.className = 'animation-label'
  modalHandleLabel.textContent = '拖动区域'
  modalHandleLabel.setAttribute('for', 'modal-drag-handle')

  const modalHandleSelect = document.createElement('select')
  modalHandleSelect.id = 'modal-drag-handle'
  modalHandleSelect.className = 'animation-select'
  modalHandleSelect.disabled = true

  ;(['header', 'title', 'body', 'panel'] as const).forEach((handle) => {
    const option = document.createElement('option')
    option.value = handle
    option.textContent = handle
    modalHandleSelect.append(option)
  })

  modalDragCheckbox.addEventListener('change', () => {
    modalHandleSelect.disabled = !modalDragCheckbox.checked
  })

  modalAutoFitCheckbox.addEventListener('change', () => {
    modalScrollModeSelect.disabled = !modalAutoFitCheckbox.checked
    modalHybridRatioInput.disabled = !modalAutoFitCheckbox.checked || modalScrollModeSelect.value !== 'hybrid'
  })

  modalScrollModeSelect.addEventListener('change', () => {
    modalHybridRatioInput.disabled = modalScrollModeSelect.value !== 'hybrid' || !modalAutoFitCheckbox.checked
  })

  modalHybridRatioInput.disabled = true

  modalControlRow.append(
    modalPositionLabel,
    modalPositionSelect,
    modalIdLabel,
    modalIdInput,
    modalAnimationLabel,
    modalAnimationSelect,
    modalImageLabel,
    modalImageSelect,
    modalModeLabel,
    modalDragLabel,
    modalAutoFitLabel,
    modalScrollModeLabel,
    modalScrollModeSelect,
    modalHybridRatioLabel,
    modalHybridRatioInput,
    modalHandleLabel,
    modalHandleSelect,
  )

  const modalButton = document.createElement('button')
  modalButton.className = 'btn btn-primary'
  modalButton.textContent = '打开 Modal'
  modalButton.addEventListener('click', () => {
    const position = modalPositionSelect.value as DemoModalPosition
    const animation = modalAnimationSelect.value as DemoAnimation
    const useModal = modalModeCheckbox.checked
    const draggable = modalDragCheckbox.checked
    const dragHandle = modalHandleSelect.value as DemoDragHandle
    const autoFitSize = modalAutoFitCheckbox.checked
    const scrollMode = modalScrollModeSelect.value as DemoScrollMode
    const hybridSwitchRatio = Number(modalHybridRatioInput.value) || 1.35
    const modalId = modalIdInput.value.trim() || undefined
    const imagePreset = modalImageSelect.value as DemoImagePreset
    const contentNode = buildInteractiveModalContent(modalId, imagePreset)

    openModal({
      id: modalId,
      title: '确认删除',
      position,
      animation,
      useModal,
      draggable,
      dragHandle,
      autoFitSize,
      scrollMode,
      hybridSwitchRatio,
      content: contentNode,
      cancelText: '取消',
      confirmText: '删除',
      onCreated: (handle) => appendLog('onCreated', handle.id),
      onReused: (handle) => appendLog('onReused', handle.id),
    })
  })

  actions.append(modalButton)
  modalSection.append(modalTitle, modalControlRow, actions)

  const offcanvasSection = document.createElement('section')
  offcanvasSection.className = 'offcanvas-demo'

  const offcanvasTitle = document.createElement('h2')
  offcanvasTitle.textContent = 'Offcanvas 演示（位置 + 动画）'

  const animationRow = document.createElement('div')
  animationRow.className = 'animation-row'

  const animationLabel = document.createElement('label')
  animationLabel.className = 'animation-label'
  animationLabel.textContent = '动画类型'
  animationLabel.setAttribute('for', 'offcanvas-animation')

  const animationSelect = document.createElement('select')
  animationSelect.id = 'offcanvas-animation'
  animationSelect.className = 'animation-select'

  ;(['slide', 'fade', 'zoom'] as const).forEach((animation) => {
    const option = document.createElement('option')
    option.value = animation
    option.textContent = animation
    animationSelect.append(option)
  })

  animationRow.append(animationLabel, animationSelect)

  const placementActions = document.createElement('div')
  placementActions.className = 'actions placements'

  const openPlacement = (placement: DemoPlacement) => {
    const animation = animationSelect.value as DemoAnimation
    openOffcanvas({
      placement,
      animation,
      title: `Offcanvas - ${placement}`,
      content:
        `<p>位置：<strong>${placement}</strong></p><p>动画：<strong>${animation}</strong></p><ul><li>基于 HTML5 dialog</li><li>动态创建 DOM</li><li>行为接近 Bootstrap Offcanvas</li></ul>`,
      cancelText: '关闭',
      confirmText: '确认',
    })
  }

  ;(['start', 'end', 'top', 'bottom'] as const).forEach((placement) => {
    const button = document.createElement('button')
    button.className = 'btn btn-dark'
    button.textContent = `打开 ${placement}`
    button.addEventListener('click', () => openPlacement(placement))
    placementActions.append(button)
  })

  offcanvasSection.append(offcanvasTitle, animationRow, placementActions)
  container.append(title, subtitle, eventLogSection, modalSection, offcanvasSection)
  root.append(container)
}

const root = document.querySelector<HTMLDivElement>('#app')
if (root) {
  renderApp(root)
}
