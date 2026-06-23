---
description: SoDialog 故障排查：样式未生效、SSR 调用、焦点恢复、CDN 与文档链接问题。
---

# Troubleshooting

## 样式没有生效

确认已经导入样式：

```ts
import 'sodialog/style.css'
```

CDN 页面需同时加载 `dist/sodialog.css`。

## SSR 报 `document is not defined`

只在客户端生命周期或用户事件中调用 SoDialog。Nuxt 使用 `<ClientOnly>`，Next.js 使用 Client Component。

## 关闭后焦点没有回到预期位置

优先从触发按钮事件中打开 Dialog，并避免在关闭回调里立即移动焦点到不可见元素。

## CDN 缓存异常

生产环境固定版本号，并检查浏览器缓存与代理缓存。不要依赖 `@latest`。
