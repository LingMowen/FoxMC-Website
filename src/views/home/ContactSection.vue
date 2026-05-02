<template>
  <section id="contact" class="contact-section" :style="{ backgroundImage: `url(${contactBg})` }">
    <div class="container">
      <div class="section-header scroll-fade-up">
        <h2 class="section-title">联系我们</h2>
        <p class="section-subtitle">有任何问题或建议？欢迎随时与我们联系</p>
      </div>

      <div class="contact-grid">
        <!-- Email Guide -->
        <div class="email-guide scroll-fade-up delay-100">
          <h3>📧 邮件指南</h3>
          <ul>
            <li>请使用<strong>真实邮箱</strong>发送，以便我们回复您。</li>
            <li>邮件标题请包含<strong>【服务器名称】</strong>字样。</li>
            <li>描述问题时请尽量<strong>详细</strong>，以便我们快速定位。</li>
            <li>如需上传截图，请直接拖拽到输入框中。</li>
            <li>我们承诺在<strong>24小时内</strong>回复您的邮件。</li>
          </ul>
          <div class="email-address">
            <span>联系邮箱：</span>
            <a href="mailto:admin@example.com">admin@example.com</a>
          </div>
        </div>

        <!-- Contact Form -->
        <form class="contact-form scroll-fade-up delay-200" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">您的称呼</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="请输入您的称呼"
              required
            >
          </div>

          <div class="form-group">
            <label for="email">联系邮箱</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="请输入您的邮箱"
              required
            >
          </div>

          <div class="form-group">
            <label for="message">留言内容</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              placeholder="请输入您的问题或建议..."
              required
            ></textarea>
          </div>

          <div class="form-group file-upload">
            <label for="attachment">上传图片（可选）</label>
            <div class="file-input-wrapper">
              <input
                id="attachment"
                type="file"
                accept="image/*"
                @change="handleFileChange"
              >
              <span class="file-placeholder">
                {{ form.attachment ? form.attachment.name : '点击或拖拽上传图片' }}
              </span>
            </div>
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Preview">
              <button type="button" class="remove-image" @click="removeImage">×</button>
            </div>
          </div>

          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? '发送中...' : '发送消息' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const contactBg = '/png/5e1e1be033cbd911e62327519886379f.jpg'

const form = ref({
  name: '',
  email: '',
  message: '',
  attachment: null as File | null
})

const imagePreview = ref('')
const isSubmitting = ref(false)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    form.value.attachment = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  form.value.attachment = null
  imagePreview.value = ''
}

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  alert('消息已发送！我们会尽快回复您。')
  form.value = { name: '', email: '', message: '', attachment: null }
  imagePreview.value = ''
  isSubmitting.value = false
}
</script>

<style scoped lang="scss">
.contact-section {
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.email-guide {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 20px;
  padding: 2rem;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }

  ul {
    margin-bottom: 2rem;

    li {
      color: var(--text-muted);
      margin-bottom: 0.8rem;
      line-height: 1.6;
      padding-left: 1.2rem;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--accent-green);
      }

      strong {
        color: var(--primary-color);
      }
    }
  }
}

.email-address {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  span {
    color: var(--text-muted);
  }

  a {
    color: var(--accent-gold);
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}

.contact-form {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--text-main);
    font-size: 1rem;
    transition: var(--transition);

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
    min-height: 120px;
  }
}

.file-input-wrapper {
  position: relative;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--accent-green);
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .file-placeholder {
    color: var(--text-muted);
    font-size: 0.9rem;
  }
}

.image-preview {
  position: relative;
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
  }

  .remove-image {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(233, 30, 99, 0.8);
    }
  }
}

.btn-submit {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--accent-green), #00c853);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
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
