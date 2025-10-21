<script>
import LoginView from "./login/LoginView.vue";
import RegisterView from "./Register/RegisterView.vue";
import { mapActions, mapState } from "pinia";
import { useRegisterStore } from "../../store-pinia/register/useRegisterStore";
import { useTranslateStore } from "../../store-pinia/Translate/useTranslateStore";
export default {
  name: "Connexion",
  components: {
    LoginView,
    RegisterView,
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
      tabsActive: 1,
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["isModal"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    seeTabsChange(value) {
      this.tabsActive = value;
    },
  },
  async created() {
    this.texte = await this.handleTranslate("Saisissez vos identifiants");
    // this.texte1 = await this.handleTranslate(
    //   "Nous vous aiderons à créer un compte si vous n'êtes pas encore inscrit"
    // );
    this.texte2 = await this.handleTranslate("Trouvez un emploi aujourd'hui");
    // this.texte3 = await this.handleTranslate(
    //   "Nous vous aiderons à créer un compte si vous n'êtes pas encore inscrit"
    // );
    this.texte4 = await this.handleTranslate("CONNEXION");
    this.texte5 = await this.handleTranslate("INSCRIPTION");
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    v-model:open="isModal"
    @cancel="changeValueIsModal"
    @ok="changeValueIsModal"
  >
    <div class="mycontent">
      <div v-if="Number(tabsActive) === 1">
        <h2 class="text-center" style="color: orange">{{ texte }}</h2>
        <!-- <span>{{ texte1 }}</span> -->
      </div>
      <div v-if="Number(tabsActive) === 2">
        <h2 class="text-center" style="color: orange">{{ texte2 }}</h2>
        <span>{{ texte3 }}</span>
      </div>
      <a-tabs centered :size="'default'" @change="seeTabsChange">
        <a-tab-pane key="1" :tab="texte4">
          <LoginView />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="texte5">
          <RegisterView />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>
<style scoped>
.mycontent {
  max-height: 80vh; /* 60% de la hauteur de l'écran (viewport) */
  overflow-y: auto; /* Ajoute une barre de défilement verticale SI nécessaire */
}
</style>
