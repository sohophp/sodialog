<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import SiteFooterLinks from './components/SiteFooterLinks.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <SiteFooterLinks />
    </template>
  </Layout>
</template>
