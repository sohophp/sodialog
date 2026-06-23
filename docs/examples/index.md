# 示例中心 Labs

示例中心现在作为可视化实验室入口。每张卡片对应一个组件能力面，优先提供可操作 Lab；暂未迁移为 Lab 的功能仍保留原可运行 Demo 入口。

<div class="sod-lab-grid">
  <LabCard
    title="Modal Lab"
    description="调整标题、宽度、Esc 策略和 footer 对齐，实时查看预览与生成代码。"
    :tags="['Basic modal', 'Async confirm', 'Form modal', 'Custom footer', 'Lifecycle hooks']"
    lab-href="/examples/modal-lab"
    api-href="/api/dialog"
    preview="modal"
  />
  <LabCard
    title="Toast Lab"
    description="验证成功、错误、队列、位置和重复消息策略。"
    :tags="['Success / error', 'Queue', 'Placement', 'Duplicate strategy']"
    lab-href="/components/toast"
    api-href="/api/toast"
    preview="toast"
  />
  <LabCard
    title="Offcanvas Lab"
    description="查看四个方向的面板尺寸、动画和移动端使用方式。"
    :tags="['Placement', 'Size', 'Lifecycle', 'Mobile panel']"
    lab-href="/components/offcanvas"
    api-href="/api/dialog"
    preview="offcanvas"
  />
  <LabCard
    title="Context Menu Lab"
    description="验证右键菜单、键盘路径、typeahead 和菜单触发 Dialog。"
    :tags="['Keyboard', 'Typeahead', 'Close policy', 'Dialog bridge']"
    lab-href="/components/context-menu"
    api-href="/api/context-menu"
    preview="menu"
  />
</div>

## Legacy Demo

<iframe src="/legacy-demo/demo.html" title="SoDialog Examples Demo" style="width:100%;min-height:760px;border:1px solid #d9dee7;border-radius:12px;background:#fff;"></iframe>

- 新窗口打开：<a href="/legacy-demo/demo.html" target="_blank" rel="noreferrer">/legacy-demo/demo.html</a>

## 建议用法

- 新功能先在对应 Lab 页补充案例。
- API 变更后同步更新 `API Reference` 与对应 Lab 示例。
- 发布前逐个点开 Lab 验证交互闭环与跳转。
