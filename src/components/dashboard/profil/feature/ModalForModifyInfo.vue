<script>
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions, mapState } from "pinia";
import InfoForModifyEntreprises from "./viewForModifier/InfoForModifyEntreprises.vue";
export default {
  name: "ModalForModifyInfo",
  components: {
    InfoForModifyEntreprises,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useInfoPersonnel, ["changeValueForToogleModalInfoPersonnelle"]),
  },
  computed: {
    ...mapState(useInfoPersonnel, ["toogleModalInfoPersonnelle"]),
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    v-model:open="toogleModalInfoPersonnelle"
    @cancel="changeValueForToogleModalInfoPersonnelle"
    @ok="changeValueForToogleModalInfoPersonnelle"
  >
    <h3>Modifier ses informations personnelles</h3>
    <InfoForModifyEntreprises />
  </a-modal>
</template>
