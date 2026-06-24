<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tags: string[]
  labHref: string
  apiHref: string
  preview: 'modal' | 'toast' | 'offcanvas' | 'menu'
}>()
</script>

<template>
  <article class="lab-card">
    <div class="lab-card__body">
      <p class="lab-card__eyebrow">Playbook</p>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="lab-card__tags">
        <span v-for="tag in tags" :key="tag">{{ tag }}</span>
      </div>
      <nav class="lab-card__actions" aria-label="Lab 快捷操作">
        <a :href="labHref">Open Lab</a>
        <a :href="apiHref">View API</a>
      </nav>
    </div>
  </article>
</template>

<style scoped>
.lab-card {
  min-height: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.lab-card__body {
  display: grid;
  min-height: 100%;
  align-content: start;
  padding: 18px;
}

.lab-card__eyebrow {
  margin: 0 0 8px;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 700;
}

.lab-card h3 {
  margin: 0;
  font-size: 18px;
}

.lab-card p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.lab-card__tags,
.lab-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.lab-card__tags span {
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.lab-card__actions a {
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  font-size: 13px;
  font-weight: 620;
}
</style>
