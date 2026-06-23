---
description: SoDialog 安装、框架集成、Bootstrap 兼容与 SSR 使用常见问题。
---

# FAQ

## SoDialog 依赖 Bootstrap 吗？

不依赖。Bootstrap 是兼容对象，不是必需依赖。SoDialog 也不依赖 jQuery 或 Popper。

## 可以在 React 或 Vue 中使用吗？

可以。SoDialog 核心是 Framework Agnostic 的 DOM 库。请在客户端生命周期或事件处理器中调用，并在组件卸载时清理持有的实例和监听。

## Nuxt 和 Next.js 如何处理 SSR？

仅在客户端边界调用需要 DOM 的 API。Nuxt 可在 `onMounted`、客户端插件或 `<ClientOnly>` 中使用；Next.js 应在 Client Component、effect 或浏览器事件中使用。

## 为什么样式需要单独引入？

显式引入样式能让消费端清楚控制 CSS，并让构建工具正确处理副作用：

```ts
import 'sodialog/style.css'
```

## 如何自定义视觉风格？

优先覆盖 `--sod-*` CSS Variables。完整示例见 [Themes](/en/guides/themes)。

## 遇到 Dialog 无法打开怎么办？

先确认代码运行在浏览器客户端、样式已引入，并检查控制台错误。更多检查项见 [Troubleshooting](/en/guides/troubleshooting)。
