# Changelog

本文件采用人工维护，只记录对使用者有意义的功能、修复和兼容性变化。

## Unreleased

### Changed

- 恢复 Blog / 开发笔记为顶部导航和全站 footer 的可发现入口，同时保持其不混入组件、API、指南 sidebar。
- 将文档可运行示例和 Quick Start 的 CDN 默认源切换为 jsDelivr，避免部署站点从 UNPKG 动态导入 ESM 时触发 CORS 拦截。
- 将文档可运行示例的 CDN 版本解析收敛到共享 loader，并支持通过 URL 参数临时切换版本；同时整理示例中心和组件侧边栏入口。
- 修复 GitHub Pages workflow，使文档部署前先构建 legacy demo，并补充自定义域名 `CNAME`。
- 将文档与可运行示例中的 CDN 版本更新到当前 `0.3.6`。
- 增加 Blog、Changelog、旧开发日志入口和导航/footer 的文档 smoke 覆盖。
- 修复 Blog 首页文章卡片缺少真实图片，以及英文/繁中文章图片被反引号转义导致不渲染的问题。
- 修复英文与繁中 `Changelog`、`Versions` 及同类顶层文档入口的 404，并补齐导航、页脚、Blog 索引页的本地化文案。

## 0.3.6 - 2026-06-23

### Added

- 新增文档站分区信息架构，覆盖文档、组件、API、示例、指南、更新日志和版本中心。
- 新增 Modal Lab，可通过配置面板实时预览 Modal 并复制生成代码。
- 新增统一组件页头、版本徽章、API 参数表、Labs 卡片和 CDN 示例组件。
- 新增安装、CDN、框架集成、主题、迁移、Troubleshooting、FAQ、正式更新日志和版本页面。

### Changed

- 顶部导航调整为文档、组件、API、示例、指南、更新日志、版本、GitHub 与 npm。
- Sidebar 按内容区域拆分，开发日志不再混入组件、API 和指南侧边栏。
- 组件页改为最短示例优先，并移除教程式 Level 命名。
- CDN 示例与版本徽章改为从 `package.json` 派生的单一版本源。

### Fixed

- 保持文档站 canonical、Open Graph、Sitemap 和 robots 使用 `https://sodialog.sohophp.app/`。

## Release History

历史版本与对应提交请查看：

- [GitHub Releases](https://github.com/sohophp/sodialog/releases)
- [Git Tags](https://github.com/sohophp/sodialog/tags)
