---
description: SoDialog Toast 指南：基础消息、队列可见数、重复消息策略与全局清理。
---

# Toast

<CdnNotice />

<DemoPreview src="/components/toast-basic.html" title="Toast Basic Demo" :height="360" />
<DemoPreview src="/components/toast-queue.html" title="Toast Queue Strategy Demo" :height="360" />

## Level 1. Basic messages

## 基础消息

```ts
import { pushMessage } from 'sodialog'

pushMessage('info', '普通提示')
pushMessage('success', '保存成功')
pushMessage('warning', '请注意输入')
pushMessage('danger', '请求失败')
```

## Level 2. Queue and visibility control

## 队列控制

```ts
import { SoToast, toast } from 'sodialog'

SoToast.configure({ maxVisible: 3 })

for (let index = 1; index <= 6; index += 1) {
  toast({
    title: `队列 ${index}`,
    content: `消息 ${index}`,
    duration: 1000 + index * 180,
  })
}
```

## Level 3. Duplicate handling strategy

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

## Level 4. Global cleanup

## 清空消息

```ts
import { SoToast } from 'sodialog'

SoToast.closeAll()
```

## Related API

- [Toast API](/api/toast)
- [Adapter API](/api/adapter)

更多可视化示例见 [Examples Hub](/examples/)。
