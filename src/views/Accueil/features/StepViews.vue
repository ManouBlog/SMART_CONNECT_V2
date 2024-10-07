<script>
import { mapActions } from "pinia";
import { useRegisterStore } from "../../../store-pinia/register/useRegisterStore";
import CardView from "../../../Shared/Compoments/CardView.vue";
export default {
  name: "StepViews",
  components: {
    CardView,
  },
  data() {
    return {
      dataCard: [
        {
          id: 1,
          title: "Créer un compte",
          text_one: "Remplissez le formulaire",
        },
        {
          id: 2,
          title: "Choisir une option",
          text_one: "Etudiant : Obtenir un emploi à temps partiel",
          text_two: "Employeur : Besoin d'employés à temps partiel.",
        },
        {
          id: 3,
          title: "Vivez une expérience unique",
          text_one: "Etudiant : Choisir le meilleur profil.",
          text_two: "Employeur :Démarrer une nouvelle expérience Pro..",
        },
      ],
    };
  },
  methods: {
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    goToRoute(payload) {
      this.$router.push(payload);
    },
  },
};
</script>
<template>
  <div class="container main-container-home">
    <h1 class="step_suivre">Etapes à suivreEtapes à suivre</h1>
    <h5 class="text-secondary my-3">
      Les instructions à suivre pour contacter du personnel ou postuler à une offre.
    </h5>
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
