<template>
  <section id="gallery" class="gallery-section" :style="{ backgroundImage: `url(${gallery.bgImage})` }">
    <div class="container">
      <div class="section-header scroll-fade-up">
        <h2 class="section-title">{{ gallery.title }}</h2>
        <p class="section-subtitle">{{ gallery.subtitle }}</p>
      </div>

      <div class="gallery-carousel-container">
        <div class="gallery-carousel-wrapper">
          <img
            :src="currentImage.src"
            :alt="currentImage.caption"
            class="gallery-active-image"
            loading="lazy"
          >
        </div>

        <div class="gallery-controls">
          <div class="gallery-text-content">
            <p>{{ currentImage.caption }}</p>
          </div>
          <div class="gallery-nav-buttons">
            <button class="nav-btn prev-btn" @click="prevImage">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <button class="nav-btn next-btn" @click="nextImage">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSiteConfigStore } from '@/stores/siteConfig'

const { gallery } = useSiteConfigStore()

const currentIndex = ref(0)
let autoPlayInterval: ReturnType<typeof setInterval> | null = null

const currentImage = computed(() => gallery.items[currentIndex.value] || { src: '', caption: '' })

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % gallery.items.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + gallery.items.length) % gallery.items.length
}

const startAutoPlay = () => {
  autoPlayInterval = setInterval(nextImage, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped lang="scss">
.gallery-section {
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

.gallery-carousel-container {
  max-width: 900px;
  margin: 0 auto;
}

.gallery-carousel-wrapper {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  margin-bottom: 1.5rem;
}

.gallery-active-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: opacity 0.5s ease;

  @media (max-width: 768px) {
    height: 300px;
  }
}

.gallery-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
}

.gallery-text-content {
  flex: 1;

  p {
    font-size: 1.1rem;
    color: var(--text-muted);
    text-align: left;

    @media (max-width: 768px) {
      text-align: center;
    }
  }
}

.gallery-nav-buttons {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--primary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
}
</style>
