---
description: SoDialog Toast 指南：基础消息、队列可见数、重复消息策略与全局清理。
---

# Toast

<DocPageHeader
  title="Toast"
  description="轻量状态通知，支持队列、重复消息策略、放置位置、计时暂停和可访问 live region。"
  lab-href="/examples/"
  api-href="/api/toast"
  source-href="https://github.com/sohophp/sodialog/blob/main/src/lib.ts"
/>

## 最短可运行示例

```ts
import { pushMessage } from 'sodialog'
import 'sodialog/style.css'

pushMessage('success', '保存成功')
```

## Demo / Playground

<DemoPreview src="/components/toast-basic.html" title="Toast Basic Demo" :height="360" />
<DemoPreview src="/components/toast-queue.html" title="Toast Queue Strategy Demo" :height="360" />

## 基础消息

```ts
import { pushMessage } from 'sodialog'

pushMessage('info', '普通提示')
pushMessage('success', '保存成功')
pushMessage('warning', '请注意输入')
pushMessage('danger', '请求失败')
```

## 队列控制

```ts
import { SoToast, toast } from 'sodialog'

SoToast.configure({ maxVisible: 3 })

for (let index = 1; index <= 6; index += 1) {
  toast({
    title: `队列 ${index}`,
    content: `消息 ${index}`,
    width: 360,
    duration: 1000 + index * 180,
  })
}
```

`width` 和 `height` 支持数字（按 px）或 CSS 尺寸字符串，并可通过返回句柄的 `update()` 动态修改。

## 重复策略

```ts
import { toast } from 'sodialog'

toast({
  id: 'sync-task',
  title: '同步任务',
  content: '策略 update',
  duplicateStrategy: 'update',
})

toast({
  id: 'sync-task',
  title: '同步任务',
  content: '策略 stack',
  duplicateStrategy: 'stack',
})
```

- `update`：复用现有实例并更新内容。
- `stack`：创建新实例并叠加显示。

## 清空消息

```ts
import { SoToast } from 'sodialog'

SoToast.closeAll()
```

## 可访问性

Toast 使用合适的 live region 暴露状态变化。业务文案不要只依赖颜色表达成功或失败，重要错误应提供可操作入口或在主界面保留持久反馈。

## 相关 API

<div class="sod-inline-actions">
  <a href="/api/toast">Toast API</a>
  <a href="/api/adapter">Adapter API</a>
  <a href="/examples/">Labs</a>
</div>
