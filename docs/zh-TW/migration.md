---
description: SoDialog 遷移說明：從舊 demo、Bootstrap Modal 或自訂浮層遷移。
---

# Migration

目前文件維護最新穩定版。舊 demo 仍保留在 `/legacy-demo/`。

## 從舊 demo 遷移

- 使用 `import { openModal } from 'sodialog'`。
- 樣式改為 `import 'sodialog/style.css'`。
- Offcanvas 使用 `openOffcanvas({ placement })`。

## 從 Bootstrap Modal 遷移

保留原本觸發按鈕與內容，將 Bootstrap JavaScript 初始化改為 SoDialog API。
