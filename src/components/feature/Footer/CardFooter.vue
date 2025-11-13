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
    isWhite: Boolean,
    isLinkObject: {
      type: Boolean,
      default: false,
    },
    isIconeWithText:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="conteneur_card_footer">
    <h3 class="fw-bold" :style="isWhite ? 'color:white;' : 'color:black;'">
      <em
        v-if="typeof icone_name === 'string'"
        :class="icone_name"
        class="px-2 icone_color"
      ></em
      >{{ title }}
    </h3>
    <ul v-if="!isIconeWithText">
      <li v-for="(item, index) in listLien" :key="index">
        <router-link
          v-if="isLinkObject"
          :to="item.to"
          class="footer-link"
          style="color: white"
          active-class="active"
        >
          {{ item.text }}
        </router-link>
        <span v-else class="footer-link-text">
          {{ item }}
        </span>
      </li>
      
    </ul>
    <ul v-else>
      <li v-for="(item, index) in listLien" :key="index"> 
          <em :class="item.icone"></em> {{ item.text }}
      </li>
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
