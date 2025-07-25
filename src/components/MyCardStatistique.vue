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
  <div class="card p-2" style="width: 200px; position: relative">
    <h3 class="text-start d-flex" style="justify-content: space-around">
      {{ title }}
      <i :class="`bi ${icon_libelle}`"></i>
    </h3>
    <h1 v-if="numberStatistic">{{ numberStatistic }}</h1>
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
