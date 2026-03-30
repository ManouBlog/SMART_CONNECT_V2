<script setup>
import { defineProps } from "vue";

defineProps({
  titleListe: String,
  array_liste: Array,
});
</script>
<template>
  <div class="cadre">
    <h2 v-if="titleListe">{{ titleListe }}</h2>
    <ul>
      <li
       v-for="(item, index) in array_liste"
       :style="!item.isVisible ? 'display:none':'display:block'"
       :key="index">
        <router-link v-if="item.link" :to="{ name: item.name_link }">{{
          item.libelle
        }}</router-link>
        <div v-else-if="item.img" class="conteneur-image-logo">
            <img :src="item.img" :alt="item.alt_img" >
        </div>
        <!-- <img v-else-if="item.img" :src="item.img" :alt="item.alt_img" class="w-50 h-25"> -->
        <span v-else>{{ item.libelle }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.cadre {
  width: 280px;
  text-align: start;
}
ul {
  text-align: start;
  padding: 0;
}
ul li{
  list-style-type: none;
  color: black;
}
</style>
