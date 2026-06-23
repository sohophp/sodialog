---
description: SoDialog 主題與樣式定制：CSS Variables、sod- 前綴與 Tailwind/Bootstrap 共存。
---

# 主題與樣式

SoDialog 透過 `sod-` 類名前綴和 `--sod-*` CSS Variables 暴露主題介面。

```css
.my-dialog-scope {
  --sod-modal-radius: 10px;
  --sod-color-primary: #0f766e;
  --sod-toast-width: 360px;
}
```

## Bootstrap

Bootstrap compatibility is a feature. Bootstrap dependency is forbidden.
