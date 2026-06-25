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

## Demo / Playground

<OffcanvasPlayground />

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
