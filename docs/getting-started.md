---
description: SoDialog 快速开始：安装、引入、首个可运行示例与 Adapter First 配置方式。
---

# 快速开始（Quick Start）

本页帮助你在几分钟内完成安装、引入与首个可运行示例。

## 第 1 步：安装

```bash
npm install sodialog
```

## 第 2 步：引入样式与 API

```ts
import { openModal, openOffcanvas, toast } from 'sodialog'
import 'sodialog/style.css'
```

## 第 3 步：打开第一个组件

```ts
openModal({
  title: 'Delete Item',
  content: '<p>Are you sure?</p>',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
})

openOffcanvas({
  title: 'Filter',
  placement: 'end',
  content: '<p>Filter panel content.</p>',
})

toast({
  title: 'Saved',
  content: 'Configuration updated',
  variant: 'success',
})
```

## 第 3.5 步：30 秒实时演示

<DemoPreview src="/components/modal-basic.html" title="Quick Start: Modal Live Demo" :height="420" />

如果你想看队列策略，可直接打开 Toast 进阶演示：

- [Toast 队列策略示例](/components/toast)

### CDN 说明（源码复制友好）

文档中的组件示例通过 `/components/sodialog-loader.js` 统一解析 CDN 版本，避免每个 HTML 示例重复硬编码版本号。

- 默认版本集中维护在 loader 中。
- 示例 URL 支持临时覆盖版本：`?sodialogVersion=latest`、`?sodialogVersion=0.3.9`。
- 生产页面仍建议固定 patch 版本，不建议长期依赖 `@latest`。

需要复制固定版本 CDN 地址时，请查看 [CDN 使用](/cdn)，该页面会读取当前文档对应的 npm 版本。

## 第 4 步：切换到 Adapter First 用法

通过 adapter defaults 统一默认行为，避免在业务代码里重复传参。

```ts
import { configureAdapter, openDialog, pushMessage } from 'sodialog'

configureAdapter({
  modalDefaults: { closeOnEsc: true, footerAlign: 'center' },
  toastDefaults: { placement: 'top-end', maxVisible: 4 },
  diagnosticsEnabled: true,
})

openDialog({
  title: 'Delete Record',
  content: '<p>Do you want to continue?</p>',
  traceId: 'trace-order-001',
})

pushMessage('success', 'Operation completed', { traceId: 'trace-order-001' })
```

## 第 5 步：继续阅读文档

1. [Modal 指南](/components/modal)
2. [Offcanvas 指南](/components/offcanvas)
3. [Toast 指南](/components/toast)
4. [Context Menu 指南](/components/context-menu)
5. [API 总览](/api/)
