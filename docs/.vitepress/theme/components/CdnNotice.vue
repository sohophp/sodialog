<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme, lang } = useData()

const version = computed(() => {
  const value = (theme.value as { version?: unknown }).version
  return typeof value === 'string' ? value : ''
})

const copy = computed(() => {
  if (lang.value.startsWith('en')) {
    return {
      title: 'CDN copy note:',
      description: 'Interactive demos use the library built with this site. The URLs below use the latest published version; Unreleased features appear there after publication. Pin a version in production.',
    }
  }
  if (lang.value.startsWith('zh-Hant')) {
    return {
      title: 'CDN 複製說明：',
      description: '站內互動範例使用本站建置的程式庫。下方網址指向已發布版本；Unreleased 功能需待發布後才可透過 CDN 使用。正式環境請固定版本。',
    }
  }
  return {
    title: 'CDN 复制说明：',
    description: '站内交互示例使用本站构建的库。下方地址指向已发布版本；Unreleased 功能发布后才可通过 CDN 使用。生产环境请固定版本。',
  }
})
</script>

<template>
  <blockquote>
    <p><strong>{{ copy.title }}</strong>{{ copy.description }}</p>
    <p><code>css</code>: <code>https://cdn.jsdelivr.net/npm/sodialog@{{ version }}/dist/sodialog.css</code></p>
    <p><code>js</code>: <code>https://cdn.jsdelivr.net/npm/sodialog@{{ version }}/dist/sodialog.es.js</code></p>
  </blockquote>
</template>
