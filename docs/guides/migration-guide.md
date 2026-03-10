# 迁移指南（Migration Guide）

## Scope

This guide helps teams migrate to SoDialog with minimal code churn and consistent behavior.

## Step 1: Centralize Entry

Replace scattered low-level calls with adapter APIs.

Before:

```ts
openModal({ title: 'Delete', content: 'Confirm?' })
toast({ content: 'Saved', variant: 'success' })
bindContextMenu({ target: '.row', items })
```

After:

```ts
openDialog({ title: 'Delete', content: 'Confirm?' })
pushMessage('success', 'Saved')
bindDialogContextMenu({ target: '.row', items })
```

## Step 2: Align Defaults Once

Define global defaults with `configureAdapter` and remove duplicated per-call options.

## Step 3: Enable Compat Theme (Optional)

If your old UI has tighter spacing or centered footer actions, add `.legacy-skin` on app root.

## Step 4: Add Trace IDs

For key business actions, pass `traceId` through open and action paths.

## Common Mapping

- `alert('msg')` -> `pushMessage('info', 'msg')`
- old confirm dialog -> `openDialog({ ... })` or `confirmModal(...)`
- old right-click menu -> `bindDialogContextMenu({ ... })`
