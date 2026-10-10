<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isHome = computed(() => route.path === '/')
const isProduct = computed(() => route.name === 'product')

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="app-wrapper">
    <!-- Header Container -->
    <header class="header">
      <!-- Top banner / Download app (Desktop only) -->
      <div class="header-top">
        <div class="container header-top-inner">
          <div class="header-top-left">
            <a href="#" class="top-link"><i class="ph ph-device-mobile"></i> Download Tokopedia App</a>
          </div>
          <div class="header-top-right">
            <a href="#" class="top-link">Tentang Tokopedia</a>
            <a href="#" class="top-link">Mitra Tokopedia</a>
            <a href="#" class="top-link">Mulai Berjualan</a>
            <a href="#" class="top-link">Promo</a>
            <a href="#" class="top-link">Tokopedia Care</a>
          </div>
        </div>
      </div>
      
      <!-- Main Navbar -->
      <div class="header-main">
        <div class="container header-main-inner">
          <!-- Back button on mobile when not on home -->
          <button v-if="!isHome" class="mobile-back-btn" @click="goBack" aria-label="Kembali">
            <i class="ph ph-arrow-left"></i>
          </button>

          <!-- Logo -->
          <RouterLink to="/" class="logo">
            <span class="logo-text">tokopedia</span>
          </RouterLink>
          
          <!-- Category Hover (Desktop only) -->
          <button class="category-toggle">
            Kategori
          </button>
          
          <!-- Search Bar -->
          <div class="search-bar">
            <button class="search-btn"><i class="ph ph-magnifying-glass"></i></button>
            <input type="text" placeholder="Cari di Tokopedia" />
          </div>
          
          <!-- Header icons (Desktop & Mobile shortcuts) -->
          <div class="header-icons">
            <RouterLink to="/cart" class="icon icon-cart" aria-label="Keranjang">
              <i class="ph ph-shopping-cart"></i>
              <span class="badge-dot">1</span>
            </RouterLink>
            <RouterLink to="/notifications" class="icon desktop-only" aria-label="Notifikasi">
              <i class="ph ph-bell"></i>
            </RouterLink>
            <RouterLink to="/messages" class="icon" aria-label="Pesan">
              <i class="ph ph-envelope-simple"></i>
            </RouterLink>
          </div>
          
          <!-- User Info (Desktop only) -->
          <RouterLink to="/profile" class="header-user desktop-only">
            <div class="user-avatar"></div>
            <span class="user-name">User Profile</span>
          </RouterLink>
        </div>
      </div>
      
      <!-- Bottom Links / Location Bar -->
      <div class="header-bottom">
        <div class="container header-bottom-inner">
          <div class="trending-links desktop-only">
            <a href="#">Sepatu Pria</a>
            <a href="#">Kipas Angin</a>
            <a href="#">Tas Selempang</a>
            <a href="#">Kardus Packing</a>
            <a href="#">Jas Hujan</a>
            <a href="#">Botol Minum</a>
          </div>
          <div class="location">
            <a href="#" class="loc-link"><i class="ph-fill ph-map-pin" style="color:var(--color-primary);"></i> Dikirim ke <b>Jakarta Pusat</b> <i class="ph ph-caret-down"></i></a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Route -->
    <main class="main-content" :class="{ 'with-bottom-nav': !isProduct }">
      <RouterView />
    </main>

    <!-- Mobile Bottom Navigation Bar (Tokopedia signature) -->
    <nav v-if="!isProduct" class="mobile-bottom-nav">
      <RouterLink to="/" class="nav-item" :class="{ active: route.path === '/' }">
        <i :class="route.path === '/' ? 'ph-fill ph-house' : 'ph ph-house'"></i>
        <span>Home</span>
      </RouterLink>
      <a href="#" class="nav-item">
        <i class="ph ph-heart"></i>
        <span>Wishlist</span>
      </a>
      <RouterLink to="/cart" class="nav-item" :class="{ active: route.path === '/cart' }">
        <div class="nav-icon-badge">
          <i :class="route.path === '/cart' ? 'ph-fill ph-shopping-cart-simple' : 'ph ph-shopping-cart-simple'"></i>
          <span class="badge-count">1</span>
        </div>
        <span>Transaksi</span>
      </RouterLink>
      <RouterLink to="/notifications" class="nav-item" :class="{ active: route.path === '/notifications' }">
        <div class="nav-icon-badge">
          <i :class="route.path === '/notifications' ? 'ph-fill ph-bell' : 'ph ph-bell'"></i>
          <span class="badge-dot-small"></span>
        </div>
        <span>Notifikasi</span>
      </RouterLink>
      <RouterLink to="/profile" class="nav-item" :class="{ active: route.path === '/profile' }">
        <i :class="route.path === '/profile' ? 'ph-fill ph-user' : 'ph ph-user'"></i>
        <span>Akun</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.header {
  background: var(--color-surface);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.header-top {
  background: #f3f4f5;
  font-size: 12px;
  color: var(--color-text-muted);
  padding: 4px 0;
  display: flex;
}

.header-top-inner {
  display: flex;
  justify-content: space-between;
}

.header-top-right {
  display: flex;
  gap: 24px;
}

.top-link {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}
.top-link:hover {
  color: var(--color-primary);
}

/* Main Navbar */
.header-main-inner {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 20px;
}

.mobile-back-btn {
  display: none;
  background: none;
  border: none;
  font-size: 22px;
  color: var(--color-text-main);
  cursor: pointer;
  padding: 4px;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -1px;
}

.category-toggle {
  font-size: 14px;
  color: var(--color-text-main);
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
}
.category-toggle:hover {
  background: #f3f4f5;
}

.search-bar {
  flex: 1;
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  height: 40px;
  background: #fff;
  align-items: center;
}

.search-bar input {
  flex: 1;
  border: none;
  padding: 0 12px 0 4px;
  font-size: 14px;
  outline: none;
  background: transparent;
}

.search-btn {
  background: transparent;
  border: none;
  width: 36px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 18px;
}

.header-icons {
  display: flex;
  gap: 18px;
  font-size: 22px;
  padding: 0 16px;
  border-right: 1px solid var(--color-border);
  align-items: center;
}
.icon {
  cursor: pointer;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  position: relative;
}
.icon:hover {
  color: var(--color-primary);
}

.icon-cart .badge-dot {
  position: absolute;
  top: -6px;
  right: -8px;
  background: var(--color-danger);
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
}

.user-name {
  font-size: 14px;
  font-weight: 600;
}

/* Header Bottom */
.header-bottom {
  border-top: 1px solid rgba(0,0,0,0.03);
}

.header-bottom-inner {
  display: flex;
  justify-content: space-between;
  padding: 6px 16px 8px 200px;
  font-size: 12px;
  color: var(--color-text-muted);
}

.trending-links {
  display: flex;
  gap: 16px;
}

.trending-links a:hover {
  color: var(--color-primary);
}

.location {
  display: flex;
  align-items: center;
}

.loc-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-text-muted);
  white-space: nowrap;
}
.loc-link:hover {
  color: var(--color-primary);
}

