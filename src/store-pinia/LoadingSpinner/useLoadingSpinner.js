import { defineStore } from 'pinia'
import {ref} from 'vue';

export const useLoadingSpinner = defineStore('loadingSpinner',()=>{
    const isLoadingVisible = ref(false);
     const launchLoading = (payload)=>{
        isLoadingVisible.value = payload
     }
    return{
        launchLoading,
        isLoadingVisible
    }
})