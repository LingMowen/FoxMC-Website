<template>
  <PageLayout>
    <section class="page-section team-page">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ team.title }}</h2>
          <p class="section-subtitle">{{ team.subtitle }}</p>
        </div>
        <div class="team-grid">
          <div v-for="(member, index) in team.members" :key="index" class="team-card">
            <div class="team-avatar">
              <img :src="member.avatar" :alt="member.name">
            </div>
            <h3>{{ member.name }}</h3>
            <span class="team-role">{{ member.role }}</span>
            <p>{{ member.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig'
import PageLayout from './PageLayout.vue'

const { team } = useSiteConfigStore()
</script>

<style scoped lang="scss">
.team-page {
  padding: 60px 0 80px;
  min-height: calc(100vh - var(--nav-height));
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 48px;
}

.team-card {
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

.team-avatar {
  width: 88px;
  height: 88px;
  margin: 0 auto 20px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.team-card h3 {
  font-size: 1.15rem;
  margin-bottom: 8px;
  color: var(--text-main);
  font-weight: 600;
}

.team-role {
  display: inline-block;
  padding: 4px 14px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 14px;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.team-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .team-page {
    padding: 80px 0 60px;
  }

  .team-card {
    padding: 24px 20px;
  }

  .team-avatar {
    width: 72px;
    height: 72px;
  }
}
</style>
