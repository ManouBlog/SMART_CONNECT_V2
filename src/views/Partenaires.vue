<script setup>
import Logo from '../components/partenaires/Logo.vue';
import PartnerSection from '../components/partenaires/PartnerSection.vue';
import { computed } from 'vue'
import { useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints({
  mobile: 560,
  desktop: 1024,
})

const isMobile = breakpoints.smaller('mobile')
const isDesktop = breakpoints.greaterOrEqual('desktop')

const partnerInstitutionnelMargin = computed(() => {
  if (isMobile.value) {
    return null
  }

  if (isDesktop.value) {
    return {
      marginLeft: '-0.1px',
      marginRight: '45px',
    }
  }

  return {
    marginLeft: '-0.1px',
    marginRight: '20px',
  }
})

const partnerEcoleMargin = computed(() => {
  if (isMobile.value) {
    return null
  }

  if (isDesktop.value) {
    return {
      marginRight: '-0.1px',
      marginLeft: '45px',
    }
  }

  return {
    marginRight: '-0.1px',
    marginLeft: '20px',
  }
})
</script>
<template>
  <div class="container_partenaire">
    <div class="overLay_container"></div>
    <div class="container_header">
      <!-- En-tête -->
      <header>
        <h1>Un écosystème de partenaires engagés</h1>
        <p>
          Grâce à nos partenaires, nous construisons chaque jour des passerelles
          entre les jeunes talents et le monde professionnel.
        </p>
      </header>

      <!-- Conteneur des partenaires -->
      <div class="conteneurs_partner_section">
        <PartnerSection 
        title="Partenaires institutionnels" 
        :rows="3" 
        :cols="3" 
        :size="80" 
         :stylemargin="partnerInstitutionnelMargin"
        />
        <Logo />
        <PartnerSection title="Partenaires écoles" 
        :rows="3"
         :cols="3" 
         :size="80" 
         :stylemargin="partnerEcoleMargin"
         />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container_partenaire {
  min-height: 100vh;
  background-color: #FFF8F0;
  padding: 4em 2em;
  margin-top: 6em;
  position: relative;
}

.overLay_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(to bottom,
      rgba(255, 235, 205, 0.3),
      transparent);
  z-index: -1;
}

.container_header {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #FFA500;
  margin-bottom: 1em;
  font-family: Arial, sans-serif;
}

header p {
  font-size: 1.2em;
  color: #1E3A5F;
  margin-bottom: 3em;
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.conteneurs_partner_section {
  display: flex;
  align-items: center;
  place-content: center;
  gap: 1em;
  flex-wrap: wrap;
}

@media (max-width: 560px) {
  .conteneurs_partner_section {
    flex-direction: column;
  }
}
</style>
