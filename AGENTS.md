# Project Overview

SoDialog 是一个现代、轻量、TypeScript First 的 Dialog 解决方案。核心库基于浏览器原生 `<dialog>` 与 DOM API，提供 Modal、Offcanvas、Toast、Context Menu、Promise 式交互和 Adapter API。

项目的核心定位：

- Framework Agnostic：核心能力不绑定 React、Vue 或其他框架。
- 可独立运行：使用原生 JavaScript、TypeScript、HTML 与 CSS 即可接入。
- Bootstrap 兼容，但不依赖 Bootstrap。
- 不依赖 jQuery，不把 Popper 作为必需依赖。
- 轻量、高性能，并优先保证开发者体验。

不可动摇的产品原则：

> Bootstrap compatibility is a feature. Bootstrap dependency is forbidden.

当前源码事实：

- 核心实现位于 `src/lib.ts`，公共样式位于 `src/sodialog.css`。
- npm 包入口为 `dist/sodialog.es.js`，类型入口为 `dist/types/lib.d.ts`，样式子路径为 `sodialog/style.css`。
- `package.json` 没有 `dependencies` 或 `peerDependencies`，运行时必需依赖为零。
- 公共 API 包括 `SoDialog`、`SoToast`、`SoContextMenu`、`SoAdapter` 及相应函数式入口。
- 单元测试位于 `tests/lib.test.ts`，文档端到端冒烟测试位于 `tests/docs-smoke/`。
- 文档源码位于 `docs/`，使用 VitePress；可运行示例位于 `docs/public/components/`，旧版演示位于 `docs/public/legacy-demo/`。

# Product Vision

SoDialog 的目标是让开发者在不引入完整 UI 框架的前提下，获得可靠、现代、可组合的交互浮层能力。

产品决策应优先满足：

1. 原生平台能力优先，避免重复实现浏览器已经提供的语义。
2. 使用成本低：API 清晰、类型完整、默认行为合理、示例可直接运行。
3. 可渐进采用：既能用于简单 HTML 页面，也能嵌入现有框架项目。
4. 兼容 Bootstrap 的使用习惯与视觉生态，但绝不把 Bootstrap 变成依赖。
5. 样式可通过 CSS Variables 定制，并能与 Tailwind CSS 等方案共存。
6. 在功能扩张时持续控制包体积、DOM 复杂度和运行时开销。

# Technical Stack

- 语言：TypeScript 5.9，严格模式，目标为 ES2022。
- 核心运行时：浏览器原生 DOM、`HTMLDialogElement`、CSS。
- 构建：Vite 7 Library Mode；Rollup 负责库产物打包。
- 类型产物：TypeScript Compiler 使用 `tsconfig.build.json` 仅生成声明文件。
- 样式：原生 CSS，以 `sod-` 类名前缀和 `--sod-*` CSS Variables 为主。
- 单元测试：Vitest 4 + jsdom。
- 文档测试：Playwright，当前项目配置覆盖 Chromium。
- 文档站：VitePress 1，包含本地搜索、自定义主题组件和静态可运行示例。
- 代码检查：ESLint 10 + typescript-eslint。
- 包管理与 CI：npm，锁文件为 `package-lock.json`；GitHub Actions 使用 `npm ci`。
- 发布：npm 公共包，支持 Trusted Publishing/OIDC，并保留 Granular Access Token 路径。
- 部署：GitHub Actions 构建 VitePress 静态站并部署至 GitHub Pages，公开主域名为 `https://sodialog.sohophp.app/`。

常用命令：

```bash
npm ci
npm run dev
npm run lint
npm run test:run
npm run build
npm run docs:build
npm run docs:test:smoke:ci
npm run release:verify
```

构建关系：

- `npm run build`：Vite 构建库文件，再由 TypeScript 生成声明文件。
- `npm run build:demo`：将根目录旧版演示构建到 `docs/public/legacy-demo/`。
- `npm run docs:build`：先构建旧版演示，再构建 VitePress 文档站。
- `.github/workflows/pages.yml`：当前直接执行 VitePress 构建并输出到 `dist-pages/`。
- `.github/workflows/npm-publish.yml`：校验版本、安装依赖和 Chromium、执行完整发布验证后发布 npm。

