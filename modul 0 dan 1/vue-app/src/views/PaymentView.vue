<template>
  <div class="payment-view">
    <!-- Step Indicator -->
    <div class="step-bar container">
      <div class="step" :class="{ active: step >= 1, done: step > 1 }">
        <div class="step-circle">
          <i v-if="step > 1" class="ph-fill ph-check"></i>
          <span v-else>1</span>
        </div>
        <span>Ringkasan</span>
      </div>
      <div class="step-line" :class="{ done: step > 1 }"></div>
      <div class="step" :class="{ active: step >= 2, done: step > 2 }">
        <div class="step-circle">
          <i v-if="step > 2" class="ph-fill ph-check"></i>
          <span v-else>2</span>
        </div>
        <span>Pembayaran</span>
      </div>
      <div class="step-line" :class="{ done: step > 2 }"></div>
      <div class="step" :class="{ active: step >= 3 }">
        <div class="step-circle"><span>3</span></div>
        <span>Selesai</span>
      </div>
    </div>

    <div class="container payment-body">

      <!-- ===================== STEP 1: RINGKASAN ===================== -->
      <div v-if="step === 1" class="payment-card">
        <h2 class="section-title">Ringkasan Pesanan</h2>

        <div class="order-items">
          <div class="order-item">
            <img src="/product_headphones_1790215734998.jpg" class="order-img" alt="Produk" />
            <div class="order-info">
              <p class="order-name">Premium Wireless Headphones ANC</p>
              <p class="order-variant">Warna: Hitam &middot; 1 item</p>
              <p class="order-price">{{ formatRp(amount) }}</p>
            </div>
          </div>
        </div>

        <div class="price-breakdown">
          <div class="price-row">
            <span>Harga Produk</span>
            <span>{{ formatRp(amount) }}</span>
          </div>
          <div class="price-row">
            <span>Ongkos Kirim</span>
            <span class="free-text">GRATIS</span>
          </div>
          <div class="price-row">
            <span>Diskon Voucher</span>
            <span class="discount-text">-Rp0</span>
          </div>
          <div class="divider"></div>
          <div class="price-row total-row">
            <span>Total Pembayaran</span>
            <span class="total-amount">{{ formatRp(amount) }}</span>
          </div>
        </div>

        <!-- Amount Editor for Testing -->
        <div class="amount-editor">
          <label>Nominal Pembayaran (Test)</label>
          <div class="amount-input-row">
            <span class="rp-prefix">Rp</span>
            <input
              type="number"
              v-model.number="amount"
              min="1"
              step="1"
              placeholder="1"
            />
          </div>
          <p class="amount-hint">
            <i class="ph ph-flask"></i>
            Mode demo: ubah nominal sesuai test. Default = Rp1.
          </p>
        </div>

        <div class="payment-method-select">
          <h3>Pilih Metode Pembayaran</h3>
          <label class="method-option" :class="{ selected: paymentMethod === 'qris' }">
            <input type="radio" name="method" value="qris" v-model="paymentMethod" />
            <div class="method-info">
              <div class="method-icon qris-icon">
                <i class="ph-bold ph-qr-code"></i>
              </div>
              <div>
                <span class="method-name">QRIS</span>
                <span class="method-desc">Scan &amp; Bayar — QR Dinamis (nominal embedded)</span>
              </div>
            </div>
            <i class="ph-fill ph-check-circle method-check" v-if="paymentMethod === 'qris'"></i>
          </label>
          <label class="method-option" :class="{ selected: paymentMethod === 'gopay' }">
            <input type="radio" name="method" value="gopay" v-model="paymentMethod" />
            <div class="method-info">
              <div class="method-icon gopay-icon">
                <i class="ph-bold ph-wallet"></i>
              </div>
              <div>
                <span class="method-name">GoPay</span>
                <span class="method-desc">Saldo Rp150.000</span>
              </div>
            </div>
            <i class="ph-fill ph-check-circle method-check" v-if="paymentMethod === 'gopay'"></i>
          </label>
          <label class="method-option" :class="{ selected: paymentMethod === 'va' }">
            <input type="radio" name="method" value="va" v-model="paymentMethod" />
            <div class="method-info">
              <div class="method-icon va-icon">
                <i class="ph-bold ph-bank"></i>
              </div>
              <div>
                <span class="method-name">Transfer Bank / VA</span>
                <span class="method-desc">BCA, Mandiri, BRI, BNI, dll.</span>
              </div>
            </div>
            <i class="ph-fill ph-check-circle method-check" v-if="paymentMethod === 'va'"></i>
          </label>
        </div>

        <button class="btn-bayar" @click="proceedToPayment">
          <i class="ph-bold ph-lock"></i>
          Bayar Sekarang &mdash; {{ formatRp(amount) }}
        </button>
      </div>

      <!-- ===================== STEP 2: QRIS DINAMIS ===================== -->
      <div v-if="step === 2" class="payment-card qris-card">
        <div class="qris-logo-row">
          <div class="qris-brand">
            <i class="ph-bold ph-qr-code"></i>
            <span>QRIS</span>
          </div>
          <span class="qris-subtitle">QR Dinamis &middot; {{ formatRp(amount) }}</span>
        </div>

        <div class="qris-amount-box">
          <span class="qr-amount-label">Total yang harus dibayar</span>
          <span class="qr-amount-value">{{ formatRp(amount) }}</span>
        </div>

        <!-- QRIS Canvas — generated dynamically -->
        <div class="qr-wrapper" :class="{ 'is-expired': isExpired, 'is-paid': isPaid }">
          <canvas ref="qrCanvas" class="qr-canvas" v-show="!isExpired && !isPaid"></canvas>

          <div v-if="isPaid" class="qr-overlay success-overlay">
            <i class="ph-fill ph-check-circle"></i>
            <p>Pembayaran Berhasil!</p>
          </div>
          <div v-else-if="isExpired" class="qr-overlay expired-overlay">
            <i class="ph-fill ph-x-circle"></i>
            <p>QRIS Kedaluwarsa</p>
            <button class="btn-refresh" @click="refreshQris">
              <i class="ph-bold ph-arrow-clockwise"></i> Perbarui QRIS
            </button>
          </div>
        </div>

        <!-- QR String preview (untuk verifikasi) -->
        <details class="qr-raw-detail" v-if="!isExpired && !isPaid">
          <summary>Lihat Raw QRIS String</summary>
          <code class="qr-raw">{{ qrisString }}</code>
        </details>

        <!-- Timer -->
        <div class="timer-row" v-if="!isExpired && !isPaid">
          <i class="ph ph-timer" :class="{ blink: countdown <= 30 }"></i>
          <span :class="{ 'timer-urgent': countdown <= 30 }">
            Berlaku: {{ formattedCountdown }}
          </span>
        </div>

        <div class="qris-info-list">
          <div class="info-item">
            <i class="ph-fill ph-info"></i>
            <span>QR ini bersifat <strong>dinamis</strong> &mdash; nominal {{ formatRp(amount) }} sudah ter-embed di dalam QR code, tidak perlu input ulang di aplikasi.</span>
          </div>
          <div class="info-item">
            <i class="ph-fill ph-device-mobile-camera"></i>
            <span>Scan dengan GoPay, OVO, Dana, ShopeePay, atau mobile banking manapun.</span>
          </div>
          <div class="info-item">
            <i class="ph-fill ph-shield-check"></i>
            <span>QR berisi data QRIS standar Bank Indonesia (EMV QRIS format).</span>
          </div>
        </div>

        <!-- Simulasi bayar (demo) -->
        <div class="test-actions" v-if="!isPaid && !isExpired">
          <p class="test-label">
            <i class="ph ph-flask"></i> Mode Demo &mdash; Simulasikan Pembayaran
          </p>
          <button class="btn-simulate-pay" @click="simulatePayment">
            <i class="ph-fill ph-check-circle"></i>
            Konfirmasi Bayar ({{ formatRp(amount) }})
          </button>
        </div>

        <div class="back-btn-row">
          <button class="btn-back" @click="goBack">
            <i class="ph ph-arrow-left"></i> Ganti Metode / Nominal
          </button>
        </div>
      </div>

      <!-- ===================== STEP 3: BERHASIL ===================== -->
      <div v-if="step === 3" class="payment-card success-card">
        <div class="success-animation">
          <div class="success-circle">
            <i class="ph-fill ph-check-bold"></i>
          </div>
        </div>

        <h2 class="success-title">Pembayaran Berhasil!</h2>
        <p class="success-subtitle">Pesananmu sedang diproses oleh penjual.</p>

        <div class="success-detail-box">
          <div class="success-row">
            <span>No. Pesanan</span>
            <span class="val">#TKP-{{ orderNumber }}</span>
          </div>
          <div class="success-row">
            <span>Metode Bayar</span>
            <span class="val">QRIS Dinamis</span>
          </div>
          <div class="success-row">
            <span>Total Dibayar</span>
            <span class="val green-text">{{ formatRp(amount) }}</span>
          </div>
          <div class="success-row">
            <span>Waktu Bayar</span>
            <span class="val">{{ paidTime }}</span>
          </div>
        </div>

        <div class="success-actions">
          <RouterLink to="/" class="btn-home">
            <i class="ph ph-house"></i> Kembali ke Beranda
          </RouterLink>
          <RouterLink to="/profile" class="btn-track">
            <i class="ph ph-package"></i> Lacak Pesanan
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import QRCode from 'qrcode'

