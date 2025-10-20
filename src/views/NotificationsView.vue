<template>
  <div class="app">
    <h2 class="app-title" v-if="Notifications.isNotifications.length">
      Vous avez {{ Notifications.isNotifications.length }} Notification(s)
    </h2>
    <div
      v-if="!Notifications.isNotifications.length"
      style="
        height: 300px;
        text-align: center;
        font-weight: bold;
        margin-top: 1em;
        font-size: 2em;
        color: black;
      "
    >
      Pas de notifications
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
    <!-- <FavorisCard /> -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import NotificationSection from "../components/NotificationSection.vue";
import { useNotificationsStore } from "../store-pinia/useNotificationsStore";
// import FavorisCard from "../components/FavorisCard.vue";
const Notifications = useNotificationsStore();
onMounted(async () => {
  await Notifications.getListNotification();
});
</script>

<style scoped>
.app {
  width: 100%;
  margin: 6.6em 0;
  padding: 20px;
  height:80vh;
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
     height:80%;
  }
}
</style>
