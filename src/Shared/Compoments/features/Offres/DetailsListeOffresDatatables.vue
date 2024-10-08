<script>
import { configUtils } from "../../../Utils";
export default {
    name:"DetailsListeOffresDatatables",
    props:{
     donnees:{type:Object}
    },
    data() {
       return{
        configUtils:configUtils
       } 
    },
    methods:{
        show_box_confirmation_delete(value){
            console.log(value)
        }
    }
}
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