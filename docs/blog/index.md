---
title: 开发日志
sidebar: false
aside: false
description: 以开发者第一人称记录 SoDialog 的日常开发、补记、计划与踩坑。
---

# 开发日志

这里是我的开发碎碎念现场：

- 记录今天改了什么
- 补记前几天忘写的开发日志
- 提前写下接下来要做的事，防止明天的我装作不认识今天的我

## 快速入口

- [标签总览](/blog/tags)
- [月度归档](/blog/archive)

## 日志流

### [技术日志（一）：Playwright Smoke 接入实战](/blog/2026-03-11-playwright-smoke-devlog)

![Playwright smoke 测试相关的工位照片](/blog/photos/playwright-workstation.jpg)

`2026-03-11 · playwright · smoke-test · docs`

这篇专门写 Playwright smoke：它是什么、能解决什么问题、如何在文档站落地，以及我这次具体怎么接入。

[阅读全文](/blog/2026-03-11-playwright-smoke-devlog)

---

### [技术日志（二）：docs-smoke-ci 串联构建与验证](/blog/2026-03-11-docs-smoke-ci-devlog)

![任务清单与流程编排相关照片](/blog/photos/ci-task-board.jpg)

`2026-03-11 · ci · smoke-test · release`

这篇拆解了脚本编排：从 docs build 到 preview 探活，再到 Playwright 执行和进程回收，整条链路如何稳定跑。

[阅读全文](/blog/2026-03-11-docs-smoke-ci-devlog)

---

### [技术日志（三）：首页 SEO 元信息基线检查实录](/blog/2026-03-11-seo-metadata-devlog)

![SEO 与结构化元信息检查图](/blog/photos/docs-workflow.jpg)

`2026-03-11 · seo · docs · quality`

这篇记录了 canonical、Open Graph、Twitter Card 与 JSON-LD 的可回归检查方式，以及如何在 smoke 中稳定断言。

[阅读全文](/blog/2026-03-11-seo-metadata-devlog)

---

### [技术日志（四）：Demo 可交互性回归与 iframe 断言](/blog/2026-03-11-demo-readiness-devlog)

![Demo 可交互回归图](/blog/photos/interaction-debug.jpg)

`2026-03-11 · playwright · demo · smoke-test`

这篇记录了如何把 smoke 从“页面能打开”升级为“示例能交互”，包括 iframe 内状态与按钮可用性校验。

[阅读全文](/blog/2026-03-11-demo-readiness-devlog)

---

### [文档站加了 Blog，我终于不用把 TODO 写在脑子里了](/blog/2026-03-11-devlog)

![文档与开发流程相关照片](/blog/photos/docs-workflow.jpg)

`2026-03-11 · docs · workflow`

今天把日志模块接进主导航、侧边栏和首页入口。顺手立了补记规则，防止未来的我把历史改动说成“玄学记忆”。

[阅读全文](/blog/2026-03-11-devlog)

---

### [Context Menu 调整日，鼠标右键终于像个成年人](/blog/2026-03-10-devlog)

![交互调试相关照片](/blog/photos/interaction-debug.jpg)

`2026-03-10（补记） · context-menu · workflow`

这条主要是交互和术语清洗：看起来是小修小补，实际是在给后续排障和协作铺路，属于“省未来时间”的一天。

[阅读全文](/blog/2026-03-10-devlog)

---

### [Toast 队列与发布流程自检，告别“玄学通过”](/blog/2026-03-09-devlog)

![发布核查相关照片](/blog/photos/release-check.jpg)

`2026-03-09（补记） · toast · release`

重点是复盘队列策略和发布清单，把“感觉做过”变成“确实做过”，顺便给后续自动化检查埋点。

[阅读全文](/blog/2026-03-09-devlog)

## 标签索引

- `docs`: 文档结构、导航、信息架构
- `context-menu`: 右键菜单交互与术语统一
- `toast`: 消息队列、提示策略与体验稳定性
- `release`: 发布流程、清单与回归核对
- `playwright`: 文档站端到端自动化验证
- `smoke-test`: 轻量但关键路径可用性检查
- `ci`: 构建、预览、测试编排脚本
- `workflow`: 每日开发节奏、协作和复盘

## 更新节奏

- 正常情况：每日更新 1 条
- 忙到起飞：允许补记，但必须把“补记时间”写清楚
- 发布前：额外写一条发布准备日志
