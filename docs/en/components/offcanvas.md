---
description: SoDialog Offcanvas 指南：位置动画、生命周期通知与典型使用场景。
---

# Offcanvas

<CdnNotice />

<OffcanvasPlayground />

<DemoPreview src="/components/offcanvas-demo.html" title="Offcanvas placement, resizing, and long form" :height="440" />

## Custom title content

`title` also accepts an `HTMLElement`. The element is placed directly in the title region, which is useful for an edit link or status indicator.

```ts
const title = document.createElement('span')
const editLink = document.createElement('a')
editLink.href = '/documents/guide/edit'
editLink.textContent = 'Edit'
title.append(editLink, document.createTextNode(' · Guide'))

openOffcanvas({
  title,
  placement: 'end',
  content: '<p>Document content</p>',
})
```

## Placement and animation

```ts
import { openOffcanvas } from 'sodialog'

const openPanel = (placement: 'start' | 'end' | 'top' | 'bottom') => {
  openOffcanvas({
    title: `Offcanvas ${placement}`,
    placement,
    animation: placement === 'top' || placement === 'bottom' ? 'fade' : 'slide',
    width: placement === 'start' || placement === 'end' ? 480 : '100vw',
    height: placement === 'top' || placement === 'bottom' ? '40vh' : '100vh',
    content: `<p>Current placement: ${placement}</p>`,
  })
}
```

`width` and `height` accept numbers in pixels or CSS sizes such as `40vw`, `75vh`, and `calc(...)`.

## Resizing and long content

```ts
const longForm = document.querySelector<HTMLFormElement>('#details-form')!
const panel = openOffcanvas({
  title: 'Edit details',
  placement: 'end',
  width: 560,
  resizable: { minWidth: 320, maxWidth: 900, storageKey: 'details-width' },
  content: longForm,
})

panel.setWidth(640)
console.log(panel.getWidth())
```

Start and end panels support pointer resizing along the inner edge. Focus the resize handle and use arrow keys, Shift plus arrow keys, Home, or End. `storageKey` remembers a user-adjusted width for the next open. The handle is hidden on narrow screens. Offcanvas locks page scrolling while open, keeps header and footer visible, and scrolls long content inside `.sod-body`; closing the last panel restores page scrolling.

## Lifecycle hooks

```ts
import { openOffcanvas, pushMessage } from 'sodialog'

openOffcanvas({
  title: 'Advanced Offcanvas',
  placement: 'end',
  animation: 'slide',
  draggable: true,
  content: '<p>Lifecycle notifications.</p>',
  onAfterOpen: () => pushMessage('success', 'Offcanvas opened', { duration: 1100 }),
  onAfterClose: () => pushMessage('info', 'Offcanvas closed', { duration: 1100 }),
})
```

## Practical patterns

- Top and bottom work well for mobile actions.
- Start and end work well for filters, details, and settings.
- Use `onAfterClose` to clean up state or refresh a list.

## Related API

- [Dialog API](/en/api/dialog)
- [Adapter API](/en/api/adapter)

See the [Examples Hub](/en/examples/) for runnable examples.
