---
description: SoDialog API 总览：Dialog、Toast、Context Menu、Adapter 的方法签名与关键类型速查。
---

# API 参考（API Reference）

本节按模块整理 SoDialog 的公开 API，方便开发时快速对照。

## 快速跳转

- [API 分页](#api-pages)
- [方法索引](#method-index)
- [类型速查](#type-cheat-sheet)
- [Adapter 示例](#adapter-example)
- [全局配置示例](#global-configure-example)
- [关联演示](#related-demos)

## API Pages

1. [Dialog API](/api/dialog)
2. [Toast API](/api/toast)
3. [Context Menu API](/api/context-menu)
4. [Adapter API](/api/adapter)

## 方法索引

| Domain | Methods |
| --- | --- |
| Dialog | `openModal`, `openOffcanvas`, `confirmModal`, `promptModal`, `formModal` |
| Toast | `toast`, `pushMessage`, `SoToast.configure`, `SoToast.clear`, `SoToast.closeAll` |
| Context Menu | `bindContextMenu`, `configureContextMenu`, `openDialogFromContextMenu` |
| Adapter | `configureAdapter`, `openDialog`, `bindDialogContextMenu`, `pushMessage` |

## 类型速查

| Domain | Key Types |
| --- | --- |
| Dialog | `SoDialogModalOptions`, `SoDialogOffcanvasOptions`, `SoDialogHandle` |
| Promise Dialog | `SoDialogConfirmOptions`, `SoDialogPromptOptions`, `SoDialogFormOptions`, `SoDialogFormValue` |
| Toast | `SoToastOptions`, `SoToastHandle`, `SoToastPlacement`, `SoToastDuplicateStrategy` |
| Context Menu | `SoContextMenuOptions`, `SoContextMenuHandle`, `SoContextMenuItem` |
| Adapter | `SoAdapterConfig`, `SoAdapterLogEvent`, `SoPushMessageOptions`, `SoMessageLevel` |

## Adapter 示例

```ts
import { configureAdapter, openDialog, bindDialogContextMenu, pushMessage } from 'sodialog'

configureAdapter({
  modalDefaults: { closeOnEsc: true, footerAlign: 'center' },
  toastDefaults: { placement: 'top-end', maxVisible: 4 },
  diagnosticsEnabled: true,
})

openDialog({
  title: '删除确认',
  content: '<p>是否继续删除？</p>',
  traceId: 'trace-order-001',
})

bindDialogContextMenu({
  target: '.file-row',
  items: [{ label: '删除' }],
})

pushMessage('success', '操作成功', { traceId: 'trace-order-001' })
```

## Dialog Core

| 方法 | 签名 | 返回值 |
| --- | --- | --- |
| `openModal` | `(options: SoDialogModalOptions)` | `SoDialogHandle` |
| `openOffcanvas` | `(options: Omit<SoDialogOffcanvasOptions, 'kind'>)` | `SoDialogHandle` |
| `bindContextMenu` | `(options: SoContextMenuOptions)` | `SoContextMenuHandle` |
| `SoDialog.open` | `(options: SoDialogOptions)` | `SoDialogHandle` |

## Promise API

| 方法 | 签名 | 返回值 |
| --- | --- | --- |
| `confirmModal` | `(options?: SoDialogConfirmOptions)` | `Promise<boolean>` |
| `promptModal` | `(options?: SoDialogPromptOptions)` | `Promise<string \| null>` |
| `formModal` | `(options: SoDialogFormOptions)` | `Promise<Record<string, SoDialogFormValue> \| null>` |

## Toast API

| 方法 | 签名 | 返回值 |
| --- | --- | --- |
| `toast` | `(options: SoToastOptions)` | `SoToastHandle` |
| `SoToast.show` | `(options: SoToastOptions)` | `SoToastHandle` |
| `SoToast.configure` | `(defaults: Partial<SoToastOptions>)` | `void` |
| `SoToast.clear` | `(placement?: SoToastPlacement)` | `void` |
| `SoToast.closeAll` | `()` | `void` |

## 全局配置示例

```ts
import { configureDialog, configureContextMenu } from 'sodialog'

configureDialog({
  modalDefaults: { footerAlign: 'center', closeOnEsc: false },
  offcanvasDefaults: { placement: 'start' },
})

configureContextMenu({
  closeOnEsc: false,
  minWidth: 220,
  typeaheadEnabled: true,
})
```

## 关联演示

- [Modal 示例](/components/modal)
- [Offcanvas 示例](/components/offcanvas)
- [Toast 示例](/components/toast)
- [Context Menu 示例](/components/context-menu)
