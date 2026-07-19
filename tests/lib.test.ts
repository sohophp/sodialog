import { describe, expect, it, vi } from 'vitest'
import {
  bindContextMenu,
  bindDialogContextMenu,
  configureContextMenu,
  configureDialog,
  configureAdapter,
  formModal,
  openDialogFromContextMenu,
  openDialog,
  openModal,
  openOffcanvas,
  pushMessage,
  toast,
} from '../src/lib'

describe('SoDialog modal behavior', () => {
  const dispatchPointerEvent = (
    target: EventTarget,
    type: string,
    init: { button?: number; clientX?: number; clientY?: number; pointerId?: number } = {},
  ) => {
    const event = new Event(type, { bubbles: true, cancelable: true }) as PointerEvent
    Object.defineProperties(event, {
      button: { value: init.button ?? 0 },
      clientX: { value: init.clientX ?? 0 },
      clientY: { value: init.clientY ?? 0 },
      pointerId: { value: init.pointerId ?? 1 },
    })
    target.dispatchEvent(event)
    return event
  }

  it('removes native dialog chrome before the first open', () => {
    const handle = openModal({
      title: 'borderless modal',
      content: 'x',
    })

    expect(handle.dialog.style.border).toBe('0px')
    expect(handle.dialog.style.outline).toBe('none')
    expect(handle.dialog.style.boxShadow).toBe('none')
    expect(handle.dialog.open).toBe(true)
  })

  it('applies custom modal width and height', () => {
    const handle = openModal({
      title: 'sized modal',
      content: 'x',
      width: '42rem',
      height: 520,
    })

    const panel = handle.dialog.querySelector<HTMLElement>('.sod-panel')
    expect(panel?.style.width).toBe('42rem')
    expect(panel?.style.height).toBe('520px')
    expect(panel?.classList.contains('sod-modal-autofit')).toBe(false)
  })

  it('enables header dragging by default for modals', () => {
    const handle = openModal({
      title: 'draggable modal',
      content: 'x',
    })

    const panel = handle.dialog.querySelector<HTMLElement>('.sod-panel')
    const header = handle.dialog.querySelector<HTMLElement>('.sod-header')
    const body = handle.dialog.querySelector<HTMLElement>('.sod-body')

    expect(panel?.classList.contains('sod-modal-draggable')).toBe(true)
    expect(header?.classList.contains('sod-drag-handle')).toBe(true)
    expect(body?.classList.contains('sod-drag-handle')).toBe(false)
  })

  it('can disable modal dragging', () => {
    const handle = openModal({
      title: 'static modal',
      content: 'x',
      draggable: false,
    })

    const panel = handle.dialog.querySelector<HTMLElement>('.sod-panel')
    expect(panel?.classList.contains('sod-modal-draggable')).toBe(false)
    expect(handle.dialog.querySelector<HTMLElement>('.sod-header')?.classList.contains('sod-drag-handle')).toBe(false)
  })

  it('supports body and footer drag handles', () => {
    const handle = openModal({
      title: 'custom handles',
      content: 'x',
      dragHandle: ['body', 'footer'],
    })

    expect(handle.dialog.querySelector<HTMLElement>('.sod-header')?.classList.contains('sod-drag-handle')).toBe(false)
    expect(handle.dialog.querySelector<HTMLElement>('.sod-body')?.classList.contains('sod-drag-handle')).toBe(true)
    expect(handle.dialog.querySelector<HTMLElement>('.sod-footer')?.classList.contains('sod-drag-handle')).toBe(true)
  })

  it('waits for pointer movement before applying fixed drag styles', () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0)
      return 1
    })
    const handle = openModal({
      title: 'steady drag',
      content: 'x',
    })
    const panel = handle.dialog.querySelector<HTMLElement>('.sod-panel')
    const header = handle.dialog.querySelector<HTMLElement>('.sod-header')

    expect(panel).not.toBeNull()
    expect(header).not.toBeNull()

    vi.spyOn(panel!, 'getBoundingClientRect').mockReturnValue({
      x: 100,
      y: 120,
      left: 100,
      top: 120,
      right: 460,
      bottom: 340,
      width: 360,
      height: 220,
      toJSON: () => ({}),
    } as DOMRect)
    header!.setPointerCapture = vi.fn()

    dispatchPointerEvent(header!, 'pointerdown', { button: 0, clientX: 130, clientY: 150, pointerId: 7 })

    expect(panel!.style.position).toBe('')
    expect(panel!.classList.contains('sod-is-dragging')).toBe(false)

    dispatchPointerEvent(window, 'pointermove', { clientX: 131, clientY: 151, pointerId: 7 })

    expect(panel!.style.position).toBe('')
    expect(panel!.classList.contains('sod-is-dragging')).toBe(false)

    dispatchPointerEvent(window, 'pointermove', { clientX: 142, clientY: 164, pointerId: 7 })

    expect(panel!.style.position).toBe('fixed')
    expect(panel!.style.left).toBe('112px')
    expect(panel!.style.top).toBe('134px')
    expect(panel!.classList.contains('sod-is-dragging')).toBe(true)

    raf.mockRestore()
  })

  it('keeps the dragged position stable when pressing the handle again', () => {
    let queuedFrame: FrameRequestCallback | null = null
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      queuedFrame = callback
      return 1
    })
    const cancelRaf = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
      queuedFrame = null
    })
    const handle = openModal({
      title: 'repeat drag',
      content: 'x',
    })
    const panel = handle.dialog.querySelector<HTMLElement>('.sod-panel')
    const header = handle.dialog.querySelector<HTMLElement>('.sod-header')

    expect(panel).not.toBeNull()
    expect(header).not.toBeNull()

    const rect = {
      x: 100,
      y: 120,
      left: 100,
      top: 120,
      right: 460,
      bottom: 340,
      width: 360,
      height: 220,
      toJSON: () => ({}),
    } as DOMRect
    const rectSpy = vi.spyOn(panel!, 'getBoundingClientRect').mockReturnValue(rect)
    header!.setPointerCapture = vi.fn()
    header!.hasPointerCapture = vi.fn().mockReturnValue(false)

    dispatchPointerEvent(header!, 'pointerdown', { button: 0, clientX: 130, clientY: 150, pointerId: 11 })
    dispatchPointerEvent(window, 'pointermove', { clientX: 160, clientY: 180, pointerId: 11 })
    dispatchPointerEvent(window, 'pointerup', { clientX: 160, clientY: 180, pointerId: 11 })

    expect(queuedFrame).toBeNull()
    expect(panel!.style.left).toBe('130px')
    expect(panel!.style.top).toBe('150px')

    rectSpy.mockReturnValue({
      ...rect,
      x: 130,
      y: 150,
      left: 130,
      top: 150,
      right: 490,
      bottom: 370,
    } as DOMRect)

    dispatchPointerEvent(header!, 'pointerdown', { button: 0, clientX: 150, clientY: 170, pointerId: 12 })
    dispatchPointerEvent(window, 'pointerup', { clientX: 150, clientY: 170, pointerId: 12 })

    expect(panel!.style.left).toBe('130px')
    expect(panel!.style.top).toBe('150px')
    expect(panel!.classList.contains('sod-is-dragging')).toBe(false)

    raf.mockRestore()
    cancelRaf.mockRestore()
  })

  it('applies optional modal presets', () => {
    const handle = openModal({
      title: 'Ready to deploy',
      content: 'All checks passed.',
      preset: 'deploy',
    })

    const panel = handle.dialog.querySelector<HTMLElement>('.sod-panel')
    expect(panel?.classList.contains('sod-preset-deploy')).toBe(true)
  })

  it('can hide modal header while preserving an accessible name', () => {
    const handle = openModal({
      title: 'headerless',
      content: 'x',
      hideHeader: true,
    })

    expect(handle.dialog.querySelector('.sod-header')).toBeNull()
    expect(handle.dialog.getAttribute('aria-label')).toBe('headerless')
    expect(handle.dialog.hasAttribute('aria-labelledby')).toBe(false)
  })

  it('can hide or customize the modal close button', () => {
    const withoutClose = openModal({
      title: 'no close',
      content: 'x',
      hideCloseButton: true,
    })

    expect(withoutClose.dialog.querySelector('.sod-close')).toBeNull()

    const customized = openModal({
      title: 'custom close',
      content: 'x',
      closeButtonLabel: 'Dismiss dialog',
      closeButtonText: 'Close',
    })
    const closeButton = customized.dialog.querySelector<HTMLButtonElement>('.sod-close')

    expect(closeButton?.getAttribute('aria-label')).toBe('Dismiss dialog')
    expect(closeButton?.textContent).toBe('Close')
  })

  it('applies custom offcanvas width and height', () => {
    const handle = openOffcanvas({
      title: 'sized offcanvas',
      content: 'x',
      placement: 'end',
      width: 480,
      height: '80vh',
    })

    const panel = handle.dialog.querySelector<HTMLElement>('.sod-panel')
    expect(panel?.style.width).toBe('480px')
    expect(panel?.style.height).toBe('80vh')
  })

  it('renders an HTMLElement title in an offcanvas and preserves its accessible name', () => {
    const title = document.createElement('span')
    title.dataset.testid = 'custom-title'
    title.textContent = 'Document preview'

    const handle = openOffcanvas({
      title,
      content: 'x',
      placement: 'end',
    })

    const titleElement = handle.dialog.querySelector<HTMLElement>('.sod-title')
    expect(titleElement?.querySelector('[data-testid="custom-title"]')).toBe(title)
    expect(titleElement?.textContent).toBe('Document preview')
    expect(handle.dialog.getAttribute('aria-labelledby')).toBe(titleElement?.id)
  })

  it('uses an HTMLElement title text as the accessible name when the header is hidden', () => {
    const title = document.createElement('span')
    title.textContent = 'Accessible document title'

    const handle = openModal({
      title,
      content: 'x',
      hideHeader: true,
    })

    expect(handle.dialog.getAttribute('aria-label')).toBe('Accessible document title')
  })

  it('reuses explicit modal id instance', () => {
    const created = vi.fn()
    const reused = vi.fn()

    const first = openModal({
      id: 'reuse-case',
      title: 'first',
      content: '<p>hello</p>',
      onCreated: created,
      onReused: reused,
    })

    const second = openModal({
      id: 'reuse-case',
      title: 'second',
      content: '<p>world</p>',
      onCreated: created,
      onReused: reused,
    })

    expect(created).toHaveBeenCalledTimes(1)
    expect(reused).toHaveBeenCalledTimes(1)
    expect(second.dialog).toBe(first.dialog)
  })

  it('destroys explicit id modal by default on confirm', async () => {
    const handle = openModal({
      id: 'destroy-on-confirm',
      title: 'confirm',
      content: '<p>x</p>',
      confirmText: 'ok',
      cancelText: 'no',
    })

    const confirmButton = handle.dialog.querySelector<HTMLButtonElement>('.sod-btn-primary')
    expect(confirmButton).toBeTruthy()
    confirmButton?.click()

    await vi.runAllTimersAsync()

    expect(handle.dialog.isConnected).toBe(false)
  })

  it('submits structured values via formModal', async () => {
    const resultPromise = formModal({
      title: 'create task',
      fields: [
        { name: 'title', label: 'Title', required: true },
        {
          name: 'level',
          label: 'Level',
          type: 'select',
          options: [
            { label: 'P0', value: 'p0' },
            { label: 'P1', value: 'p1' },
          ],
        },
        { name: 'needReview', label: 'Need review', type: 'checkbox', defaultValue: false },
      ],
    })

    const titleInput = document.querySelector<HTMLInputElement>('#sod-form-title')
    const levelSelect = document.querySelector<HTMLSelectElement>('#sod-form-level')
    const reviewCheckbox = document.querySelector<HTMLInputElement>('#sod-form-needReview')

    expect(titleInput).toBeTruthy()
    titleInput!.value = 'release prep'
    levelSelect!.value = 'p0'
    reviewCheckbox!.checked = true

    const confirmButton = document.querySelector<HTMLButtonElement>('.sod-btn-primary')
    confirmButton?.click()

    await vi.runAllTimersAsync()

    await expect(resultPromise).resolves.toEqual({
      title: 'release prep',
      level: 'p0',
      needReview: true,
    })
  })

  it('restores focus to trigger after close', async () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'open'
    document.body.append(trigger)
    trigger.focus()

    const handle = openModal({
      title: 'focus restore',
      content: '<p>content</p>',
      confirmText: 'ok',
      cancelText: 'cancel',
    })

    const cancelButton = handle.dialog.querySelector<HTMLButtonElement>('.sod-btn-outline')
    cancelButton?.click()

    await vi.runAllTimersAsync()

    expect(document.activeElement).toBe(trigger)
  })

  it('sets aria-labelledby and aria-describedby on dialog', () => {
    const handle = openModal({
      title: 'a11y labels',
      content: '<p>modal body</p>',
    })

    const labelledBy = handle.dialog.getAttribute('aria-labelledby')
    const describedBy = handle.dialog.getAttribute('aria-describedby')

    expect(labelledBy).toBeTruthy()
    expect(describedBy).toBeTruthy()
    expect(handle.dialog.querySelector(`#${labelledBy}`)?.textContent).toBe('a11y labels')
    expect(handle.dialog.querySelector(`#${describedBy}`)?.textContent).toContain('modal body')
  })
})

