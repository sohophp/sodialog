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
      description: 'Interactive demos and the URLs below use the same published version. Pin a version in production.',
    }
  }
  if (lang.value.startsWith('zh-Hant')) {
    return {
      title: 'CDN 複製說明：',
      description: '站內互動範例與下方網址使用同一個已發布版本。正式環境請固定版本。',
    }
  }
  return {
    title: 'CDN 复制说明：',
    description: '站内交互示例与下方地址使用同一个已发布版本。生产环境请固定版本。',
  }
})
</script>

<template>
  <blockquote>
    <p><strong>{{ copy.title }}</strong>{{ copy.description }}</p>
    <p><code>css</code>: <code>https://unpkg.com/sodialog@{{ version }}/dist/sodialog.css</code></p>
    <p><code>js</code>: <code>https://unpkg.com/sodialog@{{ version }}/dist/sodialog.es.js</code></p>
  </blockquote>
</template>
