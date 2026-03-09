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
export type SoLifecycleComponent = 'modal' | 'offcanvas' | 'toast' | 'context-menu'
export type SoLifecyclePhase = 'before-open' | 'after-open' | 'before-close' | 'after-close'
export type SoLifecycleReason =
  | 'api'
  | 'reused'
  | 'close-button'
  | 'backdrop'
  | 'esc'
  | 'cancel'
  | 'confirm'
  | 'footer-action'
  | 'destroy'
  | 'timeout'
  | 'container-clear'
  | 'programmatic'
  | 'outside'
  | 'item'
  | 'manual'

export type SoContextMenuCloseReason =
  | 'outside'
  | 'esc'
  | 'item'
  | 'programmatic'
  | 'destroy'
  | 'reopen'
  | 'blur'
  | 'scroll'
  | 'resize'

export interface SoContextMenuItem {
  id?: string
  label: string | Node
  icon?: string | Node
  iconPosition?: 'start' | 'end'
  iconAriaLabel?: string
  disabled?: boolean
  closeOnClick?: boolean
  className?: string
  attrs?: Record<string, string>
  onClick?: (context: SoContextMenuActionContext) => void | boolean | Promise<void | boolean>
}

export interface SoContextMenuActionContext {
  itemId: string
  item: SoContextMenuItem
  itemElement: HTMLButtonElement
  menuElement: HTMLElement
  triggerElement: HTMLElement
  originalEvent?: MouseEvent
  traceId?: string
  handle: SoContextMenuHandle
}

export interface SoContextMenuFocusContext {
  itemId: string
  item: SoContextMenuItem
  itemElement: HTMLButtonElement
  menuElement: HTMLElement
  triggerElement: HTMLElement
  traceId?: string
  handle: SoContextMenuHandle
}

export interface SoContextMenuTypeaheadContext {
  query: string
  matched: boolean
  itemId?: string
  item?: SoContextMenuItem
  itemElement?: HTMLButtonElement
  menuElement: HTMLElement
  triggerElement: HTMLElement
  traceId?: string
  handle: SoContextMenuHandle
}

export interface SoContextMenuOptions extends SoLifecycleHooks {
  id?: string
  traceId?: string
  target: string | Element | Iterable<Element> | ArrayLike<Element>
  items: SoContextMenuItem[]
  className?: string
  attrs?: Record<string, string>
  offsetX?: number
  offsetY?: number
  minWidth?: number
  maxHeight?: number
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  closeOnWindowBlur?: boolean
  closeOnScroll?: boolean
  closeOnResize?: boolean
  preventNativeMenu?: boolean
  typeaheadResetMs?: number
  onOpen?: (handle: SoContextMenuHandle) => void
  onClose?: (reason: SoContextMenuCloseReason, handle: SoContextMenuHandle) => void
  onAction?: (context: SoContextMenuActionContext) => void
  onFocusItem?: (context: SoContextMenuFocusContext) => void
  onTypeahead?: (context: SoContextMenuTypeaheadContext) => void
}

export interface SoContextMenuHandle {
  id?: string
  element: HTMLElement
  isOpen: () => boolean
  openAt: (x: number, y: number, triggerElement?: HTMLElement, event?: MouseEvent) => void
  close: (reason?: Exclude<SoContextMenuCloseReason, 'destroy'>) => void
  setItems: (items: SoContextMenuItem[]) => void
  updateItem: (id: string, patch: Partial<SoContextMenuItem>) => boolean
  destroy: () => void
}

export interface SoLifecycleContext {
  component: SoLifecycleComponent
  phase: SoLifecyclePhase
  element: HTMLElement
  id?: string
  reason?: SoLifecycleReason
  traceId?: string
}

export type SoLifecycleHook = (context: SoLifecycleContext) => void

export interface SoLayoutStableContext {
  component: 'modal' | 'offcanvas'
  element: HTMLElement
  id?: string
  traceId?: string
}

export type SoLayoutStableHook = (context: SoLayoutStableContext) => void

export interface SoLifecycleHooks {
  onLifecycle?: SoLifecycleHook
  onBeforeOpen?: SoLifecycleHook
  onAfterOpen?: SoLifecycleHook
  onBeforeClose?: SoLifecycleHook
  onAfterClose?: SoLifecycleHook
}

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

export interface SoDialogBaseOptions extends SoLifecycleHooks {
  title: string
  content: string | Node
  traceId?: string
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
  onLayoutStable?: SoLayoutStableHook
  layoutStableFrames?: number
  layoutStableOnRefit?: boolean
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

export interface SoDialogConfirmOptions
  extends Omit<SoDialogModalOptions, 'kind' | 'title' | 'content' | 'onConfirm' | 'onCancel' | 'onCreated' | 'onReused'> {
  title?: string
  content?: string | Node
  onConfirm?: () => void
  onCancel?: () => void
}

export type SoPromptInputType = 'text' | 'password' | 'email' | 'search' | 'url' | 'tel'
export type SoFormFieldType = SoPromptInputType | 'number' | 'textarea' | 'select' | 'checkbox'

export type SoDialogFormValue = string | number | boolean | null

export interface SoDialogFormFieldOption {
  label: string
  value: string
}

export interface SoDialogFormField {
  name: string
  label: string
  type?: SoFormFieldType
  placeholder?: string
  defaultValue?: string | number | boolean
  required?: boolean
  helpText?: string
  rows?: number
  options?: SoDialogFormFieldOption[]
  attrs?: Record<string, string>
  validate?: (value: SoDialogFormValue, values: Record<string, SoDialogFormValue>) => string | boolean | void
}

export interface SoDialogPromptOptions extends SoDialogConfirmOptions {
  defaultValue?: string
  placeholder?: string
  inputType?: SoPromptInputType
  trimResult?: boolean
  validate?: (value: string) => string | boolean | void
}

export interface SoDialogFormOptions
  extends Omit<
    SoDialogConfirmOptions,
    'content' | 'onConfirm' | 'onCancel' | 'confirmText' | 'cancelText' | 'hideFooter' | 'footerButtons'
  > {
  content?: string | Node
  fields: SoDialogFormField[]
  trimText?: boolean
  submitText?: string
  cancelText?: string
  onConfirm?: (values: Record<string, SoDialogFormValue>) => void
  onCancel?: () => void
  validate?: (values: Record<string, SoDialogFormValue>) => string | boolean | Record<string, string> | void
}

export interface SoDialogGlobalConfig {
  modalDefaults?: Partial<SoDialogModalOptions>
  offcanvasDefaults?: Partial<Omit<SoDialogOffcanvasOptions, 'kind'>>
}

export interface SoContextMenuGlobalConfig {
  className?: string
  attrs?: Record<string, string>
  offsetX?: number
  offsetY?: number
  minWidth?: number
  maxHeight?: number
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  closeOnWindowBlur?: boolean
  closeOnScroll?: boolean
  closeOnResize?: boolean
  preventNativeMenu?: boolean
  typeaheadResetMs?: number
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
  traceId?: string
  handle: SoDialogHandle
}

export type SoDialogActionListener = (context: SoDialogFooterActionContext) => void

export interface SoToastOptions extends SoLifecycleHooks {
  id?: string
  traceId?: string
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
      | 'title'
      | 'className'
      | 'attrs'
      | 'onShown'
      | 'onClose'
      | 'pauseOnWindowBlur'
      | 'duplicateStrategy'
      | 'onLifecycle'
      | 'onBeforeOpen'
      | 'onAfterOpen'
      | 'onBeforeClose'
      | 'onAfterClose'
      | 'traceId'
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

function focusElementIfPossible(element: HTMLElement | null): void {
  if (!element || !element.isConnected) {
    return
  }

  if (element instanceof HTMLButtonElement && element.disabled) {
    return
  }

  try {
    element.focus({ preventScroll: true })
  } catch {
    element.focus()
  }
}

function emitLifecycle(hooks: SoLifecycleHooks | undefined, context: SoLifecycleContext): void {
  hooks?.onLifecycle?.(context)

  if (context.phase === 'before-open') {
    hooks?.onBeforeOpen?.(context)
    return
  }
  if (context.phase === 'after-open') {
    hooks?.onAfterOpen?.(context)
    return
  }
  if (context.phase === 'before-close') {
    hooks?.onBeforeClose?.(context)
    return
  }

  hooks?.onAfterClose?.(context)
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
  private static focusRestoreRegistry = new WeakMap<HTMLDialogElement, HTMLElement | null>()
  private static globalConfig: SoDialogGlobalConfig = {}
  private static modalIdSeed = 0
  private static ariaIdSeed = 0

  private static createAutoModalId(): string {
    this.modalIdSeed += 1
    return `sod-modal-${this.modalIdSeed}`
  }

  private static createAutoAriaId(prefix: string): string {
    this.ariaIdSeed += 1
    return `${prefix}-${this.ariaIdSeed}`
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
    this.focusRestoreRegistry.set(dialog, document.activeElement instanceof HTMLElement ? document.activeElement : null)
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
    const traceId = options.traceId?.trim() || undefined
    const lifecycleHooks: SoLifecycleHooks = {
      onLifecycle: options.onLifecycle,
      onBeforeOpen: options.onBeforeOpen,
      onAfterOpen: options.onAfterOpen,
      onBeforeClose: options.onBeforeClose,
      onAfterClose: options.onAfterClose,
    }
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
          emitLifecycle(lifecycleHooks, {
            component: kind,
            phase: 'before-open',
            element: existed,
            id: modalId,
            reason: 'reused',
            traceId,
          })
          const reusedHandle = this.revealExisting(existed, useModal)

          if (options.onAction) {
            const detach = reusedHandle.onAction(options.onAction)
            existed.addEventListener('close', detach, { once: true })
          }

          if ('onReused' in options) {
            options.onReused?.(reusedHandle)
          }

          emitLifecycle(lifecycleHooks, {
            component: kind,
            phase: 'after-open',
            element: existed,
            id: modalId,
            reason: 'reused',
            traceId,
          })
          return reusedHandle
        }
      }

