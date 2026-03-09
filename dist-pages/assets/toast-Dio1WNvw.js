import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                  */import{e,S as a,t as s}from"./lib-Bd4HZL3A.js";import{r as n,w as c}from"./lab-shared-hq1WzFWt.js";const o=document.querySelector("#app");if(!o)throw new Error("Cannot find #app root element");o.innerHTML=`
${n("toast","Toast Lab","独立页面展示 Toast 的样式、队列与重复策略。")}
<main class="grid">
  <section class="card">
    <h2>基础消息</h2>
    <div class="row">
      <button class="btn primary" id="toast-info">info</button>
      <button class="btn" id="toast-success">success</button>
      <button class="btn" id="toast-warning">warning</button>
      <button class="btn" id="toast-danger">danger</button>
    </div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="toast-basic-code" type="button">复制代码</button></div>
      <div class="code"><pre id="toast-basic-code">pushMessage('info', '普通提示')
pushMessage('success', '保存成功')
pushMessage('warning', '请注意输入')
pushMessage('danger', '请求失败')</pre></div>
      <p class="note">说明：业务层推荐统一走 pushMessage，便于后续全局策略收敛。</p>
    </details>
  </section>

  <section class="card">
    <h2>队列与重复策略</h2>
    <div class="row">
      <button class="btn primary" id="toast-queue">批量队列</button>
      <button class="btn" id="toast-update">update</button>
      <button class="btn" id="toast-stack">stack</button>
      <button class="btn" id="toast-clear">清空</button>
    </div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="toast-queue-code" type="button">复制代码</button></div>
      <div class="code"><pre id="toast-queue-code">SoToast.configure({ maxVisible: 3 })
for (let index = 1; index &lt;= 6; index += 1) {
  toast({ title: '&#96;队列 \${index}&#96;', content: '&#96;消息 \${index}&#96;', duration: 1000 + index * 180 })
}

toast({ id: 'sync-task', content: '策略 update', duplicateStrategy: 'update' })
toast({ id: 'sync-task', content: '策略 stack', duplicateStrategy: 'stack' })
SoToast.closeAll()</pre></div>
      <p class="note">说明：相同 id 下，update 复用实例，stack 会叠加新实例。</p>
    </details>
  </section>
</main>
`;c();document.querySelector("#toast-info")?.addEventListener("click",()=>e("info","普通提示"));document.querySelector("#toast-success")?.addEventListener("click",()=>e("success","保存成功"));document.querySelector("#toast-warning")?.addEventListener("click",()=>e("warning","请注意输入"));document.querySelector("#toast-danger")?.addEventListener("click",()=>e("danger","请求失败"));document.querySelector("#toast-queue")?.addEventListener("click",()=>{a.configure({maxVisible:3});for(let t=1;t<=6;t+=1)s({title:`队列 ${t}`,content:`消息 ${t}`,duration:1e3+t*180})});document.querySelector("#toast-update")?.addEventListener("click",()=>{s({id:"sync-task",title:"同步任务",content:"策略 update",duplicateStrategy:"update",variant:"info",duration:1600})});document.querySelector("#toast-stack")?.addEventListener("click",()=>{s({id:"sync-task",title:"同步任务",content:"策略 stack",duplicateStrategy:"stack",variant:"success",duration:1600})});document.querySelector("#toast-clear")?.addEventListener("click",()=>{a.closeAll()});
