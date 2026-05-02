<template>
  <section id="community" class="community-section" :style="{ backgroundImage: `url(${community.bgImage})` }">
    <div class="container">
      <div class="section-header scroll-fade-up">
        <h2 class="section-title">{{ community.title }}</h2>
        <p class="section-subtitle">{{ community.subtitle }}</p>
      </div>

      <div class="community-grid">
        <!-- QQ Group -->
        <div class="community-card scroll-fade-up delay-100">
          <div class="community-icon qq">
            <svg viewBox="0 0 24 24" width="40" height="40">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <h3>{{ community.qq.text }}</h3>
          <p>{{ community.qq.desc }}</p>
          <a :href="community.qq.link" class="btn-community qq-btn">立即加入</a>
        </div>

        <!-- WeChat Group -->
        <div class="community-card scroll-fade-up delay-200">
          <div class="community-icon wechat">
            <svg viewBox="0 0 24 24" width="40" height="40">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
          <h3>{{ community.wechat.text }}</h3>
          <p>{{ community.wechat.desc }}</p>
          <a :href="community.wechat.link" class="btn-community wechat-btn">立即加入</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig'

const { community } = useSiteConfigStore()
</script>

<style scoped lang="scss">
.community-section {
  padding: 6rem 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.85);
  }

  .container {
    position: relative;
    z-index: 1;
  }
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.community-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  transition: var(--transition);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.community-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.qq {
    background: linear-gradient(135deg, #12b7f5, #0a8dc7);
    color: white;
  }

  &.wechat {
    background: linear-gradient(135deg, #07c160, #059e4c);
    color: white;
  }
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

p {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-community {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: var(--transition);

  &.qq-btn {
    background: linear-gradient(135deg, #12b7f5, #0a8dc7);
    color: white;
    box-shadow: 0 4px 15px rgba(18, 183, 245, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(18, 183, 245, 0.4);
    }
  }

  &.wechat-btn {
    background: linear-gradient(135deg, #07c160, #059e4c);
    color: white;
    box-shadow: 0 4px 15px rgba(7, 193, 96, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(7, 193, 96, 0.4);
    }
  }
}
</style>
