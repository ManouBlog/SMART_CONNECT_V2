<script>

export default {
  name: "SelectLanguage",
  data() {
    return {
      data: null,
    };
  },
  methods:{
    selectLanguageForWeb(e){
      console.log(e.target.value.toLowerCase())
      this.$i18n.locale = e.target.value.toLowerCase();
      console.log("this.$i18n.locale",this.$i18n.locale);
    }
  }
};
</script>
<template>
  <select
    name="selector-langue"
    id="selector-langue"
    v-model="this.$store.state.translate"
    @change="selectLanguageForWeb"
  >
    <option value="FR">FR</option>
    <option value="EN">EN</option>
  </select>
</template>
