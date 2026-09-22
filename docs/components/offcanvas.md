---
description: SoDialog Offcanvas 指南：位置动画、生命周期通知与典型使用场景。
---

# Offcanvas

<DocPageHeader
  title="Offcanvas"
  description="贴边面板适合筛选、详情、配置和移动端操作区，支持四个方向、尺寸控制与生命周期通知。"
  lab-href="/examples/"
  api-href="/api/dialog"
  source-href="https://github.com/sohophp/sodialog/blob/main/src/lib.ts"
/>

## 最短可运行示例

```ts
import { openOffcanvas } from 'sodialog'
import 'sodialog/style.css'

openOffcanvas({
  title: 'Filters',
  placement: 'end',
  content: '<p>Filter controls go here.</p>',
})
```

## 自定义标题内容

`title` 也可传入 `HTMLElement`。节点会原样置于标题区域，适合将编辑链接或状态标记放在标题前方。

```ts
const title = document.createElement('span')
const editLink = document.createElement('a')
editLink.href = '/documents/guide/edit'
editLink.textContent = '编辑'
title.append(editLink, document.createTextNode(' · 使用说明'))

openOffcanvas({
  title,
  placement: 'end',
  content: '<p>文档内容</p>',
})
```

## Demo / Playground

<OffcanvasPlayground />

<DemoPreview src="/components/offcanvas-demo.html" title="Offcanvas 位置、调宽与长表单" :height="440" />

## 位置与动画

```ts
import { openOffcanvas } from 'sodialog'

const openPanel = (placement: 'start' | 'end' | 'top' | 'bottom') => {
  openOffcanvas({
    title: `Offcanvas ${placement}`,
    placement,
    animation: placement === 'top' || placement === 'bottom' ? 'fade' : 'slide',
    width: placement === 'start' || placement === 'end' ? 480 : '100vw',
    height: placement === 'top' || placement === 'bottom' ? '40vh' : '100vh',
    content: `<p>当前位置：${placement}</p>`,
  })
}
```

`width` 和 `height` 接受数字或 CSS 尺寸字符串。数字按像素处理，例如 `width: 480`；字符串可使用 `40vw`、`75vh` 或 `calc(...)`。

## 可调整宽度

左右面板设置 `resizable: true` 后会显示内侧拖动柄，也可聚焦拖动柄后使用方向键调整。对象配置支持 `minWidth`、`maxWidth`、`step`、`largeStep`、`handleLabel` 与 `storageKey`；设置记忆键后，重新打开会恢复用户上次宽度。窄屏手机会隐藏拖动柄，面板仍保持视口宽度约束。

```ts
const form = document.querySelector<HTMLFormElement>('#profile-form')!
const panel = openOffcanvas({
  title: '编辑资料',
  placement: 'end',
  width: 640,
  resizable: {
    minWidth: 360,
    maxWidth: 1280,
    storageKey: 'profile-editor-width',
  },
  content: form,
})

panel.setWidth(720)
console.log(panel.getWidth())
```

Offcanvas 面板始终受当前动态视口高度约束，并默认锁定 `window/body` 滚动。标题和底部操作区保持可见，内容超过可用高度时仅 `.sod-body` 显示内部滚动条，因此长表单的最后一个控件仍可通过滚轮、触控、方向键、Page Down 或 End 到达。关闭最后一个 Offcanvas 后自动恢复页面滚动。

## 生命周期通知

```ts
import { openOffcanvas, pushMessage } from 'sodialog'

openOffcanvas({
  title: '高级 Offcanvas',
  placement: 'end',
  animation: 'slide',
  draggable: true,
  content: '<p>带生命周期通知。</p>',
  onAfterOpen: () => pushMessage('success', 'Offcanvas 已打开', { duration: 1100 }),
  onAfterClose: () => pushMessage('info', 'Offcanvas 已关闭', { duration: 1100 }),
})
```

## 常见业务场景

- 顶部/底部：更适合移动端操作面板。
- 左右：更适合筛选、详情、配置等辅助区域。
- 可把 `onAfterClose` 用于回收状态或触发列表刷新。

## 可访问性

Offcanvas 同样基于 `<dialog>`，打开后应有清晰标题，并在关闭后把焦点恢复到触发按钮。顶部/底部面板在窄屏更自然，左右面板更适合桌面筛选或详情。

## 相关 API

<div class="sod-inline-actions">
  <a href="/api/dialog">Dialog API</a>
  <a href="/api/adapter">Adapter API</a>
  <a href="/examples/offcanvas">Offcanvas 示例</a>
</div>
