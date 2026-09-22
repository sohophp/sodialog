---
description: SoDialog Offcanvas 指南：位置动画、生命周期通知与典型使用场景。
---

# Offcanvas

<CdnNotice />

<OffcanvasPlayground />

<DemoPreview src="/components/offcanvas-demo.html" title="Offcanvas 位置、調寬與長表單" :height="440" />

## 自訂標題內容

`title` 也可傳入 `HTMLElement`。節點會原樣置於標題區域，適合將編輯連結或狀態標記放在標題前方。

```ts
const title = document.createElement('span')
const editLink = document.createElement('a')
editLink.href = '/documents/guide/edit'
editLink.textContent = '編輯'
title.append(editLink, document.createTextNode(' · 使用說明'))

openOffcanvas({
  title,
  placement: 'end',
  content: '<p>文件內容</p>',
})
```

## 位置與動畫

```ts
import { openOffcanvas } from 'sodialog'

const openPanel = (placement: 'start' | 'end' | 'top' | 'bottom') => {
  openOffcanvas({
    title: `Offcanvas ${placement}`,
    placement,
    animation: placement === 'top' || placement === 'bottom' ? 'fade' : 'slide',
    width: placement === 'start' || placement === 'end' ? 480 : '100vw',
    height: placement === 'top' || placement === 'bottom' ? '40vh' : '100vh',
    content: `<p>目前位置：${placement}</p>`,
  })
}
```

`width` 和 `height` 接受數字或 CSS 尺寸字串。數字代表像素；字串可使用 `40vw`、`75vh` 或 `calc(...)`。

Offcanvas 預設鎖定 `window/body` 捲動，標題與底部操作區保持固定；只有 `.sod-body` 在內容超出高度時顯示內部捲軸。關閉最後一個 Offcanvas 後會自動恢復頁面捲動。

## 可調整寬度

左右面板可設定 `resizable: true` 開啟拖曳與鍵盤調寬。物件設定支援 `minWidth`、`maxWidth`、`step`、`largeStep`、`handleLabel` 與 `storageKey`；指定記憶鍵後會在下次開啟時恢復寬度。窄螢幕會隱藏調整手柄。

```ts
const longForm = document.querySelector<HTMLFormElement>('#details-form')!
const panel = openOffcanvas({
  title: '編輯資料',
  placement: 'end',
  width: 560,
  resizable: { minWidth: 320, maxWidth: 900, storageKey: 'details-width' },
  content: longForm,
})

panel.setWidth(640)
console.log(panel.getWidth())
```

Offcanvas 開啟時鎖定頁面捲動，標題與底部操作區保持可見；長內容僅在 `.sod-body` 內捲動。關閉最後一個面板後恢復頁面捲動。

## 生命週期通知

```ts
import { openOffcanvas, pushMessage } from 'sodialog'

openOffcanvas({
  title: '進階 Offcanvas',
  placement: 'end',
  animation: 'slide',
  draggable: true,
  content: '<p>具有生命週期通知。</p>',
  onAfterOpen: () => pushMessage('success', 'Offcanvas 已開啟', { duration: 1100 }),
  onAfterClose: () => pushMessage('info', 'Offcanvas 已關閉', { duration: 1100 }),
})
```

## 使用建議

- 頂部／底部適合行動端操作面板。
- 左右適合篩選、詳情與設定等輔助區域。
- 可在 `onAfterClose` 清理狀態或重新整理清單。

## Related API

- [Dialog API](/zh-TW/api/dialog)
- [Adapter API](/zh-TW/api/adapter)

更多可執行範例見[範例中心](/zh-TW/examples/)。
