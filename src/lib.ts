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
export type SoToastPlacement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
export type SoToastVariant = 'default' | 'info' | 'success' | 'warning' | 'danger'
export type SoToastCloseReason = 'timeout' | 'manual' | 'close-button' | 'container-clear' | 'programmatic'
export type SoToastDuplicateStrategy = 'update' | 'ignore' | 'restart-timer' | 'stack'

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

export interface SoToastOptions {
  id?: string
  title?: string
  content: string | Node
  placement?: SoToastPlacement
  variant?: SoToastVariant
  duration?: number | false
  showProgress?: boolean
  closable?: boolean
  pauseOnHover?: boolean
  pauseOnWindowBlur?: boolean
  duplicateStrategy?: SoToastDuplicateStrategy
  newestOnTop?: boolean
  maxVisible?: number
  className?: string
  attrs?: Record<string, string>
  onShown?: (handle: SoToastHandle) => void
  onClose?: (reason: SoToastCloseReason, handle: SoToastHandle) => void
}

export interface SoToastHandle {
  id: string
  element: HTMLElement
  close: (reason?: Exclude<SoToastCloseReason, 'timeout' | 'close-button'>) => void
  update: (patch: Partial<Pick<SoToastOptions, 'title' | 'content' | 'variant' | 'duration'>>) => void
  pause: () => void
  resume: () => void
}

interface SoToastResolvedOptions
  extends Required<
      Pick<SoToastOptions, 'placement' | 'variant' | 'closable' | 'pauseOnHover' | 'newestOnTop' | 'showProgress'>
    >,
    Pick<
      SoToastOptions,
      'title' | 'className' | 'attrs' | 'onShown' | 'onClose' | 'pauseOnWindowBlur' | 'duplicateStrategy'
    > {
  content: string | Node
  duration: number | false
  maxVisible: number
}

interface SoToastRecord {
  id: string
  options: SoToastResolvedOptions
  element: HTMLElement
  status: 'pending' | 'active' | 'closing' | 'closed'
  timerId: number | null
  remainingMs: number | false
  startedAt: number | null
  paused: boolean
  pausedByWindowBlur: boolean
  closeButton: HTMLButtonElement | null
  progressElement: HTMLElement | null
  bodyElement: HTMLElement
  titleElement: HTMLElement | null
  cleanupListeners: Array<() => void>
  handle: SoToastHandle
}

interface SoToastPlacementState {
  container: HTMLElement
  active: SoToastRecord[]
  pending: SoToastRecord[]
}

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

export class SoToast {
  private static placementState = new Map<SoToastPlacement, SoToastPlacementState>()
  private static recordById = new Map<string, SoToastRecord>()
  private static idSeed = 0

  private static defaults: {
    placement: SoToastPlacement
    variant: SoToastVariant
    duration: number
    showProgress: boolean
    closable: boolean
    pauseOnHover: boolean
    pauseOnWindowBlur: boolean
    duplicateStrategy: SoToastDuplicateStrategy
    newestOnTop: boolean
    maxVisible: number
  } = {
    placement: 'top-end',
    variant: 'default',
    duration: 3000,
    showProgress: true,
    closable: true,
    pauseOnHover: true,
    pauseOnWindowBlur: false,
    duplicateStrategy: 'update',
    newestOnTop: true,
    maxVisible: 3,
  }

  private static normalizeOptions(options: SoToastOptions): SoToastResolvedOptions {
    const resolvedDuration =
      options.duration === false ? false : Math.max(0, options.duration ?? this.defaults.duration)

    return {
      placement: options.placement ?? this.defaults.placement,
      variant: options.variant ?? this.defaults.variant,
      duration: resolvedDuration,
      showProgress: options.showProgress ?? this.defaults.showProgress,
      closable: options.closable ?? this.defaults.closable,
      pauseOnHover: options.pauseOnHover ?? this.defaults.pauseOnHover,
      pauseOnWindowBlur: options.pauseOnWindowBlur ?? this.defaults.pauseOnWindowBlur,
      duplicateStrategy: options.duplicateStrategy ?? this.defaults.duplicateStrategy,
      newestOnTop: options.newestOnTop ?? this.defaults.newestOnTop,
      maxVisible: Math.max(1, options.maxVisible ?? this.defaults.maxVisible),
      title: options.title,
      content: options.content,
      className: options.className,
      attrs: options.attrs,
      onShown: options.onShown,
      onClose: options.onClose,
    }
  }