      this.modalRegistry.delete(modalId)
    }

    const dialog = document.createElement('dialog')
    dialog.className = `sod-dialog sod-${kind}`
    const cleanups: Array<() => void> = []
    const layoutStableFrames = Math.max(1, options.layoutStableFrames ?? 2)
    const layoutStableOnRefit = options.layoutStableOnRefit ?? false
    let layoutStableTimerId: number | null = null
    if (modalId) {
      dialog.dataset.sodId = modalId
      if (isExplicitModalId) {
        dialog.dataset.sodPersistent = 'true'
      }
    }

    const requestClose = (reason: SoLifecycleReason, action: 'hide' | 'destroy' = 'hide') => {
      dialog.dataset.sodCloseReason = reason
      emitLifecycle(lifecycleHooks, {
        component: kind,
        phase: 'before-close',
        element: dialog,
        id: modalId,
        reason,
        traceId,
      })
      closeDialog(dialog, action)
    }

    const emitLayoutStable = () => {
      if (!dialog.open || !dialog.isConnected) {
        return
      }

      options.onLayoutStable?.({
        component: kind,
        element: dialog,
        id: modalId,
        traceId,
      })
    }

    const scheduleLayoutStable = () => {
      if (!options.onLayoutStable) {
        return
      }

      if (layoutStableTimerId !== null) {
        window.clearTimeout(layoutStableTimerId)
      }

      layoutStableTimerId = window.setTimeout(() => {
        layoutStableTimerId = null
        emitLayoutStable()
      }, layoutStableFrames * 16)
    }

    const onRefitLayoutStable = () => {
      if (!layoutStableOnRefit) {
        return
      }

      scheduleLayoutStable()
    }

    dialog.addEventListener('sod:refit', onRefitLayoutStable as EventListener)
    cleanups.push(() => {
      dialog.removeEventListener('sod:refit', onRefitLayoutStable as EventListener)
      if (layoutStableTimerId !== null) {
        window.clearTimeout(layoutStableTimerId)
        layoutStableTimerId = null
      }
    })

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
    title.id = SoDialog.createAutoAriaId('sod-title')

    const closeButton = document.createElement('button')
    closeButton.type = 'button'
    closeButton.className = 'sod-close'
    closeButton.setAttribute('aria-label', 'Close')
    closeButton.textContent = '×'
    closeButton.addEventListener('click', () => requestClose('close-button'))

    header.append(title, closeButton)

    const body = document.createElement('div')
    body.className = 'sod-body'
    body.id = SoDialog.createAutoAriaId('sod-body')
    appendContent(body, options.content)

