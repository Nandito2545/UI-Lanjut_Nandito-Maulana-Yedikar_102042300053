<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'

const route = useRoute()
// Dashboard memakai layout Rail & Pane sendiri (tanpa navbar publik)
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
</script>

<template>
  <RouterView v-if="isDashboard" />

  <div v-else class="public-layout">
    <!-- Z-PATTERN: Garis horizontal navbar sebagai titik awal pandangan -->
    <header class="navbar">
      <div class="navbar-inner">
        <RouterLink to="/" class="brand">Gatherly</RouterLink>
        <nav class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/browse/events">Browse</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink to="/dashboard" class="nav-organizer">Organizer Dashboard</RouterLink>
        </nav>
      </div>
    </header>

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

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.brand {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--primary);
  text-decoration: none;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  color: var(--primary);
}

.nav-organizer {
  border: 1px solid var(--primary);
  padding: var(--space-2) var(--space-4);
  border-radius: 10px;
  color: var(--primary) !important;
}

.nav-organizer:hover {
  background: var(--primary);
  color: #fff !important;
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
