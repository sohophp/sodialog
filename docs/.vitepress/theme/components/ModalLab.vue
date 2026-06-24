<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const scenario = ref<'confirm' | 'deploy' | 'form' | 'custom'>('confirm')
const id = ref('')
const title = ref('Delete record')
const content = ref('This action cannot be undone.')
const widthMode = ref<'auto' | 'px' | 'css'>('px')
const widthPx = ref(560)
const widthCss = ref('42rem')
const heightMode = ref<'auto' | 'px' | 'css'>('auto')
const heightPx = ref(420)
const heightCss = ref('70vh')
const position = ref<'center' | 'top' | 'bottom'>('center')
const animation = ref<'fade' | 'slide' | 'zoom'>('fade')
const useModal = ref(true)
const preset = ref<'default' | 'deploy'>('default')
const hideHeader = ref(false)
const hideCloseButton = ref(false)
const closeButtonLabel = ref('Close')
const closeButtonText = ref('×')
const draggable = ref(true)
const dragHandle = ref<'header' | 'title' | 'body' | 'footer' | 'panel' | 'multi'>('header')
const autoFitSize = ref(true)
const scrollMode = ref<'body' | 'hybrid' | 'viewport' | 'none'>('body')
const hybridSwitchRatio = ref(1.35)
const refitOnContentChange = ref(true)
const autoFitMinWidth = ref(280)
const autoFitMinHeight = ref(160)
const closeOnEsc = ref(true)
const closeOnBackdrop = ref(true)
const hideFooter = ref(false)
const footerAlign = ref<'start' | 'center' | 'end' | 'between'>('end')
const confirmText = ref('Confirm')
const cancelText = ref('Cancel')
const confirmAction = ref<'hide' | 'destroy'>('hide')
const traceId = ref('trace-modal-lab-001')
const layoutStableFrames = ref(2)
const layoutStableOnRefit = ref(false)
const includeHooks = ref(false)
const includeCustomFooter = ref(false)

watch(scenario, (value) => {
  if (value === 'deploy') {
    title.value = 'Ready to deploy'
    content.value = 'All checks passed. Production is ready.'
    preset.value = 'deploy'
    confirmText.value = 'Deploy now'
    cancelText.value = 'Cancel'
    footerAlign.value = 'end'
    widthMode.value = 'px'
    widthPx.value = 390
    return
  }

  if (value === 'form') {
    title.value = 'Create task'
    content.value = 'Use a DOM node or formModal fields for structured input.'
    preset.value = 'default'
    confirmText.value = 'Save'
    cancelText.value = 'Cancel'
    footerAlign.value = 'between'
    return
  }

  if (value === 'confirm') {
    title.value = 'Delete record'
    content.value = 'This action cannot be undone.'
    preset.value = 'default'
    confirmText.value = 'Confirm'
    cancelText.value = 'Cancel'
    footerAlign.value = 'end'
  }
})

const quote = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

const widthValue = computed(() => {
  if (widthMode.value === 'auto') return null
  return widthMode.value === 'px' ? String(widthPx.value) : quote(widthCss.value)
})

const heightValue = computed(() => {
  if (heightMode.value === 'auto') return null
  return heightMode.value === 'px' ? String(heightPx.value) : quote(heightCss.value)
})

const dragHandleCode = computed(() => {
  if (!draggable.value) return null
  if (dragHandle.value === 'multi') return "['header', 'body', 'footer']"
  return quote(dragHandle.value)
})

const footerButtonsCode = computed(() => {
  if (!includeCustomFooter.value) return null
  return `[
    { id: 'help', label: 'Help', variant: 'link', action: 'none' },
    { id: 'cancel', label: ${quote(cancelText.value)}, role: 'cancel', variant: 'outline' },
    { id: 'confirm', label: ${quote(confirmText.value)}, role: 'confirm', variant: 'primary' },
  ]`
})

