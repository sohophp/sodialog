import { describe, expect, it, vi } from 'vitest'
import { bindContextMenu, formModal, openModal, toast } from '../src/lib'

describe('SoDialog modal behavior', () => {
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
})

describe('SoToast behavior', () => {
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
})
