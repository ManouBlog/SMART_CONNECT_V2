import { defineStore } from 'pinia'
import { ref } from 'vue'
import translate from "translate";

translate.engine = "deepl";
translate.key = process.env.VUE_APP_DEELP_LOCAL;

export const useTranslateStore =defineStore('translate',()=>{
    const defaultLocale = ref(localStorage.getItem("translate"))
    
   const handleTranslate = async (texte)=>{
        return await translate(texte,{from:"fr",to:defaultLocale.value})
      };
      const changeLanguageForTranslate = (payload)=>{
        // console.log("changeLanguageForTranslate",payload)
        defaultLocale.value = payload
        localStorage.setItem("translate",payload)
        window.location.reload(true);
      }
    //  console.log("defaultLocale.value",defaultLocale)
    return{
        handleTranslate,
        changeLanguageForTranslate,
        defaultLocale
    }
})