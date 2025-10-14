import { defineStore } from 'pinia'
import { ref} from 'vue'
import { useLoadingSpinner } from './LoadingSpinner/useLoadingSpinner'// si tu l’as déjà
import instance from '../api/api'

export const useNotificationsStore = defineStore('notifications', () => {
  // 🧠 States
  const todayNotifications = ref([])
  const yesterdayNotifications = ref([])
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
        time: new Date(item.created_at).toLocaleDateString('fr'),
        avatar: item.user?.entreprise?.logo,
        isNew: item.view,
      }))

      // Notifications d’aujourd’hui
      todayNotifications.value = (data.today || []).map(item => ({
        username: item.user?.entreprise?.nom || 'Inconnu',
        time: new Date(item.created_at).toLocaleDateString('fr'),
        avatar: item.user?.entreprise?.logo || null,
        isNew: item.view,
      }))
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
  }
})
