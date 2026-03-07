import './sodialog.css'

export type SoPanelKind = 'modal' | 'offcanvas'
export type SoOffcanvasPlacement = 'start' | 'end' | 'top' | 'bottom'
export type SoOffcanvasAnimation = 'slide' | 'fade' | 'zoom'
export type SoModalPosition = 'center' | 'top' | 'bottom'
export type SoModalAnimation = 'slide' | 'fade' | 'zoom'
export type SoModalDragHandleTarget = 'header' | 'title' | 'body' | 'panel' | string
export type SoModalDragHandle = SoModalDragHandleTarget | SoModalDragHandleTarget[]
export type SoModalScrollMode = 'body' | 'viewport' | 'none' | 'hybrid'
export type SoFooterButtonVariant = 'primary' | 'outline' | 'danger' | 'success' | 'ghost' | 'link'
export type SoFooterAlign = 'start' | 'center' | 'end' | 'between'
export type SoFooterButtonAction = 'none' | 'hide' | 'destroy'

export interface SoDialogFooterButton {
  id?: string
  label: string | Node
  role?: 'confirm' | 'cancel' | 'custom'
  variant?: SoFooterButtonVariant
  className?: string
  action?: SoFooterButtonAction
  disabled?: boolean
  attrs?: Record<string, string>
  onClick?: (context: SoDialogFooterActionContext) => void | boolean | Promise<void | boolean>
}

export interface SoDialogBaseOptions {
  title: string
  content: string | Node
  confirmText?: string
  cancelText?: string
  confirmAction?: 'hide' | 'destroy'
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  footerButtons?: SoDialogFooterButton[]
  hideFooter?: boolean
  footerAlign?: SoFooterAlign
  onAction?: SoDialogActionListener
}

export interface SoDialogModalOptions extends SoDialogBaseOptions {
  id?: string
  kind?: 'modal'
  position?: SoModalPosition
  animation?: SoModalAnimation
  useModal?: boolean
  draggable?: boolean
  dragHandle?: SoModalDragHandle
  autoFitSize?: boolean
  scrollMode?: SoModalScrollMode
  hybridSwitchRatio?: number
  autoFitUseScrollbar?: boolean
  refitOnContentChange?: boolean
  autoFitMinWidth?: number
  autoFitMinHeight?: number
  onCreated?: (handle: SoDialogHandle) => void
  onReused?: (handle: SoDialogHandle) => void
}

export interface SoDialogOffcanvasOptions extends SoDialogBaseOptions {
  kind: 'offcanvas'
  placement?: SoOffcanvasPlacement
  animation?: SoOffcanvasAnimation
}

export type SoDialogOptions = SoDialogModalOptions | SoDialogOffcanvasOptions

export interface SoDialogHandle {
  dialog: HTMLDialogElement
  close: () => void
  refit: () => void
  setFooterButtons: (buttons: SoDialogFooterButton[]) => void
  updateFooterButton: (id: string, updates: Partial<SoDialogFooterButton>) => boolean
  onAction: (listener: SoDialogActionListener) => () => void
  id?: string
}

export interface SoDialogFooterActionContext {
  action: string
  button: SoDialogFooterButton
  buttonElement: HTMLButtonElement
  dialog: HTMLDialogElement
  event: MouseEvent
  handle: SoDialogHandle
}

export type SoDialogActionListener = (context: SoDialogFooterActionContext) => void

function appendContent(container: HTMLElement, content: string | Node): void {
  if (typeof content === 'string') {
    container.innerHTML = content
    return
  }

  container.append(content)
}

function closeDialog(dialog: HTMLDialogElement, action: 'hide' | 'destroy' = 'hide'): void {
  if (action === 'destroy') {
    dialog.dataset.sodDestroy = 'true'
    if (dialog.open) {
      dialog.close()
    }
    dialog.remove()
    return
  }

  if (dialog.open) {
    dialog.close()
  }
}

function resolveFooterAction(
  button: SoDialogFooterButton,
  fallbackConfirmAction: 'hide' | 'destroy',
): SoFooterButtonAction {
  if (button.action) {
    return button.action
  }

  if (button.role === 'confirm') {
    return fallbackConfirmAction
  }

  if (button.role === 'cancel') {
    return 'hide'
  }

  return 'none'
}

