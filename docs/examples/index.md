# 示例

示例中心集中放置可运行 Demo、可视化实验室和旧版演示入口。独立 HTML 示例默认使用当前文档版本的 CDN，也可以通过 URL 参数临时切换版本，例如 `?sodialogVersion=latest` 或 `?sodialogVersion=0.3.7`。

## 可运行示例 {#runnable-examples}

### Modal Basic {#modal-basic}

<DemoPreview src="/components/modal-basic.html" title="Modal Basic" :height="360" />

### Modal Promise {#modal-promise}

<DemoPreview src="/components/modal-promise.html" title="Modal Promise" :height="460" />

### Offcanvas {#offcanvas}

<DemoPreview src="/components/offcanvas.html" title="Offcanvas Placements" :height="400" />

### Toast Basic {#toast-basic}

<DemoPreview src="/components/toast-basic.html" title="Toast Basic" :height="360" />

### Toast Queue {#toast-queue}

<DemoPreview src="/components/toast-queue.html" title="Toast Queue" :height="400" />

### Context Menu {#context-menu}

<DemoPreview src="/components/context-menu-basic.html" title="Context Menu Basic" :height="420" />

### Menu to Dialog {#menu-to-dialog}

<DemoPreview src="/components/context-menu-dialog.html" title="Context Menu to Dialog" :height="440" />

## 实验室 {#labs}

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

## 旧版演示

<iframe src="/legacy-demo/demo.html" title="SoDialog Examples Demo" style="width:100%;min-height:760px;border:1px solid #d9dee7;border-radius:12px;background:#fff;"></iframe>

- 新窗口打开：<a href="/legacy-demo/demo.html" target="_blank" rel="noreferrer">/legacy-demo/demo.html</a>

## 建议用法

- 新功能先补一个独立可运行示例，再在对应 Lab 页补充可调参数。
- API 变更后同步更新 `API Reference` 与对应 Lab 示例。
- 发布前逐个点开 Lab 验证交互闭环与跳转。