describe('SoToast behavior', () => {
  it('applies and updates custom width and height', () => {
    const handle = toast({
      content: 'sized toast',
      duration: false,
      width: 360,
      height: '8rem',
    })

    expect(handle.element.style.width).toBe('360px')
    expect(handle.element.style.height).toBe('8rem')

    handle.update({ width: '24rem', height: 140 })
    expect(handle.element.style.width).toBe('24rem')
    expect(handle.element.style.height).toBe('140px')
  })

  it('queues toasts when maxVisible is reached', async () => {
    const first = toast({
      id: 'q-1',
      content: 'first',
      placement: 'top-end',
      maxVisible: 1,
      duration: false,
    })

    toast({
      id: 'q-2',
      content: 'second',
      placement: 'top-end',
      maxVisible: 1,
      duration: false,
    })

    expect(document.querySelectorAll('.sod-toast').length).toBe(1)
    expect(document.body.textContent).toContain('first')

    first.close('manual')
    await vi.advanceTimersByTimeAsync(250)

    expect(document.querySelectorAll('.sod-toast').length).toBe(1)
    expect(document.body.textContent).toContain('second')
  })

  it('applies duplicate strategies ignore and stack', async () => {
    const first = toast({
      id: 'dup-case',
      content: 'alpha',
      duration: false,
    })

    const ignored = toast({
      id: 'dup-case',
      content: 'beta',
      duplicateStrategy: 'ignore',
      duration: false,
    })

    expect(ignored.id).toBe(first.id)
    expect(document.body.textContent).toContain('alpha')
    expect(document.body.textContent).not.toContain('beta')

    const stacked = toast({
      id: 'dup-case',
      content: 'gamma',
      duplicateStrategy: 'stack',
      duration: false,
    })

    expect(stacked.id).not.toBe(first.id)
    expect(document.querySelectorAll('.sod-toast').length).toBe(2)

    first.close('manual')
    stacked.close('manual')
    await vi.advanceTimersByTimeAsync(250)
  })

  it('restarts timer with restart-timer duplicate strategy', async () => {
    const onClose = vi.fn()

    toast({
      id: 'timer-case',
      content: 'initial',
      duration: 100,
      onClose,
    })

    await vi.advanceTimersByTimeAsync(70)

    toast({
      id: 'timer-case',
      content: 'updated',
      duplicateStrategy: 'restart-timer',
    })

    await vi.advanceTimersByTimeAsync(50)
    expect(onClose).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(320)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledWith('timeout', expect.objectContaining({ id: 'timer-case' }))
  })
})

