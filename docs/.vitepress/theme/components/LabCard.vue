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
    <div class="lab-card__preview" :data-preview="preview" aria-hidden="true">
      <span v-for="index in 3" :key="index" />
    </div>
    <div class="lab-card__body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="lab-card__tags">
        <span v-for="tag in tags" :key="tag">{{ tag }}</span>
      </div>
      <div class="lab-card__meta">
        <VersionBadge />
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
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.lab-card__preview {
  position: relative;
  min-height: 128px;
  border-bottom: 1px solid var(--vp-c-divider);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--vp-c-divider) 52%, transparent) 1px, transparent 1px),
    linear-gradient(color-mix(in srgb, var(--vp-c-divider) 52%, transparent) 1px, transparent 1px),
    var(--vp-c-bg-soft);
  background-size: 24px 24px;
}

.lab-card__preview span {
  position: absolute;
  display: block;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 32%, var(--vp-c-divider));
  border-radius: 6px;
  background: var(--vp-c-bg);
}

.lab-card__preview[data-preview='modal'] span:first-child {
  inset: 32px 54px 30px;
}

.lab-card__preview[data-preview='toast'] span {
  right: 20px;
  width: 170px;
  height: 28px;
}

.lab-card__preview[data-preview='toast'] span:first-child { top: 26px; }
.lab-card__preview[data-preview='toast'] span:nth-child(2) { top: 60px; }
.lab-card__preview[data-preview='toast'] span:nth-child(3) { top: 94px; }

.lab-card__preview[data-preview='offcanvas'] span:first-child {
  inset: 0 0 0 auto;
  width: 34%;
  border-radius: 0;
}

.lab-card__preview[data-preview='menu'] span:first-child {
  top: 28px;
  left: 34px;
  width: 180px;
  height: 78px;
}

.lab-card__body {
  padding: 18px;
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

.lab-card__meta {
  margin-top: 14px;
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
