---
description: SoDialog API 总览：Dialog、Toast、Context Menu、Adapter 的方法签名与关键类型速查。
---

# API 参考（API Reference）

<VersionBadge />

本节按模块整理 SoDialog 的公开 API，方便开发时快速检索方法、类型、参数、生命周期和适配器能力。

<div class="sod-api-search">
  <label for="api-search">Search API</label>
  <input id="api-search" type="search" placeholder="openModal / closeOnEsc / SoToastOptions / width..." />
  <small>当前版本使用 VitePress 本地搜索与本页锚点索引；可输入 API 名称后使用页面内搜索或站点搜索定位。</small>
</div>

## 快速跳转

- [API 分页](#api-pages)
- [方法索引](#method-index)
- [Types](#types)
- [Global config](#global-config)
- [Adapters](#adapters)
- [Lifecycle](#lifecycle)
- [Adapter 示例](#adapter-example)
- [关联演示](#related-demos)

## API Pages

1. [Dialog API](/api/dialog)
2. [Toast API](/api/toast)
3. [Context Menu API](/api/context-menu)
4. [Adapter API](/api/adapter)

## 方法索引

| Domain | Methods |
| --- | --- |
| Methods | `openModal`, `openOffcanvas`, `confirmModal`, `promptModal`, `formModal`, `toast`, `pushMessage`, `bindContextMenu`, `configureAdapter` |
| Types | `SoDialogModalOptions`, `SoDialogOffcanvasOptions`, `SoToastOptions`, `SoContextMenuOptions`, `SoAdapterConfig` |
| Global config | `configureDialog`, `configureContextMenu`, `SoToast.configure`, `configureAdapter` |
| Adapters | `SoAdapter`, `openDialog`, `bindDialogContextMenu`, `pushMessage`, `openDialogFromContextMenu` |
| Lifecycle | `onBeforeOpen`, `onAfterOpen`, `onBeforeClose`, `onAfterClose`, `onLayoutStable`, `onAction` |

## Types

| Domain | Key Types |
| --- | --- |
| Dialog | `SoDialogModalOptions`, `SoDialogOffcanvasOptions`, `SoDialogHandle` |
| Promise Dialog | `SoDialogConfirmOptions`, `SoDialogPromptOptions`, `SoDialogFormOptions`, `SoDialogFormValue` |
| Toast | `SoToastOptions`, `SoToastHandle`, `SoToastPlacement`, `SoToastDuplicateStrategy` |
| Context Menu | `SoContextMenuOptions`, `SoContextMenuHandle`, `SoContextMenuItem` |
| Adapter | `SoAdapterConfig`, `SoAdapterLogEvent`, `SoPushMessageOptions`, `SoMessageLevel` |

## Global config

```ts
import { configureDialog, configureContextMenu, SoToast } from 'sodialog'

configureDialog({
  modalDefaults: { footerAlign: 'center', closeOnEsc: false },
  offcanvasDefaults: { placement: 'start' },
})

configureContextMenu({
  closeOnEsc: false,
  minWidth: 220,
  typeaheadEnabled: true,
})

SoToast.configure({
  placement: 'top-end',
  maxVisible: 4,
})
```

## Adapters

Adapter API 负责把 Dialog、Toast 与 Context Menu 组合成更一致的应用层入口，同时提供 diagnostics、logger 和 traceId 约定。

## Lifecycle

生命周期钩子适用于 Dialog、Offcanvas、Toast 和 Context Menu。涉及焦点恢复、关闭原因和 Promise 语义时，应优先参考对应 API 页面。

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

## 关联演示

<div class="sod-inline-actions">
  <a href="/examples/modal-lab">Open Demo</a>
  <a href="/components/modal">Modal 示例</a>
  <a href="/components/offcanvas">Offcanvas 示例</a>
  <a href="/components/toast">Toast 示例</a>
  <a href="/components/context-menu">Context Menu 示例</a>
</div>
