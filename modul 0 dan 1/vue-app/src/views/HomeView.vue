<template>
  <div class="home-view">
    <div class="container content-inner">
      <!-- Top Carousel Section -->
      <section class="banner-section">
        <a href="#">
          <img src="/promo_banner_1_1790215661982.jpg" alt="Promo Banner" class="hero-banner" />
        </a>
      </section>

      <!-- Mobile Wallet & Quick Balance Bar (Tokopedia iconic) -->
      <section class="wallet-bar">
        <div class="wallet-item">
          <div class="wallet-icon gopay">
            <i class="ph-bold ph-wallet"></i>
          </div>
          <div class="wallet-info">
            <span class="wallet-label">GoPay</span>
            <span class="wallet-value">Rp150.000</span>
          </div>
        </div>
        <div class="wallet-divider"></div>
        <div class="wallet-item">
          <div class="wallet-icon coins">
            <i class="ph-fill ph-coins"></i>
          </div>
          <div class="wallet-info">
            <span class="wallet-label">Coins</span>
            <span class="wallet-value">12.500</span>
          </div>
        </div>
        <div class="wallet-divider"></div>
        <div class="wallet-item">
          <div class="wallet-icon plus">
            <i class="ph-bold ph-crown"></i>
          </div>
          <div class="wallet-info">
            <span class="wallet-label">Langganan</span>
            <span class="wallet-value">Plus</span>
          </div>
        </div>
      </section>

      <!-- Categories Grid / Horizontal Scroll for Mobile -->
      <section class="category-section">
        <RouterLink to="#" class="category-item" v-for="(cat, idx) in categories" :key="idx">
          <div class="cat-icon">
            <i :class="cat.icon" style="font-size: 22px; color: var(--color-primary);"></i>
          </div>
          <span>{{ cat.name }}</span>
        </RouterLink>
      </section>

      <!-- Flash Sale Section -->
      <section class="flash-sale-section">
        <div class="section-header">
          <h2>Kejar Diskon</h2>
          <div class="countdown">Berakhir dalam <span>02</span> : <span>45</span> : <span>12</span></div>
          <a href="#" class="lihat-semua">Lihat Semua</a>
        </div>
        <div class="flash-sale-scroll">
          <RouterLink :to="'/product/' + product.id" class="product-card" v-for="product in flashSaleProducts" :key="product.id">
            <img :src="product.img" class="p-img" />
            <div class="p-info">
              <div class="p-title">{{ product.name }}</div>
              <div class="p-price">{{ product.price }}</div>
              <div class="p-discount-row">
                <span class="p-badge">{{ product.discount }}</span>
                <span class="p-original">{{ product.originalPrice }}</span>
              </div>
              <div class="p-progress">
                <div class="p-progress-bar" :style="`width: ${product.stock}%`"></div>
                <span>Segera Habis</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- Recommendation Section -->
      <section class="recommendation-section">
        <div class="section-tabs">
          <button class="tab active">For You</button>
          <button class="tab">Special Discount</button>
          <button class="tab">Elektronik</button>
          <button class="tab">Fashion</button>
          <button class="tab">Kebutuhan Rumah</button>
        </div>
        
        <div class="product-grid">
          <RouterLink :to="'/product/' + product.id" class="product-card" v-for="product in allProducts" :key="product.id">
            <img :src="product.img" class="p-img" />
            <div class="p-info">
              <div class="p-title">{{ product.name }}</div>
              <div class="p-price">{{ product.price }}</div>
              <div class="p-location">
                <span class="loc-icon"><i class="ph-fill ph-check-circle"></i> Official Store</span>
                <span>Jakarta Pusat</span>
              </div>
              <div class="p-rating">
                <i class="ph-fill ph-star" style="color:var(--color-warning);"></i> 4.9 | Terjual 10rb+
              </div>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = ref([
  { name: 'Official Store', icon: 'ph-fill ph-shield-check' },
  { name: 'Top-Up & Tagihan', icon: 'ph-bold ph-receipt' },
  { name: 'Elektronik', icon: 'ph-bold ph-devices' },
  { name: 'Fashion', icon: 'ph-bold ph-t-shirt' },
  { name: 'Keuangan', icon: 'ph-bold ph-money' },
  { name: 'Kesehatan', icon: 'ph-bold ph-first-aid' },
  { name: 'Makanan', icon: 'ph-bold ph-bowl-food' },
  { name: 'Otomotif', icon: 'ph-bold ph-car' },
  { name: 'Olahraga', icon: 'ph-bold ph-barbell' },
  { name: 'Lihat Semua', icon: 'ph-bold ph-grid-four' }
])

