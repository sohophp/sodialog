<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

const props = withDefaults(
  defineProps<{
    title: string
    description: string
    labHref?: string
    apiHref?: string
    sourceHref?: string
    installCode?: string
    status?: string
  }>(),
  {
    labHref: '/examples/',
    apiHref: '/api/',
    sourceHref: 'https://github.com/sohophp/sodialog/blob/main/src/lib.ts',
    installCode: "npm install sodialog\n\nimport 'sodialog/style.css'",
    status: 'Stable',
  },
)

const { theme } = useData()
const copied = ref(false)

const version = computed(() => {
  const value = (theme.value as { version?: unknown }).version
  return typeof value === 'string' ? value : ''
})

const copyInstall = async () => {
  try {
    await navigator.clipboard.writeText(props.installCode)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch (error) {
    console.error('copy failed', error)
  }
}
</script>

<template>
  <header class="doc-page-header">
    <div>
      <p class="doc-page-header__eyebrow">SoDialog Component</p>
      <div class="doc-page-header__title">{{ title }}</div>
      <p>{{ description }}</p>
    </div>
    <nav class="doc-page-header__actions" aria-label="页面快捷操作">
      <a :href="labHref">在线试用</a>
      <a :href="apiHref">查看 API</a>
      <button type="button" @click="copyInstall">{{ copied ? '已复制' : '复制安装代码' }}</button>
      <a :href="sourceHref" target="_blank" rel="noreferrer">查看源码 ↗</a>
    </nav>
    <div class="doc-page-header__meta">
      <span>v{{ version }}</span>
      <span>{{ status }}</span>
      <span>ESM</span>
      <span>TypeScript</span>
      <span>No runtime dependency</span>
    </div>
  </header>
</template>

<style scoped>
.doc-page-header {
  display: grid;
  gap: 16px;
  margin: 0 0 28px;
  padding: 22px 0 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.doc-page-header__eyebrow {
  margin: 0 0 8px;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 700;
}

.doc-page-header__title {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: clamp(1.55rem, 3vw, 2.1rem);
  font-weight: 760;
  line-height: 1.2;
}

.doc-page-header p {
  max-width: 760px;
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.doc-page-header__actions,
.doc-page-header__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.doc-page-header__actions a,
.doc-page-header__actions button,
.doc-page-header__meta span {
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 620;
}

.doc-page-header__actions a,
.doc-page-header__actions button {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.doc-page-header__actions button {
  font: inherit;
}

.doc-page-header__actions a:first-child {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 48%, var(--vp-c-divider));
  color: var(--vp-c-brand-1);
}

.doc-page-header__actions a:focus-visible,
.doc-page-header__actions button:focus-visible {
  outline: 2px solid var(--vp-c-brand-2);
  outline-offset: 2px;
}

.doc-page-header__meta span {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
}
</style>
