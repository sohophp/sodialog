# Troubleshooting

## Dialog content size is wrong after open
- Use `onLayoutStable` for third-party initialization.
- Call `handle.refit()` after dynamic content loads.
- Keep `refitOnContentChange: true` unless there is a strong reason.

## Context menu and dialog overlap issues
- In menu item action, close menu first, then open dialog.
- Prefer `openDialogFromContextMenu(handle, options)` to enforce this sequence.
- Keep default `closeOnOutsideClick` and `closeOnEsc` enabled.

## Toasts stack unexpectedly
- Check `duplicateStrategy` and `maxVisible`.
- Use adapter-level defaults to avoid inconsistent behavior.

## Cannot trace issue chain
- Pass a stable `traceId` when opening dialog/menu/toast.
- Log `action`, `phase`, `reason`, `id`, `traceId` in callbacks.
- Enable adapter diagnostics: `configureAdapter({ diagnosticsEnabled: true, logger })`.

## Legacy visual mismatch
- Apply `.legacy-skin` to a scoped container.
- Compare footer alignment, button size, spacing, and focus style.
