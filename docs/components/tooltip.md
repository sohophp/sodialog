---
description: SoDialog Tooltip 使用指南：鼠标、键盘、触摸和动态列表提示。
---

# Tooltip

Tooltip 用于补充简短说明。操作、链接和表单内容应使用 Dialog 或菜单。图标按钮需要自己的 `aria-label`；Tooltip 只是附加描述。

```ts
import { bindTooltip } from 'sodialog'
import 'sodialog/style.css'

const tooltip = bindTooltip({ target: '#save', content: '保存当前设置' })
// 页面或组件销毁时调用 tooltip.destroy()
```

<DemoPreview src="/components/tooltip-basic.html" title="Tooltip 基础与动态列表" :height="360" />

## 动态列表

```ts
bindTooltip({
  target: '[data-sod-tooltip]',
  content: (trigger) => trigger.getAttribute('data-sod-tooltip') ?? '',
  placement: 'bottom',
})
```

选择器使用事件委托，后续插入的按钮及 Offcanvas 内的按钮也能显示提示。默认直接读取 `data-sod-tooltip`，上述函数仅用于需要动态计算文字的场景。鼠标悬停延迟显示，键盘焦点立即显示，触摸长按显示；Escape 可关闭。提示不接收焦点，也不承载交互内容。

详见 [Tooltip API](/api/tooltip)。
