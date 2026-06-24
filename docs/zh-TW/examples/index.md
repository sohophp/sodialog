# 範例

範例中心集中放置可執行 Demo、視覺化實驗室與舊版演示入口。獨立 HTML 範例預設使用目前文件版本的 CDN，也可以透過 URL 參數暫時切換版本，例如 `?sodialogVersion=latest` 或 `?sodialogVersion=0.3.7`。

## 可執行範例 {#runnable-examples}

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

## 實驗室 {#labs}

<div class="sod-lab-grid">
  <LabCard
    title="Modal Lab"
    description="調整標題、寬度、Esc 策略和 footer 對齊，並即時查看預覽與產生程式碼。"
    :tags="['Basic modal', 'Async confirm', 'Form modal', 'Custom footer', 'Lifecycle hooks']"
    lab-href="/zh-TW/examples/modal-lab"
    api-href="/zh-TW/api/dialog"
    preview="modal"
  />
  <LabCard
    title="Toast Lab"
    description="驗證成功、錯誤、佇列、位置與重複訊息策略。"
    :tags="['Success / error', 'Queue', 'Placement', 'Duplicate strategy']"
    lab-href="/zh-TW/components/toast"
    api-href="/zh-TW/api/toast"
    preview="toast"
  />
  <LabCard
    title="Offcanvas Lab"
    description="查看四個方向的面板尺寸、動畫與行動端使用方式。"
    :tags="['Placement', 'Size', 'Lifecycle', 'Mobile panel']"
    lab-href="/zh-TW/components/offcanvas"
    api-href="/zh-TW/api/dialog"
    preview="offcanvas"
  />
  <LabCard
    title="Context Menu Lab"
    description="驗證右鍵選單、鍵盤路徑、typeahead 與選單觸發 Dialog。"
    :tags="['Keyboard', 'Typeahead', 'Close policy', 'Dialog bridge']"
    lab-href="/zh-TW/components/context-menu"
    api-href="/zh-TW/api/context-menu"
    preview="menu"
  />
</div>

## 舊版演示

<iframe src="/legacy-demo/demo.html" title="SoDialog Examples Demo" style="width:100%;min-height:760px;border:1px solid #d9dee7;border-radius:12px;background:#fff;"></iframe>

- 新視窗開啟：<a href="/legacy-demo/demo.html" target="_blank" rel="noreferrer">/legacy-demo/demo.html</a>

## 建議用法

- 新功能先補一個獨立可執行範例，再在對應 Lab 頁補充可調參數。
- API 變更後同步更新 `API Reference` 與對應 Lab 範例。
- 發布前逐一點開可執行範例與 Lab 路徑。