// ── State ──────────────────────────────────────────────────────────────────
const step = ref(1)
const amount = ref(1)           // Rp1 default
const paymentMethod = ref('qris')
const countdown = ref(300)
const isExpired = ref(false)
const isPaid = ref(false)
const orderNumber = ref('')
const paidTime = ref('')
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const qrisString = ref('')

let timer: ReturnType<typeof setInterval> | null = null

// ── Helpers ────────────────────────────────────────────────────────────────
const formatRp = (n: number) =>
  'Rp' + Number(n).toLocaleString('id-ID')

const formattedCountdown = computed(() => {
  const m = Math.floor(countdown.value / 60)
  const s = countdown.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

// ── QRIS Dynamic Generator ─────────────────────────────────────────────────
// Implements EMV QR Code Merchant Presented Mode (MPM) — Bank Indonesia QRIS spec.
// CRC computed using CRC-16/CCITT-FALSE (XMODEM variant) as required by the spec.

function crc16(data: string): string {
  let crc = 0xFFFF
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
    }
  }
  return ((crc & 0xFFFF).toString(16).toUpperCase()).padStart(4, '0')
}

function tlv(tag: string, value: string): string {
  const len = String(value.length).padStart(2, '0')
  return `${tag}${len}${value}`
}

/**
 * Builds a valid QRIS Dynamic string for the given nominal.
 * Uses a demo merchant NMID (BRI Tokopedia merchant ID format).
 * The CRC is correctly computed so the string is technically valid.
 */
