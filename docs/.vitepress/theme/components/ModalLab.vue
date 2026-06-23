<script setup lang="ts">
import { computed, ref } from 'vue'

const title = ref('Hello SoDialog')
const width = ref(560)
const closeOnEsc = ref(true)
const footerAlign = ref<'start' | 'center' | 'end' | 'between'>('end')

const code = computed(() => `import { openModal } from 'sodialog'
import 'sodialog/style.css'

openModal({
  title: '${title.value.replace(/'/g, "\\'")}',
  content: '<p>Preview content rendered by your app.</p>',
  width: ${width.value},
  closeOnEsc: ${closeOnEsc.value},
  footerAlign: '${footerAlign.value}',
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
      <label>
        标题
        <input v-model="title" type="text" />
      </label>
      <label>
        宽度 {{ width }}px
        <input v-model="width" type="range" min="360" max="820" step="20" />
      </label>
      <label>
        Footer 对齐
        <select v-model="footerAlign">
          <option value="start">start</option>
          <option value="center">center</option>
          <option value="end">end</option>
          <option value="between">between</option>
        </select>
      </label>
      <label class="modal-lab__check">
        <input v-model="closeOnEsc" type="checkbox" />
        允许 Esc 关闭
      </label>
    </form>
    <div class="modal-lab__preview">
      <div class="modal-lab__dialog" :style="{ width: `${width}px` }">
        <header>
          <strong>{{ title }}</strong>
          <span aria-hidden="true">×</span>
        </header>
        <p>Preview content rendered by your app.</p>
        <footer :data-align="footerAlign">
          <button type="button">取消</button>
          <button type="button">确认</button>
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
  grid-template-columns: minmax(220px, 0.72fr) minmax(320px, 1.25fr) minmax(280px, 0.95fr);
  gap: 14px;
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
  align-content: start;
  gap: 14px;
  padding: 16px;
}

.modal-lab__panel label {
  display: grid;
  gap: 7px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.modal-lab__panel input,
.modal-lab__panel select {
  min-height: 34px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.modal-lab__check {
  grid-template-columns: auto 1fr;
  align-items: center;
}

.modal-lab__preview {
  display: grid;
  min-height: 360px;
  place-items: center;
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
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 24px 70px rgb(15 23 42 / 16%);
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
  max-height: 420px;
  overflow: auto;
  padding: 14px;
  font-size: 12px;
}

@media (max-width: 980px) {
  .modal-lab {
    grid-template-columns: 1fr;
  }
}
</style>
