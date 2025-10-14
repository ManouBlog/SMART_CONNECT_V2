<template>
  <div class="app">
    <h2 class="app-title">Vous avez {{ totalNewNotifications }} Notifications aujourdhui</h2>
    <NotificationSection
    v-if="todayNotifications.length"
      title="Aujourd’hui"
      :notifications="todayNotifications"
    />
    <NotificationSection
    v-if="thisWeekNotifications.length"
      title="Passées"
      :notifications="thisWeekNotifications"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import NotificationSection from '../components/NotificationSection.vue';

const todayNotifications = ref([
  {
    username: 'Elayamani',
    action: 'a regardé votre profil',
    time: 'il y a 2 h',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isNew: true,
  },
  {
    username: 'Arsian Ali',
    action: 'a regardé votre profil',
    time: 'il y a 6 h',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isNew: true,
  },
  {
    username: 'Johnny vino',
    action: 'a regardé votre profil',
    time: 'il y a 8 h',
    avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
    isNew: true,
  },
]);

const thisWeekNotifications = ref([
  {
    username: 'Brice seraphin',
    action: 'a regardé votre profil',
    time: 'le 6 juin',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    isNew: false,
  },
  {
    username: 'Best ui design',
    action: 'a regardé votre profil',
    time: 'le 5 juin',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    isNew: false,
  },
]);
const totalNewNotifications = computed(() => {
  return todayNotifications.value.filter(n => n.isNew).length;
});
</script>

<style scoped>
.app {
  width: 100%;
  margin: 6.6em 0;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.app-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 20px 0;
  text-align: left;
}
</style>
