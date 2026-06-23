<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

const version = computed(() => {
  const value = (theme.value as { version?: unknown }).version
  return typeof value === 'string' ? value : ''
})
</script>

<template>
  <span class="version-badge" aria-label="当前稳定版本">
    v{{ version }} · Latest stable
  </span>
</template>

<style scoped>
.version-badge {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 650;
}
</style>
