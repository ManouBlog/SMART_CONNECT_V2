<template>
  <div class="app">
    <h2 class="app-title" v-if="dataAlarm.length || Notifications.isNotifications.length">
      Vous avez {{ dataAlarm.length ? dataAlarm.length+Notifications.isNotifications.length:Notifications.isNotifications.length }} Notification(s)
    </h2>
    <div style="height:300px" v-if="dataAlarm.length+Notifications.isNotifications.length === 0 && user.user.statut.statut !== 'etudiant'">
      <h2 style="text-align:center;">Pas de notifications</h2>
    </div>
    <div
      v-if="!Notifications.isNotifications.length && user.user.statut.statut === 'etudiant'"
      style="
        height: 300px;
        text-align: center;
        font-weight: bold;
        margin-top: 1em;
        font-size: 2em;
        color: black;
      "
    >
      <h2 style="text-align:center;">Pas de notifications</h2>
    </div>
    <NotificationSection
      v-if="Notifications.todayNotifications.length"
      title="Aujourd’hui"
      :notifications="Notifications.todayNotifications"
    />
    <NotificationSection
      v-if="Notifications.yesterdayNotifications.length"
      title="Passées"
      :notifications="Notifications.yesterdayNotifications"
    />
    <div
            v-for="(item, index) in dataAlarm"
            :key="index"
            class="listWhistPerson"
          >
          <FavorisCard 
           :favoris="item"
           @accept="voirDetailPostulants"
           :isDetailPostulant="true"
          />
          </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import instance from "../api/api";

// Components
import NotificationSection from "../components/NotificationSection.vue";
import FavorisCard from "../components/FavorisCard.vue";

// Pinia store
import { useNotificationsStore } from "../store-pinia/useNotificationsStore";

// === Initialisations ===
const router = useRouter();
const vuexStore = useStore();
const Notifications = useNotificationsStore();

// === State ===
const user = computed(() => vuexStore.state.user);
const dataAlarm = ref([]);

// === Fonctions ===
async function getOffresInteressByStudent() {
  try {
    const response = await instance.get("list_offres_interess_by_students");
  console.log("get_offres_interess_by_student8596")
    if (response.status === 200) {
      dataAlarm.value = response?.data?.filter((item) => item.recruit === 0);
      console.log(
        "Offres intéressées par les étudiants (recruit=1) :",
        response?.data?.filter((item) => item.recruit === 1)
      );
    }
  } catch (error) {
    console.error("Erreur lors du chargement des offres :", error);
  }
}

function voirDetailPostulants(nameOffre) {
  // On charge d'abord les offres
  getOffresInteressByStudent();

  // Puis on redirige vers la page de détails
  router.push({
    name: "detailsPostulants",
    params: { offre: nameOffre?.nom_offre },
  });
}

// === Lifecycle ===
onMounted(async () => {
  await Notifications.getListNotification();
  await getOffresInteressByStudent();
});
</script>


<style scoped>
.app {
  width: 100%;
  margin: 6.6em 0;
  padding: 20px;
  height: 100%;
  font-family: "Arial", sans-serif;
}

.app-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 20px 0;
  text-align: left;
}
@media (max-width: 1200px) {
  .app {
    margin: 1.6em 0 !important;
    height: 100%;
  }
}
</style>
