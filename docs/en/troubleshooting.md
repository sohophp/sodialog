---
description: Troubleshooting style imports, SSR, focus restoration, and CDN caching.
---

# Troubleshooting

## Styles do not load

Import the CSS entry:

```ts
import 'sodialog/style.css'
```

## `document is not defined`

Call SoDialog only on the client. Use Nuxt `<ClientOnly>` or Next.js Client Components.

## CDN cache issues

Pin a version and avoid `@latest` in production.
