# Adapter API

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `configureAdapter` | `(options: SoAdapterConfig)` | Define shared defaults and diagnostics strategy. |
| `openDialog` | `(options: SoDialogOptions)` | Open dialog with adapter-level defaults applied. |
| `bindDialogContextMenu` | `(options: SoContextMenuOptions)` | Bind context menu with adapter diagnostics. |
| `openDialogFromContextMenu` | `(handle, options)` | Close context menu before opening dialog. |
| `pushMessage` | `(level: SoMessageLevel, content: string | Node, options?: SoPushMessageOptions)` | Unified message helper with trace support. |

## `configureAdapter` Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `modalDefaults` | `Partial<SoDialogModalOptions>` | No | `{}` | Shared modal defaults. |
| `offcanvasDefaults` | `Partial<Omit<SoDialogOffcanvasOptions, 'kind'>>` | No | `{}` | Shared offcanvas defaults. |
| `contextMenuDefaults` | `Partial<Omit<SoContextMenuOptions, 'target' \| 'items'>>` | No | `{}` | Shared context menu defaults. |
| `toastDefaults` | `Partial<SoToastOptions>` | No | `{}` | Shared toast defaults. |
| `diagnosticsEnabled` | `boolean` | No | `false` | Emit structured lifecycle diagnostics. |
| `logger` | `(event) => void` | No | console | Custom logger for diagnostics pipeline. |

## Built-in Adapter Toast Defaults

When not overridden by `configureAdapter`, adapter-level `pushMessage` uses:

| Option | Default |
| --- | --- |
| `placement` | `top-end` |
| `maxVisible` | `4` |
| `newestOnTop` | `true` |
| `duplicateStrategy` | `stack` |
| `duration` | `3800` |

## `SoAdapterLogEvent`

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | Source action (`openDialog`, `pushMessage`, etc.). |
| `phase` | `SoLifecyclePhase \| 'action' \| 'layout-stable' \| 'focus' \| 'typeahead'` | Lifecycle/interaction phase. |
| `component` | `SoLifecycleComponent \| 'adapter'` | Component domain. |
| `reason` | `string` | Close/open reason when provided. |
| `id` | `string` | Runtime id for dialog/menu/toast. |
| `traceId` | `string` | Business trace correlation id. |
| `detail` | `Record<string, unknown>` | Additional context payload. |

## Usage Example

```ts
import { configureAdapter, openDialog, pushMessage } from 'sodialog'

configureAdapter({
  modalDefaults: { closeOnEsc: true, footerAlign: 'center' },
  toastDefaults: { placement: 'top-end', maxVisible: 4 },
  diagnosticsEnabled: true,
})

openDialog({
  title: 'Delete item',
  content: '<p>Confirm delete?</p>',
  traceId: 'trace-order-001',
})

pushMessage('success', 'Deleted', { traceId: 'trace-order-001' })
```

## Related

- [Adapter Guidelines](/guides/adapter-guidelines)
- [API Overview](/api/)
