import { describe, expect, it, vi } from 'vitest'
import { formModal, openModal, toast } from '../src/lib'

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
