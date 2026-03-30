<script>
import { configUtils } from "../../Utils";
export default {
    name:"StatutForDatatable",
    props:{
    dataStatut:{
        type:Object
    }
    },
    data() {
       return{
        configUtils:configUtils
       } 
    },
}
</script>
<template>
    <div>
        <span v-if="dataStatut.pivot.contrat === 1" class="badge bg-success"
          >Sélectionné</span
        >
        <!-- <span
          class="mx-2"
          v-if="
            dataStatut.pivot.contrat === 0 &&
            configUtils.getFormatDateFr(dataStatut.pivot.offre.fin)
          "
          >Expirée</span
        > -->

        <span v-if="dataStatut.pivot.contrat === 2" class="badge bg-danger"
          >Refusé</span
        >
        <span v-if="dataStatut.pivot.contrat === 0" class="badge bg-primary"
          >En attente de réponse</span
        >
      </div>
</template>
