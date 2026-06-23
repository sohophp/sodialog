---
title: 2026-03-11 技术日志（三）：首页 SEO 元信息基线检查实录
sidebar: false
aside: false
description: 记录如何在文档站建立 canonical、og、twitter 与 json-ld 的可回归检查基线。
tags:
  - seo
  - docs
  - smoke-test
  - quality
---

# 2026-03-11 技术日志（三）：首页 SEO 元信息基线检查实录

记录时间：2026-03-11 18:10

![SEO 与结构化元信息检查图](/blog/photos/docs-workflow.jpg)

这次把首页 SEO 检查从“人工点开看一眼”升级为“可执行基线”，重点是让变更后能快速发现元信息丢失。

## 这项技术是什么

文档站 SEO 基线，不是做营销，而是保障页面在搜索引擎和分享场景下有完整语义。

核心项包括：

- canonical
- Open Graph（`og:title`、`og:description`、`og:image`）
- Twitter Card 元信息
- JSON-LD 结构化数据

## 可以做什么

1. 避免部署后出现分享卡片空白或标题异常。
2. 避免页面路径变化导致 canonical 错误。
3. 在 smoke 阶段快速发现“看不见但很重要”的回归。

## 应该怎么做

1. 配置侧统一产出：在站点配置中集中生成 canonical 与社交元信息。
2. 用例侧最小断言：检查关键 meta/script 节点是否存在。
3. 避免过度耦合文案：优先断言“存在性和结构”，少绑死具体文本。

## 我这次怎么做

1. 在站点配置里保持统一生成逻辑（canonical + og + twitter + json-ld）。
2. 在 docs smoke 用例增加首页 SEO 断言：
- `link[rel="canonical"]`
- `meta[property="og:title"]`
- `meta[property="og:description"]`
- `meta[property="og:image"]`
- `meta[name="twitter:card"]`
- `script[type="application/ld+json"]`

## 技术要点

1. SEO 检查建议放入 smoke 而不是只靠人工巡检。
2. 断言以“结构稳定”为主，比全文案等值更抗变更。
3. 同一套基线可在本地和 CI 重复执行。

## 小结

这类检查不显眼，但对稳定发布很值。它的意义是把“发布后才知道”的问题，前置到提交阶段。
