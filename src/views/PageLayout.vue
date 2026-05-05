<template>
  <div class="page-layout">
    <Navbar />
    <main class="page-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped lang="scss">
.page-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-main {
  flex: 1;
  padding-top: var(--nav-height);
}
</style>