# Architecture Principles

## Framework Agnostic

- 核心 API 只依赖标准 Web Platform 能力，不导入框架运行时。
- 不在核心包中加入 React Hook、Vue Composable 或框架生命周期耦合。
- 框架适配应是薄封装，并放在独立入口或独立包中；不得污染核心实现。
- 接受 `Node` 的内容 API 应保持可组合，不强迫调用方使用模板字符串。

## TypeScript First

- 所有公共 API 必须有明确、可导出的 TypeScript 类型。
- 新增或修改选项时，同步更新接口、返回类型、实现、测试和 API 文档。
- 保持 `strict`、`noUnusedLocals`、`noUnusedParameters` 等现有约束通过。
- 不使用 `any` 掩盖公共 API 设计问题；确需使用时必须局部化并说明边界。

## Zero Required Dependencies

- 核心 npm 包必须保持零运行时必需依赖。
- 不得把 Bootstrap、jQuery、Popper、图标库或框架运行时加入 `dependencies`/`peerDependencies` 作为使用前提。
- 可选集成必须通过调用方注入、标准 DOM/CSS 接口或独立适配层实现。
- 开发工具可作为 `devDependencies` 存在，但不得泄漏到运行时产物。

## Tree Shakable

- 保持 ESM 和命名导出；新增 API 不应依赖不必要的顶层副作用。
- `sideEffects` 仅保留样式等真实副作用声明，不得为方便而将整个包标记为有副作用。
- 避免在模块加载阶段访问或修改 DOM；DOM 工作应发生在显式 API 调用后。
- 修改入口结构、CSS 导入方式或 `exports` 时，必须检查实际消费端打包结果。

## Accessibility Friendly

- 优先保留原生 `<dialog>` 语义与浏览器焦点行为。
- Dialog 必须维护可访问名称与描述，例如 `aria-labelledby`、`aria-describedby`、`aria-modal`。
- 关闭按钮、纯图标和状态容器必须有正确的可访问名称或隐藏语义。
- 打开和关闭交互必须正确处理焦点进入、键盘操作与触发元素焦点恢复。
- Context Menu 必须保持方向键、Home/End、Enter/Space、Escape、typeahead 和 ARIA 状态可用。
- Toast 必须使用适当的 live region，且不能只依赖颜色表达状态。
- 新交互必须补充键盘和焦点测试；动画应尊重 `prefers-reduced-motion`。

## Mobile Friendly

- 所有面板必须受视口宽高约束，避免横向溢出。
- Offcanvas、拖动、滚动和触控目标必须在窄屏及触摸设备上可用。
- 尺寸 API 应继续支持数字和合法 CSS 尺寸，如 `rem`、`vw`、`vh`、`calc(...)`。
- 响应式行为优先使用 CSS；只有布局确实依赖运行时测量时才使用 JavaScript。
- 新增 UI 至少检查桌面与移动视口，并避免依赖 hover 才能完成操作。

## Compatibility and Encapsulation

- 所有核心类名继续使用 `sod-` 前缀，CSS Variables 使用 `--sod-` 前缀。
- 不污染全局 `body`、`:root` 或通配选择器；变量默认值应限定在 SoDialog 组件作用域。
- Bootstrap 兼容是 API、视觉和共存能力，不是对 Bootstrap 源码或运行时的复用。
- 不修改 `node_modules`、CDN 文件或复制进仓库的第三方构建产物来“修复”问题。

# Supported Environments

以下环境均应支持。这里的“支持”表示核心库可集成，并不表示仓库当前提供对应框架的专用组件包。

## Vanilla JS

- 使用 ESM 或构建后的库入口调用函数式 API。
- 样式通过 `sodialog/style.css` 显式引入。
- 不要求全局框架对象或额外运行时。

## TypeScript

