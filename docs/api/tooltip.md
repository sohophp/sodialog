---
description: SoDialog Tooltip API：纯文本提示、事件委托、定位、触摸和清理契约。
---

# Tooltip API

```ts
import { bindTooltip } from 'sodialog'
import 'sodialog/style.css'

const tooltip = bindTooltip({ target: '#save', content: '保存当前设置' })
// 组件卸载时调用 tooltip.destroy()
```

## 导出

`SoTooltip.bind(options)` 与 `bindTooltip(options)` 等价；`SoTooltip.configure(defaults)` 与 `configureTooltip(defaults)` 等价。全局配置只影响后续绑定。类型导出包括 `SoTooltipOptions`、`SoTooltipDefaults`、`SoTooltipHandle`、`SoTooltipTarget`、`SoTooltipContent` 和 `SoTooltipPlacement`。

## `SoTooltipOptions`

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `target` | `string \| Element \| Iterable<Element> \| ArrayLike<Element>` | 必填 | 字符串选择器使用事件委托，可匹配后续加入的元素。 |
| `content` | `string \| (trigger: Element) => string` | `data-sod-tooltip` | 按纯文本显示；空字符串不打开。 |
| `placement` | `top \| bottom \| left \| right` | `top` | 空间不足时翻转，最终位置限制在视口内。 |
| `offset` | `number` | `8` | 提示与目标间距，单位 px。 |
| `showDelay` / `hideDelay` | `number` | `500 / 100` | 鼠标显示与隐藏延迟，单位 ms；键盘焦点立即显示。 |
| `skipDelay` | `number` | `300` | 一个提示关闭后，该时间内的下一个悬停立即显示。 |
| `touchDelay` / `touchHideDelay` | `number` | `600 / 1500` | 触摸长按显示、松手后隐藏的延迟。 |
| `disabled` | `boolean` | `false` | 禁止打开提示。 |
| `theme` | `classic \| modern \| minimal` | 全局主题 | 仅当前绑定的主题。 |

时间与间距接受非负数；负数按 0 处理。`content` 函数在显示时调用，可读取目标当前状态；不会解释 HTML。不要同时给目标设置原生 `title`，否则浏览器可能再显示一层提示。

## `SoTooltipHandle`

| 方法或字段 | 行为 |
| --- | --- |
| `element` | 懒创建的提示节点；首次显示前或销毁后为 `null`。 |
| `show(target?)` | 立即显示。单元素绑定可省略目标；集合或选择器绑定须传入匹配的 `Element`。 |
| `hide()` | 立即关闭并取消等待中的显示。 |
| `setContent(content)` | 更新内容；若正在显示则立即刷新。 |
| `isOpen()` | 返回当前可见状态。 |
| `destroy()` | 清理监听、计时器、观察器、节点及自身加入的 `aria-describedby` token。可重复调用。 |

同一页面只显示一个 SoDialog Tooltip。提示节点使用 `role="tooltip"`；触发元素通过 `aria-describedby` 关联，原有描述 ID 保留。Escape 关闭提示但不移动焦点。触摸长按不会取消目标原有点击；滚动、明显移动和指针取消会取消显示。
