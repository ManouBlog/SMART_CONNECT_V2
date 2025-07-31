<script>
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useEntreprisesStore } from "../../../../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "MonPlanAbonnement",
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
      texte27:"",
    };
  },
  computed: { ...mapState(useEntreprisesStore, ["list_abonnement","planAbonnement"]) },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useEntreprisesStore, ["get_all_abonnement"]),
    handleNouvelAbonnement() {
      this.$router.push({ name: "abonnements" });
    },
  },
  async mounted() {
     await this.get_all_abonnement();
    this.texte = await this.handleTranslate('année');
    this.texte1 = await this.handleTranslate('an');
    this.texte2 = await this.handleTranslate('Aucun abonnement');
    this.texte3 = await this.handleTranslate('Souscrire à un abonnement');
  },
};
</script>
<template>
  <div class="conteneur_tableau_de_bord" v-if="planAbonnement">
    <a-card :title="planAbonnement.libelle" :bordered="false" style="width: 400px">
      <p class="text-start">{{ planAbonnement.periode }} {{texte}}</p>
      <div class="px-5" v-html="planAbonnement.description"></div>
      <hr />
      <div class="d-flex align-items-center gap-5 justify-content-center main-color">
        <h1 class="text-start" style="font-size: 4em">{{ planAbonnement.prix }}F</h1>
        <span class="mx-2">/</span>
        <span style="font-size: 2em">{{texte1}}</span>
      </div>
      <div>
        <p style="color:gray">Fin de l'abonnement:</p>
        <span>{{planAbonnement.echeance}}</span>
      </div>
    </a-card>
  </div>
  <div v-else class="p-5">
    <h5 class="py-5">{{texte2}}</h5>
    <div class="d-flex justify-content-center p-5">
      <button class="btn bg-warning" @click="handleNouvelAbonnement">
        {{texte3}}
      </button>
    </div>
  </div>
</template>
