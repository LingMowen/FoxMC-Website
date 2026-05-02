<template>
  <section id="team" class="team-section" :style="{ backgroundImage: `url(${team.bgImage})` }">
    <div class="container">
      <div class="section-header scroll-fade-up">
        <h2 class="section-title">{{ team.title }}</h2>
        <p class="section-subtitle">{{ team.subtitle }}</p>
      </div>

      <div class="team-carousel">
        <div class="team-track" :style="trackStyle">
          <div
            v-for="(member, index) in duplicatedMembers"
            :key="`${member.name}-${index}`"
            class="team-card"
          >
            <div class="team-avatar">
              <img :src="member.avatar" :alt="member.name" loading="lazy">
            </div>
            <h3 class="team-name">{{ member.name }}</h3>
            <span class="team-role">{{ member.role }}</span>
            <p class="team-desc">{{ member.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSiteConfigStore } from '@/stores/siteConfig'

const { team } = useSiteConfigStore()

// Duplicate members for infinite scroll effect
const duplicatedMembers = computed(() => [...team.members, ...team.members, ...team.members])

const trackStyle = computed(() => ({
  animation: `scroll 30s linear infinite`,
  width: `${duplicatedMembers.value.length * 280}px`
}))
</script>

<style scoped lang="scss">
.team-section {
  padding: 6rem 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;

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

.team-carousel {
  overflow: hidden;
  margin: 0 -24px;
  padding: 20px 0;
}

.team-track {
  display: flex;
  gap: 2rem;
  padding: 0 24px;
}

.team-card {
  flex-shrink: 0;
  width: 260px;
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.team-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.team-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--primary-color);
}

.team-role {
  display: block;
  font-size: 0.85rem;
  color: var(--accent-gold);
  margin-bottom: 1rem;
  font-weight: 500;
}

.team-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
}

.team-carousel:hover .team-track {
  animation-play-state: paused;
}
</style>
