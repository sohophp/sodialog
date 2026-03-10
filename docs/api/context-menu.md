# Context Menu API

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `bindContextMenu` | `(options: SoContextMenuOptions)` | Bind context menu behavior to one or more targets. |
| `configureContextMenu` | `(defaults: Partial<SoContextMenuOptions>)` | Configure global defaults for context menu behavior. |
| `openDialogFromContextMenu` | `(handle, dialogOptions)` | Close menu first, then open dialog safely. |

## `bindContextMenu` Options (`SoContextMenuOptions`)

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `target` | `string \| Element \| Iterable<Element>` | Yes | - | Target region(s) for right-click binding. |
| `items` | `SoContextMenuItem[]` | Yes | - | Menu item definitions. |
| `offsetX / offsetY` | `number` | No | `0` | Menu position offset. |
| `minWidth / maxHeight` | `number` | No | `180 / 320` | Panel size limits. |
| `closeOnEsc` | `boolean` | No | `true` | Close menu when pressing `Esc`. |
| `closeOnOutsideClick` | `boolean` | No | `true` | Close menu on outside click. |
| `closeOnWindowBlur` | `boolean` | No | `true` | Close menu on window blur. |
| `closeOnScroll` | `boolean` | No | `true` | Close menu when scroll event occurs. |
| `closeOnResize` | `boolean` | No | `true` | Close menu on resize. |
| `typeaheadEnabled` | `boolean` | No | `true` | Enable keyboard typeahead matching. |
| `typeaheadResetMs` | `number` | No | `450` | Reset delay for typed query buffer. |
| `onAction` | `(event) => void` | No | - | Called when an item is selected. |
| `onClose` | `(reason) => void` | No | - | Called when menu is closed. |

## Item Contract (`SoContextMenuItem`)

| Name | Type | Description |
| --- | --- | --- |
| `id` | `string` | Stable action id. |
| `label` | `string \| Node` | Display label. |
| `icon` | `string \| Node` | Optional icon class or element. |
| `disabled` | `boolean` | Disable this menu item. |
| `closeOnClick` | `boolean` | Whether click closes menu. |
| `onClick` | `(ctx) => void \| boolean \| Promise` | Item-level callback; return `false` to prevent close. |

## Return Handle (`SoContextMenuHandle`)

| Field | Type | Description |
| --- | --- | --- |
| `isOpen` | `() => boolean` | Whether menu is open. |
| `openAt` | `(x, y, trigger?) => void` | Open menu at coordinates manually. |
| `close` | `(reason?) => void` | Close menu manually. |
| `setItems` | `(items) => void` | Replace menu items. |
| `updateItem` | `(id, patch) => boolean` | Patch one item by id. |
| `destroy` | `() => void` | Unbind listeners and remove menu. |

## Usage Example

```ts
import { bindContextMenu } from 'sodialog'

bindContextMenu({
  target: '.row',
  items: [
    { id: 'copy', label: 'Copy' },
    { id: 'delete', label: 'Delete' },
  ],
  onAction: ({ itemId }) => {
    console.log('selected:', itemId)
  },
})
```

## Related

- [Context Menu Guide](/components/context-menu)
- [API Overview](/api/)
