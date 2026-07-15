# 示例

示例中心按任务拆分为独立页面。每个页面只加载一个可运行 demo，默认使用当前文档版本的 CDN，也支持通过 URL 参数临时切换版本，例如 `?sodialogVersion=latest` 或 `?sodialogVersion=0.3.10`。

## 可运行示例

<div class="sod-doc-grid-compact">
  <a class="sod-doc-tile" href="/examples/modal-basic"><h3>Modal Basic</h3><p>最小 Modal、默认 footer、默认 header 拖动。</p></a>
  <a class="sod-doc-tile" href="/examples/modal-promise"><h3>Modal Promise</h3><p>confirm、prompt、form 的串行交互流程。</p></a>
  <a class="sod-doc-tile" href="/examples/offcanvas"><h3>Offcanvas</h3><p>四个方向、尺寸和动画的贴边面板。</p></a>
  <a class="sod-doc-tile" href="/examples/toast-basic"><h3>Toast Basic</h3><p>状态消息、位置和自动关闭。</p></a>
  <a class="sod-doc-tile" href="/examples/toast-queue"><h3>Toast Queue</h3><p>队列上限、重复策略和倒计时。</p></a>
  <a class="sod-doc-tile" href="/examples/context-menu"><h3>Context Menu</h3><p>右键菜单、图标、键盘路径。</p></a>
  <a class="sod-doc-tile" href="/examples/menu-to-dialog"><h3>Menu to Dialog</h3><p>从菜单动作打开 Dialog 的组合流程。</p></a>
</div>

## 实验室

<div class="sod-lab-grid">
  <LabCard
    title="Modal Lab"
    description="围绕真实确认、表单、部署提示和拖动策略生成可复制配置。"
    :tags="['Scenario presets', 'Drag handles', 'Deploy preset', 'Generated code']"
    lab-href="/examples/modal-lab"
    api-href="/api/dialog"
    preview="modal"
  />
  <LabCard
    title="Toast Playbook"
    description="用组件页验证成功、错误、队列、位置和重复消息策略。"
    :tags="['Queue', 'Placement', 'Duplicate strategy']"
    lab-href="/components/toast"
    api-href="/api/toast"
    preview="toast"
  />
  <LabCard
    title="Offcanvas Playbook"
    description="用独立示例检查四个方向、尺寸、动画和移动端面板。"
    :tags="['Placement', 'Size', 'Mobile panel']"
    lab-href="/examples/offcanvas"
    api-href="/api/dialog"
    preview="offcanvas"
  />
  <LabCard
    title="Context Menu Playbook"
    description="检查右键菜单、键盘路径、typeahead 和菜单触发 Dialog。"
    :tags="['Keyboard', 'Typeahead', 'Dialog bridge']"
    lab-href="/examples/context-menu"
    api-href="/api/context-menu"
    preview="menu"
  />
</div>

## 旧版演示

旧版演示仍保留用于回归完整交互页，但不再嵌入示例索引，避免一个页面内加载过多 demo。

<div class="sod-inline-actions">
  <a href="/legacy-demo/demo.html" target="_blank" rel="noreferrer">打开旧版演示</a>
  <a href="/demo">查看文档内旧版演示页</a>
</div>
