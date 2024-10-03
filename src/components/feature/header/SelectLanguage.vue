<script>
export default {
  name: "SelectLanguage",
  data() {
    return {
      data: null,
    };
  },
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