function resolveFooterButtonClass(variant: SoFooterButtonVariant | undefined): string {
  if (variant === 'danger') {
    return 'sod-btn-danger'
  }
  if (variant === 'success') {
    return 'sod-btn-success'
  }
  if (variant === 'ghost') {
    return 'sod-btn-ghost'
  }
  if (variant === 'link') {
    return 'sod-btn-link'
  }
  if (variant === 'outline') {
    return 'sod-btn-outline'
  }

  return 'sod-btn-primary'
}

function resolveDragHandles(panel: HTMLElement, dragHandle: SoModalDragHandle | undefined): HTMLElement[] {
  const keys = Array.isArray(dragHandle)
    ? dragHandle.length > 0
      ? dragHandle
      : ['header']
    : [dragHandle ?? 'header']
  const handles: HTMLElement[] = []

  const pushUnique = (element: HTMLElement | null) => {
    if (!element) {
      return
    }
    if (!handles.includes(element)) {
      handles.push(element)
    }
  }

  for (const key of keys) {
    if (key === 'panel') {
      pushUnique(panel)
      continue
    }
    if (key === 'header') {
      pushUnique(panel.querySelector<HTMLElement>('.sod-header'))
      continue
    }
    if (key === 'title') {
      pushUnique(panel.querySelector<HTMLElement>('.sod-title'))
      continue
    }
    if (key === 'body') {
      pushUnique(panel.querySelector<HTMLElement>('.sod-body'))
      continue
    }

    panel.querySelectorAll<HTMLElement>(key).forEach((element) => {
      pushUnique(element)
    })
  }

  if (handles.length === 0) {
    pushUnique(panel.querySelector<HTMLElement>('.sod-header'))
  }

  return handles
}

function enableModalDrag(panel: HTMLElement, dragHandle: SoModalDragHandle | undefined): void {
  const handles = resolveDragHandles(panel, dragHandle)
  if (handles.length === 0) {
    return
  }

  panel.classList.add('sod-modal-draggable')
  handles.forEach((handle) => {
    handle.classList.add('sod-drag-handle')
  })

  let dragging = false
  let offsetX = 0
  let offsetY = 0
  let activePointerId: number | null = null
  let activeHandle: HTMLElement | null = null
  let rafId = 0
  let pendingLeft = 0
  let pendingTop = 0
  const previousBodyUserSelect = document.body.style.userSelect

  const clampPosition = (left: number, top: number) => {
    const rect = panel.getBoundingClientRect()
    const maxLeft = Math.max(0, window.innerWidth - rect.width)
    const maxTop = Math.max(0, window.innerHeight - rect.height)

    const minLeft = Math.min(0, window.innerWidth - rect.width)
    const minTop = Math.min(0, window.innerHeight - rect.height)

    return {
      left: Math.min(maxLeft, Math.max(minLeft, left)),
      top: Math.min(maxTop, Math.max(minTop, top)),
    }
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) {
      return
    }

    const next = clampPosition(event.clientX - offsetX, event.clientY - offsetY)
    pendingLeft = next.left
    pendingTop = next.top

    if (rafId !== 0) {
      return
    }

    rafId = window.requestAnimationFrame(() => {
      rafId = 0
      panel.style.inset = 'auto'
      panel.style.left = `${pendingLeft}px`
      panel.style.top = `${pendingTop}px`
      panel.style.right = 'auto'
      panel.style.bottom = 'auto'
      panel.style.margin = '0'
      panel.style.transform = 'none'
    })
  }

  const onPointerUp = () => {
    dragging = false
    handles.forEach((handle) => {
      handle.classList.remove('is-dragging')
    })
    panel.classList.remove('sod-is-dragging')
    panel.style.willChange = ''
    document.body.style.userSelect = previousBodyUserSelect

    if (rafId !== 0) {
      window.cancelAnimationFrame(rafId)
      rafId = 0
    }

    if (
      activePointerId !== null &&
      activeHandle !== null &&
      activeHandle.hasPointerCapture &&
      activeHandle.hasPointerCapture(activePointerId)
    ) {
      activeHandle.releasePointerCapture(activePointerId)
    }
    activePointerId = null
    activeHandle = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
  }

  handles.forEach((handle) => {
    handle.addEventListener('pointerdown', (event: PointerEvent) => {
      if (event.button !== 0) {
        return
      }

      const target = event.target as HTMLElement | null
      if (target?.closest('button, input, select, textarea, a')) {
        return
      }

      event.preventDefault()
      panel.classList.add('sod-is-dragging')
      panel.style.animation = 'none'
      panel.style.transition = 'none'
      panel.style.transform = 'none'

      const rect = panel.getBoundingClientRect()
      offsetX = event.clientX - rect.left
      offsetY = event.clientY - rect.top
      dragging = true
      activePointerId = event.pointerId
      activeHandle = handle

      handle.setPointerCapture(event.pointerId)

      panel.style.position = 'fixed'
      panel.style.left = `${rect.left}px`
      panel.style.top = `${rect.top}px`
      panel.style.width = `${Math.round(rect.width)}px`
      panel.style.height = `${Math.round(rect.height)}px`
      panel.style.inset = 'auto'
      panel.style.right = 'auto'
      panel.style.bottom = 'auto'
      panel.style.margin = '0'
      panel.style.willChange = 'left, top'
      handle.classList.add('is-dragging')
      document.body.style.userSelect = 'none'

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
    })
  })
}