describe('SoContextMenu behavior', () => {
  it('applies custom width and height', () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
      width: 260,
      height: '12rem',
    })

    handle.openAt(20, 20, trigger)

    expect(handle.element.style.width).toBe('260px')
    expect(handle.element.style.height).toBe('12rem')
  })

  it('opens on contextmenu event and triggers item action', async () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const actionSpy = vi.fn()
    const handle = bindContextMenu({
      target: trigger,
      items: [
        {
          id: 'rename',
          label: 'Rename',
          onClick: () => {
            actionSpy()
          },
        },
      ],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 24,
        clientY: 30,
      }),
    )

    const menu = document.querySelector<HTMLElement>('.sod-context-menu')
    expect(menu).toBeTruthy()
    expect(menu?.hidden).toBe(false)

    const firstItem = menu?.querySelector<HTMLButtonElement>('.sod-context-menu-item')
    firstItem?.click()
    await Promise.resolve()

    expect(actionSpy).toHaveBeenCalledTimes(1)
    expect(handle.isOpen()).toBe(false)
  })

  it('supports delegated selector binding and closes on outside click', () => {
    const host = document.createElement('div')
    host.innerHTML = '<button class="row-trigger">Row</button>'
    document.body.append(host)

    bindContextMenu({
      target: '.row-trigger',
      items: [{ id: 'copy', label: 'Copy' }],
    })

    const rowTrigger = host.querySelector<HTMLElement>('.row-trigger')
    expect(rowTrigger).toBeTruthy()

    rowTrigger?.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 48,
        clientY: 52,
      }),
    )

    const menu = document.querySelector<HTMLElement>('.sod-context-menu')
    expect(menu?.hidden).toBe(false)

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    expect(menu?.hidden).toBe(true)
  })

  it('closes on outside mousedown fallback', () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 30,
        clientY: 30,
      }),
    )

    expect(handle.isOpen()).toBe(true)

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(handle.isOpen()).toBe(false)
  })

  it('mounts menu inside open dialog when triggered from dialog content', () => {
    const dialog = document.createElement('dialog')
    dialog.open = true
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'row'
    dialog.append(trigger)
    document.body.append(dialog)

    bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 60,
        clientY: 64,
      }),
    )

    const menu = document.querySelector<HTMLElement>('.sod-context-menu')
    expect(menu).toBeTruthy()
    expect(menu?.parentElement).toBe(dialog)
  })

  it('renders icon class for menu item', () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    bindContextMenu({
      target: trigger,
      items: [{ id: 'edit', label: 'Edit', icon: 'bi bi-pencil-square' }],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 30,
        clientY: 36,
      }),
    )

    const icon = document.querySelector('.sod-context-menu-icon i')
    expect(icon).toBeTruthy()
    expect(icon?.className).toContain('bi bi-pencil-square')
  })

  it('closes on Escape key', () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const onClose = vi.fn()
    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
      onClose,
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 20,
        clientY: 20,
      }),
    )

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    expect(handle.isOpen()).toBe(false)
    expect(onClose).toHaveBeenCalledWith('esc', expect.objectContaining({ id: handle.id }))
  })

  it('closes on window blur by default', () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const onClose = vi.fn()
    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
      onClose,
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 20,
        clientY: 20,
      }),
    )

    window.dispatchEvent(new Event('blur'))

    expect(handle.isOpen()).toBe(false)
    expect(onClose).toHaveBeenCalledWith('blur', expect.objectContaining({ id: handle.id }))
  })

  it('closes on window scroll by default', () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const onClose = vi.fn()
    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
      onClose,
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 20,
        clientY: 20,
      }),
    )

    window.dispatchEvent(new Event('scroll'))

    expect(handle.isOpen()).toBe(false)
    expect(onClose).toHaveBeenCalledWith('scroll', expect.objectContaining({ id: handle.id }))
  })

  it('closes on window resize by default', () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const onClose = vi.fn()
    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
      onClose,
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 20,
        clientY: 20,
      }),
    )

    window.dispatchEvent(new Event('resize'))

    expect(handle.isOpen()).toBe(false)
    expect(onClose).toHaveBeenCalledWith('resize', expect.objectContaining({ id: handle.id }))
  })

  it('removes trigger listeners after destroy', () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
    })

    handle.destroy()

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 40,
        clientY: 44,
      }),
    )

    const menu = document.querySelector<HTMLElement>('.sod-context-menu')
    expect(menu).toBeNull()
  })

  it('passes traceId into lifecycle and action contexts', async () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    const traces: Array<string | undefined> = []

    bindContextMenu({
      target: trigger,
      traceId: 'trace-cm-1',
      items: [{ id: 'copy', label: 'Copy', onClick: ({ traceId }) => traces.push(traceId) }],
      onLifecycle: (context) => traces.push(context.traceId),
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 20,
        clientY: 20,
      }),
    )

    document.querySelector<HTMLButtonElement>('.sod-context-menu-item')?.click()
    await Promise.resolve()

    expect(traces.every((value) => value === 'trace-cm-1')).toBe(true)
  })

  it('restores focus to trigger after close', () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'row'
    document.body.append(trigger)
    trigger.focus()

    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 18,
        clientY: 18,
      }),
    )

    expect(handle.isOpen()).toBe(true)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    expect(handle.isOpen()).toBe(false)
    expect(document.activeElement).toBe(trigger)
  })

  it('tracks trigger aria-expanded and aria-controls', () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 22,
        clientY: 22,
      }),
    )

    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(trigger.getAttribute('aria-controls')).toBe(handle.element.id)

    handle.close('programmatic')

    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('supports keyboard navigation and activation', async () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const actionSpy = vi.fn()
    const handle = bindContextMenu({
      target: trigger,
      items: [
        { id: 'rename', label: 'Rename' },
        {
          id: 'delete',
          label: 'Delete',
          onClick: () => {
            actionSpy()
          },
        },
      ],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 24,
        clientY: 20,
      }),
    )

    const menu = handle.element
    const items = Array.from(menu.querySelectorAll<HTMLButtonElement>('.sod-context-menu-item'))
    expect(document.activeElement).toBe(items[0])

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(document.activeElement).toBe(items[1])

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await Promise.resolve()

    expect(actionSpy).toHaveBeenCalledTimes(1)
    expect(handle.isOpen()).toBe(false)
  })

  it('emits onFocusItem during keyboard focus changes', () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const focused: string[] = []
    const handle = bindContextMenu({
      target: trigger,
      items: [
        { id: 'download', label: '下载 Download' },
        { id: 'rename', label: '重命名 Rename' },
      ],
      onFocusItem: ({ itemId }) => {
        focused.push(itemId)
      },
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 24,
        clientY: 18,
      }),
    )

    const menu = handle.element
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

    expect(focused).toContain('download')
    expect(focused).toContain('rename')
  })

  it('supports typeahead focus by first character', () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const handle = bindContextMenu({
      target: trigger,
      items: [
        { id: 'copy', label: 'Copy' },
        { id: 'delete', label: 'Delete' },
        { id: 'rename', label: 'Rename' },
      ],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 26,
        clientY: 20,
      }),
    )

    const menu = handle.element
    const items = Array.from(menu.querySelectorAll<HTMLButtonElement>('.sod-context-menu-item'))
    expect(document.activeElement).toBe(items[0])

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }))
    expect(document.activeElement).toBe(items[1])
  })

  it('supports typeahead on mixed labels and cycles forward', () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const handle = bindContextMenu({
      target: trigger,
      items: [
        { id: 'download', label: '下载 Download' },
        { id: 'rename', label: '重命名 Rename' },
        { id: 'delete', label: '删除 Delete' },
      ],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 28,
        clientY: 20,
      }),
    )

    const menu = handle.element
    const items = Array.from(menu.querySelectorAll<HTMLButtonElement>('.sod-context-menu-item'))
    expect(document.activeElement).toBe(items[0])

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }))
    expect(document.activeElement).toBe(items[2])

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }))
    expect(document.activeElement).toBe(items[0])

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true }))
    expect(document.activeElement).toBe(items[1])
  })

  it('emits onTypeahead for matched and unmatched queries', () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const traces: Array<{ query: string; matched: boolean; itemId?: string }> = []
    const handle = bindContextMenu({
      target: trigger,
      items: [
        { id: 'download', label: '下载 Download' },
        { id: 'rename', label: '重命名 Rename' },
        { id: 'delete', label: '删除 Delete' },
      ],
      onTypeahead: ({ query, matched, itemId }) => {
        traces.push({ query, matched, itemId })
      },
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 30,
        clientY: 20,
      }),
    )

    const menu = handle.element
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }))
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', bubbles: true }))

    expect(traces[0]).toEqual({ query: 'd', matched: true, itemId: 'delete' })
    expect(traces[1]).toEqual({ query: 'z', matched: false, itemId: undefined })
  })

  it('resets typeahead query by typeaheadResetMs window', async () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const queries: string[] = []
    const handle = bindContextMenu({
      target: trigger,
      typeaheadResetMs: 120,
      items: [
        { id: 'download', label: '下载 Download' },
        { id: 'delete', label: '删除 Delete' },
      ],
      onTypeahead: ({ query }) => {
        queries.push(query)
      },
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 30,
        clientY: 20,
      }),
    )

    const menu = handle.element
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }))
    await vi.advanceTimersByTimeAsync(160)
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', bubbles: true }))

    expect(queries).toEqual(['d', 'e'])
  })

  it('can disable typeahead per instance', () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const queries: string[] = []
    const handle = bindContextMenu({
      target: trigger,
      typeaheadEnabled: false,
      items: [
        { id: 'download', label: '下载 Download' },
        { id: 'rename', label: '重命名 Rename' },
      ],
      onTypeahead: ({ query }) => {
        queries.push(query)
      },
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 30,
        clientY: 20,
      }),
    )

    const menu = handle.element
    const items = Array.from(menu.querySelectorAll<HTMLButtonElement>('.sod-context-menu-item'))
    expect(document.activeElement).toBe(items[0])

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true }))

    expect(document.activeElement).toBe(items[0])
    expect(queries).toEqual([])
  })
})

