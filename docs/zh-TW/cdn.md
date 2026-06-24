---
description: SoDialog CDN 使用說明：jsDelivr、UNPKG、固定版本與 ESM/UMD 入口。
---

# CDN 使用

<VersionBadge />

生產環境建議固定版本號，不建議使用 `@latest`。

<CdnExamples />

## 文件範例版本

`/components/` 下的可執行 HTML 範例使用共享 loader 解析 CDN 版本。預設值集中維護在 `/components/sodialog-loader.js`，也支援透過 URL 參數暫時覆蓋：

- `?sodialogVersion=latest`
- `?sodialogVersion=0.3.8`

這個能力用於驗證或排查 CDN 版本差異；生產頁面仍建議複製上方固定版本位址。

## 建議

- jsDelivr 是推薦方案。
- UNPKG 可作為備用方案。
- 如果 CSP 禁止外部腳本，請下載並自託管檔案。
