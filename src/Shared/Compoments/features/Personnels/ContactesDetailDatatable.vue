<script>
export default {
    name:"ContactesDetailDatatable",
    props:{
     donnees:{type:Object}
    },
    data() {
       return{

       }  
    },
}
</script>
<template>
    <div class="d-flex justify-content-center align-items-center">
        <router-link
        v-if="donnees.pivot.contrat === 1"
        :to="{
          name: 'details_students_contactes',
          params: {
            name: donnees.nom,
            date: donnees.pivot.created_at,
          },
        }"
        ><em class="bi bi-eye"></em
      ></router-link>
      <em
        class="bi bi-dash-circle"
        v-if="
          donnees.pivot.contrat === 2 || donnees.pivot.contrat === 0
        "
      ></em>
    </div>
</template>