- 以生成的 `dist/types/lib.d.ts` 提供完整类型。
- 文档示例应优先给出可复制的 TypeScript/ESM 用法。

## Bootstrap

- 可与 Bootstrap 页面和 Bootstrap Icons 共存。
- Bootstrap Icons 仅为可选示例资源，不是 SoDialog 依赖。
- 不得要求安装或初始化 Bootstrap JavaScript。

## Tailwind CSS

- 通过标准类名、调用方内容节点和 `--sod-*` 变量共存。
- 不要求 Tailwind 插件，不依赖 Tailwind 的构建步骤。
- 避免选择器重置与 Tailwind Preflight 产生不必要冲突。

## React

- 在客户端 effect、事件处理器或显式 DOM 生命周期中调用核心 API。
- 组件卸载时销毁由该组件持有的实例或解绑监听。
- 不把 React 节点假装成 DOM `Node`；如需专用渲染桥接，应放在独立适配层。

## Vue

- 在 `onMounted` 后或用户事件中调用，在 `onUnmounted` 时清理实例与监听。
- Vue 文档站依赖来自 VitePress，不得因此让核心库依赖 Vue。

## Nuxt

- 仅在客户端生命周期、客户端插件或 `<ClientOnly>` 边界内操作 DOM。
- 服务端渲染阶段不得调用需要 `window`、`document` 或 `HTMLDialogElement` 的 API。

## Next.js

- 在 Client Component、effect 或浏览器事件中使用核心 API。
- Server Component 和 SSR 阶段不得执行 DOM 交互；必要时延迟到客户端加载。

# Coding Standards

- 修改前先阅读相邻实现、公共类型、相关测试和文档，不根据文件名猜测行为。
- 维持现有 TypeScript 风格：ES Modules、单引号、无分号、尾随逗号、清晰的提前返回。
- 变量与函数使用 `camelCase`，类型与类使用 `PascalCase`，CSS 使用 `sod-` 前缀。
- 公共类型和 API 命名沿用 `So*` 体系；避免没有迁移策略的重命名。
- 优先小而明确的函数，避免继续放大单个复杂流程；新增子系统时应评估是否从 `src/lib.ts` 拆分内部模块。
- 不吞掉异常。可恢复错误应有明确回退；诊断事件应沿用 Adapter logger 与 `traceId` 机制。
- 所有事件监听器、定时器、观察器和临时 DOM 必须有对应清理路径。
- 不引入不必要的全局状态；同 ID 复用、队列和实例注册表行为必须保持可预测。
- 不在没有测试与迁移说明的情况下改变默认值、关闭原因、生命周期顺序或 Promise 返回语义。
- 任何公共 API 变更都必须同步：`src/lib.ts` 类型与实现、`tests/lib.test.ts`、`docs/api/`、组件示例、`README.md` 和 `CHANGELOG.md`（适用时）。
- 用户可见的功能、修复或兼容性变化应直接写入 `CHANGELOG.md` 的 `Unreleased`；纯内部重构无需记录。Changelog 人工维护，不从 Git 提交自动生成。

验证要求按变更范围选择，但交付前至少执行直接相关检查：

```bash
npm run lint
npm run test:run
npm run build
```

涉及文档、SEO、示例或部署时，再执行：

```bash
npm run docs:build
npm run docs:test:smoke:ci
```

发布相关变更执行：

```bash
npm run release:verify
```

# Documentation Standards

