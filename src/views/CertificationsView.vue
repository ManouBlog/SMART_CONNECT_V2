<template>
     <HeaderDashboard
      TitleHeader="Mes certifications"
      subTitleHeader="Mes certifications"
    />
  <div class="events-section">
   
    <EventCard
      v-for="(event, index) in jobs"
      :key="index"
      :job="event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderDashboard from '../Shared/Compoments/HeaderDashboard.vue';
import EventCard from '../components/dashboard/etudiant-route/EventCard.vue';

const jobs = ref([
  {
    title: "Livreur à vélo",
    date: "Du 5 au 15 novembre",
    location: "Abidjan, Cocody",
    entreprise:
      "Locomotive sarl",
    isAvailable: true,
  },
  {
    title: "Aide à domicile",
    date: "Du 5 au 15 novembre",
    location: "Abobo",
    entreprise:
      "Jumia",
    isAvailable: false,
  },
  {
    title: "Agent d’accueil événementiel",
    date: "9 - 10 novembre",
    location: "Plateau",
    entreprise:"Glovo",
    isAvailable: true,
  },
  {
    title: "Nettoyage de bureaux",
    date: "Chaque week-end",
    location: "Yopougon",
    entreprise:"Nestlé",
    isAvailable: true,
  },
]);

</script>

<style scoped>
.events-section {
    max-width: 100%;
    margin: 0 10px;
  }

.events-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

</style>
