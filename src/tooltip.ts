import { getTheme, type SoThemePreset } from './lib'

export type SoTooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type SoTooltipContent = string | ((trigger: Element) => string)
export type SoTooltipTarget = string | Element | Iterable<Element> | ArrayLike<Element>

export interface SoTooltipOptions {
  target: SoTooltipTarget
  content?: SoTooltipContent
  placement?: SoTooltipPlacement
  offset?: number
  showDelay?: number
  hideDelay?: number
  skipDelay?: number
  touchDelay?: number
  touchHideDelay?: number
  disabled?: boolean
  theme?: SoThemePreset
}

export interface SoTooltipHandle {
  readonly element: HTMLElement | null
  show: (target?: Element) => void
  hide: () => void
  setContent: (content: SoTooltipContent) => void
  isOpen: () => boolean
  destroy: () => void
}

export type SoTooltipDefaults = Partial<Omit<SoTooltipOptions, 'target' | 'content'>>

const opposites: Record<SoTooltipPlacement, SoTooltipPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

let tooltipId = 0
let activeTooltip: TooltipBinding | null = null
let lastClosedAt = -Infinity
let globalDefaults: SoTooltipDefaults = {}

function delay(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? Math.max(0, value as number) : fallback
}

function getTargets(target: SoTooltipTarget): { selector: string | null; elements: Element[] } {
  if (typeof target === 'string') return { selector: target, elements: [] }
  if (target instanceof Element) {
    return { selector: null, elements: [target] }
  }
  return {
    selector: null,
    elements: Array.from(target).filter((element): element is Element => element instanceof Element),
  }
}

class TooltipBinding implements SoTooltipHandle {
  private readonly selector: string | null
  private readonly targets: Element[]
  private readonly options: SoTooltipOptions
  private content?: SoTooltipContent
  private tooltipElement: HTMLElement | null = null
  private trigger: Element | null = null
  private hoverTarget: Element | null = null
  private focusTarget: Element | null = null
  private touchTarget: Element | null = null
  private touchOrigin: { x: number; y: number } | null = null
  private lastTouchAt = -Infinity
  private showTimer = 0
  private hideTimer = 0
  private touchTimer = 0
  private frame = 0
  private observer: ResizeObserver | null = null
  private removalObserver: MutationObserver | null = null
  private activeDialog: HTMLDialogElement | null = null
  private opened = false
  private destroyed = false
  private scrollListening = false
  private readonly listeners: Array<() => void> = []

  constructor(options: SoTooltipOptions) {
    this.options = { ...globalDefaults, ...options }
    this.content = options.content
    const targets = getTargets(options.target)
    this.selector = targets.selector
    this.targets = targets.elements
    const roots = this.selector ? [document] : this.targets

    for (const root of roots) {
      this.listen(root, 'pointerover', this.onPointerOver)
      this.listen(root, 'pointerout', this.onPointerOut)
      this.listen(root, 'pointerdown', this.onPointerDown)
      this.listen(root, 'pointermove', this.onPointerMove)
      this.listen(root, 'pointerup', this.onPointerUp)
      this.listen(root, 'pointercancel', this.onPointerCancel)
      this.listen(root, 'focusin', this.onFocusIn)
      this.listen(root, 'focusout', this.onFocusOut)
      this.listen(root, 'click', this.onClick)
      this.listen(root, 'contextmenu', this.onContextMenu)
    }
  }

  get element(): HTMLElement | null {
    return this.tooltipElement
  }

  isOpen = (): boolean => this.opened

  show = (target?: Element): void => {
    const resolved = target ?? (this.targets.length === 1 ? this.targets[0] : null)
    if (!resolved || !this.isTarget(resolved) || this.destroyed || this.options.disabled) return
    this.clearTimers()
    this.open(resolved)
  }

  hide = (): void => {
    this.clearTimers()
    this.touchTarget = null
    this.touchOrigin = null
    this.close()
    this.stopScroll()
  }

  setContent = (content: SoTooltipContent): void => {
    this.content = content
    if (this.trigger && this.opened) this.open(this.trigger)
  }

