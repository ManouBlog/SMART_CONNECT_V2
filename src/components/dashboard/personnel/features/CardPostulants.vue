<script>
import instance, { lienPhoto } from "../../../../api/api";
import { Help } from "../../../../utils";
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
      Help:Help,
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
        lienPhoto:lienPhoto,
         showPdfModal: false,
         currentPdf: null
      }  
    },
    methods:{
      ...mapActions(useTranslateStore, ["handleTranslate"]),
     openPdf(url){
  this.currentPdf = url
  this.showPdfModal = true
},
     
        VoirProfil(item) {
          console.log("item",item)
          console.log("item.student_id",{ id: item.student_id, user_id: item.user_id })
     this.$router.push({
            name: "detailStudent",
            params: { id: item.student_id, user_id: item.user_id },
          });
    },
      async chooseStudent(id, valueRecruit) {

  const actionText = valueRecruit === 1 
    ? "sélectionner" 
    : "rejeter"

  const result = await Swal.fire({
    title: `Voulez-vous vraiment ${actionText} cet étudiant ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: valueRecruit === 1 ? "#22c55e" : "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Oui, confirmer",
    cancelButtonText: "Annuler",
  })

  // ❌ Si l'utilisateur annule
  if (!result.isConfirmed) {
    return
  }

  spinnerLoading.launchLoading(true)

  try {
    const data = {
      id,
      recruit: valueRecruit,
    }

    const reponse = await instance.post("recruitStudent", data)

    if (reponse.data.status) {

      this.$emit('handleListe')

      await Swal.fire({
        icon: "success",
        title: reponse.data.message,
        timer: 1500,
        showConfirmButton: false,
      })
    }

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: error.response?.data?.message || "Une erreur est survenue",
      confirmButtonText: "OK"
    })

  } finally {
    spinnerLoading.launchLoading(false)
  }
},
 isPdf(path) {
  return path.toLowerCase().endsWith('.pdf')
},
    //     async chooseStudent(id,valueRecruit) {
    //   // console.log(id);
    
    //   // console.log(this.InfoPostulant)
    //   spinnerLoading.launchLoading(true)
    //   try {
    //     const data = {
    //       id: id,
    //       recruit: valueRecruit,
    //     };
    //     const reponse = await instance.post("recruitStudent", data);
    //     if (reponse.data.status) {
          
    //       this.$emit('handleListe')
    //       Swal.fire({
    //         icon: "success",
    //         title: reponse.data.message,
    //         showConfirmButton: true,
    //       });
    //     }
    //     // console.log(reponse);
    //     spinnerLoading.launchLoading(false)
    //   } catch (error) {
    //     console.log(error);
    //     Swal.fire({
    //       icon: "success",
    //       title: error.response.data.message,
    //       showConfirmButton: true,
    //     });
    //     spinnerLoading.launchLoading(false)
    //   }
    // },
    },
    async created() {
      this.texte = await this.handleTranslate('Email');
    this.texte1 = await this.handleTranslate(`Ville`);
    this.texte2 = await this.handleTranslate("Quartier");
    this.texte3 = await this.handleTranslate('Commune');
    this.texte4 = await this.handleTranslate('Télephone');
    this.texte5 = await this.handleTranslate("niveau d’étude");
    this.texte6 = await this.handleTranslate('Carte étudiant');
    this.texte7 = await this.handleTranslate(' Sélectionner');
    this.texte8 = await this.handleTranslate(' Rejeter');
    this.texte9 = await this.handleTranslate("Candidature retenue");
    this.texte10 = await this.handleTranslate('Candidature Pas retenue');
   
  },
}
</script>
<template>
    <a-card style="width: 400px;color: var(--third-color) !important; background: var(--secondary-color) !important">
       <div class="d-flex g-5 align-items-center">    
         <n-avatar
            v-if="InfoPostulant.photo_profil"
            class="user-avatar"
            style="border: 2px solid orange; object-fit: cover"
            round
            :size="80"
            :src="lienPhoto + InfoPostulant.photo_profil"
          />
          
          <span
            style="
              border: 2px solid orange;
              object-fit: cover;
              width: 40px;
              height:40px;
              line-height:40px;
              text-align:center;
              font-size:1em;
              border-radius: 100%;
              background: gray;
            "
            v-else
          >
           <span style="font-size:1em;color:white;">{{Help.toADfirstTwo(InfoPostulant.nom)}}</span>
          </span>
        <h1 class="user_person" style="color:orange;">{{ InfoPostulant.nom }} {{ InfoPostulant.prenoms }}</h1>
       </div>
       <section>
        <h4 style="padding:0.8em;"><span style="color:orange;">{{texte}} :</span> 
          <span style="word-break: break-word;">{{ InfoPostulant.email }}</span>
          </h4>
        <h4 style="padding:0.8em;"><span style="color:orange;">{{texte1}} :</span> {{ InfoPostulant.ville }}</h4>
        <h4 style="padding:0.8em;"><span style="color:orange;">{{texte2}} :</span> {{ InfoPostulant.quartier }}</h4>
        <h4 style="padding:0.8em;"><span style="color:orange;">{{texte3}} :</span> {{ InfoPostulant.commune }}</h4>
        <h4 style="padding:0.8em;"><span style="color:orange;">{{texte4}} :</span> {{ InfoPostulant.phone }}</h4>
        <h4 style="padding:0.8em;"><span style="color:orange;">{{texte5}} :</span> {{ InfoPostulant.diplome }}</h4>
        <div style="text-align:left;">
  <h4>
    <span style="color:orange;">{{ texte6 }} :</span>
  </h4>

  <div v-for="(item, index) in InfoPostulant.photo" :key="index">
    
    <!-- ✅ CAS PDF -->
    <div v-if="isPdf(item.path)">
      <n-button
        type="warning"
        size="small"
        style="margin:1em;"
        @click="openPdf(lienPhoto + item.path)"
      >
        Voir la carte étudiant
      </n-button>
    </div>

    <!-- ✅ CAS IMAGE -->
    <n-image
      v-else
      width="100"
      style="margin:1em;"
      :src="lienPhoto + item.path"
      :alt="item.path"
    />

  </div>
</div>
        <!-- <div style="text-align:left;">
          <h4><span style="color:orange;">{{texte6}} :</span></h4>
          <n-image v-for="(item,index) in InfoPostulant.photo" 
          :key="index"
          width="100" 
          style="margin:1em;"
          :src="lienPhoto + item.path"
          :alt="item.path" />
        </div> -->
       <button style="background-color: orange;font-weight: bold;
       position:absolute;top:0.8em;right: 1em;border:none;" @click="VoirProfil(InfoPostulant)"> 
        Voir le Profil
      </button>
        <div style="position:absolute;bottom:1em;left:50%;transform:translateX(-50%);">
          <section style="display: flex;justify-content: center;"   v-if="InfoPostulant.recruit === 0">
            <button
          class="btn bg-warning mt-3 rounded-5"
          style="border:none"
          @click="chooseStudent(InfoPostulant.id,1)"
        >
         {{texte7}}
        </button>
        <button
        class="btn bg-danger mt-3 mx-3 rounded-5"
        style="border:none"
        @click="chooseStudent(InfoPostulant.id,2)">
         {{texte8}}
        </button>
          </section>
        <h3 v-if="InfoPostulant.recruit === 1" class="text-success" style="width:500px;text-align: center;">
          <i class="bi bi-check-lg"></i>
          {{texte9}}
        </h3>
        <h3 v-if="InfoPostulant.recruit === 2" class="text-danger" style="width:500px; text-align: center;">
          <i class="bi bi-x-lg"></i>
         {{texte10}}
        </h3>
        </div>
       </section>
      </a-card>
      <n-modal v-model:show="showPdfModal" style="width: 80%;">
  <div style="background:white; padding:20px;">
    
    <iframe
      v-if="currentPdf"
      :src="currentPdf"
      width="100%"
      height="600px"
    ></iframe>

  </div>
</n-modal>
</template>
<style scoped>
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-card .ant-card-body) {
  height: 800px;
}
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