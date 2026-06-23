---
description: SoDialog 主题与样式定制：CSS Variables、sod- 前缀和 Tailwind 共存建议。
---

# 主题与样式

SoDialog 样式通过 `sod-` 类名前缀和 `--sod-*` CSS Variables 暴露主题接口，不需要 Bootstrap、Tailwind 插件或运行时 CSS-in-JS。

```css
.my-dialog-scope {
  --sod-modal-radius: 10px;
  --sod-color-primary: #0f766e;
  --sod-toast-width: 360px;
}
```

## 与 Tailwind 共存

把 Tailwind 类用于你传入的内容节点即可。不要覆盖 SoDialog 内部选择器，也不要引入全局 reset 去修改宿主页面。

## 与 Bootstrap 共存

SoDialog 兼容 Bootstrap 视觉生态和使用习惯，但不依赖 Bootstrap JavaScript、jQuery 或 Popper。
