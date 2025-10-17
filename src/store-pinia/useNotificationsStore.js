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
      const data = response.data?.data || {}

      // Notifications d’hier
      yesterdayNotifications.value = (data.yesterday || []).map(item => ({
        username: item.user?.entreprise?.nom,
        time: new Date(item.created_at).toLocaleDateString('fr',{
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}),
        avatar: item.user?.entreprise?.logo,
        isNew: item.view,
        msg:item.msg
      }))

      // Notifications d’aujourd’hui
      todayNotifications.value = (data.today || []).map(item => ({
        username: item.user?.entreprise?.nom || 'Une entreprise',
        msg:item.msg,
        time: new Date(item.created_at).toLocaleDateString('fr',{
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}),
        avatar: item.user?.entreprise?.logo || null,
        isNew: item.view,
      }))
      isNotifications.value=[    
        ...todayNotifications.value,
      ...yesterdayNotifications.value,]
       unreadNotifications.value = [
      ...todayNotifications.value,
      ...yesterdayNotifications.value,
    ].filter(item => item.isNew === 0)
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
