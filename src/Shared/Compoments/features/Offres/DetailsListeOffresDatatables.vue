<script>
import { configUtils } from "../../../Utils";
import { mapActions ,mapState} from "pinia";
import {useOffreStore} from "../../../../store-pinia/Offres/useOffreStore"
import { useModalSuppressionStore } from "../../../../store-pinia/ModalSuppession/useModalSuppressionStore";
export default {
  name: "DetailsListeOffresDatatables",
  props: {
    donnees: { type: Object },
  },
  data() {
    return {
      configUtils: configUtils,
    };
  },
  computed: {
    ...mapState(useOffreStore,["idItemDelete"])
  },
  methods: {
    ...mapActions(useModalSuppressionStore, ["changeValueForShowModalSuppression"]),
    ...mapActions(useOffreStore,["handleIdItemDelete"]),
    show_box_confirmation_delete(value) {
      this.handleIdItemDelete(value)
      // console.log("this.idItemDelete",this.idItemDelete);
      this.changeValueForShowModalSuppression();
    },
  },
};
</script>
<template>
  <div class="d-flex justify-content-center align-items-center">
    <span v-if="configUtils.verifDateWithDateToDay(donnees.fin)" class="mx-2 text-dark">
      <router-link
        :to="{
          name: 'detail_offre',
          params: {
            id: donnees.id,
          },
        }"
        ><em class="bi bi-pencil"></em>
      </router-link>
    </span>
    <span class="mx-2 text-dark">
      <router-link
        :to="{
          name: 'detailsOffreEntreprise',
          params: {
            id: donnees.id,
          },
        }"
        ><em class="bi bi-eye"></em>
      </router-link>
    </span>
    <span
      class="bi bi-trash mx-2 text-dark"
      @click="show_box_confirmation_delete(donnees.id)"
    ></span>
  </div>
</template>
