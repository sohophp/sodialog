import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as r}from"./pinned-hero-top-PAvN5BGZ.js";import{o as s,t as e,c as p,p as u,f as m,a as c,S as i}from"./lib-CtELuZve.js";const d=document.querySelector("#app");if(!d)throw new Error("Cannot find #app root element");d.innerHTML=`
  <div class="page-bg" aria-hidden="true">
    <span class="shape shape-a"></span>
    <span class="shape shape-b"></span>
    <span class="shape shape-c"></span>
  </div>

  <header class="hero">
    <div class="hero-top">
      <div class="brand-block">
        <img class="brand-logo" src="./logo.ico" alt="SoDialog Logo" width="36" height="36" />
        <div class="brand-copy">
          <strong class="brand-name">SoDialog</strong>
          <span class="tag">Examples</span>
        </div>
      </div>
      <nav class="quick-nav">
        <a href="./index.html#quick-start">快速开始</a>
        <a href="./examples.html#modal-example">功能示例</a>
        <a href="./demo.html">原版 Demo</a>
        <a href="./api.html">API</a>
        <a href="./index.html#dev-flow">开发流程</a>
        <a href="./index.html#release-flow">发布流程</a>
      </nav>
    </div>

    <h1>SoDialog 功能示例与实战</h1>
    <p>独立页面，按组件拆分详细说明使用方法，并提供可直接运行的交互示例与代码片段。</p>

    <div class="hero-banner" aria-hidden="true">
      <span>Modal</span>
      <span>Offcanvas</span>
      <span>Toast</span>
    </div>

    <div class="hero-actions">
      <a class="btn primary" href="./index.html">返回文档首页</a>
      <a class="btn secondary" href="./demo.html">打开原版 Demo</a>
      <a class="btn secondary" href="https://www.npmjs.com/package/sodialog" target="_blank" rel="noreferrer">NPM 包</a>
    </div>
  </header>

  <main class="layout">
    <aside class="card side-nav" aria-label="示例导航">
      <h2>示例导航</h2>
      <div class="nav-group">
        <a class="nav-l1" href="#modal-example">Modal</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#modal-1">1. 最小调用</a>
          <a class="nav-l2" href="#modal-2">2. 基础参数</a>
          <a class="nav-l2" href="#modal-3">3. 位置与关闭行为</a>
          <a class="nav-l2" href="#modal-4">4. 高级参数</a>
          <a class="nav-l2" href="#modal-5">5. confirmModal</a>
          <a class="nav-l2" href="#modal-6">6. promptModal</a>
          <a class="nav-l2" href="#modal-7">7. formModal</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#offcanvas-example">Offcanvas</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#offcanvas-1">1. 最小调用</a>
          <a class="nav-l2" href="#offcanvas-2">2. 位置与动画</a>
          <a class="nav-l2" href="#offcanvas-3">3. 顶部/底部</a>
          <a class="nav-l2" href="#offcanvas-4">4. 高级参数</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#toast-example">Toast</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#toast-1">1. 最小调用</a>
          <a class="nav-l2" href="#toast-2">2. 样式与位置</a>
          <a class="nav-l2" href="#toast-3">3. 手动控制</a>
          <a class="nav-l2" href="#toast-4">4. 队列</a>
          <a class="nav-l2" href="#toast-5">5. 重复策略</a>
        </div>
      </div>
    </aside>

    <div class="content-stack">
    <section class="card" id="modal-example">
      <h2>1) Modal 示例</h2>
      <p class="section-lead">按“最基础 -> 参数增强 -> Promise 流程 -> 表单采集”逐步展示 Modal 的常见用法。</p>
      <div class="example-grid">
        <article class="example-card" id="modal-1">
          <h3>示例 1：最小调用（只传核心参数）</h3>
          <div class="row">
            <button class="btn primary" id="open-modal-minimal">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-minimal-code" type="button">复制</button>
            <pre id="modal-minimal-code"><code>openModal({
  title: '最小示例',
  content: '&lt;p&gt;这是最小可用的 Modal 调用。&lt;/p&gt;',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-2">
          <h3>示例 2：基础参数（标题、内容、动画、按钮）</h3>
          <div class="row">
            <button class="btn primary" id="open-modal-basic">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-basic-code" type="button">复制</button>
            <pre id="modal-basic-code"><code>openModal({
  title: '订单确认',
  content: '&lt;p&gt;这是一个基础 Modal 示例，支持自定义内容和按钮。&lt;/p&gt;',
  animation: 'zoom',
  confirmText: '确认',
  cancelText: '取消',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-3">
          <h3>示例 3：位置与关闭行为</h3>
          <div class="row">
            <button class="btn primary" id="open-modal-position">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-position-code" type="button">复制</button>
            <pre id="modal-position-code"><code>openModal({
  title: '顶部提示弹窗',
  content: '&lt;p&gt;演示 top 定位与关闭策略。&lt;/p&gt;',
  position: 'top',
  animation: 'slide',
  useModal: true,
  closeOnBackdrop: true,
  closeOnEsc: true,
  confirmText: '我知道了',
  cancelText: '关闭',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-4">
          <h3>示例 4：高级参数（拖拽、自动尺寸、生命周期）</h3>
          <div class="row">
            <button class="btn primary" id="open-modal-advanced">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-advanced-code" type="button">复制</button>
            <pre id="modal-advanced-code"><code>openModal({
  id: 'advanced-modal-demo',
  title: '高级参数示例',
  content: '&lt;div class="drag-anchor" style="margin-bottom:8px;font-weight:700;cursor:move;"&gt;拖拽锚点（也可拖动）&lt;/div&gt;&lt;p&gt;该示例演示 draggable / dragHandle / autoFitSize / scrollMode / 生命周期回调。&lt;/p&gt;&lt;p&gt;当内容较长时，会按 hybrid 规则切换滚动容器。&lt;/p&gt;',
  animation: 'fade',
  position: 'center',
  draggable: true,
  dragHandle: ['header', '.drag-anchor'],
  autoFitSize: true,
  scrollMode: 'hybrid',
  hybridSwitchRatio: 1.25,
  confirmText: '确认',
  cancelText: '取消',
  onAfterOpen: () =&gt; {
    toast({ title: 'after-open', content: '高级 Modal 已打开', variant: 'info', duration: 1200 })
  },
  onAfterClose: () =&gt; {
    toast({ title: 'after-close', content: '高级 Modal 已关闭', variant: 'default', duration: 1200 })
  },
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-5">
          <h3>示例 5：Promise 确认（<code>confirmModal</code>）</h3>
          <div class="row">
            <button class="btn primary" id="open-confirm">运行示例</button>
          </div>
          <div id="modal-result" class="result-box">结果输出：等待执行...</div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-confirm-code" type="button">复制</button>
            <pre id="modal-confirm-code"><code>const ok = await confirmModal({
  title: '删除确认',
  content: '&lt;p&gt;确定删除这条记录吗？该操作不可恢复。&lt;/p&gt;',
  confirmText: '删除',
  cancelText: '返回',
})

toast({
  title: ok ? '已确认' : '已取消',
  content: ok ? '用户确认执行删除。' : '用户取消了删除。',
  variant: ok ? 'danger' : 'info',
  duration: 1800,
})

if (modalResult) {
  modalResult.textContent = \`结果输出：confirmModal =&gt; \${ok ? 'true' : 'false'}\`
}</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-6">
          <h3>示例 6：Promise 输入（<code>promptModal</code>）</h3>
          <div class="row">
            <button class="btn primary" id="open-prompt">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-prompt-code" type="button">复制</button>
            <pre id="modal-prompt-code"><code>const result = await promptModal({
  title: '请输入标签名',
  placeholder: '例如 release-note',
  validate: (value) =&gt; (value.length &lt; 2 ? '至少输入 2 个字符' : true),
})

if (result === null) {
  toast({ title: '已取消', content: '你取消了输入。', variant: 'info', duration: 1700 })
  if (modalResult) {
    modalResult.textContent = '结果输出：promptModal =&gt; null'
  }
  return
}

toast({
  title: '输入完成',
  content: \`你输入的是: \${result}\`,
  variant: 'success',
  duration: 2200,
})

if (modalResult) {
  modalResult.textContent = \`结果输出：promptModal =&gt; "\${result}"\`
}</code></pre>
          </div>
        </article>

        <article class="example-card" id="modal-7">
          <h3>示例 7：表单采集（<code>formModal</code>）</h3>
          <div class="row">
            <button class="btn primary" id="open-form">运行示例</button>
          </div>
          <div id="form-result" class="result-box">结果输出：等待执行...</div>
          <div class="code">
            <button class="copy-btn" data-copy-target="modal-form-code" type="button">复制</button>
            <pre id="modal-form-code"><code>const values = await formModal({
  title: '创建发布计划',
  content: '&lt;p&gt;请填写发布信息，用于生成计划卡片。&lt;/p&gt;',
  submitText: '创建',
  fields: [
    {
      name: 'title',
      label: '计划标题',
      placeholder: '例如 v0.1.18 发布',
      required: true,
      validate: (value) => (String(value ?? '').length &lt; 4 ? '标题至少 4 个字符' : true),
    },
    {
      name: 'owner',
      label: '负责人',
      placeholder: '例如 Alice',
      required: true,
    },
    {
      name: 'priority',
      label: '优先级',
      type: 'select',
      options: [
        { label: 'P0 - 紧急', value: 'p0' },
        { label: 'P1 - 高', value: 'p1' },
        { label: 'P2 - 常规', value: 'p2' },
      ],
      defaultValue: 'p1',
    },
    {
      name: 'estimate',
      label: '预估工时(小时)',
      type: 'number',
      defaultValue: 6,
      required: true,
    },
    {
      name: 'notes',
      label: '备注',
      type: 'textarea',
      placeholder: '写下本次发布重点...',
      rows: 3,
    },
    {
      name: 'notify',
      label: '发布后通知团队',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  validate: (formValues) => {
    const estimate = formValues.estimate
    if (typeof estimate === 'number' && estimate &gt; 24) {
      return { estimate: '单次计划建议不超过 24 小时' }
    }
    return true
  },
})

if (values === null) {
  toast({ title: '已取消', content: '你取消了表单提交。', variant: 'info', duration: 1600 })
  if (formResult) {
    formResult.textContent = '结果输出：formModal =&gt; null'
  }
  return
}

toast({
  title: '表单已提交',
  content: \`标题: \${String(values.title ?? '')}\`,
  variant: 'success',
  duration: 2200,
})
if (formResult) {
  formResult.textContent = \`结果输出：formModal =&gt; \${JSON.stringify(values)}\`
}</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="card" id="offcanvas-example">
      <h2>2) Offcanvas 示例</h2>
      <p class="section-lead">按“最基础 -> 位置动画 -> 边缘类型 -> 高级参数”逐步展示 Offcanvas 的用法。</p>
      <div class="example-grid">
        <article class="example-card" id="offcanvas-1">
          <h3>示例 1：最小调用</h3>
          <div class="row">
            <button class="btn primary" id="open-offcanvas-minimal">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-minimal-code" type="button">复制</button>
            <pre id="offcanvas-minimal-code"><code>openOffcanvas({
  title: '最小 Offcanvas',
  content: '&lt;p&gt;这是最小可用的 Offcanvas 调用。&lt;/p&gt;',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="offcanvas-2">
          <h3>示例 2：位置与动画（右侧滑入）</h3>
          <div class="row">
            <button class="btn primary" id="open-offcanvas-basic">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-basic-code" type="button">复制</button>
            <pre id="offcanvas-basic-code"><code>openOffcanvas({
  title: '系统设置',
  placement: 'end',
  animation: 'slide',
  content: '&lt;p&gt;这里放筛选与配置项。&lt;/p&gt;',
  confirmText: '保存',
  cancelText: '关闭',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="offcanvas-3">
          <h3>示例 3：顶部/底部面板</h3>
          <div class="row">
            <button class="btn primary" id="open-offcanvas-top">顶部示例</button>
            <button class="btn secondary" id="open-offcanvas-bottom">底部示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-edge-code" type="button">复制</button>
            <pre id="offcanvas-edge-code"><code>openOffcanvas({
  title: '顶部通知面板',
  placement: 'top',
  animation: 'fade',
  content: '&lt;p&gt;适合展示全局通知或快捷操作。&lt;/p&gt;',
  confirmText: '知道了',
  cancelText: '关闭',
})

openOffcanvas({
  title: '底部操作面板',
  placement: 'bottom',
  animation: 'zoom',
  content: '&lt;p&gt;适合移动端的底部操作入口。&lt;/p&gt;',
  confirmText: '继续',
  cancelText: '取消',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="offcanvas-4">
          <h3>示例 4：高级参数（拖拽、滚动、生命周期）</h3>
          <div class="row">
            <button class="btn primary" id="open-offcanvas-advanced">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="offcanvas-advanced-code" type="button">复制</button>
            <pre id="offcanvas-advanced-code"><code>openOffcanvas({
  id: 'offcanvas-advanced-demo',
  title: '高级 Offcanvas',
  placement: 'start',
  animation: 'slide',
  draggable: true,
  dragHandle: ['header', 'body'],
  autoFitSize: true,
  scrollMode: 'hybrid',
  hybridSwitchRatio: 1.2,
  closeOnBackdrop: true,
  closeOnEsc: true,
  content: '&lt;p&gt;左侧高级面板：支持拖拽、内容自适配和生命周期提示。&lt;/p&gt;',
  confirmText: '保存',
  cancelText: '关闭',
  onAfterOpen: () =&gt; {
    toast({ title: 'offcanvas', content: '高级 Offcanvas 已打开', variant: 'info', duration: 1200 })
  },
  onAfterClose: () =&gt; {
    toast({ title: 'offcanvas', content: '高级 Offcanvas 已关闭', variant: 'default', duration: 1200 })
  },
})</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="card" id="toast-example">
      <h2>3) Toast 示例</h2>
      <p class="section-lead">按“最基础 -> 样式位置 -> 手动控制 -> 队列 -> 重复策略”逐步展示 Toast 用法。</p>
      <div class="example-grid">
        <article class="example-card" id="toast-1">
          <h3>示例 1：最小调用</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-minimal">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-minimal-code" type="button">复制</button>
            <pre id="toast-minimal-code"><code>toast({
  content: '最小通知示例',
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="toast-2">
          <h3>示例 2：样式与位置</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-basic">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-basic-code" type="button">复制</button>
            <pre id="toast-basic-code"><code>toast({
  title: '保存成功',
  content: '配置已同步',
  placement: 'top-end',
  variant: 'success',
  duration: 2200,
  maxVisible: 3,
  showProgress: true,
})</code></pre>
          </div>
        </article>

        <article class="example-card" id="toast-3">
          <h3>示例 3：手动控制（handle）</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-handle">运行示例</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-handle-code" type="button">复制</button>
            <pre id="toast-handle-code"><code>const handle = toast({
  id: 'manual-toast',
  title: '上传任务',
  content: '准备上传...',
  duration: false,
  closable: true,
  variant: 'info',
})

window.setTimeout(() =&gt; {
  handle.update({ content: '上传中 65%', variant: 'warning' })
}, 700)

window.setTimeout(() =&gt; {
  handle.update({ content: '上传完成', variant: 'success', duration: 1200 })
  handle.resume()
}, 1500)</code></pre>
          </div>
        </article>

        <article class="example-card" id="toast-4">
          <h3>示例 4：队列（maxVisible）</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-queue">批量队列</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-queue-code" type="button">复制</button>
            <pre id="toast-queue-code"><code>SoToast.configure({ maxVisible: 3 })

for (let index = 1; index &lt;= 6; index += 1) {
  toast({
    title: \`队列消息 \${index}\`,
    content: \`第 \${index} 条示例提醒\`,
    placement: 'top-end',
    variant: 'default',
    duration: 1000 + index * 250,
  })
}</code></pre>
          </div>
        </article>

        <article class="example-card" id="toast-5">
          <h3>示例 5：重复策略与清空</h3>
          <div class="row">
            <button class="btn primary" id="open-toast-dup-update">update</button>
            <button class="btn secondary" id="open-toast-dup-restart">restart-timer</button>
            <button class="btn secondary" id="open-toast-dup-stack">stack</button>
            <button class="btn secondary" id="clear-toast">清空 Toast</button>
          </div>
          <div class="code">
            <button class="copy-btn" data-copy-target="toast-dup-code" type="button">复制</button>
            <pre id="toast-dup-code"><code>toast({
  id: 'sync-job',
  title: '同步任务',
  content: '策略: update',
  variant: 'info',
  duration: 1800,
  duplicateStrategy: 'update',
})

toast({
  id: 'sync-job',
  title: '同步任务',
  content: '策略: restart-timer',
  variant: 'warning',
  duration: 1800,
  duplicateStrategy: 'restart-timer',
})

toast({
  id: 'sync-job',
  title: '同步任务',
  content: '策略: stack',
  variant: 'success',
  duration: 1800,
  duplicateStrategy: 'stack',
})

SoToast.closeAll()
</code></pre>
          </div>
        </article>
      </div>
    </section>
  </div>
  </main>

  <footer class="footer">
    <p>SoDialog · GitHub Pages 首页</p>
  </footer>
`;const v=document.querySelector("#open-modal-minimal"),f=document.querySelector("#open-modal-basic"),b=document.querySelector("#open-modal-position"),h=document.querySelector("#open-modal-advanced"),y=document.querySelector("#open-confirm"),g=document.querySelector("#open-prompt"),x=document.querySelector("#open-form"),o=document.querySelector("#modal-result"),l=document.querySelector("#form-result");v?.addEventListener("click",()=>{s({title:"最小示例",content:"<p>这是最小可用的 Modal 调用。</p>"})});f?.addEventListener("click",()=>{s({title:"订单确认",content:"<p>这是一个基础 Modal 示例，支持自定义内容和按钮。</p>",animation:"zoom",confirmText:"确认",cancelText:"取消"})});b?.addEventListener("click",()=>{s({title:"顶部提示弹窗",content:"<p>演示 top 定位与关闭策略。</p>",position:"top",animation:"slide",useModal:!0,closeOnBackdrop:!0,closeOnEsc:!0,confirmText:"我知道了",cancelText:"关闭"})});h?.addEventListener("click",()=>{s({id:"advanced-modal-demo",title:"高级参数示例",content:'<div class="drag-anchor" style="margin-bottom:8px;font-weight:700;cursor:move;">拖拽锚点（也可拖动）</div><p>该示例演示 draggable / dragHandle / autoFitSize / scrollMode / 生命周期回调。</p><p>当内容较长时，会按 hybrid 规则切换滚动容器。</p>',animation:"fade",position:"center",draggable:!0,dragHandle:["header",".drag-anchor"],autoFitSize:!0,scrollMode:"hybrid",hybridSwitchRatio:1.25,confirmText:"确认",cancelText:"取消",onAfterOpen:()=>{e({title:"after-open",content:"高级 Modal 已打开",variant:"info",duration:1200})},onAfterClose:()=>{e({title:"after-close",content:"高级 Modal 已关闭",variant:"default",duration:1200})}})});y?.addEventListener("click",async()=>{const t=await p({title:"删除确认",content:"<p>确定删除这条记录吗？该操作不可恢复。</p>",confirmText:"删除",cancelText:"返回"});e({title:t?"已确认":"已取消",content:t?"用户确认执行删除。":"用户取消了删除。",variant:t?"danger":"info",duration:1800}),o&&(o.textContent=`结果输出：confirmModal => ${t?"true":"false"}`)});g?.addEventListener("click",async()=>{const t=await u({title:"请输入标签名",placeholder:"例如 release-note",validate:a=>a.length<2?"至少输入 2 个字符":!0});if(t===null){e({title:"已取消",content:"你取消了输入。",variant:"info",duration:1700}),o&&(o.textContent="结果输出：promptModal => null");return}e({title:"输入完成",content:`你输入的是: ${t}`,variant:"success",duration:2200}),o&&(o.textContent=`结果输出：promptModal => "${t}"`)});x?.addEventListener("click",async()=>{const t=await m({title:"创建发布计划",content:"<p>请填写发布信息，用于生成计划卡片。</p>",submitText:"创建",fields:[{name:"title",label:"计划标题",placeholder:"例如 v0.1.18 发布",required:!0,validate:a=>String(a??"").length<4?"标题至少 4 个字符":!0},{name:"owner",label:"负责人",placeholder:"例如 Alice",required:!0},{name:"priority",label:"优先级",type:"select",options:[{label:"P0 - 紧急",value:"p0"},{label:"P1 - 高",value:"p1"},{label:"P2 - 常规",value:"p2"}],defaultValue:"p1"},{name:"estimate",label:"预估工时(小时)",type:"number",defaultValue:6,required:!0},{name:"notes",label:"备注",type:"textarea",placeholder:"写下本次发布重点...",rows:3},{name:"notify",label:"发布后通知团队",type:"checkbox",defaultValue:!0}],validate:a=>{const n=a.estimate;return typeof n=="number"&&n>24?{estimate:"单次计划建议不超过 24 小时"}:!0}});if(t===null){e({title:"已取消",content:"你取消了表单提交。",variant:"info",duration:1600}),l&&(l.textContent="结果输出：formModal => null");return}e({title:"表单已提交",content:`标题: ${String(t.title??"")}`,variant:"success",duration:2200}),l&&(l.textContent=`结果输出：formModal => ${JSON.stringify(t)}`)});const w=document.querySelector("#open-offcanvas-minimal"),S=document.querySelector("#open-offcanvas-basic"),T=document.querySelector("#open-offcanvas-top"),M=document.querySelector("#open-offcanvas-bottom"),k=document.querySelector("#open-offcanvas-advanced");w?.addEventListener("click",()=>{c({title:"最小 Offcanvas",content:"<p>这是最小可用的 Offcanvas 调用。</p>"})});S?.addEventListener("click",()=>{c({title:"系统设置",placement:"end",animation:"slide",content:"<p>这里放筛选与配置项。</p>",confirmText:"保存",cancelText:"关闭"})});T?.addEventListener("click",()=>{c({title:"顶部通知面板",placement:"top",animation:"fade",content:"<p>适合展示全局通知或快捷操作。</p>",confirmText:"知道了",cancelText:"关闭"})});M?.addEventListener("click",()=>{c({title:"底部操作面板",placement:"bottom",animation:"zoom",content:"<p>适合移动端的底部操作入口。</p>",confirmText:"继续",cancelText:"取消"})});k?.addEventListener("click",()=>{c({id:"offcanvas-advanced-demo",title:"高级 Offcanvas",placement:"start",animation:"slide",draggable:!0,dragHandle:["header","body"],autoFitSize:!0,scrollMode:"hybrid",hybridSwitchRatio:1.2,closeOnBackdrop:!0,closeOnEsc:!0,content:"<p>左侧高级面板：支持拖拽、内容自适配和生命周期提示。</p>",confirmText:"保存",cancelText:"关闭",onAfterOpen:()=>{e({title:"offcanvas",content:"高级 Offcanvas 已打开",variant:"info",duration:1200})},onAfterClose:()=>{e({title:"offcanvas",content:"高级 Offcanvas 已关闭",variant:"default",duration:1200})}})});const q=document.querySelector("#open-toast-minimal"),O=document.querySelector("#open-toast-basic"),E=document.querySelector("#open-toast-handle"),B=document.querySelector("#open-toast-queue"),L=document.querySelector("#open-toast-dup-update"),C=document.querySelector("#open-toast-dup-restart"),R=document.querySelector("#open-toast-dup-stack"),A=document.querySelector("#clear-toast");q?.addEventListener("click",()=>{e({content:"最小通知示例"})});O?.addEventListener("click",()=>{e({title:"保存成功",content:"配置已同步",placement:"top-end",variant:"success",duration:2200,maxVisible:3,showProgress:!0})});E?.addEventListener("click",()=>{const t=e({id:"manual-toast",title:"上传任务",content:"准备上传...",duration:!1,closable:!0,variant:"info"});window.setTimeout(()=>{t.update({content:"上传中 65%",variant:"warning"})},700),window.setTimeout(()=>{t.update({content:"上传完成",variant:"success",duration:1200}),t.resume()},1500)});B?.addEventListener("click",()=>{i.configure({maxVisible:3});for(let t=1;t<=6;t+=1)e({title:`队列消息 ${t}`,content:`第 ${t} 条示例提醒`,placement:"top-end",variant:"default",duration:1e3+t*250})});L?.addEventListener("click",()=>{e({id:"sync-job",title:"同步任务",content:"策略: update",variant:"info",duration:1800,duplicateStrategy:"update"})});C?.addEventListener("click",()=>{e({id:"sync-job",title:"同步任务",content:"策略: restart-timer",variant:"warning",duration:1800,duplicateStrategy:"restart-timer"})});R?.addEventListener("click",()=>{e({id:"sync-job",title:"同步任务",content:"策略: stack",variant:"success",duration:1800,duplicateStrategy:"stack"})});A?.addEventListener("click",()=>{i.closeAll()});const P=document.querySelectorAll(".copy-btn");P.forEach(t=>{t.addEventListener("click",async()=>{const a=t.dataset.copyTarget;if(!a)return;const n=document.querySelector(`#${a} code`);if(n)try{await navigator.clipboard.writeText(n.textContent??""),t.textContent="已复制",window.setTimeout(()=>{t.textContent="复制"},1200)}catch{t.textContent="复制失败",window.setTimeout(()=>{t.textContent="复制"},1200)}})});r({adjustSidebarOffset:!0});