const flashSaleProducts = ref([
  { id: 1, name: 'Premium Wireless Headphones Active Noise Cancelling', price: 'Rp99.000', originalPrice: 'Rp599.000', discount: '85%', stock: 80, img: '/product_headphones_1790215734998.jpg' },
  { id: 2, name: 'Flagship Smartphone Pro Max 256GB 5G', price: 'Rp8.999.000', originalPrice: 'Rp12.999.000', discount: '30%', stock: 40, img: '/product_phone_1790215690906.jpg' },
  { id: 3, name: 'Running Sneakers Alpha Boost Comfort', price: 'Rp450.000', originalPrice: 'Rp900.000', discount: '50%', stock: 90, img: '/product_sneakers_1790215678458.jpg' },
  { id: 4, name: 'Premium Wireless Headphones ANC Studio', price: 'Rp99.000', originalPrice: 'Rp599.000', discount: '85%', stock: 80, img: '/product_headphones_1790215734998.jpg' },
  { id: 5, name: 'Flagship Smartphone Pro Max Ultra', price: 'Rp8.999.000', originalPrice: 'Rp12.999.000', discount: '30%', stock: 40, img: '/product_phone_1790215690906.jpg' },
])

const allProducts = ref([
  { id: 1, name: 'Premium Wireless Headphones Active Noise Cancelling', price: 'Rp1.200.000', img: '/product_headphones_1790215734998.jpg' },
  { id: 2, name: 'Flagship Smartphone Pro Max 256GB 5G', price: 'Rp15.000.000', img: '/product_phone_1790215690906.jpg' },
  { id: 3, name: 'Running Sneakers Alpha Boost Comfort', price: 'Rp2.500.000', img: '/product_sneakers_1790215678458.jpg' },
  { id: 4, name: 'Premium Wireless Headphones Hi-Res Audio Studio', price: 'Rp1.200.000', img: '/product_headphones_1790215734998.jpg' },
  { id: 5, name: 'Flagship Smartphone Pro Max Midnight Black', price: 'Rp15.000.000', img: '/product_phone_1790215690906.jpg' },
  { id: 6, name: 'Running Sneakers Alpha Sport Edition', price: 'Rp2.500.000', img: '/product_sneakers_1790215678458.jpg' },
  { id: 7, name: 'Premium Wireless Headphones Bass Boost Edition', price: 'Rp1.200.000', img: '/product_headphones_1790215734998.jpg' },
  { id: 8, name: 'Flagship Smartphone Pro Max Titanium Grey', price: 'Rp15.000.000', img: '/product_phone_1790215690906.jpg' },
  { id: 9, name: 'Running Sneakers Alpha Classic White', price: 'Rp2.500.000', img: '/product_sneakers_1790215678458.jpg' },
  { id: 10, name: 'Premium Wireless Headphones Compact Foldable', price: 'Rp1.200.000', img: '/product_headphones_1790215734998.jpg' }
])
</script>

<style scoped>
.home-view {
  padding: 24px 0;
}

.content-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Banner */
.banner-section {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.hero-banner {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

/* Wallet Bar */
.wallet-bar {
  display: flex;
  background: var(--color-surface);
  border-radius: 12px;
  padding: 12px 20px;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  border: 1px solid var(--color-border);
}
.wallet-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.wallet-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.wallet-icon.gopay {
  background: #E8F5FD;
  color: #00880C;
}
.wallet-icon.coins {
  background: #FFF8E1;
  color: #F7941D;
}
.wallet-icon.plus {
  background: #F3E5F5;
  color: #8E24AA;
}
.wallet-info {
  display: flex;
  flex-direction: column;
}
.wallet-label {
  font-size: 11px;
  color: var(--color-text-muted);
}
.wallet-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-main);
}
.wallet-divider {
  width: 1px;
  height: 28px;
  background: var(--color-border);
}

/* Categories */
.category-section {
  display: flex;
  justify-content: space-between;
  background: var(--color-surface);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  gap: 8px;
}
.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex: 1;
  text-align: center;
}
.cat-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #E5F9F1;
  border: 1px solid rgba(0, 170, 91, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
}
.category-item:hover .cat-icon {
  transform: translateY(-2px);
}
.category-item span {
  font-size: 12px;
  color: var(--color-text-main);
  white-space: nowrap;
}

