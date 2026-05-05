<template>
  <div class="hero-settings">
    <form class="settings-form" @submit.prevent="saveSettings">
      <div class="form-section">
        <h3>横幅设置</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>徽章文字</label>
            <input v-model="form.badge" type="text" placeholder="输入徽章文字">
          </div>
          <div class="form-group">
            <label>标题第一行</label>
            <input v-model="form.titleLine1" type="text" placeholder="输入标题">
          </div>
          <div class="form-group">
            <label>高亮标题</label>
            <input v-model="form.titleHighlight" type="text" placeholder="输入高亮文字">
          </div>
          <div class="form-group full-width">
            <label>副标题</label>
            <textarea v-model="form.subtitle" rows="2" placeholder="输入副标题"></textarea>
          </div>
          <div class="form-group">
            <label>背景图片</label>
            <input v-model="form.bgImage" type="text" placeholder="输入图片路径">
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3>特性标签</h3>
        <div class="features-list">
          <div v-for="(feature, index) in form.features" :key="index" class="feature-input">
            <input v-model="form.features[index]" type="text" :placeholder="`特性 ${index + 1}`">
            <button type="button" class="btn-remove" @click="removeFeature(index)">×</button>
          </div>
          <button type="button" class="btn-add" @click="addFeature">+ 添加特性</button>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="resetForm">重置</button>
        <button type="submit" class="btn-primary" :disabled="isSaving">
          {{ isSaving ? '保存中...' : '保存设置' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSiteConfigStore } from '@/stores/siteConfig'

const siteStore = useSiteConfigStore()

const form = ref({
  badge: '',
  titleLine1: '',
  titleHighlight: '',
  subtitle: '',
  bgImage: '',
  features: ['', '', '']
})

const isSaving = ref(false)

onMounted(() => {
  form.value = {
    badge: siteStore.hero.badge,
    titleLine1: siteStore.hero.titleLine1,
    titleHighlight: siteStore.hero.titleHighlight,
    subtitle: siteStore.hero.subtitle,
    bgImage: siteStore.hero.bgImage,
    features: [...siteStore.hero.features]
  }
})

const addFeature = () => {
  form.value.features.push('')
}

const removeFeature = (index: number) => {
  form.value.features.splice(index, 1)
}

const saveSettings = async () => {
  isSaving.value = true

  siteStore.hero.badge = form.value.badge
  siteStore.hero.titleLine1 = form.value.titleLine1
  siteStore.hero.titleHighlight = form.value.titleHighlight
  siteStore.hero.subtitle = form.value.subtitle
  siteStore.hero.bgImage = form.value.bgImage
  siteStore.hero.features = form.value.features.filter(f => f.trim() !== '')

  localStorage.setItem('hero_config', JSON.stringify(siteStore.hero))

  await new Promise(resolve => setTimeout(resolve, 500))
  alert('设置已保存！')
  isSaving.value = false
}

const resetForm = () => {
  form.value = {
    badge: siteStore.hero.badge,
    titleLine1: siteStore.hero.titleLine1,
    titleHighlight: siteStore.hero.titleHighlight,
    subtitle: siteStore.hero.subtitle,
    bgImage: siteStore.hero.bgImage,
    features: [...siteStore.hero.features]
  }
}
</script>

<style scoped lang="scss">
.hero-settings {
  max-width: 800px;
}

.settings-form {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
}

.form-section {
  margin-bottom: 32px;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-muted);
    font-size: 0.9rem;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: var(--primary-color);
    font-size: 1rem;
    transition: all 0.3s ease;

    &::placeholder {
      color: var(--text-muted);
    }

    &:focus {
      outline: none;
      border-color: var(--accent-green);
      box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-input {
  display: flex;
  gap: 12px;

  input {
    flex: 1;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: var(--primary-color);
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--accent-green);
    }
  }
}

.btn-remove {
  width: 44px;
  height: 44px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  color: #ef4444;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
}

.btn-add {
  padding: 12px;
  background: rgba(0, 230, 118, 0.1);
  border: 1px dashed rgba(0, 230, 118, 0.3);
  border-radius: 10px;
  color: var(--accent-green);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 230, 118, 0.15);
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary {
  padding: 12px 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: var(--text-muted);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--primary-color);
  }
}

.btn-primary {
  padding: 12px 32px;
  background: linear-gradient(135deg, var(--accent-green), #00c853);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 230, 118, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>
