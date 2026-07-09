<template>
  <HeaderDashboard :TitleHeader="'Notifications'" :subTitleHeader="'Notifications'" />
  <div class="app">
    <div style="height:300px"
      v-if="!Notifications?.todayNotifications?.length && !Notifications?.yesterdayNotifications?.length">
      <h2 style="text-align:center;">Pas de notifications</h2>
    </div>
    <NotificationSection v-if="Notifications?.todayNotifications?.length" title="Aujourd’hui"
      :notifications="Notifications?.todayNotifications" />
    <NotificationSection v-if="Notifications?.yesterdayNotifications?.length" title="Passées"
      :notifications="Notifications?.yesterdayNotifications" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import HeaderDashboard from "../Shared/Compoments/HeaderDashboard.vue";
import NotificationSection from "../components/NotificationSection.vue";
import { useNotificationsStore } from "../store-pinia/useNotificationsStore";

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
