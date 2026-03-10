---
description: SoDialog Context Menu 指南：基础绑定、键盘交互、关闭策略与菜单触发弹窗实践。
---

# Context Menu

<CdnNotice />

<DemoPreview src="/components/context-menu-basic.html" title="Context Menu Basic Demo" :height="420" />
<DemoPreview src="/components/context-menu-dialog.html" title="Context Menu to Dialog Demo" :height="420" />

## Level 1. Basic binding

## 基础绑定

```ts
import { bindContextMenu } from 'sodialog'

bindContextMenu({
  target: '#cm-basic-zone',
  items: [
    { id: 'copy', label: '复制' },
    { id: 'rename', label: '重命名' },
  ],
  onAction: ({ itemId }) => {
    console.log(itemId)
  },
})
```

- `target` 支持选择器、单元素和元素集合。
- 菜单项可绑定 `id`、`label` 和 `onClick`。

## Level 2. Keyboard and close policies

## 关闭策略与键盘交互

```ts
import { bindContextMenu } from 'sodialog'

bindContextMenu({
  target: '#cm-policy-zone',
  closeOnEsc: true,
  closeOnScroll: true,
  closeOnWindowBlur: true,
  typeaheadEnabled: true,
  typeaheadResetMs: 700,
  items: [
    { id: 'download', label: '下载 Download' },
    { id: 'rename', label: '重命名 Rename' },
    { id: 'delete', label: '删除 Delete' },
  ],
  onFocusItem: ({ itemId }) => {
    console.log('focus', itemId)
  },
  onTypeahead: ({ query, matched, itemId }) => {
    console.log('typeahead', query, matched, itemId)
  },
  onClose: (reason) => {
    console.log('close reason', reason)
  },
})
```

- 键盘支持 `ArrowUp`、`ArrowDown`、`Home`、`End`、`Tab`。
- 支持字母快速定位，对中英混合标签可匹配并轮转。

## Level 3. Open dialog from menu safely

## 菜单触发弹窗（close-first）

```ts
import { bindContextMenu, openDialogFromContextMenu } from 'sodialog'

let handle: ReturnType<typeof bindContextMenu> | null = null

handle = bindContextMenu({
  target: '#cm-dialog-zone',
  items: [
    {
      id: 'open-dialog',
      label: '打开确认弹窗',
      onClick: () => {
        if (!handle) return
        openDialogFromContextMenu(handle, {
          title: '来自 ContextMenu',
          content: '<p>已执行 close-first-open-next。</p>',
        })
      },
    },
  ],
})
```

该模式可避免菜单与弹窗同时存在导致的焦点与层级冲突。

## Related API

- [Context Menu API](/api/context-menu)
- [Dialog API](/api/dialog)

更多可视化示例见 [Examples Hub](/examples/)。
