import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                  */import{e,S as n,t as a}from"./lib-Bd4HZL3A.js";const s=document.querySelector("#app");if(!s)throw new Error("Cannot find #app root element");s.innerHTML=`
<header class="hero">
  <h1>Toast Lab</h1>
  <p>独立页面展示 Toast 的样式、队列与重复策略。</p>
  <nav class="nav">
    <a href="./examples.html">Examples Hub</a>
    <a href="./modal.html">Modal Lab</a>
    <a href="./offcanvas.html">Offcanvas Lab</a>
    <a href="./api.html">API</a>
    <a href="./workflow.html">流程页</a>
  </nav>
</header>
<main class="grid">
  <section class="card">
    <h2>基础消息</h2>
    <div class="row">
      <button class="btn primary" id="toast-info">info</button>
      <button class="btn" id="toast-success">success</button>
      <button class="btn" id="toast-warning">warning</button>
      <button class="btn" id="toast-danger">danger</button>
    </div>
  </section>

  <section class="card">
    <h2>队列与重复策略</h2>
    <div class="row">
      <button class="btn primary" id="toast-queue">批量队列</button>
      <button class="btn" id="toast-update">update</button>
      <button class="btn" id="toast-stack">stack</button>
      <button class="btn" id="toast-clear">清空</button>
    </div>
  </section>
</main>
`;document.querySelector("#toast-info")?.addEventListener("click",()=>e("info","普通提示"));document.querySelector("#toast-success")?.addEventListener("click",()=>e("success","保存成功"));document.querySelector("#toast-warning")?.addEventListener("click",()=>e("warning","请注意输入"));document.querySelector("#toast-danger")?.addEventListener("click",()=>e("danger","请求失败"));document.querySelector("#toast-queue")?.addEventListener("click",()=>{n.configure({maxVisible:3});for(let t=1;t<=6;t+=1)a({title:`队列 ${t}`,content:`消息 ${t}`,duration:1e3+t*180})});document.querySelector("#toast-update")?.addEventListener("click",()=>{a({id:"sync-task",title:"同步任务",content:"策略 update",duplicateStrategy:"update",variant:"info",duration:1600})});document.querySelector("#toast-stack")?.addEventListener("click",()=>{a({id:"sync-task",title:"同步任务",content:"策略 stack",duplicateStrategy:"stack",variant:"success",duration:1600})});document.querySelector("#toast-clear")?.addEventListener("click",()=>{n.closeAll()});
