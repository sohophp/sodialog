---
description: SoDialog 故障排查：樣式、SSR、焦點恢復與 CDN 快取。
---

# Troubleshooting

## 樣式沒有生效

確認已匯入樣式：

```ts
import 'sodialog/style.css'
```

## `document is not defined`

只在客戶端呼叫 SoDialog。Nuxt 使用 `<ClientOnly>`，Next.js 使用 Client Component。

## CDN 快取異常

生產環境固定版本號，不要依賴 `@latest`。
