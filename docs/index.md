---
layout: home
description: SoDialog 官方文档首页，覆盖 Modal、Offcanvas、Toast、Context Menu 的示例、API 与工作流指南。

hero:
  name: SoDialog
  text: 统一管理弹窗交互的组件库
  tagline: 一套 API 覆盖 Modal、Offcanvas、Toast、Context Menu，帮助你更快上线且更容易维护。
  image:
    src: /logo.svg
    alt: SoDialog
  actions:
    - theme: brand
      text: 快速开始
      link: /getting-started
    - theme: alt
      text: 在线示例
      link: /examples/

  metrics:
    - title: 4 大核心组件
      details: Modal / Offcanvas / Toast / Context Menu
    - title: 文档与示例同步
      details: API、示例、指南同仓维护
    - title: Smoke CI 可回归
      details: docs build + preview + playwright smoke

features:
  - title: 统一交互模型
    details: 把多种弹窗组件放到同一套调用语义里，减少心智切换。
  - title: 快速落地
    details: 从安装到第一个可用弹窗，按文档 3 步完成接入。
  - title: 面向发布
    details: 文档、示例、API 与 smoke 校验链路保持同步。
---

## SoDialog 一眼看懂

SoDialog 是一个前端弹窗组件库，用统一 API 处理 `Modal`、`Offcanvas`、`Toast` 和 `Context Menu`。

- 你能快速做出一致的交互体验
- 你能少写重复配置
- 你能更稳定地做回归验证

## 30 秒上手代码

```ts
import 'sodialog/style.css'
import { openModal, openOffcanvas, toast } from 'sodialog'

await openModal({
  title: '删除确认',
  content: '确定要删除这条记录吗？',
  confirmText: '删除'
})

openOffcanvas({
  title: '筛选条件',
  placement: 'right'
})

toast.success('操作已完成')
```

## 概念图

<img src="/home/sodialog-concept.svg" alt="SoDialog 统一 API 概念图" style="max-width: 420px; margin: 0 auto; display: block; background: #f6f8fb; border-radius: 12px; box-shadow: 0 2px 8px #0001;" />

SoDialog 统一管理 Modal、Offcanvas、Toast、Context Menu —— 一套 API，四类弹窗。

## 从哪里开始

1. [快速开始](/getting-started)
2. [在线示例](/examples/)
3. [API 参考](/api/)

`可靠性状态：PASS（docs build / docs smoke / SEO metadata）`

更多开发日志：[/blog/](/blog/)
