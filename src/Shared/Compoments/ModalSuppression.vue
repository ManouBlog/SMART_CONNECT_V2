<script>
import { mapState, mapActions } from "pinia";
import { useModalSuppressionStore } from "../../store-pinia/ModalSuppession/useModalSuppressionStore";
export default {
  name: "ModalSuppression",
  emits: ["handleDeleteItem"],
  data() {
    return {};
  },
  computed: {
    ...mapState(useModalSuppressionStore, ["showModalSuppression"]),
  },
  methods: {
    ...mapActions(useModalSuppressionStore, ["changeValueForShowModalSuppression"]),
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
    <h4>Voulez-vous vraiment supprimer ?</h4>
    <div class="p-5 d-flex justify-content-center g-3 my-3">
      <button
        class="btn rounded-5 bg-warning mx-3"
        @click="$emit('handleDeleteItem', '2')"
      >
        Supprimer
      </button>
      <button
        class="btn rounded-5 bg-danger mx-3"
        @click="changeValueForShowModalSuppression"
      >
        Annuler
      </button>
    </div>
  </a-modal>
</template>
