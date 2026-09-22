---
description: SoDialog Tags Input API for enhancing an existing input or textarea without changing form data.
---

# Tags Input API

```ts
import { createTagsInput } from 'sodialog'
import 'sodialog/style.css'

const source = document.querySelector<HTMLTextAreaElement>('#keywords')!
const tags = createTagsInput(source, { maxTags: 20, inputAriaLabel: 'Add keyword' })
// Call tags.destroy() when the form is removed.
```

`createTagsInput(source, options?)` accepts an `HTMLInputElement` or `HTMLTextAreaElement` and returns `SoTagsInputHandle`. The source remains the submitted form control. Its string value defaults to comma-separated tags; code may update that value and dispatch `input` to refresh the UI.

## `SoTagsInputOptions`

| Option | Default | Behavior |
| --- | --- | --- |
| `separators` | `[',', ';', '，', '；', '\n']` | Split typed or pasted values. |
| `serializeWith` | `','` | Join tags into the source value. |
| `maxTags` | `Infinity` | Maximum number of tags. |
| `allowDuplicates` / `caseSensitive` | `false / false` | Duplicate and comparison rules. |
| `addOnBlur` / `addOnPaste` | `true / true` | Commit unfinished text on blur and split pasted text. |
| `placeholder` | Source placeholder | Placeholder of the visible editor. |
| `inputAriaLabel` | Source `aria-label` or `Add tag` | Accessible name of the visible editor. |
| `removeButtonLabel` | `Remove {value}` | `(value: string) => string` for remove button labels. |
| `validate` | None | `(value, values) => string \| boolean \| void`; `false` or a message rejects the tag. |
| `onChange` | None | `(values, handle) => void`, called after a tag change. |

## `SoTagsInputHandle`

| Member | Behavior |
| --- | --- |
| `element`, `source`, `input` | Root, original field, and visible editor. |
| `values()` | Returns a copy of current tags. |
| `setValues(values)` | Replaces tags and updates the source field. |
| `add(value)` / `remove(value)` | Returns whether a tag changed. |
| `focus()` | Focuses the visible editor. |
| `destroy()` | Removes the enhancement and restores the original field. |

Tag changes emit bubbling `input`, `change`, and `sod:tags-change` events from the source; the last event includes `{ values: string[] }` in `detail`. Native form reset restores initial tags. The source keeps its `name`, so `FormData` and no-JavaScript editing continue to work.

[Component guide](/en/components/tags-input) · [Runnable example](/en/examples/tags-input)
