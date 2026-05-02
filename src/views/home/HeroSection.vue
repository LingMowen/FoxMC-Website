<template>
  <section id="home" class="hero" :style="{ backgroundImage: `url(${hero.bgImage})` }">
    <div class="container hero-container">
      <div class="hero-content">
        <div class="hero-badge scroll-fade-up">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
          </svg>
          {{ hero.badge }}
        </div>

        <div class="server-status scroll-fade-up delay-200">
          <span class="status-dot"></span>
          <span class="status-text">
            服务器在线: <span class="highlight-green">{{ playerCount }}</span> 玩家
          </span>
        </div>

        <h1 class="scroll-fade-up delay-300">
          {{ hero.titleLine1 }}<br>
          <span class="highlight">{{ hero.titleHighlight }}</span>
        </h1>

        <p class="hero-subtitle scroll-fade-up delay-400">
          {{ hero.subtitle }}
        </p>

        <div class="hero-features scroll-fade-up delay-500">
          <div v-for="feature in hero.features" :key="feature" class="h-feature">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 6L9 17L4 12"/>
            </svg>
            {{ feature }}
          </div>
        </div>

        <div class="hero-buttons scroll-fade-up delay-600">
          <button class="copy-btn" @click="copyServerIp">
            <svg viewBox="0 0 32 32" height="24" width="24">
              <path d="M30 2H2v28h28z" fill="#52a535"/>
              <path d="M24.4 13.2h-5.6v.47h5.6zm-5.6 8.4h-5.6v.47h5.6zm2.8 2.8h-2.8v.47h2.8zm-8.4 0h-2.8v.47h2.8zm0-11.2H7.6v.47h5.6z" fill="#86d562"/>
              <path d="M24.4 13.2V7.6h-5.6v5.6h-5.6V16h-2.8v8.4h2.8v-2.8h5.6v2.8h2.8V16h-2.8v-2.8zM13.2 7.6H7.6v5.6h5.6z"/>
            </svg>
            <span>{{ copied ? '已复制!' : '复制 IP 地址' }}</span>
          </button>
          <span class="server-ip">{{ site.serverIp }}</span>

          <a href="#community" class="btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4H20V20H4V4Z"/>
              <path d="M4 9H20"/>
            </svg>
            加入社区
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSiteConfigStore } from '@/stores/siteConfig'
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'

const { site, hero } = useSiteConfigStore()
const { copy, copied } = useCopyToClipboard()

const playerCount = ref('加载中...')

const copyServerIp = () => {
  copy(site.serverIp)
}

// 模拟获取服务器状态
onMounted(() => {
  setTimeout(() => {
    playerCount.value = '128'
  }, 1000)
})
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.7);
    z-index: 1;
  }
}

.hero-container {
  width: 100%;
  display: flex;
  padding-top: var(--nav-height);
  position: relative;
  z-index: 2;
}

.hero-content {
  max-width: 650px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  svg {
    color: var(--accent-gold);
  }
}

.server-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
  font-size: 1rem;

  .status-dot {
    width: 10px;
    height: 10px;
    background: var(--accent-green);
    border-radius: 50%;
    animation: pulse-glow 2s infinite;
  }

  .highlight-green {
    color: var(--accent-green);
    font-weight: 700;
  }
}

h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  .highlight {
    background: linear-gradient(135deg, var(--accent-green), #00c853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-features {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;

  .h-feature {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 500;

    svg {
      color: var(--accent-green);
    }
  }
}

.hero-buttons {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #52a535, #2d5016);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(82, 165, 53, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(82, 165, 53, 0.4);
  }
}

.server-ip {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-family: monospace;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--primary-color);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary-color);
  }
}
</style>