.main-content {
  flex: 1;
}

/* Mobile Bottom Navigation Bar */
.mobile-bottom-nav {
  display: none;
}

/* RESPONSIVE STYLES FOR MOBILE */
@media (max-width: 768px) {
  .header-top {
    display: none;
  }

  .desktop-only {
    display: none !important;
  }

  .category-toggle {
    display: none;
  }

  .mobile-back-btn {
    display: flex;
  }

  .header-main-inner {
    padding: 8px 12px;
    gap: 10px;
  }

  .logo {
    display: none; /* In Tokopedia mobile header, logo is hidden or subtle when search is active */
  }

  .search-bar {
    height: 36px;
    background: #f3f4f5;
    border-color: transparent;
  }

  .search-bar input {
    font-size: 13px;
  }

  .header-icons {
    border-right: none;
    padding: 0 4px;
    gap: 14px;
    font-size: 22px;
  }

  .header-bottom-inner {
    padding: 6px 12px;
    justify-content: flex-start;
    font-size: 11px;
    background: #fafafa;
  }

  .main-content.with-bottom-nav {
    padding-bottom: 64px;
  }

  /* Fixed Mobile Bottom Navigation */
  .mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: #ffffff;
    border-top: 1px solid var(--color-border);
    justify-content: space-around;
    align-items: center;
    z-index: 999;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.06);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    font-size: 10px;
    font-weight: 600;
    gap: 2px;
    flex: 1;
    height: 100%;
    transition: color 0.15s ease;
  }

  .nav-item i {
    font-size: 22px;
  }

  .nav-item.active {
    color: var(--color-primary);
  }

  .nav-icon-badge {
    position: relative;
    display: inline-flex;
  }

  .badge-count {
    position: absolute;
    top: -4px;
    right: -8px;
    background: var(--color-danger);
    color: white;
    font-size: 9px;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 8px;
    min-width: 14px;
    text-align: center;
  }

  .badge-dot-small {
    position: absolute;
    top: -1px;
    right: -2px;
    width: 7px;
    height: 7px;
    background: var(--color-danger);
    border-radius: 50%;
    border: 1px solid #fff;
  }
}
</style>
