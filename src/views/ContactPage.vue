<template>
  <PageLayout>
    <section class="page-section contact-page">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">联系我们</h2>
          <p class="section-subtitle">有任何问题或建议？随时与我们联系</p>
        </div>
        <div class="contact-content">
          <div class="contact-info">
            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="info-text">
                <h4>邮箱</h4>
                <p>contact@foxmc.com</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div class="info-text">
                <h4>服务器地址</h4>
                <p>{{ site.serverIp }}</p>
              </div>
            </div>
          </div>
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label>您的姓名</label>
              <input v-model="form.name" type="text" placeholder="请输入您的姓名" required>
            </div>
            <div class="form-group">
              <label>联系邮箱</label>
              <input v-model="form.email" type="email" placeholder="请输入您的邮箱" required>
            </div>
            <div class="form-group">
              <label>留言内容</label>
              <textarea v-model="form.message" rows="5" placeholder="请输入您想说的话..." required></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? '发送中...' : '发送消息' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useSiteConfigStore } from '@/stores/siteConfig'
import PageLayout from './PageLayout.vue'

const { site } = useSiteConfigStore()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // 模拟提交
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 保存到 localStorage
  const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]')
  messages.push({
    id: Date.now(),
    name: form.name,
    email: form.email,
    content: form.message,
    time: new Date().toLocaleString(),
    read: false,
    tag: '联系表单',
    tagClass: 'tag-contact'
  })
  localStorage.setItem('contact_messages', JSON.stringify(messages))
  
  alert('消息已发送！我们会尽快回复您。')
  form.name = ''
  form.email = ''
  form.message = ''
  isSubmitting.value = false
}
</script>

<style scoped lang="scss">
.contact-page {
  padding: 60px 0 80px;
  min-height: calc(100vh - var(--nav-height));
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  margin-top: 48px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 16px;
}

.info-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-gold));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.info-text h4 {
  font-size: 1.1rem;
  margin-bottom: 4px;
  color: var(--text-main);
}

.info-text p {
  color: var(--text-muted);
}

.contact-form {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 16px;
  padding: 40px;
}

.form-group {
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-main);
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--text-main);
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    &::placeholder {
      color: var(--text-muted);
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-gold));
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(233, 30, 99, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding: 80px 0 60px;
  }

  .contact-content {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 24px;
  }
}
</style>
