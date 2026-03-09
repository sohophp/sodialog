import './api-style.css'
import { setupPinnedHeroTop } from './pinned-hero-top'
import { renderLabHeader, wireCodeCopyButtons } from './lab-shared'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Cannot find #app root element')
}

app.innerHTML = `
  ${renderLabHeader('api', 'API Reference', '本页汇总 SoDialog 当前公开方法与主要类型参数，按功能模块拆分并提供默认值、类型和行为说明。')}

  <main class="layout">
    <aside class="card side-nav" aria-label="API 导航">
      <h2>API 目录</h2>

      <div class="nav-group">
        <a class="nav-l1" href="#all-methods">全部方法总览</a>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#adapter-api">Adapter First</a>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#global-config">全局配置</a>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#dialog-core">Dialog 核心</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#open-modal">openModal</a>
          <a class="nav-l2" href="#open-offcanvas">openOffcanvas</a>
          <a class="nav-l2" href="#bind-context-menu">bindContextMenu</a>
          <a class="nav-l2" href="#dialog-open">SoDialog.open</a>
          <a class="nav-l2" href="#dialog-handle">SoDialogHandle</a>
          <a class="nav-l2" href="#footer-button">SoDialogFooterButton</a>
          <a class="nav-l2" href="#lifecycle">生命周期回调</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#promise-api">Promise API</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#confirm-modal">confirmModal / SoDialog.confirm</a>
          <a class="nav-l2" href="#prompt-modal">promptModal / SoDialog.prompt</a>
          <a class="nav-l2" href="#form-modal">formModal / SoDialog.form</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#toast-api">Toast API</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#toast-show">toast / SoToast.show</a>
          <a class="nav-l2" href="#toast-handle">SoToastHandle</a>
          <a class="nav-l2" href="#toast-manage">SoToast.configure / clear / closeAll</a>
          <a class="nav-l2" href="#toast-shortcuts">SoToast.success/error/info/warning</a>
        </div>
      </div>

      <div class="nav-group">
        <a class="nav-l1" href="#types">常用类型</a>
        <div class="nav-l2-list">
          <a class="nav-l2" href="#type-dialog">Dialog 相关类型</a>
          <a class="nav-l2" href="#type-toast">Toast 相关类型</a>
        </div>
      </div>
    </aside>

    <div class="content">
      <section class="card" id="all-methods">
        <h2 class="section-title">全部方法总览</h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead>
              <tr>
                <th>方法</th>
                <th>签名</th>
                <th>返回值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>configureAdapter</code></td>
                <td><code>(config: SoAdapterConfig)</code></td>
                <td><code>void</code></td>
              </tr>
              <tr>
                <td><code>configureDialog</code></td>
                <td><code>(config: SoDialogGlobalConfig)</code></td>
                <td><code>void</code></td>
              </tr>
              <tr>
                <td><code>configureContextMenu</code></td>
                <td><code>(config: SoContextMenuGlobalConfig)</code></td>
                <td><code>void</code></td>
              </tr>
              <tr>
                <td><code>openDialog</code></td>
                <td><code>(options: SoDialogOptions)</code></td>
                <td><code>SoDialogHandle</code></td>
              </tr>
              <tr>
                <td><code>bindDialogContextMenu</code></td>
                <td><code>(options: SoContextMenuOptions)</code></td>
                <td><code>SoContextMenuHandle</code></td>
              </tr>
              <tr>
                <td><code>openDialogFromContextMenu</code></td>
                <td><code>(menuHandle: SoContextMenuHandle, options: SoDialogOptions)</code></td>
                <td><code>SoDialogHandle</code></td>
              </tr>
              <tr>
                <td><code>pushMessage</code></td>
                <td><code>(level: SoMessageLevel, content: string | Node, options?: SoPushMessageOptions)</code></td>
                <td><code>SoToastHandle</code></td>
              </tr>
              <tr>
                <td><code>openModal</code></td>
                <td><code>(options: SoDialogModalOptions)</code></td>
                <td><code>SoDialogHandle</code></td>
              </tr>
              <tr>
                <td><code>openOffcanvas</code></td>
                <td><code>(options: Omit&lt;SoDialogOffcanvasOptions, 'kind'&gt;)</code></td>
                <td><code>SoDialogHandle</code></td>
              </tr>
              <tr>
                <td><code>confirmModal</code></td>
                <td><code>(options?: SoDialogConfirmOptions)</code></td>
                <td><code>Promise&lt;boolean&gt;</code></td>
              </tr>
              <tr>
                <td><code>promptModal</code></td>
                <td><code>(options?: SoDialogPromptOptions)</code></td>
                <td><code>Promise&lt;string | null&gt;</code></td>
              </tr>
              <tr>
                <td><code>formModal</code></td>
                <td><code>(options: SoDialogFormOptions)</code></td>
                <td><code>Promise&lt;Record&lt;string, SoDialogFormValue&gt; | null&gt;</code></td>
              </tr>
              <tr>
                <td><code>toast</code></td>
                <td><code>(options: SoToastOptions)</code></td>
                <td><code>SoToastHandle</code></td>
              </tr>
              <tr>
                <td><code>bindContextMenu</code></td>
                <td><code>(options: SoContextMenuOptions)</code></td>
                <td><code>SoContextMenuHandle</code></td>
              </tr>
              <tr>
                <td><code>SoDialog.open</code></td>
                <td><code>(options: SoDialogOptions)</code></td>
                <td><code>SoDialogHandle</code></td>
              </tr>
              <tr>
                <td><code>SoDialog.openModal</code></td>
                <td><code>(options: SoDialogModalOptions)</code></td>
                <td><code>SoDialogHandle</code></td>
              </tr>
              <tr>
                <td><code>SoDialog.openOffcanvas</code></td>
                <td><code>(options: Omit&lt;SoDialogOffcanvasOptions, 'kind'&gt;)</code></td>
                <td><code>SoDialogHandle</code></td>
              </tr>
              <tr>
                <td><code>SoDialog.confirm</code></td>
                <td><code>(options?: SoDialogConfirmOptions)</code></td>
                <td><code>Promise&lt;boolean&gt;</code></td>
              </tr>
              <tr>
                <td><code>SoDialog.prompt</code></td>
                <td><code>(options?: SoDialogPromptOptions)</code></td>
                <td><code>Promise&lt;string | null&gt;</code></td>
              </tr>
              <tr>
                <td><code>SoDialog.form</code></td>
                <td><code>(options: SoDialogFormOptions)</code></td>
                <td><code>Promise&lt;Record&lt;string, SoDialogFormValue&gt; | null&gt;</code></td>
              </tr>
              <tr>
                <td><code>SoToast.show</code></td>
                <td><code>(options: SoToastOptions)</code></td>
                <td><code>SoToastHandle</code></td>
              </tr>
              <tr>
                <td><code>SoToast.clear</code></td>
                <td><code>(placement?: SoToastPlacement)</code></td>
                <td><code>void</code></td>
              </tr>
              <tr>
                <td><code>SoToast.configure</code></td>
                <td><code>(defaults: Partial&lt;SoToastOptions&gt;)</code></td>
                <td><code>void</code></td>
              </tr>
              <tr>
                <td><code>SoToast.success</code></td>
                <td><code>(content: string | Node, options?)</code></td>
                <td><code>SoToastHandle</code></td>
              </tr>
              <tr>
                <td><code>SoToast.error</code></td>
                <td><code>(content: string | Node, options?)</code></td>
                <td><code>SoToastHandle</code></td>
              </tr>
              <tr>
                <td><code>SoToast.info</code></td>
                <td><code>(content: string | Node, options?)</code></td>
                <td><code>SoToastHandle</code></td>
              </tr>
              <tr>
                <td><code>SoToast.warning</code></td>
                <td><code>(content: string | Node, options?)</code></td>
                <td><code>SoToastHandle</code></td>
              </tr>
              <tr>
                <td><code>SoToast.closeAll</code></td>
                <td><code>()</code></td>
                <td><code>void</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="adapter-api">
        <h2 class="section-title">Adapter First</h2>
        <p class="desc">推荐业务层优先使用适配层：<code>configureAdapter</code>、<code>openDialog</code>、<code>bindDialogContextMenu</code>、<code>pushMessage</code>，用于统一默认策略与行为。</p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>配置项</th><th>类型</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>diagnosticsEnabled</code></td><td><code>boolean</code></td><td>启用适配层诊断日志聚合（默认关闭）。</td></tr>
              <tr><td><code>logger</code></td><td><code>(event: SoAdapterLogEvent) =&gt; void</code></td><td>自定义日志出口，建议对接业务日志系统。</td></tr>
            </tbody>
          </table>
        </div>
        <details class="code-panel">
          <summary>查看原始代码：Adapter 配置与调用</summary>
          <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="api-adapter-code" type="button">复制代码</button></div>
          <div class="code"><pre id="api-adapter-code">configureAdapter({
  modalDefaults: { closeOnEsc: true, footerAlign: 'center' },
  toastDefaults: { placement: 'top-end', maxVisible: 4 },
  diagnosticsEnabled: true,
})

openDialog({
  title: '删除确认',
  content: '&lt;p&gt;是否继续删除？&lt;/p&gt;',
  traceId: 'trace-order-001',
})

pushMessage('success', '操作成功', { traceId: 'trace-order-001' })</pre></div>
          <p class="note">说明：业务层统一走 adapter API，后续切换默认策略时只需修改一处。</p>
        </details>
      </section>

      <section class="card" id="global-config">
        <h2 class="section-title">全局配置（Global Configure）</h2>
        <p class="desc">用于直接配置 SoDialog / SoContextMenu 默认行为，适合不走 adapter 的场景。</p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>方法</th><th>签名</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>configureDialog</code></td><td><code>(config: SoDialogGlobalConfig) =&gt; void</code></td><td>配置 modal/offcanvas 默认参数。</td></tr>
              <tr><td><code>configureContextMenu</code></td><td><code>(config: SoContextMenuGlobalConfig) =&gt; void</code></td><td>配置菜单关闭策略、偏移、尺寸、attrs 等默认参数。</td></tr>
            </tbody>
          </table>
        </div>
        <details class="code-panel">
          <summary>查看原始代码：全局默认值</summary>
          <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="api-global-config-code" type="button">复制代码</button></div>
          <div class="code"><pre id="api-global-config-code">configureDialog({
  modalDefaults: { footerAlign: 'center', closeOnEsc: true },
  offcanvasDefaults: { placement: 'start' },
})

configureContextMenu({
  closeOnEsc: false,
  minWidth: 220,
  attrs: { 'data-menu-scope': 'global-default' },
})</pre></div>
          <p class="note">说明：业务层可将这组配置放在 app 启动入口，一次设置全局生效。</p>
        </details>
      </section>

      <section class="card" id="quick-snippets">
        <h2 class="section-title">快速代码片段</h2>
        <p class="desc">常用调用模式可直接展开复制，便于对照类型说明快速接入。</p>

        <details class="code-panel">
          <summary>Promise 串行流程</summary>
          <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="api-promise-code" type="button">复制代码</button></div>
          <div class="code"><pre id="api-promise-code">const confirmed = await confirmModal({ title: '确认', content: '&lt;p&gt;继续发布吗？&lt;/p&gt;' })
if (!confirmed) return

const remark = await promptModal({ title: '输入备注', placeholder: '请输入内容' })
if (remark === null) return

await formModal({
  title: '发布信息',
  fields: [{ name: 'owner', label: '负责人', required: true }],
})</pre></div>
          <p class="note">说明：推荐用于审批、删除确认、补录信息等串行交互。</p>
        </details>

        <details class="code-panel">
          <summary>Toast 队列与重复策略</summary>
          <div class="code-toolbar"><button class="code-copy-btn" data-copy-target="api-toast-code" type="button">复制代码</button></div>
          <div class="code"><pre id="api-toast-code">SoToast.configure({ maxVisible: 3 })

toast({ id: 'sync-task', content: '策略 update', duplicateStrategy: 'update' })
toast({ id: 'sync-task', content: '策略 stack', duplicateStrategy: 'stack' })</pre></div>
          <p class="note">说明：相同 id 下，update 复用实例，stack 追加新实例。</p>
        </details>
      </section>

      <section class="card" id="dialog-core">
        <h2 class="section-title">Dialog 核心</h2>
        <p class="desc">核心入口包括 <code>openModal</code>、<code>openOffcanvas</code>、<code>bindContextMenu</code> 与统一入口 <code>SoDialog.open</code>。</p>
      </section>

      <section class="card" id="open-modal">
        <h2 class="section-title"><span class="mono">openModal(options)</span></h2>
        <p class="desc"><code>openModal(options: SoDialogModalOptions): SoDialogHandle</code></p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>title</code></td><td><code>string</code></td><td>-</td><td>标题，必填。</td></tr>
              <tr><td><code>content</code></td><td><code>string | Node</code></td><td>-</td><td>内容，必填。</td></tr>
              <tr><td><code>id</code></td><td><code>string</code></td><td>自动生成</td><td>实例 ID；同 ID 可复用。</td></tr>
              <tr><td><code>position</code></td><td><code>'center' | 'top' | 'bottom'</code></td><td><code>'center'</code></td><td>弹窗位置。</td></tr>
              <tr><td><code>animation</code></td><td><code>'slide' | 'fade' | 'zoom'</code></td><td><code>'fade'</code></td><td>弹窗动画。</td></tr>
              <tr><td><code>useModal</code></td><td><code>boolean</code></td><td><code>true</code></td><td><code>true</code> 使用 <code>showModal()</code>，否则 <code>show()</code>。</td></tr>
              <tr><td><code>draggable</code></td><td><code>boolean</code></td><td><code>false</code></td><td>启用拖拽。</td></tr>
              <tr><td><code>dragHandle</code></td><td><code>SoModalDragHandle</code></td><td><code>'header'</code></td><td>拖拽手柄，支持数组与 CSS 选择器。</td></tr>
              <tr><td><code>autoFitSize</code></td><td><code>boolean</code></td><td><code>true</code></td><td>自动尺寸适配。</td></tr>
              <tr><td><code>scrollMode</code></td><td><code>'body' | 'hybrid' | 'viewport' | 'none'</code></td><td><code>'body'</code></td><td>滚动策略。</td></tr>
              <tr><td><code>hybridSwitchRatio</code></td><td><code>number</code></td><td><code>1.35</code></td><td><code>hybrid</code> 模式切换阈值。</td></tr>
              <tr><td><code>refitOnContentChange</code></td><td><code>boolean</code></td><td><code>true</code></td><td>内容变化自动重算。</td></tr>
              <tr><td><code>autoFitMinWidth</code></td><td><code>number</code></td><td><code>280</code></td><td>自动尺寸最小宽度。</td></tr>
              <tr><td><code>autoFitMinHeight</code></td><td><code>number</code></td><td><code>160</code></td><td>自动尺寸最小高度。</td></tr>
              <tr><td><code>confirmText</code></td><td><code>string</code></td><td><code>'确认'</code></td><td>确认按钮文案。</td></tr>
              <tr><td><code>cancelText</code></td><td><code>string</code></td><td><code>'取消'</code></td><td>取消按钮文案。</td></tr>
              <tr><td><code>traceId</code></td><td><code>string</code></td><td>-</td><td>链路追踪 ID，会透传到生命周期和动作回调。</td></tr>
              <tr><td><code>onLayoutStable</code></td><td><code>(context: SoLayoutStableContext) =&gt; void</code></td><td>-</td><td>布局稳定后回调，适合初始化第三方组件。</td></tr>
              <tr><td><code>layoutStableFrames</code></td><td><code>number</code></td><td><code>2</code></td><td>布局稳定延时帧数（每帧约 16ms）。</td></tr>
              <tr><td><code>layoutStableOnRefit</code></td><td><code>boolean</code></td><td><code>false</code></td><td>手动 <code>refit()</code> 后是否再次触发稳定回调。</td></tr>
              <tr><td><code>confirmAction</code></td><td><code>'hide' | 'destroy'</code></td><td><code>'hide'</code></td><td>确认动作；显式 <code>id</code> 时内部默认偏向销毁策略。</td></tr>
              <tr><td><code>closeOnBackdrop</code></td><td><code>boolean</code></td><td><code>true</code></td><td>点击遮罩关闭。</td></tr>
              <tr><td><code>closeOnEsc</code></td><td><code>boolean</code></td><td><code>true</code></td><td>按 Esc 关闭。</td></tr>
              <tr><td><code>footerButtons</code></td><td><code>SoDialogFooterButton[]</code></td><td>默认双按钮</td><td>自定义底部按钮。</td></tr>
              <tr><td><code>hideFooter</code></td><td><code>boolean</code></td><td><code>false</code></td><td>隐藏底部区域。</td></tr>
              <tr><td><code>footerAlign</code></td><td><code>'start' | 'center' | 'end' | 'between'</code></td><td><code>'end'</code></td><td>底部按钮对齐。</td></tr>
              <tr><td><code>onConfirm</code></td><td><code>() =&gt; void</code></td><td>-</td><td>确认回调。</td></tr>
              <tr><td><code>onCancel</code></td><td><code>() =&gt; void</code></td><td>-</td><td>取消回调。</td></tr>
              <tr><td><code>onAction</code></td><td><code>SoDialogActionListener</code></td><td>-</td><td>统一监听底部动作。</td></tr>
              <tr><td><code>onCreated</code></td><td><code>(handle: SoDialogHandle) =&gt; void</code></td><td>-</td><td>实例首次创建后触发。</td></tr>
              <tr><td><code>onReused</code></td><td><code>(handle: SoDialogHandle) =&gt; void</code></td><td>-</td><td>复用实例后触发。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="open-offcanvas">
        <h2 class="section-title"><span class="mono">openOffcanvas(options)</span></h2>
        <p class="desc"><code>openOffcanvas(options: Omit&lt;SoDialogOffcanvasOptions, 'kind'&gt;): SoDialogHandle</code></p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>placement</code></td><td><code>'start' | 'end' | 'top' | 'bottom'</code></td><td><code>'end'</code></td><td>抽屉方向。</td></tr>
              <tr><td><code>animation</code></td><td><code>'slide' | 'fade' | 'zoom'</code></td><td><code>'slide'</code></td><td>抽屉动画。</td></tr>
              <tr><td colspan="4">其余参数与 <code>SoDialogBaseOptions</code> 一致。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="bind-context-menu">
        <h2 class="section-title"><span class="mono">bindContextMenu(options)</span></h2>
        <p class="desc"><code>bindContextMenu(options: SoContextMenuOptions): SoContextMenuHandle</code></p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>target</code></td><td><code>string | Element | Iterable&lt;Element&gt; | ArrayLike&lt;Element&gt;</code></td><td>-</td><td>右键触发目标；字符串时使用委托绑定。</td></tr>
              <tr><td><code>items</code></td><td><code>SoContextMenuItem[]</code></td><td>-</td><td>菜单项列表。</td></tr>
              <tr><td><code>id</code></td><td><code>string</code></td><td>自动生成</td><td>菜单实例 ID。</td></tr>
              <tr><td><code>traceId</code></td><td><code>string</code></td><td>-</td><td>链路追踪 ID，会透传到生命周期和动作回调。</td></tr>
              <tr><td><code>offsetX</code></td><td><code>number</code></td><td><code>0</code></td><td>X 轴偏移。</td></tr>
              <tr><td><code>offsetY</code></td><td><code>number</code></td><td><code>0</code></td><td>Y 轴偏移。</td></tr>
              <tr><td><code>minWidth</code></td><td><code>number</code></td><td><code>180</code></td><td>最小宽度（最小限制 120）。</td></tr>
              <tr><td><code>maxHeight</code></td><td><code>number</code></td><td><code>320</code></td><td>最大高度（最小限制 120）。</td></tr>
              <tr><td><code>closeOnOutsideClick</code></td><td><code>boolean</code></td><td><code>true</code></td><td>点击菜单外关闭。</td></tr>
              <tr><td><code>closeOnEsc</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Esc 关闭。</td></tr>
              <tr><td><code>closeOnWindowBlur</code></td><td><code>boolean</code></td><td><code>true</code></td><td>窗口失焦时关闭。</td></tr>
              <tr><td><code>closeOnScroll</code></td><td><code>boolean</code></td><td><code>true</code></td><td>窗口或容器滚动时关闭。</td></tr>
              <tr><td><code>closeOnResize</code></td><td><code>boolean</code></td><td><code>true</code></td><td>窗口尺寸变化时关闭。</td></tr>
              <tr><td><code>preventNativeMenu</code></td><td><code>boolean</code></td><td><code>true</code></td><td>阻止浏览器原生右键菜单。</td></tr>
              <tr><td><code>typeaheadResetMs</code></td><td><code>number</code></td><td><code>450</code></td><td>字母定位 query 重置时间（毫秒，最小 120）。</td></tr>
              <tr><td><code>onOpen</code></td><td><code>(handle: SoContextMenuHandle) =&gt; void</code></td><td>-</td><td>打开后回调。</td></tr>
              <tr><td><code>onClose</code></td><td><code>(reason, handle) =&gt; void</code></td><td>-</td><td>关闭后回调。</td></tr>
              <tr><td><code>onAction</code></td><td><code>(context) =&gt; void</code></td><td>-</td><td>菜单项点击回调。</td></tr>
              <tr><td><code>onFocusItem</code></td><td><code>(context) =&gt; void</code></td><td>-</td><td>键盘定位到菜单项时回调，适合做可视化回显。</td></tr>
              <tr><td><code>onTypeahead</code></td><td><code>(context) =&gt; void</code></td><td>-</td><td>字母定位时回调，支持观察命中/未命中与当前 query。</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="sub-title"><span class="mono">SoContextMenuItem</span></h3>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>id</code></td><td><code>string</code></td><td>菜单项 ID。</td></tr>
              <tr><td><code>label</code></td><td><code>string | Node</code></td><td>菜单项文本或自定义节点。</td></tr>
              <tr><td><code>icon</code></td><td><code>string | Node</code></td><td>图标；字符串会渲染为 <code>&lt;i class="..."&gt;&lt;/i&gt;</code>，可直接传 Bootstrap Icons 类名。</td></tr>
              <tr><td><code>iconPosition</code></td><td><code>'start' | 'end'</code></td><td>图标位置，默认 <code>start</code>。</td></tr>
              <tr><td><code>iconAriaLabel</code></td><td><code>string</code></td><td>图标无文本时可访问性描述。</td></tr>
              <tr><td><code>disabled</code></td><td><code>boolean</code></td><td>是否禁用。</td></tr>
              <tr><td><code>closeOnClick</code></td><td><code>boolean</code></td><td>点击后是否关闭，默认 <code>true</code>。</td></tr>
              <tr><td><code>onClick</code></td><td><code>(context) =&gt; void | boolean | Promise&lt;void | boolean&gt;</code></td><td>返回 <code>false</code> 可阻止关闭。</td></tr>
            </tbody>
          </table>
        </div>
        <p class="desc">Bootstrap Icons 示例：先引入 <code>bootstrap-icons.min.css</code>，然后使用 <code>icon: 'bi bi-pencil-square'</code>。键盘支持 ArrowUp/ArrowDown/Home/End/Tab 导航，Enter/Space 激活，输入首字母可快速定位菜单项；混合标签（如 <code>删除 Delete</code>）也可匹配，并会在同字母命中项间循环。可通过 <code>typeaheadResetMs</code> 调整 query 重置窗口；可在 <code>onFocusItem(context)</code> 中观察定位项，在 <code>onTypeahead(context)</code> 中观察当前 query 与命中结果，在 <code>onClose(reason)</code> 中观察关闭原因（<code>esc/outside/item/blur/scroll/resize/programmatic</code>）。</p>
      </section>

      <section class="card" id="dialog-open">
        <h2 class="section-title"><span class="mono">SoDialog.open(options)</span></h2>
        <p class="desc"><code>SoDialog.open(options: SoDialogOptions): SoDialogHandle</code></p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>kind</code></td><td><code>'modal' | 'offcanvas'</code></td><td><code>'modal'</code></td><td>指定打开组件类型。</td></tr>
              <tr><td colspan="4">其余参数与 <code>openModal/openOffcanvas</code> 保持一致。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="dialog-handle">
        <h2 class="section-title"><span class="mono">SoDialogHandle</span></h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>dialog</code></td><td><code>HTMLDialogElement</code></td><td>底层原生节点。</td></tr>
              <tr><td><code>id</code></td><td><code>string | undefined</code></td><td>实例 ID。</td></tr>
              <tr><td><code>close()</code></td><td><code>() =&gt; void</code></td><td>关闭弹窗。</td></tr>
              <tr><td><code>refit()</code></td><td><code>() =&gt; void</code></td><td>触发重新计算尺寸。</td></tr>
              <tr><td><code>setFooterButtons()</code></td><td><code>(buttons: SoDialogFooterButton[]) =&gt; void</code></td><td>整体替换底部按钮。</td></tr>
              <tr><td><code>updateFooterButton()</code></td><td><code>(id: string, updates: Partial&lt;SoDialogFooterButton&gt;) =&gt; boolean</code></td><td>按 id 更新单个按钮。</td></tr>
              <tr><td><code>onAction()</code></td><td><code>(listener: SoDialogActionListener) =&gt; () =&gt; void</code></td><td>监听动作并返回取消监听函数。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="footer-button">
        <h2 class="section-title"><span class="mono">SoDialogFooterButton</span></h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>id</code></td><td><code>string</code></td><td>动作标识。</td></tr>
              <tr><td><code>label</code></td><td><code>string | Node</code></td><td>按钮文案或节点。</td></tr>
              <tr><td><code>role</code></td><td><code>'confirm' | 'cancel' | 'custom'</code></td><td>语义角色。</td></tr>
              <tr><td><code>variant</code></td><td><code>'primary' | 'outline' | 'danger' | 'success' | 'ghost' | 'link'</code></td><td>样式变体。</td></tr>
              <tr><td><code>action</code></td><td><code>'none' | 'hide' | 'destroy'</code></td><td>点击后行为。</td></tr>
              <tr><td><code>className</code></td><td><code>string</code></td><td>附加类名。</td></tr>
              <tr><td><code>disabled</code></td><td><code>boolean</code></td><td>禁用状态。</td></tr>
              <tr><td><code>attrs</code></td><td><code>Record&lt;string, string&gt;</code></td><td>透传属性。</td></tr>
              <tr><td><code>onClick</code></td><td><code>(context) =&gt; void | boolean | Promise&lt;void | boolean&gt;</code></td><td>返回 <code>false</code> 可阻止默认动作。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="lifecycle">
        <h2 class="section-title">生命周期回调</h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>回调</th><th>签名</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>onBeforeOpen</code></td><td><code>(context: SoLifecycleContext) =&gt; void</code></td><td>打开前。</td></tr>
              <tr><td><code>onAfterOpen</code></td><td><code>(context: SoLifecycleContext) =&gt; void</code></td><td>打开后。</td></tr>
              <tr><td><code>onBeforeClose</code></td><td><code>(context: SoLifecycleContext) =&gt; void</code></td><td>关闭前。</td></tr>
              <tr><td><code>onAfterClose</code></td><td><code>(context: SoLifecycleContext) =&gt; void</code></td><td>关闭后。</td></tr>
              <tr><td><code>onLifecycle</code></td><td><code>(context: SoLifecycleContext) =&gt; void</code></td><td>统一监听所有阶段。</td></tr>
            </tbody>
          </table>
        </div>
        <p class="desc"><code>SoLifecycleContext</code> 额外包含 <code>traceId?: string</code>，可用于 action/phase/reason 链路排查。</p>
      </section>

      <section class="card" id="promise-api">
        <h2 class="section-title">Promise API</h2>
        <p class="desc">以下 API 用于串行业务流控制，返回 Promise。</p>
      </section>

      <section class="card" id="confirm-modal">
        <h2 class="section-title"><span class="mono">confirmModal(options) / SoDialog.confirm(options)</span></h2>
        <p class="desc"><code>Promise&lt;boolean&gt;</code>，确认返回 <code>true</code>，其余关闭行为返回 <code>false</code>。</p>
      </section>

      <section class="card" id="prompt-modal">
        <h2 class="section-title"><span class="mono">promptModal(options) / SoDialog.prompt(options)</span></h2>
        <p class="desc"><code>Promise&lt;string | null&gt;</code>，确认返回文本，取消返回 <code>null</code>。</p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>defaultValue</code></td><td><code>string</code></td><td><code>''</code></td><td>初始文本。</td></tr>
              <tr><td><code>placeholder</code></td><td><code>string</code></td><td>-</td><td>占位提示。</td></tr>
              <tr><td><code>inputType</code></td><td><code>'text' | 'password' | 'email' | 'search' | 'url' | 'tel'</code></td><td><code>'text'</code></td><td>输入类型。</td></tr>
              <tr><td><code>trimResult</code></td><td><code>boolean</code></td><td><code>true</code></td><td>确认时自动 trim。</td></tr>
              <tr><td><code>validate</code></td><td><code>(value: string) =&gt; string | boolean | void</code></td><td>-</td><td>返回 <code>false</code> 或错误字符串时阻止提交。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="form-modal">
        <h2 class="section-title"><span class="mono">formModal(options) / SoDialog.form(options)</span></h2>
        <p class="desc"><code>Promise&lt;Record&lt;string, SoDialogFormValue&gt; | null&gt;</code>，确认返回对象，取消返回 <code>null</code>。</p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>fields</code></td><td><code>SoDialogFormField[]</code></td><td>-</td><td>字段数组，必填。</td></tr>
              <tr><td><code>trimText</code></td><td><code>boolean</code></td><td><code>true</code></td><td>文本字段 trim 处理。</td></tr>
              <tr><td><code>submitText</code></td><td><code>string</code></td><td><code>'提交'</code></td><td>提交按钮文案。</td></tr>
              <tr><td><code>cancelText</code></td><td><code>string</code></td><td><code>'取消'</code></td><td>取消按钮文案。</td></tr>
              <tr><td><code>validate</code></td><td><code>(values) =&gt; string | boolean | Record&lt;string, string&gt; | void</code></td><td>-</td><td>表单级校验逻辑。</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="sub-title"><span class="mono">SoDialogFormField</span></h3>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>name</code></td><td><code>string</code></td><td>字段名（结果对象键）。</td></tr>
              <tr><td><code>label</code></td><td><code>string</code></td><td>标签文案。</td></tr>
              <tr><td><code>type</code></td><td><code>SoFormFieldType</code></td><td>字段类型，默认 <code>text</code>。</td></tr>
              <tr><td><code>placeholder</code></td><td><code>string</code></td><td>占位文本。</td></tr>
              <tr><td><code>defaultValue</code></td><td><code>string | number | boolean</code></td><td>默认值。</td></tr>
              <tr><td><code>required</code></td><td><code>boolean</code></td><td>是否必填。</td></tr>
              <tr><td><code>helpText</code></td><td><code>string</code></td><td>辅助文案。</td></tr>
              <tr><td><code>rows</code></td><td><code>number</code></td><td><code>textarea</code> 行数。</td></tr>
              <tr><td><code>options</code></td><td><code>SoDialogFormFieldOption[]</code></td><td><code>select</code> 选项。</td></tr>
              <tr><td><code>attrs</code></td><td><code>Record&lt;string, string&gt;</code></td><td>透传属性。</td></tr>
              <tr><td><code>validate</code></td><td><code>(value, values) =&gt; string | boolean | void</code></td><td>字段级校验。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="toast-api">
        <h2 class="section-title">Toast API</h2>
        <p class="desc">Toast 支持队列、重复策略、生命周期与手动控制。</p>
      </section>

      <section class="card" id="toast-show">
        <h2 class="section-title"><span class="mono">toast(options) / SoToast.show(options)</span></h2>
        <p class="desc"><code>toast(options: SoToastOptions): SoToastHandle</code></p>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>参数</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>content</code></td><td><code>string | Node</code></td><td>-</td><td>内容，必填。</td></tr>
              <tr><td><code>id</code></td><td><code>string</code></td><td>自动生成</td><td>用于去重与复用。</td></tr>
              <tr><td><code>traceId</code></td><td><code>string</code></td><td>-</td><td>链路追踪 ID，会透传到生命周期回调。</td></tr>
              <tr><td><code>title</code></td><td><code>string</code></td><td>-</td><td>标题。</td></tr>
              <tr><td><code>placement</code></td><td><code>SoToastPlacement</code></td><td><code>'top-end'</code></td><td>展示位置。</td></tr>
              <tr><td><code>variant</code></td><td><code>SoToastVariant</code></td><td><code>'default'</code></td><td>样式变体。</td></tr>
              <tr><td><code>duration</code></td><td><code>number | false</code></td><td><code>3000</code></td><td>自动关闭时长；<code>false</code> 为常驻。</td></tr>
              <tr><td><code>showProgress</code></td><td><code>boolean</code></td><td><code>true</code></td><td>显示进度条。</td></tr>
              <tr><td><code>closable</code></td><td><code>boolean</code></td><td><code>true</code></td><td>显示关闭按钮。</td></tr>
              <tr><td><code>pauseOnHover</code></td><td><code>boolean</code></td><td><code>true</code></td><td>悬停暂停倒计时。</td></tr>
              <tr><td><code>pauseOnWindowBlur</code></td><td><code>boolean</code></td><td><code>false</code></td><td>窗口失焦暂停倒计时。</td></tr>
              <tr><td><code>duplicateStrategy</code></td><td><code>'update' | 'ignore' | 'restart-timer' | 'stack'</code></td><td><code>'update'</code></td><td>重复 id 时处理策略。</td></tr>
              <tr><td><code>newestOnTop</code></td><td><code>boolean</code></td><td><code>true</code></td><td>新消息是否置顶。</td></tr>
              <tr><td><code>maxVisible</code></td><td><code>number</code></td><td><code>3</code></td><td>同位置最大可见数量。</td></tr>
              <tr><td><code>className</code></td><td><code>string</code></td><td>-</td><td>附加类名。</td></tr>
              <tr><td><code>attrs</code></td><td><code>Record&lt;string, string&gt;</code></td><td>-</td><td>附加属性。</td></tr>
              <tr><td><code>onShown</code></td><td><code>(handle: SoToastHandle) =&gt; void</code></td><td>-</td><td>显示后回调。</td></tr>
              <tr><td><code>onClose</code></td><td><code>(reason: SoToastCloseReason, handle: SoToastHandle) =&gt; void</code></td><td>-</td><td>关闭后回调。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="toast-handle">
        <h2 class="section-title"><span class="mono">SoToastHandle</span></h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>成员</th><th>类型</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>id</code></td><td><code>string</code></td><td>Toast 唯一 ID。</td></tr>
              <tr><td><code>element</code></td><td><code>HTMLElement</code></td><td>当前节点。</td></tr>
              <tr><td><code>close()</code></td><td><code>(reason?: 'manual' | 'container-clear' | 'programmatic') =&gt; void</code></td><td>主动关闭。</td></tr>
              <tr><td><code>update()</code></td><td><code>(patch: Partial&lt;Pick&lt;SoToastOptions, 'title' | 'content' | 'variant' | 'duration'&gt;&gt;) =&gt; void</code></td><td>局部更新。</td></tr>
              <tr><td><code>pause()</code></td><td><code>() =&gt; void</code></td><td>暂停计时。</td></tr>
              <tr><td><code>resume()</code></td><td><code>() =&gt; void</code></td><td>恢复计时。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="toast-manage">
        <h2 class="section-title"><span class="mono">SoToast.configure / SoToast.clear / SoToast.closeAll</span></h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>方法</th><th>签名</th><th>说明</th></tr></thead>
            <tbody>
              <tr><td><code>SoToast.configure</code></td><td><code>(defaults: Partial&lt;SoToastOptions&gt;) =&gt; void</code></td><td>更新全局默认配置。</td></tr>
              <tr><td><code>SoToast.clear</code></td><td><code>(placement?: SoToastPlacement) =&gt; void</code></td><td>清空指定位置或全部。</td></tr>
              <tr><td><code>SoToast.closeAll</code></td><td><code>() =&gt; void</code></td><td>等价于 <code>clear()</code>。</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="toast-shortcuts">
        <h2 class="section-title"><span class="mono">SoToast.success / error / info / warning</span></h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>方法</th><th>签名</th><th>默认 variant</th></tr></thead>
            <tbody>
              <tr><td><code>SoToast.success</code></td><td><code>(content: string | Node, options?) =&gt; SoToastHandle</code></td><td><code>success</code></td></tr>
              <tr><td><code>SoToast.error</code></td><td><code>(content: string | Node, options?) =&gt; SoToastHandle</code></td><td><code>danger</code></td></tr>
              <tr><td><code>SoToast.info</code></td><td><code>(content: string | Node, options?) =&gt; SoToastHandle</code></td><td><code>info</code></td></tr>
              <tr><td><code>SoToast.warning</code></td><td><code>(content: string | Node, options?) =&gt; SoToastHandle</code></td><td><code>warning</code></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="types">
        <h2 class="section-title">常用类型</h2>
      </section>

      <section class="card" id="type-dialog">
        <h2 class="section-title">Dialog 相关类型</h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>类型</th><th>可选值</th></tr></thead>
            <tbody>
              <tr><td><code>SoModalPosition</code></td><td><code>'center' | 'top' | 'bottom'</code></td></tr>
              <tr><td><code>SoModalAnimation</code></td><td><code>'slide' | 'fade' | 'zoom'</code></td></tr>
              <tr><td><code>SoModalScrollMode</code></td><td><code>'body' | 'viewport' | 'none' | 'hybrid'</code></td></tr>
              <tr><td><code>SoOffcanvasPlacement</code></td><td><code>'start' | 'end' | 'top' | 'bottom'</code></td></tr>
              <tr><td><code>SoOffcanvasAnimation</code></td><td><code>'slide' | 'fade' | 'zoom'</code></td></tr>
              <tr><td><code>SoFooterAlign</code></td><td><code>'start' | 'center' | 'end' | 'between'</code></td></tr>
              <tr><td><code>SoFooterButtonAction</code></td><td><code>'none' | 'hide' | 'destroy'</code></td></tr>
              <tr><td><code>SoDialogFormValue</code></td><td><code>string | number | boolean | null</code></td></tr>
              <tr><td><code>SoLayoutStableContext</code></td><td><code>{ component: 'modal' | 'offcanvas'; element: HTMLElement; id?: string; traceId?: string }</code></td></tr>
              <tr><td><code>SoMessageLevel</code></td><td><code>'default' | 'info' | 'success' | 'warning' | 'danger'</code></td></tr>
              <tr><td><code>SoAdapterLogEvent</code></td><td><code>{ action; phase?: before-open/after-open/before-close/after-close/action/layout-stable/focus/typeahead; component?; reason?; id?; traceId?; detail? }</code></td></tr>
              <tr><td><code>SoDialogGlobalConfig</code></td><td><code>{ modalDefaults?: Partial&lt;SoDialogModalOptions&gt;; offcanvasDefaults?: Partial&lt;Omit&lt;SoDialogOffcanvasOptions, 'kind'&gt;&gt; }</code></td></tr>
              <tr><td><code>SoContextMenuGlobalConfig</code></td><td><code>{ closeOnEsc?; closeOnOutsideClick?; minWidth?; maxHeight?; offsetX?; offsetY?; className?; attrs?; ... }</code></td></tr>
              <tr><td><code>SoContextMenuCloseReason</code></td><td><code>'outside' | 'esc' | 'item' | 'programmatic' | 'destroy' | 'reopen' | 'blur' | 'scroll' | 'resize'</code></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card" id="type-toast">
        <h2 class="section-title">Toast 相关类型</h2>
        <div class="table-wrap">
          <table class="api-table">
            <thead><tr><th>类型</th><th>可选值</th></tr></thead>
            <tbody>
              <tr><td><code>SoToastPlacement</code></td><td><code>'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'</code></td></tr>
              <tr><td><code>SoToastVariant</code></td><td><code>'default' | 'info' | 'success' | 'warning' | 'danger'</code></td></tr>
              <tr><td><code>SoToastDuplicateStrategy</code></td><td><code>'update' | 'ignore' | 'restart-timer' | 'stack'</code></td></tr>
              <tr><td><code>SoToastCloseReason</code></td><td><code>'timeout' | 'manual' | 'close-button' | 'container-clear' | 'programmatic'</code></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
`

setupPinnedHeroTop({ adjustSidebarOffset: true })
wireCodeCopyButtons()