    dialog.setAttribute('aria-labelledby', title.id)
    dialog.setAttribute('aria-describedby', body.id)
    dialog.setAttribute('aria-modal', useModal ? 'true' : 'false')

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
        close: () => requestClose('api'),
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
              traceId,
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
              requestClose(button.role === 'confirm' ? 'confirm' : button.role === 'cancel' ? 'cancel' : 'footer-action', 'hide')
            }
            if (footerAction === 'destroy') {
              requestClose('destroy', 'destroy')
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
          requestClose('backdrop')
        }
      })
    }

    dialog.addEventListener('cancel', (event) => {
      if (!(options.closeOnEsc ?? true)) {
        event.preventDefault()
        return
      }

      dialog.dataset.sodCloseReason = 'esc'
      emitLifecycle(lifecycleHooks, {
        component: kind,
        phase: 'before-close',
        element: dialog,
        id: modalId,
        reason: 'esc',
        traceId,
      })
    })

    dialog.addEventListener('close', () => {
      const reason = (dialog.dataset.sodCloseReason as SoLifecycleReason | undefined) ?? 'api'
      emitLifecycle(lifecycleHooks, {
        component: kind,
        phase: 'after-close',
        element: dialog,
        id: modalId,
        reason,
        traceId,
      })

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

      const focusRestoreTarget = this.focusRestoreRegistry.get(dialog) ?? null
      this.focusRestoreRegistry.delete(dialog)
      focusElementIfPossible(focusRestoreTarget)

      delete dialog.dataset.sodCloseReason
    })

    emitLifecycle(lifecycleHooks, {
      component: kind,
      phase: 'before-open',
      element: dialog,
      id: modalId,
      traceId,
    })

    this.focusRestoreRegistry.set(dialog, document.activeElement instanceof HTMLElement ? document.activeElement : null)

    document.body.append(dialog)
    if (useModal) {
      dialog.showModal()
    } else {
      dialog.show()
    }

    dialog.dispatchEvent(new Event('sod:refit'))

    emitLifecycle(lifecycleHooks, {
      component: kind,
      phase: 'after-open',
      element: dialog,
      id: modalId,
      traceId,
    })
    scheduleLayoutStable()

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
    return this.open({
      ...(this.globalConfig.modalDefaults ?? {}),
      ...options,
      kind: 'modal',
    })
  }

  static openOffcanvas(options: Omit<SoDialogOffcanvasOptions, 'kind'>): SoDialogHandle {
    return this.open({
      ...(this.globalConfig.offcanvasDefaults ?? {}),
      ...options,
      kind: 'offcanvas',
    })
  }

  static configure(nextConfig: SoDialogGlobalConfig): void {
    this.globalConfig = {
      ...this.globalConfig,
      ...nextConfig,
      modalDefaults: {
        ...this.globalConfig.modalDefaults,
        ...nextConfig.modalDefaults,
      },
      offcanvasDefaults: {
        ...this.globalConfig.offcanvasDefaults,
        ...nextConfig.offcanvasDefaults,
      },
    }
  }

  static confirm(options: SoDialogConfirmOptions = {}): Promise<boolean> {
    const {
      title = '提示',
      content = '<p>确认继续执行该操作吗？</p>',
      confirmText = '确认',
      cancelText = '取消',
      onConfirm,
      onCancel,
      onAfterClose,
      ...rest
    } = options

    return new Promise<boolean>((resolve) => {
      let settled = false
      const settle = (result: boolean) => {
        if (settled) {
          return
        }
        settled = true
        resolve(result)
      }

      this.openModal({
        ...rest,
        title,
        content,
        confirmText,
        cancelText,
        onConfirm: () => {
          onConfirm?.()
          settle(true)
        },
        onCancel: () => {
          onCancel?.()
          settle(false)
        },
        onAfterClose: (context) => {
          onAfterClose?.(context)
          settle(false)
        },
      })
    })
  }

  static prompt(options: SoDialogPromptOptions = {}): Promise<string | null> {
    const {
      title = '请输入',
      content,
      defaultValue = '',
      placeholder,
      inputType = 'text',
      trimResult = true,
      validate,
      confirmText = '确认',
      cancelText = '取消',
      onConfirm,
      onCancel,
      onAfterOpen,
      onAfterClose,
      ...rest
    } = options

    return new Promise<string | null>((resolve) => {
      let settled = false
      let submittedValue: string | null = null

      const settle = (result: string | null) => {
        if (settled) {
          return
        }
        settled = true
        resolve(result)
      }

      const wrapper = document.createElement('div')
      wrapper.className = 'sod-prompt-wrap'

      if (content !== undefined) {
        const intro = document.createElement('div')
        intro.className = 'sod-prompt-intro'
        appendContent(intro, content)
        wrapper.append(intro)
      }

      const input = document.createElement('input')
      input.type = inputType
      input.className = 'sod-prompt-input'
      input.value = defaultValue
      if (placeholder) {
        input.placeholder = placeholder
      }

      const error = document.createElement('p')
      error.className = 'sod-prompt-error'
      error.hidden = true

      const setError = (message: string | null) => {
        if (!message) {
          error.hidden = true
          error.textContent = ''
          return
        }
        error.hidden = false
        error.textContent = message
      }

      wrapper.append(input, error)

      this.openModal({
        ...rest,
        title,
        content: wrapper,
        footerButtons: [
          {
            id: 'cancel',
            label: cancelText,
            role: 'cancel',
            variant: 'outline',
            action: 'hide',
            onClick: () => {
              submittedValue = null
              onCancel?.()
            },
          },
          {
            id: 'confirm',
            label: confirmText,
            role: 'confirm',
            variant: 'primary',
            action: 'hide',
            onClick: () => {
              const rawValue = input.value
              const nextValue = trimResult ? rawValue.trim() : rawValue

              if (validate) {
                const validationResult = validate(nextValue)
                if (validationResult === false) {
                  setError('输入不符合要求。')
                  return false
                }
                if (typeof validationResult === 'string') {
                  setError(validationResult)
                  return false
                }
              }

              setError(null)
              submittedValue = nextValue
              onConfirm?.()
              return true
            },
          },
        ],
        onAfterOpen: (context) => {
          onAfterOpen?.(context)
          window.setTimeout(() => {
            input.focus()
            input.select()
          }, 0)
        },
        onAfterClose: (context) => {
          onAfterClose?.(context)
          settle(submittedValue)
        },
      })
    })
  }

  static form(options: SoDialogFormOptions): Promise<Record<string, SoDialogFormValue> | null> {
    const {
      title = '填写表单',
      content,
      fields,
      trimText = true,
      submitText = '提交',
      cancelText = '取消',
      onConfirm,
      onCancel,
      validate,
      onAfterOpen,
      onAfterClose,
      ...rest
    } = options

    return new Promise<Record<string, SoDialogFormValue> | null>((resolve) => {
      let settled = false
      let submittedValues: Record<string, SoDialogFormValue> | null = null

      const settle = (result: Record<string, SoDialogFormValue> | null) => {
        if (settled) {
          return
        }
        settled = true
        resolve(result)
      }

      const wrapper = document.createElement('div')
      wrapper.className = 'sod-form-wrap'

      if (content !== undefined) {
        const intro = document.createElement('div')
        intro.className = 'sod-form-intro'
        appendContent(intro, content)
        wrapper.append(intro)
      }

      const formGrid = document.createElement('div')
      formGrid.className = 'sod-form-grid'
      wrapper.append(formGrid)

      const fieldElements = new Map<
        string,
        {
          field: SoDialogFormField
          input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          error: HTMLParagraphElement
        }
      >()

      fields.forEach((field) => {
        const fieldType = field.type ?? 'text'
        const fieldRow = document.createElement('label')
        fieldRow.className = fieldType === 'checkbox' ? 'sod-form-field sod-form-field-checkbox' : 'sod-form-field'

        const labelText = document.createElement('span')
        labelText.className = 'sod-form-label'
        labelText.textContent = field.required ? `${field.label} *` : field.label

        let inputEl: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        if (fieldType === 'textarea') {
          const textarea = document.createElement('textarea')
          textarea.className = 'sod-form-control sod-form-textarea'
          textarea.rows = Math.max(2, field.rows ?? 4)
          textarea.value = typeof field.defaultValue === 'string' ? field.defaultValue : ''
          if (field.placeholder) {
            textarea.placeholder = field.placeholder
          }
          inputEl = textarea
        } else if (fieldType === 'select') {
          const select = document.createElement('select')
          select.className = 'sod-form-control sod-form-select'
          const optionsList = field.options ?? []
          optionsList.forEach((option) => {
            const optionEl = document.createElement('option')
            optionEl.value = option.value
            optionEl.textContent = option.label
            select.append(optionEl)
          })
          if (typeof field.defaultValue === 'string') {
            select.value = field.defaultValue
          }
          inputEl = select
        } else {
          const input = document.createElement('input')
          input.className = fieldType === 'checkbox' ? 'sod-form-checkbox' : 'sod-form-control'
          input.type = fieldType
          if (fieldType === 'checkbox') {
            input.checked = Boolean(field.defaultValue)
          } else {
            input.value = field.defaultValue === undefined ? '' : String(field.defaultValue)
            if (field.placeholder) {
              input.placeholder = field.placeholder
            }
          }
          inputEl = input
        }

        inputEl.id = `sod-form-${field.name}`
        if (field.required) {
          inputEl.setAttribute('aria-required', 'true')
        }

        if (field.attrs) {
          Object.entries(field.attrs).forEach(([attrKey, attrValue]) => {
            inputEl.setAttribute(attrKey, attrValue)
          })
        }

        const help = document.createElement('small')
        help.className = 'sod-form-help'
        help.textContent = field.helpText ?? ''
        help.hidden = !field.helpText

        const error = document.createElement('p')
        error.className = 'sod-form-error'
        error.hidden = true

        fieldRow.append(labelText, inputEl, help, error)
        formGrid.append(fieldRow)

        fieldElements.set(field.name, { field, input: inputEl, error })
      })

      const readFieldValue = (field: SoDialogFormField, input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        const fieldType = field.type ?? 'text'
        if (fieldType === 'checkbox' && input instanceof HTMLInputElement) {
          return input.checked
        }
        if (fieldType === 'number' && input instanceof HTMLInputElement) {
          if (input.value.trim() === '') {
            return null
          }
          return Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber
        }

        const rawValue = input.value
        return trimText ? rawValue.trim() : rawValue
      }

      const setFieldError = (name: string, message: string | null) => {
        const fieldRef = fieldElements.get(name)
        if (!fieldRef) {
          return
        }

        fieldRef.error.hidden = !message
        fieldRef.error.textContent = message ?? ''
      }

      const clearAllErrors = () => {
        fieldElements.forEach((_, fieldName) => setFieldError(fieldName, null))
      }

      const validateRequired = (field: SoDialogFormField, value: SoDialogFormValue): string | null => {
        if (!field.required) {
          return null
        }

        if (typeof value === 'string') {
          return value.length > 0 ? null : '该字段为必填项。'
        }

        if (typeof value === 'number') {
          return Number.isFinite(value) ? null : '请输入有效数字。'
        }

        if (typeof value === 'boolean') {
          return value ? null : '请先勾选该项。'
        }

        return '该字段为必填项。'
      }

      this.openModal({
        ...rest,
        title,
        content: wrapper,
        footerButtons: [
          {
            id: 'cancel',
            label: cancelText,
            role: 'cancel',
            variant: 'outline',
            action: 'hide',
            onClick: () => {
              submittedValues = null
              onCancel?.()
            },
          },
          {
            id: 'confirm',
            label: submitText,
            role: 'confirm',
            variant: 'primary',
            action: 'hide',
            onClick: () => {
              clearAllErrors()

              const values: Record<string, SoDialogFormValue> = {}
              let firstInvalidName: string | null = null

              fieldElements.forEach(({ field, input }, name) => {
                values[name] = readFieldValue(field, input)
              })

              fieldElements.forEach(({ field }, name) => {
                const value = values[name]
                const requiredError = validateRequired(field, value)
                if (requiredError) {
                  setFieldError(name, requiredError)
                  if (!firstInvalidName) {
                    firstInvalidName = name
                  }
                  return
                }

                if (field.validate) {
                  const result = field.validate(value, values)
                  if (result === false) {
                    setFieldError(name, '输入不符合要求。')
                    if (!firstInvalidName) {
                      firstInvalidName = name
                    }
                    return
                  }
                  if (typeof result === 'string') {
                    setFieldError(name, result)
                    if (!firstInvalidName) {
                      firstInvalidName = name
                    }
                  }
                }
              })

              if (validate) {
                const result = validate(values)
                if (result === false) {
                  const first = fields[0]
                  if (first) {
                    setFieldError(first.name, '表单校验未通过。')
                    firstInvalidName = first.name
                  }
                } else if (typeof result === 'string') {
                  const first = fields[0]
                  if (first) {
                    setFieldError(first.name, result)
                    firstInvalidName = first.name
                  }
                } else if (result && typeof result === 'object') {
                  Object.entries(result).forEach(([fieldName, message]) => {
                    if (!message) {
                      return
                    }
                    setFieldError(fieldName, message)
                    if (!firstInvalidName) {
                      firstInvalidName = fieldName
                    }
                  })
                }
              }

              if (firstInvalidName) {
                const invalidField = fieldElements.get(firstInvalidName)
                invalidField?.input.focus()
                return false
              }

              submittedValues = values
              onConfirm?.(values)
              return true
            },
          },
        ],
        onAfterOpen: (context) => {
          onAfterOpen?.(context)
          window.setTimeout(() => {
            const firstField = fields[0]
            if (!firstField) {
              return
            }
            fieldElements.get(firstField.name)?.input.focus()
          }, 0)
        },
        onAfterClose: (context) => {
          onAfterClose?.(context)
          settle(submittedValues)
        },
      })
    })
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
      onLifecycle: options.onLifecycle,
      onBeforeOpen: options.onBeforeOpen,
      onAfterOpen: options.onAfterOpen,
      onBeforeClose: options.onBeforeClose,
      onAfterClose: options.onAfterClose,
      traceId: options.traceId?.trim() || undefined,
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

  private static emitToastLifecycle(
    record: SoToastRecord,
    phase: SoLifecyclePhase,
    reason?: SoLifecycleReason,
  ): void {
    emitLifecycle(
      {
        onLifecycle: record.options.onLifecycle,
        onBeforeOpen: record.options.onBeforeOpen,
        onAfterOpen: record.options.onAfterOpen,
        onBeforeClose: record.options.onBeforeClose,
        onAfterClose: record.options.onAfterClose,
      },
      {
        component: 'toast',
        phase,
        element: record.element,
        id: record.id,
        reason,
        traceId: record.options.traceId,
      },
    )
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
    this.emitToastLifecycle(record, 'before-open')

    if (record.options.newestOnTop) {
      state.container.prepend(record.element)
    } else {
      state.container.append(record.element)
    }
    state.active.push(record)

    this.startRecordTimer(record)
    record.options.onShown?.(record.handle)
    this.emitToastLifecycle(record, 'after-open')
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
    this.emitToastLifecycle(record, 'after-close', reason)

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
      this.emitToastLifecycle(record, 'before-close', reason)
      this.finalizeClose(record, reason)
      return
    }

    this.emitToastLifecycle(record, 'before-close', reason)
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
      if (options.onClose !== undefined) {
        existed.options.onClose = normalizedOptions.onClose
      }
      if (options.onShown !== undefined) {
        existed.options.onShown = normalizedOptions.onShown
      }
      if (options.onLifecycle !== undefined) {
        existed.options.onLifecycle = normalizedOptions.onLifecycle
      }
      if (options.onBeforeOpen !== undefined) {
        existed.options.onBeforeOpen = normalizedOptions.onBeforeOpen
      }
      if (options.onAfterOpen !== undefined) {
        existed.options.onAfterOpen = normalizedOptions.onAfterOpen
      }
      if (options.onBeforeClose !== undefined) {
        existed.options.onBeforeClose = normalizedOptions.onBeforeClose
      }
      if (options.onAfterClose !== undefined) {
        existed.options.onAfterClose = normalizedOptions.onAfterClose
      }
      if (options.traceId !== undefined) {
        existed.options.traceId = normalizedOptions.traceId
      }
      this.emitToastLifecycle(existed, 'before-open', 'reused')
      this.emitToastLifecycle(existed, 'after-open', 'reused')
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

export class SoContextMenu {
  private static activeHandle: SoContextMenuHandle | null = null
  private static globalConfig: SoContextMenuGlobalConfig = {}
  private static idSeed = 0
  private static triggerIdSeed = 0

  private static createAutoId(): string {
    this.idSeed += 1
    return `socm-${this.idSeed}`
  }

  private static ensureTriggerId(triggerElement: HTMLElement): string {
    if (triggerElement.id.trim()) {
      return triggerElement.id.trim()
    }
    this.triggerIdSeed += 1
    const nextId = `socm-trigger-${this.triggerIdSeed}`
    triggerElement.id = nextId
    return nextId
  }

  private static normalizeTargetElements(
    target: SoContextMenuOptions['target'],
  ): { delegatedSelector: string | null; elements: HTMLElement[] } {
    if (typeof target === 'string') {
      return {
        delegatedSelector: target,
        elements: [],
      }
    }

    if (target instanceof Element) {
      return {
        delegatedSelector: null,
        elements: target instanceof HTMLElement ? [target] : [],
      }
    }

    const elements: HTMLElement[] = []
    const iterable = target as Iterable<Element>
    if (typeof iterable[Symbol.iterator] === 'function') {
      for (const element of iterable) {
        if (element instanceof HTMLElement) {
          elements.push(element)
        }
      }
      return {
        delegatedSelector: null,
        elements,
      }
    }

    const arrayLike = target as ArrayLike<Element>
    for (let index = 0; index < arrayLike.length; index += 1) {
      const element = arrayLike[index]
      if (element instanceof HTMLElement) {
        elements.push(element)
      }
    }

    return {
      delegatedSelector: null,
      elements,
    }
  }

  private static resolveMountRoot(triggerElement?: HTMLElement): HTMLElement {
    const activeTarget =
      triggerElement ?? (document.activeElement instanceof HTMLElement ? (document.activeElement as HTMLElement) : null)

    const dialogRoot = activeTarget?.closest('dialog[open]')
    if (dialogRoot instanceof HTMLElement) {
      return dialogRoot
    }

    return document.body
  }

  static bind(options: SoContextMenuOptions): SoContextMenuHandle {
      const CAPTURE_LISTENER = true
    const menuElement = document.createElement('div')
    menuElement.className = 'sod-context-menu'
    menuElement.setAttribute('role', 'menu')
    menuElement.hidden = true
    menuElement.setAttribute('aria-hidden', 'true')
    menuElement.style.display = 'none'
    menuElement.tabIndex = -1

    const id = options.id?.trim() || this.createAutoId()
    menuElement.dataset.contextMenuId = id
    menuElement.id = `sod-context-menu-${id}`

    const resolvedClassName = options.className ?? this.globalConfig.className
    if (resolvedClassName?.trim()) {
      menuElement.className = `${menuElement.className} ${resolvedClassName.trim()}`
    }

    const resolvedAttrs = {
      ...(this.globalConfig.attrs ?? {}),
      ...(options.attrs ?? {}),
    }
    if (Object.keys(resolvedAttrs).length > 0) {
      Object.entries(resolvedAttrs).forEach(([key, value]) => {
        if (value === undefined) {
          return
        }
        menuElement.setAttribute(key, value)
      })
    }

    const lifecycleHooks: SoLifecycleHooks = {
      onLifecycle: options.onLifecycle,
      onBeforeOpen: options.onBeforeOpen,
      onAfterOpen: options.onAfterOpen,
      onBeforeClose: options.onBeforeClose,
      onAfterClose: options.onAfterClose,
    }
    const traceId = options.traceId?.trim() || undefined

    const offsetX = options.offsetX ?? this.globalConfig.offsetX ?? 0
    const offsetY = options.offsetY ?? this.globalConfig.offsetY ?? 0
    const minWidth = Math.max(120, options.minWidth ?? this.globalConfig.minWidth ?? 180)
    const maxHeight = Math.max(120, options.maxHeight ?? this.globalConfig.maxHeight ?? 320)
    const closeOnOutsideClick = options.closeOnOutsideClick ?? this.globalConfig.closeOnOutsideClick ?? true
    const closeOnEsc = options.closeOnEsc ?? this.globalConfig.closeOnEsc ?? true
    const closeOnWindowBlur = options.closeOnWindowBlur ?? this.globalConfig.closeOnWindowBlur ?? true
    const closeOnScroll = options.closeOnScroll ?? this.globalConfig.closeOnScroll ?? true
    const closeOnResize = options.closeOnResize ?? this.globalConfig.closeOnResize ?? true
    const preventNativeMenu = options.preventNativeMenu ?? this.globalConfig.preventNativeMenu ?? true
    const typeaheadResetMs = Math.max(120, options.typeaheadResetMs ?? this.globalConfig.typeaheadResetMs ?? 450)

    const listeners: Array<() => void> = []
    let menuItems = [...options.items]
    let lastTriggerElement: HTMLElement | null = null
    let lastFocusedBeforeOpen: HTMLElement | null = null
    let lastEvent: MouseEvent | null = null
    let open = false
    let destroyed = false

    const createHandle = (): SoContextMenuHandle => {
      return {
        id,
        element: menuElement,
        isOpen: () => open,
        openAt: (x, y, triggerElement, event) => {
          openMenuAt(x, y, triggerElement, event)
        },
        close: (reason = 'programmatic') => {
          closeMenu(reason)
        },
        setItems: (items) => {
          menuItems = [...items]
          renderItems()
        },
        updateItem: (itemId, patch) => {
          const index = menuItems.findIndex((item) => item.id === itemId)
          if (index < 0) {
            return false
          }
          menuItems[index] = { ...menuItems[index], ...patch }
          renderItems()
          return true
        },
        destroy: () => {
          destroyMenu()
        },
      }
    }

    const closeMenu = (reason: Exclude<SoContextMenuCloseReason, 'destroy'>) => {
      if (!open || destroyed) {
        return
      }

      const lifecycleReason: SoLifecycleReason =
        reason === 'outside'
          ? 'outside'
          : reason === 'item'
            ? 'item'
            : reason === 'esc'
              ? 'esc'
              : 'programmatic'

      emitLifecycle(lifecycleHooks, {
        component: 'context-menu',
        phase: 'before-close',
        element: menuElement,
        id,
        reason: lifecycleReason,
        traceId,
      })

      open = false
      menuElement.hidden = true
      menuElement.setAttribute('aria-hidden', 'true')
      menuElement.style.display = 'none'
      clearTypeahead()
      if (SoContextMenu.activeHandle === handle) {
        SoContextMenu.activeHandle = null
      }

      options.onClose?.(reason, handle)

      emitLifecycle(lifecycleHooks, {
        component: 'context-menu',
        phase: 'after-close',
        element: menuElement,
        id,
        reason: lifecycleReason,
        traceId,
      })

      if (reason !== 'reopen') {
        focusElementIfPossible(lastTriggerElement ?? lastFocusedBeforeOpen)
      }

      if (lastTriggerElement) {
        lastTriggerElement.setAttribute('aria-expanded', 'false')
      }
    }

    const destroyMenu = () => {
      if (destroyed) {
        return
      }

      if (open) {
        emitLifecycle(lifecycleHooks, {
          component: 'context-menu',
          phase: 'before-close',
          element: menuElement,
          id,
          reason: 'destroy',
          traceId,
        })
        options.onClose?.('destroy', handle)
        emitLifecycle(lifecycleHooks, {
          component: 'context-menu',
          phase: 'after-close',
          element: menuElement,
          id,
          reason: 'destroy',
          traceId,
        })

        focusElementIfPossible(lastTriggerElement ?? lastFocusedBeforeOpen)
      }

      if (lastTriggerElement) {
        lastTriggerElement.removeAttribute('aria-expanded')
        lastTriggerElement.removeAttribute('aria-controls')
      }

      open = false
      destroyed = true
      clearTypeahead()
      if (SoContextMenu.activeHandle === handle) {
        SoContextMenu.activeHandle = null
      }

      listeners.splice(0).forEach((off) => off())
      menuElement.remove()
    }

    const clampPosition = (x: number, y: number): { left: number; top: number } => {
      const viewportPadding = 8
      menuElement.style.left = '0px'
      menuElement.style.top = '0px'
      menuElement.style.maxHeight = `${maxHeight}px`
      menuElement.style.minWidth = `${minWidth}px`

      const rect = menuElement.getBoundingClientRect()
      const maxLeft = window.innerWidth - rect.width - viewportPadding
      const maxTop = window.innerHeight - rect.height - viewportPadding

      return {
        left: Math.max(viewportPadding, Math.min(maxLeft, x + offsetX)),
        top: Math.max(viewportPadding, Math.min(maxTop, y + offsetY)),
      }
    }

    const openMenuAt = (x: number, y: number, triggerElement?: HTMLElement, event?: MouseEvent) => {
      if (destroyed) {
        return
      }

      if (SoContextMenu.activeHandle && SoContextMenu.activeHandle !== handle) {
        SoContextMenu.activeHandle.close('reopen')
      }
      SoContextMenu.activeHandle = handle

      lastFocusedBeforeOpen = document.activeElement instanceof HTMLElement ? document.activeElement : null
      lastTriggerElement = triggerElement ?? lastTriggerElement
      lastEvent = event ?? lastEvent

      if (lastTriggerElement) {
        const triggerId = SoContextMenu.ensureTriggerId(lastTriggerElement)
        lastTriggerElement.setAttribute('aria-controls', menuElement.id)
        lastTriggerElement.setAttribute('aria-expanded', 'true')
        menuElement.setAttribute('aria-labelledby', triggerId)
      }

      emitLifecycle(lifecycleHooks, {
        component: 'context-menu',
        phase: 'before-open',
        element: menuElement,
        id,
        traceId,
      })

      if (!menuElement.isConnected) {
        const mountRoot = SoContextMenu.resolveMountRoot(lastTriggerElement ?? undefined)
        mountRoot.append(menuElement)
      } else {
        const mountRoot = SoContextMenu.resolveMountRoot(lastTriggerElement ?? undefined)
        if (menuElement.parentElement !== mountRoot) {
          mountRoot.append(menuElement)
        }
      }

      renderItems()
      menuElement.hidden = false
      menuElement.setAttribute('aria-hidden', 'false')
      menuElement.style.display = 'grid'
      const next = clampPosition(x, y)
      menuElement.style.left = `${next.left}px`
      menuElement.style.top = `${next.top}px`
      open = true
      focusFirstItem()

      options.onOpen?.(handle)

      emitLifecycle(lifecycleHooks, {
        component: 'context-menu',
        phase: 'after-open',
        element: menuElement,
        id,
        traceId,
      })
    }

    const renderLabel = (button: HTMLElement, label: string | Node) => {
      if (typeof label === 'string') {
        button.textContent = label
        return
      }
      button.append(label)
    }

    const renderItemIcon = (item: SoContextMenuItem): HTMLElement | null => {
      if (item.icon === undefined) {
        return null
      }

      const iconWrap = document.createElement('span')
      iconWrap.className = 'sod-context-menu-icon'
      if (item.iconAriaLabel?.trim()) {
        iconWrap.setAttribute('role', 'img')
        iconWrap.setAttribute('aria-label', item.iconAriaLabel.trim())
      } else {
        iconWrap.setAttribute('aria-hidden', 'true')
      }

      if (typeof item.icon === 'string') {
        const iconNode = document.createElement('i')
        iconNode.className = item.icon.trim()
        iconWrap.append(iconNode)
        return iconWrap
      }

      iconWrap.append(item.icon)
      return iconWrap
    }

    const renderItems = () => {
      menuElement.replaceChildren()

      menuItems.forEach((item, itemIndex) => {
        const itemElement = document.createElement('button')
        itemElement.type = 'button'
        itemElement.className = 'sod-context-menu-item'
        itemElement.setAttribute('role', 'menuitem')
        itemElement.dataset.itemIndex = String(itemIndex)

        const content = document.createElement('span')
        content.className = 'sod-context-menu-item-content'
        const label = document.createElement('span')
        label.className = 'sod-context-menu-label'
        const iconElement = renderItemIcon(item)
        const iconPosition = item.iconPosition ?? 'start'

        itemElement.dataset.itemId = item.id?.trim() || 'item'
        if (item.disabled) {
          itemElement.disabled = true
        }
        if (item.className?.trim()) {
          itemElement.className = `${itemElement.className} ${item.className.trim()}`
        }
        if (item.attrs) {
          Object.entries(item.attrs).forEach(([key, value]) => {
            itemElement.setAttribute(key, value)
          })
        }

        renderLabel(label, item.label)

        if (iconElement && iconPosition === 'start') {
          content.append(iconElement)
        }
        content.append(label)
        if (iconElement && iconPosition === 'end') {
          content.append(iconElement)
        }

        itemElement.append(content)

        itemElement.addEventListener('click', () => {
          void (async () => {
            if (!lastTriggerElement) {
              return
            }

            const itemId = item.id?.trim() || 'item'
            const context: SoContextMenuActionContext = {
              itemId,
              item,
              itemElement,
              menuElement,
              triggerElement: lastTriggerElement,
              originalEvent: lastEvent ?? undefined,
              traceId,
              handle,
            }

            const result = await item.onClick?.(context)
            if (result === false) {
              return
            }

            options.onAction?.(context)

            if (item.closeOnClick ?? true) {
              closeMenu('item')
            }
          })()
        })

        menuElement.append(itemElement)
      })
    }

    const getFocusableItems = (): HTMLButtonElement[] => {
      return Array.from(menuElement.querySelectorAll<HTMLButtonElement>('.sod-context-menu-item:not(:disabled)'))
    }

    const focusItemAt = (index: number) => {
      const items = getFocusableItems()
      if (items.length === 0) {
        return
      }

      const nextIndex = ((index % items.length) + items.length) % items.length
      const nextItem = items[nextIndex]
      focusElementIfPossible(nextItem)

      const triggerElement = lastTriggerElement
      const itemIndex = Number.parseInt(nextItem.dataset.itemIndex ?? '-1', 10)
      if (triggerElement && !Number.isNaN(itemIndex)) {
        const item = menuItems[itemIndex]
        if (item) {
          options.onFocusItem?.({
            itemId: item.id?.trim() || 'item',
            item,
            itemElement: nextItem,
            menuElement,
            triggerElement,
            traceId,
            handle,
          })
        }
      }

      menuElement.dispatchEvent(
        new CustomEvent('sod:context-menu-focus-item', {
          detail: {
            itemId: nextItem.dataset.itemId,
            label: (nextItem.textContent ?? '').trim(),
          },
        }),
      )
    }

    const focusFirstItem = () => {
      focusItemAt(0)
    }

    let typeaheadQuery = ''
    let typeaheadTimerId: number | null = null

    const clearTypeahead = () => {
      typeaheadQuery = ''
      if (typeaheadTimerId !== null) {
        window.clearTimeout(typeaheadTimerId)
        typeaheadTimerId = null
      }
    }

    const runTypeahead = (rawKey: string) => {
      const key = rawKey.toLowerCase()
      const items = getFocusableItems()
      if (items.length === 0) {
        return
      }

      typeaheadQuery += key

      const matchesItem = (item: HTMLButtonElement, query: string): boolean => {
        const text = (item.textContent ?? '').trim().toLowerCase()
        if (text.startsWith(query)) {
          return true
        }

        const tokenList = text
          .split(/[\s\-_/.,|:;(){}]+/)
          .map((token) => token.trim())
          .filter((token) => token.length > 0)
        return tokenList.some((token) => token.startsWith(query))
      }

      const active = document.activeElement
      const currentIndex = active instanceof HTMLButtonElement ? items.indexOf(active) : -1

      const findNextMatchIndex = (query: string): number => {
        const start = currentIndex
        for (let offset = 1; offset <= items.length; offset += 1) {
          const index = (start + offset + items.length) % items.length
          if (matchesItem(items[index], query)) {
            return index
          }
        }
        return -1
      }

      let matchIndex = findNextMatchIndex(typeaheadQuery)
      if (matchIndex < 0 && typeaheadQuery.length > 1) {
        typeaheadQuery = key
        matchIndex = findNextMatchIndex(typeaheadQuery)
      }

      if (matchIndex >= 0) {
        focusItemAt(matchIndex)
      }

      if (lastTriggerElement) {
        const matchedItem = matchIndex >= 0 ? items[matchIndex] : undefined
        const matchedItemIndex = matchedItem
          ? Number.parseInt(matchedItem.dataset.itemIndex ?? '-1', 10)
          : Number.NaN
        const matchedSourceItem = !Number.isNaN(matchedItemIndex) ? menuItems[matchedItemIndex] : undefined

        options.onTypeahead?.({
          query: typeaheadQuery,
          matched: matchIndex >= 0,
          itemId: matchedSourceItem?.id?.trim() || (matchedItem ? 'item' : undefined),
          item: matchedSourceItem,
          itemElement: matchedItem,
          menuElement,
          triggerElement: lastTriggerElement,
          traceId,
          handle,
        })
      }

      if (typeaheadTimerId !== null) {
        window.clearTimeout(typeaheadTimerId)
      }
      typeaheadTimerId = window.setTimeout(() => {
        typeaheadQuery = ''
        typeaheadTimerId = null
      }, typeaheadResetMs)
    }

    const onMenuKeyDown = (event: KeyboardEvent) => {
      if (!open) {
        return
      }

      const items = getFocusableItems()
      if (items.length === 0) {
        return
      }

      const active = document.activeElement
      const currentIndex = active instanceof HTMLButtonElement ? items.indexOf(active) : -1

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        focusItemAt(currentIndex < 0 ? 0 : currentIndex + 1)
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        focusItemAt(currentIndex < 0 ? items.length - 1 : currentIndex - 1)
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        focusItemAt(0)
        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        focusItemAt(items.length - 1)
        return
      }

      if (event.key === 'Tab') {
        event.preventDefault()
        if (event.shiftKey) {
          focusItemAt(currentIndex < 0 ? items.length - 1 : currentIndex - 1)
        } else {
          focusItemAt(currentIndex < 0 ? 0 : currentIndex + 1)
        }
        return
      }

      if (event.key === 'Enter' || event.key === ' ') {
        if (active instanceof HTMLButtonElement && active.classList.contains('sod-context-menu-item')) {
          event.preventDefault()
          active.click()
        }
        return
      }

      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault()
        runTypeahead(event.key)
      }
    }

    const shouldIgnoreOutsideContextMenu = (event: MouseEvent): boolean => {
      return event === lastEvent
    }

    const closeOnOutsideEvent = (target: EventTarget | null) => {
      if (!open || !closeOnOutsideClick) {
        return
      }

      const node = target as Node | null
      if (node && menuElement.contains(node)) {
        return
      }

      closeMenu('outside')
    }

    const onDocumentPointerDown = (event: PointerEvent) => {
      if (!open || !closeOnOutsideClick) {
        return
      }

      const composedPath = typeof event.composedPath === 'function' ? event.composedPath() : []
      if (composedPath.includes(menuElement)) {
        return
      }

      closeOnOutsideEvent(event.target)
    }

    const onDocumentMouseDown = (event: MouseEvent) => {
      closeOnOutsideEvent(event.target)
    }

    const onDocumentContextMenuOutside = (event: MouseEvent) => {
      if (shouldIgnoreOutsideContextMenu(event)) {
        return
      }

      closeOnOutsideEvent(event.target)
    }

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (!open) {
        return
      }

      if (event.key === 'Escape') {
        if (closeOnEsc) {
          closeMenu('esc')
        }
        return
      }

      if (event.defaultPrevented) {
        return
      }

      const target = event.target
      if (target instanceof Node && menuElement.contains(target)) {
        return
      }

      onMenuKeyDown(event)
    }

    const onWindowBlur = () => {
      if (!open || !closeOnWindowBlur) {
        return
      }

      closeMenu('blur')
    }

    const onWindowScroll = () => {
      if (!open || !closeOnScroll) {
        return
      }

      closeMenu('scroll')
    }

    const onWindowResize = () => {
      if (!open || !closeOnResize) {
        return
      }

      closeMenu('resize')
    }

    const openFromEvent = (event: MouseEvent, triggerElement: HTMLElement) => {
      if (preventNativeMenu) {
        event.preventDefault()
      }
      openMenuAt(event.clientX, event.clientY, triggerElement, event)
    }

    const targetInfo = this.normalizeTargetElements(options.target)
    if (targetInfo.delegatedSelector) {
      const selector = targetInfo.delegatedSelector
      const onContextMenu = (event: MouseEvent) => {
        const rawTarget = event.target as Element | null
        const matched = rawTarget?.closest(selector)
        if (!matched || !(matched instanceof HTMLElement)) {
          return
        }
        openFromEvent(event, matched)
      }

      document.addEventListener('contextmenu', onContextMenu, CAPTURE_LISTENER)
      listeners.push(() => document.removeEventListener('contextmenu', onContextMenu, CAPTURE_LISTENER))
    } else {
      targetInfo.elements.forEach((element) => {
        const onContextMenu = (event: MouseEvent) => {
          openFromEvent(event, element)
        }
        element.addEventListener('contextmenu', onContextMenu, CAPTURE_LISTENER)
        listeners.push(() => element.removeEventListener('contextmenu', onContextMenu, CAPTURE_LISTENER))
      })
    }

    document.addEventListener('pointerdown', onDocumentPointerDown, CAPTURE_LISTENER)
    document.addEventListener('mousedown', onDocumentMouseDown, CAPTURE_LISTENER)
    document.addEventListener('contextmenu', onDocumentContextMenuOutside, CAPTURE_LISTENER)
    document.addEventListener('keydown', onDocumentKeyDown, CAPTURE_LISTENER)
    menuElement.addEventListener('keydown', onMenuKeyDown)
    window.addEventListener('blur', onWindowBlur)
    window.addEventListener('scroll', onWindowScroll, true)
    window.addEventListener('resize', onWindowResize)
    listeners.push(() => document.removeEventListener('pointerdown', onDocumentPointerDown, CAPTURE_LISTENER))
    listeners.push(() => document.removeEventListener('mousedown', onDocumentMouseDown, CAPTURE_LISTENER))
    listeners.push(() => document.removeEventListener('contextmenu', onDocumentContextMenuOutside, CAPTURE_LISTENER))
    listeners.push(() => document.removeEventListener('keydown', onDocumentKeyDown, CAPTURE_LISTENER))
    listeners.push(() => menuElement.removeEventListener('keydown', onMenuKeyDown))
    listeners.push(() => window.removeEventListener('blur', onWindowBlur))
    listeners.push(() => window.removeEventListener('scroll', onWindowScroll, true))
    listeners.push(() => window.removeEventListener('resize', onWindowResize))

    const handle = createHandle()
    return handle
  }

  static configure(nextConfig: SoContextMenuGlobalConfig): void {
    this.globalConfig = {
      ...this.globalConfig,
      ...nextConfig,
      attrs: {
        ...this.globalConfig.attrs,
        ...nextConfig.attrs,
      },
    }
  }
}

