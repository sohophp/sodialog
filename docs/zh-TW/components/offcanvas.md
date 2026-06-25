---
description: SoDialog Offcanvas 指南：位置动画、生命周期通知与典型使用场景。
---

# Offcanvas

<CdnNotice />

<OffcanvasPlayground />

## Level 1. Basic placement usage

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

## Level 2. Lifecycle hooks

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

## Level 3. Practical patterns

## 使用建议

- 顶部/底部：更适合移动端操作面板。
- 左右：更适合筛选、详情、配置等辅助区域。
- 可把 `onAfterClose` 用于回收状态或触发列表刷新。

## Related API

- [Dialog API](/zh-TW/api/dialog)
- [Adapter API](/zh-TW/api/adapter)

更多可视化示例见 [Examples Hub](/zh-TW/examples/)。
