import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useChangeLanguageStore =defineStore('language',()=>{
    const defaultLocale = ref('fr')

     const changeLocaleDefaultLanguage = (payload)=>{
        console.log("changeLocaleDefaultLanguage",payload)
        defaultLocale.value = payload
       
     }
     console.log("defaultLocale.value",defaultLocale)
    return{
        defaultLocale,
        changeLocaleDefaultLanguage
    }
})