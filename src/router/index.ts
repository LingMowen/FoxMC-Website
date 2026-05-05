import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/specs',
      name: 'specs',
      component: () => import('../views/SpecsView.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue')
    },
    {
      path: '/features',
      name: 'features',
      component: () => import('../views/FeaturesPage.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryPage.vue')
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/TeamPage.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityPage.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPage.vue')
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/DashboardView.vue')
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../views/admin/SettingsView.vue')
        },
        {
          path: 'hero',
          name: 'admin-hero',
          component: () => import('../views/admin/HeroView.vue')
        },
        {
          path: 'specs',
          name: 'admin-specs',
          component: () => import('../views/admin/SpecsView.vue')
        },
        {
          path: 'help',
          name: 'admin-help',
          component: () => import('../views/admin/HelpView.vue')
        },
        {
          path: 'features',
          name: 'admin-features',
          component: () => import('../views/admin/FeaturesView.vue')
        },
        {
          path: 'gallery',
          name: 'admin-gallery',
          component: () => import('../views/admin/GalleryView.vue')
        },
        {
          path: 'team',
          name: 'admin-team',
          component: () => import('../views/admin/TeamView.vue')
        },
        {
          path: 'community',
          name: 'admin-community',
          component: () => import('../views/admin/CommunityView.vue')
        }
      ]
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/admin/login')
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/admin')
  } else {
    next()
  }
})

export default router
