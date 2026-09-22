---
description: SoDialog Tags Input 指南：渐进增强现有字段、输入与表单同步。
---

# Tags Input

Tags Input 把现有 `input` 或 `textarea` 增强为标签输入。原字段保留 `name` 和逗号分隔的字符串值，表单提交与无 JavaScript 回退方式不变。

```html
<form>
  <label for="keywords">关键词</label>
  <textarea id="keywords" name="keywords">display,embedded</textarea>
</form>
```

```ts
import { createTagsInput } from 'sodialog'
import 'sodialog/style.css'

const source = document.querySelector<HTMLTextAreaElement>('#keywords')!
const tags = createTagsInput(source, { inputAriaLabel: '新增关键词' })
// 组件卸载时调用 tags.destroy()
```

<DemoPreview src="/components/tags-input-basic.html" title="Tags Input 表单示例" :height="430" />

## 表单与动态更新

按 Enter 或分隔符添加，空输入时按 Backspace 删除最后一项。粘贴逗号或分号分隔的文字会批量添加；失焦时提交尚未确认的文字。每次变更都会更新原字段，并触发 `input`、`change` 和 `sod:tags-change`；外部代码更新 `source.value` 后派发 `input` 可同步界面。原生 `form.reset()` 会恢复初始值。

```ts
source.value = 'screen,industrial'
source.dispatchEvent(new Event('input', { bubbles: true }))
console.log(new FormData(source.form!).get('keywords')) // screen,industrial
```

字段应有可见标签；`inputAriaLabel` 为新增标签的编辑框提供名称。可通过 `maxTags`、`validate` 和 `removeButtonLabel` 调整限制与可访问文本。完整选项与句柄见 [Tags Input API](/api/tags-input)。
