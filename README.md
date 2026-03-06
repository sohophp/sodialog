# SoDialog

基于 HTML5 `dialog` 的可复用弹窗库，支持 **Modal** 与 **Offcanvas**，并通过 JavaScript 动态创建 HTML 元素。

## 安装

```bash
npm install sodialog
```

## 使用

```ts
import { openModal, openOffcanvas } from 'sodialog'
import 'sodialog/style.css'

openModal({
  title: '提示',
  content: '<p>这是 Modal</p>',
  confirmText: '确定',
  cancelText: '取消',
})

openOffcanvas({
  title: '侧边栏',
  placement: 'end',
  content: '<p>这是 Offcanvas</p>',
})
```

## API

### `openModal(options)`

- `title: string`
- `content: string | Node`
- `confirmText?: string`
- `cancelText?: string`
- `closeOnBackdrop?: boolean` (默认 `true`)
- `closeOnEsc?: boolean` (默认 `true`)
- `onConfirm?: () => void`
- `onCancel?: () => void`

### `openOffcanvas(options)`

在 `openModal` 参数基础上新增：

- `placement?: 'start' | 'end' | 'top' | 'bottom'` (默认 `end`)

### `SoDialog.open(options)`

通用入口，`options.kind` 可为 `modal` 或 `offcanvas`。

## 开发

```bash
npm run dev
npm run lint
npm run build
```

## 发布到 NPM

1. 登录：`npm login`
2. 检查包名可用性
3. 发布：`npm publish --access public`

> 当前样式均使用 `sod-` 前缀命名，避免污染全局 `body/:root/*`。
