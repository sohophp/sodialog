---
description: SoDialog Tooltip guide for pointer, keyboard, touch, and dynamic lists.
---

# Tooltip

Use tooltips for short supporting text. Use Dialog or a menu for actions, links, and form content. Icon buttons still need their own `aria-label`; the tooltip is an additional description.

```ts
import { bindTooltip } from 'sodialog'
import 'sodialog/style.css'

const tooltip = bindTooltip({ target: '#save', content: 'Save current settings' })
// Call tooltip.destroy() when the page or component unmounts.
```

<DemoPreview src="/components/tooltip-basic.html" title="Tooltip and dynamic list" :height="360" />

## Dynamic list

```ts
bindTooltip({
  target: '[data-sod-tooltip]',
  content: (trigger) => trigger.getAttribute('data-sod-tooltip') ?? '',
  placement: 'bottom',
})
```

Selectors delegate events to include buttons inserted later or inside an Offcanvas. By default, content comes directly from `data-sod-tooltip`; the function above demonstrates computed text. Mouse hover opens after a delay, keyboard focus opens immediately, and touch opens on long press. Escape dismisses. The tooltip does not receive focus or contain interactive controls.

See the [Tooltip API](/en/api/tooltip).
