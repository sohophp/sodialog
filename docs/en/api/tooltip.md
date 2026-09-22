---
description: SoDialog Tooltip API for plain text hints, delegated targets, positioning, touch, and cleanup.
---

# Tooltip API

```ts
import { bindTooltip } from 'sodialog'
import 'sodialog/style.css'

const tooltip = bindTooltip({ target: '#save', content: 'Save current settings' })
// Call tooltip.destroy() when the owning component unmounts.
```

## Exports

`SoTooltip.bind(options)` equals `bindTooltip(options)`. `SoTooltip.configure(defaults)` equals `configureTooltip(defaults)`. Global defaults apply to future bindings only. Types include `SoTooltipOptions`, `SoTooltipDefaults`, `SoTooltipHandle`, `SoTooltipTarget`, `SoTooltipContent`, and `SoTooltipPlacement`.

## `SoTooltipOptions`

| Option | Type | Default | Behavior |
| --- | --- | --- | --- |
| `target` | `string \| Element \| Iterable<Element> \| ArrayLike<Element>` | Required | Selectors delegate events and include future matches. |
| `content` | `string \| (trigger: Element) => string` | `data-sod-tooltip` | Renders plain text; empty text does not open. |
| `placement` | `top \| bottom \| left \| right` | `top` | Flips when space is insufficient and clamps to the viewport. |
| `offset` | `number` | `8` | Gap from the target in px. |
| `showDelay` / `hideDelay` | `number` | `500 / 100` | Mouse delays in ms; keyboard focus opens immediately. |
| `skipDelay` | `number` | `300` | Hover opens immediately shortly after another tooltip closes. |
| `touchDelay` / `touchHideDelay` | `number` | `600 / 1500` | Long press delay and post-release visibility in ms. |
| `disabled` | `boolean` | `false` | Prevents the tooltip from opening. |
| `theme` | `classic \| modern \| minimal` | Global theme | Theme for this binding. |

Negative timing and offset values become 0. The `content` function runs when shown and HTML is never parsed. Avoid a native `title` on the same target or the browser may display a second tooltip.

## `SoTooltipHandle`

| Member | Behavior |
| --- | --- |
| `element` | Lazily created element; `null` before first show and after destroy. |
| `show(target?)` | Shows immediately. The target may be omitted for a single element; collections and selectors require a matching `Element`. |
| `hide()` | Hides immediately and cancels a pending show. |
| `setContent(content)` | Replaces content and refreshes an open tooltip. |
| `isOpen()` | Returns visibility state. |
| `destroy()` | Removes listeners, timers, observers, DOM, and its own `aria-describedby` token. Safe to repeat. |

Only one SoDialog Tooltip is visible at a time. The tooltip has `role="tooltip"`, and the trigger references it with `aria-describedby` while keeping existing IDs. Escape dismisses without moving focus. Long press preserves the trigger's click; scrolling, significant movement, or pointer cancellation stops the pending hint.
