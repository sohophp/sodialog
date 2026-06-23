---
description: SoDialog 安裝與匯入方式，涵蓋 npm、pnpm、yarn、bun 與 ESM 樣式入口。
---

# 安裝

<VersionBadge />

SoDialog 核心包沒有執行時必需依賴。安裝後，請明確匯入 ESM API 與樣式。

```bash
npm install sodialog
pnpm add sodialog
yarn add sodialog
bun add sodialog
```

## ESM

```ts
import { openModal, pushMessage } from 'sodialog'
import 'sodialog/style.css'

openModal({
  title: 'Hello',
  content: '<p>Your dialog is ready.</p>',
})

pushMessage('success', '已儲存')
```
