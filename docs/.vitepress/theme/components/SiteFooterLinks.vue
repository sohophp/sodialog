<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const copy = computed(() => {
  if (lang.value === 'en-US') {
    return {
      prefix: '/en',
      docs: 'Docs',
      components: 'Components',
      api: 'API',
      examples: 'Examples',
      changelog: 'Changelog',
      versions: 'Versions',
      notes: 'Notes',
    }
  }

  if (lang.value === 'zh-Hant') {
    return {
      prefix: '/zh-TW',
      docs: '文件',
      components: '元件',
      api: 'API',
      examples: '範例',
      changelog: '更新日誌',
      versions: '版本',
      notes: '開發筆記',
    }
  }

  return {
    prefix: '',
    docs: '文档',
    components: '组件',
    api: 'API',
    examples: '示例',
    changelog: '更新日志',
    versions: '版本',
    notes: '开发笔记',
  }
})

const localizedPath = (path: string) => `${copy.value.prefix}${path}`
</script>

<template>
  <footer class="site-footer-links" aria-label="站点页脚导航">
    <nav>
      <a :href="localizedPath('/getting-started')">{{ copy.docs }}</a>
      <a :href="localizedPath('/components/modal')">{{ copy.components }}</a>
      <a :href="localizedPath('/api/')">{{ copy.api }}</a>
      <a :href="localizedPath('/examples/')">{{ copy.examples }}</a>
      <a :href="localizedPath('/changelog/')">{{ copy.changelog }}</a>
      <a :href="localizedPath('/versions/')">{{ copy.versions }}</a>
      <a :href="localizedPath('/blog/')">{{ copy.notes }}</a>
      <a href="https://github.com/sohophp/sodialog" target="_blank" rel="noreferrer">GitHub ↗</a>
      <a href="https://www.npmjs.com/package/sodialog" target="_blank" rel="noreferrer">npm ↗</a>
    </nav>
  </footer>
</template>

<style scoped>
.site-footer-links {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.site-footer-links nav {
  display: flex;
  width: min(1120px, calc(100% - 48px));
  flex-wrap: wrap;
  gap: 10px 18px;
  margin: 0 auto;
  padding: 22px 0;
}

.site-footer-links a {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
}

.site-footer-links a:hover,
.site-footer-links a:focus-visible {
  color: var(--vp-c-brand-1);
}
</style>
