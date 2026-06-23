---
title: 更新与开发笔记
sidebar: false
aside: false
description: 记录 SoDialog 的设计、实现、发布和长期演进。
---

# 更新与开发笔记

记录 SoDialog 的设计、实现、发布和长期演进。正式版本变化请查看 [更新日志](/changelog/)，这里保留开发笔记、发布过程、设计决策和项目思考。

<div class="blog-filter-row" aria-label="文章分类">
  <a href="/blog/">全部</a>
  <a href="/blog/tags#docs">开发笔记</a>
  <a href="/blog/tags#release">发布记录</a>
  <a href="/blog/tags#api">设计决策</a>
</div>

## 快速入口

- [标签总览](/blog/tags)
- [月度归档](/blog/archive)
- [正式更新日志](/changelog/)

## 文章

<div class="blog-card-list">
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/photos/docs-workflow.jpg" alt="文档信息架构与发布流程预览图">
    <div>
      <p class="blog-card__meta">2026-06-23 · docs · ux · api · release · quality · 约 3 分钟</p>
      <h2><a href="/blog/2026-06-23-docs-ia-ux-devlog">文档站从漂亮项目页升级到组件库工作台</a></h2>
      <p>重构文档站信息架构、内页 UX、Labs、API Reference、版本中心和更新日志，让 SoDialog 的文档更像成熟组件库工作台。</p>
      <a class="blog-card__read" href="/blog/2026-06-23-docs-ia-ux-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/photos/docs-workflow.jpg" alt="文档与发布流程相关照片">
    <div>
      <p class="blog-card__meta">2026-06-23 · docs · i18n · release · ci · quality · 约 5 分钟</p>
      <h2><a href="/blog/2026-06-23-devlog">让文档站说三种语言，也让发布流程少一点玄学</a></h2>
      <p>接入简体中文、繁体中文、英文三语言文档站，确认 npm 发布失败的真实原因，并把自动发布路径重新梳理清楚。</p>
      <a class="blog-card__read" href="/blog/2026-06-23-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/photos/interaction-debug.jpg" alt="交互与尺寸调试现场">
    <div>
      <p class="blog-card__meta">2026-06-21 · api · context-menu · release · quality · 约 4 分钟</p>
      <h2><a href="/blog/2026-06-21-devlog">把尺寸控制权还给使用者</a></h2>
      <p>统一四类组件的尺寸 API，修掉首次右键黑框，并把文档、测试与 v0.2.5 发布准备收进同一条闭环。</p>
      <a class="blog-card__read" href="/blog/2026-06-21-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/photos/playwright-workstation.jpg" alt="Playwright smoke 测试相关的工位照片">
    <div>
      <p class="blog-card__meta">2026-03-11 · playwright · smoke-test · docs · 约 4 分钟</p>
      <h2><a href="/blog/2026-03-11-playwright-smoke-devlog">技术日志（一）：Playwright Smoke 接入实战</a></h2>
      <p>拆解 Playwright smoke 能解决什么问题、如何在文档站落地，以及这次具体怎么接入。</p>
      <a class="blog-card__read" href="/blog/2026-03-11-playwright-smoke-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/photos/ci-task-board.jpg" alt="任务清单与流程编排相关照片">
    <div>
      <p class="blog-card__meta">2026-03-11 · ci · smoke-test · release · 约 4 分钟</p>
      <h2><a href="/blog/2026-03-11-docs-smoke-ci-devlog">技术日志（二）：docs-smoke-ci 串联构建与验证</a></h2>
      <p>从 docs build 到 preview 探活，再到 Playwright 执行和进程回收，记录整条链路如何稳定跑。</p>
      <a class="blog-card__read" href="/blog/2026-03-11-docs-smoke-ci-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/photos/docs-workflow.jpg" alt="SEO 与结构化元信息检查图">
    <div>
      <p class="blog-card__meta">2026-03-11 · seo · docs · quality · 约 3 分钟</p>
      <h2><a href="/blog/2026-03-11-seo-metadata-devlog">技术日志（三）：首页 SEO 元信息基线检查实录</a></h2>
      <p>记录 canonical、Open Graph、Twitter Card 与 JSON-LD 的可回归检查方式。</p>
      <a class="blog-card__read" href="/blog/2026-03-11-seo-metadata-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/photos/interaction-debug.jpg" alt="Demo 可交互回归图">
    <div>
      <p class="blog-card__meta">2026-03-11 · playwright · demo · smoke-test · 约 3 分钟</p>
      <h2><a href="/blog/2026-03-11-demo-readiness-devlog">技术日志（四）：Demo 可交互性回归与 iframe 断言</a></h2>
      <p>把 smoke 从“页面能打开”升级为“示例能交互”，包括 iframe 内状态与按钮可用性校验。</p>
      <a class="blog-card__read" href="/blog/2026-03-11-demo-readiness-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/devlog-2026-03-11.svg" alt="2026-03-11 开发日志代表图">
    <div>
      <p class="blog-card__meta">2026-03-11 · docs · workflow · 约 2 分钟</p>
      <h2><a href="/blog/2026-03-11-devlog">文档站加了 Blog，我终于不用把 TODO 写在脑子里了</a></h2>
      <p>把日志模块接进导航、侧边栏和首页入口，并立下补记规则。</p>
      <a class="blog-card__read" href="/blog/2026-03-11-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/devlog-2026-03-10.svg" alt="2026-03-10 开发日志代表图">
    <div>
      <p class="blog-card__meta">2026-03-10 · context-menu · workflow · 约 2 分钟</p>
      <h2><a href="/blog/2026-03-10-devlog">Context Menu 调整日，鼠标右键终于像个成年人</a></h2>
      <p>交互和术语清洗，为后续排障和协作铺路。</p>
      <a class="blog-card__read" href="/blog/2026-03-10-devlog">阅读文章 →</a>
    </div>
  </article>
  <article class="blog-card">
    <img class="blog-card__visual" src="/blog/devlog-2026-03-09.svg" alt="2026-03-09 开发日志代表图">
    <div>
      <p class="blog-card__meta">2026-03-09 · toast · release · 约 2 分钟</p>
      <h2><a href="/blog/2026-03-09-devlog">Toast 队列与发布流程自检，告别“玄学通过”</a></h2>
      <p>复盘队列策略和发布清单，把“感觉做过”变成“确实做过”。</p>
      <a class="blog-card__read" href="/blog/2026-03-09-devlog">阅读文章 →</a>
    </div>
  </article>
</div>

## 标签索引

- `docs`: 文档结构、导航、信息架构
- `ux`: 内页体验、信息密度、Lab 布局
- `context-menu`: 右键菜单交互与术语统一
- `toast`: 消息队列、提示策略与体验稳定性
- `release`: 发布流程、清单与回归核对
- `i18n`: 多语言路由、文案和 SEO 元信息
- `playwright`: 文档站端到端自动化验证
- `smoke-test`: 轻量但关键路径可用性检查
- `ci`: 构建、预览、测试编排脚本
- `workflow`: 每日开发节奏、协作和复盘
- `api`: 公开接口设计与一致性
- `quality`: 交互修复、测试与质量基线

## 更新节奏

- 正常情况：每日更新 1 条
- 忙到起飞：允许补记，但必须把“补记时间”写清楚
- 发布前：额外写一条发布准备日志
