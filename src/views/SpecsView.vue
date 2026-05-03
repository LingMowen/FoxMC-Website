<template>
  <PageLayout>
    <section class="page-section specs-page">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ specs.title }}</h2>
          <p class="section-subtitle">{{ specs.subtitle }}</p>
        </div>
        <div class="specs-grid">
          <div v-for="(item, index) in specs.items" :key="index" class="spec-card">
            <div class="spec-icon">
              <img :src="item.icon" :alt="item.title">
            </div>
            <div class="spec-content">
              <h3>{{ item.title }}</h3>
              <div class="spec-value">{{ item.value }}</div>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig'
import PageLayout from './PageLayout.vue'

const { specs } = useSiteConfigStore()
</script>

<style scoped lang="scss">
.specs-page {
  padding: 60px 0 80px;
  min-height: calc(100vh - var(--nav-height));
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 48px;
}

.spec-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(34, 197, 94, 0.3);
    transform: translateY(-2px);
  }
}

.spec-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 10px;
  padding: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.spec-content {
  flex: 1;

  h3 {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 6px;
    font-weight: 500;
  }

  .spec-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: #22c55e;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

@media (max-width: 768px) {
  .specs-page {
    padding: 80px 0 60px;
  }

  .spec-card {
    padding: 20px;
  }

  .spec-content .spec-value {
    font-size: 1.5rem;
  }
}
</style>
