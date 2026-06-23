---
title: 文档站从漂亮项目页升级到组件库工作台
description: 记录 SoDialog 文档站信息架构、内页 UX、Labs、API Reference、版本中心和发布验证的重构过程。
---

# 文档站从漂亮项目页升级到组件库工作台

`2026-06-23 · docs · ux · api · release · quality`

这次改造的重点不是把首页再做得更热闹，而是让内页更像一个真正能长期维护的组件库文档站：查 API 要快，找示例要直，组件页要先给最短可运行代码，再展开场景、生命周期和可访问性。

## 实际完成

- 顶部导航改为文档、组件、API、示例、指南、更新日志、版本、GitHub 与 npm。
- Sidebar 按内容区域拆分，开发日志不再混在组件和 API 导航里。
- 组件页接入统一页头、版本元信息、快速操作和最短示例。
- 示例中心升级为 Labs 入口，并先落地一个可操作的 Modal Lab。
- API 首页补上快速检索入口、Methods、Types、Global config、Adapters 与 Lifecycle 索引。
- 新增安装、CDN、框架集成、主题、迁移、Troubleshooting、FAQ、正式更新日志和版本中心。

## 取舍

这次没有复制整套历史版本文档，也没有把所有旧 demo 一次性迁移成三栏 Lab。旧 demo 继续保留，新的 Lab 结构先跑通，再逐步把 Toast、Offcanvas 和 Context Menu 迁进去。

## 发布前关注

文档站现在从根 `package.json` 读取版本，CDN 示例和版本徽章不再各自硬编码。发布前仍要跑 `npm run lint`、`npm run test:run`、`npm run build`、`npm run docs:build` 和 smoke，确保链接、代码块、移动端布局与 SEO 没有回退。
