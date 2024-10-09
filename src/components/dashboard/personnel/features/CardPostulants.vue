<script>
import instance, { lienPhoto } from "../../../../api/api";
import Swal from "sweetalert2";
export default {
    name:"CardPostulants",
    props:{
        InfoPostulant:{
            type:Object
        }
    },
    data() {
      return{
        lienPhoto:lienPhoto
      }  
    },
    methods:{
        async chooseStudent(id, idStud) {
      console.log(id);
      try {
        const data = {
          id: id,
          recruit: 1,
        };
        const reponse = await instance.post("recruitStudent", data);
        if (reponse.data.status) {
          this.detailStudents.forEach((item) => {
            if (item.students_id === idStud) {
              item.recruit = 1;
            }
          });
          Swal.fire({
            icon: "success",
            title: reponse.data.message,
            showConfirmButton: true,
          });
        }
        console.log(reponse);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "success",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      }
    },
    }
}
</script>
<template>
    <a-card style="width: 400px; background: rgba(179, 201, 255, 0.38)">
       <div class="d-flex justify-content-between align-items-center">
        <h1><em class="bi bi-person h1"></em></h1>
        <h2 class="text-warning">{{ InfoPostulant.nom }} {{ InfoPostulant.prenoms }}</h2>
       </div>
       <section>
        <h4><span>Email</span> {{ InfoPostulant.email }}</h4>
        <h4><span>Ville</span> {{ InfoPostulant.ville }}</h4>
        <h4><span>Quartier</span> {{ InfoPostulant.quartier }}</h4>
        <h4><span>Commune</span> {{ InfoPostulant.commune }}</h4>
        <h4><span>Télephone</span> {{ InfoPostulant.phone }}</h4>
        <h4><span>Diplome</span> {{ InfoPostulant.diplome }}</h4>
        <div style="text-align:left;">
          <h4><span>Carte étudiante</span></h4>
          <n-image width="100" :src="lienPhoto + InfoPostulant.photo"
            :alt="InfoPostulant.photo" />
        </div>
        <button
        v-if="InfoPostulant.recruit === 0"
        class="btn-lg bg-warning mt-3 rounded-5"
        @click="chooseStudent(InfoPostulant.id, InfoPostulant.students_id)"
      >
        Sélectionner
      </button>
      <h3 v-else class="text-success">
        <i class="bi bi-check-lg"></i>
        Sélectionné
      </h3>
       </section>
      </a-card>
</template>
<style scoped>
.bi-person{
    font-size: 3em;
}
.text-success {
  color: green !important;
}
h4{
    text-align: left;
    padding:.5em
}







</style>