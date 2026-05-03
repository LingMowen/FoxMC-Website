<template>
  <div class="home">
    <Navbar />
    <main>
      <HeroSection />
      <!-- 快捷入口 -->
      <section class="quick-links">
        <div class="container">
          <h2 class="section-title">探索更多</h2>
          <div class="links-grid">
            <router-link to="/specs" class="link-card">
              <div class="link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              </div>
              <h3>服务器配置</h3>
              <p>查看服务器详细配置信息</p>
            </router-link>
            <router-link to="/help" class="link-card">
              <div class="link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3>加入指南</h3>
              <p>了解如何加入服务器</p>
            </router-link>
            <router-link to="/features" class="link-card">
              <div class="link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3>游戏特色</h3>
              <p>探索服务器的独特玩法</p>
            </router-link>
            <router-link to="/gallery" class="link-card">
              <div class="link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <h3>游戏截图</h3>
              <p>欣赏玩家精彩作品</p>
            </router-link>
            <router-link to="/team" class="link-card">
              <div class="link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>管理团队</h3>
              <p>认识我们的管理团队</p>
            </router-link>
            <router-link to="/community" class="link-card">
              <div class="link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3>加入社区</h3>
              <p>与其他玩家交流互动</p>
            </router-link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import HeroSection from './home/HeroSection.vue'
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}

.quick-links {
  padding: 80px 0;
  background: var(--bg-dark);
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.link-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: var(--glass-border);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

    .link-icon {
      background: linear-gradient(135deg, var(--primary-color), var(--accent-gold));
      color: white;
    }
  }
}

.link-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.link-card h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: var(--text-main);
}

.link-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .quick-links {
    padding: 60px 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .link-card {
    padding: 24px;
  }
}
</style>