  private static createAutoToastId(): string {
    this.idSeed += 1
    return `sot-toast-${this.idSeed}`
  }

  private static createStackedToastId(baseId: string): string {
    let attempt = 1
    let nextId = `${baseId}-${attempt}`
    while (this.recordById.has(nextId)) {
      attempt += 1
      nextId = `${baseId}-${attempt}`
    }
    return nextId
  }

  private static resolveRole(variant: SoToastVariant): 'status' | 'alert' {
    if (variant === 'danger') {
      return 'alert'
    }
    return 'status'
  }

  private static getPlacementState(placement: SoToastPlacement): SoToastPlacementState {
    const existed = this.placementState.get(placement)
    if (existed) {
      return existed
    }

    const container = document.createElement('div')
    container.className = `sod-toast-layer sod-toast-layer-${placement}`
    container.setAttribute('aria-live', 'polite')
    container.setAttribute('aria-atomic', 'false')
    document.body.append(container)

    const created: SoToastPlacementState = {
      container,
      active: [],
      pending: [],
    }
    this.placementState.set(placement, created)
    return created
  }

  private static createToastElement(record: SoToastRecord): void {
    const { options } = record
    const element = document.createElement('article')
    element.className = `sod-toast sod-toast-${options.variant}`
    if (options.className?.trim()) {
      element.className = `${element.className} ${options.className.trim()}`
    }
    element.dataset.toastId = record.id
    element.setAttribute('role', this.resolveRole(options.variant))

    if (options.attrs) {
      Object.entries(options.attrs).forEach(([key, value]) => {
        element.setAttribute(key, value)
      })
    }

    const header = document.createElement('header')
    header.className = 'sod-toast-header'

    let titleElement: HTMLElement | null = null
    if (options.title?.trim()) {
      titleElement = document.createElement('strong')
      titleElement.className = 'sod-toast-title'
      titleElement.textContent = options.title
      header.append(titleElement)
    }

    let closeButton: HTMLButtonElement | null = null
    if (options.closable) {
      closeButton = document.createElement('button')
      closeButton.type = 'button'
      closeButton.className = 'sod-toast-close'
      closeButton.setAttribute('aria-label', 'Close')
      closeButton.textContent = '×'
      closeButton.addEventListener('click', () => {
        this.closeRecord(record, 'close-button')
      })
      header.append(closeButton)
    }

    if (header.childElementCount > 0) {
      element.append(header)
    }

    const body = document.createElement('div')
    body.className = 'sod-toast-body'
    appendContent(body, options.content)
    element.append(body)

    let progressElement: HTMLElement | null = null
    if (options.showProgress) {
      progressElement = document.createElement('div')
      progressElement.className = 'sod-toast-progress'
      element.append(progressElement)
    }

    if (options.pauseOnHover) {
      const onMouseEnter = () => this.pauseRecord(record)
      const onMouseLeave = () => this.resumeRecord(record)
      element.addEventListener('mouseenter', onMouseEnter)
      element.addEventListener('mouseleave', onMouseLeave)
      record.cleanupListeners.push(() => {
        element.removeEventListener('mouseenter', onMouseEnter)
        element.removeEventListener('mouseleave', onMouseLeave)
      })
    }

    if (options.pauseOnWindowBlur) {
      const onWindowBlur = () => {
        if (record.paused || record.status !== 'active') {
          return
        }
        record.pausedByWindowBlur = true
        this.pauseRecord(record)
      }

      const onWindowFocus = () => {
        if (!record.pausedByWindowBlur) {
          return
        }
        record.pausedByWindowBlur = false
        this.resumeRecord(record)
      }

      window.addEventListener('blur', onWindowBlur)
      window.addEventListener('focus', onWindowFocus)
      record.cleanupListeners.push(() => {
        window.removeEventListener('blur', onWindowBlur)
        window.removeEventListener('focus', onWindowFocus)
      })
    }

    record.element = element
    record.bodyElement = body
    record.titleElement = titleElement
    record.closeButton = closeButton
    record.progressElement = progressElement
  }

