import { afterEach, beforeEach, vi } from 'vitest'
import { SoToast } from '../src/lib'

class MockResizeObserver {
  observe(): void {
    // no-op
  }

  disconnect(): void {
    // no-op
  }
}

if (!('ResizeObserver' in globalThis)) {
  Object.defineProperty(globalThis, 'ResizeObserver', {
    value: MockResizeObserver,
    writable: true,
  })
}

if (!('showModal' in HTMLDialogElement.prototype)) {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    value: function showModal(this: HTMLDialogElement) {
      this.open = true
    },
    writable: true,
  })
}

if (!('show' in HTMLDialogElement.prototype)) {
  Object.defineProperty(HTMLDialogElement.prototype, 'show', {
    value: function show(this: HTMLDialogElement) {
      this.open = true
    },
    writable: true,
  })
}

Object.defineProperty(HTMLDialogElement.prototype, 'close', {
  value: function close(this: HTMLDialogElement) {
    if (!this.open) {
      return
    }
    this.open = false
    this.dispatchEvent(new Event('close'))
  },
  writable: true,
})

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  SoToast.closeAll()
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
  document.body.innerHTML = ''
})
