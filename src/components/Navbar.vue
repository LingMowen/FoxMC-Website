<template>
  <div>
    <nav class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="container nav-container">
        <a href="#" class="logo">
          <svg class="logo-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4H20V20H4V4Z"/>
            <path d="M4 12H20"/>
            <path d="M12 4V20"/>
          </svg>
          <span class="logo-text">{{ site.logoText }}</span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="nav-links-desktop">
          <li v-for="item in navItems" :key="item.to">
            <a href="javascript:void(0)" :class="{ active: route.path === item.to }" @click="navigateTo(item.to)">{{ item.label }}</a>
          </li>
          <li>
            <a href="javascript:void(0)" class="nav-register-btn" @click="showLoginAlert">登录/注册</a>
          </li>
        </ul>

        <!-- Hamburger Button -->
        <div class="hamburger" :class="{ 'active': isMenuOpen }" @click="toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>

    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" :class="{ 'active': isMenuOpen }" @click="closeMenu"></div>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'active': isMenuOpen }">
      <div class="sidebar-header">
        <span class="sidebar-title">菜单</span>
        <button class="sidebar-close" @click="closeMenu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18"/>
            <path d="M6 6L18 18"/>
          </svg>
        </button>
      </div>

      <ul class="sidebar-nav">
        <li v-for="item in navItems" :key="item.to">
          <a href="javascript:void(0)" :class="{ active: route.path === item.to }" @click="navigateTo(item.to)">
            <span class="nav-label">{{ item.label }}</span>
            <svg class="nav-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18L15 12L9 6"/>
            </svg>
          </a>
        </li>
      </ul>

      <div class="sidebar-footer">
        <a href="javascript:void(0)" class="sidebar-register-btn" @click="showLoginAlert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"/>
          </svg>
          登录 / 注册
        </a>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSiteConfigStore } from '@/stores/siteConfig'

const site = useSiteConfigStore().site
const router = useRouter()
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { label: '首页', to: '/' },
  { label: '配置', to: '/specs' },
  { label: '帮助', to: '/help' },
  { label: '特色', to: '/features' },
  { label: '相册', to: '/gallery' },
  { label: '团队', to: '/team' },
  { label: '联系', to: '/contact' },
  { label: '社区', to: '/community' }
]

const navigateTo = (to: string) => {
  router.push(to)
  closeMenu()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // Prevent body scroll when sidebar is open
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const showLoginAlert = () => {
  alert('注册功能开发中，敬请期待！')
  closeMenu()
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped lang="scss">
.navbar {
  height: var(--nav-height);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(6, 204, 244, 0.1);
  transition: var(--transition);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 100%;
    background: rgba(15, 23, 42, 0.98);
    z-index: 1;
  }

  &.scrolled {
    background: rgba(15, 23, 42, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
}

.nav-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.logo-svg {
  color: var(--primary-color);
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  flex-shrink: 0;
}

/* Desktop Navigation */
.nav-links-desktop {
  display: flex;
  gap: 2rem;

  a {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    transition: var(--transition);
    position: relative;
    padding: 5px 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--primary-color);
      transition: width 0.3s ease;
      box-shadow: 0 0 5px var(--primary-color);
    }

    &:hover {
      color: var(--primary-color);

      &::after {
        width: 100%;
      }
    }

    &.active {
      color: var(--primary-color);

      &::after {
        width: 100%;
      }
    }
  }
}

.nav-register-btn {
  background: linear-gradient(135deg, #22c55e, #16a34a) !important;
  color: #fff !important;
  padding: 6px 18px !important;
  border-radius: 20px;
  font-size: 0.88rem !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 10px rgba(34, 197, 94, 0.35);
  transition: all 0.25s ease !important;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #16a34a, #15803d) !important;
    box-shadow: 0 4px 16px rgba(34, 197, 94, 0.5);
    transform: translateY(-1px);
  }

  &::after {
    display: none !important;
  }
}

/* Hamburger Button */
.hamburger {
  display: none;
  width: 44px;
  height: 44px;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
  position: relative;
  background: transparent;
  border: none;
  flex-shrink: 0;
  box-sizing: border-box;

  .bar {
      display: block;
      position: absolute;
      left: 11px;
      width: 22px;
      height: 2px;
      background: var(--primary-color);
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center center;

      &:nth-child(1) {
        top: 16px;
      }

      &:nth-child(2) {
        top: 26px;
      }
    }

    &.active {
      .bar:nth-child(1) {
        top: 21px;
        transform: rotate(45deg);
      }

      .bar:nth-child(2) {
        top: 21px;
        transform: rotate(-45deg);
      }
    }
}

/* Sidebar Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  max-width: 85vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;

  &.active {
    transform: translateX(0);
  }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary-color);
}

.sidebar-close {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--primary-color);
  }
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;

  li {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 1.5rem;
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.1rem;
      font-weight: 500;
      transition: var(--transition);

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--primary-color);
        padding-left: 2rem;

        .nav-arrow {
          transform: translateX(5px);
          color: var(--accent-green);
        }
      }

      &.active {
        background: rgba(233, 30, 99, 0.1);
        color: var(--primary-color);
        border-left: 3px solid var(--primary-color);
      }
    }
  }
}

.nav-label {
  flex: 1;
}

.nav-arrow {
  transition: all 0.3s ease;
  color: var(--text-muted);
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-register-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);

  &:hover {
    background: linear-gradient(135deg, #16a34a, #15803d);
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
    transform: translateY(-2px);
  }
}

/* Responsive */
@media (max-width: 992px) {
  .nav-links-desktop {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

@media (min-width: 993px) {
  .hamburger {
    display: none;
  }

  .sidebar,
  .sidebar-overlay {
    display: none;
  }
}
</style>
