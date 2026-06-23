---
description: SoDialog 常见问题：依赖、Bootstrap 兼容、类型、样式、浏览器和框架集成。
---

# FAQ

## SoDialog 是否依赖 Bootstrap？

不依赖。Bootstrap compatibility is a feature. Bootstrap dependency is forbidden.

## 是否依赖 jQuery 或 Popper？

不依赖，也不会作为核心运行时 peer dependency。

## 可以在 React/Vue 中使用吗？

可以。请在客户端生命周期或事件处理器中调用，并在卸载时清理实例或监听。

## 样式能否自定义？

可以。优先使用 `--sod-*` CSS Variables，并避免覆盖无前缀全局选择器。
