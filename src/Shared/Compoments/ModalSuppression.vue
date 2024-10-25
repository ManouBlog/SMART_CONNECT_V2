<script>
import { mapState, mapActions } from "pinia";

import { useTranslateStore } from "../../store-pinia/Translate/useTranslateStore";
import { useModalSuppressionStore } from "../../store-pinia/ModalSuppession/useModalSuppressionStore";
export default {
  name: "ModalSuppression",
  emits: ["handleDeleteItem"],
  data() {
    return {texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",};
  },
  computed: {
    ...mapState(useModalSuppressionStore, ["showModalSuppression"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useModalSuppressionStore, ["changeValueForShowModalSuppression"]),
  },
  async created() {
    this.texte = await this.handleTranslate('Voulez-vous vraiment supprimer ?');
    this.texte1 = await this.handleTranslate("Supprimer");
    this.texte2 = await this.handleTranslate('Annuler');

  },
};
</script>
<template>
  <a-modal
    :footer="null"
    style="padding: 2em"
    v-model:open="showModalSuppression"
    @cancel="changeValueForShowModalSuppression"
    @ok="changeValueForShowModalSuppression"
  >
    <h4>{{texte}}</h4>
    <div class="p-5 d-flex justify-content-center g-3 my-3">
      <button
        class="btn rounded-5 bg-warning mx-3"
        @click="$emit('handleDeleteItem', '2')"
      >
        {{texte1}}
      </button>
      <button
        class="btn rounded-5 bg-danger mx-3"
        @click="changeValueForShowModalSuppression"
      >
        {{texte2}}
      </button>
    </div>
  </a-modal>
</template>