function buildQrisString(nominal: number): string {
  // 00: Payload Format Indicator
  const pfi = tlv('00', '01')

  // 01: Point of Initiation Method — 12 = Dynamic (nominal embedded)
  const poi = tlv('01', '12')

  // 26: Merchant Account — BRI QRIS
  const merchantAccountBRI =
    tlv('00', 'ID.CO.BRI.WWW') +
    tlv('01', '93600914300044060') +   // Virtual merchant account
    tlv('02', 'Toko Elektronik Resmi') +
    tlv('03', 'UBE')
  const merchantAccount26 = tlv('26', merchantAccountBRI)

  // 51: QRIS Network Merchant Account
  const qrisNetwork =
    tlv('00', 'ID.CO.QRIS.WWW') +
    tlv('01', 'ID2020062000254') +
    tlv('02', '10') +
    tlv('03', 'UBE')
  const merchantAccount51 = tlv('51', qrisNetwork)

  // 52: Merchant Category Code (5999 = Miscellaneous Retail)
  const mcc = tlv('52', '5999')

  // 53: Transaction Currency (360 = IDR)
  const currency = tlv('53', '360')

  // 54: Transaction Amount (DYNAMIC — embedded nominal)
  const amtStr = String(nominal)
  const txAmount = tlv('54', amtStr)

  // 58: Country Code
  const country = tlv('58', 'ID')

  // 59: Merchant Name (max 25 chars)
  const merchantName = tlv('59', 'Toko Elektronik Resmi')

  // 60: Merchant City
  const city = tlv('60', 'Jakarta Pusat')

  // 61: Postal Code
  const postal = tlv('61', '10560')

  // 62: Additional Data Field — order reference
  const addData = tlv('05', 'Test')
  const additionalData = tlv('62', addData)

  // 63: CRC — placeholder, then compute
  const bodyWithoutCRC =
    pfi + poi + merchantAccount26 + merchantAccount51 +
    mcc + currency + txAmount + country +
    merchantName + city + postal + additionalData +
    '6304'

  const checksum = crc16(bodyWithoutCRC)

  return bodyWithoutCRC + checksum
}

// ── QR Code Rendering ──────────────────────────────────────────────────────
async function renderQR(nominal: number) {
  const str = buildQrisString(nominal)
  qrisString.value = str

  await nextTick()

  if (!qrCanvas.value) return

  try {
    await QRCode.toCanvas(qrCanvas.value, str, {
      width: 240,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    })
  } catch (err) {
    console.error('QR generation failed:', err)
  }
}

