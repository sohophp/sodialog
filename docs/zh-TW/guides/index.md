# 指南總覽

指南區收錄 SoDialog 從接入到發布前檢查的工作流內容。API 細節放在 API 參考，這裡用來幫你選擇正確的整合、主題與排障路徑。

## 接入與使用

<div class="sod-doc-grid-compact">
  <a class="sod-doc-tile" href="/zh-TW/installation"><h3>安裝</h3><p>npm 安裝、ESM 匯入與樣式入口。</p></a>
  <a class="sod-doc-tile" href="/zh-TW/cdn"><h3>CDN 使用</h3><p>固定版本 CDN、ESM/UMD 入口與範例版本切換。</p></a>
  <a class="sod-doc-tile" href="/zh-TW/frameworks"><h3>框架整合</h3><p>React、Vue、Nuxt、Next.js 等客戶端生命週期建議。</p></a>
  <a class="sod-doc-tile" href="/zh-TW/themes"><h3>主題與樣式</h3><p>CSS Variables、宿主頁面共存與 Bootstrap 相容邊界。</p></a>
</div>

## 遷移與維護

<div class="sod-doc-grid-compact">
  <a class="sod-doc-tile" href="/zh-TW/migration"><h3>Migration</h3><p>從舊彈窗或專案內封裝遷移到 SoDialog。</p></a>
  <a class="sod-doc-tile" href="/zh-TW/troubleshooting"><h3>Troubleshooting</h3><p>定位樣式、焦點、CDN、佇列與生命週期問題。</p></a>
  <a class="sod-doc-tile" href="/zh-TW/faq"><h3>FAQ</h3><p>常見使用問題與設計邊界。</p></a>
  <a class="sod-doc-tile" href="/zh-TW/guides/workflow"><h3>開發與發布流程</h3><p>發布前驗證、版本檢查與 CI 路徑。</p></a>
</div>

## Adapter 設計

- [Adapter Guidelines](/zh-TW/guides/adapter-guidelines)：統一入口、診斷 trace、日誌與反例。
- 框架適配器應保持薄封裝，不進入核心執行時依賴。
