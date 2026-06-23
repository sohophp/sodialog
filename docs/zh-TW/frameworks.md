---
description: SoDialog 與 React、Vue、Nuxt、Next.js 等框架整合的邊界與清理建議。
---

# 框架整合

SoDialog 核心不綁定框架。請在客戶端生命週期、事件處理器或明確 DOM 生命週期中呼叫 API。

## React

在 Client Component 或瀏覽器事件中使用，元件卸載時清理 handle。

## Vue

在 `onMounted` 後或使用者事件中呼叫，並在 `onUnmounted` 清理。

## Nuxt / Next.js

SSR 階段不要呼叫 DOM API。請使用 `<ClientOnly>`、客戶端 plugin 或 Client Component。
