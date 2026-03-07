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
  id: 'order-delete',
  title: '提示',
  position: 'center',
  animation: 'fade',
  useModal: true,
  draggable: true,
  dragHandle: 'header',
  autoFitSize: true,
  content: '<p>这是 Modal</p>',
  confirmText: '确定',
  cancelText: '取消',
})

openOffcanvas({
  title: '侧边栏',
  placement: 'end',
  animation: 'slide',
  content: '<p>这是 Offcanvas</p>',
})
```

## API

### `openModal(options)`

- `title: string`
- `content: string | Node`
- `id?: string`（默认自动生成。传入后同 ID Modal 不重复创建，再次调用会唤起已有实例）
- `onCreated?: (handle) => void`（仅新建时触发，可读取自动生成的 `handle.id`）
- `onReused?: (handle) => void`（仅复用已有同 ID 实例时触发）
- `handle.refit(): void`（手动触发一次尺寸重算）
- `position?: 'center' | 'top' | 'bottom'` (默认 `center`)
- `animation?: 'slide' | 'fade' | 'zoom'` (默认 `fade`)
- `useModal?: boolean` (默认 `true`，`true` 使用 `showModal()`，`false` 使用 `show()`)
- `draggable?: boolean` (默认 `false`)
- `dragHandle?: 'header' | 'title' | 'body' | 'panel' | string` (默认 `header`，也可传 CSS 选择器)
- `autoFitSize?: boolean` (默认 `true`，会根据 body 内容变化自动扩/缩尺寸，例如图片加载完成后)
- `scrollMode?: 'body' | 'hybrid' | 'viewport' | 'none'` (默认 `body`)
- `hybridSwitchRatio?: number` (默认 `1.35`，仅 `scrollMode: 'hybrid'` 时生效，最小值 `1`)
- `autoFitUseScrollbar?: boolean` (兼容旧参数。`false` 等价于 `scrollMode: 'viewport'`)
- `refitOnContentChange?: boolean` (默认 `true`，内容变化/图片加载后自动触发尺寸重算)
- `autoFitMinWidth?: number` (默认 `280`)
- `autoFitMinHeight?: number` (默认 `160`)
- `confirmText?: string`
- `cancelText?: string`
- `confirmAction?: 'hide' | 'destroy'`（默认 `hide`；显式传入 `id` 时默认 `destroy`）
- `closeOnBackdrop?: boolean` (默认 `true`)
- `closeOnEsc?: boolean` (默认 `true`)
- `onConfirm?: () => void`
- `onCancel?: () => void`

说明：

- `hybrid` 表示先使用 body 内滚动；当内容高度远超可视区阈值时自动切到外层 viewport 滚动
- `取消/关闭` 语义是 `dialog.close()`（隐藏）
- `confirmAction: 'destroy'` 语义是 `dialog.remove()`（销毁）

### `openOffcanvas(options)`

在 `openModal` 参数基础上新增：

- `placement?: 'start' | 'end' | 'top' | 'bottom'` (默认 `end`)
- `animation?: 'slide' | 'fade' | 'zoom'` (默认 `slide`)

示例（类似 Bootstrap Offcanvas 多位置）：

```ts
openOffcanvas({ title: 'Left', placement: 'start', animation: 'slide', content: '<p>Left</p>' })
openOffcanvas({ title: 'Right', placement: 'end', animation: 'slide', content: '<p>Right</p>' })
openOffcanvas({ title: 'Top', placement: 'top', animation: 'fade', content: '<p>Top</p>' })
openOffcanvas({ title: 'Bottom', placement: 'bottom', animation: 'zoom', content: '<p>Bottom</p>' })
```

### `SoDialog.open(options)`

通用入口，`options.kind` 可为 `modal` 或 `offcanvas`。

## 开发

```bash
npm run dev
npm run lint
npm run build
```

Demo 中已包含：

- 预设默认值：`center`、`zoom`、`medium`、`showModal`、不可拖动、自动适配
- `Modal ID` 留空自动生成，输入后可复用唤醒同 ID
- Modal 内切换不同尺寸图片，验证 `autoFitSize` 自动扩缩
- 包含超大图（`xlarge`）、超长单词、超宽表格的溢出测试
- Modal 内容按钮打开子窗口（支持 ID 复用唤起）
- 子窗口包含多种表单元素（input/select/checkbox/textarea）演示
- 新增 Markdown 编辑器子窗口（工具栏插入、实时预览）
- 编辑器支持“仅编辑 / 编辑 + 预览”模式切换

## 发布到 NPM

1. 登录：`npm login`
2. 检查包名可用性
3. 发布：`npm publish --access public`

### Git Tag 自动发布（GitHub Actions）

仓库已内置工作流 `.github/workflows/npm-publish.yml`，当推送版本标签（如 `v0.1.4`）时会自动：

1. 校验 tag 版本与 `package.json` 版本一致
2. 执行 `npm ci`、`npm run lint`、`npm run build`
3. 发布到 npm（若该版本已存在则自动跳过）

发布前准备：

1. 在 npm 包页面启用 Trusted Publishing，并绑定 GitHub 仓库与该工作流
2. 确保工作流权限包含 `id-token: write`（本仓库已配置）

说明：当前工作流优先使用 `NPM_AUTOMATION_TOKEN` 发布；未配置时回退到 Trusted Publishing（OIDC）。

- 若使用 token 路径，`NPM_AUTOMATION_TOKEN` 请使用 npm Granular access token（Write 权限），并启用 `Bypass 2FA`，否则 CI 发布会报 `EOTP`。
- 若使用 Trusted Publishing 路径，需先在 npm 包设置里完成仓库和 workflow 绑定，否则发布阶段可能出现 `E404`。

推荐发布命令：

```bash
npm version patch --no-git-tag-version
git add -A
git commit -m "release: vX.Y.Z"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push --follow-tags
```

> 当前样式均使用 `sod-` 前缀命名，避免污染全局 `body/:root/*`。