const optionLines = computed(() => {
  const lines = [
    `title: ${quote(title.value)}`,
    `content: ${quote(`<p>${content.value}</p>`)}`,
  ]

  if (id.value.trim()) lines.push(`id: ${quote(id.value.trim())}`)
  if (position.value !== 'center') lines.push(`position: ${quote(position.value)}`)
  if (animation.value !== 'fade') lines.push(`animation: ${quote(animation.value)}`)
  if (widthValue.value) lines.push(`width: ${widthValue.value}`)
  if (heightValue.value) lines.push(`height: ${heightValue.value}`)
  if (!useModal.value) lines.push('useModal: false')
  if (preset.value !== 'default') lines.push(`preset: ${quote(preset.value)}`)
  if (hideHeader.value) lines.push('hideHeader: true')
  if (hideCloseButton.value) lines.push('hideCloseButton: true')
  if (closeButtonLabel.value !== 'Close') lines.push(`closeButtonLabel: ${quote(closeButtonLabel.value)}`)
  if (closeButtonText.value !== '×') lines.push(`closeButtonText: ${quote(closeButtonText.value)}`)
  if (!draggable.value) lines.push('draggable: false')
  if (dragHandleCode.value && dragHandle.value !== 'header') lines.push(`dragHandle: ${dragHandleCode.value}`)
  if (!autoFitSize.value) lines.push('autoFitSize: false')
  if (scrollMode.value !== 'body') lines.push(`scrollMode: ${quote(scrollMode.value)}`)
  if (scrollMode.value === 'hybrid') lines.push(`hybridSwitchRatio: ${hybridSwitchRatio.value.toFixed(2)}`)
  if (!refitOnContentChange.value) lines.push('refitOnContentChange: false')
  if (autoFitMinWidth.value !== 280) lines.push(`autoFitMinWidth: ${autoFitMinWidth.value}`)
  if (autoFitMinHeight.value !== 160) lines.push(`autoFitMinHeight: ${autoFitMinHeight.value}`)
  if (!closeOnEsc.value) lines.push('closeOnEsc: false')
  if (!closeOnBackdrop.value) lines.push('closeOnBackdrop: false')
  if (hideFooter.value) lines.push('hideFooter: true')
  if (footerAlign.value !== 'end') lines.push(`footerAlign: ${quote(footerAlign.value)}`)
  if (confirmText.value !== 'Confirm') lines.push(`confirmText: ${quote(confirmText.value)}`)
  if (cancelText.value !== 'Cancel') lines.push(`cancelText: ${quote(cancelText.value)}`)
  if (confirmAction.value !== 'hide') lines.push(`confirmAction: ${quote(confirmAction.value)}`)
  if (footerButtonsCode.value) lines.push(`footerButtons: ${footerButtonsCode.value}`)
  if (traceId.value.trim()) lines.push(`traceId: ${quote(traceId.value.trim())}`)
  if (layoutStableFrames.value !== 2) lines.push(`layoutStableFrames: ${layoutStableFrames.value}`)
  if (layoutStableOnRefit.value) lines.push('layoutStableOnRefit: true')

  if (includeHooks.value) {
    lines.push('onLayoutStable: ({ traceId }) => console.log(\'layout stable\', traceId)')
    lines.push('onAction: ({ action }) => console.log(\'footer action\', action)')
    lines.push('onAfterOpen: ({ element }) => console.log(\'opened\', element)')
    lines.push('onAfterClose: ({ reason }) => console.log(\'closed\', reason)')
    lines.push('onCreated: (handle) => console.log(\'created\', handle.id)')
    lines.push('onReused: (handle) => console.log(\'reused\', handle.id)')
  }

  return lines
})

const code = computed(() => `import { openModal } from 'sodialog'
import 'sodialog/style.css'

openModal({
${optionLines.value.map((line) => `  ${line},`).join('\n')}
})`)

const copied = ref(false)

const copyCode = async () => {
  await navigator.clipboard.writeText(code.value)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1200)
}

</script>

