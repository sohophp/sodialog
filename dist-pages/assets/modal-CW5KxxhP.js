import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                  */import{o as c,c as n,d,p as s,f as r,e as a}from"./lib-Bd4HZL3A.js";import{r as i,w as p}from"./lab-shared-hq1WzFWt.js";const e=document.querySelector("#app");if(!e)throw new Error("Cannot find #app root element");e.innerHTML=`
${i("modal","Modal Lab","独立页面展示 Modal 常见与进阶用法。")}

<main class="grid">
  <section class="card">
    <h2>基础打开</h2>
    <p>最小参数 + 自定义按钮文案。</p>
    <div class="row"><button class="btn primary" id="modal-basic">运行</button></div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="modal-basic-code" type="button">复制代码</button></div>
      <div class="code"><pre id="modal-basic-code">openModal({
  title: '基础示例',
  content: '&lt;p&gt;这是 Modal Lab 的基础示例。&lt;/p&gt;',
  confirmText: '确认',
  cancelText: '取消',
})</pre></div>
      <p class="note">说明：适合替换传统 alert/confirm 的基础弹窗场景。</p>
    </details>
  </section>

  <section class="card">
    <h2>布局稳定钩子 + trace</h2>
    <p>适合第三方组件初始化时机控制。</p>
    <div class="row"><button class="btn primary" id="modal-stable">运行</button></div>
    <div class="result" id="modal-result">结果输出：等待执行...</div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="modal-stable-code" type="button">复制代码</button></div>
      <div class="code"><pre id="modal-stable-code">openDialog({
  title: '稳定时机示例',
  content: '&lt;p&gt;观察 onLayoutStable 与 action 回调输出。&lt;/p&gt;',
  traceId: 'trace-modal-lab-001',
  onLayoutStable: ({ traceId }) =&gt; {
    pushMessage('success', '布局已稳定', { traceId, duration: 1300 })
  },
  onAction: ({ action, traceId }) =&gt; {
    console.log(action, traceId)
  },
})</pre></div>
      <p class="note">说明：推荐把富文本编辑器/图表初始化放在 onLayoutStable 中。</p>
    </details>
  </section>

  <section class="card">
    <h2>Promise 组合流程</h2>
    <p>confirm + prompt + form 串行。</p>
    <div class="row"><button class="btn primary" id="modal-flow">运行</button></div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="modal-flow-code" type="button">复制代码</button></div>
      <div class="code"><pre id="modal-flow-code">const ok = await confirmModal({ title: '确认', content: '&lt;p&gt;继续执行串行流程？&lt;/p&gt;' })
if (!ok) return

const note = await promptModal({ title: '输入备注', placeholder: '请输入内容' })
if (note === null) return

await formModal({
  title: '补充信息',
  fields: [{ name: 'owner', label: '负责人', required: true }],
})

pushMessage('info', '&#96;流程完成，备注：\${note}&#96;', { duration: 1400, traceId: 'trace-modal-lab-001' })</pre></div>
      <p class="note">说明：该模式适合审批链、删除确认、信息补录等串行交互。</p>
    </details>
  </section>
</main>
`;p();document.querySelector("#modal-basic")?.addEventListener("click",()=>{c({title:"基础示例",content:"<p>这是 Modal Lab 的基础示例。</p>",confirmText:"确认",cancelText:"取消"})});document.querySelector("#modal-stable")?.addEventListener("click",()=>{const o=document.querySelector("#modal-result");n({title:"稳定时机示例",content:"<p>观察 onLayoutStable 与 action 回调输出。</p>",traceId:"trace-modal-lab-001",onLayoutStable:({traceId:t})=>{o&&(o.textContent=`结果输出：onLayoutStable 已触发（traceId=${t??"-"})`),a("success","布局已稳定",{traceId:t,duration:1300})},onAction:({action:t,traceId:l})=>{o&&(o.textContent=`结果输出：action=${t}（traceId=${l??"-"})`)}})});document.querySelector("#modal-flow")?.addEventListener("click",async()=>{if(!await d({title:"确认",content:"<p>继续执行串行流程？</p>"}))return;const t=await s({title:"输入备注",placeholder:"请输入内容"});t!==null&&(await r({title:"补充信息",fields:[{name:"owner",label:"负责人",required:!0}]}),a("info",`流程完成，备注：${t}`,{duration:1400,traceId:"trace-modal-lab-001"}))});
