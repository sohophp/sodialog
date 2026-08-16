# Changelog

本文件采用人工维护，只记录对使用者有意义的功能、修复和兼容性变化。

## Unreleased

## 0.3.20 - 2026-08-16

### Added

- 新增全域 `setTheme()` / `getTheme()` 与单组件 `theme` API，内置向后兼容的 `classic`、产品化 `modern` 和紧凑 `minimal` 三种主题。
- Modal、Offcanvas、Toast 与 Context Menu 现在共享作用域化主题变量；全域主题切换会即时更新未设置局部主题的已开启组件。

### Changed

- 默认 CSS Variables 从全局 `:root` 收敛到 SoDialog 元件根节点，避免污染宿主页面。

## 0.3.19 - 2026-08-14

### Added

- 新增 `blockingConfirm()`，以原生模态层阻止页面其它交互，并要求用户通过确认或取消按钮完成 Promise 式确认流程。

## 0.3.18 - 2026-08-10

### Added

- 图片预览新增 `showScale`，可在启用工具栏时独立控制缩放百分比显示。

## 0.3.17 - 2026-08-10

### Changed

- 图片预览面板默认跟随缩放后的图片同比扩缩，放大时最多扩展到视口留白后的可用区域；默认缩放范围收紧为 25%–400%，并可通过 `resizeWithScale`、`minScale` 与 `maxScale` 调整。

## 0.3.16 - 2026-08-10

### Changed

- 图片预览默认改为无标题栏、无工具栏、无滚动条的居中沉浸预设；窗口随图片扩展但不超出视口，缩放始终以预览区域中心为基准，并开放标题栏、工具栏、溢出、视口留白和初始缩放参数。

## 0.3.15 - 2026-08-10

### Added

- 新增 `openImagePreview` 与 `bindImagePreview`，支持点击图片以原始尺寸打开预览，并使用鼠标滚轮在可配置范围内缩放。

## 0.3.14 - 2026-08-09

### Fixed

- Context Menu 使用 Popover API 进入浏览器 top layer，修复菜单虽挂载在 Dialog 内、仍可能被弹窗面板遮挡的问题；不支持 Popover 时继续使用 Dialog 内挂载回退。

## 0.3.13 - 2026-08-09

### Fixed

- Context Menu 会优先挂载到触发元素、当前焦点或最新 SoDialog 对应的原生 Dialog top layer，修复混合旧弹窗页面中菜单被遮挡的问题。

## 0.3.12 - 2026-08-09

### Fixed

- Dialog 的销毁关闭统一等待 `close` 事件收尾，并忽略快速重复关闭，避免焦点恢复、清理和下一层弹窗打开之间的竞态闪退。

## 0.3.11 - 2026-07-19

### Added

- Dialog 與 Offcanvas 的 `title` 現在可接受 `HTMLElement`，方便在標題區加入連結、圖示或其他可組合內容。

## 0.3.10 - 2026-07-15

### Fixed

- 修复原生 `<dialog>` 首次打开时可能短暂显示浏览器默认黑色边框或焦点框的问题。

## 0.3.9 - 2026-06-25

### Fixed

- 修复组件页 Offcanvas Playground 通过 iframe 嵌套导致面板被限制在预览框内的问题。
- 修复 Modal 按住拖动但尚未移动时因立即切换 fixed 定位导致的轻微抖动。
- 修复 Modal 拖动后再次按住拖动区域时可能因上一帧位置未落地而发生位置偏移的问题。

### Tests

- 增加 Modal 拖动延迟启动与重复按住稳定性的回归测试。

## 0.3.8 - 2026-06-24

### Added

- 新增 Modal header 与关闭按钮配置：`hideHeader`、`hideCloseButton`、`closeButtonLabel`、`closeButtonText`。

### Changed

- 继续整理文档信息架构：顶部导航保留核心入口，更新日志、版本和开发笔记移动到页脚入口。
- 示例中心改为按任务拆分独立页面，并修复 Offcanvas 示例嵌套旧网页的问题。
- Modal Lab 调整为上中下结构，补齐可配置参数面板，并优化表单控件间距。

### Fixed

- 修复从 Context Menu 打开 Modal 时面板出现浏览器默认黑色焦点框的问题。

## 0.3.7 - 2026-06-24

### Added

- 新增 Modal `preset: 'deploy'` 内置预设风格，可用于部署确认类紧凑弹窗。

### Changed

- Modal 默认支持按住 header 拖动，并允许通过 `dragHandle` 指定 `header`、`body`、`footer` 等拖动区域，或通过 `draggable: false` 关闭。
- 合并文档与指南的顶部导航入口，将 npm 与 GitHub 放入右侧图标链接，并精简组件内页页头与右侧 outline。
- 恢复 Blog / 开发笔记为顶部导航和全站 footer 的可发现入口，同时保持其不混入组件、API、指南 sidebar。
- 将文档可运行示例和 Quick Start 的 CDN 默认源切换为 jsDelivr，避免部署站点从 UNPKG 动态导入 ESM 时触发 CORS 拦截。
- 将文档可运行示例的 CDN 版本解析收敛到共享 loader，并支持通过 URL 参数临时切换版本；同时整理示例中心和组件侧边栏入口。
- 修复 GitHub Pages workflow，使文档部署前先构建 legacy demo，并补充自定义域名 `CNAME`。
- 将文档与可运行示例中的 CDN 版本更新到当前 `0.3.7`。
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
