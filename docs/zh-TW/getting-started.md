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

- [Toast 队列策略示例](/zh-TW/components/toast)

### CDN 說明（方便複製原始碼）

文件中的元件範例透過 `/components/sodialog-loader.js` 統一解析 CDN 版本，避免每個 HTML 範例重複硬編碼版本號。

- 預設版本集中維護在 loader 中。
- 範例 URL 支援暫時覆蓋版本：`?sodialogVersion=latest`、`?sodialogVersion=0.3.7`。
- 生產頁面仍建議固定 patch 版本，不建議長期依賴 `@latest`。

需要複製固定版本 CDN 位址時，請查看 [CDN 使用](/zh-TW/cdn)，該頁會讀取目前文件對應的 npm 版本。

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

1. [Modal 指南](/zh-TW/components/modal)
2. [Offcanvas 指南](/zh-TW/components/offcanvas)
3. [Toast 指南](/zh-TW/components/toast)
4. [Context Menu 指南](/zh-TW/components/context-menu)
5. [API 总览](/zh-TW/api/)
