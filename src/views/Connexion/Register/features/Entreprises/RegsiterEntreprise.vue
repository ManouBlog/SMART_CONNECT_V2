<script>
import Formels from './Formels.vue';
import Informels from './Informels.vue';
export default {
  name: "RegsiterEntreprise",
  components: {
    Formels,
    Informels
  },
  data() {
    return {
   optionsPaper:"Formel",
options : [
  { value: "Formel", label: "Formel" },
  { value: "Informel", label: "Informel" }]
    };
  },
  watch: {
    optionsPaper(newValue) {
      console.log("Selected option:", newValue);
      if(!newValue){
        this.optionsPaper = "Formel";
      }
      console.log("Selected option:", newValue);
    },
  },
  methods: {
    selectOne(value) {
    this.optionsPaper = value;
  },
  },
 
};
</script>
<template>
   <div
  style="display: flex; flex-wrap: wrap; justify-content:center; gap: 10px; margin-top: 0.5em; margin-bottom: 1.5em"
>
 <label v-for="item in options" :key="item.value">
  <input
    type="checkbox"
    :value="item.value"
    :checked="optionsPaper === item.value"
    @change="selectOne(item.value)"
  />
  {{ item.label }}
</label>
</div>

<Formels 
:optionsPaper="optionsPaper"
v-if="optionsPaper === 'Formel'" />
<Informels
:optionsPaper="optionsPaper"
v-else />

</template>
