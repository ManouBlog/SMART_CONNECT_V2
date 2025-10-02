<script>
import Vue3autocounter from "vue3-autocounter";

export default {
  name: "CardPerformance",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
  props: {
    icone_name: String,
    texte: String,
    nbre: Number,
    myStyle: String,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <section :class="myStyle">
    <div style="text-align:center;">
      <vue3-autocounter
        class="counter"
        ref="counter"
        :startAmount="0"
        :endAmount="nbre"
        :duration="1"
        :autoinit="true"
      />
    </div>
    <div class="my-3">
      <em :class="icone_name" class="mx-3"></em>
      <span>{{ texte }} </span>
    </div>
  </section>
</template>
<style scoped>
@import "../styles/stylesShared.css";
.counter {
  font-size: 5em;
  color: var(--main-color) !important;
}
</style>