  destroy = (): void => {
    if (this.destroyed) return
    this.hide()
    this.destroyed = true
    this.stopScroll()
    this.listeners.splice(0).forEach((off) => off())
    this.tooltipElement?.remove()
    this.tooltipElement = null
  }

  private listen(root: EventTarget, type: string, listener: EventListener): void {
    root.addEventListener(type, listener)
    this.listeners.push(() => root.removeEventListener(type, listener))
  }

  private resolve(event: Event): Element | null {
    const origin = event.target
    if (!(origin instanceof Element)) return null
    if (this.selector) {
      const matched = origin.closest(this.selector)
      return matched
    }
    return this.targets.find((target) => target === origin || target.contains(origin)) ?? null
  }

  private isTarget(target: Element): boolean {
    if (!target.isConnected) return false
    if (this.selector) return target.matches(this.selector)
    return this.targets.includes(target)
  }

  private textFor(target: Element): string {
    const content = this.content ?? target.getAttribute('data-sod-tooltip') ?? ''
    return typeof content === 'function' ? content(target) : content
  }

  private ensureElement(): HTMLElement {
    if (this.tooltipElement) return this.tooltipElement
    const element = document.createElement('div')
    tooltipId += 1
    element.id = `sod-tooltip-${tooltipId}`
    element.className = 'sod-tooltip'
    element.setAttribute('role', 'tooltip')
    element.setAttribute('popover', 'manual')
    element.hidden = true
    element.dataset.sodThemeScope = this.options.theme ? 'local' : 'global'
    element.classList.add(`sod-theme-${this.options.theme ?? getTheme()}`)
    this.tooltipElement = element
    return element
  }

  private mount(target: Element, element: HTMLElement): void {
    const dialog = target.closest('dialog[open]')
    const root = dialog instanceof HTMLElement ? dialog : document.body
    if (element.parentElement !== root) root.append(element)
  }

  private open(target: Element): void {
    const content = this.textFor(target)
    if (!content.trim()) {
      this.close()
      return
    }
    if (activeTooltip && activeTooltip !== this) activeTooltip.hide()
    const wasOpen = this.opened
    if (this.trigger && this.trigger !== target) this.removeDescription(this.trigger)
    const element = this.ensureElement()
    element.textContent = content
    this.mount(target, element)
    element.hidden = false
    if (!wasOpen) {
      try {
        element.showPopover?.()
      } catch {
        // The mounted element remains available when Popover is only partly supported.
      }
    }
    this.trigger = target
    const dialog = target.closest('dialog[open]')
    if (dialog !== this.activeDialog) {
      this.activeDialog?.removeEventListener('close', this.onDialogClose)
      this.activeDialog = dialog instanceof HTMLDialogElement ? dialog : null
      this.activeDialog?.addEventListener('close', this.onDialogClose)
    }
    this.addDescription(target)
    this.opened = true
    // The active binding coordinates a single visible tooltip across instances.
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    activeTooltip = this
    this.startScroll()
    this.position()
    if (!this.observer && typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(this.schedulePosition)
      this.observer.observe(target)
      this.observer.observe(element)
    } else if (this.observer) {
      this.observer.disconnect()
      this.observer.observe(target)
      this.observer.observe(element)
    }
    if (!this.removalObserver && typeof MutationObserver !== 'undefined') {
      this.removalObserver = new MutationObserver(() => {
        if (this.trigger && !this.trigger.isConnected) this.hide()
      })
      this.removalObserver.observe(document, { childList: true, subtree: true })
    }
    if (!wasOpen) {
      window.addEventListener('resize', this.schedulePosition)
      document.addEventListener('keydown', this.onKeyDown, true)
    }
  }

  private close(): void {
    if (!this.opened) return
    const element = this.tooltipElement
    if (this.trigger) this.removeDescription(this.trigger)
    this.trigger = null
    this.opened = false
    lastClosedAt = Date.now()
    if (activeTooltip === this) activeTooltip = null
    if (this.frame) window.cancelAnimationFrame(this.frame)
    this.frame = 0
    this.observer?.disconnect()
    this.removalObserver?.disconnect()
    this.removalObserver = null
    this.activeDialog?.removeEventListener('close', this.onDialogClose)
    this.activeDialog = null
    window.removeEventListener('resize', this.schedulePosition)
    document.removeEventListener('keydown', this.onKeyDown, true)
    this.stopScroll()
    if (element) {
      try {
        element.hidePopover?.()
      } catch {
        // Hiding an already closed popover is harmless.
      }
      element.hidden = true
    }
  }

