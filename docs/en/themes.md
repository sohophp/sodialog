---
description: Theme SoDialog with CSS variables and sod- prefixed classes.
---

# Themes

SoDialog exposes `sod-` class names and `--sod-*` CSS variables. It does not require Bootstrap, Tailwind plugins, or runtime CSS-in-JS.

```css
.my-dialog-scope {
  --sod-modal-radius: 10px;
  --sod-color-primary: #0f766e;
  --sod-toast-width: 360px;
}
```

## Bootstrap

Bootstrap compatibility is supported. Bootstrap dependency is forbidden.
