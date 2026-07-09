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
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      user: this.$store.state.user,
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
  },
  async created() {
    this.texte = await this.handleTranslate("Accès rapide");
    this.texte1 = await this.handleTranslate("Accueil");
    this.texte2 = await this.handleTranslate("Abonnements");
    this.texte3 = await this.handleTranslate("CGU");
    this.texte4 = await this.handleTranslate("Contactez-nous");
    this.texte5 = await this.handleTranslate(" Tous droits réservés");
    this.texte6 = await this.handleTranslate("Adresse");
  },
};
</script>

<template>
  <section>
    <div class="container-fluid footer">
      <div class="row conteneur-footer">
        <div class="container main-container-footer">
           <LogoComponent />
          <CardFooter
            :isLinkObject="true"
            :isWhite="true"
            :title="texte"
            :listLien="[
              { text: texte1, to: '/' },
              { text: texte2, to: '/abonnements' },
              { text: texte3, to: '/CGU' },
              { text: texte4, to: '/contact' },
            ]"
          />
          <CardFooter
            :isWhite="true"
            :isIconeWithText="true"
            :title="texte4"
            :listLien="[
              {
                text: '+225 0707969672 / 0546667766',
                icone: 'bi bi-telephone-fill',
              },
              { text: 'contact@monbrobroli.com', icone: 'bi bi-envelope-fill' },
            ]"
          />
          <CardFooter
            :isWhite="true"
            :title="texte6"
            :listLien="['Abidjan , Angré 7e tranche , Pharmacie Tera(Nvelle)']"
          />
         
        </div>
      </div>
    </div>
  </section>
  <section class="py-2 background_main">
    <p class="text-center" style="font-size: 0.9em">MonBrobroli ©2025.{{ texte5 }}</p>
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

@media screen and (max-width: 468px) {
.main-container-footer{
  width: 100%;
  display: flex;
    align-items: baseline;
    flex-direction: column;
}

}
</style>
