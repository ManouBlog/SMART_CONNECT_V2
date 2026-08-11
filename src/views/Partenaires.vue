<script setup>
import Logo from '../components/partenaires/Logo.vue';
import PartnerSection from '../components/partenaires/PartnerSection.vue';
import { onMounted, ref } from 'vue';
import instance from '../api/api.js';
import { useLoadingSpinner } from '../store-pinia/LoadingSpinner/useLoadingSpinner.js';
// import { useBreakpoints } from '@vueuse/core'
// const breakpoints = useBreakpoints({
//   mobile: 560,
//   desktop: 1024,
// })

// const isMobile = breakpoints.smaller('mobile')
// const isDesktop = breakpoints.greaterOrEqual('desktop')

// const partnerInstitutionnelMargin = computed(() => {
//   if (isMobile.value) {
//     return null
//   }

//   if (isDesktop.value) {
//     return {
//       marginLeft: '-0.1px',
//       marginRight: '60px',
//     }
//   }

//   return {
//     marginLeft: '-0.1px',
//     marginRight: '10px',
//   }
// })

// const partnerEcoleMargin = computed(() => {
//   if (isMobile.value) {
//     return null
//   }

//   if (isDesktop.value) {
//     return {
//       marginRight: '-0.1px',
//       marginLeft: '45px',
//     }
//   }

//   return {
//     marginRight: '-0.1px',
//     marginLeft: '20px',
//   }
// })
const storeLoading = useLoadingSpinner();

const dataInstitutions = ref([]);
const dataEcoles = ref([]);
const getPartenaires = async () => {
  storeLoading.launchLoading(true);
  try {
    const responsePartenaires = await instance.get("allPartenaire");
    console.log("responsePartenaires", responsePartenaires.data.data)
    dataInstitutions.value = responsePartenaires.data.data.filter(item => item.type_partenaire == 'institution');
    dataEcoles.value = responsePartenaires.data.data.filter(item => item.type_partenaire == 'ecole');
  } catch (error) {
    console.error(error)
  } finally {
    storeLoading.launchLoading(false);
  }
}
onMounted(async () => {
  await getPartenaires()
})
</script>
<template>
  <div class="container_partenaire">
    <!-- Bannière -->
    <div class="container_baniere">

      <!-- Image de la bannière -->
      <img src="/baniere_partenaires.png" alt="Nos partenaires de confiance" class="baniere_image" />

      <!-- Texte sur l'image -->
      <div class="partenaire_banner">
        Nos partenaires <br> de confiance
      </div>
    </div>
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
        v-if="dataInstitutions.length" 
        title="Partenaires institutionnels"
        :dataPartenaires="dataInstitutions" 
        :detail="'institution'"
        />
        <Logo />
        <PartnerSection v-if="dataEcoles.length" 
        title="Partenaires écoles" 
        :dataPartenaires="dataEcoles"
        :detail="'ecole'"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container_partenaire {
  min-height: 100vh;
  background-color: #FFF8F0;
  padding: 4em 0;
  margin-top: 2.65em;
  position: relative;
}

.overLay_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(215deg,
      #FF9900,
      #25525F,
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
  padding: 1em 0 0 0;
  font-family: Arial, sans-serif;
}

header p {
  font-size: 1.2em;
  color: #030404;
  margin-bottom: 3em;
  font-family: Arial, sans-serif;
  max-width: 800px;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
}

.conteneurs_partner_section {
  display: flex;
  align-items: center;
  justify-items: center;
  place-content: center;
  gap: 1em;
  flex-wrap: wrap;
}

.container_baniere {
  position: relative;
  width: 100%;
}

/* Image */
.baniere_image {
  display: block;
  width: 100%;
  height: 320px;
  object-fit: cover;
  object-position: center;
}

/* Texte */
.partenaire_banner {
  position: absolute;
  top: 25px;
  left: 30px;
  padding: 12px 25px;
  color: #FF9900;
  font-size: 28px;
  font-weight: 600;
  z-index: 2;
}

/* Tablette */
@media (max-width: 768px) {
  .baniere_image {
    height: 260px;
  }

  .partenaire_banner {
    top: 20px;
    right: 20px;
    padding: 10px 18px;
    font-size: 16px;
  }
}

/* Mobile */
@media (max-width: 560px) {
  .baniere_image {
    height: 200px;
  }

  .partenaire_banner {
    top: 15px;
    right: 15px;
    padding: 8px 14px;
    font-size: 13px;
    border-radius: 0 0 0 14px;
  }
}

@media (max-width: 560px) {
  .conteneurs_partner_section {
    flex-direction: column;
  }
}
</style>
