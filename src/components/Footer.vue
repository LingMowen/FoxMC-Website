<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-brand">
        <a href="/" class="footer-logo" @click.prevent="navigateTo('/')">
          <svg class="footer-logo-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4H20V20H4V4Z"/>
            <path d="M4 12H20"/>
            <path d="M12 4V20"/>
          </svg>
          <span class="footer-logo-text">{{ site.logoText }}</span>
        </a>
        <p class="footer-desc">
          {{ footer.desc }}
        </p>
      </div>

      <div class="footer-links">
        <div class="footer-column">
          <h4>快速导航</h4>
          <ul>
            <li><a href="/" @click.prevent="navigateTo('/')">首页</a></li>
            <li><a href="/specs" @click.prevent="navigateTo('/specs')">服务器配置</a></li>
            <li><a href="/help" @click.prevent="navigateTo('/help')">如何加入</a></li>
            <li><a href="/features" @click.prevent="navigateTo('/features')">游戏特色</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>社区互动</h4>
          <ul>
            <li><a href="/gallery" @click.prevent="navigateTo('/gallery')">游戏截图</a></li>
            <li><a href="/team" @click.prevent="navigateTo('/team')">管理团队</a></li>
            <li><a href="/contact" @click.prevent="navigateTo('/contact')">联系我们</a></li>
            <li><a href="/community" @click.prevent="navigateTo('/community')">加入社区</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>友情链接</h4>
          <ul>
            <li v-for="link in footer.friendLinks" :key="link.name">
              <a :href="link.url" target="_blank">{{ link.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>{{ footer.copyright }}</p>
        <p class="disclaimer">NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSiteConfigStore } from '@/stores/siteConfig'

const router = useRouter()
const siteStore = useSiteConfigStore()
const site = siteStore.site
const footer = siteStore.footer

const navigateTo = (path: string) => {
  router.push(path)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped lang="scss">
.footer {
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4rem 0 0;
}

.footer-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.footer-brand {
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;

    svg {
      filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
    }
  }

  .footer-desc {
    color: var(--text-muted);
    line-height: 1.8;
    font-size: 0.95rem;
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.footer-column {
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    a {
      color: var(--text-muted);
      font-size: 0.95rem;
      transition: var(--transition);

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  text-align: center;

  p {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .disclaimer {
    font-size: 0.75rem;
    opacity: 0.7;
  }
}
</style>