  private addDescription(target: Element): void {
    const id = this.tooltipElement?.id
    if (!id) return
    const tokens = (target.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean)
    if (!tokens.includes(id)) target.setAttribute('aria-describedby', [...tokens, id].join(' '))
  }

  private removeDescription(target: Element): void {
    const id = this.tooltipElement?.id
    if (!id) return
    const tokens = (target.getAttribute('aria-describedby') ?? '').split(/\s+/).filter((token) => token && token !== id)
    if (tokens.length) target.setAttribute('aria-describedby', tokens.join(' '))
    else target.removeAttribute('aria-describedby')
  }

  private position(): void {
    const target = this.trigger
    const element = this.tooltipElement
    if (!target || !element) return
    if (!target.isConnected) {
      this.hide()
      return
    }
    const reference = target.getBoundingClientRect()
    const floating = element.getBoundingClientRect()
    const gap = delay(this.options.offset, 8)
    const padding = 8
    const available = {
      top: reference.top - padding,
      bottom: window.innerHeight - reference.bottom - padding,
      left: reference.left - padding,
      right: window.innerWidth - reference.right - padding,
    }
    let placement = this.options.placement ?? 'top'
    const needed = placement === 'top' || placement === 'bottom' ? floating.height + gap : floating.width + gap
    if (available[placement] < needed && available[opposites[placement]] > available[placement]) {
      placement = opposites[placement]
    }
    const clamp = (value: number, size: number, viewport: number) =>
      Math.max(padding, Math.min(value, Math.max(padding, viewport - size - padding)))
    let left = reference.left + (reference.width - floating.width) / 2
    let top = reference.top + (reference.height - floating.height) / 2
    if (placement === 'top') top = reference.top - floating.height - gap
    if (placement === 'bottom') top = reference.bottom + gap
    if (placement === 'left') left = reference.left - floating.width - gap
    if (placement === 'right') left = reference.right + gap
    left = clamp(left, floating.width, window.innerWidth)
    top = clamp(top, floating.height, window.innerHeight)
    element.style.left = `${left}px`
    element.style.top = `${top}px`
    element.dataset.placement = placement
    const arrowOffset = placement === 'top' || placement === 'bottom'
      ? reference.left + reference.width / 2 - left
      : reference.top + reference.height / 2 - top
    const maxArrow = (placement === 'top' || placement === 'bottom' ? floating.width : floating.height) - 10
    element.style.setProperty('--sod-tooltip-arrow-offset', `${Math.max(10, Math.min(maxArrow, arrowOffset))}px`)
  }

  private schedulePosition = (): void => {
    if (!this.opened || this.frame) return
    this.frame = window.requestAnimationFrame(() => {
      this.frame = 0
      this.position()
    })
  }

  private clearTimers(): void {
    clearTimeout(this.showTimer)
    clearTimeout(this.hideTimer)
    clearTimeout(this.touchTimer)
    this.showTimer = 0
    this.hideTimer = 0
    this.touchTimer = 0
  }

  private scheduleShow(target: Element): void {
    clearTimeout(this.showTimer)
    clearTimeout(this.hideTimer)
    const warm = Date.now() - lastClosedAt <= delay(this.options.skipDelay, 300)
    const wait = warm ? 0 : delay(this.options.showDelay, 500)
    if (wait === 0) this.show(target)
    else this.showTimer = window.setTimeout(() => this.show(target), wait)
  }

  private scheduleHide(): void {
    clearTimeout(this.showTimer)
    clearTimeout(this.hideTimer)
    if (this.focusTarget === this.trigger || this.hoverTarget === this.trigger) return
    const wait = delay(this.options.hideDelay, 100)
    if (wait === 0) this.hide()
    else this.hideTimer = window.setTimeout(this.hide, wait)
  }

