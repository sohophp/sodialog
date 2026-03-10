<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    title?: string
    codeSrc?: string
    height?: number
  }>(),
  {
    title: 'Live Example',
    codeSrc: '',
    height: 560,
  },
)

const sourceCode = ref('')
const copied = ref(false)
const loading = ref(false)

const resolvedCodeSrc = computed(() => {
  if (props.codeSrc) return props.codeSrc
  return props.src
})

const copyCode = async () => {
  if (!sourceCode.value) return
  try {
    await navigator.clipboard.writeText(sourceCode.value)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch (error) {
    console.error('copy failed', error)
  }
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch(resolvedCodeSrc.value)
    sourceCode.value = await response.text()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="demo-preview">
    <header class="demo-preview__header">
      <h3>{{ title }}</h3>
      <a :href="src" target="_blank" rel="noreferrer">Open in New Tab</a>
    </header>

    <iframe
      :src="src"
      :title="title"
      class="demo-preview__frame"
      :style="{ minHeight: `${height}px` }"
    />

    <details class="demo-preview__code">
      <summary>
        <span>Source Code</span>
        <button type="button" @click.prevent="copyCode">{{ copied ? 'Copied' : 'Copy' }}</button>
      </summary>
      <pre v-if="!loading"><code>{{ sourceCode }}</code></pre>
      <p v-else>Loading source...</p>
    </details>
  </section>
</template>

<style scoped>
.demo-preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  margin: 18px 0;
  background: var(--vp-c-bg-soft);
}

.demo-preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: linear-gradient(120deg, rgba(13, 148, 136, 0.12), rgba(14, 116, 144, 0.12));
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-preview__header h3 {
  margin: 0;
  font-size: 14px;
}

.demo-preview__header a {
  font-size: 12px;
}

.demo-preview__frame {
  width: 100%;
  border: 0;
  display: block;
  background: #fff;
}

.demo-preview__code {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.demo-preview__code summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  cursor: pointer;
}

.demo-preview__code summary::-webkit-details-marker {
  display: none;
}

.demo-preview__code button {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 4px 10px;
  cursor: pointer;
}

.demo-preview__code pre {
  margin: 0;
  padding: 12px 14px 14px;
  overflow-x: auto;
  max-height: 320px;
  background: var(--vp-code-block-bg);
}

.demo-preview__code p {
  margin: 0;
  padding: 10px 14px 14px;
  color: var(--vp-c-text-2);
}
</style>
