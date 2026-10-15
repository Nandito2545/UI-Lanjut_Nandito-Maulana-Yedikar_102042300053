<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'

const route = useRoute()
// Dashboard memakai layout Rail & Pane sendiri (tanpa navbar publik)
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
const isBrowseActive = computed(() => route.path.startsWith('/browse'))

const openBrowse = ref(false)
const openLang = ref(false)
const openMenu = ref(false)
const lang = ref('EN')

function closeAll() {
  openBrowse.value = false
  openLang.value = false
  openMenu.value = false
}

function toggle(target: 'browse' | 'lang' | 'menu') {
  const next = {
    browse: !openBrowse.value,
    lang: !openLang.value,
    menu: !openMenu.value,
  }[target]
  closeAll()
  if (target === 'browse') openBrowse.value = next
  if (target === 'lang') openLang.value = next
  if (target === 'menu') openMenu.value = next
}

function setLang(value: string) {
  lang.value = value
  closeAll()
}

watch(() => route.fullPath, closeAll)
onMounted(() => document.addEventListener('click', closeAll))
onBeforeUnmount(() => document.removeEventListener('click', closeAll))
</script>

<template>
  <RouterView v-if="isDashboard" />

  <div v-else class="public-layout">
    <!-- Z-PATTERN: Garis horizontal navbar sebagai titik awal pandangan -->
    <header class="navbar">
      <div class="navbar-inner">
        <RouterLink to="/" class="brand">
          <svg class="brand-logo" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 2l12 7v14l-12 7L4 23V9z" fill="#fff" />
            <text x="16" y="21" text-anchor="middle" font-size="13" font-weight="800" fill="#2b1f66">G</text>
          </svg>
          <span>Gatherly</span>
        </RouterLink>

        <nav class="nav-links">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>

          <div class="dropdown" @click.stop>
            <button
              type="button"
              class="nav-link nav-button"
              :class="{ 'router-link-active': isBrowseActive }"
              @click="toggle('browse')"
            >
              Browse
              <svg class="chevron" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
            <div v-if="openBrowse" class="dropdown-menu">
              <RouterLink to="/browse/events" class="dropdown-item">Browse Events</RouterLink>
            </div>
          </div>

          <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
          <RouterLink to="/dashboard" class="nav-link">Organizer Dashboard</RouterLink>
        </nav>

        <div class="nav-actions" @click.stop>
          <div class="dropdown">
            <button type="button" class="lang-button" @click="toggle('lang')">
              <svg class="globe" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6" />
                <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" stroke-width="1.6" />
              </svg>
              {{ lang }}
              <svg class="chevron" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
            <div v-if="openLang" class="dropdown-menu dropdown-right">
              <button type="button" class="dropdown-item" @click="setLang('EN')">EN</button>
              <button type="button" class="dropdown-item" @click="setLang('ID')">ID</button>
            </div>
          </div>

          <div class="dropdown">
            <button type="button" class="menu-button" aria-label="Menu" @click="toggle('menu')">
              <span></span><span></span><span></span>
            </button>
            <div v-if="openMenu" class="dropdown-menu dropdown-right">
              <RouterLink to="/" class="dropdown-item">Home</RouterLink>
              <RouterLink to="/about" class="dropdown-item">About</RouterLink>
              <RouterLink to="/browse/events" class="dropdown-item">Browse Events</RouterLink>
              <RouterLink to="/contact" class="dropdown-item">Contact</RouterLink>
              <RouterLink to="/dashboard" class="dropdown-item">Organizer Dashboard</RouterLink>
            </div>
          </div>
        </div>
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

/* NAVBAR */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(90deg, #2a2063 0%, #3b2d7d 100%);
  box-shadow: 0 6px 18px rgba(28, 25, 72, 0.25);
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-3) var(--space-6);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--space-6);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  justify-self: start;
}

.brand-logo {
  width: 24px;
  height: 24px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-4);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 10px;
  transition: background-color 0.2s;
}

.nav-button {
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active:not([href='/']),
.nav-link.router-link-exact-active {
  background-color: var(--primary);
  box-shadow: 0 4px 14px rgba(102, 68, 255, 0.45);
}

/* Dashboard link tidak ditandai aktif di navbar publik */
.nav-link[href='/dashboard'].router-link-active {
  background: none;
  box-shadow: none;
}

.chevron {
  width: 9px;
  height: 6px;
}

/* RIGHT ACTIONS */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  justify-self: end;
}

.lang-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  background: none;
  border: none;
  color: #fff;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: var(--space-2);
  border-radius: 8px;
}

.lang-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.globe {
  width: 16px;
  height: 16px;
}

.menu-button {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 36px;
  height: 36px;
  padding: 0 var(--space-2);
  background-color: rgba(255, 255, 255, 0.12);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu-button span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: #fff;
}

/* DROPDOWNS */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + var(--space-2));
  left: 0;
  min-width: 190px;
  display: flex;
  flex-direction: column;
  padding: var(--space-2);
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(28, 25, 72, 0.18);
}

.dropdown-right {
  left: auto;
  right: 0;
}

.dropdown-item {
  padding: var(--space-2) var(--space-3);
  background: none;
  border: none;
  border-radius: 8px;
  text-align: left;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-main);
  text-decoration: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: var(--bg-gray);
  color: var(--primary);
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

@media (max-width: 860px) {
  .navbar-inner {
    grid-template-columns: auto 1fr;
  }

  .nav-links {
    display: none;
  }
}
</style>
