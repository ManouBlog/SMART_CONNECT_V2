<template>
  <div class="app">
    <h2 class="app-title">Vous avez {{ todayNotifications.length }} Notifications aujourdhui</h2>
    <NotificationSection
    v-if="todayNotifications.length"
      title="Aujourd’hui"
      :notifications="todayNotifications"
    />
    <NotificationSection
    v-if="thisPassedNotifications.length"
      title="Passées"
      :notifications="thisPassedNotifications"
    />
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import instance from '../api/api';
import NotificationSection from '../components/NotificationSection.vue';
import { useLoadingSpinner } from '../store-pinia/LoadingSpinner/useLoadingSpinner';

const todayNotifications = ref([]);
const Loading = useLoadingSpinner()

const thisPassedNotifications = ref([]);

async function getListNotification(){
    Loading.launchLoading(true);
try{
const response = await instance.get("Notifications_student");
console.log('getListNotification',response.data)
thisPassedNotifications.value = response.data.data.yesterday.map(item=>{
    return {
    username: item.user.entreprise.nom,
    time: new Date(item.created_at).toLocaleDateString('fr'),
    avatar: item?.user?.entreprise?.logo,
    isNew: item.view,
  }
}) 
todayNotifications.value = response.data.data.today.map(item=>{
    return {
    username: item.user.entreprise.nom,
    time: new Date(item.created_at).toLocaleDateString('fr'),
    avatar: item?.user?.entreprise?.logo,
    isNew: item.view,
  }
}) 
}catch(error){
    console.log('error')
}finally{
    Loading.launchLoading(false);
}
}
onMounted(() => {
    getListNotification()
})
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
@media (max-width: 500px) {
 .app {
  margin: 1.6em 0;
}
}
</style>
