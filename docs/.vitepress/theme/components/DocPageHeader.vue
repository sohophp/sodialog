<script setup lang="ts">
defineProps<{
  title: string
  description: string
  labHref?: string
  apiHref?: string
  sourceHref?: string
  installCode?: string
  status?: string
}>()
</script>

<template>
  <header class="doc-page-header">
    <div>
      <p class="doc-page-header__eyebrow">SoDialog Component</p>
      <div class="doc-page-header__title">{{ title }}</div>
      <p>{{ description }}</p>
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
</style>
