<template>
  <div class="cart-view">
    <div class="container content-inner">
      <h1 class="page-title desktop-only">Keranjang Belanja</h1>
      
      <div class="cart-layout">
        <!-- Cart Items -->
        <div class="cart-main">
          <div class="cart-header glass-panel">
            <label class="checkbox-container">
              <input type="checkbox" checked />
              <span>Pilih Semua (1 item)</span>
            </label>
            <button class="delete-all">Hapus</button>
          </div>

          <div class="cart-store glass-panel">
            <div class="store-header">
              <input type="checkbox" checked />
              <span class="loc-icon"><i class="ph-fill ph-check-circle"></i> Official Store</span>
              <span class="store-name">Toko Elektronik Resmi</span>
            </div>
            
            <div class="cart-item">
              <input type="checkbox" checked class="item-checkbox" />
              <img src="/product_headphones_1790215734998.jpg" class="item-img" />
              <div class="item-details">
                <div class="item-info">
                  <div class="item-title">Premium Wireless Headphones Active Noise Cancelling</div>
                  <div class="item-variant">Warna: Hitam</div>
                  <div class="item-price">Rp99.000</div>
                </div>
                <div class="item-actions">
                  <button class="btn-wishlist" aria-label="Simpan ke Wishlist"><i class="ph ph-heart"></i></button>
                  <button class="btn-delete" aria-label="Hapus Produk"><i class="ph ph-trash"></i></button>
                  <div class="quantity-control">
                    <button @click="quantity > 1 ? quantity-- : null">-</button>
                    <input type="number" v-model="quantity" min="1" />
                    <button @click="quantity++">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary (Desktop) -->
        <div class="cart-sidebar desktop-only">
          <div class="summary-card glass-panel">
            <h3>Ringkasan Belanja</h3>
            <div class="summary-row">
              <span>Total Harga ({{ quantity }} barang)</span>
              <span>{{ formattedTotal }}</span>
            </div>
            <div class="summary-row">
              <span>Total Diskon Barang</span>
              <span class="discount-text">-Rp500.000</span>
            </div>
            <hr />
            <div class="summary-total">
              <span>Total Harga</span>
              <span class="total-price">{{ formattedTotal }}</span>
            </div>
            <RouterLink to="/payment" class="btn btn-primary">Beli ({{ quantity }})</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sticky Checkout Bar (Tokopedia iconic) -->
    <div class="mobile-checkout-bar">
      <div class="mobile-select-all">
        <input type="checkbox" checked id="mobile-check-all" />
        <label for="mobile-check-all">Semua</label>
      </div>
      <div class="mobile-total-box">
        <span class="lbl">Total</span>
        <span class="val">{{ formattedTotal }}</span>
      </div>
      <RouterLink to="/payment" class="btn-mobile-checkout">Beli ({{ quantity }})</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const quantity = ref(1)
const itemPrice = 99000

const formattedTotal = computed(() => {
  return 'Rp' + (quantity.value * itemPrice).toLocaleString('id-ID')
})
</script>

<style scoped>
.cart-view {
  padding: 24px 0 40px;
  background: var(--color-background);
}

.content-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 800;
}

.cart-layout {
  display: flex;
  gap: 24px;
}

.cart-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.glass-panel {
  background: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.cart-header {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  font-weight: 600;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.delete-all {
  margin-left: auto;
  color: var(--color-primary);
  cursor: pointer;
  background: transparent;
  border: none;
  font-weight: 600;
  font-size: 14px;
}

.cart-store {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.store-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 12px;
}
.loc-icon {
  color: #6C5CE7;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.item-checkbox {
  margin-top: 4px;
}

.item-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.item-title {
  font-size: 14px;
  color: var(--color-text-main);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.item-variant {
  font-size: 12px;
  color: var(--color-text-muted);
}
.item-price {
  font-size: 16px;
  font-weight: 700;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn-wishlist, .btn-delete {
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: 18px;
  background: transparent;
  border: none;
}
.btn-wishlist:hover, .btn-delete:hover {
  color: var(--color-primary);
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}
.quantity-control button {
  background: white;
  border: none;
  width: 28px;
  height: 28px;
  font-size: 16px;
  cursor: pointer;
  color: var(--color-primary);
}
.quantity-control input {
  width: 38px;
  height: 28px;
  border: none;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  text-align: center;
  font-size: 13px;
}

.cart-sidebar {
  width: 320px;
}
.summary-card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.summary-card h3 {
  font-size: 16px;
  font-weight: 700;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--color-text-muted);
}
.discount-text {
  color: var(--color-danger);
}
.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 800;
}
.total-price {
  font-size: 18px;
}
hr {
  border: none;
  border-top: 1px solid var(--color-border);
}
.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
}

/* Mobile Checkout Bar */
.mobile-checkout-bar {
  display: none;
}

/* MOBILE RESPONSIVE STYLES */
@media (max-width: 768px) {
  .cart-view {
    padding: 8px 0 120px 0;
  }

  .content-inner {
    padding: 0 8px;
    gap: 10px;
  }

  .desktop-only {
    display: none !important;
  }

  .cart-layout {
    flex-direction: column;
    gap: 10px;
  }

  .cart-header {
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
  }

  .cart-store {
    padding: 12px;
    border-radius: 8px;
    gap: 12px;
  }

  .store-header {
    padding-bottom: 8px;
    font-size: 13px;
  }

  .cart-item {
    gap: 10px;
  }

  .item-img {
    width: 65px;
    height: 65px;
  }

  .item-details {
    flex-direction: column;
    gap: 10px;
  }

  .item-title {
    font-size: 13px;
  }

  .item-price {
    font-size: 14px;
  }

  .item-actions {
    align-self: flex-end;
    gap: 10px;
  }

  /* Fixed Mobile Checkout Bar */
  .mobile-checkout-bar {
    display: flex;
    position: fixed;
    bottom: 56px; /* Just above mobile bottom nav */
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 1px solid var(--color-border);
    padding: 10px 16px;
    align-items: center;
    justify-content: space-between;
    z-index: 998;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.06);
  }

  .mobile-select-all {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .mobile-total-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .mobile-total-box .lbl {
    font-size: 11px;
    color: var(--color-text-muted);
  }

  .mobile-total-box .val {
    font-size: 15px;
    font-weight: 800;
    color: var(--color-primary);
  }

  .btn-mobile-checkout {
    background: var(--color-primary);
    color: #fff;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
