---
description: SoDialog Context Menu 指南：基础绑定、键盘交互、关闭策略与菜单触发弹窗实践。
---

# Context Menu

<DocPageHeader
  title="Context Menu"
  description="可键盘访问的上下文菜单，支持选择器绑定、ARIA 状态、typeahead 和 close-first 弹窗联动。"
  lab-href="/examples/"
  api-href="/api/context-menu"
  source-href="https://github.com/sohophp/sodialog/blob/main/src/lib.ts"
/>

## 最短可运行示例

```ts
import { bindContextMenu } from 'sodialog'
import 'sodialog/style.css'

bindContextMenu({
  target: '#file-row',
  items: [
    { id: 'rename', label: '重命名' },
    { id: 'delete', label: '删除' },
  ],
})
```

## Demo / Playground

<DemoPreview src="/components/context-menu-basic.html" title="Context Menu Basic Demo" :height="420" />
<DemoPreview src="/components/context-menu-dialog.html" title="Context Menu to Dialog Demo" :height="420" />

## 基础绑定

```ts
import { bindContextMenu } from 'sodialog'

bindContextMenu({
  target: '#cm-basic-zone',
  width: 260,
  height: 'auto',
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
- `width` 和 `height` 支持数字（按 px）或 CSS 尺寸字符串，并继续受 `minWidth`、`maxHeight` 安全限制。

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

## 可访问性

Context Menu 支持方向键、Home/End、Enter/Space、Escape 与 typeahead。菜单项需要稳定 `id` 与可读 `label`，禁用项不能只靠颜色区别状态。

## 相关 API

<div class="sod-inline-actions">
  <a href="/api/context-menu">Context Menu API</a>
  <a href="/api/dialog">Dialog API</a>
  <a href="/examples/">Labs</a>
</div>
