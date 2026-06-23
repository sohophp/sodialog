---
description: Framework integration notes for React, Vue, Nuxt, and Next.js.
---

# Frameworks

SoDialog is framework agnostic. Call it from client-side lifecycle hooks, event handlers, or explicit DOM lifecycles.

## React

Use SoDialog in Client Components or browser event handlers. Clean up handles when the component unmounts.

## Vue

Call APIs after `onMounted` or from user events, and clean up in `onUnmounted`.

## Nuxt / Next.js

Do not call DOM APIs during SSR. Use `<ClientOnly>`, client plugins, or Client Components.
