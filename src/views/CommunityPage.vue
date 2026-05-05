<template>
  <PageLayout>
    <section class="page-section community-page">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ community.title }}</h2>
          <p class="section-subtitle">{{ community.subtitle }}</p>
        </div>
        <div class="community-grid">
          <a :href="community.qq.link" target="_blank" class="community-card">
            <div class="community-icon qq-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <h3>{{ community.qq.text }}</h3>
            <p>{{ community.qq.desc }}</p>
            <span class="community-link">立即加入 →</span>
          </a>
          <a :href="community.wechat.link" target="_blank" class="community-card">
            <div class="community-icon wechat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <h3>{{ community.wechat.text }}</h3>
            <p>{{ community.wechat.desc }}</p>
            <span class="community-link">立即加入 →</span>
          </a>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig'
import PageLayout from './PageLayout.vue'

const { community } = useSiteConfigStore()
</script>

<style scoped lang="scss">
.community-page {
  padding: 60px 0 80px;
  min-height: calc(100vh - var(--nav-height));
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 48px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.community-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 16px;
  padding: 48px 32px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
}

.community-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.qq-icon {
    background: linear-gradient(135deg, #12b7f5, #0099ff);
  }

  &.wechat-icon {
    background: linear-gradient(135deg, #07c160, #00b057);
  }

  svg {
    color: white;
  }
}

.community-card h3 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: var(--text-main);
}

.community-card p {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.community-link {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-gold));
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(233, 30, 99, 0.3);
  }
}

@media (max-width: 768px) {
  .community-page {
    padding: 80px 0 60px;
  }

  .community-card {
    padding: 32px 24px;
  }
}
</style>
