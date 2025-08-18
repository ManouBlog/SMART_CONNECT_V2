<script>
import CardFooter from "../components/feature/Footer/CardFooter.vue";
import LogoComponent from "../Shared/Compoments/LogoComponent.vue";
import { mapActions } from "pinia";

import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
export default {
  name: "Footer",
  components: {
    CardFooter,
    LogoComponent,
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
      texte11:"",
      texte12:"",
      texte13:"",
      texte14:"",
      texte15:"",
      texte16:"",
      texte17:"",
      texte18:"",
      user: this.$store.state.user,
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"])

  },
  async created() {
    this.texte = await this.handleTranslate('Accès rapide');
    this.texte1 = await this.handleTranslate(
      "Recherche d'offre"
    );
    this.texte2 = await this.handleTranslate("Abonnements");
    this.texte3 = await this.handleTranslate('Contact');
    this.texte4 = await this.handleTranslate('Contactez-nous');
    this.texte5 = await this.handleTranslate(" Tous droits réservés");
    this.texte6 = await this.handleTranslate("Adresse");


  }
};
</script>

<template>
  <section>
    <div class="container-fluid footer">
      <div class="row conteneur-footer">
        <div class="container main-container-footer">
          <CardFooter  :isWhite="true" :title="texte6" :listLien="['CHU angré,Immeuble Bissié 1er Etage Porte D']" />
          <CardFooter
           :isWhite="true"
            :title="texte"
            :listLien="[
              texte1,
              texte2,
              texte3,
            ]"
          />
          <CardFooter
           :isWhite="true"
            :title="texte4"
            :listLien="[`+225 0707070707`, 'support@smartconnect.com']"
          />
          <LogoComponent />
        </div>
      </div>
    </div>
  </section>
  <section class="py-2 background_main">
    <p class="text-center" style="font-size:0.9em;">mon brobroli ©2025.{{texte5}}</p>
  </section>
</template>
<style scoped>
@import "../Shared/styles/stylesShared.css";
.conteneur-footer {
  background: var(--secondary-color) !important;
  color: var(--third-color) !important;
}
.main-container-footer {
  display: flex;
  justify-content: space-between;
  gap: 2em;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
