<script>
export default {
    name:"SelectionnesDetailDatatable",
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
              :to="{
                name: 'detailsStudentsRecruit',
                params: {
                  offre: "",
                },
              }"
              ><em class="bi bi-eye"></em
            ></router-link>
          </div>
  
</template>