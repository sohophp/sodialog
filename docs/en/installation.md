---
description: Install SoDialog with npm, pnpm, yarn, or bun, then import ESM APIs and CSS.
---

# Installation

<VersionBadge />

SoDialog has zero required runtime dependencies. Install the package, then import the ESM API and CSS explicitly.

```bash
npm install sodialog
pnpm add sodialog
yarn add sodialog
bun add sodialog
```

## ESM

```ts
import { openModal, pushMessage } from 'sodialog'
import 'sodialog/style.css'

openModal({
  title: 'Hello',
  content: '<p>Your dialog is ready.</p>',
})

pushMessage('success', 'Saved')
```

## TypeScript

Types are provided by `dist/types/lib.d.ts`.

```ts
import type { SoDialogModalOptions, SoToastOptions } from 'sodialog'
```
