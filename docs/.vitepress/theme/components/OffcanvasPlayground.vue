<script setup lang="ts">
import { ref } from 'vue'
import { openOffcanvas, type SoOffcanvasPlacement } from '../../../../src/lib'

const status = ref('Ready. Open a panel from this page.')
const placements: SoOffcanvasPlacement[] = ['start', 'end', 'top', 'bottom']

const openPanel = (placement: SoOffcanvasPlacement) => {
  status.value = `Opened ${placement}.`
  openOffcanvas({
    title: `Offcanvas ${placement}`,
    placement,
    animation: placement === 'top' || placement === 'bottom' ? 'fade' : 'slide',
    width: placement === 'start' || placement === 'end' ? 420 : '100vw',
    height: placement === 'top' || placement === 'bottom' ? '42vh' : '100vh',
    content: `<p>Current placement: <strong>${placement}</strong></p><p>This panel is opened by the docs page itself, not inside an iframe.</p>`,
  })
}
</script>

<template>
  <section class="offcanvas-playground" aria-label="Offcanvas Playground">
    <div>
      <h2>Offcanvas Playground</h2>
      <p>{{ status }}</p>
    </div>
    <div class="offcanvas-playground__actions">
      <button v-for="placement in placements" :key="placement" type="button" @click="openPanel(placement)">
        {{ placement }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.offcanvas-playground {
  display: grid;
  gap: 16px;
  margin: 18px 0 28px;
  padding: 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.offcanvas-playground h2 {
  margin: 0 0 6px;
  border: 0;
  padding: 0;
  font-size: 16px;
}

.offcanvas-playground p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.offcanvas-playground__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.offcanvas-playground button {
  min-height: 38px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  padding: 0 14px;
  color: var(--vp-c-bg);
  background: var(--vp-c-brand-1);
  font: inherit;
  cursor: pointer;
}
</style>
