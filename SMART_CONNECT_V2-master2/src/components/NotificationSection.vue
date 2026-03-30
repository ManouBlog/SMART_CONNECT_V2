<template>
  <div class="notification-list">
    <h4 style='font-weight:bold'>{{title}}</h4>
    <NotificationItem
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
    />
  </div>
</template>

<script setup>
import NotificationItem from './NotificationItem.vue';
import {defineProps} from 'vue'

defineProps({
  notifications: {
    type: Array,
    required: true,
  },
  title:{
    type:String,
  }
});
</script>

<style scoped>
.notification-list {
  display: flex;
  flex-direction: column;
}
</style>
