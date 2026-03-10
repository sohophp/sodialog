# Dialog API

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `openModal` | `(options: SoDialogModalOptions)` | Open a modal dialog. |
| `openOffcanvas` | `(options: Omit<SoDialogOffcanvasOptions, 'kind'>)` | Open an offcanvas panel dialog. |
| `confirmModal` | `(options?: SoDialogConfirmOptions)` | Open a confirm dialog and return `Promise<boolean>`. |
| `promptModal` | `(options?: SoDialogPromptOptions)` | Open a prompt dialog and return `Promise<string | null>`. |
| `formModal` | `(options: SoDialogFormOptions)` | Open a dynamic form dialog and return submitted values. |
| `SoDialog.open` | `(options: SoDialogOptions)` | Open modal or offcanvas by `kind`. |

## Core Options (`SoDialogBaseOptions`)

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | Yes | - | Dialog title text. |
| `content` | `string \| Node` | Yes | - | Dialog content. |
| `confirmText` | `string` | No | `确认` | Confirm button text. |
| `cancelText` | `string` | No | `取消` | Cancel button text. |
| `confirmAction` | `'hide' \| 'destroy'` | No | `hide` | Confirm click close strategy. |
| `closeOnEsc` | `boolean` | No | `true` | Allow `Esc` to close the dialog. |
| `closeOnBackdrop` | `boolean` | No | `true` | Allow backdrop click close. |
| `hideFooter` | `boolean` | No | `false` | Hide default footer buttons. |
| `footerAlign` | `'start' \| 'center' \| 'end' \| 'between'` | No | `end` | Footer layout alignment. |
| `footerButtons` | `SoDialogFooterButton[]` | No | built-in confirm/cancel | Custom footer buttons. |
| `traceId` | `string` | No | - | Diagnostic trace identifier. |
| `onLayoutStable` | `(ctx) => void` | No | - | Triggered when layout is stable. |
| `onAction` | `(ctx) => void` | No | - | Triggered on footer actions. |
| `onLifecycle/onBeforeOpen/...` | `SoLifecycleHook` | No | - | Dialog lifecycle hooks. |

## Modal-only Options (`SoDialogModalOptions`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | auto id | Reuse an existing modal instance by id. |
| `position` | `'center' \| 'top' \| 'bottom'` | `center` | Modal position. |
| `animation` | `'slide' \| 'fade' \| 'zoom'` | `fade` | Modal animation. |
| `useModal` | `boolean` | `true` | Use native `showModal()` behavior. |
| `draggable` | `boolean` | `false` | Enable drag interactions. |
| `dragHandle` | `SoModalDragHandle` | `header` | Drag handle selector target(s). |
| `autoFitSize` | `boolean` | `true` | Auto fit panel to content changes. |
| `scrollMode` | `'body' \| 'viewport' \| 'none' \| 'hybrid'` | auto | Auto-fit scroll strategy. |

## Offcanvas-only Options (`SoDialogOffcanvasOptions`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | `'start' \| 'end' \| 'top' \| 'bottom'` | `end` | Panel placement. |
| `animation` | `'slide' \| 'fade' \| 'zoom'` | `slide` | Offcanvas animation. |

## Return Handle (`SoDialogHandle`)

`openModal` and `openOffcanvas` return a `SoDialogHandle` which can be used to close, update, or inspect state.

| Field | Type | Description |
| --- | --- | --- |
| `dialog` | `HTMLDialogElement` | Native dialog element. |
| `close` | `() => void` | Close dialog. |
| `refit` | `() => void` | Trigger layout refit manually. |
| `setFooterButtons` | `(buttons) => void` | Replace footer button set. |
| `updateFooterButton` | `(id, updates) => boolean` | Patch one button by id. |
| `onAction` | `(listener) => () => void` | Subscribe footer actions and return unsubscribe. |

## Usage Example

```ts
import { openModal } from 'sodialog'

const handle = openModal({
  title: 'Delete item',
  content: '<p>Do you want to continue?</p>',
  confirmText: 'Delete',
  cancelText: 'Cancel',
})

handle.close()
```

## Related

- [Modal Guide](/components/modal)
- [Offcanvas Guide](/components/offcanvas)
- [API Overview](/api/)
