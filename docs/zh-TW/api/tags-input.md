---
description: SoDialog Tags Input API：把既有 input 或 textarea 漸進增強為可存取的標籤輸入元件。
---

# Tags Input API

`createTagsInput()` 不改變表單提交協定。原始 `input`／`textarea` 仍保存序列化字串，標籤介面與其雙向同步；未執行 JavaScript 時，原控制項仍可正常編輯。

```ts
import { createTagsInput } from 'sodialog'
import 'sodialog/style.css'

const source = document.querySelector<HTMLTextAreaElement>('#keywords')!
const tags = createTagsInput(source, {
  separators: [',', ';', '，', '；', '\n'],
  serializeWith: ',',
  maxTags: 20,
  inputAriaLabel: '新增關鍵字',
})
```

使用者可按 Enter 或分隔符確認標籤、貼上多項內容、按 Backspace 刪除最後一項，也可使用各標籤的移除按鈕。預設忽略大小寫重複項，並在失焦時確認尚未提交的文字。

## Options

| 屬性 | 預設值 | 說明 |
| --- | --- | --- |
| `separators` | `[',', ';', '，', '；', '\n']` | 輸入與貼上分隔符。 |
| `serializeWith` | `','` | 寫回原欄位時使用的分隔符。 |
| `maxTags` | `Infinity` | 標籤數量上限。 |
| `allowDuplicates` | `false` | 是否允許重複標籤。 |
| `caseSensitive` | `false` | 去重比較是否區分大小寫。 |
| `addOnBlur` / `addOnPaste` | `true` | 是否在失焦時確認、是否拆分貼上內容。 |
| `placeholder` | 原欄位的 placeholder | 可見輸入框的佔位文字。 |
| `inputAriaLabel` | 原欄位 `aria-label` 或 `Add tag` | 可見輸入框的可存取名稱。 |
| `removeButtonLabel` | `Remove {value}` | `(value: string) => string`，移除按鈕的名稱。 |
| `validate` | - | 新增標籤前的驗證函式。 |
| `onChange` | - | 標籤變更回呼。 |

`validate(value, values)` 傳回 `false` 或錯誤文字會拒絕新增。`onChange(values, handle)` 於標籤變更後呼叫。

`SoTagsInputHandle` 的 `element`、`source`、`input` 分別指向根節點、原欄位與可見輸入框；`values()` 傳回目前值的副本，`setValues()` 取代所有標籤，`add()`／`remove()` 傳回是否變更，`focus()` 聚焦輸入框，`destroy()` 移除增強並還原原欄位。標籤變更會從原欄位送出 `input`、`change`、`sod:tags-change`，最後一個事件的 `detail` 包含 `{ values: string[] }`；外部程式更新原欄位後送出 `input` 可同步介面。原生表單重置會還原初始值。

[元件指南](/zh-TW/components/tags-input) · [可執行範例](/zh-TW/examples/tags-input)
