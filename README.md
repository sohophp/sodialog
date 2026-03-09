# SoDialog

基于 HTML5 `dialog` 的可复用弹窗库，支持 **Modal** 与 **Offcanvas**，并通过 JavaScript 动态创建 HTML 元素。

## 目录

- [安装](#安装)
- [使用](#使用)
- [右键菜单图标（Bootstrap Icons）](#右键菜单图标bootstrap-icons)
- [Adapter First](#adapter-first)
- [CSS Tokens](#css-tokens)
- [API](#api)
- [API 独立页](#api-独立页)
- [Promise API](#promise-api)
- [Toast 常见示例](#toast-常见示例)
- [开发](#开发)
- [GitHub Pages 首页](#github-pages-首页)
- [文档体系](#文档体系)
- [发布到 NPM](#发布到-npm)

## 安装

```bash
npm install sodialog
```

## 使用

```ts
import { openModal, openOffcanvas, confirmModal, promptModal, formModal, toast, bindContextMenu } from 'sodialog'
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

toast({
  title: '保存成功',
  content: '配置已更新',
  placement: 'top-end',
  variant: 'success',
  duration: 2500,
  maxVisible: 3,
})

bindContextMenu({
  target: '.file-row',
  items: [
    {
      id: 'rename',
      label: '重命名',
      onClick: ({ triggerElement }) => {
        console.log('rename target:', triggerElement)
      },
    },
    {
      id: 'delete',
      label: '删除',
      onClick: ({ triggerElement }) => {
        console.log('delete target:', triggerElement)
      },
    },
  ],
})

const ok = await confirmModal({
  title: '删除确认',
  content: '<p>确定删除当前记录吗？</p>',
})

if (ok) {
  const name = await promptModal({
    title: '请输入备注',
    placeholder: '操作备注',
    validate: (value) => (value.length < 2 ? '至少输入 2 个字符' : true),
  })
  console.log('prompt result:', name)
}

const formValues = await formModal({
  title: '创建发布计划',
  submitText: '提交',
  fields: [
    { name: 'title', label: '标题', required: true },
    {
      name: 'priority',
      label: '优先级',
      type: 'select',
      options: [
        { label: 'P0', value: 'p0' },
        { label: 'P1', value: 'p1' },
      ],
    },
    { name: 'notify', label: '通知团队', type: 'checkbox', defaultValue: true },
  ],
})

console.log('form result:', formValues)
```

## Adapter First

推荐业务层优先使用 adapter API，统一默认行为并降低迁移成本。

```ts
import {
  configureContextMenu,
  configureDialog,
  configureAdapter,
  openDialog,
  openDialogFromContextMenu,
  bindDialogContextMenu,
  pushMessage,
} from 'sodialog'

configureAdapter({
  modalDefaults: {
    closeOnEsc: true,
    closeOnBackdrop: true,
    footerAlign: 'center',
  },
  toastDefaults: {
    placement: 'top-end',
    maxVisible: 4,
    newestOnTop: true,
    duplicateStrategy: 'stack',
    duration: 3800,
  },
  diagnosticsEnabled: true,
  logger: (event) => {
    // action / phase / reason / id / traceId
    console.log('[adapter-log]', event)
  },
})

openDialog({
  title: 'Delete Item',
  content: 'Confirm delete?',
  traceId: 'trace-order-001',
  onLayoutStable: ({ traceId }) => {
    console.log('layout stable', traceId)
  },
})

bindDialogContextMenu({
  target: '.file-row',
  traceId: 'trace-order-001',
  items: [
    {
      id: 'remove',
      label: 'Remove',
      onClick: ({ handle }) => {
        openDialogFromContextMenu(handle, {
          title: 'Delete Confirm',
          content: 'Delete this row?',
          traceId: 'trace-order-001',
        })
      },
    },
  ],
})

pushMessage('success', 'Saved', { traceId: 'trace-order-001' })
```

`openDialogFromContextMenu` 会先关闭菜单，再打开 Dialog，可避免层级和焦点冲突。

`diagnosticsEnabled + logger` 用于统一诊断链路，推荐记录字段：`action`、`phase`、`reason`、`id`、`traceId`。

## 全局 configure（非 adapter 场景）

如果项目不使用 adapter，也可以直接设置全局默认值：

```ts
import { configureDialog, configureContextMenu, openModal, bindContextMenu } from 'sodialog'

configureDialog({
  modalDefaults: {
    footerAlign: 'center',
    closeOnEsc: false,
  },
  offcanvasDefaults: {
    placement: 'start',
  },
})

configureContextMenu({
  closeOnEsc: false,
  minWidth: 220,
  attrs: { 'data-menu-scope': 'global' },
})

openModal({ title: '默认配置生效', content: '<p>无需重复传默认参数</p>' })
bindContextMenu({ target: '#row', items: [{ label: '删除' }] })
```

## CSS Tokens

SoDialog 现在提供一组公开 CSS 变量，可在业务层直接覆盖，避免改源码：

```css
:root {
  --sod-color-surface: #ffffff;
  --sod-color-text: #111827;
  --sod-focus-ring: #22c55e;
  --sod-btn-primary-bg: #2563eb;
  --sod-toast-success-accent: #16a34a;
  --sod-menu-bg: #f8fafc;
}
```

常用 token 分类：

- Dialog: `--sod-backdrop-bg`、`--sod-panel-radius`、`--sod-panel-shadow`、`--sod-panel-width`
- Button: `--sod-btn-primary-bg`、`--sod-btn-outline-color`、`--sod-btn-danger-bg`、`--sod-btn-success-bg`
- Toast: `--sod-toast-border`、`--sod-toast-shadow`、`--sod-toast-*-accent`
- ContextMenu: `--sod-menu-bg`、`--sod-menu-border`、`--sod-menu-shadow`、`--sod-menu-item-hover-bg`

建议将 token 覆盖放在应用全局样式入口，结合 `.legacy-skin` 可同时满足新旧界面兼容。

## 右键菜单图标（Bootstrap Icons）

`bindContextMenu` 支持菜单项图标，`icon` 可传字符串 class（适合 Bootstrap Icons）或自定义 Node。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
```

```ts
bindContextMenu({
  target: '.file-row',
  items: [
    {
      id: 'copy',
      label: '复制',
      icon: 'bi bi-copy',
      onClick: ({ triggerElement }) => {
        console.log('copy:', triggerElement)
      },
    },
    {
      id: 'rename',
      label: '重命名',
      icon: 'bi bi-pencil-square',
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'bi bi-trash',
      iconAriaLabel: 'Delete',
      className: 'danger-item',
    },
  ],
})
```

菜单项图标相关字段：

- `icon?: string | Node`：字符串时会渲染为 `<i class="..."></i>`，可直接使用 Bootstrap Icons 类名。
- `iconPosition?: 'start' | 'end'`：图标在文本前或后，默认 `start`。
- `iconAriaLabel?: string`：用于无文字图标的可访问性说明；未传时自动 `aria-hidden`。

关闭机制相关字段：

- `closeOnEsc?: boolean`：按 `Esc` 关闭，默认 `true`。
- `closeOnOutsideClick?: boolean`：点击菜单外关闭，默认 `true`。
- `closeOnWindowBlur?: boolean`：窗口失焦关闭，默认 `true`。
- `closeOnScroll?: boolean`：窗口或容器滚动时关闭，默认 `true`。
- `closeOnResize?: boolean`：窗口尺寸变化时关闭，默认 `true`。
- `destroy()`：销毁实例并移除全部事件监听。

键盘交互补充：

- 支持 `ArrowUp/ArrowDown/Home/End/Tab` 在菜单项之间导航，`Enter/Space` 激活当前项。
- 支持首字母快速定位（typeahead）。
- 混合标签（如 `删除 Delete`）会按词匹配，连续按同一字母会在命中项间轮转。
- 可通过 `onFocusItem(context)` 获取当前键盘定位的菜单项信息（`itemId/itemElement/...`）。
- 可在 `onClose(reason)` 里记录关闭原因（如 `esc`、`outside`、`item`、`blur`、`scroll`、`resize`），便于排查交互路径。

层级说明：

- 当右键触发元素位于打开的 `dialog`（如 `openModal`）内时，菜单会自动挂载到该 `dialog`，避免 top-layer 下被遮挡。
- 非 `dialog` 场景下，菜单默认挂载到 `document.body`。

## Modal 全功能示例（与 `examples.html` 一致）

以下代码与 `src/examples-main.ts` 中 Modal 示例保持一致，覆盖：

- 基础弹窗 `openModal`
- 确认弹窗 `confirmModal`
- 输入弹窗 `promptModal`
- 表单弹窗 `formModal`

### 1) 基础打开：`openModal`

```ts
openModal({
  title: '订单确认',
  content: '<p>这是一个基础 Modal 示例，支持自定义内容和按钮。</p>',
  animation: 'zoom',
  confirmText: '确认',
  cancelText: '取消',
})
```

### 2) Promise 调用：`confirmModal`

```ts
const ok = await confirmModal({
  title: '删除确认',
  content: '<p>确定删除这条记录吗？该操作不可恢复。</p>',
  confirmText: '删除',
  cancelText: '返回',
})

toast({
  title: ok ? '已确认' : '已取消',
  content: ok ? '用户确认执行删除。' : '用户取消了删除。',
  variant: ok ? 'danger' : 'info',
  duration: 1800,
})
```

### 3) Promise 调用：`promptModal`

```ts
const result = await promptModal({
  title: '请输入标签名',
  placeholder: '例如 release-note',
  validate: (value) => (value.length < 2 ? '至少输入 2 个字符' : true),
})

if (result === null) {
  toast({ title: '已取消', content: '你取消了输入。', variant: 'info', duration: 1700 })
} else {
  toast({
    title: '输入完成',
    content: `你输入的是: ${result}`,
    variant: 'success',
    duration: 2200,
  })
}
```

### 4) 表单调用：`formModal`

```ts
const values = await formModal({
  title: '创建发布计划',
  content: '<p>请填写发布信息，用于生成计划卡片。</p>',
  submitText: '创建',
  fields: [
    {
      name: 'title',
      label: '计划标题',
      placeholder: '例如 v0.1.18 发布',
      required: true,
      validate: (value) => (String(value ?? '').length < 4 ? '标题至少 4 个字符' : true),
    },
    {
      name: 'owner',
      label: '负责人',
      placeholder: '例如 Alice',
      required: true,
    },
    {
      name: 'priority',
      label: '优先级',
      type: 'select',
      options: [
        { label: 'P0 - 紧急', value: 'p0' },
        { label: 'P1 - 高', value: 'p1' },
        { label: 'P2 - 常规', value: 'p2' },
      ],
      defaultValue: 'p1',
    },
    {
      name: 'estimate',
      label: '预估工时(小时)',
      type: 'number',
      defaultValue: 6,
      required: true,
    },
    {
      name: 'notes',
      label: '备注',
      type: 'textarea',
      placeholder: '写下本次发布重点...',
      rows: 3,
    },
    {
      name: 'notify',
      label: '发布后通知团队',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  validate: (formValues) => {
    const estimate = formValues.estimate
    if (typeof estimate === 'number' && estimate > 24) {
      return { estimate: '单次计划建议不超过 24 小时' }
    }
    return true
  },
})

if (values === null) {
  toast({ title: '已取消', content: '你取消了表单提交。', variant: 'info', duration: 1600 })
} else {
  toast({
    title: '表单已提交',
    content: `标题: ${String(values.title ?? '')}`,
    variant: 'success',
    duration: 2200,
  })
}
```

### 示例页面中的完整绑定代码

```ts
const modalBtn = document.querySelector<HTMLButtonElement>('#open-modal-basic')
const confirmBtn = document.querySelector<HTMLButtonElement>('#open-confirm')
const promptBtn = document.querySelector<HTMLButtonElement>('#open-prompt')
const formBtn = document.querySelector<HTMLButtonElement>('#open-form')
const modalResult = document.querySelector<HTMLDivElement>('#modal-result')
const formResult = document.querySelector<HTMLDivElement>('#form-result')

modalBtn?.addEventListener('click', () => {
  openModal({
    title: '订单确认',
    content: '<p>这是一个基础 Modal 示例，支持自定义内容和按钮。</p>',
    animation: 'zoom',
    confirmText: '确认',
    cancelText: '取消',
  })
})

confirmBtn?.addEventListener('click', async () => {
  const ok = await confirmModal({
    title: '删除确认',
    content: '<p>确定删除这条记录吗？该操作不可恢复。</p>',
    confirmText: '删除',
    cancelText: '返回',
  })

  toast({
    title: ok ? '已确认' : '已取消',
    content: ok ? '用户确认执行删除。' : '用户取消了删除。',
    variant: ok ? 'danger' : 'info',
    duration: 1800,
  })

  if (modalResult) {
    modalResult.textContent = `结果输出：confirmModal => ${ok ? 'true' : 'false'}`
  }
})

promptBtn?.addEventListener('click', async () => {
  const result = await promptModal({
    title: '请输入标签名',
    placeholder: '例如 release-note',
    validate: (value) => (value.length < 2 ? '至少输入 2 个字符' : true),
  })

  if (result === null) {
    toast({ title: '已取消', content: '你取消了输入。', variant: 'info', duration: 1700 })
    if (modalResult) {
      modalResult.textContent = '结果输出：promptModal => null'
    }
    return
  }

  toast({
    title: '输入完成',
    content: `你输入的是: ${result}`,
    variant: 'success',
    duration: 2200,
  })

  if (modalResult) {
    modalResult.textContent = `结果输出：promptModal => "${result}"`
  }
})

formBtn?.addEventListener('click', async () => {
  const values = await formModal({
    title: '创建发布计划',
    content: '<p>请填写发布信息，用于生成计划卡片。</p>',
    submitText: '创建',
    fields: [
      {
        name: 'title',
        label: '计划标题',
        placeholder: '例如 v0.1.18 发布',
        required: true,
        validate: (value) => (String(value ?? '').length < 4 ? '标题至少 4 个字符' : true),
      },
      {
        name: 'owner',
        label: '负责人',
        placeholder: '例如 Alice',
        required: true,
      },
      {
        name: 'priority',
        label: '优先级',
        type: 'select',
        options: [
          { label: 'P0 - 紧急', value: 'p0' },
          { label: 'P1 - 高', value: 'p1' },
          { label: 'P2 - 常规', value: 'p2' },
        ],
        defaultValue: 'p1',
      },
      {
        name: 'estimate',
        label: '预估工时(小时)',
        type: 'number',
        defaultValue: 6,
        required: true,
      },
      {
        name: 'notes',
        label: '备注',
        type: 'textarea',
        placeholder: '写下本次发布重点...',
        rows: 3,
      },
      {
        name: 'notify',
        label: '发布后通知团队',
        type: 'checkbox',
        defaultValue: true,
      },
    ],
    validate: (formValues) => {
      const estimate = formValues.estimate
      if (typeof estimate === 'number' && estimate > 24) {
        return { estimate: '单次计划建议不超过 24 小时' }
      }
      return true
    },
  })

  if (values === null) {
    toast({ title: '已取消', content: '你取消了表单提交。', variant: 'info', duration: 1600 })
    if (formResult) {
      formResult.textContent = '结果输出：formModal => null'
    }
    return
  }

  toast({
    title: '表单已提交',
    content: `标题: ${String(values.title ?? '')}`,
    variant: 'success',
    duration: 2200,
  })
  if (formResult) {
    formResult.textContent = `结果输出：formModal => ${JSON.stringify(values)}`
  }
})
```

## API

### API 独立页

- 本地开发访问：`/api.html`
- Pages 构建后访问：`https://sohophp.github.io/sodialog/api.html`

该页面包含全部公开方法、参数、返回值和类型说明，可作为查询手册使用。
并新增“快速代码片段”折叠区（默认收起、支持一键复制），覆盖 Adapter、Promise 串行流程、Toast 队列策略。

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
- `dragHandle?: ('header' | 'title' | 'body' | 'panel' | string) | Array<'header' | 'title' | 'body' | 'panel' | string>` (默认 `header`，支持传数组开启多拖动区域，也可传 CSS 选择器)
- `autoFitSize?: boolean` (默认 `true`，会根据 body 内容变化自动扩/缩尺寸，例如图片加载完成后)
- `scrollMode?: 'body' | 'hybrid' | 'viewport' | 'none'` (默认 `body`)
- `hybridSwitchRatio?: number` (默认 `1.35`，仅 `scrollMode: 'hybrid'` 时生效，最小值 `1`)
- `autoFitUseScrollbar?: boolean` (兼容旧参数。`false` 等价于 `scrollMode: 'viewport'`)
- `refitOnContentChange?: boolean` (默认 `true`，内容变化/图片加载后自动触发尺寸重算)
- `autoFitMinWidth?: number` (默认 `280`)
- `autoFitMinHeight?: number` (默认 `160`)
- `confirmText?: string`
- `cancelText?: string`
- `footerButtons?: SoDialogFooterButton[]`（自定义底部按钮。未传时默认“取消 + 确认”）
- `hideFooter?: boolean`（默认 `false`，可隐藏底部按钮区）
- `footerAlign?: 'start' | 'center' | 'end' | 'between'`（默认 `end`）
- `confirmAction?: 'hide' | 'destroy'`（默认 `hide`；显式传入 `id` 时默认 `destroy`）
- `closeOnBackdrop?: boolean` (默认 `true`)
- `closeOnEsc?: boolean` (默认 `true`)
- `onConfirm?: () => void`
- `onCancel?: () => void`
- `onAction?: (context) => void`（监听所有 footer 按钮动作）
- `onBeforeOpen?: (context) => void`
- `onAfterOpen?: (context) => void`
- `onBeforeClose?: (context) => void`
- `onAfterClose?: (context) => void`
- `onLifecycle?: (context) => void`（统一监听所有生命周期阶段）
- `handle.setFooterButtons(buttons): void`（运行时整体替换 footer 按钮）
- `handle.updateFooterButton(id, updates): boolean`（按 id 更新某个 footer 按钮）
- `handle.onAction(listener): () => void`（追加动作监听，返回取消监听函数）

`SoDialogFooterButton` 字段：

- `id?: string`（动作标识，推荐传）
- `label: string | Node`
- `role?: 'confirm' | 'cancel' | 'custom'`
- `variant?: 'primary' | 'outline' | 'danger' | 'success' | 'ghost' | 'link'`
- `action?: 'none' | 'hide' | 'destroy'`
- `className?: string`
- `disabled?: boolean`
- `attrs?: Record<string, string>`
- `onClick?: (context) => void | boolean | Promise<void | boolean>`（返回 `false` 可阻止后续默认动作）

说明：

- `hybrid` 表示先使用 body 内滚动；当内容高度远超可视区阈值时自动切到外层 viewport 滚动
- `取消/关闭` 语义是 `dialog.close()`（隐藏）
- `confirmAction: 'destroy'` 语义是 `dialog.remove()`（销毁）

示例（自定义 footer 按钮、动作监听、运行时更新）：

```ts
const handle = openModal({
  title: '订单操作',
  content: '<p>请选择一个动作</p>',
  footerAlign: 'between',
  footerButtons: [
    { id: 'help', label: '帮助', variant: 'link', action: 'none' },
    { id: 'cancel', label: '取消', role: 'cancel', variant: 'outline' },
    { id: 'delete', label: '删除', variant: 'danger', action: 'destroy' },
  ],
  onAction: ({ action }) => {
    console.log('global action:', action)
  },
})

const off = handle.onAction(({ action, dialog }) => {
  if (action === 'help') {
    dialog.querySelector('.sod-body')?.insertAdjacentHTML('beforeend', '<p>帮助信息已展开</p>')
  }
})

handle.updateFooterButton('delete', { label: '确认删除', disabled: false })
handle.setFooterButtons([
  { id: 'close', label: '关闭', role: 'cancel', variant: 'ghost' },
  { id: 'confirm', label: '提交', role: 'confirm', variant: 'primary' },
])

off()
```

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

## Promise API

### `SoDialog.confirm(options)` / `confirmModal(options)`

- 返回 `Promise<boolean>`
- 确认按钮 resolve `true`
- 取消、Esc、点击遮罩、关闭按钮 resolve `false`

### `SoDialog.prompt(options)` / `promptModal(options)`

- 返回 `Promise<string | null>`
- 确认返回输入值，取消返回 `null`
- 支持 `defaultValue`、`placeholder`、`inputType`
- 支持 `trimResult`（默认 `true`）
- 支持 `validate(value)`，返回 `string`/`false` 可阻止关闭并显示错误

### `SoDialog.form(options)` / `formModal(options)`

- 返回 `Promise<Record<string, SoDialogFormValue> | null>`
- 确认返回结构化表单对象，取消返回 `null`
- 支持字段类型：`text/password/email/search/url/tel/number/textarea/select/checkbox`
- 每个字段支持 `required`、`defaultValue`、`helpText`、`attrs`、`validate`
- 支持表单级 `validate(values)`，可返回：
  - `true/void`：通过
  - `false|string`：阻止提交（显示通用错误）
  - `Record<string, string>`：按字段显示错误

示例：

```ts
const values = await formModal({
  title: '创建任务单',
  fields: [
    {
      name: 'title',
      label: '任务标题',
      required: true,
      validate: (value) => (String(value ?? '').length < 4 ? '至少 4 个字符' : true),
    },
    {
      name: 'level',
      label: '优先级',
      type: 'select',
      options: [
        { label: 'P0', value: 'p0' },
        { label: 'P1', value: 'p1' },
      ],
      defaultValue: 'p1',
    },
    { name: 'needReview', label: '需要 Review', type: 'checkbox', defaultValue: true },
  ],
  validate: (formValues) => {
    if (formValues.level === 'p0' && !formValues.needReview) {
      return { needReview: 'P0 任务必须开启 Review' }
    }
    return true
  },
})
```

### `toast(options)` / `SoToast.show(options)`

- `content: string | Node`
- `title?: string`
- `placement?: 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'`（默认 `top-end`）
- `variant?: 'default' | 'info' | 'success' | 'warning' | 'danger'`（默认 `default`）
- `duration?: number | false`（默认 `3000`，`false` 表示不自动消失）
- `showProgress?: boolean`（默认 `true`，显示自动消失倒计时进度条）
- `maxVisible?: number`（默认 `3`，按同位置队列生效）
- `closable?: boolean`（默认 `true`）
- `pauseOnHover?: boolean`（默认 `true`）
- `pauseOnWindowBlur?: boolean`（默认 `false`，切换窗口时暂停倒计时）
- `duplicateStrategy?: 'update' | 'ignore' | 'restart-timer' | 'stack'`（默认 `update`）
- `onBeforeOpen?: (context) => void`
- `onAfterOpen?: (context) => void`
- `onBeforeClose?: (context) => void`
- `onAfterClose?: (context) => void`
- `onLifecycle?: (context) => void`（统一监听所有生命周期阶段）
- `onShown?: (handle) => void`
- `onClose?: (reason, handle) => void`

队列与控制：

- 超过 `maxVisible` 的消息会进入队列，前面的 toast 关闭后自动补位
- 相同 `id` 再次调用会按 `duplicateStrategy` 处理
- `update`: 更新内容与配置；若 `placement` 改变会迁移到新位置
- `ignore`: 保留已有 toast，忽略本次重复调用
- `restart-timer`: 更新并强制重启倒计时
- `stack`: 自动生成新 id，保留已有 toast 并叠加新 toast
- 返回 `handle`，支持 `close / update / pause / resume`
- 可用 `SoToast.clear(placement?)` 清空指定位置或全部 toast
- 可用 `SoToast.closeAll()` 清空全部 toast
- 便捷方法：`SoToast.success/error/info/warning`

### 统一生命周期 context

生命周期回调会收到统一结构：

- `component: 'modal' | 'offcanvas' | 'toast'`
- `phase: 'before-open' | 'after-open' | 'before-close' | 'after-close'`
- `id?: string`
- `reason?: string`
- `element: HTMLElement`

### `duplicateStrategy` 行为说明

- `update`：更新已有同 ID toast，保留单实例
- `ignore`：同 ID 已存在时直接忽略
- `restart-timer`：更新内容并重新开始倒计时
- `stack`：自动生成新 ID，允许同来源消息堆叠

## Toast 常见示例

### 1) 成功提示（默认 3 秒自动消失）

```ts
toast({
  title: '保存成功',
  content: '配置已同步到服务器',
  variant: 'success',
})
```

### 2) 错误提示（常驻 + 手动关闭）

```ts
toast({
  title: '提交失败',
  content: '网络连接异常，请稍后重试',
  variant: 'danger',
  duration: false,
  placement: 'bottom-end',
})
```

### 3) 固定 ID 去重（重复触发时重置计时）

```ts
toast({
  id: 'sync-job',
  title: '同步任务',
  content: '正在更新数据...',
  duplicateStrategy: 'restart-timer',
  duration: 2200,
})
```

### 4) 全局默认配置

```ts
import { SoToast } from 'sodialog'

SoToast.configure({
  placement: 'top-end',
  maxVisible: 4,
  pauseOnWindowBlur: true,
  showProgress: true,
})
```

## 开发

```bash
npm run hooks:enable
npm run dev
npm run test:run
npm run lint
npm run build
npm run build:demo
npm run docs:changelog
```

说明：

- 先执行 `npm run hooks:enable`，启用仓库级 git hooks。
- 启用后，每次 `git commit` 会自动执行 `npm run build:demo`，用于同步 API/演示页面产物。

## GitHub Pages 首页

本仓库已将文档主页入口放在 `index.html + src/main.ts`，用于展示开发文档与使用说明。

- 本地构建主页：`npm run build:demo`
- 产物目录：`dist-pages/`
- 线上部署：`.github/workflows/pages.yml`（推送到 `master` 自动部署）
- 仓库设置：`Settings -> Pages -> Source` 选择 `GitHub Actions`

默认线上地址：`https://sohophp.github.io/sodialog/`

独立示例导航页：`https://sohophp.github.io/sodialog/examples.html`

每个工具独立一页（并在页面内细分示例）：

- `https://sohophp.github.io/sodialog/modal.html`
- `https://sohophp.github.io/sodialog/offcanvas.html`
- `https://sohophp.github.io/sodialog/toast.html`

开发/发布流程统一详情页：

- `https://sohophp.github.io/sodialog/workflow.html`

## 文档体系

- `README.md`：使用方式、API、发布流程总览
- `CHANGELOG.md`：版本变更记录（按 git tag 自动生成）
- `RELEASE_CHECKLIST.md`：发布前人工检查清单
- `adapter-guidelines.md`：推荐接入路径与反例
- `migration-guide.md`：从旧系统迁移到 SoDialog
- `troubleshooting.md`：排障手册与检查清单

### 文档自动更新

- 本地可执行：`npm run docs:changelog`
- 仓库内置工作流：`.github/workflows/docs-changelog.yml`
- 当推送版本 tag（`v*.*.*`）时，工作流会自动重建 `CHANGELOG.md` 并回推到 `master`

Demo 中已包含：

- 预设默认值：`center`、`zoom`、`medium`、`showModal`、不可拖动、自动适配
- 拖动区域支持多选（`header/title/body/panel` 可组合）
- `Modal ID` 留空自动生成，输入后可复用唤醒同 ID
- Modal 内切换不同尺寸图片，验证 `autoFitSize` 自动扩缩
- 包含超大图（`xlarge`）、超长单词、超宽表格的溢出测试
- Modal 内容按钮打开子窗口（支持 ID 复用唤起）
- 子窗口包含多种表单元素（input/select/checkbox/textarea）演示
- 新增 Markdown 编辑器子窗口（工具栏插入、实时预览）
- 编辑器支持“仅编辑 / 编辑 + 预览”模式切换
- Modal 新增“启用自定义 Footer API”开关（可切换默认按钮与自定义按钮）
- Footer 按钮支持样式变体演示（`link / outline / danger / success / ghost`）
- Footer 动作统一监听（`onAction`）与事件日志输出
- 运行时按钮更新演示（`handle.updateFooterButton` / `handle.setFooterButtons`）

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
3. 本地先做版本校验（tag 必须和 `package.json` 一致）

```bash
npm run release:check -- vX.Y.Z
```

说明：当前工作流优先使用 `NPM_AUTOMATION_TOKEN` 发布；未配置时回退到 Trusted Publishing（OIDC）。

- 若使用 token 路径，`NPM_AUTOMATION_TOKEN` 请使用 npm Granular access token（Write 权限），并启用 `Bypass 2FA`，否则 CI 发布会报 `EOTP`。
- 若使用 Trusted Publishing 路径，需先在 npm 包设置里完成仓库和 workflow 绑定，否则发布阶段可能出现 `E404`。

推荐发布命令：

```bash
npm version patch --no-git-tag-version
npm run release:check -- vX.Y.Z
git add -A
git commit -m "release: vX.Y.Z"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push --follow-tags
```

> 当前样式均使用 `sod-` 前缀命名，避免污染全局 `body/:root/*`。
