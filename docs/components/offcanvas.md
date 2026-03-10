---
description: SoDialog Offcanvas 指南：位置动画、生命周期通知与典型使用场景。
---

# Offcanvas

<CdnNotice />

<DemoPreview src="/legacy-demo/offcanvas.html" code-src="/components/offcanvas.html" title="Offcanvas Playground" :height="680" />

## Level 1. Basic placement usage

## 位置与动画

```ts
import { openOffcanvas } from 'sodialog'

const openPanel = (placement: 'start' | 'end' | 'top' | 'bottom') => {
  openOffcanvas({
    title: `Offcanvas ${placement}`,
    placement,
    animation: placement === 'top' || placement === 'bottom' ? 'fade' : 'slide',
    content: `<p>当前位置：${placement}</p>`,
  })
}
```

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

- [Dialog API](/api/dialog)
- [Adapter API](/api/adapter)

更多可视化示例见 [Examples Hub](/examples/)。
