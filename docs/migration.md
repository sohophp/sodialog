---
description: SoDialog 迁移说明：从早期演示页、Bootstrap 弹窗或自定义浮层迁移到当前 API。
---

# Migration

当前文档维护最新稳定版。历史演示仍保留在 `/legacy-demo/`，公共 URL 不会因为文档信息架构调整而删除。

## 从旧 demo 迁移

- 使用 `import { openModal } from 'sodialog'` 替代页面内脚本拼接。
- 样式统一改为 `import 'sodialog/style.css'` 或 CDN 的 `dist/sodialog.css`。
- Offcanvas 使用 `openOffcanvas({ placement })`。

## 从 Bootstrap Modal 迁移

保留原按钮和业务内容，把弹窗初始化改为 SoDialog API。不要安装 Bootstrap JavaScript 作为 SoDialog 前置条件。
