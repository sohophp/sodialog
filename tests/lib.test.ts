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
  pushMessage,
  toast,
} from '../src/lib'

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
