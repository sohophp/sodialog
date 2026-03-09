import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                  */import{a,e as n}from"./lib-Bd4HZL3A.js";const o=document.querySelector("#app");if(!o)throw new Error("Cannot find #app root element");o.innerHTML=`
<header class="hero">
  <h1>Offcanvas Lab</h1>
  <p>独立页面展示 Offcanvas 的位置、动画和交互策略。</p>
  <nav class="nav">
    <a href="./examples.html">Examples Hub</a>
    <a href="./modal.html">Modal Lab</a>
    <a href="./toast.html">Toast Lab</a>
    <a href="./api.html">API</a>
    <a href="./workflow.html">流程页</a>
  </nav>
</header>
<main class="grid">
  <section class="card">
    <h2>位置与动画</h2>
    <div class="row">
      <button class="btn primary" id="open-end">右侧</button>
      <button class="btn" id="open-start">左侧</button>
      <button class="btn" id="open-top">顶部</button>
      <button class="btn" id="open-bottom">底部</button>
    </div>
  </section>

  <section class="card">
    <h2>业务动作示例</h2>
    <p>在 onAfterOpen/onAfterClose 做轻量消息通知。</p>
    <div class="row"><button class="btn primary" id="open-advanced">运行</button></div>
  </section>
</main>
`;const e=t=>{a({title:`Offcanvas ${t}`,placement:t,animation:t==="top"||t==="bottom"?"fade":"slide",content:`<p>当前位置：${t}</p>`})};document.querySelector("#open-end")?.addEventListener("click",()=>e("end"));document.querySelector("#open-start")?.addEventListener("click",()=>e("start"));document.querySelector("#open-top")?.addEventListener("click",()=>e("top"));document.querySelector("#open-bottom")?.addEventListener("click",()=>e("bottom"));document.querySelector("#open-advanced")?.addEventListener("click",()=>{a({title:"高级 Offcanvas",placement:"end",animation:"slide",draggable:!0,content:"<p>带生命周期通知。</p>",onAfterOpen:()=>n("success","Offcanvas 已打开",{duration:1100}),onAfterClose:()=>n("info","Offcanvas 已关闭",{duration:1100})})});