  private static resetProgressAnimation(record: SoToastRecord, duration: number): void {
    if (!record.progressElement || !record.options.showProgress) {
      return
    }

    record.progressElement.style.display = 'block'
    record.progressElement.style.animation = 'none'
    record.progressElement.style.animationPlayState = 'running'
    // Force reflow so restarting animation is reliable across browsers.
    void record.progressElement.offsetWidth
    record.progressElement.style.animation = `sod-toast-progress-countdown ${Math.max(1, duration)}ms linear forwards`
  }

  private static hideProgress(record: SoToastRecord): void {
    if (!record.progressElement) {
      return
    }
    record.progressElement.style.display = 'none'
    record.progressElement.style.animation = 'none'
  }

  private static isRecordActive(state: SoToastPlacementState, record: SoToastRecord): boolean {
    return state.active.includes(record)
  }

  private static isRecordPending(state: SoToastPlacementState, record: SoToastRecord): boolean {
    return state.pending.includes(record)
  }

  private static mountRecord(state: SoToastPlacementState, record: SoToastRecord): void {
    record.status = 'active'

    if (record.options.newestOnTop) {
      state.container.prepend(record.element)
    } else {
      state.container.append(record.element)
    }
    state.active.push(record)

    this.startRecordTimer(record)
    record.options.onShown?.(record.handle)
  }

  private static queueRecord(state: SoToastPlacementState, record: SoToastRecord): void {
    record.status = 'pending'
    state.pending.push(record)
  }

  private static startRecordTimer(record: SoToastRecord): void {
    this.clearRecordTimer(record)

    if (record.options.duration === false) {
      record.remainingMs = false
      record.startedAt = null
      this.hideProgress(record)
      return
    }

    const timeoutMs = Math.max(0, record.remainingMs === false ? record.options.duration : record.remainingMs)
    if (timeoutMs === 0) {
      this.closeRecord(record, 'timeout')
      return
    }

    record.startedAt = Date.now()
    record.remainingMs = timeoutMs
    this.resetProgressAnimation(record, timeoutMs)
    record.timerId = window.setTimeout(() => {
      record.timerId = null
      this.closeRecord(record, 'timeout')
    }, timeoutMs)
  }

  private static clearRecordTimer(record: SoToastRecord): void {
    if (record.timerId !== null) {
      window.clearTimeout(record.timerId)
      record.timerId = null
    }
  }

  private static pauseRecord(record: SoToastRecord): void {
    if (record.paused || record.status !== 'active') {
      return
    }
    if (record.options.duration === false) {
      return
    }

    const startedAt = record.startedAt ?? Date.now()
    const elapsed = Math.max(0, Date.now() - startedAt)
    const currentRemaining = record.remainingMs === false ? record.options.duration : record.remainingMs
    record.remainingMs = Math.max(0, currentRemaining - elapsed)
    record.startedAt = null
    record.paused = true
    if (record.progressElement) {
      record.progressElement.style.animationPlayState = 'paused'
    }
    this.clearRecordTimer(record)
  }

  private static resumeRecord(record: SoToastRecord): void {
    if (!record.paused || record.status !== 'active') {
      return
    }

    record.paused = false
    if (record.progressElement) {
      record.progressElement.style.animationPlayState = 'running'
    }
    this.startRecordTimer(record)
  }

  private static rebuildRecordElement(record: SoToastRecord): void {
    const previousElement = record.element
    const parent = previousElement.parentElement

    record.cleanupListeners.forEach((cleanup) => cleanup())
    record.cleanupListeners = []
    previousElement.remove()

    this.createToastElement(record)

    if (parent && record.status === 'active') {
      if (record.options.newestOnTop) {
        parent.prepend(record.element)
      } else {
        parent.append(record.element)
      }
      this.startRecordTimer(record)
    }
  }

