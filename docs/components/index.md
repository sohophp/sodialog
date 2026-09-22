---
description: SoDialog 组件总览：Dialog、Toast、Context Menu、Tooltip 与 Tags Input。
---

# 组件

<VersionBadge />

SoDialog 的组件都基于浏览器原生 DOM 能力实现，保持零运行时必需依赖。组件页负责解释使用场景、最短示例、可访问性注意事项和关联 API。

<div class="sod-doc-grid-compact">
  <a class="sod-doc-tile" href="/components/modal">
    <h3>Modal</h3>
    <p>用于确认、表单、Promise 流程和需要阻断背景操作的对话框。</p>
  </a>
  <a class="sod-doc-tile" href="/components/offcanvas">
    <h3>Offcanvas</h3>
    <p>用于筛选、详情、设置面板和移动端辅助操作区。</p>
  </a>
  <a class="sod-doc-tile" href="/components/toast">
    <h3>Toast</h3>
    <p>用于状态反馈、队列消息、重复消息处理和 live region 通知。</p>
  </a>
  <a class="sod-doc-tile" href="/components/context-menu">
    <h3>Context Menu</h3>
    <p>用于右键菜单、键盘导航、typeahead 和菜单触发 Dialog。</p>
  </a>
  <a class="sod-doc-tile" href="/components/tooltip"><h3>Tooltip</h3><p>简短文本提示，支持鼠标、键盘、触摸与动态列表。</p></a>
  <a class="sod-doc-tile" href="/components/tags-input"><h3>Tags Input</h3><p>渐进增强原表单字段，支持键盘、粘贴与双向同步。</p></a>
</div>

## 其它组件 {#other-components}

当前公开包包含 Modal、Offcanvas、Toast、Context Menu、Tooltip 和 Tags Input。框架适配器会作为薄封装独立规划，不进入核心运行时依赖。
