<template>
  <div class="home">
    <Navbar />
    <main>
      <HeroSection />
      <SpecsSection />
      <HelpSection />
      <FeaturesSection />
      <GallerySection />
      <TeamSection />
      <ContactSection />
      <CommunitySection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import HeroSection from './home/HeroSection.vue'
import SpecsSection from './home/SpecsSection.vue'
import HelpSection from './home/HelpSection.vue'
import FeaturesSection from './home/FeaturesSection.vue'
import GallerySection from './home/GallerySection.vue'
import TeamSection from './home/TeamSection.vue'
import ContactSection from './home/ContactSection.vue'
import CommunitySection from './home/CommunitySection.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}
</style>
