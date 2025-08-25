<script>
import instance, { lienPhoto } from "../../../../api/api";
import Swal from "sweetalert2";
import { mapActions} from "pinia";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import {useLoadingSpinner} from "../../../../store-pinia/LoadingSpinner/useLoadingSpinner"
const spinnerLoading = useLoadingSpinner();
export default {
    name:"CardPostulants",
    emits:['handleListe'],
    props:{
        InfoPostulant:{
            type:Object
        },
    },
    data() {
      return{
      texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      texte19: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      texte27:"",
        lienPhoto:lienPhoto
      }  
    },
    methods:{
      ...mapActions(useTranslateStore, ["handleTranslate"]),
        async chooseStudent(id,valueRecruit) {
      // console.log(id);
    
      // console.log(this.InfoPostulant)
      spinnerLoading.launchLoading(true)
      try {
        const data = {
          id: id,
          recruit: valueRecruit,
        };
        const reponse = await instance.post("recruitStudent", data);
        if (reponse.data.status) {
          
          this.$emit('handleListe')
          Swal.fire({
            icon: "success",
            title: reponse.data.message,
            showConfirmButton: true,
          });
        }
        // console.log(reponse);
        spinnerLoading.launchLoading(false)
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "success",
          title: error.response.data.message,
          showConfirmButton: true,
        });
        spinnerLoading.launchLoading(false)
      }
    },
    },
    async created() {
      this.texte = await this.handleTranslate('Email');
    this.texte1 = await this.handleTranslate(`Ville`);
    this.texte2 = await this.handleTranslate("Quartier");
    this.texte3 = await this.handleTranslate('Commune');
    this.texte4 = await this.handleTranslate('Télephone');
    this.texte5 = await this.handleTranslate('Diplome');
    this.texte6 = await this.handleTranslate('Carte étudiante');
    this.texte7 = await this.handleTranslate(' Sélectionner');
    this.texte8 = await this.handleTranslate(' Rejeter');
    this.texte9 = await this.handleTranslate("Sélectionné");
    this.texte10 = await this.handleTranslate(' Rejeté');
   
  },
}
</script>
<template>
    <a-card style="width: 400px;color: var(--third-color) !important; background: var(--secondary-color) !important">
       <div class="d-flex justify-content-between align-items-center">
        <h1><em class="bi bi-person h1"></em></h1>
        <h1 class="user_person" style="color:orange;">{{ InfoPostulant.nom }} {{ InfoPostulant.prenoms }}</h1>
       </div>
       <section>
        <h4><span>{{texte}}</span> {{ InfoPostulant.email }}</h4>
        <h4><span>{{texte1}}</span> {{ InfoPostulant.ville }}</h4>
        <h4><span>{{texte2}}</span> {{ InfoPostulant.quartier }}</h4>
        <h4><span>{{texte3}}</span> {{ InfoPostulant.commune }}</h4>
        <h4><span>{{texte4}}</span> {{ InfoPostulant.phone }}</h4>
        <h4><span>{{texte5}}</span> {{ InfoPostulant.diplome }}</h4>
        <div style="text-align:left;">
          <h4><span>{{texte6}}</span></h4>
          <n-image width="100" :src="lienPhoto + InfoPostulant.photo"
            :alt="InfoPostulant.photo" />
        </div>
        <div>
          <section  v-if="InfoPostulant.recruit === 0">
            <button
          class="btn-lg bg-warning mt-3 rounded-5"
          style="border:none"
          @click="chooseStudent(InfoPostulant.id,1)"
        >
         {{texte7}}
        </button>
        <button
        class="btn-lg bg-danger mt-3 mx-3 rounded-5"
        style="border:none"
        @click="chooseStudent(InfoPostulant.id,2)">
         {{texte8}}
        </button>
          </section>
        <h3 v-if="InfoPostulant.recruit === 1" class="text-success">
          <i class="bi bi-check-lg"></i>
          {{texte9}}
        </h3>
        <h3 v-if="InfoPostulant.recruit === 2" class="text-danger">
         {{texte10}}
        </h3>
        </div>
       </section>
      </a-card>
</template>
<style scoped>
.bi-person{
    font-size: 3em;
}
.user_person::first-letter{
 font-size: 1.5em;
 font-weight: bold;
 text-transform: capitalize;
}
.text-success {
  color: green !important;
}
h4{
    text-align: left;
    padding:.5em
}







</style>