import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 从 localStorage 读取登录状态
  const token = ref(localStorage.getItem('admin_token') || '')
  const user = ref(JSON.parse(localStorage.getItem('admin_user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  // 默认账号密码（实际项目中应该使用后端验证）
  const defaultUsername = 'admin'
  const defaultPassword = 'admin123'

  const login = async (username: string, password: string): Promise<boolean> => {
    // 模拟登录验证
    if (username === defaultUsername && password === defaultPassword) {
      const mockToken = 'mock_token_' + Date.now()
      const mockUser = {
        username: 'admin',
        avatar: '/egg/cat.jpg',
        role: '管理员'
      }

      token.value = mockToken
      user.value = mockUser

      localStorage.setItem('admin_token', mockToken)
      localStorage.setItem('admin_user', JSON.stringify(mockUser))

      return true
    }
    return false
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout
  }
})
