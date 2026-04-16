<script>
import Formels from './Formels.vue';
import Informels from './Informels.vue';
import instance from "../../../../../api/api";
import { lienPhoto } from '../../../../../api/api';
export default {
  name: "RegsiterEntreprise",
  components: {
    Formels,
    Informels
  },
  data() {
    return {
   optionsPaper:"Formel",
   selectedCountry:"Côte d’Ivoire",
   isLoading: true,
   lienPhoto:lienPhoto,
    countries: [],
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
    async listerCountries() {
    try {
      const response = await instance.get("countries");
      this.countries = response.data;
      console.log("COUNTRIES", this.countries);
    } catch (error) {
      console.log(error);
    }finally {
      this.isLoading = false;
    }
  },
    selectOne(value) {
    this.optionsPaper = value;
  },
  isDisabled(country) {
    return country.available !== 1
  },

  handleCountryClick(country) {
    if (this.isDisabled(country)) return
    this.selectCountry(country)
  },

  getCountryStyle(country) {
  // const isSelected = this.selectedCountry === country.label
  const isDisabled = this.isDisabled(country)

  return {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    borderRadius: '6px',

    // color: isSelected ? '#fff' : '#333',
    // fontWeight: isSelected ? 'bold' : 'normal',
    // backgroundColor: isSelected ? '#FFA500' : '#f5f5f5',
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer'
  }
}
  },
  created() {
    this.listerCountries();
  }
 
};
</script>
<template>
  <div
  style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; margin-top: 1em; margin-bottom: 1.5em"
>
  <div
    v-for="country in countries"
    :key="country.id"
    @click="handleCountryClick(country)"
    :style="{
      cursor: 'pointer',
      borderRadius: '12px',
      padding: '10px',
      width: '35px',
      height:'35px',
      textAlign: 'center',
      transition: '0.2s',
      ...getCountryStyle(country)
    }"
  >
    <!-- Image -->
    <img
      v-if="country.fileCountry"
      :src="lienPhoto + country.fileCountry"
      alt="country"
      style="width: 35px; height: 35px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;"
    />
  </div>
</div>
  <!-- <div
    style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 1em; margin-bottom: 1.5em"
  >
  <button
   v-for="country in countries"
  :key="country.code"
  :style="getCountryStyle(country)"
  @click="handleCountryClick(country)">
  <span>{{ country.label }}</span>
  </button>

  </div> -->
<section v-if="!isLoading">
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
</section>
<section v-else style="margin-top: 2em;">
 <p style="text-align: center;" class="shimmer-text">Chargement...</p> 
</section>


</template>
