# 故障排查（Troubleshooting）

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

## Docs smoke CI failed

- Run `npm run docs:test:smoke:ci` locally first to reproduce.
- Open HTML report: `npx playwright show-report playwright-report/docs-smoke`.
- In GitHub Actions, download `docs-smoke-report-*` artifact and inspect `index.html`.
- If failure is connection-related, ensure no stale local server is occupying the expected port.
- For flaky network/CDN loading in demos, retry once and compare traces/screenshots before code changes.

## Scenario recipes

### Scenario: modal opened from table action and focus is lost

- Ensure the trigger is a focusable element (`button`, `a`, or `tabindex="0"`).
- Keep default close behaviors so focus restoration runs on close.
- If there are custom close paths, call `handle.close()` instead of force-removing DOM nodes.

### Scenario: context menu opens from dialog body and appears outside viewport

- Keep `target` element inside the active dialog; the menu mount root follows `dialog[open]` automatically.
- Use `offsetX/offsetY` only for minor spacing adjustments.
- Leave `maxHeight` at default or set a bounded value (for long item lists).

### Scenario: toast flood during batch operations

- Set global defaults once via `configureAdapter({ toastDefaults: { ... } })`.
- Use stable `id` per business action and pick `duplicateStrategy: 'update'` for dedupe.
- Raise `maxVisible` only when UX explicitly needs concurrent visibility.

### Scenario: style drift between products

- Standardize with CSS tokens in global theme entry.
- If legacy project cannot migrate visual language yet, wrap the feature area with `.legacy-skin`.
- Keep token overrides and legacy skin overrides in separate files for easier rollback.