// ── Timer ──────────────────────────────────────────────────────────────────
function startTimer() {
  if (timer) clearInterval(timer)
  countdown.value = 300
  isExpired.value = false
  timer = setInterval(() => {
    if (isPaid.value) { clearInterval(timer!); return }
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer!)
      isExpired.value = true
    }
  }, 1000)
}

// ── Actions ────────────────────────────────────────────────────────────────
async function proceedToPayment() {
  step.value = 2
  startTimer()
  await renderQR(amount.value)
}

async function refreshQris() {
  isExpired.value = false
  startTimer()
  await renderQR(amount.value)
}

function goBack() {
  if (timer) clearInterval(timer)
  step.value = 1
  isPaid.value = false
  isExpired.value = false
}

function simulatePayment() {
  isPaid.value = true
  if (timer) clearInterval(timer)

  orderNumber.value = Math.random().toString(36).substring(2, 10).toUpperCase()
  const now = new Date()
  paidTime.value = now.toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  setTimeout(() => { step.value = 3 }, 1500)
}

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.payment-view {
  padding: 24px 0 60px;
  background: var(--color-background);
  min-height: 100vh;
}

/* ── Steps ── */
.step-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  padding-top: 8px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}

.step.active .step-circle {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 0 0 4px rgba(0,170,91,0.15);
}

.step.done .step-circle {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
}

.step > span {
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 600;
}

.step.active > span { color: var(--color-primary); }

.step-line {
  width: 80px;
  height: 2px;
  background: var(--color-border);
  margin-bottom: 18px;
  transition: background 0.3s;
}

.step-line.done { background: var(--color-primary); }

/* ── Card ── */
.payment-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  max-width: 640px;
  margin: 0 auto;
}

.section-title {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
}

