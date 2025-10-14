<template>
  <div class="notification-item">
    <div class="notification-avatar">
      <img :src="lienPhoto+notification.avatar" alt="Avatar" />
    </div>
    <div class="notification-content">
      <div class="notification-header">
        <span class="notification-username">{{ notification.username }}</span>
        <span class="notification-action">a regardé votre profil</span>
        <span class="notification-time">{{ notification.time }}</span>
      </div>
    </div>
    <div class="notification-indicator" v-if="notification.isNew"></div>
  </div>
</template>

<script setup>
import { lienPhoto } from '../api/api';
import {defineProps} from 'vue'
defineProps({
  notification: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 8px;
  position: relative;
  background-color: #ffffff;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.265);
}

.notification-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.notification-content {
  flex: 1;
  margin-left: 12px;
}

.notification-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 14px;
}

.notification-username {
  font-weight: 600;
  color: #1a1a1a;
  margin-right: 4px;
}

.notification-action {
  color: #666;
  margin-right: 4px;
}

.notification-time {
  color: #999;
  font-size: 12px;
}

.notification-indicator {
  width: 8px;
  height: 8px;
  background-color: #ff4757;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  left: 8px;
}
</style>
