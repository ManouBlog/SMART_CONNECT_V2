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
    nbre: String,
    myStyle: String,
    isPayement:Boolean,
    suffix:String,
    tooltip: String,
    decimals:Number
  },
  data() {
    return {};
  },
  methods: {

}

};
</script>
<template>
  <section :class="myStyle" 
   v-tooltip.top="{ value: !isPayement ? tooltip:''}"
  >
    <div style="text-align:center;" v-if="!isPayement">
      <vue3-autocounter
        class="counter"
        ref="counter"
        :startAmount="0"
        :endAmount="nbre"
        :duration="1"
        :autoinit="true"
        :suffix="suffix"
        :decimals="decimals"
      />
    </div>
    <div class="my-3" v-if="!isPayement">
      <em :class="icone_name" class="mx-3"></em>
      <span style="font-weight:bold;">{{ texte }} </span>
    </div>
    <div  v-if="isPayement">
      <h1 style="color:orange;font-size:3.9em;">100%</h1>
      <span style="font-weight:bold;">{{ texte }}</span>
    </div>
  </section>
</template>
<style scoped>
@import "../styles/stylesShared.css";
.counter {
  font-size: 4em;
  color: var(--main-color) !important;
}


</style>
