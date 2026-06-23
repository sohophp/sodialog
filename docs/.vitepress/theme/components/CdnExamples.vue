<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()
const copied = ref('')

const version = computed(() => {
  const value = (theme.value as { version?: unknown }).version
  return typeof value === 'string' ? value : ''
})

const jsdelivr = computed(() => `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sodialog@${version.value}/dist/sodialog.css">

<script type="module">
  import { openModal } from 'https://cdn.jsdelivr.net/npm/sodialog@${version.value}/dist/sodialog.es.js'

  openModal({
    title: 'Hello',
    content: '<p>Loaded from jsDelivr.</p>',
  })
<\/script>`)

const unpkg = computed(() => `<link rel="stylesheet" href="https://unpkg.com/sodialog@${version.value}/dist/sodialog.css">

<script type="module">
  import { pushMessage } from 'https://unpkg.com/sodialog@${version.value}/dist/sodialog.es.js'

  pushMessage('success', 'Loaded from UNPKG.')
<\/script>`)

const umd = computed(() => `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sodialog@${version.value}/dist/sodialog.css">
<script src="https://cdn.jsdelivr.net/npm/sodialog@${version.value}/dist/sodialog.umd.js"><\/script>`)

const copy = async (name: string, code: string) => {
  await navigator.clipboard.writeText(code)
  copied.value = name
  window.setTimeout(() => {
    copied.value = ''
  }, 1200)
}
</script>

<template>
  <section class="cdn-examples">
    <article>
      <header>
        <h3>jsDelivr（推荐）</h3>
        <button type="button" @click="copy('jsdelivr', jsdelivr)">{{ copied === 'jsdelivr' ? '已复制' : '复制' }}</button>
      </header>
      <pre><code>{{ jsdelivr }}</code></pre>
    </article>
    <article>
      <header>
        <h3>UNPKG（备用）</h3>
        <button type="button" @click="copy('unpkg', unpkg)">{{ copied === 'unpkg' ? '已复制' : '复制' }}</button>
      </header>
      <pre><code>{{ unpkg }}</code></pre>
    </article>
    <article>
      <header>
        <h3>UMD / IIFE</h3>
        <button type="button" @click="copy('umd', umd)">{{ copied === 'umd' ? '已复制' : '复制' }}</button>
      </header>
      <pre><code>{{ umd }}</code></pre>
    </article>
  </section>
</template>

<style scoped>
.cdn-examples {
  display: grid;
  gap: 14px;
  margin: 18px 0;
}

.cdn-examples article {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.cdn-examples header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.cdn-examples h3 {
  margin: 0;
  font-size: 15px;
}

.cdn-examples button {
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
}

.cdn-examples pre {
  margin: 0;
  overflow-x: auto;
  padding: 14px;
  font-size: 12px;
}
</style>
