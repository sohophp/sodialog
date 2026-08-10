# 圖片預覽 API

<VersionBadge />

預設沉浸模式只顯示置中的圖片，不顯示標題列、工具列或捲軸。面板會跟隨縮放後的圖片等比例調整，但不會超出扣除視口留白後的可用範圍。

## 最小範例

```ts
import { bindImagePreview } from 'sodialog'

const binding = bindImagePreview({ root: document.querySelector('.help-content')! })
binding.destroy()
```

```ts
import { openImagePreview } from 'sodialog'

const preview = openImagePreview('/images/manual.png', {
  alt: '操作說明',
  showToolbar: true,
})
preview.setScale(1.5)
```

## 方法

| 方法 | 回傳值 | 說明 |
| --- | --- | --- |
| `openImagePreview(source, options?)` | `SoImagePreviewHandle` | 立即開啟 URL 或 `HTMLImageElement`。 |
| `bindImagePreview(options?)` | `SoImagePreviewBindingHandle` | 委派監聽指定區域內的圖片點擊。 |

## 選項

| 選項 | 型別 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `title` | `string` | 圖片 alt 或 `Image preview` | 無障礙名稱及可選的可見標題。 |
| `alt` | `string` | 來源圖片 alt | 覆寫預覽圖片替代文字。 |
| `initialScale` | `'fit' \| 'original' \| number` | `'fit'` | 初始比例；`fit` 只縮小超出視口的圖片。 |
| `minScale` | `number` | `0.25` | 最小縮放比例。 |
| `maxScale` | `number` | `4` | 最大縮放比例。 |
| `wheelStep` | `number` | `0.1` | 每次滾輪縮放增量。 |
| `viewportPadding` | `number` | `32` | 視口四周保留的總尺寸。 |
| `resizeWithScale` | `boolean` | `true` | 面板是否跟隨縮放圖片調整。 |
| `showHeader` | `boolean` | `false` | 顯示標題列與關閉按鈕。 |
| `showToolbar` | `boolean` | `false` | 顯示縮小、比例、放大與 1:1 工具列。 |
| `overflow` | `'hidden' \| 'auto'` | `'hidden'` | 需要時啟用捲軸。 |

綁定選項另接受 `root?: ParentNode`（預設 `document`）與 `selector?: string`（預設 `img`）。預覽句柄除 `SoDialogHandle` 外還提供 `image`、`scale()` 與會限制範圍的 `setScale(scale)`。宿主移除時請呼叫綁定句柄的 `destroy()`。
