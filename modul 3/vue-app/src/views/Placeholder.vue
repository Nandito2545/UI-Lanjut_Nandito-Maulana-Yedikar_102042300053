<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="placeholder-page">
    <h1>{{ title }}</h1>
    <p>This page is not part of the Modul 2 layout exercise.</p>
    <router-link to="/" class="back-link">&larr; Back to Home</router-link>
  </div>
</template>

<style scoped>
.placeholder-page {
  text-align: center;
  padding: var(--space-16) var(--space-6);
}

.placeholder-page p {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.back-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}
</style>
