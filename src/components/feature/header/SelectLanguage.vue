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
      // console.log(e.target.value.toLowerCase())
      this.changeLanguageForTranslate(e.target.value.toLowerCase())
     
      // this.$i18n.locale = e.target.value.toLowerCase();
      // // console.log("this.$i18n.locale",this.$i18n.locale);
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
