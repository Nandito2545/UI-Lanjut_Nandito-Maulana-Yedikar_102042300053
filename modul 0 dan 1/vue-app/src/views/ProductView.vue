<template>
  <div class="product-view">
    <div class="container content-inner">
      <!-- Breadcrumb (desktop only) -->
      <div class="breadcrumb desktop-only">
        <RouterLink to="/">Home</RouterLink> > 
        <a href="#">Elektronik</a> > 
        <a href="#">Audio</a> > 
        <span>Premium Wireless Headphones</span>
      </div>

      <div class="product-main">
        <!-- Product Image -->
        <div class="product-image-section">
          <img src="/product_headphones_1790215734998.jpg" alt="Product" class="main-image" />
          <div class="thumbnail-list">
            <img src="/product_headphones_1790215734998.jpg" class="thumbnail active" />
            <img src="/product_phone_1790215690906.jpg" class="thumbnail" />
            <img src="/product_sneakers_1790215678458.jpg" class="thumbnail" />
          </div>
        </div>

        <!-- Product Info -->
        <div class="product-info-section">
          <div class="product-price-box">
            <div class="current-price">Rp99.000</div>
            <div class="price-discount">
              <span class="discount-badge">85%</span>
              <span class="original-price">Rp599.000</span>
            </div>
          </div>

          <h1 class="product-title">Premium Wireless Headphones Active Noise Cancelling (Original)</h1>
          
          <div class="product-stats">
            <span class="rating">Terjual 10rb+</span> • 
            <span class="rating-star"><i class="ph-fill ph-star" style="color:var(--color-warning);"></i> 4.9 (4.500)</span> • 
            <span class="discussion">Diskusi (120)</span>
          </div>

          <!-- Merchant / Store Card (Tokopedia authentic) -->
          <div class="merchant-card">
            <div class="merchant-avatar">
              <i class="ph-bold ph-storefront"></i>
            </div>
            <div class="merchant-info">
              <div class="merchant-name">
                <span class="loc-icon"><i class="ph-fill ph-check-circle"></i></span>
                <h4>Toko Elektronik Resmi</h4>
              </div>
              <p class="merchant-loc"><i class="ph ph-map-pin"></i> Jakarta Pusat • Online 1 jam lalu</p>
            </div>
            <button class="btn-follow">Follow</button>
          </div>

          <div class="product-description">
            <h3>Deskripsi Produk</h3>
            <p>
              Headphone nirkabel premium dengan fitur Active Noise Cancelling terdepan di kelasnya.
              Nikmati kualitas suara Hi-Res Audio yang jernih dan bass yang mendalam.
              Baterai tahan lama hingga 40 jam pemakaian.
            </p>
            <ul>
              <li>Bluetooth 5.2 dengan LDAC codec</li>
              <li>Dual Noise Sensor technology</li>
              <li>Nyaman digunakan sepanjang hari</li>
            </ul>
          </div>
        </div>

        <!-- Add to Cart Sidebar (Desktop only) -->
        <div class="product-action-sidebar desktop-only">
          <div class="action-card glass-panel">
            <h3>Atur jumlah dan catatan</h3>
            <div class="quantity-control">
              <button @click="qty > 1 ? qty-- : null">-</button>
              <input type="number" v-model="qty" min="1" />
              <button @click="qty++">+</button>
            </div>
            <p class="stock-info">Stok Total: <b>Sisa 80</b></p>
            <div class="subtotal">
              <span>Subtotal</span>
              <span class="subtotal-price">{{ formattedSubtotal }}</span>
            </div>
            <div class="action-buttons">
              <RouterLink to="/cart" class="btn btn-outline">+ Keranjang</RouterLink>
              <RouterLink to="/payment" class="btn btn-primary">Beli Langsung</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sticky Bottom Action Bar (Tokopedia signature) -->
    <div class="mobile-bottom-action-bar">
      <RouterLink to="/messages" class="mobile-icon-btn" aria-label="Chat">
        <i class="ph ph-chat-circle-dots"></i>
        <span>Chat</span>
      </RouterLink>
      <button class="mobile-icon-btn" aria-label="Wishlist">
        <i class="ph ph-heart"></i>
        <span>Wishlist</span>
      </button>
      <RouterLink to="/cart" class="btn-mobile-cart">+ Keranjang</RouterLink>
      <RouterLink to="/payment" class="btn-mobile-buy">Beli Langsung</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const qty = ref(1)
const price = 99000

const formattedSubtotal = computed(() => {
  return 'Rp' + (qty.value * price).toLocaleString('id-ID')
})
</script>

