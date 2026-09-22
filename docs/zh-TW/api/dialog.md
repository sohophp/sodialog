# Dialog API

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `openModal` | `(options: SoDialogModalOptions)` | Open a modal dialog. |
| `openOffcanvas` | `(options: Omit<SoDialogOffcanvasOptions, 'kind'>)` | Open an offcanvas panel dialog. |
| `confirmModal` | `(options?: SoDialogConfirmOptions)` | Open a confirm dialog and return `Promise<boolean>`. |
| `promptModal` | `(options?: SoDialogPromptOptions)` | Open a prompt dialog and return `Promise<string | null>`. |
| `formModal` | `(options: SoDialogFormOptions)` | Open a dynamic form dialog and return submitted values. |
| `openImagePreview` | `(source, options?)` | 開啟置中且可設定的圖片預覽。 |
| `bindImagePreview` | `(options?)` | 为指定文件或元素委派图片点击预览。 |
| `SoDialog.open` | `(options: SoDialogOptions)` | Open modal or offcanvas by `kind`. |

`bindImagePreview({ root })` 可綁定說明內容等動態區域，並回傳帶有 `destroy()` 的句柄清理監聽。完整契約請參考[圖片預覽 API](/zh-TW/api/image-preview)。

## Core Options (`SoDialogBaseOptions`)

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string \| HTMLElement` | Yes | - | Dialog title text, or an HTMLElement rendered inside the title region. |
| `content` | `string \| Node` | Yes | - | Dialog content. |
| `confirmText` | `string` | No | `确认` | Confirm button text. |
| `cancelText` | `string` | No | `取消` | Cancel button text. |
| `confirmAction` | `'hide' \| 'destroy'` | No | `hide` | Confirm click close strategy. |
| `closeOnEsc` | `boolean` | No | `true` | Allow `Esc` to close the dialog. |
| `closeOnBackdrop` | `boolean` | No | `true` | Allow backdrop click close. |
| `hideHeader` | `boolean` | No | `false` | Hide the built-in header while preserving an accessible dialog name. |
| `hideCloseButton` | `boolean` | No | `false` | Hide the built-in close button. |
| `closeButtonLabel` | `string` | No | `Close` | Accessible label for the close button. |
| `closeButtonText` | `string` | No | `×` | Visible close button text or symbol. |
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
| `width` | `number \| string` | auto | Panel width. Numbers are interpreted as pixels; strings accept CSS sizes. |
| `height` | `number \| string` | auto | Panel height. Numbers are interpreted as pixels; strings accept CSS sizes. |
| `useModal` | `boolean` | `true` | Use native `showModal()` behavior. |
| `draggable` | `boolean` | `true` | Enable drag interactions. Set `false` to disable dragging. |
| `dragHandle` | `SoModalDragHandle \| false` | `header` | Drag handle selector target(s). Supports `header`, `title`, `body`, `footer`, `panel`, CSS selectors, arrays, or `false`. |
| `preset` | `'deploy'` | - | Apply an optional preset style from the standard stylesheet. |
| `autoFitSize` | `boolean` | `true` | Auto fit panel to content changes. |
| `scrollMode` | `'body' \| 'viewport' \| 'none' \| 'hybrid'` | auto | Auto-fit scroll strategy. |

Providing `width` or `height` disables automatic modal sizing so the explicit dimensions take precedence.

## Offcanvas-only Options (`SoDialogOffcanvasOptions`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | `'start' \| 'end' \| 'top' \| 'bottom'` | `end` | Panel placement. |
| `animation` | `'slide' \| 'fade' \| 'zoom'` | `slide` | Offcanvas animation. |
| `width` | `number \| string` | placement default | Panel width. Numbers are interpreted as pixels; strings accept CSS sizes. |
| `height` | `number \| string` | placement default | Panel height. Numbers are interpreted as pixels; strings accept CSS sizes. |
| `resizable` | `boolean \| SoOffcanvasResizeOptions` | `false` | Enables pointer and keyboard width resizing for start/end panels. |

`SoOffcanvasResizeOptions`：`minWidth` 預設 `320` px（最低可設 `160`）；`maxWidth` 預設無設定上限，並受視窗限制；`step` 預設 `10` px；按住 Shift 的 `largeStep` 預設 `50` px；`handleLabel` 預設 `Resize panel`；`storageKey` 預設不設定。方向鍵、Home 與 End 可調寬；指定記憶鍵後，滑鼠或鍵盤調整的寬度會在下次開啟時恢復。窄螢幕隱藏手柄。Offcanvas 會鎖定頁面捲動，內容區仍可捲動。

## Return Handle (`SoDialogHandle`)

`openModal` and `openOffcanvas` return a `SoDialogHandle` which can be used to close, update, or inspect state.

| Field | Type | Description |
| --- | --- | --- |
| `dialog` | `HTMLDialogElement` | Native dialog element. |
| `close` | `() => void` | Close dialog. |
| `refit` | `() => void` | Trigger layout refit manually. |
| `setWidth` | `(width: number \| string) => void` | Set the panel width. |
| `getWidth` | `() => number` | Read the rendered width in pixels. |
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

- [Modal Guide](/zh-TW/components/modal)
- [Offcanvas Guide](/zh-TW/components/offcanvas)
- [API Overview](/zh-TW/api/)
