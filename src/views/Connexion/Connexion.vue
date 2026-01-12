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
    
    this.texte2 = await this.handleTranslate("Trouvez un emploi aujourd'hui");
    
    this.texte4 = await this.handleTranslate("CONNEXION");
    this.texte5 = await this.handleTranslate("INSCRIPTION");
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    v-model:open="isModal"
     width="100%"
      wrap-class-name="full-modal"
    @cancel="()=>this.changeValueIsModal()"
    @ok="()=>this.changeValueIsModal()"
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
:deep(.full-modal .ant-modal) {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}

:deep(.full-modal .ant-modal-content) {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

:deep(.full-modal .ant-modal-body) {
  flex: 1;
}
:deep(.fullscreen-modal .ant-modal) {
  max-width: 100vw;
  height: 90vh;
  margin: 0;
}

:deep(.fullscreen-modal .ant-modal-content) {
  height: 90vh;
  border-radius: 0;
  display: flex;
  flex-direction: column;
}

:deep(.fullscreen-modal .ant-modal-body) {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
</style>
