import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                  */import{r as i}from"./lab-shared-C3tuUAEJ.js";const e=document.querySelector("#app");if(!e)throw new Error("Cannot find #app root element");e.innerHTML=`
${i("workflow","开发与发布流程","将开发流程和发布流程合并到一页，并补充 API 同步机制。")}

<main class="stack">
  <section class="card">
    <h2>1. 日常开发流程</h2>
    <ul>
      <li>开发中: <code>npm run dev</code></li>
      <li>代码检查: <code>npm run lint</code></li>
      <li>测试验证: <code>npm run test:run</code></li>
      <li>构建产物: <code>npm run build</code></li>
      <li>文档演示同步: <code>npm run build:demo</code></li>
    </ul>
  </section>

  <section class="card">
    <h2>2. API 同步策略（每次 commit 后）</h2>
    <p>仓库内置 <code>post-commit</code> hook，会在每次 commit 后自动触发 API 演示构建同步。</p>
    <div class="code"><pre>git config core.hooksPath .githooks
# commit 后自动执行：npm run build:demo</pre></div>
    <p>建议在下一次提交时把变更后的 <code>dist-pages/api.html</code> 与对应 <code>dist-pages/assets/api-*.js</code> 一并提交。</p>
  </section>

  <section class="card">
    <h2>3. 发布流程（Tag 驱动）</h2>
    <div class="code"><pre>npm run release:check -- vX.Y.Z
npm run test:run
npm run lint
npm run build
npm run build:demo
git add -A
git commit -m "release: vX.Y.Z"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push --follow-tags</pre></div>
  </section>

  <section class="card">
    <h2>4. 发布前核对清单</h2>
    <ul>
      <li>功能代码 + 测试 + 文档 + 演示页面是否同阶段提交</li>
      <li>API 文档页是否与最新导出能力一致</li>
      <li>examples hub 与独立 lab 页面跳转是否可用</li>
      <li>版本号与 tag 是否一致（<code>release:check</code>）</li>
    </ul>
  </section>
</main>
`;