export function openModal(options: SoDialogModalOptions): SoDialogHandle {
  return SoDialog.openModal(options)
}

export function openOffcanvas(options: Omit<SoDialogOffcanvasOptions, 'kind'>): SoDialogHandle {
  return SoDialog.openOffcanvas(options)
}

export function confirmModal(options: SoDialogConfirmOptions = {}): Promise<boolean> {
  return SoDialog.confirm(options)
}

export function promptModal(options: SoDialogPromptOptions = {}): Promise<string | null> {
  return SoDialog.prompt(options)
}

export function formModal(options: SoDialogFormOptions): Promise<Record<string, SoDialogFormValue> | null> {
  return SoDialog.form(options)
}

export function toast(options: SoToastOptions): SoToastHandle {
  return SoToast.show(options)
}

export function bindContextMenu(options: SoContextMenuOptions): SoContextMenuHandle {
  return SoContextMenu.bind(options)
}

export function configureDialog(config: SoDialogGlobalConfig): void {
  SoDialog.configure(config)
}

export function configureContextMenu(config: SoContextMenuGlobalConfig): void {
  SoContextMenu.configure(config)
}

export type SoMessageLevel = 'default' | 'info' | 'success' | 'warning' | 'danger'

export interface SoAdapterLogEvent {
  action: string
  phase?: SoLifecyclePhase | 'action' | 'layout-stable' | 'focus' | 'typeahead'
  component?: SoLifecycleComponent | 'adapter'
  reason?: string
  id?: string
  traceId?: string
  detail?: Record<string, unknown>
}

