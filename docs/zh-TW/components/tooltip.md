---
description: SoDialog Tooltip 指南：滑鼠、鍵盤、觸控與動態清單提示。
---

# Tooltip

Tooltip 用於補充簡短說明。操作、連結與表單內容應使用 Dialog 或選單。圖示按鈕仍需要自己的 `aria-label`；Tooltip 僅提供額外描述。

```ts
import { bindTooltip } from 'sodialog'
import 'sodialog/style.css'

const tooltip = bindTooltip({ target: '#save', content: '儲存目前設定' })
// 頁面或元件卸載時呼叫 tooltip.destroy()
```

<DemoPreview src="/components/tooltip-basic.html" title="Tooltip 基礎與動態清單" :height="360" />

## 動態清單

```ts
bindTooltip({
  target: '[data-sod-tooltip]',
  content: (trigger) => trigger.getAttribute('data-sod-tooltip') ?? '',
  placement: 'bottom',
})
```

選擇器使用事件委派，稍後插入的按鈕及 Offcanvas 內的按鈕也會顯示提示。預設直接讀取 `data-sod-tooltip`，此函式範例展示動態文字。滑鼠懸停延遲顯示，鍵盤聚焦立即顯示，觸控長按顯示；Escape 可關閉。提示本身不接收焦點，也不放置互動內容。

詳見 [Tooltip API](/zh-TW/api/tooltip)。