- 示例优先：先展示最小可运行示例，再解释参数和高级行为。
- API 必须完整：每个公共类型、选项、默认值、返回值、关闭原因和生命周期行为都要可查。
- 所有功能必须有示例；复杂功能至少提供一个基础示例和一个真实场景示例。
- 示例必须与当前 npm 导出和类型一致，不能展示不存在的框架封装或未实现 API。
- 中英文保持一致：同一能力的中英文内容、术语、代码和默认值必须同步更新；若当前仅有一种语言页面，不得在另一处维护互相冲突的说明。
- `docs/components/` 负责组件概念和场景，`docs/api/` 负责完整契约，`docs/examples/` 负责示例索引，`docs/guides/` 负责工作流、迁移和排障。
- 可运行示例放在 `docs/public/components/`，通过 `DemoPreview` 展示并提供源码查看/复制。
- 文档链接使用站内根路径，并兼容 VitePress 的 `cleanUrls`。
- 修改公共行为后，同步检查 `README.md`；根目录历史指南与 `docs/guides/` 有重叠时，以文档站版本为维护重点，并避免内容漂移。
- 不手工编辑 `docs/.vitepress/dist/`、`dist-pages/` 或 `playwright-report/`；这些是构建/测试产物。
- 开发日志应记录实际完成的工作，不把计划、猜测或未验证结果写成事实。

# UI Principles

界面气质参考 Vercel、Supabase 和 shadcn/ui，但不得复制其品牌资产或组件源码。

- 简洁：减少装饰层级，优先清晰的信息结构和足够留白。
- 现代：使用克制的色彩、边框、阴影、圆角与动效，避免视觉噪音。
- 产品化：覆盖 loading、empty、error、disabled、focus、overflow 和移动端状态。
- 开发者优先：代码示例、API 路径、复制操作和调试信息应易发现、易理解。
- 默认样式保持中性，并通过 CSS Variables 提供稳定主题接口。
- 交互反馈应及时但不过度；避免为装饰增加持续动画或大量 JavaScript。
- 可访问性不是后补项：可见焦点、对比度、键盘路径、触控尺寸与 reduced motion 必须在设计阶段考虑。
- Bootstrap 风格兼容应通过 SoDialog 自身样式与变量实现，不复制或覆盖 Bootstrap 内部选择器。

# SEO Rules

唯一网站主地址：

`https://sodialog.sohophp.app/`

禁止在源码、元数据、生成配置和公开文档中出现旧地址：

`https://sohophp.github.io/sodialog/`

每次修改文档配置、路由、域名或部署流程时必须检查：

- `canonical`：每页唯一，使用主域名和正确页面路径。
- `og:url`：与 canonical 一致。
- `sitemap`：hostname 与所有生成 URL 使用主域名。
- `robots`：允许抓取策略正确，Sitemap 指向主域名的 `/sitemap.xml`。
- 同时检查 Open Graph、Twitter Card 与 JSON-LD 中的绝对 URL。
- 不依赖生成目录掩盖源文件错误；SEO 源配置以 `docs/.vitepress/config.ts` 和 `docs/public/robots.txt` 为准。

当前已知基线问题：`docs/public/robots.txt` 的 Sitemap 仍指向被禁止的旧 GitHub Pages 地址。任何涉及 SEO 或文档发布的后续变更都必须先修复并验证这一项，不能复制该值到其他文件。

建议使用源码检索阻止旧域名回归：

```bash
rg -n "sohophp\.github\.io/sodialog" . \
  -g "!AGENTS.md" \
  -g "!node_modules/**" \
  -g "!dist/**" \
  -g "!dist-pages/**" \
  -g "!docs/.vitepress/dist/**"
```

# Performance Rules

- Lighthouse 应保持优秀；重要页面关注 Performance、Accessibility、Best Practices 与 SEO。
- 尽量减少客户端 JavaScript，静态内容优先由 HTML/CSS 表达。
- 减少 DOM 数量和嵌套深度，复用已有容器，不为纯装饰创建节点。
- 主题、尺寸、颜色和视觉状态优先使用 CSS Variables。
- 高频指针、拖动、滚动和 resize 路径避免布局抖动；读写布局应分离，必要时使用 `requestAnimationFrame` 节流。
- 观察器、全局监听和 timer 只在需要时注册，并在 hide/destroy/unmount 时清理。
- 避免新增大型依赖、重复 polyfill、运行时 CSS-in-JS 或整库图标资源。
- 图片和字体必须控制体积；文档站新增远程资源时考虑缓存、隐私、失败回退和首屏阻塞。
- 新功能应评估包体积与产物变化；不能以“开发方便”为由无界增加核心入口体积。

# Forbidden Changes

