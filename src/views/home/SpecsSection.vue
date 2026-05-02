<template>
  <section id="specs" class="specs-section" :style="{ backgroundImage: `url(${specs.bgImage})` }">
    <div class="container">
      <div class="section-header scroll-fade-up">
        <h2 class="section-title">{{ specs.title }}</h2>
        <p class="section-subtitle">{{ specs.subtitle }}</p>
      </div>

      <div class="specs-grid">
        <div
          v-for="(item, index) in specs.items"
          :key="item.title"
          class="spec-card scroll-fade-up"
          :class="`delay-${(index + 1) * 100}`"
        >
          <div class="spec-icon-wrapper">
            <img :src="item.icon" :alt="item.title" class="spec-icon" loading="lazy">
          </div>
          <h3 class="spec-title">{{ item.title }}</h3>
          <p class="spec-desc">{{ item.desc }}</p>
          <div class="spec-value">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig'

const { specs } = useSiteConfigStore()
</script>

<style scoped lang="scss">
.specs-section {
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

.specs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.spec-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: var(--transition);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.spec-icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.spec-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--primary-color);
}

.spec-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.spec-value {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-gold), #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