<template>
  <section class="modal-lab">
    <form class="modal-lab__panel" aria-label="Modal 配置">
      <div class="modal-lab__group">
        <h2>基础内容</h2>
        <label>场景
          <select v-model="scenario">
            <option value="confirm">删除确认</option>
            <option value="deploy">部署确认</option>
            <option value="form">表单入口</option>
            <option value="custom">自定义</option>
          </select>
        </label>
        <label>id
          <input v-model="id" type="text" placeholder="留空则自动生成" />
        </label>
        <label>标题
          <input v-model="title" type="text" />
        </label>
        <label>内容
          <textarea v-model="content" rows="3" />
        </label>
      </div>

      <div class="modal-lab__group">
        <h2>尺寸、位置、动画</h2>
        <label>宽度模式
          <select v-model="widthMode">
            <option value="auto">auto</option>
            <option value="px">px</option>
            <option value="css">CSS size</option>
          </select>
        </label>
        <label v-if="widthMode === 'px'">宽度 {{ widthPx }}px
          <input v-model="widthPx" type="range" min="320" max="960" step="20" />
        </label>
        <label v-if="widthMode === 'css'">宽度 CSS
          <input v-model="widthCss" type="text" />
        </label>
        <label>高度模式
          <select v-model="heightMode">
            <option value="auto">auto</option>
            <option value="px">px</option>
            <option value="css">CSS size</option>
          </select>
        </label>
        <label v-if="heightMode === 'px'">高度 {{ heightPx }}px
          <input v-model="heightPx" type="range" min="220" max="760" step="20" />
        </label>
        <label v-if="heightMode === 'css'">高度 CSS
          <input v-model="heightCss" type="text" />
        </label>
        <label>位置
          <select v-model="position">
            <option value="center">center</option>
            <option value="top">top</option>
            <option value="bottom">bottom</option>
          </select>
        </label>
        <label>动画
          <select v-model="animation">
            <option value="fade">fade</option>
            <option value="slide">slide</option>
            <option value="zoom">zoom</option>
          </select>
        </label>
      </div>

      <div class="modal-lab__group">
        <h2>Header 与关闭按钮</h2>
        <label class="modal-lab__check"><input v-model="hideHeader" type="checkbox" /> hideHeader</label>
        <label class="modal-lab__check"><input v-model="hideCloseButton" type="checkbox" :disabled="hideHeader" /> hideCloseButton</label>
        <label>closeButtonLabel
          <input v-model="closeButtonLabel" type="text" :disabled="hideHeader || hideCloseButton" />
        </label>
        <label>closeButtonText
          <input v-model="closeButtonText" type="text" :disabled="hideHeader || hideCloseButton" />
        </label>
      </div>

      <div class="modal-lab__group">
        <h2>交互行为</h2>
        <label class="modal-lab__check"><input v-model="useModal" type="checkbox" /> useModal</label>
        <label class="modal-lab__check"><input v-model="draggable" type="checkbox" /> draggable</label>
        <label>dragHandle
          <select v-model="dragHandle" :disabled="!draggable">
            <option value="header">header</option>
            <option value="title">title</option>
            <option value="body">body</option>
            <option value="footer">footer</option>
            <option value="panel">panel</option>
            <option value="multi">header + body + footer</option>
          </select>
        </label>
        <label class="modal-lab__check"><input v-model="closeOnEsc" type="checkbox" /> closeOnEsc</label>
        <label class="modal-lab__check"><input v-model="closeOnBackdrop" type="checkbox" /> closeOnBackdrop</label>
      </div>

      <div class="modal-lab__group">
        <h2>样式与自适应</h2>
        <label>preset
          <select v-model="preset">
            <option value="default">default</option>
            <option value="deploy">deploy</option>
          </select>
        </label>
        <label class="modal-lab__check"><input v-model="autoFitSize" type="checkbox" /> autoFitSize</label>
        <label>scrollMode
          <select v-model="scrollMode">
            <option value="body">body</option>
            <option value="hybrid">hybrid</option>
            <option value="viewport">viewport</option>
            <option value="none">none</option>
          </select>
        </label>
        <label v-if="scrollMode === 'hybrid'">hybridSwitchRatio {{ hybridSwitchRatio.toFixed(2) }}
          <input v-model="hybridSwitchRatio" type="range" min="1" max="2.5" step="0.05" />
        </label>
        <label class="modal-lab__check"><input v-model="refitOnContentChange" type="checkbox" /> refitOnContentChange</label>
        <label>autoFitMinWidth
          <input v-model="autoFitMinWidth" type="number" min="120" step="20" />
        </label>
        <label>autoFitMinHeight
          <input v-model="autoFitMinHeight" type="number" min="100" step="20" />
        </label>
      </div>

      <div class="modal-lab__group modal-lab__group--wide">
        <h2>Footer 与诊断</h2>
        <label class="modal-lab__check"><input v-model="hideFooter" type="checkbox" /> hideFooter</label>
        <label>footerAlign
          <select v-model="footerAlign" :disabled="hideFooter">
            <option value="start">start</option>
            <option value="center">center</option>
            <option value="end">end</option>
            <option value="between">between</option>
          </select>
        </label>
        <label>confirmText
          <input v-model="confirmText" type="text" :disabled="hideFooter" />
        </label>
        <label>cancelText
          <input v-model="cancelText" type="text" :disabled="hideFooter" />
        </label>
        <label>confirmAction
          <select v-model="confirmAction" :disabled="hideFooter">
            <option value="hide">hide</option>
            <option value="destroy">destroy</option>
          </select>
        </label>
        <label class="modal-lab__check"><input v-model="includeCustomFooter" type="checkbox" :disabled="hideFooter" /> footerButtons</label>
        <label>traceId
          <input v-model="traceId" type="text" />
        </label>
        <label>layoutStableFrames
          <input v-model="layoutStableFrames" type="number" min="1" step="1" />
        </label>
        <label class="modal-lab__check"><input v-model="layoutStableOnRefit" type="checkbox" /> layoutStableOnRefit</label>
        <label class="modal-lab__check"><input v-model="includeHooks" type="checkbox" /> lifecycle/action hooks</label>
      </div>
    </form>

    <div class="modal-lab__preview">
      <div
        class="modal-lab__dialog"
        :class="{ 'is-deploy': preset === 'deploy', 'is-top': position === 'top', 'is-bottom': position === 'bottom' }"
        :style="{ width: widthMode === 'auto' ? 'min(560px, 100%)' : widthMode === 'px' ? `${widthPx}px` : widthCss, height: heightMode === 'auto' ? 'auto' : heightMode === 'px' ? `${heightPx}px` : heightCss }"
      >
        <header v-if="!hideHeader">
          <strong>{{ title }}</strong>
          <span
            v-if="!hideCloseButton"
            class="modal-lab__close"
            :title="closeButtonLabel"
            aria-hidden="true"
          >
            {{ closeButtonText }}
          </span>
        </header>
        <p>{{ content }}</p>
        <footer v-if="!hideFooter" :data-align="footerAlign">
          <button v-if="includeCustomFooter" type="button">Help</button>
          <button type="button">{{ cancelText }}</button>
          <button type="button">{{ confirmText }}</button>
        </footer>
      </div>
    </div>

    <div class="modal-lab__code">
      <button type="button" @click="copyCode">{{ copied ? '已复制' : '复制代码' }}</button>
      <pre><code>{{ code }}</code></pre>
    </div>
  </section>