  private onPointerOver = (event: Event): void => {
    const pointer = event as PointerEvent
    if (pointer.pointerType === 'touch') return
    const target = this.resolve(event)
    if (!target || (pointer.relatedTarget instanceof Node && target.contains(pointer.relatedTarget))) return
    this.hoverTarget = target
    this.scheduleShow(target)
  }

  private onPointerOut = (event: Event): void => {
    const pointer = event as PointerEvent
    if (pointer.pointerType === 'touch') return
    const target = this.resolve(event)
    if (!target || (pointer.relatedTarget instanceof Node && target.contains(pointer.relatedTarget))) return
    if (this.hoverTarget === target) this.hoverTarget = null
    this.scheduleHide()
  }

  private onFocusIn = (event: Event): void => {
    const target = this.resolve(event)
    if (!target || Date.now() - this.lastTouchAt < 900) return
    this.focusTarget = target
    this.show(target)
  }

  private onFocusOut = (event: Event): void => {
    const target = this.resolve(event)
    const related = (event as FocusEvent).relatedTarget
    if (!target || (related instanceof Node && target.contains(related))) return
    if (this.focusTarget === target) this.focusTarget = null
    this.scheduleHide()
  }

  private onPointerDown = (event: Event): void => {
    const pointer = event as PointerEvent
    if (pointer.pointerType !== 'touch') return
    const target = this.resolve(event)
    if (!target) return
    this.lastTouchAt = Date.now()
    this.touchTarget = target
    this.touchOrigin = { x: pointer.clientX, y: pointer.clientY }
    this.startScroll()
    clearTimeout(this.touchTimer)
    this.touchTimer = window.setTimeout(() => this.show(target), delay(this.options.touchDelay, 600))
  }

  private onPointerMove = (event: Event): void => {
    const pointer = event as PointerEvent
    if (pointer.pointerType !== 'touch' || !this.touchOrigin) return
    if (Math.hypot(pointer.clientX - this.touchOrigin.x, pointer.clientY - this.touchOrigin.y) > 10) {
      clearTimeout(this.touchTimer)
      this.touchOrigin = null
      this.touchTarget = null
      this.hide()
      this.stopScroll()
    }
  }

  private onPointerUp = (event: Event): void => {
    const pointer = event as PointerEvent
    if (pointer.pointerType !== 'touch') return
    clearTimeout(this.touchTimer)
    this.touchOrigin = null
    this.touchTarget = null
    if (this.opened) this.hideTimer = window.setTimeout(this.hide, delay(this.options.touchHideDelay, 1500))
    else this.stopScroll()
  }

  private onPointerCancel = (event: Event): void => {
    if ((event as PointerEvent).pointerType !== 'touch') return
    this.touchOrigin = null
    this.touchTarget = null
    this.hide()
    this.stopScroll()
  }

  private onClick = (event: Event): void => {
    if (Date.now() - this.lastTouchAt < 900) return
    if (this.resolve(event)) this.hide()
  }

  private onContextMenu = (event: Event): void => {
    if (this.resolve(event)) this.hide()
  }

  private onScroll = (): void => {
    if (this.touchTarget) {
      this.touchTarget = null
      this.touchOrigin = null
      clearTimeout(this.touchTimer)
      this.hide()
      this.stopScroll()
    } else {
      this.schedulePosition()
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && activeTooltip === this) this.hide()
  }

  private onDialogClose = (): void => {
    this.hide()
  }

  private startScroll(): void {
    if (this.scrollListening) return
    document.addEventListener('scroll', this.onScroll, true)
    this.scrollListening = true
  }

  private stopScroll(): void {
    if (!this.scrollListening || this.opened || this.touchTarget) return
    document.removeEventListener('scroll', this.onScroll, true)
    this.scrollListening = false
  }
}

export class SoTooltip {
  static bind(options: SoTooltipOptions): SoTooltipHandle {
    return new TooltipBinding(options)
  }

  static configure(defaults: SoTooltipDefaults): void {
    globalDefaults = { ...globalDefaults, ...defaults }
  }
}

export function bindTooltip(options: SoTooltipOptions): SoTooltipHandle {
  return SoTooltip.bind(options)
}

export function configureTooltip(defaults: SoTooltipDefaults): void {
  SoTooltip.configure(defaults)
}
