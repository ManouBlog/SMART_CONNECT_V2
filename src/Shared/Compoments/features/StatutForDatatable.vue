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
        <span v-if="dataStatut?.contrat === 1" class="badge bg-success"
          >Sélectionné</span
        >
        
        <span v-if="dataStatut?.contrat === 2" class="badge bg-danger"
          >Refusé</span
        >
        <span v-if="dataStatut?.contrat === 0" class="badge bg-primary"
          >En attente de réponse</span
        >
      </div>
</template>
