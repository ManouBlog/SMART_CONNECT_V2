<script>
export default {
  name: "CardFooter",

  props: {
    listLien: {
      type: Array,
    },
    title: String,
    icone_name: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="conteneur_card_footer">
    <h3 class="fw-bold">
      <em
        v-if="typeof icone_name === 'string'"
        :class="icone_name"
        class="px-2 icone_color"
      ></em
      >{{ title }}
    </h3>
    <ul>
      <li v-for="(item, index) in listLien" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
<style scoped>
@import "../../../Shared/styles/stylesShared.css";
.icone_color {
  color: var(--main-color) !important;
}
.conteneur_card_footer {
  padding: 0.5em;
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
