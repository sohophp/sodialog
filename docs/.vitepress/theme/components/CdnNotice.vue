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
  <blockquote>
    <p><strong>CDN 复制说明</strong>：生产示例固定当前文档版本，不建议使用 <code>@latest</code>。</p>
    <p><code>css</code>: <code>https://cdn.jsdelivr.net/npm/sodialog@{{ version }}/dist/sodialog.css</code></p>
    <p><code>js</code>: <code>https://cdn.jsdelivr.net/npm/sodialog@{{ version }}/dist/sodialog.es.js</code></p>
  </blockquote>
</template>
