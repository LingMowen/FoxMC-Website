<template>
  <div class="settings-page">
    <form class="settings-form" @submit.prevent="saveSettings">
      <div class="form-section">
        <h3>基本信息</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>网站标题</label>
            <input v-model="form.title" type="text" placeholder="输入网站标题">
          </div>
          <div class="form-group">
            <label>服务器 IP</label>
            <input v-model="form.serverIp" type="text" placeholder="输入服务器地址">
          </div>
          <div class="form-group full-width">
            <label>网站描述</label>
            <textarea v-model="form.description" rows="3" placeholder="输入网站描述"></textarea>
          </div>
          <div class="form-group">
            <label>Logo 文字</label>
            <input v-model="form.logoText" type="text" placeholder="输入 Logo 文字">
          </div>
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
  title: '',
  description: '',
  serverIp: '',
  logoText: ''
})

const isSaving = ref(false)

onMounted(() => {
  // Load current settings
  form.value = {
    title: siteStore.site.title,
    description: siteStore.site.description,
    serverIp: siteStore.site.serverIp,
    logoText: siteStore.site.logoText
  }
})

const saveSettings = async () => {
  isSaving.value = true

  // Update store
  siteStore.site.title = form.value.title
  siteStore.site.description = form.value.description
  siteStore.site.serverIp = form.value.serverIp
  siteStore.site.logoText = form.value.logoText

  // Save to localStorage
  localStorage.setItem('site_config', JSON.stringify(siteStore.site))

  await new Promise(resolve => setTimeout(resolve, 500))
  alert('设置已保存！')
  isSaving.value = false
}

const resetForm = () => {
  form.value = {
    title: siteStore.site.title,
    description: siteStore.site.description,
    serverIp: siteStore.site.serverIp,
    logoText: siteStore.site.logoText
  }
}
</script>

<style scoped lang="scss">
.settings-page {
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
    min-height: 100px;
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
