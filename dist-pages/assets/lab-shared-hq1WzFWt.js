const l=[{key:"hub",href:"./examples.html",label:"Examples Hub"},{key:"modal",href:"./modal.html",label:"Modal Lab"},{key:"offcanvas",href:"./offcanvas.html",label:"Offcanvas Lab"},{key:"toast",href:"./toast.html",label:"Toast Lab"},{key:"workflow",href:"./workflow.html",label:"开发/发布流程"},{key:"api",href:"./api.html",label:"API"}];function s(r,a,e){const t=l.map(o=>`<a class="${o.key===r?"active":""}" href="${o.href}">${o.label}</a>`).join("");return`
<header class="hero">
  <div class="hero-top">
    <div class="brand-block">
      <img class="brand-logo" src="./logo.ico" alt="SoDialog Logo" width="34" height="34" />
      <div class="brand-copy">
        <strong class="brand-name">SoDialog</strong>
        <span class="tag">${a}</span>
      </div>
    </div>
  </div>
  <h1>${a}</h1>
  <p>${e}</p>
  <nav class="nav">
    ${t}
    <a href="./index.html">文档首页</a>
    <a href="./demo.html">原版 Demo</a>
  </nav>
</header>
`}function c(){document.querySelectorAll(".code-copy-btn").forEach(a=>{a.addEventListener("click",async()=>{const e=a.dataset.copyTarget;if(!e)return;const t=document.querySelector(`#${e}`);if(t){try{await navigator.clipboard.writeText(t.textContent??""),a.textContent="已复制"}catch{a.textContent="复制失败"}window.setTimeout(()=>{a.textContent="复制代码"},1100)}})})}export{s as r,c as w};