  private static moveRecordToPlacement(record: SoToastRecord, nextPlacement: SoToastPlacement): void {
    const previousPlacement = record.options.placement
    if (previousPlacement === nextPlacement) {
      return
    }

    const previousState = this.placementState.get(previousPlacement)
    const nextState = this.getPlacementState(nextPlacement)
    const wasActive = Boolean(previousState && this.removeFromArray(previousState.active, record))
    const wasPending = Boolean(previousState && this.removeFromArray(previousState.pending, record))

    record.options.placement = nextPlacement
    this.clearRecordTimer(record)

    if (wasPending && !wasActive) {
      this.queueRecord(nextState, record)
      this.drainQueue(nextState, nextPlacement)
      if (previousState) {
        this.drainQueue(previousState, previousPlacement)
      }
      return
    }

    if (nextState.active.length < record.options.maxVisible) {
      this.mountRecord(nextState, record)
    } else {
      this.queueRecord(nextState, record)
    }

    if (previousState) {
      this.drainQueue(previousState, previousPlacement)
    }
  }

  private static updateRecord(
    record: SoToastRecord,
    patch: Partial<
      Pick<
        SoToastOptions,
        | 'title'
        | 'content'
        | 'variant'
        | 'duration'
        | 'placement'
        | 'closable'
        | 'pauseOnHover'
        | 'pauseOnWindowBlur'
        | 'duplicateStrategy'
        | 'newestOnTop'
        | 'maxVisible'
        | 'showProgress'
        | 'className'
        | 'attrs'
      >
    >,
  ): void {
    if (patch.title !== undefined) {
      const normalizedTitle = patch.title.trim()
      record.options.title = normalizedTitle.length > 0 ? normalizedTitle : undefined

      if (record.options.title) {
        if (!record.titleElement) {
          const header = record.element.querySelector<HTMLElement>('.sod-toast-header')
          if (header) {
            const titleElement = document.createElement('strong')
            titleElement.className = 'sod-toast-title'
            titleElement.textContent = record.options.title
            header.prepend(titleElement)
            record.titleElement = titleElement
          }
        } else {
          record.titleElement.textContent = record.options.title
        }
      } else if (record.titleElement) {
        record.titleElement.remove()
        record.titleElement = null
      }
    }

    if (patch.content !== undefined) {
      record.options.content = patch.content
      record.bodyElement.replaceChildren()
      appendContent(record.bodyElement, patch.content)
    }

    if (patch.variant !== undefined) {
      record.options.variant = patch.variant
      record.element.classList.remove('sod-toast-default', 'sod-toast-info', 'sod-toast-success', 'sod-toast-warning', 'sod-toast-danger')
      record.element.classList.add(`sod-toast-${patch.variant}`)
      record.element.setAttribute('role', this.resolveRole(patch.variant))
    }

    if (patch.duration !== undefined) {
      record.options.duration = patch.duration === false ? false : Math.max(0, patch.duration)
      record.remainingMs = record.options.duration === false ? false : record.options.duration
      record.paused = false
      if (record.status === 'active') {
        this.startRecordTimer(record)
      }
    }

    if (patch.maxVisible !== undefined) {
      record.options.maxVisible = Math.max(1, patch.maxVisible)
    }

    if (patch.newestOnTop !== undefined) {
      record.options.newestOnTop = patch.newestOnTop
    }

    let shouldRebuild = false

    if (patch.closable !== undefined && patch.closable !== record.options.closable) {
      record.options.closable = patch.closable
      shouldRebuild = true
    }

    if (patch.pauseOnHover !== undefined && patch.pauseOnHover !== record.options.pauseOnHover) {
      record.options.pauseOnHover = patch.pauseOnHover
      shouldRebuild = true
    }

    if (patch.pauseOnWindowBlur !== undefined && patch.pauseOnWindowBlur !== record.options.pauseOnWindowBlur) {
      record.options.pauseOnWindowBlur = patch.pauseOnWindowBlur
      shouldRebuild = true
    }

    if (patch.duplicateStrategy !== undefined) {
      record.options.duplicateStrategy = patch.duplicateStrategy
    }

    if (patch.showProgress !== undefined && patch.showProgress !== record.options.showProgress) {
      record.options.showProgress = patch.showProgress
      shouldRebuild = true
    }

    if (patch.className !== undefined) {
      record.options.className = patch.className
      shouldRebuild = true
    }

    if (patch.attrs !== undefined) {
      record.options.attrs = patch.attrs
      shouldRebuild = true
    }

    if (shouldRebuild) {
      this.rebuildRecordElement(record)
    }

    if (patch.placement && patch.placement !== record.options.placement) {
      this.moveRecordToPlacement(record, patch.placement)
    }
  }