/* Flash Sale */
.flash-sale-section {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
}
.section-header h2 {
  font-size: 20px;
  font-weight: 700;
}
.countdown {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  color: var(--color-danger);
  font-size: 13px;
}
.countdown span {
  background: var(--color-danger);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
}
.lihat-semua {
  margin-left: auto;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 14px;
}

.flash-sale-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}
.flash-sale-scroll::-webkit-scrollbar {
  height: 6px;
}
.flash-sale-scroll::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}

/* Product Card */
.product-card {
  min-width: 190px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.p-img {
  width: 100%;
  height: 190px;
  object-fit: cover;
}
.p-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.p-title {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--color-text-main);
  line-height: 1.4;
}
.p-price {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-main);
}
.p-discount-row {
  display: flex;
  align-items: center;
  gap: 4px;
}
.p-badge {
  background: #FFEAEE;
  color: var(--color-danger);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 4px;
  border-radius: 2px;
}
.p-original {
  font-size: 12px;
  color: var(--color-text-muted);
  text-decoration: line-through;
}
.p-progress {
  margin-top: auto;
  height: 4px;
  background: #E5E7E9;
  border-radius: 4px;
  position: relative;
  margin-bottom: 8px;
}
.p-progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--color-danger);
  border-radius: 4px;
}
.p-progress span {
  position: absolute;
  top: 8px;
  left: 0;
  font-size: 10px;
  color: var(--color-text-muted);
}

/* Recommendations */
.section-tabs {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 20px;
  overflow-x: auto;
  white-space: nowrap;
}
.tab {
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  position: relative;
  background: transparent;
  border: none;
  flex-shrink: 0;
}
.tab.active {
  color: var(--color-primary);
}
.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--color-primary);
  border-radius: 3px 3px 0 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 16px;
}
.p-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-text-muted);
}
.loc-icon {
  color: #6C5CE7;
  font-weight: 600;
}
.p-rating {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

/* MOBILE RESPONSIVE STYLES */
@media (max-width: 768px) {
  .home-view {
    padding: 8px 0 16px;
  }

  .content-inner {
    gap: 14px;
  }

  .banner-section {
    border-radius: 8px;
  }

  .hero-banner {
    height: 150px;
  }

  .wallet-bar {
    padding: 10px 14px;
    border-radius: 8px;
  }

  .wallet-icon {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }

  .wallet-label {
    font-size: 10px;
  }

  .wallet-value {
    font-size: 12px;
  }

  /* Horizontal scrolling categories on mobile */
  .category-section {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(2, auto);
    overflow-x: auto;
    padding: 12px;
    gap: 12px 16px;
    border-radius: 8px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .category-section::-webkit-scrollbar {
    display: none;
  }

  .category-item {
    width: 64px;
    flex: initial;
    scroll-snap-align: start;
    gap: 4px;
  }

  .cat-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }

  .category-item span {
    font-size: 11px;
    white-space: normal;
    text-align: center;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Flash Sale Section Mobile */
  .flash-sale-section {
    padding: 12px;
    border-radius: 8px;
  }

  .section-header {
    margin-bottom: 12px;
    gap: 8px;
  }

  .section-header h2 {
    font-size: 16px;
  }

  .countdown {
    font-size: 11px;
  }

  .countdown span {
    font-size: 11px;
    padding: 1px 4px;
  }

  .lihat-semua {
    font-size: 12px;
  }

  .flash-sale-scroll {
    gap: 10px;
  }

  .flash-sale-scroll .product-card {
    min-width: 135px;
  }

  .flash-sale-scroll .p-img {
    height: 135px;
  }

  /* Recommendation Section Mobile (Signature 2-Column Grid) */
  .section-tabs {
    gap: 8px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--color-border);
  }

  .tab {
    padding: 8px 12px;
    font-size: 13px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .product-card {
    min-width: 0;
    border-radius: 8px;
  }

  .p-img {
    height: 155px;
  }

  .p-info {
    padding: 8px;
    gap: 2px;
  }

  .p-title {
    font-size: 12px;
    line-height: 1.3;
  }

  .p-price {
    font-size: 14px;
  }

  .p-original {
    font-size: 11px;
  }

  .p-location, .p-rating {
    font-size: 10px;
  }
}
</style>
