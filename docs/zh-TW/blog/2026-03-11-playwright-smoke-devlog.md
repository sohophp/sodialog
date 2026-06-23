---
title: 2026-03-11 技术日志（一）：Playwright Smoke 接入实战
sidebar: false
aside: false
description: 记录 SoDialog 文档站 Playwright smoke 测试的接入思路、配置与落地细节。
tags:
  - playwright
  - smoke-test
  - docs
  - workflow
---

# 2026-03-11 技术日志（一）：Playwright Smoke 接入实战

记录时间：2026-03-11 14:20

![夜间工位与代码屏幕](/blog/photos/playwright-workstation.jpg)

最近把文档站的 smoke 测试补齐了，顺手把整个过程记下来，给之后的自己留个“可执行说明书”。

## 这项技术是什么

Playwright 是端到端自动化测试工具。  
这里用它做的不是“重型全量回归”，而是“轻量 smoke”：

- 页面能打开
- 核心标题出现
- 关键 demo 至少能跑起来
- SEO 元信息不是空壳

## 它能做什么

在文档站场景里，Playwright smoke 最有价值的几件事：

1. 防止路由或构建改动导致页面 404/500。
2. 防止文案、导航、标题结构被误改。
3. 防止 demo iframe 失效但发布时没人发现。
4. 让 CI 在合并前给出一个“最低可用保障”。

## 应该怎么做（通用方法）

1. 先定义 smoke 范围：只测关键路径，不追求覆盖率漂亮数字。
2. 单独放一份测试配置，避免和业务 e2e 配置混在一起。
3. 固定 baseURL，通过环境变量可覆写，方便本地和 CI 共用。
4. 失败时要有可诊断材料：截图、trace、HTML report。

## 我这次怎么做的

我把配置和用例拆成两块：

1. `playwright.docs.config.ts`
- 单独 testDir 指向 `tests/docs-smoke`
- reporter 输出到 `playwright-report/docs-smoke`
- `DOCS_BASE_URL` 可注入，默认本地地址

2. `tests/docs-smoke/docs-pages.spec.ts`
- 关键页面逐个 `goto` + 文本断言
- 首页额外校验 canonical / og / twitter / json-ld
- 对 getting-started 的 modal demo 做“可交互就绪”检查

## 技术要点（这次踩坑后的版本）

1. 用例要“少而狠”，不要把 smoke 写成全量 UI 自动化。
2. iframe demo 检查比静态文本更有意义，因为它覆盖了真实运行链路。
3. trace 只在重试时开启（`on-first-retry`），平衡定位能力和执行成本。
4. CI 里最怕“看起来过了，实际没跑到页面”，所以每条 case 都要断言响应成功。

## 一句话复盘

这次不是在“加测试”，而是在给文档站加一个基础生命体征监测仪。