describe('Adapter behavior', () => {
  it('opens modal via openDialog with adapter defaults', () => {
    configureAdapter({
      modalDefaults: {
        footerAlign: 'center',
      },
    })

    const handle = openDialog({
      title: 'adapter modal',
      content: 'hello',
    })

    const footer = handle.dialog.querySelector<HTMLElement>('.sod-footer')
    expect(footer?.dataset.align).toBe('center')
  })

  it('binds context menu via adapter helper', () => {
    configureAdapter({
      contextMenuDefaults: {
        closeOnEsc: false,
      },
    })

    const trigger = document.createElement('div')
    document.body.append(trigger)

    const handle = bindDialogContextMenu({
      target: trigger,
      items: [{ id: 'x', label: 'x' }],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 10,
        clientY: 10,
      }),
    )

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(handle.isOpen()).toBe(true)
  })

  it('pushMessage applies level and defaults', () => {
    configureAdapter({
      toastDefaults: {
        placement: 'bottom-end',
        maxVisible: 2,
      },
    })

    const handle = pushMessage('warning', 'watch out', {
      duration: false,
    })

    expect(handle.element.className).toContain('sod-toast-warning')
    expect(document.querySelector('.sod-toast-layer-bottom-end')).toBeTruthy()
  })

  it('closes context menu before opening dialog via helper', async () => {
    const trigger = document.createElement('div')
    document.body.append(trigger)

    let menuHandle: ReturnType<typeof bindDialogContextMenu> | null = null
    menuHandle = bindDialogContextMenu({
      target: trigger,
      items: [
        {
          id: 'open-dialog',
          label: 'Open Dialog',
          onClick: () => {
            if (!menuHandle) {
              return
            }
            openDialogFromContextMenu(menuHandle, {
              title: 'From Context Menu',
              content: 'opened',
            })
          },
        },
      ],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 20,
        clientY: 20,
      }),
    )

    expect(menuHandle.isOpen()).toBe(true)
    document.querySelector<HTMLButtonElement>('.sod-context-menu-item')?.click()
    await Promise.resolve()

    expect(menuHandle.isOpen()).toBe(false)
    expect(document.querySelector('dialog.sod-dialog')).toBeTruthy()
  })

  it('emits structured diagnostics through adapter logger', () => {
    const events: Array<Record<string, unknown>> = []
    configureAdapter({
      diagnosticsEnabled: true,
      logger: (event) => {
        events.push(event as unknown as Record<string, unknown>)
      },
    })

    openDialog({
      title: 'diagnostics',
      content: 'x',
      traceId: 'trace-diag-1',
    })

    pushMessage('info', 'hello', {
      traceId: 'trace-diag-1',
      duration: false,
    })

    const hasDialogEvent = events.some((event) => event.action === 'openDialog' && event.traceId === 'trace-diag-1')
    const hasToastEvent = events.some((event) => event.action === 'pushMessage' && event.traceId === 'trace-diag-1')

    expect(hasDialogEvent).toBe(true)
    expect(hasToastEvent).toBe(true)
  })

  it('emits context-menu focus and typeahead diagnostics through adapter logger', () => {
    const events: Array<Record<string, unknown>> = []
    configureAdapter({
      diagnosticsEnabled: true,
      logger: (event) => {
        events.push(event as unknown as Record<string, unknown>)
      },
    })

    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const handle = bindDialogContextMenu({
      target: trigger,
      traceId: 'trace-diag-ctx-1',
      items: [
        { id: 'download', label: '下载 Download' },
        { id: 'rename', label: '重命名 Rename' },
        { id: 'delete', label: '删除 Delete' },
      ],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 24,
        clientY: 18,
      }),
    )

    const menu = handle.element
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }))

    const hasFocusEvent = events.some(
      (event) => event.action === 'bindDialogContextMenu' && event.phase === 'focus' && event.traceId === 'trace-diag-ctx-1',
    )
    const hasTypeaheadEvent = events.some(
      (event) => event.action === 'bindDialogContextMenu' && event.phase === 'typeahead' && event.traceId === 'trace-diag-ctx-1',
    )

    expect(hasFocusEvent).toBe(true)
    expect(hasTypeaheadEvent).toBe(true)
  })
})

