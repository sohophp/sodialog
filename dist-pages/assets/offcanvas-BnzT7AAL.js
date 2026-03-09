import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                  */import{a,e as n}from"./lib-Do891IoW.js";import{r as s,w as c}from"./lab-shared-C3tuUAEJ.js";const o=document.querySelector("#app");if(!o)throw new Error("Cannot find #app root element");o.innerHTML=`
${s("offcanvas","Offcanvas Lab","独立页面展示 Offcanvas 的位置、动画和交互策略。")}
<main class="grid">
  <section class="card">
    <h2>位置与动画</h2>
    <div class="row">
      <button class="btn primary" id="open-end">右侧</button>
      <button class="btn" id="open-start">左侧</button>
      <button class="btn" id="open-top">顶部</button>
      <button class="btn" id="open-bottom">底部</button>
    </div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="offcanvas-basic-code" type="button">复制代码</button></div>
      <div class="code"><pre id="offcanvas-basic-code">const openPanel = (placement) =&gt; {
  openOffcanvas({
    title: '&#96;Offcanvas \${placement}&#96;',
    placement,
    animation: placement === 'top' || placement === 'bottom' ? 'fade' : 'slide',
    content: '&#96;&lt;p&gt;当前位置：\${placement}&lt;/p&gt;&#96;',
  })
}</pre></div>
      <p class="note">说明：顶部/底部适合移动端操作面板，左右适合筛选与配置。</p>
    </details>
  </section>

  <section class="card">
    <h2>业务动作示例</h2>
    <p>在 onAfterOpen/onAfterClose 做轻量消息通知。</p>
    <div class="row"><button class="btn primary" id="open-advanced">运行</button></div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="offcanvas-advanced-code" type="button">复制代码</button></div>
      <div class="code"><pre id="offcanvas-advanced-code">openOffcanvas({
  title: '高级 Offcanvas',
  placement: 'end',
  animation: 'slide',
  draggable: true,
  content: '&lt;p&gt;带生命周期通知。&lt;/p&gt;',
  onAfterOpen: () =&gt; pushMessage('success', 'Offcanvas 已打开', { duration: 1100 }),
  onAfterClose: () =&gt; pushMessage('info', 'Offcanvas 已关闭', { duration: 1100 }),
})</pre></div>
      <p class="note">说明：可把 onAfterClose 用于回收状态、重新拉取列表等后置动作。</p>
    </details>
  </section>
</main>
`;c();const e=t=>{a({title:`Offcanvas ${t}`,placement:t,animation:t==="top"||t==="bottom"?"fade":"slide",content:`<p>当前位置：${t}</p>`})};document.querySelector("#open-end")?.addEventListener("click",()=>e("end"));document.querySelector("#open-start")?.addEventListener("click",()=>e("start"));document.querySelector("#open-top")?.addEventListener("click",()=>e("top"));document.querySelector("#open-bottom")?.addEventListener("click",()=>e("bottom"));document.querySelector("#open-advanced")?.addEventListener("click",()=>{a({title:"高级 Offcanvas",placement:"end",animation:"slide",draggable:!0,content:"<p>带生命周期通知。</p>",onAfterOpen:()=>n("success","Offcanvas 已打开",{duration:1100}),onAfterClose:()=>n("info","Offcanvas 已关闭",{duration:1100})})});
