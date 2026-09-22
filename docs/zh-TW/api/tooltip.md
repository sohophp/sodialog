---
description: SoDialog Tooltip API：純文字提示、事件委派、定位、觸控與清理契約。
---

# Tooltip API

```ts
import { bindTooltip } from 'sodialog'
import 'sodialog/style.css'

const tooltip = bindTooltip({ target: '#save', content: '儲存目前設定' })
// 元件卸載時呼叫 tooltip.destroy()
```

## 匯出

`SoTooltip.bind(options)` 等同 `bindTooltip(options)`；`SoTooltip.configure(defaults)` 等同 `configureTooltip(defaults)`。全域設定只影響之後的綁定。型別包含 `SoTooltipOptions`、`SoTooltipDefaults`、`SoTooltipHandle`、`SoTooltipTarget`、`SoTooltipContent` 與 `SoTooltipPlacement`。

## `SoTooltipOptions`

| 選項 | 型別 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `target` | `string \| Element \| Iterable<Element> \| ArrayLike<Element>` | 必填 | 字串選擇器使用事件委派，支援稍後加入的元素。 |
| `content` | `string \| (trigger: Element) => string` | `data-sod-tooltip` | 僅顯示純文字；空字串不開啟。 |
| `placement` | `top \| bottom \| left \| right` | `top` | 空間不足時翻轉，並限制在視窗內。 |
| `offset` | `number` | `8` | 與目標間距，單位 px。 |
| `showDelay` / `hideDelay` | `number` | `500 / 100` | 滑鼠顯示與隱藏延遲，單位 ms；鍵盤聚焦立即顯示。 |
| `skipDelay` | `number` | `300` | 前一提示關閉後的快速顯示時段。 |
| `touchDelay` / `touchHideDelay` | `number` | `600 / 1500` | 觸控長按顯示與放開後隱藏延遲。 |
| `disabled` | `boolean` | `false` | 禁止開啟提示。 |
| `theme` | `classic \| modern \| minimal` | 全域主題 | 僅目前綁定的主題。 |

時間與間距接受非負數；負數視為 0。`content` 函式在顯示時執行，並且不解析 HTML。不要同時設定原生 `title`，以免瀏覽器顯示第二層提示。

## `SoTooltipHandle`

| 方法或欄位 | 行為 |
| --- | --- |
| `element` | 延遲建立的提示節點；首次顯示前或銷毀後為 `null`。 |
| `show(target?)` | 立即顯示。單元素可省略；集合或選擇器須傳入符合的 `Element`。 |
| `hide()` | 立即關閉並取消等待中的顯示。 |
| `setContent(content)` | 更新內容；開啟中會立即刷新。 |
| `isOpen()` | 傳回目前是否可見。 |
| `destroy()` | 清理事件、計時器、觀察器、節點與自身加入的 `aria-describedby` token。可重複呼叫。 |

同一頁面只顯示一個 SoDialog Tooltip。節點使用 `role="tooltip"`；觸發元素以 `aria-describedby` 關聯，既有描述 ID 會保留。Escape 關閉提示但不移動焦點。觸控長按不會取消原本的點擊；捲動、明顯移動與指標取消會停止顯示。