describe('Global configure behavior', () => {
  it('applies dialog global defaults for modal and offcanvas', () => {
    configureDialog({
      modalDefaults: {
        footerAlign: 'center',
      },
      offcanvasDefaults: {
        placement: 'start',
      },
    })

    const modal = openModal({
      title: 'global modal',
      content: 'x',
    })
    const offcanvas = openDialog({
      kind: 'offcanvas',
      title: 'global offcanvas',
      content: 'x',
    })

    expect(modal.dialog.querySelector<HTMLElement>('.sod-footer')?.dataset.align).toBe('center')
    expect(offcanvas.dialog.querySelector('.sod-placement-start')).toBeTruthy()

  })

  it('applies context menu global defaults', () => {
    configureContextMenu({
      closeOnEsc: false,
      attrs: {
        'data-cm-global': 'yes',
      },
    })

    const trigger = document.createElement('div')
    document.body.append(trigger)

    const handle = bindContextMenu({
      target: trigger,
      items: [{ id: 'copy', label: 'Copy' }],
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 14,
        clientY: 14,
      }),
    )

    expect(handle.element.getAttribute('data-cm-global')).toBe('yes')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(handle.isOpen()).toBe(true)

  })

  it('applies context menu global typeaheadResetMs default', async () => {
    configureContextMenu({
      typeaheadResetMs: 120,
    })

    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const queries: string[] = []
    const handle = bindContextMenu({
      target: trigger,
      items: [
        { id: 'download', label: '下载 Download' },
        { id: 'delete', label: '删除 Delete' },
      ],
      onTypeahead: ({ query }) => {
        queries.push(query)
      },
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 16,
        clientY: 16,
      }),
    )

    const menu = handle.element
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }))
    await vi.advanceTimersByTimeAsync(160)
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', bubbles: true }))

    expect(queries).toEqual(['d', 'e'])
  })

  it('applies context menu global typeaheadEnabled default', () => {
    configureContextMenu({
      typeaheadEnabled: false,
    })

    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.textContent = 'menu'
    document.body.append(trigger)

    const queries: string[] = []
    const handle = bindContextMenu({
      target: trigger,
      items: [
        { id: 'download', label: '下载 Download' },
        { id: 'rename', label: '重命名 Rename' },
      ],
      onTypeahead: ({ query }) => {
        queries.push(query)
      },
    })

    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 18,
        clientY: 18,
      }),
    )

    const menu = handle.element
    const items = Array.from(menu.querySelectorAll<HTMLButtonElement>('.sod-context-menu-item'))
    expect(document.activeElement).toBe(items[0])

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true }))

    expect(document.activeElement).toBe(items[0])
    expect(queries).toEqual([])
  })
})

describe('Dialog layout-stable and trace', () => {
  it('fires onLayoutStable after open', async () => {
    const spy = vi.fn()
    openModal({
      title: 'stable',
      content: 'body',
      layoutStableFrames: 1,
      onLayoutStable: spy,
    })

    await vi.advanceTimersByTimeAsync(20)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('passes traceId through dialog lifecycle and action', async () => {
    const traces: Array<string | undefined> = []
    const handle = openModal({
      title: 'trace',
      content: 'x',
      traceId: 'trace-dialog-1',
      onLifecycle: (context) => traces.push(context.traceId),
      onAction: (context) => traces.push(context.traceId),
      layoutStableFrames: 1,
    })

    handle.dialog.querySelector<HTMLButtonElement>('.sod-btn-primary')?.click()
    await vi.runAllTimersAsync()

    expect(traces.length).toBeGreaterThan(0)
    expect(traces.every((value) => value === 'trace-dialog-1')).toBe(true)
  })
})
