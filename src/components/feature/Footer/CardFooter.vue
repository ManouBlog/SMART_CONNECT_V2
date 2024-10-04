<script>
export default {
  name: "CardFooter",

  props: {
    listLien: {
      type: Array,
    },
    title: String,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="conteneur_card_footer">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="(item, index) in listLien" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
<style scoped>
.conteneur_card_footer{
    padding:.5em 2em;
}
h3 {
  text-transform: uppercase;
  text-align: left;
}
ul li {
  list-style-type: none;
  padding: 1em 0;
}
</style>
