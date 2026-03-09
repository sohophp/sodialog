# Adapter Guidelines

## Why Adapter-first
Business code should depend on a stable adapter API instead of directly calling low-level APIs everywhere. This keeps behavior consistent and migration cost low.

## Recommended Public Entry
- `configureAdapter(config)`
- `openDialog(options)`
- `openDialogFromContextMenu(menuHandle, options)`
- `bindDialogContextMenu(options)`
- `pushMessage(level, content, options)`

## Anti-patterns
- Calling `openModal`, `toast`, `bindContextMenu` directly in many feature files.
- Repeating toast defaults in each call site.
- Triggering dialog from context menu action without closing menu first.

## Default Strategy Example
```ts
import { configureAdapter } from 'sodialog'

configureAdapter({
  modalDefaults: {
    closeOnBackdrop: true,
    closeOnEsc: true,
    footerAlign: 'center',
  },
  toastDefaults: {
    placement: 'top-end',
    maxVisible: 4,
    newestOnTop: true,
    duplicateStrategy: 'stack',
    duration: 3800,
  },
  contextMenuDefaults: {
    closeOnEsc: true,
    closeOnOutsideClick: true,
  },
})
```

## Trace Convention
Use `traceId` to correlate user actions across dialog/context-menu/toast callbacks.
Recommended fields: `action`, `phase`, `reason`, `id`, `traceId`.

## Diagnostics Logger
You can enable adapter-level diagnostics:

```ts
configureAdapter({
  diagnosticsEnabled: true,
  logger: (event) => {
    // event: { action, phase, component, reason, id, traceId, detail }
    console.log(event)
  },
})
```

Use this to centralize issue tracing instead of scattering console logs in business modules.

## Context Menu to Dialog Timing
When a menu action should open a dialog, use `openDialogFromContextMenu`.
This enforces close-first-open-next order and reduces layer/focus conflicts.
