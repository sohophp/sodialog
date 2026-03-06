import './sodialog.css'

export type SoPanelKind = 'modal' | 'offcanvas'
export type SoOffcanvasPlacement = 'start' | 'end' | 'top' | 'bottom'

export interface SoDialogBaseOptions {
  title: string
  content: string | Node
  confirmText?: string
  cancelText?: string
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

export interface SoDialogModalOptions extends SoDialogBaseOptions {
  kind?: 'modal'
}

export interface SoDialogOffcanvasOptions extends SoDialogBaseOptions {
  kind: 'offcanvas'
  placement?: SoOffcanvasPlacement
}

export type SoDialogOptions = SoDialogModalOptions | SoDialogOffcanvasOptions

export interface SoDialogHandle {
  dialog: HTMLDialogElement
  close: () => void
}

const CLOSE_MS = 180

function appendContent(container: HTMLElement, content: string | Node): void {
  if (typeof content === 'string') {
    container.innerHTML = content
    return
  }

  container.append(content)
}

function closeDialog(dialog: HTMLDialogElement): void {
  const panel = dialog.querySelector('.sod-panel')
  panel?.classList.add('is-closing')

  window.setTimeout(() => {
    if (dialog.open) {
      dialog.close()
    }
    dialog.remove()
  }, CLOSE_MS)
}

export class SoDialog {
  static open(options: SoDialogOptions): SoDialogHandle {
    const kind: SoPanelKind = options.kind ?? 'modal'

    const dialog = document.createElement('dialog')
    dialog.className = `sod-dialog sod-${kind}`

    const panel = document.createElement('section')
    panel.className = 'sod-panel'

    if (kind === 'offcanvas') {
      const placement = 'placement' in options ? options.placement ?? 'end' : 'end'
      panel.classList.add(`sod-placement-${placement}`)
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

    const cancelButton = document.createElement('button')
    cancelButton.type = 'button'
    cancelButton.className = 'sod-btn sod-btn-outline'
    cancelButton.textContent = options.cancelText ?? '取消'
    cancelButton.addEventListener('click', () => {
      options.onCancel?.()
      closeDialog(dialog)
    })

    const confirmButton = document.createElement('button')
    confirmButton.type = 'button'
    confirmButton.className = 'sod-btn sod-btn-primary'
    confirmButton.textContent = options.confirmText ?? '确认'
    confirmButton.addEventListener('click', () => {
      options.onConfirm?.()
      closeDialog(dialog)
    })

    footer.append(cancelButton, confirmButton)
    panel.append(header, body, footer)
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
      dialog.remove()
    })

    document.body.append(dialog)
    dialog.showModal()

    return {
      dialog,
      close: () => closeDialog(dialog),
    }
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
