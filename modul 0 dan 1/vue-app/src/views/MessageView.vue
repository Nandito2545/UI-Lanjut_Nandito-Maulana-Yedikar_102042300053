<template>
  <div class="message-view">
    <div class="container content-inner">
      <div class="chat-layout glass-panel" :class="{ 'in-chat-mobile': selectedChat !== null }">
        <!-- Chat Sidebar (List) -->
        <aside class="chat-sidebar" :class="{ 'hidden-mobile': selectedChat !== null }">
          <div class="chat-search">
            <div class="search-box">
              <i class="ph ph-magnifying-glass"></i>
              <input type="text" placeholder="Cari chat atau toko" />
            </div>
          </div>
          <div class="chat-list">
            <div 
              class="chat-item" 
              :class="{ active: selectedChat?.id === 1 }"
              @click="openChat(1)"
            >
              <div class="chat-avatar store">
                <i class="ph-bold ph-storefront"></i>
              </div>
              <div class="chat-preview">
                <div class="chat-title">
                  <h5>Toko Elektronik Resmi</h5>
                  <span class="chat-time">10:30</span>
                </div>
                <p>Halo kak, pesanan segera kami proses ya. Terima kasih!</p>
              </div>
            </div>

            <div 
              class="chat-item" 
              :class="{ active: selectedChat?.id === 2 }"
              @click="openChat(2)"
            >
              <div class="chat-avatar store">
                <i class="ph-bold ph-storefront"></i>
              </div>
              <div class="chat-preview">
                <div class="chat-title">
                  <h5>Toko Sepatu Berkah</h5>
                  <span class="chat-time">Kemarin</span>
                </div>
                <p>Ukurannya ready kak, silakan diorder.</p>
              </div>
            </div>
          </div>
        </aside>
        
        <!-- Active Chat Window -->
        <main class="chat-main" :class="{ 'hidden-mobile': selectedChat === null }">
          <div class="chat-header">
            <!-- Back button on mobile to return to chat list -->
            <button class="mobile-back-chat" @click="closeChat" aria-label="Kembali ke Daftar Chat">
              <i class="ph ph-arrow-left"></i>
            </button>

            <div class="chat-avatar store-small">
              <i class="ph-bold ph-storefront"></i>
            </div>
            <div class="chat-header-info">
              <h4>{{ selectedChat?.name || 'Toko Elektronik Resmi' }}</h4>
              <span class="status online">Sedang Online</span>
            </div>
          </div>

          <div class="chat-messages">
            <div class="message user">
              <div class="bubble">Halo, apakah barang ini ready?</div>
              <span class="time">10:25</span>
            </div>
            <div class="message store">
              <div class="bubble">{{ selectedChat?.lastMsg || 'Halo kak, pesanan segera kami proses ya. Terima kasih!' }}</div>
              <span class="time">10:30</span>
            </div>
          </div>

          <div class="chat-input-area">
            <button class="attachment-btn" aria-label="Lampiran"><i class="ph ph-paperclip"></i></button>
            <input type="text" placeholder="Tulis pesan..." />
            <button class="send-btn" aria-label="Kirim Pesan"><i class="ph-fill ph-paper-plane-right"></i></button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Chat {
  id: number
  name: string
  lastMsg: string
}

const chats: Chat[] = [
  { id: 1, name: 'Toko Elektronik Resmi', lastMsg: 'Halo kak, pesanan segera kami proses ya. Terima kasih!' },
  { id: 2, name: 'Toko Sepatu Berkah', lastMsg: 'Ukurannya ready kak, silakan diorder.' }
]

const selectedChat = ref<Chat | null>(chats[0])

// On small screens, initially user can see chat list if desired, or open first chat
onMounted(() => {
  if (window.innerWidth <= 768) {
    // If mobile, show chat list by default
    selectedChat.value = null
  }
})

const openChat = (id: number) => {
  const c = chats.find(item => item.id === id)
  if (c) selectedChat.value = c
}

const closeChat = () => {
  selectedChat.value = null
}
</script>

<style scoped>
.message-view {
  padding: 24px 0 40px;
}

.chat-layout {
  display: flex;
  background: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  height: 600px;
  overflow: hidden;
}

.chat-sidebar {
  width: 320px;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.chat-search {
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f4f5;
  padding: 8px 12px;
  border-radius: 8px;
}

.search-box input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--color-border);
  transition: background 0.15s ease;
}

.chat-item:hover {
  background: #fcfcfc;
}

.chat-item.active {
  background: #E5F9F1;
}

.chat-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #E5F9F1;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.store-small {
  width: 36px;
  height: 36px;
  font-size: 18px;
}

.chat-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
}

.chat-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title h5 {
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-time {
  font-size: 12px;
  color: var(--color-text-muted);
}

.chat-preview p {
  font-size: 13px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-back-chat {
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--color-text-main);
  padding: 4px;
  align-items: center;
  justify-content: center;
}

.chat-header-info h4 {
  font-size: 15px;
  font-weight: 700;
}

.status.online {
  font-size: 11px;
  color: var(--color-primary);
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #f9f9f9;
}

.message {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 70%;
}

.message.store {
  align-self: flex-start;
}

.message.user {
  align-self: flex-end;
}

.bubble {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
}

.message.store .bubble {
  background: white;
  border: 1px solid var(--color-border);
  border-top-left-radius: 0;
}

.message.user .bubble {
  background: var(--color-primary);
  color: white;
  border-top-right-radius: 0;
}

.message .time {
  font-size: 10px;
  color: var(--color-text-muted);
  align-self: flex-end;
}

.message.store .time {
  align-self: flex-start;
}

.chat-input-area {
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
}

.attachment-btn {
  background: transparent;
  border: none;
  font-size: 22px;
  color: var(--color-text-muted);
  cursor: pointer;
}

.chat-input-area input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.send-btn {
  background: var(--color-primary);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* MOBILE RESPONSIVE STYLES */
@media (max-width: 768px) {
  .message-view {
    padding: 0;
  }

  .container.content-inner {
    padding: 0;
  }

  .chat-layout {
    height: calc(100vh - 120px);
    border-radius: 0;
    box-shadow: none;
  }

  .chat-sidebar {
    width: 100%;
    border-right: none;
  }

  .chat-main {
    width: 100%;
  }

  .mobile-back-chat {
    display: flex;
  }

  .hidden-mobile {
    display: none !important;
  }
}
</style>
