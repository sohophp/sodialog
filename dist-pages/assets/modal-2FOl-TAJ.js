import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                  */import{o as l,c as r,d as c,p as s,f as i,e}from"./lib-Bd4HZL3A.js";const o=document.querySelector("#app");if(!o)throw new Error("Cannot find #app root element");o.innerHTML=`
<header class="hero">
  <h1>Modal Lab</h1>
  <p>独立页面展示 Modal 常见与进阶用法。</p>
  <nav class="nav">
    <a href="./examples.html">Examples Hub</a>
    <a href="./offcanvas.html">Offcanvas Lab</a>
    <a href="./toast.html">Toast Lab</a>
    <a href="./api.html">API</a>
    <a href="./workflow.html">流程页</a>
  </nav>
</header>

<main class="grid">
  <section class="card">
    <h2>基础打开</h2>
    <p>最小参数 + 自定义按钮文案。</p>
    <div class="row"><button class="btn primary" id="modal-basic">运行</button></div>
  </section>

  <section class="card">
    <h2>布局稳定钩子 + trace</h2>
    <p>适合第三方组件初始化时机控制。</p>
    <div class="row"><button class="btn primary" id="modal-stable">运行</button></div>
    <div class="result" id="modal-result">结果输出：等待执行...</div>
    <div class="code"><pre>openDialog({ traceId, onLayoutStable, onAction })</pre></div>
  </section>

  <section class="card">
    <h2>Promise 组合流程</h2>
    <p>confirm + prompt + form 串行。</p>
    <div class="row"><button class="btn primary" id="modal-flow">运行</button></div>
  </section>
</main>
`;document.querySelector("#modal-basic")?.addEventListener("click",()=>{l({title:"基础示例",content:"<p>这是 Modal Lab 的基础示例。</p>",confirmText:"确认",cancelText:"取消"})});document.querySelector("#modal-stable")?.addEventListener("click",()=>{const t=document.querySelector("#modal-result");r({title:"稳定时机示例",content:"<p>观察 onLayoutStable 与 action 回调输出。</p>",traceId:"trace-modal-lab-001",onLayoutStable:({traceId:a})=>{t&&(t.textContent=`结果输出：onLayoutStable 已触发（traceId=${a??"-"})`),e("success","布局已稳定",{traceId:a,duration:1300})},onAction:({action:a,traceId:n})=>{t&&(t.textContent=`结果输出：action=${a}（traceId=${n??"-"})`)}})});document.querySelector("#modal-flow")?.addEventListener("click",async()=>{if(!await c({title:"确认",content:"<p>继续执行串行流程？</p>"}))return;const a=await s({title:"输入备注",placeholder:"请输入内容"});a!==null&&(await i({title:"补充信息",fields:[{name:"owner",label:"负责人",required:!0}]}),e("info",`流程完成，备注：${a}`,{duration:1400,traceId:"trace-modal-lab-001"}))});