export interface SoAdapterConfig {
  modalDefaults?: Partial<SoDialogModalOptions>
  offcanvasDefaults?: Partial<Omit<SoDialogOffcanvasOptions, 'kind'>>
  contextMenuDefaults?: Partial<Omit<SoContextMenuOptions, 'target' | 'items'>>
  toastDefaults?: Partial<SoToastOptions>
  diagnosticsEnabled?: boolean
  logger?: (event: SoAdapterLogEvent) => void
}

export interface SoPushMessageOptions extends Omit<SoToastOptions, 'content' | 'variant'> {
  title?: string
}

export class SoAdapter {
  private static config: SoAdapterConfig = {
    toastDefaults: {
      placement: 'top-end',
      maxVisible: 4,
      newestOnTop: true,
      duplicateStrategy: 'stack',
      duration: 3800,
    },
    diagnosticsEnabled: false,
  }

  private static emitDiagnostic(event: SoAdapterLogEvent): void {
    this.config.logger?.(event)

    if (!this.config.diagnosticsEnabled || typeof window === 'undefined') {
      return
    }

    const host = window as Window & {
      __SOD_ADAPTER_DEV_LOGS__?: SoAdapterLogEvent[]
      __SOD_ADAPTER_DEBUG__?: boolean
    }
    if (!Array.isArray(host.__SOD_ADAPTER_DEV_LOGS__)) {
      host.__SOD_ADAPTER_DEV_LOGS__ = []
    }
    host.__SOD_ADAPTER_DEV_LOGS__.push(event)

    if (host.__SOD_ADAPTER_DEBUG__) {
      // Opt-in noisy debug output for local diagnosis only.
      console.debug('[SoAdapter]', event)
    }
  }

