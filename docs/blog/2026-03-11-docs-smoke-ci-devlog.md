---
title: 2026-03-11 技术日志（二）：docs-smoke-ci 串联构建与验证
sidebar: false
aside: false
description: 记录 docs-smoke-ci 脚本如何把 docs build、preview 与 Playwright smoke 串成一条稳定流水线。
tags:
  - ci
  - smoke-test
  - playwright
  - release
---

# 2026-03-11 技术日志（二）：docs-smoke-ci 串联构建与验证

记录时间：2026-03-11 15:05

![带便签和清单的任务桌面](/blog/photos/ci-task-board.jpg)

这一篇专门写脚本层：怎么把构建、起服务、跑 smoke、回收进程串成一条完整流水线。

## 这项技术是什么

`docs-smoke-ci.mjs` 本质上是一个“流程编排器”，把四件事按顺序执行：

1. docs build
2. preview server 启动
3. Playwright smoke 执行
4. 无论成功失败都回收 server

## 它能做什么

- 本地一条命令复现 CI 验证链路
- 避免“我本地是好的，CI 才炸”这种错位
- 降低发布前手动步骤和人为漏检

## 应该怎么做（通用方法）

1. 不要默认服务一定能秒起，必须显式 `waitForServer`。
2. 服务进程一定要在 `finally` 回收。
3. 输出阶段耗时，定位慢点和瓶颈才有依据。
4. 出错信息要可读，不能只给一行 exit code。

## 我这次怎么做的

脚本里我落了几件关键事：

1. 显式 host/port
- 默认 `127.0.0.1:5174`
- 避免与开发中的端口冲突

2. 探活机制
- 循环 HTTP 探测 preview 地址
- 超时后明确抛错而不是无声挂起

3. 跨平台回收
- Windows 走 `taskkill /t /f`
- 其他平台走进程组信号

4. Playwright 环境注入
- 运行测试时注入 `DOCS_BASE_URL`
- 同一套测试可在不同环境复用

## 技术要点（建议抄作业）

1. 编排脚本不要“只管 happy path”，失败路径同样要写完整。
2. 任何外部进程都要有收口逻辑，不然 CI 跑久了容易出现僵尸任务。
3. 把“时间”打印出来，优化才有度量。

## 下一步计划

1. 给 smoke 增加失败快照归档索引，定位更快。
2. 给关键路由增加更细的结构断言（比如导航关键入口是否可见）。
3. 评估是否在 PR 阶段保留轻量 smoke，在 release 阶段再跑重一些的链路检查。

![夜空与发射轨迹风格画面](/blog/photos/night-sky-launch.jpg)