function setupModalAutoFit(
  dialog: HTMLDialogElement,
  panel: HTMLElement,
  header: HTMLElement,
  body: HTMLElement,
  footer: HTMLElement,
  options?: Pick<
    SoDialogModalOptions,
    | 'autoFitMinWidth'
    | 'autoFitMinHeight'
    | 'autoFitUseScrollbar'
    | 'scrollMode'
    | 'hybridSwitchRatio'
    | 'refitOnContentChange'
  >,
): () => void {
  const VIEWPORT_PADDING = 16
  const hybridSwitchRatio = Math.max(1, options?.hybridSwitchRatio ?? 1.35)
  const refitOnContentChange = options?.refitOnContentChange ?? true
  const MIN_WIDTH = Math.max(120, options?.autoFitMinWidth ?? 280)
  const MIN_HEIGHT = Math.max(100, options?.autoFitMinHeight ?? 160)
  const resolvedScrollMode: SoModalScrollMode = options?.scrollMode
    ? options.scrollMode
    : options?.autoFitUseScrollbar === false
      ? 'viewport'
      : 'body'
  let rafId = 0

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(max, Math.max(min, value))
  }

  const applyFit = () => {
    rafId = 0

    if (!dialog.isConnected || !dialog.open) {
      return
    }

    const maxWidth = Math.max(MIN_WIDTH, window.innerWidth - VIEWPORT_PADDING * 2)
    const maxHeight = Math.max(MIN_HEIGHT, window.innerHeight - VIEWPORT_PADDING * 2)

    panel.style.width = 'auto'
    panel.style.height = 'auto'
    panel.style.maxHeight = 'none'
    body.style.maxHeight = 'none'
    body.style.overflowY = 'visible'
    body.style.overflowX = 'visible'

    const naturalWidth = Math.ceil(panel.scrollWidth)
    const naturalHeight = Math.ceil(panel.scrollHeight)

    const needHorizontalOverflow = naturalWidth > maxWidth
    const needVerticalOverflow = naturalHeight > maxHeight

    if (resolvedScrollMode === 'body') {
      const targetWidth = clamp(naturalWidth, MIN_WIDTH, maxWidth)
      const targetHeight = clamp(naturalHeight, MIN_HEIGHT, maxHeight)
      panel.style.width = `${targetWidth}px`
      panel.style.maxWidth = `${maxWidth}px`
      panel.style.height = `${targetHeight}px`
      panel.style.maxHeight = `${maxHeight}px`

      const headerHeight = header.offsetHeight
      const footerHeight = footer.offsetHeight
      const bodyMaxHeight = Math.max(64, targetHeight - headerHeight - footerHeight)

      if (needVerticalOverflow) {
        body.style.maxHeight = `${bodyMaxHeight}px`
        body.style.overflowY = 'auto'
      } else {
        body.style.maxHeight = 'none'
        body.style.overflowY = 'hidden'
      }

      body.style.overflowX = needHorizontalOverflow ? 'auto' : 'hidden'
      dialog.classList.remove('sod-modal-viewport-scroll')
    } else if (resolvedScrollMode === 'hybrid') {
      const useViewport = naturalHeight > maxHeight * hybridSwitchRatio

      if (useViewport) {
        const targetWidth = Math.max(naturalWidth, MIN_WIDTH)
        const targetHeight = Math.max(naturalHeight, MIN_HEIGHT)
        panel.style.width = `${targetWidth}px`
        panel.style.maxWidth = 'none'
        panel.style.height = `${targetHeight}px`
        panel.style.maxHeight = 'none'
        body.style.maxHeight = 'none'
        body.style.overflowY = 'visible'
        body.style.overflowX = 'visible'
        dialog.classList.add('sod-modal-viewport-scroll')
      } else {
        const targetWidth = clamp(naturalWidth, MIN_WIDTH, maxWidth)
        const targetHeight = clamp(naturalHeight, MIN_HEIGHT, maxHeight)
        panel.style.width = `${targetWidth}px`
        panel.style.maxWidth = `${maxWidth}px`
        panel.style.height = `${targetHeight}px`
        panel.style.maxHeight = `${maxHeight}px`

        const headerHeight = header.offsetHeight
        const footerHeight = footer.offsetHeight
        const bodyMaxHeight = Math.max(64, targetHeight - headerHeight - footerHeight)
        if (needVerticalOverflow) {
          body.style.maxHeight = `${bodyMaxHeight}px`
          body.style.overflowY = 'auto'
        } else {
          body.style.maxHeight = 'none'
          body.style.overflowY = 'hidden'
        }

        body.style.overflowX = needHorizontalOverflow ? 'auto' : 'hidden'
        dialog.classList.remove('sod-modal-viewport-scroll')
      }
    } else if (resolvedScrollMode === 'viewport') {
      const targetWidth = Math.max(naturalWidth, MIN_WIDTH)
      const targetHeight = Math.max(naturalHeight, MIN_HEIGHT)
      panel.style.width = `${targetWidth}px`
      panel.style.maxWidth = 'none'
      panel.style.height = `${targetHeight}px`
      panel.style.maxHeight = 'none'
      body.style.maxHeight = 'none'
      body.style.overflowY = 'visible'
      body.style.overflowX = 'visible'

      if (targetHeight > maxHeight) {
        dialog.classList.add('sod-modal-viewport-scroll')
      } else {
        dialog.classList.remove('sod-modal-viewport-scroll')
      }
    } else {
      const targetWidth = needHorizontalOverflow
        ? Math.max(naturalWidth, MIN_WIDTH)
        : clamp(naturalWidth, MIN_WIDTH, maxWidth)

      if (needHorizontalOverflow || needVerticalOverflow) {
        const targetHeight = Math.max(naturalHeight, MIN_HEIGHT)
        panel.style.width = `${targetWidth}px`
        panel.style.maxWidth = 'none'
        panel.style.height = `${targetHeight}px`
        panel.style.maxHeight = 'none'
        body.style.maxHeight = 'none'
        body.style.overflowY = 'visible'
        body.style.overflowX = 'visible'
        dialog.classList.add('sod-modal-viewport-scroll')
      } else {
        panel.style.width = `${targetWidth}px`
        panel.style.maxWidth = `${maxWidth}px`
        panel.style.height = 'auto'
        panel.style.maxHeight = 'none'
        body.style.maxHeight = 'none'
        body.style.overflowY = 'visible'
        body.style.overflowX = 'visible'
        dialog.classList.remove('sod-modal-viewport-scroll')
      }
    }
  }

  const scheduleFit = () => {
    if (rafId !== 0) {
      return
    }
    rafId = window.requestAnimationFrame(applyFit)
  }

  const resizeObserver = new ResizeObserver(() => {
    scheduleFit()
  })

  const mutationObserver = new MutationObserver(() => {
    scheduleFit()
  })

  const onContentLoad = () => {
    scheduleFit()
  }

  const onRefit = () => {
    scheduleFit()
  }

  dialog.addEventListener('sod:refit', onRefit as EventListener)

  resizeObserver.observe(body)
  resizeObserver.observe(header)
  resizeObserver.observe(footer)

  if (refitOnContentChange) {
    mutationObserver.observe(body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
    })
    body.addEventListener('load', onContentLoad, true)
    body.addEventListener('error', onContentLoad, true)
  }

  const onWindowResize = () => {
    scheduleFit()
  }

  window.addEventListener('resize', onWindowResize)
  scheduleFit()

  return () => {
    if (rafId !== 0) {
      window.cancelAnimationFrame(rafId)
      rafId = 0
    }
    resizeObserver.disconnect()
    mutationObserver.disconnect()
    window.removeEventListener('resize', onWindowResize)
    dialog.removeEventListener('sod:refit', onRefit as EventListener)
    body.removeEventListener('load', onContentLoad, true)
    body.removeEventListener('error', onContentLoad, true)
    dialog.classList.remove('sod-modal-viewport-scroll')
    body.style.maxHeight = ''
    body.style.overflowY = ''
    body.style.overflowX = ''
  }
}

