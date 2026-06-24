# Dialog API

<VersionBadge />

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `openModal` | `(options: SoDialogModalOptions)` | Open a modal dialog. |
| `openOffcanvas` | `(options: Omit<SoDialogOffcanvasOptions, 'kind'>)` | Open an offcanvas panel dialog. |
| `confirmModal` | `(options?: SoDialogConfirmOptions)` | Open a confirm dialog and return `Promise<boolean>`. |
| `promptModal` | `(options?: SoDialogPromptOptions)` | Open a prompt dialog and return `Promise<string | null>`. |
| `formModal` | `(options: SoDialogFormOptions)` | Open a dynamic form dialog and return submitted values. |
| `SoDialog.open` | `(options: SoDialogOptions)` | Open modal or offcanvas by `kind`. |

## `openModal`

### 签名

```ts
openModal(options: SoDialogModalOptions): SoDialogHandle
```

### 参数

<ApiParamTable
  :rows="[
    { name: 'title', type: 'string', defaultValue: '-', required: '是', description: 'Dialog 标题文本。' },
    { name: 'content', type: 'string | Node', defaultValue: '-', required: '是', description: 'Dialog 主体内容。' },
    { name: 'width', type: 'number | string', defaultValue: 'auto', required: '否', description: '面板宽度；数字按 px 处理，字符串接受 CSS 尺寸。' },
    { name: 'preset', type: 'deploy', defaultValue: '-', required: '否', description: '启用可选预设视觉风格。' },
    { name: 'closeOnEsc', type: 'boolean', defaultValue: 'true', required: '否', description: '是否允许 Escape 关闭。' },
    { name: 'onLayoutStable', type: 'SoLayoutStableHook', defaultValue: '-', required: '否', description: '布局稳定后触发，用于测量、埋点或提示。' },
  ]"
/>

### 返回值

返回 `SoDialogHandle`，可调用 `close()`、`refit()`、`setFooterButtons()` 和 `onAction()`。

### 最小示例

```ts
import { openModal } from 'sodialog'

openModal({
  title: 'Hello',
  content: '<p>Your dialog is ready.</p>',
})
```

### 行为说明

`openModal` 默认使用原生 `showModal()`，保留 `<dialog>` 焦点语义。传入显式 `width` 或 `height` 后会优先采用显式尺寸。

### 边界情况

如果同一个 `id` 已存在，实例复用行为以当前实现为准；需要销毁时使用返回句柄或 footer action 的 `destroy` 策略。

### 相关 API

<div class="sod-inline-actions">
  <a href="/examples/modal-lab">Open Demo</a>
  <a href="/components/modal">Modal 文档</a>
  <a href="/api/adapter">Adapter API</a>
</div>

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
| `width` | `number \| string` | auto | Panel width. Numbers are interpreted as pixels; strings accept CSS sizes. |
| `height` | `number \| string` | auto | Panel height. Numbers are interpreted as pixels; strings accept CSS sizes. |
| `useModal` | `boolean` | `true` | Use native `showModal()` behavior. |
| `draggable` | `boolean` | `true` | Enable drag interactions. Set `false` to disable dragging. |
| `dragHandle` | `SoModalDragHandle \| false` | `header` | Drag handle selector target(s). Supports `header`, `title`, `body`, `footer`, `panel`, CSS selectors, arrays, or `false`. |
| `autoFitSize` | `boolean` | `true` | Auto fit panel to content changes. |
| `scrollMode` | `'body' \| 'viewport' \| 'none' \| 'hybrid'` | auto | Auto-fit scroll strategy. |

Providing `width` or `height` disables automatic modal sizing so the explicit dimensions take precedence.

### Presets

`preset: 'deploy'` applies the compact confirmation style used by deploy/release dialogs. It is implemented as the `sod-preset-deploy` class inside the standard stylesheet, so it keeps zero runtime dependencies and can still be overridden with `--sod-*` CSS variables.

## Offcanvas-only Options (`SoDialogOffcanvasOptions`)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | `'start' \| 'end' \| 'top' \| 'bottom'` | `end` | Panel placement. |
| `animation` | `'slide' \| 'fade' \| 'zoom'` | `slide` | Offcanvas animation. |
| `width` | `number \| string` | placement default | Panel width. Numbers are interpreted as pixels; strings accept CSS sizes. |
| `height` | `number \| string` | placement default | Panel height. Numbers are interpreted as pixels; strings accept CSS sizes. |

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
