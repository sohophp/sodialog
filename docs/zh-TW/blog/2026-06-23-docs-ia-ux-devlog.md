---
title: 文件站從漂亮專案頁升級到元件庫工作台
description: 記錄 SoDialog 文件站資訊架構、內頁 UX、Labs、API Reference、版本中心與發布驗證的重構過程。
tags:
  - docs
  - ux
  - api
  - release
  - quality
---

# 文件站從漂亮專案頁升級到元件庫工作台

`2026-06-23 · docs · ux · api · release · quality`

這次改造的重點不是把首頁做得更熱鬧，而是讓內頁更像真正能長期維護的元件庫文件站。

## 實際完成

- 導覽拆分為文件、元件、API、範例、指南、更新日誌、版本與開發筆記。
- 開發筆記不再混入元件、API 和指南側邊欄。
- 元件頁加入統一頁頭、版本資訊、快速操作和最短可執行範例。
- 示例中心升級為 Labs，並先落地可互動的 Modal Lab。
- API 首頁補上 Methods、Types、Global config、Adapters 與 Lifecycle 索引。
- 新增安裝、CDN、框架整合、主題、遷移、Troubleshooting、FAQ、更新日誌與版本頁。

## 取捨

這次沒有複製整套歷史版本文件，也沒有一次把所有舊 demo 遷移成 Lab。舊 demo 會繼續保留，新的 Lab 結構會逐步補齊。

## 驗證重點

文件站從根目錄 `package.json` 讀取版本，CDN 範例與版本徽章不再各自硬編碼。
