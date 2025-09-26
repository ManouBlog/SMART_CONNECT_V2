<script>
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions, mapState } from "pinia";
import InfoForModifyEntreprises from "./viewForModifier/InfoForModifyEntreprises.vue";
import CvStudent from "./CvStudent.vue";
export default {
  name: "ModalForModifyInfo",
  components: {
    InfoForModifyEntreprises,
    CvStudent
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useInfoPersonnel, ["changeValueForToogleModalInfoPersonnelle"]),
  },
  computed: {
    ...mapState(useInfoPersonnel, ["toogleModalInfoPersonnelle","isCv"]),
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    style="width:850px;padding:0 1em;"
    v-model:open="toogleModalInfoPersonnelle"
    @cancel="changeValueForToogleModalInfoPersonnelle({isCv:false})"
    @ok="changeValueForToogleModalInfoPersonnelle({isCv:false})"
  >
  <CvStudent v-if="isCv" />
  <div>
 <h5>Modifier ses informations personnelles</h5>
    <InfoForModifyEntreprises />
  </div>
  </a-modal>
</template>