  static configure(nextConfig: SoAdapterConfig): void {
    this.config = {
      ...this.config,
      ...nextConfig,
      modalDefaults: {
        ...this.config.modalDefaults,
        ...nextConfig.modalDefaults,
      },
      offcanvasDefaults: {
        ...this.config.offcanvasDefaults,
        ...nextConfig.offcanvasDefaults,
      },
      contextMenuDefaults: {
        ...this.config.contextMenuDefaults,
        ...nextConfig.contextMenuDefaults,
      },
      toastDefaults: {
        ...this.config.toastDefaults,
        ...nextConfig.toastDefaults,
      },
    }

    if (this.config.toastDefaults) {
      SoToast.configure(this.config.toastDefaults)
    }
  }

  static openDialog(options: SoDialogOptions): SoDialogHandle {
    const wrappedOptions: SoDialogOptions = {
      ...options,
      onLifecycle: (context) => {
        options.onLifecycle?.(context)
        this.emitDiagnostic({
          action: 'openDialog',
          phase: context.phase,
          component: context.component,
          reason: context.reason,
          id: context.id,
          traceId: context.traceId,
        })
      },
      onLayoutStable: (context) => {
        options.onLayoutStable?.(context)
        this.emitDiagnostic({
          action: 'openDialog',
          phase: 'layout-stable',
          component: context.component,
          id: context.id,
          traceId: context.traceId,
        })
      },
      onAction: (context) => {
        options.onAction?.(context)
        this.emitDiagnostic({
          action: 'openDialog',
          phase: 'action',
          component: 'adapter',
          id: context.handle.id,
          traceId: context.traceId,
          detail: {
            footerAction: context.action,
          },
        })
      },
    }

    if (options.kind === 'offcanvas') {
      const merged = {
        ...(this.config.offcanvasDefaults ?? {}),
        ...wrappedOptions,
      }
      const { kind, ...rest } = merged as SoDialogOffcanvasOptions
      void kind
      return openOffcanvas(rest)
    }

    return openModal({
      ...(this.config.modalDefaults ?? {}),
      ...wrappedOptions,
      kind: 'modal',
    })
  }

