---
description: 使用 SoDialog CSS Variables 创建品牌主题，并保持与宿主应用样式隔离。
---

# Themes

SoDialog 使用带 `--sod-*` 前缀的 CSS Variables 提供主题能力，不要求 CSS-in-JS、预处理器或框架插件。

## 品牌主题示例

```css
.sod-dialog,
.sod-toast-container,
.sod-context-menu {
  --sod-color-surface: #0b1020;
  --sod-color-text: #f8fafc;
  --sod-color-muted: #94a3b8;
  --sod-color-border: #26324a;
  --sod-focus-ring: #67e8f9;
  --sod-btn-primary-bg: #06b6d4;
  --sod-panel-radius: 1rem;
}
```

主题应限定在 SoDialog 组件作用域，避免覆盖全局 `:root`、`body` 或宿主应用组件。

## Tailwind CSS 共存

Tailwind 可继续负责业务内容布局，SoDialog Variables 负责组件外壳：

```ts
const content = document.createElement('div')
content.className = 'grid gap-4 p-1 text-sm'
content.innerHTML = '<strong class="text-slate-950">Deployment settings</strong>'

openModal({ title: 'Settings', content })
```

## 设计建议

- 保持可见焦点与足够对比度。
- 优先调整 Variables，不覆盖深层内部选择器。
- 同时验证亮色、暗色、窄屏和 reduced motion。
- Bootstrap 可与 SoDialog 共存，但不要复制 Bootstrap 变量作为运行前提。
