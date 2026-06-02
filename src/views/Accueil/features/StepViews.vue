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
      texte0: "",
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
      dataCard: [],
      cardPerfVisible: false,
      observer: null,
    };
  },
  methods: {
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    goToRoute(payload) {
      this.$router.push(payload);
    },
    initIntersectionObserver() {
      const cardPerfElement = document.getElementById("divCard");

      if (cardPerfElement) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.cardPerfVisible = entry.isIntersecting;
            });
          },
          {
            threshold: 0.1,
          }
        );

        this.observer.observe(cardPerfElement);
      }
    },
  },
  async mounted() {
    this.initIntersectionObserver();
    this.texte0 = await this.handleTranslate("Etapes à suivre");
    this.texte2 = await this.handleTranslate(
      "Les instructions à suivre pour contacter des talents ou postuler à une offre."
    );
    this.dataCard = [
      {
        id: 1,
        title: await this.handleTranslate("Je crée mon profil"),
        text_colorie1: await this.handleTranslate("En 5 minutes.Gratuitement.Depuis mon App mobile ou web."),
        class: "slide-from-left",
        footer_btn: true,
      },
      {
        id: 2,
        title: await this.handleTranslate("Je trouve ce que je cherche "),
        text_colorie1:'Talents / Artisans',
        text_colorie2:'Entreprise',
        text_one: await this.handleTranslate(
          " : Les missions disponibles m'attendent. Je fais valoir mes compétences, partout."
        ),
        text_two: await this.handleTranslate(
          ": J'exprime mon besoin, mon budget, ma deadline. Des profils vérifiés sont disponibles immédiatement pour moi."
        ),
        class: "fade-in",
        footer_btn: false,
      },
      {
        id: 3,
        title: await this.handleTranslate("C'est fait. Je suis payé."),
         text_colorie1:'Talents / Artisans',
        text_colorie2:'Entreprise',
        text_one: await this.handleTranslate(
          " : l'argent arrive sur mon téléphone dès validation de la mission."
        ),
        text_two: await this.handleTranslate(
          " : Je paie uniquement quand c'est fait."
        ),
        class: "slide-from-right",
        footer_btn: false,
      },
    ];
  },
  unmounted() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>
<template>
  <div class="container main-container-home">
    <h1 class="step_suivre">{{ texte0 }}</h1>
    <h3 class="text-secondary my-3" style="text-align: center; padding: 1em">
      {{ texte2 }}
    </h3>
    <div class="conteneur-card" id="divCard">
      <CardView
        v-for="(item, index) in dataCard"
        :key="index"
        :item="item"
        :footer_btn="item.footer_btn"
        :cardPerfVisible="cardPerfVisible"
      >
      <div style="position: absolute; bottom: 1em; width: 90%;">
     <a-button type="primary" 
     style="width: 93% !important;"
        @click.prevent="changeValueIsModal"
        >
          Créer
        </a-button>
      </div>
        
      </CardView>
    </div>
  </div>
</template>
<style scoped>
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-card .ant-card-body) {
  padding: 10px;
}
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
  color: orange;
}
.main-container-home {
  background: transparent;
}

@media screen and (max-width: 500px) {
  .step_suivre {
    margin: 0.5em 0;
    font-size: 2.5em;
  }
}
</style>