<style scoped>
.product-view {
  padding: 24px 0 40px;
  background: var(--color-background);
}

.content-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.breadcrumb {
  font-size: 12px;
  color: var(--color-text-muted);
}
.breadcrumb a {
  color: var(--color-primary);
}

.product-main {
  display: flex;
  gap: 32px;
  background: var(--color-surface);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

/* Image Section */
.product-image-section {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.main-image {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  object-fit: cover;
}
.thumbnail-list {
  display: flex;
  gap: 12px;
}
.thumbnail {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  object-fit: cover;
}
.thumbnail.active {
  border: 2px solid var(--color-primary);
}

/* Info Section */
.product-info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.product-price-box {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 12px;
}
.current-price {
  font-size: 30px;
  font-weight: 800;
  color: var(--color-text-main);
}
.price-discount {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}
.discount-badge {
  background: #FFEAEE;
  color: var(--color-danger);
  font-size: 12px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}
.original-price {
  font-size: 14px;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.product-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
}
.product-stats {
  font-size: 13px;
  color: var(--color-text-muted);
}
.rating-star {
  font-weight: 600;
  color: var(--color-text-main);
}

/* Merchant Card */
.merchant-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.merchant-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #E5F9F1;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.merchant-info {
  flex: 1;
}
.merchant-name {
  display: flex;
  align-items: center;
  gap: 6px;
}
.merchant-name h4 {
  font-size: 14px;
  font-weight: 700;
}
.loc-icon {
  color: #6C5CE7;
}
.merchant-loc {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
.btn-follow {
  padding: 6px 16px;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.product-description {
  font-size: 14px;
  color: var(--color-text-main);
}
.product-description h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}
.product-description ul {
  margin-top: 8px;
  padding-left: 20px;
  list-style-type: disc;
}

/* Action Sidebar */
.product-action-sidebar {
  width: 280px;
}
.action-card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.action-card h3 {
  font-size: 14px;
  font-weight: 700;
}
.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  width: max-content;
}
.quantity-control button {
  background: white;
  border: none;
  width: 32px;
  height: 32px;
  font-size: 18px;
  cursor: pointer;
  color: var(--color-primary);
}
.quantity-control input {
  width: 44px;
  height: 32px;
  border: none;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  text-align: center;
  font-size: 14px;
}
.stock-info {
  font-size: 12px;
  color: var(--color-text-muted);
}
.subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}
.subtotal-price {
  font-size: 16px;
}
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.btn {
  padding: 10px;
  border-radius: 8px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  display: block;
}
.btn-outline {
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.btn-primary {
  background: var(--color-primary);
  color: white;
  border: 1px solid var(--color-primary);
}

/* Mobile Bottom Sticky Bar */
.mobile-bottom-action-bar {
  display: none;
}

/* MOBILE RESPONSIVE STYLES */
@media (max-width: 768px) {
  .product-view {
    padding: 0 0 76px 0;
  }

  .content-inner {
    gap: 0;
    padding: 0;
  }

  .product-main {
    flex-direction: column;
    padding: 0;
    gap: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .product-image-section {
    width: 100%;
    gap: 0;
    background: #fff;
  }

  .main-image {
    border-radius: 0;
    border: none;
    max-height: 360px;
    width: 100%;
  }

  .thumbnail-list {
    padding: 10px 16px;
    gap: 8px;
    overflow-x: auto;
  }

  .thumbnail {
    width: 50px;
    height: 50px;
    border-radius: 6px;
  }

  .product-info-section {
    padding: 16px;
    gap: 12px;
    background: #fff;
  }

  .product-price-box {
    border-bottom: none;
    padding-bottom: 0;
  }

  .current-price {
    font-size: 24px;
  }

  .product-title {
    font-size: 16px;
  }

  .product-stats {
    font-size: 12px;
  }

  .desktop-only {
    display: none !important;
  }

  /* Fixed Bottom Bar on Mobile */
  .mobile-bottom-action-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 10px 16px;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.08);
    z-index: 1000;
    align-items: center;
    gap: 10px;
    padding-bottom: env(safe-area-inset-bottom, 10px);
  }

  .mobile-icon-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    font-size: 10px;
    background: none;
    border: none;
    cursor: pointer;
    min-width: 40px;
  }

  .mobile-icon-btn i {
    font-size: 22px;
  }

  .btn-mobile-cart {
    flex: 1;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 13px;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    background: #fff;
  }

  .btn-mobile-buy {
    flex: 1;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 13px;
    color: #fff;
    background: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
}
</style>
