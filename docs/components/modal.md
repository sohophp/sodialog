---
description: SoDialog Modal 指南：基础打开、生命周期钩子、Promise 组合流程与默认配置。
---

# Modal

<DocPageHeader
  title="Modal"
  description="可访问性友好的模态对话框，支持 Promise API、尺寸控制、拖动、生命周期钩子和诊断 trace。"
  lab-href="/examples/modal-lab"
  api-href="/api/dialog"
  source-href="https://github.com/sohophp/sodialog/blob/main/src/lib.ts"
/>

## 最短可运行示例

```ts
import { openModal } from 'sodialog'
import 'sodialog/style.css'

openModal({
  title: 'Hello',
  content: '<p>Your dialog is ready.</p>',
})
```

Modal 默认可以按住 header 拖动。需要关闭时传 `draggable: false`；需要让 body 或 footer 也能拖动时传 `dragHandle: ['header', 'body', 'footer']`。

## Demo / Playground

<DemoPreview src="/components/modal-basic.html" title="Modal Basic Demo" :height="430" />
<DemoPreview src="/components/modal-promise.html" title="Modal Promise Flow Demo" :height="460" />

## 基础打开

```ts
import { openModal } from 'sodialog'

openModal({
  title: '基础示例',
  content: '<p>这是 Modal 的基础示例。</p>',
  width: 640,
  height: '70vh',
  confirmText: '确认',
  cancelText: '取消',
})
```

`width` 和 `height` 支持数字（按 px）或 CSS 尺寸字符串；设置任一尺寸后，将关闭自动尺寸适配并优先采用显式尺寸。

## 生命周期与诊断

```ts
import { openDialog, pushMessage } from 'sodialog'

openDialog({
  title: '稳定时机示例',
  content: '<p>观察 onLayoutStable 与 action 回调输出。</p>',
  traceId: 'trace-modal-lab-001',
  onLayoutStable: ({ traceId }) => {
    pushMessage('success', '布局已稳定', { traceId, duration: 1300 })
  },
  onAction: ({ action, traceId }) => {
    console.log(action, traceId)
  },
})
```

## 预设风格

```ts
openModal({
  title: 'Ready to deploy',
  content: '<p>All checks passed. Production is ready.</p>',
  preset: 'deploy',
  confirmText: 'Deploy now',
  cancelText: 'Cancel',
})
```

`preset: 'deploy'` 使用标准样式里的 `sod-preset-deploy` 类实现，不引入额外 CSS 文件或运行时依赖；仍可用 `--sod-*` 变量覆盖颜色、圆角和阴影。

## Promise 组合流程

```ts
import { confirmModal, promptModal, formModal, pushMessage } from 'sodialog'

const ok = await confirmModal({
  title: '确认',
  content: '<p>继续执行串行流程？</p>',
})
if (!ok) return

const note = await promptModal({ title: '输入备注', placeholder: '请输入内容' })
if (note === null) return

await formModal({
  title: '补充信息',
  fields: [{ name: 'owner', label: '负责人', required: true }],
})

pushMessage('info', `流程完成，备注：${note}`, {
  duration: 1400,
  traceId: 'trace-modal-lab-001',
})
```

## 全局默认配置

```ts
import { configureDialog, openModal } from 'sodialog'

configureDialog({
  modalDefaults: {
    footerAlign: 'center',
    closeOnEsc: false,
  },
})

openModal({
  title: '默认配置生效验证',
  content: '<p>本次调用未传 footerAlign/closeOnEsc。</p>',
})
```

## 可访问性

Modal 保留原生 `<dialog>` 语义，并在打开时维护 `aria-modal`、可访问名称和焦点进入。关闭按钮与 footer 操作都应保留可见文本或明确的可访问名称；改变 `closeOnEsc`、`closeOnBackdrop` 时需要同步考虑键盘用户的退出路径。

## 相关 API

<div class="sod-inline-actions">
  <a href="/api/dialog">Dialog API</a>
  <a href="/api/adapter">Adapter API</a>
  <a href="/installation">安装与 CDN</a>
</div>
