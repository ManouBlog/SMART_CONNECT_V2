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
    action: 'Liked your DailyUI',
    time: '045 - Favourites · 2 h ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    preview: 'https://via.placeholder.com/40x40/ff9999/FFFFFF?text=♥',
    isNew: true,
  },
  {
    username: 'Arsian Ali',
    action: 'Liked your DailyUI',
    time: '044 - Food menu · 6 h ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    preview: 'https://via.placeholder.com/40x40/ffcc80/FFFFFF?text=🍔',
    isNew: true,
  },
  {
    username: 'Johnny vino',
    action: 'Mentioned you in a comment',
    time: '8 h ago',
    avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
    preview: 'https://via.placeholder.com/40x40/80deea/FFFFFF?text=💬',
    isNew: true,
  },
]);

const thisWeekNotifications = ref([
  {
    username: 'Brice seraphin',
    action: 'Liked your DailyUI',
    time: '044 - Food menu · 6 June',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    preview: 'https://via.placeholder.com/40x40/ffcc80/FFFFFF?text=🍔',
    isNew: false,
  },
  {
    username: 'Best ui design',
    action: 'Started following Your work',
    time: '5 June',
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