  static bindContextMenu(options: SoContextMenuOptions): SoContextMenuHandle {
    return bindContextMenu({
      ...(this.config.contextMenuDefaults ?? {}),
      ...options,
      onLifecycle: (context) => {
        options.onLifecycle?.(context)
        this.emitDiagnostic({
          action: 'bindDialogContextMenu',
          phase: context.phase,
          component: context.component,
          reason: context.reason,
          id: context.id,
          traceId: context.traceId,
        })
      },
      onAction: (context) => {
        options.onAction?.(context)
        this.emitDiagnostic({
          action: 'bindDialogContextMenu',
          phase: 'action',
          component: 'context-menu',
          id: context.handle.id,
          traceId: context.traceId,
          detail: {
            itemId: context.itemId,
          },
        })
      },
      onFocusItem: (context) => {
        options.onFocusItem?.(context)
        this.emitDiagnostic({
          action: 'bindDialogContextMenu',
          phase: 'focus',
          component: 'context-menu',
          id: context.handle.id,
          traceId: context.traceId,
          detail: {
            itemId: context.itemId,
          },
        })
      },
      onTypeahead: (context) => {
        options.onTypeahead?.(context)
        this.emitDiagnostic({
          action: 'bindDialogContextMenu',
          phase: 'typeahead',
          component: 'context-menu',
          id: context.handle.id,
          traceId: context.traceId,
          detail: {
            query: context.query,
            matched: context.matched,
            itemId: context.itemId,
          },
        })
      },
    })
  }

