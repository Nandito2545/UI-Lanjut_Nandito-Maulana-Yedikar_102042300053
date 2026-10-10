<template>
  <div class="notification-view">
    <div class="container content-inner">
      <div class="notification-layout glass-panel">
        <div class="notif-header">
          <h2>Notifikasi</h2>
          <button class="mark-read"><i class="ph ph-check-circle"></i> Tandai semua dibaca</button>
        </div>
        
        <div class="notif-tabs">
          <button class="tab active">Semua</button>
          <button class="tab">Transaksi</button>
          <button class="tab">Promo</button>
          <button class="tab">Info</button>
        </div>
        
        <div class="notif-list">
          <div class="notif-item unread">
            <div class="notif-icon transaction"><i class="ph ph-shopping-bag"></i></div>
            <div class="notif-content">
              <h4>Pesanan Tiba</h4>
              <p>Pesanan Headphone Wireless Anda telah tiba di tujuan. Silakan konfirmasi penerimaan.</p>
              <span class="notif-time">2 jam yang lalu</span>
            </div>
          </div>
          <div class="notif-item">
            <div class="notif-icon promo"><i class="ph ph-tag"></i></div>
            <div class="notif-content">
              <h4>Cashback 50 Ribu!</h4>
              <p>Khusus hari ini, nikmati cashback hingga 50rb untuk pembelian barang elektronik.</p>
              <span class="notif-time">Kemarin, 14:00</span>
            </div>
          </div>
          <div class="notif-item">
            <div class="notif-icon info"><i class="ph ph-info"></i></div>
            <div class="notif-content">
              <h4>Pembaruan Sistem</h4>
              <p>Sistem kami telah diperbarui untuk pengalaman belanja yang lebih baik.</p>
              <span class="notif-time">20 Sep, 09:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-view {
  padding: 24px 0 40px;
}

.notification-layout {
  background: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  padding: 24px;
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.notif-header h2 {
  font-size: 20px;
  font-weight: 700;
}

.mark-read {
  background: transparent;
  border: none;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.notif-tabs {
  display: flex;
  gap: 24px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 24px;
  overflow-x: auto;
  white-space: nowrap;
}

.tab {
  padding: 12px 0;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  position: relative;
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
  height: 2px;
  background: var(--color-primary);
}

.notif-list {
  display: flex;
  flex-direction: column;
}

.notif-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
}

.notif-item:hover {
  background: #fcfcfc;
}

.notif-item.unread {
  background: #E5F9F1;
  padding: 16px;
  border-radius: 8px;
  border-bottom: none;
  margin-bottom: 8px;
}

.notif-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  flex-shrink: 0;
}

.notif-icon.transaction { background: var(--color-primary); }
.notif-icon.promo { background: var(--color-warning); }
.notif-icon.info { background: #3498db; }

.notif-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notif-content h4 {
  font-size: 14px;
  font-weight: 700;
}

.notif-content p {
  font-size: 14px;
  color: var(--color-text-main);
  line-height: 1.4;
}

.notif-time {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

/* MOBILE RESPONSIVE STYLES */
@media (max-width: 768px) {
  .notification-view {
    padding: 8px 0 20px;
  }

  .container.content-inner {
    padding: 0 8px;
  }

  .notification-layout {
    padding: 14px;
    border-radius: 10px;
  }

  .notif-header h2 {
    font-size: 16px;
  }

  .mark-read {
    font-size: 12px;
  }

  .notif-tabs {
    gap: 18px;
    margin-bottom: 14px;
  }

  .tab {
    padding: 8px 0;
    font-size: 13px;
  }

  .notif-item {
    gap: 12px;
    padding: 12px 0;
  }

  .notif-item.unread {
    padding: 12px;
  }

  .notif-icon {
    width: 34px;
    height: 34px;
    font-size: 18px;
  }

  .notif-content h4 {
    font-size: 13px;
  }

  .notif-content p {
    font-size: 12px;
  }

  .notif-time {
    font-size: 10px;
  }
}
</style>
