---
description: SoDialog Tags Input API：把现有 input 或 textarea 渐进增强为可访问的标签输入组件。
---

# Tags Input API

`createTagsInput()` 不改变表单提交协议。原始 `input`／`textarea` 仍保存序列化字符串，标签界面与其双向同步；未运行 JavaScript 时，原控件仍可正常编辑。

```ts
import { createTagsInput } from 'sodialog'
import 'sodialog/style.css'

const source = document.querySelector<HTMLTextAreaElement>('#keywords')!
const tags = createTagsInput(source, {
  separators: [',', ';', '，', '；', '\n'],
  serializeWith: ',',
  maxTags: 20,
  inputAriaLabel: '新增关键词',
})

tags.add('industrial display')
console.log(tags.values())
```

用户可按 Enter 或分隔符确认标签、粘贴多项内容、按 Backspace 删除最后一项，也可使用每个标签的移除按钮。默认忽略大小写重复项，并在失焦时确认尚未提交的文字。

## Options

| 属性 | 默认值 | 说明 |
| --- | --- | --- |
| `separators` | `[',', ';', '，', '；', '\n']` | 输入与粘贴分隔符。 |
| `serializeWith` | `','` | 写回原字段时使用的分隔符。 |
| `maxTags` | `Infinity` | 标签数量上限。 |
| `allowDuplicates` | `false` | 是否允许重复标签。 |
| `caseSensitive` | `false` | 去重比较是否区分大小写。 |
| `addOnBlur` / `addOnPaste` | `true` | 是否在失焦时确认、是否拆分粘贴内容。 |
| `placeholder` | 原字段的 placeholder | 可见编辑框的占位文字。 |
| `inputAriaLabel` | 原字段 `aria-label` 或 `Add tag` | 可见编辑框的无障碍名称。 |
| `removeButtonLabel` | `Remove {value}` | `(value: string) => string`，移除按钮的名称。 |
| `validate` | - | 新增标签前的验证函数。 |
| `onChange` | - | 标签变更回调。 |

`validate(value, values)` 返回 `false` 或错误文本会拒绝新增。`onChange(values, handle)` 在标签变更后调用。

`SoTagsInputHandle` 的 `element`、`source`、`input` 分别指向根节点、原字段和可见编辑框；`values()` 返回当前值的副本，`setValues()` 替换所有标签，`add()`／`remove()` 返回是否发生变化，`focus()` 聚焦编辑框，`destroy()` 移除增强并恢复原字段。标签变更会从原字段冒泡 `input`、`change` 和 `sod:tags-change`，后者的 `detail` 包含 `{ values: string[] }`；外部代码更新原字段后派发 `input`，界面便会同步。原生表单重置恢复初始值。

[组件指南](/components/tags-input) · [可运行示例](/examples/tags-input)