/* ── Order ── */
.order-items {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.order-item { display: flex; gap: 14px; align-items: flex-start; }

.order-img {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.order-info { flex: 1; }
.order-name { font-size: 14px; font-weight: 600; line-height: 1.4; }
.order-variant { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }
.order-price { font-size: 16px; font-weight: 800; margin-top: 6px; }

/* ── Price Breakdown ── */
.price-breakdown {
  background: #f9fafb;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.price-row { display: flex; justify-content: space-between; font-size: 14px; color: var(--color-text-muted); }
.free-text { color: var(--color-primary); font-weight: 600; }
.discount-text { color: var(--color-danger); font-weight: 600; }
.divider { border-top: 1px dashed var(--color-border); }
.total-row { font-size: 15px; font-weight: 700; color: var(--color-text-main); }
.total-amount { font-size: 18px; font-weight: 800; color: var(--color-primary); }

/* ── Amount Editor ── */
.amount-editor {
  background: #fffbeb;
  border: 1.5px dashed #f59e0b;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 20px;
}

.amount-editor label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #92400e;
  margin-bottom: 8px;
}

.amount-input-row {
  display: flex;
  align-items: center;
  border: 1.5px solid #f59e0b;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  height: 40px;
}

.rp-prefix {
  padding: 0 12px;
  font-weight: 700;
  font-size: 15px;
  color: #92400e;
  border-right: 1.5px solid #f59e0b;
  display: flex;
  align-items: center;
  height: 100%;
  background: #fef3c7;
}

.amount-input-row input {
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 800;
  padding: 0 12px;
  flex: 1;
  color: var(--color-text-main);
}

.amount-hint {
  font-size: 11px;
  color: #92400e;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ── Payment Method ── */
.payment-method-select { margin-bottom: 24px; }
.payment-method-select h3 { font-size: 15px; font-weight: 700; margin-bottom: 12px; }

.method-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1.5px solid var(--color-border);
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.method-option.selected {
  border-color: var(--color-primary);
  background: #f0fdf7;
}

.method-option input[type="radio"] { display: none; }

.method-info { display: flex; align-items: center; gap: 12px; flex: 1; }

.method-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.qris-icon { background: linear-gradient(135deg, #e63946, #ff8800); color: #fff; }
.gopay-icon { background: #E8F5FD; color: #00880C; }
.va-icon { background: #EDE9FE; color: #7C3AED; }

.method-name { display: block; font-size: 14px; font-weight: 700; }
.method-desc { display: block; font-size: 12px; color: var(--color-text-muted); }
.method-check { font-size: 22px; color: var(--color-primary); margin-left: auto; }

.btn-bayar {
  width: 100%;
  padding: 14px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.15s, transform 0.1s;
}

.btn-bayar:hover { opacity: 0.92; transform: translateY(-1px); }

/* ── QRIS Card ── */
.qris-card { text-align: center; }

.qris-logo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.qris-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 800;
  color: #e63946;
}

.qris-brand i { font-size: 28px; }
.qris-subtitle { font-size: 13px; font-weight: 600; color: var(--color-text-muted); }

.qris-amount-box {
  background: #f0fdf7;
  border: 1px solid rgba(0,170,91,0.25);
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qr-amount-label { font-size: 13px; color: var(--color-text-muted); }
.qr-amount-value { font-size: 26px; font-weight: 800; color: var(--color-primary); }

/* ── QR Canvas Wrapper ── */
.qr-wrapper {
  width: 256px;
  height: 256px;
  margin: 0 auto 16px;
  border-radius: 12px;
  border: 2px solid var(--color-border);
  padding: 8px;
  background: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-wrapper.is-expired { filter: blur(4px) grayscale(1); }

.qr-canvas {
  border-radius: 6px;
}

.qr-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 10px;
}

.expired-overlay { background: rgba(255,255,255,0.94); }
.expired-overlay i { font-size: 52px; color: var(--color-danger); }
.expired-overlay p { font-weight: 700; }

.success-overlay { background: rgba(229,249,241,0.96); }
.success-overlay i {
  font-size: 64px;
  color: var(--color-primary);
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.success-overlay p { font-weight: 700; color: var(--color-primary); }

@keyframes pop-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.btn-refresh {
  background: var(--color-danger);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── QRIS Raw String ── */
.qr-raw-detail {
  margin-bottom: 12px;
  text-align: left;
}

.qr-raw-detail summary {
  font-size: 11px;
  color: var(--color-text-muted);
  cursor: pointer;
  margin-bottom: 6px;
}

.qr-raw {
  display: block;
  font-size: 9px;
  word-break: break-all;
  background: #1e1e1e;
  color: #00e676;
  padding: 10px;
  border-radius: 8px;
  line-height: 1.5;
  max-height: 120px;
  overflow-y: auto;
}

/* ── Timer ── */
.timer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.timer-urgent { color: var(--color-danger) !important; }
.blink { animation: blink-anim 1s step-end infinite; color: var(--color-danger); }

@keyframes blink-anim { 50% { opacity: 0; } }

/* ── Info List ── */
.qris-info-list {
  text-align: left;
  background: #f9fafb;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: var(--color-text-muted);
  align-items: flex-start;
}

.info-item i { font-size: 16px; color: var(--color-primary); flex-shrink: 0; margin-top: 1px; }

/* ── Test Actions ── */
.test-actions {
  border: 1.5px dashed var(--color-primary);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 16px;
  background: #f0fdf7;
}

.test-label {
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-simulate-pay {
  width: 100%;
  padding: 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.15s, transform 0.1s;
}

.btn-simulate-pay:hover { opacity: 0.9; transform: translateY(-1px); }

.back-btn-row { text-align: center; }

.btn-back {
  background: transparent;
  border: none;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
}

/* ── Success ── */
.success-card { text-align: center; }

.success-animation { display: flex; justify-content: center; margin-bottom: 20px; }

.success-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--color-primary), #00cc6f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  box-shadow: 0 8px 32px rgba(0,170,91,0.35);
  animation: pulse-success 1.2s ease-out both;
}

@keyframes pulse-success {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}

.success-title { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
.success-subtitle { font-size: 14px; color: var(--color-text-muted); margin-bottom: 24px; }

.success-detail-box {
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.success-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text-muted);
}

.success-row .val { font-weight: 700; color: var(--color-text-main); }
.green-text { color: var(--color-primary) !important; font-size: 16px !important; }

.success-actions { display: flex; gap: 12px; }

.btn-home {
  flex: 1;
  padding: 12px;
  border: 1.5px solid var(--color-primary);
  border-radius: 10px;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  transition: background 0.15s;
}

.btn-home:hover { background: #f0fdf7; }

.btn-track {
  flex: 1;
  padding: 12px;
  background: var(--color-primary);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .payment-view { padding: 12px 0 72px; }
  .step-line { width: 40px; }

  .payment-card {
    padding: 16px;
    border-radius: 12px;
    margin: 0 8px;
  }

  .section-title { font-size: 16px; }

  .qr-wrapper { width: 216px; height: 216px; }
  .qr-amount-value { font-size: 22px; }
  .success-circle { width: 80px; height: 80px; font-size: 36px; }
  .success-title { font-size: 20px; }
  .success-actions { flex-direction: column; }
}
</style>
