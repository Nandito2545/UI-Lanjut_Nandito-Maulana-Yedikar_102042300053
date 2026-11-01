<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavBar from '@/components/app/NavBar.vue'

const route = useRoute()
// Dashboard memakai layout Rail & Pane sendiri (tanpa navbar publik)
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
</script>

<template>
  <RouterView v-if="isDashboard" />

  <div v-else class="public-layout">
    <!-- Z-PATTERN: Garis horizontal navbar sebagai titik awal pandangan -->
    <NavBar />

    <main class="page-container">
      <RouterView />
    </main>

    <footer class="footer">&copy; 2026 Gatherly &mdash; Community Event Platform</footer>
  </div>
</template>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-container {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.footer {
  text-align: center;
  padding: var(--space-8) var(--space-6);
  color: var(--text-muted);
  background: var(--bg-gray);
  border-top: 1px solid var(--border-color);
}
</style>
