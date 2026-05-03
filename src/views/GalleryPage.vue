<template>
  <PageLayout>
    <section class="page-section gallery-page">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ gallery.title }}</h2>
          <p class="section-subtitle">{{ gallery.subtitle }}</p>
        </div>
        <div class="gallery-grid">
          <div
            v-for="(item, index) in gallery.items"
            :key="index"
            class="gallery-item"
            @click="openLightbox(item.src)"
          >
            <img :src="item.src" :alt="item.caption">
            <div class="gallery-overlay">
              <p>{{ item.caption }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div v-if="lightboxImage" class="lightbox" @click.self="closeLightbox">
      <img :src="lightboxImage" alt="预览">
      <button class="lightbox-close" @click="closeLightbox">×</button>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSiteConfigStore } from '@/stores/siteConfig'
import PageLayout from './PageLayout.vue'

const { gallery } = useSiteConfigStore()

const lightboxImage = ref('')

const openLightbox = (src: string) => {
  lightboxImage.value = src
}

const closeLightbox = () => {
  lightboxImage.value = ''
}
</script>

<style scoped lang="scss">
.gallery-page {
  padding: 60px 0 80px;
  min-height: calc(100vh - var(--nav-height));
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 16 / 10;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  transform: translateY(100%);
  transition: transform 0.3s ease;

  p {
    color: white;
    font-weight: 500;
  }
}

.gallery-item:hover .gallery-overlay {
  transform: translateY(0);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;

  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
  }
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

@media (max-width: 768px) {
  .gallery-page {
    padding: 80px 0 60px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
