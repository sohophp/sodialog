<script setup lang="ts">
defineProps<{
  rows: Array<{
    name: string
    type: string
    defaultValue: string
    required: string
    description: string
    since?: string
    deprecated?: string
  }>
}>()
</script>

<template>
  <div class="api-param-table">
    <table>
      <thead>
        <tr>
          <th>参数名</th>
          <th>类型</th>
          <th>默认值</th>
          <th>必填</th>
          <th>描述</th>
          <th>Since</th>
          <th>Deprecated</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td><code>{{ row.name }}</code></td>
          <td><code>{{ row.type }}</code></td>
          <td>{{ row.defaultValue }}</td>
          <td>{{ row.required }}</td>
          <td>{{ row.description }}</td>
          <td>{{ row.since || '-' }}</td>
          <td>{{ row.deprecated || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.api-param-table {
  overflow-x: auto;
  margin: 16px 0 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.api-param-table table {
  min-width: 860px;
  margin: 0;
  border: 0;
}

.api-param-table th,
.api-param-table td {
  border: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
  text-align: left;
}

.api-param-table tbody tr:last-child td {
  border-bottom: 0;
}
</style>
