---
description: SoDialog Tags Input guide for progressive enhancement, editing, and form synchronization.
---

# Tags Input

Tags Input enhances an existing `input` or `textarea`. The original field retains its `name` and comma-separated string value, so form submission and the no-JavaScript fallback remain usable.

```html
<form>
  <label for="keywords">Keywords</label>
  <textarea id="keywords" name="keywords">display,embedded</textarea>
</form>
```

```ts
import { createTagsInput } from 'sodialog'
import 'sodialog/style.css'

const source = document.querySelector<HTMLTextAreaElement>('#keywords')!
const tags = createTagsInput(source, { inputAriaLabel: 'Add keyword' })
// Call tags.destroy() when the owning component unmounts.
```

<DemoPreview src="/components/tags-input-basic.html" title="Tags Input form demo" :height="430" />

## Forms and external updates

Press Enter or a separator to add a tag. Press Backspace on an empty editor to remove the last tag. Pasting separated text adds several tags, and blur commits unfinished text. Each change updates the source field and emits `input`, `change`, and `sod:tags-change`. Dispatch `input` after an external change to `source.value` to refresh the UI. Native `form.reset()` restores the initial value.

```ts
source.value = 'screen,industrial'
source.dispatchEvent(new Event('input', { bubbles: true }))
console.log(new FormData(source.form!).get('keywords')) // screen,industrial
```

Provide a visible label for the source field. `inputAriaLabel` names the tag editor; `maxTags`, `validate`, and `removeButtonLabel` adjust limits and accessible text. See the [Tags Input API](/en/api/tags-input) for the full contract.