export class SoDialog {
  private static modalRegistry = new Map<string, HTMLDialogElement>()
  private static handleRegistry = new WeakMap<HTMLDialogElement, () => SoDialogHandle>()
  private static modalIdSeed = 0

  private static createAutoModalId(): string {
    this.modalIdSeed += 1
    return `sod-modal-${this.modalIdSeed}`
  }

  private static revealExisting(dialog: HTMLDialogElement, useModal: boolean): SoDialogHandle {
    if (!dialog.isConnected) {
      return {
        dialog,
        close: () => closeDialog(dialog),
        refit: () => dialog.dispatchEvent(new Event('sod:refit')),
        setFooterButtons: () => undefined,
        updateFooterButton: () => false,
        onAction: () => () => undefined,
        id: dialog.dataset.sodId,
      }
    }

    const panel = dialog.querySelector<HTMLElement>('.sod-panel')
    panel?.classList.remove('is-closing')
    document.body.append(dialog)

    if (!dialog.open) {
      if (useModal) {
        dialog.showModal()
      } else {
        dialog.show()
      }
    }

    dialog.dispatchEvent(new Event('sod:refit'))

    panel?.focus()

    const handleFactory = this.handleRegistry.get(dialog)
    if (handleFactory) {
      return handleFactory()
    }

    return {
      dialog,
      close: () => closeDialog(dialog),
      refit: () => dialog.dispatchEvent(new Event('sod:refit')),
      setFooterButtons: () => undefined,
      updateFooterButton: () => false,
      onAction: () => () => undefined,
      id: dialog.dataset.sodId,
    }
  }

