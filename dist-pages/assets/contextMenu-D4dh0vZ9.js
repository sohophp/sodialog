import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                  */import{b as c,e as i,o as u,i as m}from"./lib-Do891IoW.js";import{r as p,w as b}from"./lab-shared-C3tuUAEJ.js";const d=document.querySelector("#app");if(!d)throw new Error("Cannot find #app root element");d.innerHTML=`
${p("context-menu","ContextMenu Lab","独立页面展示 ContextMenu 的基础绑定、关闭策略和菜单触发弹窗时序。")}

<main class="grid">
  <section class="card">
    <h2>基础右键菜单</h2>
    <p>右键目标区域，触发基础菜单动作。</p>
    <div class="result" id="cm-basic-zone" tabindex="0">右键此区域（基础菜单）</div>
    <div class="result" id="cm-basic-result">结果输出：等待执行...</div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="cm-basic-code" type="button">复制代码</button></div>
      <div class="code"><pre id="cm-basic-code">bindContextMenu({
  target: '#cm-basic-zone',
  items: [
    { id: 'copy', label: '复制' },
    { id: 'rename', label: '重命名' },
  ],
  onAction: ({ itemId }) => console.log(itemId),
})</pre></div>
      <p class="note">说明：支持字符串选择器、单元素和元素集合绑定。</p>
    </details>
  </section>

  <section class="card">
    <h2>关闭策略与键盘交互</h2>
    <p>验证 Esc、滚动、窗口失焦等关闭路径；并观察方向键与字母快速定位（支持混合标签）。</p>
    <div class="result" id="cm-policy-zone" tabindex="0">右键此区域后，按 ArrowUp/ArrowDown，或按 d/r 定位；连续按 d 会在 Download/Delete 间轮转</div>
    <div class="result" id="cm-policy-focus-result">焦点定位：等待菜单打开...</div>
    <div class="result" id="cm-policy-typeahead-result">字母定位：等待输入...</div>
    <div class="result" id="cm-policy-action-result">最近动作：等待触发...</div>
    <div class="result" id="cm-policy-close-result">关闭原因：等待关闭...</div>
    <div class="row"><button class="btn" id="cm-open-modal">打开普通 Modal（对比入口）</button></div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="cm-policy-code" type="button">复制代码</button></div>
      <div class="code"><pre id="cm-policy-code">bindContextMenu({
  target: '#cm-policy-zone',
  closeOnEsc: true,
  closeOnScroll: true,
  closeOnWindowBlur: true,
  typeaheadResetMs: 700,
  items: [
    { id: 'download', label: '下载 Download' },
    { id: 'rename', label: '重命名 Rename' },
    { id: 'delete', label: '删除 Delete' },
  ],
  onOpen: (handle) => {
    console.log(handle.id)
  },
  onFocusItem: ({ itemId, itemElement }) => {
    console.log(itemId, itemElement.textContent)
  },
  onTypeahead: ({ query, matched, itemId }) => {
    console.log('typeahead', query, matched, itemId)
  },
  onClose: (reason) => {
    console.log('close reason', reason)
  },
})</pre></div>
      <p class="note">说明：当前支持 ArrowUp/ArrowDown/Home/End/Tab 导航，Enter/Space 激活；字母定位支持混合标签（如 删除 Delete），并在匹配项间循环。回显区会显示 focus/action/close reason。</p>
    </details>
  </section>

  <section class="card">
    <h2>菜单触发弹窗（close-first）</h2>
    <p>先关闭菜单再打开 Dialog，避免焦点和层级冲突。</p>
    <div class="result" id="cm-dialog-zone" tabindex="0">右键此区域（菜单触发弹窗）</div>
    <details class="code-panel">
      <summary>查看原始代码</summary>
      <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="cm-dialog-code" type="button">复制代码</button></div>
      <div class="code"><pre id="cm-dialog-code">const handle = bindContextMenu({
  target: '#cm-dialog-zone',
  items: [{
    id: 'open-dialog',
    label: '打开确认弹窗',
    onClick: () => {
      openDialogFromContextMenu(handle, {
        title: '来自 ContextMenu',
        content: '已执行 close-first-open-next。',
      })
    },
  }],
})</pre></div>
      <p class="note">说明：推荐通过 openDialogFromContextMenu 统一时序。</p>
    </details>
  </section>
</main>
`;b();const a=document.querySelector("#cm-basic-result");c({target:"#cm-basic-zone",items:[{id:"copy",label:"复制"},{id:"rename",label:"重命名"}],onAction:({itemId:e})=>{a&&(a.textContent=`结果输出：执行 action=${e}`),i("success",`已执行 ${e}`,{duration:1100})}});c({target:"#cm-policy-zone",closeOnEsc:!0,closeOnScroll:!0,closeOnWindowBlur:!0,typeaheadEnabled:!0,typeaheadResetMs:700,items:[{id:"download",label:"下载 Download"},{id:"rename",label:"重命名 Rename"},{id:"delete",label:"删除 Delete"}],onOpen:e=>{const t=document.querySelector("#cm-policy-focus-result");t&&(t.textContent="焦点定位：菜单已打开，使用方向键或字母进行定位。")},onFocusItem:({itemId:e,itemElement:t})=>{const o=document.querySelector("#cm-policy-focus-result"),n=(t.textContent??"").trim();o&&(o.textContent=`焦点定位：${e} (${n})`)},onTypeahead:({query:e,matched:t,itemId:o,itemElement:n})=>{const s=document.querySelector("#cm-policy-typeahead-result"),r=n?(n.textContent??"").trim():"-";s&&(s.textContent=t?`字母定位：query=${e} 命中 ${o??"-"} (${r})`:`字母定位：query=${e} 未命中`)},onAction:({itemId:e})=>{const t=document.querySelector("#cm-policy-action-result");t&&(t.textContent=`最近动作：${e}`),i("warning",`已触发动作: ${e}`,{duration:1200})},onClose:e=>{const t=document.querySelector("#cm-policy-close-result");t&&(t.textContent=`关闭原因：${e}`)}});document.querySelector("#cm-open-modal")?.addEventListener("click",()=>{u({title:"普通入口 Modal",content:"<p>用于与 ContextMenu 入口对比。</p>"})});let l=null;l=c({target:"#cm-dialog-zone",items:[{id:"open-dialog",label:"打开确认弹窗",onClick:()=>{l&&m(l,{title:"来自 ContextMenu",content:"<p>已执行 close-first-open-next。</p>"})}}]});
