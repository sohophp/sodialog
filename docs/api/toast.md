# Toast API

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `toast` | `(options: SoToastOptions)` | Show one toast notification. |
| `pushMessage` | `(level: SoMessageLevel, content: string | Node, options?: SoPushMessageOptions)` | Adapter-level shortcut for common status messages. |
| `SoToast.configure` | `(defaults: Partial<SoToastOptions>)` | Set global toast defaults. |
| `SoToast.clear` | `(placement?: SoToastPlacement)` | Clear toasts in a specific placement. |
| `SoToast.closeAll` | `()` | Close all active toasts. |
| `SoToast.success/error/info/warning` | `(content, options?)` | Variant shortcuts. |

## `toast` Options (`SoToastOptions`)

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `string` | No | auto | Optional key to deduplicate updates. |
| `title` | `string` | No | `''` | Toast title text. |
| `content` | `string \| Node` | Yes | - | Toast body content. |
| `variant` | `'default'\|'info'\|'success'\|'warning'\|'danger'` | No | `default` | Visual style type. |
| `duration` | `number` | No | `3000` | Auto close timeout in milliseconds. |
| `placement` | `SoToastPlacement` | No | `top-end` | Toast container position. |
| `duplicateStrategy` | `'update'\|'ignore'\|'restart-timer'\|'stack'` | No | `update` | How repeated id values are handled. |
| `maxVisible` | `number` | No | `3` | Max visible toasts per placement. |
| `newestOnTop` | `boolean` | No | `true` | Prepend new toast to top of stack. |
| `showProgress` | `boolean` | No | `true` | Show countdown progress bar. |
| `pauseOnHover` | `boolean` | No | `true` | Pause timer on hover. |
| `pauseOnWindowBlur` | `boolean` | No | `false` | Pause timer when window loses focus. |

## Return Handle (`SoToastHandle`)

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Toast id. |
| `element` | `HTMLElement` | Toast DOM element. |
| `close` | `(reason?) => void` | Manually close toast. |
| `update` | `(patch) => void` | Patch title/content/variant/duration. |
| `pause` | `() => void` | Pause countdown timer. |
| `resume` | `() => void` | Resume countdown timer. |

## Usage Example

```ts
import { pushMessage, SoToast } from 'sodialog'

SoToast.configure({ placement: 'bottom-end', maxVisible: 4 })
pushMessage('success', 'Profile saved', { duration: 1800 })
```

## Related

- [Toast Guide](/components/toast)
- [API Overview](/api/)
