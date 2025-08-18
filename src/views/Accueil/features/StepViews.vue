<script>
import { mapActions } from "pinia";
import { useRegisterStore } from "../../../store-pinia/register/useRegisterStore";
import CardView from "../../../Shared/Compoments/CardView.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
// import i18n from "../../../plugins/i18n";
// const { t } = i18n.global;
export default {
  name: "StepViews",
  components: {
    CardView,
  },
  data() {
    return {
      texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      texte19: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      dataCard:[],
    };
  },
  methods: {
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    goToRoute(payload) {
      this.$router.push(payload);
    },
  },
  async created() {
    this.texte = await this.handleTranslate("Etapes à suivre");
    this.texte2 = await this.handleTranslate(
      "Les instructions à suivre pour contacter du personnel ou postuler à une offre."
    );
    this.dataCard = [
        {
          id: 1,
          title: await this.handleTranslate("Créer un compte"),
          text_one: await this.handleTranslate("Remplissez le formulaire"),
        },
        {
          id: 2,
          title: await this.handleTranslate("Choisir une option"),
          text_one: await this.handleTranslate("Etudiant : Obtenir un emploi à temps partiel"),
          text_two: await this.handleTranslate("Employeur : Besoin d'employés à temps partiel."),
        },
        {
          id: 3,
          title: await this.handleTranslate("Vivez une expérience unique"),
          text_one: await this.handleTranslate("Etudiant : Choisir le meilleur profil."),
          text_two: await this.handleTranslate("Employeur :Démarrer une nouvelle expérience Pro.."),
        },
      ]
  },
};
</script>
<template>
  <div class="container main-container-home">
    <h1 class="step_suivre">{{ texte }}</h1>
    <h5 class="text-secondary my-3">{{ texte2 }}</h5>
    <div class="conteneur-card">
      <CardView v-for="(item, index) in dataCard" :key="index" :item="item" />
    </div>
  </div>
</template>
<style scoped>
.conteneur-card {
  display: flex;
  justify-items: center;
  justify-content: center;
  gap: 3em;
  flex-wrap: wrap;
}
.step_suivre {
  font-size: 3.5em;
  margin: 0;
  font-weight: bold;
  text-align: center;
}
.main-container-home {
  background: transparent;
}
</style>