  private static removeStateContainerIfEmpty(placement: SoToastPlacement): void {
    const state = this.placementState.get(placement)
    if (!state) {
      return
    }

    if (state.active.length > 0 || state.pending.length > 0) {
      return
    }

    state.container.remove()
    this.placementState.delete(placement)
  }

  private static drainQueue(state: SoToastPlacementState, placement: SoToastPlacement): void {
    let canContinue = true
    while (canContinue && state.pending.length > 0) {
      const next = state.pending[0]
      if (state.active.length >= next.options.maxVisible) {
        canContinue = false
        continue
      }

      state.pending.shift()
      this.mountRecord(state, next)
    }

    this.removeStateContainerIfEmpty(placement)
  }

  private static removeFromArray<T>(items: T[], target: T): boolean {
    const index = items.indexOf(target)
    if (index < 0) {
      return false
    }

    items.splice(index, 1)
    return true
  }

  private static finalizeClose(record: SoToastRecord, reason: SoToastCloseReason): void {
    if (record.status === 'closed') {
      return
    }

    const placement = record.options.placement
    const state = this.placementState.get(placement)

    this.clearRecordTimer(record)
    record.cleanupListeners.forEach((cleanup) => cleanup())
    record.cleanupListeners = []
    record.element.remove()
    record.status = 'closed'

    if (state) {
      this.removeFromArray(state.active, record)
      this.removeFromArray(state.pending, record)
    }

    this.recordById.delete(record.id)
    record.options.onClose?.(reason, record.handle)

    if (state) {
      this.drainQueue(state, placement)
    } else {
      this.removeStateContainerIfEmpty(placement)
    }
  }

