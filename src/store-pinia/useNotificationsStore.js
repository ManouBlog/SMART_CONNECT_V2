import { defineStore } from 'pinia'
import { ref} from 'vue'
import { useLoadingSpinner } from './LoadingSpinner/useLoadingSpinner'// si tu l’as déjà
import instance from '../api/api'

export const useNotificationsStore = defineStore('notifications', () => {
  // 🧠 States
  const todayNotifications = ref([])
  const yesterdayNotifications = ref([])
  const unreadNotifications = ref([])
  const isNotifications = ref([]);
  const Loading = useLoadingSpinner()

  // 🚀 Actions
  async function getListNotification() {
    Loading.launchLoading(true)
    try {
      const response = await instance.get('Notifications_student')
      // console.log("getListNotification",response)
      const responseNotifications = response.data?.data;
      yesterdayNotifications.value  = responseNotifications?.yesterday;
      todayNotifications.value = responseNotifications?.today;

    } catch (error) {
      console.error('Erreur lors du chargement des notifications :', error)
    } finally {
      Loading.launchLoading(false)
    }
  }

  return {
    todayNotifications,
    yesterdayNotifications,
    getListNotification,
    unreadNotifications,
    isNotifications
  }
})
