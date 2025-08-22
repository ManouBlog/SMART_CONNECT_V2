<script>
import { lienPhoto } from "../../../api/api";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { mapActions,mapState } from "pinia";
import { usePartenaireStore } from "../../../store-pinia/partenaire/usePartenaireStore";
// import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
export default {
  name: "Partenaires",
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      texte: "", texte2: "", texte3: "", texte1: "" ,
      lienPhoto:lienPhoto,
      slides: [
        // {
        //   id: 1,
        //   photo: require("../../../assets/logo-jumia-mall-2114415253.jpg"),
        // },
        // {
        //   id: 2,
        //   photo: require("../../../assets/KFC-Logo-362893771.jpg"),
        // },
        // {
        //   id: 3,
        //   photo: require("../../../assets/41715b307038cad1018232d2f01f326b-1154425032.jpg"),
        // },
        // {
        //   id: 4,
        //   photo: require("../../../assets/Radisson_SAS-3112560756.jpg"),
        // },
        // {
        //   id: 5,
        //   photo: require("../../../assets/deliv.png"),
        // },
      ],
    };
  },
  computed: {
    ...mapState(usePartenaireStore, ["partenaires"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
  },
  async created() {
    this.texte = await this.handleTranslate("Nos Partenaires");
  },
};
</script>
<template>
  <div class="container">
    <h1 class="fw-bold" style="color:orange;" v-if="partenaires.length">{{texte}}</h1>
    <br />
    <vueper-slides
      autoplay
      class="no-shadow"
      :visible-slides="3"
      :slide-ratio="1 / 5"
      :dragging-distance="170"
      :arrows="false"
      :bullets="false"
      :duration="1000"
    >
      <vueper-slide 
      v-for="(slide, i) in partenaires" 
      :key="i" 
      :image="lienPhoto+slide.partenaire" 
      />
      <template #pause>
        <em class="icon pause_circle_outline"></em>
      </template>
    </vueper-slides>
  </div>
</template>
