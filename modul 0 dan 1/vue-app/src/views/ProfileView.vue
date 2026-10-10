<template>
  <div class="profile-view">
    <div class="container content-inner">
      <!-- Mobile Profile Card & Wallet Header (Tokopedia mobile app style) -->
      <div class="mobile-profile-header mobile-only glass-panel">
        <div class="mobile-user-row">
          <div class="avatar-large"></div>
          <div class="user-meta">
            <h3>User Profile</h3>
            <span class="member-badge"><i class="ph-fill ph-medal"></i> Member Silver</span>
          </div>
          <button class="settings-btn" aria-label="Pengaturan"><i class="ph ph-gear"></i></button>
        </div>
        <div class="mobile-balance-row">
          <div class="bal-item">
            <span class="bal-lbl"><i class="ph-bold ph-wallet" style="color: #00880C;"></i> GoPay</span>
            <span class="bal-val">Rp150.000</span>
          </div>
          <div class="bal-divider"></div>
          <div class="bal-item">
            <span class="bal-lbl"><i class="ph-fill ph-ticket" style="color: var(--color-warning);"></i> 12 Kupon</span>
            <span class="bal-val">Hemat 50rb</span>
          </div>
        </div>
      </div>

      <div class="profile-layout">
        <!-- Sidebar (Desktop Navigation) -->
        <aside class="profile-sidebar glass-panel desktop-only">
          <div class="user-summary">
            <div class="avatar-large"></div>
            <div class="user-info">
              <h3>User Profile</h3>
              <p><i class="ph-fill ph-medal" style="color: silver;"></i> Member Silver</p>
            </div>
          </div>
          <nav class="profile-nav">
            <div class="nav-group">
              <h4>Akun Saya</h4>
              <a href="#" class="active"><i class="ph ph-user"></i> Biodata Diri</a>
              <a href="#"><i class="ph ph-map-pin"></i> Daftar Alamat</a>
              <a href="#"><i class="ph ph-credit-card"></i> Pembayaran</a>
            </div>
            <div class="nav-group">
              <h4>Transaksi</h4>
              <a href="#"><i class="ph ph-clock"></i> Menunggu Pembayaran</a>
              <a href="#"><i class="ph ph-receipt"></i> Daftar Transaksi</a>
              <a href="#"><i class="ph ph-star"></i> Ulasan</a>
            </div>
          </nav>
        </aside>
        
        <!-- Main Content -->
        <main class="profile-main glass-panel">
          <h2>Biodata Diri</h2>
          <div class="biodata-content">
            <div class="avatar-section">
              <div class="avatar-huge"></div>
              <button class="btn btn-outline">Pilih Foto</button>
              <p>Besar file: maksimum 10 Megabytes.<br/>Ekstensi file: .JPG .JPEG .PNG</p>
            </div>
            <div class="form-section">
              <div class="form-group">
                <label>Nama</label>
                <div class="form-value">
                  <span>User Profile</span>
                  <a href="#" class="edit-link">Ubah</a>
                </div>
              </div>
              <div class="form-group">
                <label>Tanggal Lahir</label>
                <div class="form-value">
                  <span>1 Januari 1990</span>
                  <a href="#" class="edit-link">Ubah</a>
                </div>
              </div>
              <div class="form-group">
                <label>Jenis Kelamin</label>
                <div class="form-value">
                  <span>Pria</span>
                  <a href="#" class="edit-link">Ubah</a>
                </div>
              </div>
              
              <h3 class="mt-4">Kontak Pribadi</h3>
              <div class="form-group">
                <label>Email</label>
                <div class="form-value">
                  <span class="user-contact">user.profile@example.com</span>
                  <span class="badge verified">Terverifikasi</span>
                  <a href="#" class="edit-link">Ubah</a>
                </div>
              </div>
              <div class="form-group">
                <label>Nomor HP</label>
                <div class="form-value">
                  <span class="user-contact">081234567890</span>
                  <span class="badge verified">Terverifikasi</span>
                  <a href="#" class="edit-link">Ubah</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-view {
  padding: 24px 0 40px;
}

.mobile-only {
  display: none;
}

.profile-layout {
  display: flex;
  gap: 24px;
}

.glass-panel {
  background: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.profile-sidebar {
  width: 250px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.user-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary);
}

.user-info h3 {
  font-size: 14px;
  font-weight: 700;
}

.user-info p {
  font-size: 12px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-group h4 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

.nav-group a {
  font-size: 14px;
  color: var(--color-text-muted);
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}

.nav-group a:hover, .nav-group a.active {
  color: var(--color-primary);
  font-weight: 600;
}

.profile-main {
  flex: 1;
  padding: 24px;
}

.profile-main h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
}

.biodata-content {
  display: flex;
  gap: 40px;
}

.avatar-section {
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-align: center;
}

.avatar-huge {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: var(--color-primary);
}

.avatar-section p {
  font-size: 12px;
  color: var(--color-text-muted);
}

.form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mt-4 {
  margin-top: 16px;
  font-size: 16px;
  font-weight: 700;
}

.form-group {
  display: flex;
  align-items: center;
}

.form-group label {
  width: 150px;
  font-size: 14px;
  color: var(--color-text-muted);
}

.form-value {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.edit-link {
  color: var(--color-primary);
  font-weight: 600;
  margin-left: auto;
}

.badge.verified {
  background: #E5F9F1;
  color: var(--color-primary);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
}

.btn-outline {
  width: 100%;
  padding: 8px;
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* MOBILE RESPONSIVE STYLES */
@media (max-width: 768px) {
  .profile-view {
    padding: 8px 0 24px 0;
  }

  .content-inner {
    padding: 0 8px;
    gap: 12px;
    display: flex;
    flex-direction: column;
  }

  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: block;
  }

  /* Mobile Profile Header */
  .mobile-profile-header {
    padding: 16px;
    border-radius: 10px;
  }

  .mobile-user-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .user-meta {
    flex: 1;
  }

  .user-meta h3 {
    font-size: 15px;
    font-weight: 700;
  }

  .member-badge {
    font-size: 11px;
    color: var(--color-primary);
    background: #E5F9F1;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    margin-top: 4px;
  }

  .settings-btn {
    background: none;
    border: none;
    font-size: 20px;
    color: var(--color-text-muted);
    cursor: pointer;
  }

  .mobile-balance-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
  }

  .bal-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .bal-lbl {
    font-size: 11px;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .bal-val {
    font-size: 13px;
    font-weight: 700;
  }

  .bal-divider {
    width: 1px;
    height: 24px;
    background: var(--color-border);
  }

  /* Main Biodata Content Mobile */
  .profile-main {
    padding: 16px;
    border-radius: 10px;
  }

  .profile-main h2 {
    font-size: 17px;
    margin-bottom: 16px;
  }

  .biodata-content {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .avatar-section {
    width: 100%;
    padding: 16px;
  }

  .avatar-huge {
    width: 90px;
    height: 90px;
  }

  .form-section {
    width: 100%;
    gap: 16px;
  }

  .form-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    border-bottom: 1px solid #f3f4f5;
    padding-bottom: 10px;
  }

  .form-group label {
    width: 100%;
    font-size: 12px;
  }

  .form-value {
    width: 100%;
    font-size: 14px;
  }

  .user-contact {
    word-break: break-all;
  }
}
</style>
