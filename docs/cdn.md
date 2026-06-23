---
description: SoDialog CDN 使用说明：jsDelivr、UNPKG、固定版本、ESM 与 UMD 构建入口。
---

# CDN 使用

<VersionBadge />

生产环境建议固定版本号，不建议使用 `@latest`。当前 npm 包导出 ESM 入口和样式文件，仓库构建产物中也保留 UMD 文件用于传统页面集成。

<CdnExamples />

## 生产建议

- 固定 patch 版本，避免 `@latest` 引入不可控变更。
- 对受控页面可配置 SRI 与长期缓存。
- CSP 如禁止外部脚本，应下载并自托管构建产物。
