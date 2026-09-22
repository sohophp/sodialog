---
description: SoDialog Tags Input 指南：漸進增強既有欄位、輸入與表單同步。
---

# Tags Input

Tags Input 將既有 `input` 或 `textarea` 增強為標籤輸入。原欄位保留 `name` 與逗號分隔字串，表單提交及無 JavaScript 時的編輯方式不變。

```html
<form>
  <label for="keywords">關鍵字</label>
  <textarea id="keywords" name="keywords">display,embedded</textarea>
</form>
```

```ts
import { createTagsInput } from 'sodialog'
import 'sodialog/style.css'

const source = document.querySelector<HTMLTextAreaElement>('#keywords')!
const tags = createTagsInput(source, { inputAriaLabel: '新增關鍵字' })
// 元件卸載時呼叫 tags.destroy()
```

<DemoPreview src="/components/tags-input-basic.html" title="Tags Input 表單範例" :height="430" />

## 表單與動態更新

按 Enter 或分隔符新增；輸入框為空時按 Backspace 刪除最後一項。貼上逗號或分號分隔的文字可批次新增；失焦時會確認尚未提交的文字。每次變更都更新原欄位並觸發 `input`、`change`、`sod:tags-change`；外部修改 `source.value` 後送出 `input` 可同步介面。原生 `form.reset()` 會恢復初始值。

```ts
source.value = 'screen,industrial'
source.dispatchEvent(new Event('input', { bubbles: true }))
console.log(new FormData(source.form!).get('keywords')) // screen,industrial
```

欄位應有可見標籤；`inputAriaLabel` 為新增標籤的輸入框提供名稱。可透過 `maxTags`、`validate` 與 `removeButtonLabel` 調整限制和可存取文字。完整選項見 [Tags Input API](/zh-TW/api/tags-input)。
