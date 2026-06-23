---
description: Migration notes for older demos, Bootstrap modals, and custom overlays.
---

# Migration

The current documentation tracks the latest stable version. Legacy demos remain available at `/legacy-demo/`.

## From older demos

- Use `import { openModal } from 'sodialog'`.
- Import styles with `import 'sodialog/style.css'`.
- Use `openOffcanvas({ placement })` for panels.

## From Bootstrap Modal

Keep your trigger buttons and content, but replace Bootstrap JavaScript initialization with SoDialog APIs.
