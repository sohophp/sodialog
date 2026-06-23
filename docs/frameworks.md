---
description: SoDialog 与 React、Vue、Nuxt、Next.js 等框架集成的边界与清理建议。
---

# 框架集成

SoDialog 核心不绑定框架。框架项目应在客户端生命周期、事件处理器或显式 DOM 生命周期中调用 API，并在组件卸载时清理实例或监听。

## React

```tsx
import { useEffect, useRef } from 'react'
import { openModal, type SoDialogHandle } from 'sodialog'

export function HelpModalButton() {
  const handleRef = useRef<SoDialogHandle | null>(null)

  useEffect(() => {
    return () => handleRef.current?.close()
  }, [])

  return (
    <button onClick={() => {
      handleRef.current = openModal({ title: 'Help', content: '<p>Client only.</p>' })
    }}>
      Open
    </button>
  )
}
```

## Vue

在 `onMounted` 后或用户事件中调用，在 `onUnmounted` 时关闭或解绑。

## Nuxt / Next.js

SSR 阶段不得调用需要 `window`、`document` 或 `HTMLDialogElement` 的 API。Nuxt 使用 `<ClientOnly>` 或客户端插件；Next.js 使用 Client Component。
