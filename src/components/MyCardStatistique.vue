<!-- eslint-disable prettier/prettier -->
<script>
export default {
  name: "MyCardStatistique",
  props: {
    title: {
      type: String,
      require: true,
    },
    icon_libelle:{
        type:String,
    },
    numberStatistic:{
      type: Number,
      require: true,
    },
    nameRouter:{
        type: String,
       require: false,
    },
    dataInfo:{
      type:Array,
      require:false,
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      chooseAnOption: "",
    };
  },
};
</script>
<template>
  <div class="card p-2" style="width: 300px; height: 150px; position: relative">
    <h3 class="text-start d-flex gap-3">
      {{ title }}
      <i :class="`bi ${icon_libelle}`"></i>
    </h3>
    <div class="text-start" v-if="numberStatistic">
      <h1>{{ numberStatistic }}</h1>
      <ul v-if="dataInfo.length">
        <li v-for="(item, index) in dataInfo" :key="index">
          {{ item.libelle }} : {{ item.value }}
        </li>
      </ul>
    </div>
    <h5 v-else>Chargement...</h5>
    <p
      v-if="numberStatistic"
      class="text-end"
      style="position: absolute; bottom: -0.8em; right: 0.5em; cursor: pointer"
    >
      <router-link style="padding: 0.2em" :to="{ name: nameRouter }">
        <strong>Voir plus</strong></router-link
      >
    </p>
  </div>
</template>
