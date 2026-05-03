<template>
  <PageLayout>
    <section class="page-section help-page">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ help.title }}</h2>
          <p class="section-subtitle">{{ help.subtitle }}</p>
        </div>
        <div class="help-steps">
          <div v-for="(step, index) in help.steps" :key="index" class="help-step">
            <div class="step-number">{{ step.number }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
              <a v-if="step.action" href="#" class="step-action" @click.prevent="handleAction(step.action)">
                {{ step.actionText }}
              </a>
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

const { help, site } = useSiteConfigStore()

const handleAction = (action: string) => {
  if (action === 'copy') {
    navigator.clipboard.writeText(site.serverIp)
    alert('服务器地址已复制到剪贴板！')
  }
}
</script>

<style scoped lang="scss">
.help-page {
  padding: 60px 0 80px;
  min-height: calc(100vh - var(--nav-height));
}

.help-steps {
  max-width: 800px;
  margin: 48px auto 0;
}

.help-step {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 28px 32px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(34, 197, 94, 0.3);
    transform: translateY(-2px);
  }
}

.step-number {
  width: 56px;
  height: 56px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #22c55e;
  flex-shrink: 0;
}

.step-content {
  flex: 1;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-main);
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.7;
    margin-bottom: 16px;
  }
}

.step-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #22c55e;
  color: #0f172a;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);

  &:hover {
    background: #16a34a;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
  }
}

@media (max-width: 768px) {
  .help-page {
    padding: 80px 0 60px;
  }

  .help-step {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px;
  }

  .step-number {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }
}
</style>