  private static closeRecord(record: SoToastRecord, reason: SoToastCloseReason): void {
    if (record.status === 'closed' || record.status === 'closing') {
      return
    }

    const placement = record.options.placement
    const state = this.placementState.get(placement)
    const pendingOnly = Boolean(state && this.isRecordPending(state, record) && !this.isRecordActive(state, record))

    if (pendingOnly) {
      this.finalizeClose(record, reason)
      return
    }

    record.status = 'closing'
    this.clearRecordTimer(record)
    record.element.classList.add('is-closing')

    let settled = false
    const settle = () => {
      if (settled) {
        return
      }
      settled = true
      this.finalizeClose(record, reason)
    }

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== record.element) {
        return
      }
      record.element.removeEventListener('animationend', onAnimationEnd)
      settle()
    }

    record.element.addEventListener('animationend', onAnimationEnd)
    window.setTimeout(() => {
      record.element.removeEventListener('animationend', onAnimationEnd)
      settle()
    }, 220)
  }

  private static createHandle(record: SoToastRecord): SoToastHandle {
    return {
      id: record.id,
      get element() {
        return record.element
      },
      close: (reason = 'programmatic') => {
        this.closeRecord(record, reason)
      },
      update: (patch) => {
        this.updateRecord(record, patch)
      },
      pause: () => {
        this.pauseRecord(record)
      },
      resume: () => {
        this.resumeRecord(record)
      },
    }
  }

  static show(options: SoToastOptions): SoToastHandle {
    const requestedId = options.id?.trim()
    const toastId = requestedId || this.createAutoToastId()
    const normalizedOptions = this.normalizeOptions(options)
    const existed = this.recordById.get(toastId)

    if (existed) {
      const strategy = normalizedOptions.duplicateStrategy

      if (strategy === 'ignore') {
        return existed.handle
      }

      if (strategy === 'stack') {
        const stackedId = this.createStackedToastId(toastId)
        return this.show({ ...options, id: stackedId, duplicateStrategy: 'update' })
      }

      this.updateRecord(existed, {
        title: options.title,
        content: options.content,
        variant: options.variant,
        duration:
          strategy === 'restart-timer'
            ? options.duration === undefined
              ? existed.options.duration
              : normalizedOptions.duration
            : options.duration === undefined
              ? undefined
              : normalizedOptions.duration,
        placement: options.placement,
        closable: options.closable,
        pauseOnHover: options.pauseOnHover,
        pauseOnWindowBlur: options.pauseOnWindowBlur,
        duplicateStrategy: options.duplicateStrategy,
        newestOnTop: options.newestOnTop,
        maxVisible: options.maxVisible,
        showProgress: options.showProgress,
        className: options.className,
        attrs: options.attrs,
      })
      existed.options.onClose = normalizedOptions.onClose
      existed.options.onShown = normalizedOptions.onShown
      return existed.handle
    }

    const baseRecord = {
      id: toastId,
      options: normalizedOptions,
      element: document.createElement('article'),
      status: 'pending' as const,
      timerId: null,
      remainingMs: normalizedOptions.duration,
      startedAt: null,
      paused: false,
      pausedByWindowBlur: false,
      closeButton: null,
      progressElement: null,
      bodyElement: document.createElement('div'),
      titleElement: null,
      cleanupListeners: [],
      handle: undefined as unknown as SoToastHandle,
    }
    const record: SoToastRecord = baseRecord
    record.handle = this.createHandle(record)
    this.createToastElement(record)

    this.recordById.set(toastId, record)

    const state = this.getPlacementState(normalizedOptions.placement)
    if (state.active.length < normalizedOptions.maxVisible) {
      this.mountRecord(state, record)
    } else {
      this.queueRecord(state, record)
    }

    return record.handle
  }

  static clear(placement?: SoToastPlacement): void {
    const placements = placement ? [placement] : Array.from(this.placementState.keys())

    placements.forEach((slot) => {
      const state = this.placementState.get(slot)
      if (!state) {
        return
      }

      const active = [...state.active]
      const pending = [...state.pending]

      pending.forEach((record) => this.closeRecord(record, 'container-clear'))
      active.forEach((record) => this.closeRecord(record, 'container-clear'))
    })
  }

  static configure(defaults: Partial<SoToastOptions>): void {
    if (defaults.placement) {
      this.defaults.placement = defaults.placement
    }
    if (defaults.variant) {
      this.defaults.variant = defaults.variant
    }
    if (defaults.duration !== undefined) {
      this.defaults.duration = defaults.duration === false ? 3000 : Math.max(0, defaults.duration)
    }
    if (defaults.showProgress !== undefined) {
      this.defaults.showProgress = defaults.showProgress
    }
    if (defaults.closable !== undefined) {
      this.defaults.closable = defaults.closable
    }
    if (defaults.pauseOnHover !== undefined) {
      this.defaults.pauseOnHover = defaults.pauseOnHover
    }
    if (defaults.pauseOnWindowBlur !== undefined) {
      this.defaults.pauseOnWindowBlur = defaults.pauseOnWindowBlur
    }
    if (defaults.duplicateStrategy !== undefined) {
      this.defaults.duplicateStrategy = defaults.duplicateStrategy
    }
    if (defaults.newestOnTop !== undefined) {
      this.defaults.newestOnTop = defaults.newestOnTop
    }
    if (defaults.maxVisible !== undefined) {
      this.defaults.maxVisible = Math.max(1, defaults.maxVisible)
    }
  }

  static success(content: string | Node, options: Omit<SoToastOptions, 'content' | 'variant'> = {}): SoToastHandle {
    return this.show({ ...options, content, variant: 'success' })
  }

  static error(content: string | Node, options: Omit<SoToastOptions, 'content' | 'variant'> = {}): SoToastHandle {
    return this.show({ ...options, content, variant: 'danger' })
  }

  static info(content: string | Node, options: Omit<SoToastOptions, 'content' | 'variant'> = {}): SoToastHandle {
    return this.show({ ...options, content, variant: 'info' })
  }

  static warning(content: string | Node, options: Omit<SoToastOptions, 'content' | 'variant'> = {}): SoToastHandle {
    return this.show({ ...options, content, variant: 'warning' })
  }

  static closeAll(): void {
    this.clear()
  }
}

export function openModal(options: SoDialogModalOptions): SoDialogHandle {
  return SoDialog.openModal(options)
}

export function openOffcanvas(options: Omit<SoDialogOffcanvasOptions, 'kind'>): SoDialogHandle {
  return SoDialog.openOffcanvas(options)
}

export function toast(options: SoToastOptions): SoToastHandle {
  return SoToast.show(options)
}
