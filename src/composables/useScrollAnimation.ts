import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const observer = ref<IntersectionObserver | null>(null)

  const initScrollAnimation = () => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.value?.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    })

    const elements = document.querySelectorAll('.scroll-fade-up')
    elements.forEach(el => observer.value?.observe(el))
  }

  onMounted(() => {
    initScrollAnimation()
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    initScrollAnimation
  }
}
