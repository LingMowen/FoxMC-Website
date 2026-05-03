<template>
  <PageLayout>
    <section class="page-section features-page">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ features.title }}</h2>
          <p class="section-subtitle">{{ features.subtitle }}</p>
        </div>
        <div class="features-grid">
          <div v-for="(item, index) in features.items" :key="index" class="feature-card">
            <div class="feature-icon">
              <img :src="item.icon" :alt="item.title">
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig'
import PageLayout from './PageLayout.vue'

const { features } = useSiteConfigStore()
</script>

<style scoped lang="scss">
.features-page {
  padding: 60px 0 80px;
  min-height: calc(100vh - var(--nav-height));
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 48px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(34, 197, 94, 0.3);
    transform: translateY(-2px);
  }
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 12px;
  padding: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--text-main);
  font-weight: 600;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .features-page {
    padding: 80px 0 60px;
  }

  .feature-card {
    padding: 28px 20px;
  }

  .feature-icon {
    width: 56px;
    height: 56px;
  }
}
</style>
