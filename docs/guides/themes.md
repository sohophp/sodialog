---
description: 使用 SoDialog CSS Variables 创建品牌主题，并保持与宿主应用样式隔离。
---

# Themes

SoDialog 使用带 `--sod-*` 前缀的 CSS Variables 提供主题能力，不要求 CSS-in-JS、预处理器或框架插件。

## 内置主题

`classic` 保持既有视觉，`modern` 提供更精致的产品化界面，`minimal` 适合信息密度较高的后台。默认仍为 `classic`。

```ts
import { setTheme, openModal, toast } from 'sodialog'

setTheme('modern')

openModal({ title: '设置', content: '全局使用 modern' })
toast({ content: '这一条单独使用 minimal', theme: 'minimal' })
```

`setTheme()` 会更新已经打开、且没有单独指定 `theme` 的 Modal、Offcanvas、Toast 和 Context Menu。每个组件也可以通过 `theme: 'classic' | 'modern' | 'minimal'` 覆盖全局主题。

## 品牌主题示例

```css
.sod-dialog,
.sod-toast,
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

可以在内置主题类上只覆盖品牌变量：

```css
.sod-theme-modern {
  --sod-btn-primary-bg: #7c3aed;
  --sod-btn-primary-hover-bg: #6d28d9;
  --sod-focus-ring: #c4b5fd;
  --sod-panel-radius: 1.125rem;
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
