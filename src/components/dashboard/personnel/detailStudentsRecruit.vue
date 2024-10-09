<script>
import instance,{lienPhoto} from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { Help } from "../../../utils";
import Swal from "sweetalert2";
export default {
  name: "DetailPostulantsView",
  components: { HeaderDashboard },
  data() {
    return {
      studentRecruit: null,
      lienPhoto:lienPhoto,
      offre: null,
      offres: null,
      spinner: false,
      tableauRecruit: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      showModal:false,
      numberRate:0,
      identifiant:{},
      avis:"",
    };
  },
  methods: {
    get_offres_interess_by_student() {
      this.spinner = true;
      instance
        .get("getStudentRecruit")
        .then((res) => {
          console.log("getStudentRecruit",res);
          this.studentRecruit = Help.groupBy(res.data);

          for (let item in this.studentRecruit){
      if(item === this.$route.params.offre){
       this.tableauRecruit = this.studentRecruit[item]
       }
       }
          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNumber(e){
        this.numberRate = e
    },
    rateStudent(id){
    this.showModal = true
    this.tableauRecruit.forEach(item=>{
        if(item.id === id){
            this.identifiant = item
        }
    })
    },
    sendAppreciation() {
        // console.log(this.identifiant)
      instance
        .post("giveAvis", {
          notes: this.numberRate,
          student_id: this.identifiant.student_id,
          avis: this.avis,
          offre_id:this.identifiant.offre_id
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
            setTimeout(() => {
              this.appreciationService = false;
            }, 1500);
          }
        });
    },
  },
  created() {
    this.get_offres_interess_by_student();
  },
};
</script>

<template>
  <section>
    <HeaderDashboard
      :TitleHeader="`Détail/ offre : ${this.$route.params.offre}`"
      :subTitleHeader="'Détail-offre'"
    />
    <div class="page-body position-relative">
      <div  v-if="tableauRecruit != null" 
      class="conteneur-detail">
  
      <n-modal v-model:show="showModal">
          <n-card
            style="width: 600px"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
          >
            
           <h1>
              Evaluer le personnel
           </h1>
           <h2 class="text-center my-3">{{this.identifiant.nom}} {{this.identifiant.prenoms}}</h2>
          <div class="text-center my-3">
              <n-rate size="large" :value="numberRate" 
              :on-update:value="getNumber"
              />
          </div>
             <div v-if="numberRate >= 3">
              <label for="comment">Commentaire</label>
              <textarea v-model="avis" name="" id="" 
              cols="30" rows="10" class="w-100">
              </textarea>
             </div>
  
              <div class="text-center">
                  <button v-if="numberRate" class="btn-lg bg-dark mx-3"
                  @click="sendAppreciation"
                  >Envoyer</button>
                  <button class="btn-lg mx-3"
                   @click="showModal = !showModal"
                   >Plus tard</button>
                  
              </div>
       
          </n-card>
        </n-modal>

        <div  class="d-flex align-items-center justify-content-center flex-wrap">
          <a-card 
          v-for="(item,index) in tableauRecruit" :key="item.id"
          style="width: 400px; background: rgba(179, 201, 255, 0.38)" >
          <h1 class="badge bg-warning w-25">Etudiant {{index+1}}</h1>

            <div class="d-flex justify-content-between align-items-center">
            <h1><em class="bi bi-person h1"></em></h1>
            <h2 class="text-warning">{{ item.nom }}
               {{ item.prenoms }}</h2>
            </div>
          <section class="text-left">
          <h4><span>Email</span> {{ item.email }}</h4>
          <h4><span>Ville</span> {{ item.ville }}</h4>
          <h4><span>Quartier</span> {{ item.quartier }}</h4>
          <h4><span>Commune</span> {{ item.commune }}</h4>
          <h4><span>Télephone</span> {{ item.phone }}</h4>
          <h4><span>Diplome</span> {{ item.diplome }}</h4>
          <h4><span>Galerie</span> 
          <img :src="lienPhoto+item.photo"
           class="w-25 border-2 rounded" :alt="item.photo">
          </h4>
          <button style="border:none" class="btn-lg bg-warning mt-3"
          @click="rateStudent(item.id)"
          >Evaluer</button>
            </section>
           </a-card>
        </div>  
      </div>
  
    </div>
  </section>

</template>

<style scoped>

.bi-person {
  font-size:3em;
}
.badge {
  width: 300px !important;
  font-weight:bold !important;
  color: white !important;
}

.bi-arrow-left-circle {
  cursor: pointer;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.body-card {
  background: transparent;
}
.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}
.details_entreprise {
  text-align: left;
  padding: 1em 3em !important;
  align-self: flex-start;
}
.details_entreprise span {
  color: gray;
}
.w-25 {
  width: 120px !important;
}
</style>
