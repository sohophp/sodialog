---
title: 2026-03-11 技术日志（四）：Demo 可交互性回归与 iframe 断言
sidebar: false
aside: false
description: 记录如何把文档 smoke 从“页面可访问”提升到“示例可交互”，并稳定校验 iframe 场景。
tags:
  - playwright
  - demo
  - quality
  - smoke-test
---

# 2026-03-11 技术日志（四）：Demo 可交互性回归与 iframe 断言

记录时间：2026-03-11 18:45

![Demo 可交互回归图](/blog/photos/interaction-debug.jpg)

文档 smoke 如果只检查“页面能打开”，很容易漏掉示例不可用的问题。  
这次把重点放到 demo 真正可交互这件事上。

## 这项技术是什么

在 Playwright 中进入 iframe 场景，检查 demo 的运行状态、按钮可用性，以及触发交互后的可见反馈。

## 可以做什么

1. 识别脚本加载失败但页面仍然显示的“假正常”状态。
2. 识别按钮渲染了但不可操作的交互回归。
3. 覆盖“文档页 + 示例页 + 组件行为”三段链路。

## 应该怎么做

1. 先定位文档内 iframe。
2. 在 iframe 里断言“加载中状态已结束”。
3. 断言“已就绪状态出现”和“关键按钮可用”。
4. 执行一次核心交互，检查可见反馈。

## 我这次怎么做

在 smoke 用例里针对 getting-started 的 modal demo 做了以下检查：

1. 进入 `iframe[src="/components/modal-basic.html"]`
2. 等待 `#status` 从“正在加载示例脚本...”切换为“已就绪，点击按钮查看效果。”
3. 断言 `#open` 按钮可点击
4. 点击后断言 `dialog[open]` 可见

## 技术要点

1. iframe 断言的等待策略要聚焦“状态变化”，不要只等固定时间。
2. 文本断言要覆盖“失败提示语”，这样异常时更容易定位。
3. 交互断言至少做一次核心动作，避免只测静态渲染。

## 小结

把 smoke 从“可访问性检查”提升到“可交互性检查”，可以明显提升文档示例的发布信心。
