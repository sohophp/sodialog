# 指南总览

指南区收录 SoDialog 从接入到发布前检查的工作流内容。这里不重复 API 表格，而是帮助你选择正确的集成路径、主题策略和排障入口。

## 接入与使用

<div class="sod-doc-grid-compact">
  <a class="sod-doc-tile" href="/installation"><h3>安装</h3><p>npm 安装、ESM 导入和样式入口。</p></a>
  <a class="sod-doc-tile" href="/cdn"><h3>CDN 使用</h3><p>固定版本 CDN、ESM/UMD 入口和示例版本切换。</p></a>
  <a class="sod-doc-tile" href="/frameworks"><h3>框架集成</h3><p>React、Vue、Nuxt、Next.js 等客户端生命周期建议。</p></a>
  <a class="sod-doc-tile" href="/themes"><h3>主题与样式</h3><p>CSS Variables、宿主页面共存和 Bootstrap 兼容边界。</p></a>
</div>

## 迁移与维护

<div class="sod-doc-grid-compact">
  <a class="sod-doc-tile" href="/migration"><h3>迁移</h3><p>从旧弹窗或项目内封装迁移到 SoDialog。</p></a>
  <a class="sod-doc-tile" href="/troubleshooting"><h3>Troubleshooting</h3><p>定位样式、焦点、CDN、队列和生命周期问题。</p></a>
  <a class="sod-doc-tile" href="/faq"><h3>FAQ</h3><p>常见使用问题和设计边界。</p></a>
  <a class="sod-doc-tile" href="/guides/workflow"><h3>开发与发布流程</h3><p>发布前验证、版本检查和 CI 路径。</p></a>
</div>

## 适配器设计

- [Adapter Guidelines](/guides/adapter-guidelines)：统一入口、诊断 trace、日志和反例。
- 框架适配器应保持薄封装，不进入核心运行时依赖。

## 建议阅读顺序

1. 新项目先看 [安装](/installation) 和 [CDN 使用](/cdn)。
2. 框架项目补看 [框架集成](/frameworks)。
3. 需要统一视觉时看 [主题与样式](/themes)。
4. 迁移旧系统时看 [迁移](/migration) 和 [Adapter Guidelines](/guides/adapter-guidelines)。
5. 发布前按 [开发与发布流程](/guides/workflow) 核对。
