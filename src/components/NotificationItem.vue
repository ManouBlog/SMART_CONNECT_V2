<template>
  <div class="notification-item">
    <div class="notification-avatar">
      <img
      v-if="notification.sender_id"
        :class="notification.user.photos[0].path ? null : 'flou_image'"
        :src="lienPhoto + notification.user.photos[0].path"
        alt="Avatar"
      />
      <img
      v-if="!notification.sender_id"
      style="background:teal;"
      src="/broboli_footer_1.png"
      alt="Avatar"
      />
    </div>
    <div class="notification-content">
      <div class="notification-header">
        <span class="notification-username">{{
          notification ? notification?.user?.nom : 'MonBrobroli'
        }}</span>
         <span class="notification-objet" v-if="notification.objet">
    {{ notification.objet }}
  </span>

        <span class="notification-action">{{ notification.msg }}</span>
        <span class="notification-time">{{new Date(notification.created_at).toLocaleDateString('fr',{
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { lienPhoto } from "../api/api";
import { defineProps } from "vue";
defineProps({
  notification: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.notification-objet {
  font-weight: bold;
  color: orange;
  margin-right: 4px;
}
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
  width: 50px;
  height: 50px;
  border-radius: 10%;
  object-fit: contain;
}
.flou_image {
  filter: blur(3px);
}

.notification-content {
  flex: 1;
  margin-left: 12px;
}

.notification-header {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  flex-direction: column;
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
  color: #8e8e8e;
  font-size: 12px;
  font-weight: bold;
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