禁止以下变更：

- 引入 Bootstrap 作为必需依赖。
- 引入 jQuery。
- 引入 Popper 作为必需依赖。
- 引入大型 UI Framework 到核心库。
- 让 React、Vue、VitePress 或其他框架成为核心运行时依赖。
- 修改第三方源码、`node_modules`、CDN 产物或供应商构建文件。
- 直接手改 `dist/`、`dist-pages/`、`docs/.vitepress/dist/` 等生成物来代替修改源码。
- 移除 ESM、类型声明或独立样式导出而不提供兼容迁移方案。
- 破坏 GitHub Pages 静态部署、根路径资源、clean URL 或 legacy demo 的兼容性。
- 在公共站点重新引入 `https://sohophp.github.io/sodialog/`。
- 通过全局 CSS reset 或无前缀选择器污染宿主页面。
- 未经测试改变焦点恢复、Escape、backdrop、关闭原因、生命周期顺序或队列语义。

# AI Workflow

## 修改前

1. 分析请求影响的源码、类型、样式、测试、文档、构建和部署边界。
2. 检查工作树，保留用户已有改动，不覆盖无关文件。
3. 阅读真实实现和现有测试；不根据 README、旧构建产物或计划文档单独推断行为。
4. 制定简短计划，说明目标、涉及文件、兼容风险和验证范围。
5. 若需求会突破零依赖、框架无关或 Bootstrap 禁依赖原则，停止并明确指出冲突。

## 修改中

1. 保持改动最小、聚焦、可回滚。
2. 实现、类型、测试和文档同步推进，不把契约更新留到最后猜补。
3. 遇到源码与文档不一致时，以已验证的运行时行为和测试为依据，并明确修正文档或实现的选择。
4. 不顺手修改无关代码，不格式化整个仓库，不覆盖用户未提交改动。

## 修改后

1. 总结实际变更及涉及文件。
2. 说明兼容性、可访问性、性能、SEO 和部署风险；没有已知风险时也要明确说明验证边界。
3. 列出实际执行的验证命令和结果，不声称运行过未运行的检查。
4. 对未执行的浏览器、移动端、Lighthouse、发布或人工检查给出明确复现方法。
5. 检查 `git diff --check` 和最终 diff，确认没有意外生成物、旧域名或无关改动。

# Repository Map

```text
src/lib.ts                         核心库、公共类型与 API
src/sodialog.css                   核心组件样式与主题变量
src/*-main.ts                      旧版演示和页面交互入口
tests/lib.test.ts                  核心行为单元测试
tests/docs-smoke/                  文档站 Playwright 冒烟测试
vite.config.ts                     库与 legacy demo 构建配置
tsconfig.json                      TypeScript 开发检查配置
tsconfig.build.json                类型声明构建配置
vitest.config.ts                   jsdom 单元测试配置
playwright.docs.config.ts          文档 Chromium 冒烟测试配置
docs/.vitepress/config.ts          文档导航、SEO 与站点配置
docs/.vitepress/theme/             文档主题和 Vue 展示组件
docs/public/components/            可运行的独立组件示例
docs/public/legacy-demo/           legacy demo 构建产物
.github/workflows/pages.yml        GitHub Pages 构建与部署
.github/workflows/npm-publish.yml  npm 发布
```

# Definition of Done

一个功能或修复只有在以下适用项完成后才算完成：

- 实现符合 Framework Agnostic、Zero Required Dependencies 和 Bootstrap 禁依赖原则。
- 公共类型、导出和默认值准确。
- 单元测试覆盖成功路径、关键边界和清理行为。
- 键盘、焦点、ARIA 与移动端行为未退化。
- 文档 API 完整且至少有一个可运行示例。
- 中英文说明没有冲突。
- SEO 使用唯一主域名；除本规范中的禁止项说明外，公开站点源码中的旧 GitHub Pages 地址检索为零。
- `lint`、单元测试和构建通过；文档变更还需文档构建与 smoke 通过。
- 最终交付包含变更总结、风险说明和验证方法。
