<script>
import {useTranslateStore} from "../../../store-pinia/Translate/useTranslateStore"
import {mapActions, mapState} from "pinia"
export default {
  name: "SelectLanguage",
  data() {
    return {
      data: null,
    };
  },
  computed:{
   ...mapState(useTranslateStore,["defaultLocale"])
  },
  methods:{
    selectLanguageForWeb(e){
     
      this.changeLanguageForTranslate(e.target.value.toLowerCase())
   
    },
    ...mapActions(useTranslateStore,["changeLanguageForTranslate"])
  }
};
</script>
<template>
  <select
    name="selector-langue"
    id="selector-langue"
    v-model="defaultLocale"
    @change="selectLanguageForWeb"
  >
    <option value="fr">FR</option>
    <option value="en">EN</option>
  </select>
</template>