</template>

<style scoped>
.modal-lab {
  display: grid;
  gap: 16px;
  margin: 18px 0 28px;
}

.modal-lab__panel,
.modal-lab__preview,
.modal-lab__code {
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.modal-lab__panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  padding: 16px;
}

.modal-lab__group {
  display: grid;
  align-content: start;
  gap: 12px;
  min-width: 0;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.modal-lab__group--wide {
  grid-column: span 2;
}

.modal-lab__group h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 14px;
}

.modal-lab__group label {
  display: grid;
  gap: 6px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.modal-lab__group input,
.modal-lab__group select,
.modal-lab__group textarea {
  min-height: 38px;
  min-width: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font: inherit;
}

.modal-lab__group textarea {
  resize: vertical;
}

.modal-lab__check {
  grid-template-columns: auto 1fr;
  align-items: center;
  min-height: 38px;
  padding: 7px 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background: var(--vp-c-bg);
}

.modal-lab__check input {
  width: auto;
  min-height: 0;
  padding: 0;
}

.modal-lab__preview {
  display: grid;
  min-height: 420px;
  align-items: center;
  justify-items: center;
  overflow: auto;
  padding: 24px;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--vp-c-divider) 48%, transparent) 1px, transparent 1px),
    linear-gradient(color-mix(in srgb, var(--vp-c-divider) 48%, transparent) 1px, transparent 1px),
    var(--vp-c-bg-soft);
  background-size: 24px 24px;
}

.modal-lab__dialog {
  max-width: 100%;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 24px 70px rgb(15 23 42 / 16%);
}

.modal-lab__dialog.is-top {
  align-self: start;
}

.modal-lab__dialog.is-bottom {
  align-self: end;
}

.modal-lab__dialog.is-deploy {
  border-radius: 18px;
  box-shadow: 0 24px 80px rgb(15 23 42 / 16%);
}

.modal-lab__dialog.is-deploy header {
  border-bottom: 0;
}

.modal-lab__dialog.is-deploy strong::before {
  display: inline-grid;
  width: 26px;
  height: 26px;
  margin-right: 10px;
  border-radius: 9px;
  place-items: center;
  color: #039568;
  background: #d7f8e7;
  content: "\2713";
}

.modal-lab__dialog header,
.modal-lab__dialog footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
}

.modal-lab__dialog header {
  justify-content: space-between;
  border-bottom: 1px solid var(--vp-c-divider);
}

.modal-lab__dialog p {
  margin: 0;
  padding: 24px 14px;
  color: var(--vp-c-text-2);
}

.modal-lab__dialog footer {
  border-top: 1px solid var(--vp-c-divider);
}

.modal-lab__dialog footer[data-align='center'] { justify-content: center; }
.modal-lab__dialog footer[data-align='end'] { justify-content: flex-end; }
.modal-lab__dialog footer[data-align='between'] { justify-content: space-between; }

.modal-lab__dialog button,
.modal-lab__code button {
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
}

.modal-lab__close {
  color: var(--vp-c-text-2);
  font-size: 18px;
  line-height: 1;
}

.modal-lab__code {
  overflow: hidden;
}

.modal-lab__code button {
  float: right;
  margin: 10px;
}

.modal-lab__code pre {
  clear: both;
  margin: 0;
  max-height: 520px;
  overflow: auto;
  padding: 14px;
  font-size: 12px;
}

@media (max-width: 1100px) {
  .modal-lab__panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .modal-lab__group--wide {
    grid-column: auto;
  }
}

@media (max-width: 720px) {
  .modal-lab__panel {
    grid-template-columns: 1fr;
  }
}
</style>
