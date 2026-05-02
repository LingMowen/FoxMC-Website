<template>
  <section id="help-docs" class="help-section" :style="{ backgroundImage: `url(${help.bgImage})` }">
    <div class="container">
      <div class="section-header scroll-fade-up">
        <h2 class="section-title">{{ help.title }}</h2>
        <p class="section-subtitle">{{ help.subtitle }}</p>
      </div>

      <div class="steps-container">
        <template v-for="(step, index) in help.steps" :key="step.number">
          <!-- Step Card -->
          <div class="step-card scroll-fade-up" :class="`delay-${(index + 1) * 100}`">
            <div class="step-number">{{ step.number }}</div>
            <div class="step-icon">
              <svg v-if="index === 0" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"/>
                <path d="M7 10L12 15L17 10"/>
                <path d="M12 15V3"/>
              </svg>
              <svg v-else-if="index === 1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
                <path d="M12 8V16"/>
                <path d="M8 12H16"/>
              </svg>
              <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 3L19 12L5 21V3Z"/>
              </svg>
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            
            <!-- Step 1: Download Button -->
            <a v-if="step.action" :href="step.action" target="_blank" class="btn-step">{{ step.actionText }}</a>
            
            <!-- Step 2: Server Address Copy -->
            <div v-else-if="index === 1" class="server-address-box">
              <span>{{ site.serverIp }}</span>
              <button class="copy-btn" @click="copyServerIp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"/>
                </svg>
              </button>
            </div>
            
            <!-- Step 3: Highlight Text -->
            <span v-else-if="step.highlight" class="highlight-text">{{ step.highlight }}</span>
          </div>

          <!-- Arrow (except after last step) -->
          <div v-if="index < help.steps.length - 1" class="step-arrow scroll-fade-up" :class="`delay-${(index + 2) * 100}`">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12H19"/>
              <path d="M12 5L19 12L12 19"/>
            </svg>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig'
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'

const { site, help } = useSiteConfigStore()
const { copy, copied } = useCopyToClipboard()

const copyServerIp = () => {
  copy(site.serverIp)
}
</script>

<style scoped lang="scss">
.help-section {
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

.steps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.step-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  width: 300px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.step-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.step-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-green);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.step-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.step-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.btn-step {
  display: inline-block;
  background: linear-gradient(135deg, var(--accent-green), #00c853);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 230, 118, 0.4);
  }
}

.server-address-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 16px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--accent-gold);

  .copy-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 4px;
    transition: var(--transition);

    &:hover {
      color: var(--primary-color);
    }
  }
}

.highlight-text {
  display: inline-block;
  background: linear-gradient(135deg, var(--accent-gold), #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 1.1rem;
}

.step-arrow {
  color: var(--text-muted);
  opacity: 0.6;

  @media (max-width: 992px) {
    transform: rotate(90deg);
  }
}
</style>
