import { afterEach, describe, expect, it, vi } from 'vitest'
import { bindTooltip, configureTooltip, SoTooltip } from '../src/lib'

const handles: Array<ReturnType<typeof bindTooltip>> = []

function bind(options: Parameters<typeof bindTooltip>[0]) {
  const handle = bindTooltip(options)
  handles.push(handle)
  return handle
}

function pointer(target: Element, type: string, pointerType: string, x = 0, y = 0): void {
  const event = new Event(type, { bubbles: true })
  Object.defineProperties(event, {
    pointerType: { value: pointerType },
    clientX: { value: x },
    clientY: { value: y },
  })
  target.dispatchEvent(event)
}

afterEach(() => {
  handles.splice(0).forEach((handle) => handle.destroy())
  document.body.replaceChildren()
  configureTooltip({ showDelay: 500, hideDelay: 100, skipDelay: 300, touchDelay: 600, touchHideDelay: 1500, disabled: false })
})

describe('SoTooltip', () => {
  it('renders text safely and preserves existing descriptions', () => {
    const button = document.createElement('button')
    button.setAttribute('aria-describedby', 'help')
    document.body.append(button)
    const tooltip = bind({ target: button, content: '<img src=x onerror=alert(1)>', showDelay: 0 })

    expect(tooltip.element).toBeNull()
    button.focus()
    expect(tooltip.isOpen()).toBe(true)
    expect(tooltip.element?.textContent).toBe('<img src=x onerror=alert(1)>')
    expect(tooltip.element?.querySelector('img')).toBeNull()
    expect(button.getAttribute('aria-describedby')).toBe(`help ${tooltip.element?.id}`)

    tooltip.hide()
    expect(button.getAttribute('aria-describedby')).toBe('help')
    tooltip.destroy()
    expect(tooltip.element).toBeNull()
  })

  it('delegates to future targets, updates content, and shows only one tooltip', () => {
    const first = document.createElement('button')
    first.dataset.sodTooltip = 'First'
    const delegated = bind({ target: '[data-sod-tooltip]', showDelay: 0 })
    const other = bind({ target: first, content: 'Other' })
    document.body.append(first)

    delegated.show(first)
    expect(delegated.element?.textContent).toBe('First')
    other.show()
    expect(delegated.isOpen()).toBe(false)
    expect(other.isOpen()).toBe(true)

    const second = document.createElement('button')
    second.dataset.sodTooltip = 'Second'
    document.body.append(second)
    second.focus()
    expect(delegated.isOpen()).toBe(true)
    delegated.show(second)
    expect(other.isOpen()).toBe(false)
    delegated.setContent((target) => `Updated ${target.dataset.sodTooltip}`)
    expect(delegated.element?.textContent).toBe('Updated Second')
  })

  it('handles hover delay, focus, Escape, and trigger click', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(Date.now() + 1000))
    const button = document.createElement('button')
    document.body.append(button)
    const tooltip = bind({ target: button, content: 'Save', showDelay: 500 })

    pointer(button, 'pointerover', 'mouse')
    vi.advanceTimersByTime(499)
    expect(tooltip.isOpen()).toBe(false)
    vi.advanceTimersByTime(1)
    expect(tooltip.isOpen()).toBe(true)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(tooltip.isOpen()).toBe(false)

    button.focus()
    expect(tooltip.isOpen()).toBe(true)
    button.click()
    expect(tooltip.isOpen()).toBe(false)
    expect(document.activeElement).toBe(button)
  })

  it('opens after touch hold and cancels on movement or scroll', () => {
    vi.useFakeTimers()
    const button = document.createElement('button')
    document.body.append(button)
    const tooltip = bind({ target: button, content: 'Touch' })

    pointer(button, 'pointerdown', 'touch', 10, 10)
    pointer(button, 'pointermove', 'touch', 30, 10)
    vi.advanceTimersByTime(600)
    expect(tooltip.isOpen()).toBe(false)

    pointer(button, 'pointerdown', 'touch', 10, 10)
    document.dispatchEvent(new Event('scroll'))
    vi.advanceTimersByTime(600)
    expect(tooltip.isOpen()).toBe(false)

    pointer(button, 'pointerdown', 'touch', 10, 10)
    vi.advanceTimersByTime(600)
    expect(tooltip.isOpen()).toBe(true)
    pointer(button, 'pointerup', 'touch', 10, 10)
    vi.advanceTimersByTime(1499)
    expect(tooltip.isOpen()).toBe(true)
    vi.advanceTimersByTime(1)
    expect(tooltip.isOpen()).toBe(false)
  })

  it('flips and clamps placement and mounts inside a dialog fallback', () => {
    const dialog = document.createElement('dialog')
    dialog.setAttribute('open', '')
    const button = document.createElement('button')
    dialog.append(button)
    document.body.append(dialog)
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      x: 5, y: 2, left: 5, top: 2, right: 25, bottom: 22, width: 20, height: 20,
      toJSON: () => ({}),
    })
    const tooltip = bind({ target: button, content: 'Position', placement: 'top' })
    tooltip.show()
    expect(tooltip.element?.parentElement).toBe(dialog)
    expect(tooltip.element?.dataset.placement).toBe('bottom')
    expect(Number.parseFloat(tooltip.element?.style.left ?? '0')).toBeGreaterThanOrEqual(8)
    dialog.dispatchEvent(new Event('close'))
    expect(tooltip.isOpen()).toBe(false)
  })

  it('uses Popover when available and clears state when trigger is removed', async () => {
    const button = document.createElement('button')
    document.body.append(button)
    const showPopover = vi.fn()
    const hidePopover = vi.fn()
    const tooltip = SoTooltip.bind({ target: button, content: 'Pop' })
    handles.push(tooltip)
    tooltip.show()
    Object.assign(tooltip.element!, { showPopover, hidePopover })
    tooltip.hide()
    tooltip.show()
    expect(showPopover).toHaveBeenCalledOnce()
    button.remove()
    await Promise.resolve()
    expect(tooltip.isOpen()).toBe(false)
    expect(hidePopover).toHaveBeenCalled()
  })

  it('supports SVG elements and cancels pending work on destroy', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(Date.now() + 1000))
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    icon.setAttribute('data-sod-tooltip', 'SVG hint')
    document.body.append(icon)
    const tooltip = bind({ target: icon, showDelay: 500 })

    pointer(icon, 'pointerover', 'mouse')
    expect(tooltip.isOpen()).toBe(false)
    tooltip.destroy()
    vi.advanceTimersByTime(500)
    expect(tooltip.isOpen()).toBe(false)
    expect(tooltip.element).toBeNull()

    const next = bind({ target: icon })
    next.show()
    expect(next.element?.textContent).toBe('SVG hint')
    expect(icon.getAttribute('aria-describedby')).toBe(next.element?.id)
    next.destroy()
    expect(icon.hasAttribute('aria-describedby')).toBe(false)
  })
})
