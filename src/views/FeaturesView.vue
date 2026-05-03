<template>
  <PageLayout>
    <section class="page-section features-page">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ features.title }}</h2>
          <p class="section-subtitle">{{ features.subtitle }}</p>
        </div>
        <div class="features-grid">
          <div v-for="(feature, index) in features.items" :key="index" class="feature-card glass-card">
            <div class="feature-icon">
              <img :src="feature.icon" :alt="feature.title">
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from './PageLayout.vue'
import { useSiteConfigStore } from '@/stores/siteConfig'

const { features } = useSiteConfigStore()
</script>

<style scoped lang="scss">
.features-page {
  padding: 120px 0 80px;
  min-height: calc(100vh - var(--nav-height));
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  text-align: center;
  padding: 40px 28px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
}

.feature-card p {
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features-page {
    padding: 80px 0 60px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    padding: 28px 20px;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
  }
}
</style>
