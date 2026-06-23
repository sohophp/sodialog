---
description: SoDialog 安装与导入方式，覆盖 npm、pnpm、yarn、bun 和 ESM 样式入口。
---

# 安装

<VersionBadge />

SoDialog 核心包没有运行时必需依赖。安装库后，业务代码显式导入 ESM API 与样式子路径。

```bash
npm install sodialog
pnpm add sodialog
yarn add sodialog
bun add sodialog
```

## ESM 导入

```ts
import { openModal, pushMessage } from 'sodialog'
import 'sodialog/style.css'

openModal({
  title: 'Hello',
  content: '<p>Your dialog is ready.</p>',
})

pushMessage('success', '保存成功')
```

## TypeScript

类型入口由 npm 包的 `types` 字段提供：`dist/types/lib.d.ts`。常用类型可以直接按需导入：

```ts
import type { SoDialogModalOptions, SoToastOptions } from 'sodialog'
```

## 下一步

<div class="sod-inline-actions">
  <a href="/cdn">CDN 使用</a>
  <a href="/components/modal">Modal</a>
  <a href="/api/">API Reference</a>
</div>
