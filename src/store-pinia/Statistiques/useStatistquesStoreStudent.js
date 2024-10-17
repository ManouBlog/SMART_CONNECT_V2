import { defineStore } from 'pinia'
// import instance from "../../api/api";

export const useStatistquesStoreStudent = defineStore('statistique', {
    state: () => ({
        statistiquesOffresPostule: [],
        statistiquesOffresAttente: [],
        statistiquesOffresAcceptés: [],
        statistiquesOffresAcceptés: [],
    }),
    actions: {
      
    },
  })