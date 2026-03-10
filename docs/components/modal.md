---
description: SoDialog Modal 指南：基础打开、生命周期钩子、Promise 组合流程与默认配置。
---

# Modal

npm: [`sodialog`](https://www.npmjs.com/package/sodialog)

<CdnNotice />

<DemoPreview src="/components/modal-basic.html" title="Modal Basic Demo" :height="430" />
<DemoPreview src="/components/modal-promise.html" title="Modal Promise Flow Demo" :height="460" />

## Level 1. Basic Usage

## 基础打开

```ts
import { openModal } from 'sodialog'

openModal({
  title: '基础示例',
  content: '<p>这是 Modal 的基础示例。</p>',
  confirmText: '确认',
  cancelText: '取消',
})
```

## Level 2. Add lifecycle and tracing

## 布局稳定钩子与 trace

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

## Level 3. Promise flow composition

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

## Level 4. Configure defaults

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

## Related API

- [Dialog API](/api/dialog)
- [Adapter API](/api/adapter)

更多可视化示例见 [Examples Hub](/examples/)。