  static open(options: SoDialogOptions): SoDialogHandle {
    const kind: SoPanelKind = options.kind ?? 'modal'
    const useModal = 'useModal' in options ? options.useModal ?? true : true
    const modalOptions = kind === 'modal' ? (options as SoDialogModalOptions) : undefined
    const modalAutoFitEnabled = kind === 'modal' && ('autoFitSize' in options ? options.autoFitSize !== false : true)

    let modalId: string | undefined
    let isExplicitModalId = false
    let confirmAction: 'hide' | 'destroy' = options.confirmAction ?? 'hide'
    if (kind === 'modal') {
      const explicitModalId = 'id' in options && options.id?.trim() ? options.id.trim() : undefined
      isExplicitModalId = Boolean(explicitModalId)
      modalId = explicitModalId ?? this.createAutoModalId()

      if (options.confirmAction === undefined && isExplicitModalId) {
        confirmAction = 'destroy'
      }

      if (explicitModalId) {
        const existed = this.modalRegistry.get(modalId)

        if (existed && existed.isConnected) {
          const reusedHandle = this.revealExisting(existed, useModal)

          if (options.onAction) {
            const detach = reusedHandle.onAction(options.onAction)
            existed.addEventListener('close', detach, { once: true })
          }

          if ('onReused' in options) {
            options.onReused?.(reusedHandle)
          }
          return reusedHandle
        }
      }

      this.modalRegistry.delete(modalId)
    }

    const dialog = document.createElement('dialog')
    dialog.className = `sod-dialog sod-${kind}`
    const cleanups: Array<() => void> = []
    if (modalId) {
      dialog.dataset.sodId = modalId
      if (isExplicitModalId) {
        dialog.dataset.sodPersistent = 'true'
      }
    }

    const panel = document.createElement('section')
    panel.className = 'sod-panel'
    panel.tabIndex = -1

    if (kind === 'offcanvas') {
      const placement = 'placement' in options ? options.placement ?? 'end' : 'end'
      const animation = 'animation' in options ? options.animation ?? 'slide' : 'slide'
      panel.classList.add(`sod-placement-${placement}`)
      panel.classList.add(`sod-anim-${animation}`)
    } else {
      const position = 'position' in options ? options.position ?? 'center' : 'center'
      const animation = 'animation' in options ? options.animation ?? 'fade' : 'fade'
      panel.classList.add(`sod-modal-pos-${position}`)
      panel.classList.add(`sod-modal-anim-${animation}`)

      if (modalAutoFitEnabled) {
        panel.classList.add('sod-modal-autofit')
      }
    }

    const header = document.createElement('header')
    header.className = 'sod-header'

    const title = document.createElement('h2')
    title.className = 'sod-title'
    title.textContent = options.title

    const closeButton = document.createElement('button')
    closeButton.type = 'button'
    closeButton.className = 'sod-close'
    closeButton.setAttribute('aria-label', 'Close')
    closeButton.textContent = '×'
    closeButton.addEventListener('click', () => closeDialog(dialog))

    header.append(title, closeButton)

    const body = document.createElement('div')
    body.className = 'sod-body'
    appendContent(body, options.content)

    const footer = document.createElement('footer')
    footer.className = 'sod-footer'
    footer.dataset.align = options.footerAlign ?? 'end'

    const actionListeners = new Set<SoDialogActionListener>()
    if (options.onAction) {
      actionListeners.add(options.onAction)
    }

    const addActionListener = (listener: SoDialogActionListener): (() => void) => {
      actionListeners.add(listener)
      return () => {
        actionListeners.delete(listener)
      }
    }

    let footerButtons: SoDialogFooterButton[] = options.footerButtons
      ? [...options.footerButtons]
      : [
          {
            id: 'cancel',
            label: options.cancelText ?? '取消',
            role: 'cancel',
            variant: 'outline',
          },
          {
            id: 'confirm',
            label: options.confirmText ?? '确认',
            role: 'confirm',
            variant: 'primary',
          },
        ]

    const createHandle = (): SoDialogHandle => {
      return {
        dialog,
        close: () => closeDialog(dialog),
        refit: () => dialog.dispatchEvent(new Event('sod:refit')),
        setFooterButtons: (buttons: SoDialogFooterButton[]) => {
          footerButtons = [...buttons]
          renderFooterButtons()
          dialog.dispatchEvent(new Event('sod:refit'))
        },
        updateFooterButton: (id: string, updates: Partial<SoDialogFooterButton>) => {
          const buttonIndex = footerButtons.findIndex((item) => item.id === id)
          if (buttonIndex < 0) {
            return false
          }

          footerButtons[buttonIndex] = { ...footerButtons[buttonIndex], ...updates }
          renderFooterButtons()
          dialog.dispatchEvent(new Event('sod:refit'))
          return true
        },
        onAction: (listener: SoDialogActionListener) => addActionListener(listener),
        id: modalId,
      }
    }

    const renderButtonLabel = (buttonElement: HTMLButtonElement, label: string | Node) => {
      if (typeof label === 'string') {
        buttonElement.textContent = label
        return
      }

      buttonElement.append(label)
    }

    const renderFooterButtons = () => {
      footer.replaceChildren()

      if (options.hideFooter || footerButtons.length === 0) {
        footer.hidden = true
        return
      }

      footer.hidden = false

      for (const button of footerButtons) {
        const buttonElement = document.createElement('button')
        buttonElement.type = 'button'
        buttonElement.className = `sod-btn ${resolveFooterButtonClass(button.variant)}`

        if (button.className?.trim()) {
          buttonElement.className = `${buttonElement.className} ${button.className.trim()}`
        }

        if (button.id?.trim()) {
          buttonElement.dataset.action = button.id.trim()
        }

        if (button.disabled) {
          buttonElement.disabled = true
        }

        if (button.attrs) {
          Object.entries(button.attrs).forEach(([attrKey, attrValue]) => {
            buttonElement.setAttribute(attrKey, attrValue)
          })
        }

        renderButtonLabel(buttonElement, button.label)

        buttonElement.addEventListener('click', (event) => {
          void (async () => {
            const handle = createHandle()
            const action = button.id ?? button.role ?? 'custom'
            const context: SoDialogFooterActionContext = {
              action,
              button,
              buttonElement,
              dialog,
              event,
              handle,
            }

            const clickResult = await button.onClick?.(context)
            if (clickResult === false) {
              return
            }

            if (button.role === 'cancel') {
              options.onCancel?.()
            }
            if (button.role === 'confirm') {
              options.onConfirm?.()
            }

            actionListeners.forEach((listener) => {
              listener(context)
            })

            const footerAction = resolveFooterAction(button, confirmAction)
            if (footerAction === 'hide') {
              closeDialog(dialog, 'hide')
            }
            if (footerAction === 'destroy') {
              closeDialog(dialog, 'destroy')
            }
          })()
        })

        footer.append(buttonElement)
      }
    }

    renderFooterButtons()
    panel.append(header, body, footer)

    if (modalAutoFitEnabled) {
      cleanups.push(setupModalAutoFit(dialog, panel, header, body, footer, modalOptions))
    }

    if (kind === 'modal' && 'draggable' in options && options.draggable) {
      enableModalDrag(panel, options.dragHandle)
    }

    dialog.append(panel)

    if (options.closeOnBackdrop ?? true) {
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
          closeDialog(dialog)
        }
      })
    }

    if (!(options.closeOnEsc ?? true)) {
      dialog.addEventListener('cancel', (event) => {
        event.preventDefault()
      })
    }

    dialog.addEventListener('close', () => {
      const keepInstance = dialog.dataset.sodPersistent === 'true'
      const destroyRequested = dialog.dataset.sodDestroy === 'true'

      if (!keepInstance || destroyRequested) {
        cleanups.forEach((cleanup) => cleanup())
        actionListeners.clear()
        dialog.remove()
        if (modalId) {
          this.modalRegistry.delete(modalId)
        }
        this.handleRegistry.delete(dialog)
        delete dialog.dataset.sodDestroy
      }
    })

    document.body.append(dialog)
    if (useModal) {
      dialog.showModal()
    } else {
      dialog.show()
    }

    dialog.dispatchEvent(new Event('sod:refit'))

    if (modalId) {
      this.modalRegistry.set(modalId, dialog)
    }

    this.handleRegistry.set(dialog, createHandle)
    const handle = createHandle()

    if (kind === 'modal' && 'onCreated' in options) {
      options.onCreated?.(handle)
    }

    return handle
  }

  static openModal(options: SoDialogModalOptions): SoDialogHandle {
    return this.open({ ...options, kind: 'modal' })
  }

  static openOffcanvas(options: Omit<SoDialogOffcanvasOptions, 'kind'>): SoDialogHandle {
    return this.open({ ...options, kind: 'offcanvas' })
  }
}

export function openModal(options: SoDialogModalOptions): SoDialogHandle {
  return SoDialog.openModal(options)
}

export function openOffcanvas(options: Omit<SoDialogOffcanvasOptions, 'kind'>): SoDialogHandle {
  return SoDialog.openOffcanvas(options)
}
