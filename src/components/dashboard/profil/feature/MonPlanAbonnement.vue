<script>
import { mapActions, mapState } from "pinia";
import { useEntreprisesStore } from "../../../../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "MonPlanAbonnement",
  data() {
    return {
      planAbonnement: null,
    };
  },
  computed: { ...mapState(useEntreprisesStore, ["list_abonnement"]) },
  methods: {
    ...mapActions(useEntreprisesStore, ["get_all_abonnement"]),
    handlePlanAbonnement() {
      this.list_abonnement.forEach((item) => {
        if (item.statut === "ACCEPTED") {
          this.planAbonnement = item.abonement;
        }
      });
    },
    handleNouvelAbonnement() {
      this.$router.push({ name: "abonnements" });
    },
  },
  created() {
    console.log("abaon", this.list_abonnement);
    this.get_all_abonnement();
    this.handlePlanAbonnement();
  },
};
</script>
<template>
  <div class="conteneur_tableau_de_bord" v-if="planAbonnement">
    <a-card :title="planAbonnement.libelle" :bordered="false" style="width: 300px">
      <p class="text-start">{{ planAbonnement.periode }} année</p>
      <div class="px-5" v-html="planAbonnement.description"></div>
      <hr />
      <div class="d-flex align-items-center gap-5 justify-content-center main-color">
        <h1 class="text-start" style="font-size: 4em">{{ planAbonnement.prix }}F</h1>
        <span class="mx-2">/</span>
        <span style="font-size: 2em">an</span>
      </div>
    </a-card>
  </div>
  <div v-else class="p-5">
    <h5 class="py-5">Aucun abonnement</h5>
    <div class="d-flex justify-content-center p-5">
      <button class="btn bg-warning" @click="handleNouvelAbonnement">
        Souscrire à un abonnement
      </button>
    </div>
  </div>
</template>