  static pushMessage(level: SoMessageLevel, content: string | Node, options: SoPushMessageOptions = {}): SoToastHandle {
    const resolvedOptions: SoToastOptions = {
      ...(this.config.toastDefaults ?? {}),
      ...options,
      content,
      variant: level,
      onLifecycle: (context) => {
        options.onLifecycle?.(context)
        this.emitDiagnostic({
          action: 'pushMessage',
          phase: context.phase,
          component: context.component,
          reason: context.reason,
          id: context.id,
          traceId: context.traceId,
        })
      },
    }
    return toast(resolvedOptions)
  }

  static openDialogFromContextMenu(menuHandle: SoContextMenuHandle, options: SoDialogOptions): SoDialogHandle {
    // Close menu first to avoid focus/layer conflicts before opening a dialog.
    menuHandle.close('item')
    return this.openDialog(options)
  }
}

export function configureAdapter(config: SoAdapterConfig): void {
  SoAdapter.configure(config)
}

export function openDialog(options: SoDialogOptions): SoDialogHandle {
  return SoAdapter.openDialog(options)
}

export function bindDialogContextMenu(options: SoContextMenuOptions): SoContextMenuHandle {
  return SoAdapter.bindContextMenu(options)
}

export function pushMessage(level: SoMessageLevel, content: string | Node, options: SoPushMessageOptions = {}): SoToastHandle {
  return SoAdapter.pushMessage(level, content, options)
}

export function openDialogFromContextMenu(menuHandle: SoContextMenuHandle, options: SoDialogOptions): SoDialogHandle {
  return SoAdapter.openDialogFromContextMenu(menuHandle, options)
}
