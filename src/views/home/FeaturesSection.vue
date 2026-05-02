<template>
  <section id="features" class="features-section" :style="{ backgroundImage: `url(${features.bgImage})` }">
    <div class="container">
      <div class="section-header scroll-fade-up">
        <h2 class="section-title">{{ features.title }}</h2>
        <p class="section-subtitle">{{ features.subtitle }}</p>
      </div>

      <div class="features-grid">
        <div
          v-for="(item, index) in features.items"
          :key="item.title"
          class="feature-card scroll-fade-up"
          :class="`delay-${(index + 1) * 100}`"
        >
          <div class="feature-icon-wrapper">
            <img :src="item.icon" :alt="item.title" class="feature-icon" loading="lazy">
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig'

const { features } = useSiteConfigStore()
</script>

<style scoped lang="scss">
.features-section {
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
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

    .feature-icon-wrapper {
      transform: scale(1.1);
    }
  }
}

.feature-icon-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.feature-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

p {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
}
</style>
