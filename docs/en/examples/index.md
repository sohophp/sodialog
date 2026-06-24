# Examples

The examples hub collects runnable demos, visual labs, and the legacy demo entry. Standalone HTML examples use the current docs CDN version by default, and you can temporarily switch versions with URL parameters such as `?sodialogVersion=latest` or `?sodialogVersion=0.3.7`.

## Runnable Examples {#runnable-examples}

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

## Labs {#labs}

<div class="sod-lab-grid">
  <LabCard
    title="Modal Lab"
    description="Adjust title, width, Escape policy, and footer alignment while previewing generated code."
    :tags="['Basic modal', 'Async confirm', 'Form modal', 'Custom footer', 'Lifecycle hooks']"
    lab-href="/en/examples/modal-lab"
    api-href="/en/api/dialog"
    preview="modal"
  />
  <LabCard
    title="Toast Lab"
    description="Validate success, error, queue, placement, and duplicate message behavior."
    :tags="['Success / error', 'Queue', 'Placement', 'Duplicate strategy']"
    lab-href="/en/components/toast"
    api-href="/en/api/toast"
    preview="toast"
  />
  <LabCard
    title="Offcanvas Lab"
    description="Review four panel placements, sizing, animation, and mobile behavior."
    :tags="['Placement', 'Size', 'Lifecycle', 'Mobile panel']"
    lab-href="/en/components/offcanvas"
    api-href="/en/api/dialog"
    preview="offcanvas"
  />
  <LabCard
    title="Context Menu Lab"
    description="Check right-click menus, keyboard paths, typeahead, and dialog bridging."
    :tags="['Keyboard', 'Typeahead', 'Close policy', 'Dialog bridge']"
    lab-href="/en/components/context-menu"
    api-href="/en/api/context-menu"
    preview="menu"
  />
</div>

## Legacy Demo

<iframe src="/legacy-demo/demo.html" title="SoDialog Examples Demo" style="width:100%;min-height:760px;border:1px solid #d9dee7;border-radius:12px;background:#fff;"></iframe>

- Open in a new tab: <a href="/legacy-demo/demo.html" target="_blank" rel="noreferrer">/legacy-demo/demo.html</a>

## Suggested Workflow

- Add a standalone runnable example before expanding the corresponding Lab.
- Update `API Reference` and related Lab examples after API changes.
- Before release, click through each runnable example and Lab path.
