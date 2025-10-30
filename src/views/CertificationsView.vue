<template>
  <HeaderDashboard TitleHeader="Mes certifications" subTitleHeader="Mes certifications" />
  <div class="events-section" v-if="jobs.length">
    <EventCard v-for="(event, index) in jobs" :key="index" :job="event" />
  </div>
   <div v-else>
    <h2 style="text-align:center;padding:0 0 5em 0;">Chargement...</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import instance from "../api/api";
import HeaderDashboard from "../Shared/Compoments/HeaderDashboard.vue";
import EventCard from "../components/dashboard/etudiant-route/EventCard.vue";

const jobs = ref([]);

const getCertificationsStudentConnecte = async () => {
  await instance
    .get("mes-certifications")
    .then((response) => {
      console.log("getCertificationsStudentConnecte", response);
      jobs.value = response.data
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getCertificationsStudentConnecte();
});
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
