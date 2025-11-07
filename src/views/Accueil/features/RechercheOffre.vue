<script>
import Buttons from "../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { mapActions } from "pinia";
export default {
  name: "RechercheOffre",
  components: { Buttons },
  data() {
    return {
      texte0: "",
      texte2: "",
      texte3: "",
      texte1: "",
      elmentsOfBtn: [],
      user: this.$store.state.user,
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    goToRoute(payload) {
      if (this.user) {
        this.$router.push(payload);
      }
    },
  },
  async created() {
    this.texte0 = await this.handleTranslate("Recherchez une offre");
    this.elmentsOfBtn = [
      {
        name_btn: await this.handleTranslate("En savoir plus"),
        color_btn: "primary",
      },
    ];
  },
};
</script>
<template>
  <div class="header_banner">
    <div class="ecriteau_image">
      <img
        src="../../../assets/search_offre.png"
        class="position-absolute image"
        alt=""
      />
    </div>
    <div class="ecriteau">
      <h1 class="fw-bold" style="color: orange">{{ texte0 }}</h1>
      <h3 class="my-5 text-center">
        Vous avez un <strong style="color:orange;">Besoin,</strong>
         Nous avons la <strong style="color:orange;"> Solution.</strong>
      </h3>
      <Buttons
        @created="goToRoute('/jobs')"
        v-if="this.user && this.user?.user?.statut?.statut === 'etudiant'"
        :elmentsOfBtn="elmentsOfBtn"
        :shapeBtn="'round'"
      />
    </div>
  </div>
</template>
<style scoped>
.image {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
}
.ecriteau_image {
  position: relative;
  flex: 2 2 200px;
}
.ecriteau {
  flex: 3 3 200px;
  text-align: center;
}
.ecriteau > h1 {
  font-weight: bold;
  font-size: 4em;
}
.header_banner {
  width: 100%;
  height: auto;
  padding: 0 0 1em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
@media screen and (max-width: 500px) {
.ecriteau > h1 {
  margin: 0.5em 0;
}
.ecriteau_image {
  margin:0.5em 0;
  text-align: center;
}

.ecriteau_image img {
  width:80%;
}
}
</style>
