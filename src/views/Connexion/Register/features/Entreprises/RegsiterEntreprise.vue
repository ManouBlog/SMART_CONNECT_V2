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
   selectedCountry:"CI",
    countries: [
        { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
        { code: "FR", name: "France",         flag: "🇫🇷" },
        { code: "US", name: "États‑Unis",     flag: "🇺🇸" },
        { code: "GB", name: "Royaume‑Uni",    flag: "🇬🇧" },
        { code: "DE", name: "Allemagne",      flag: "🇩🇪" },
        { code: "SN", name: "Sénégal",        flag: "🇸🇳" },
        { code: "ML", name: "Mali",           flag: "🇲🇱" },
        { code: "BF", name: "Burkina Faso",   flag: "🇧🇫" },
      ],
options : [
   { value: "Informel", label: "Informel" },
  { value: "Formel", label: "Formel" }
 
]
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
   selectCountry(country) {
      this.selectedCountry = country.code;
    }
  },
 
};
</script>
<template>
  <div
    style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 1em; margin-bottom: 1.5em"
  >
    <div
      v-for="country in countries"
      :key="country.code"
     :style="{
        display: 'flex',
        alignItems: 'center',
        color: selectedCountry === country.code ? '#fff' : '#333',
        fontWeight: selectedCountry === country.code ? 'bold': 'normal',
        gap: '6px',
        padding: '4px 8px',
        borderRadius: '6px',
        backgroundColor: selectedCountry === country.code ? '#FFA500' : '#f5f5f5',
        cursor: 'pointer'
      }"
      @click="selectCountry(country)"
    >
      <!-- <span style="font-size: 1.2em">{{ country.flag }}</span> -->
      <span>{{ country.name }}</span>
    </div>
  </div>
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
