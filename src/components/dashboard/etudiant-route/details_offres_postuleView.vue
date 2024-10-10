<script>
import instance from "../../../api/api";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Swal from "sweetalert2";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
export default {
  name: "Détails_entreprise_view",
  components: {
    HeaderDashboard
  },
  data() {
    return {
      entreprise: null,
      offres: null,
      spinner: false,
      details_offre: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      showModal:false,
      avis:"",
      numberRate:"",
    };
  },
  methods: {
    // async getall(){
    //   try {
    //     const reposne = await instance.get("detail_offre/"+this.$route.params.id)
    //   console.log("reposne",reposne)
    //   }catch(error){
    //     console.log(error)
    //   }
     
    // },
    get_details_offres_postule() {
      this.spinner = true;
    
      instance.get("get_offres_postule").then((res) => {
        console.log("DETAILS", res);
        this.offres = res.data.data.offres;
        this.details_offre = this.offres.find(
          (item) => item.id == this.$route.params.id
        );
        if(this.details_offre.pivot.recruit === 1 && 
        JSON.stringify(new Date().toISOString().substring(0,10)) 
        > JSON.stringify(new Date(this.details_offre.fin).toISOString().slice(0,10))
        ){
          this.showModal = true;
        }
        console.log("DETAILS_OFFRES", this.details_offre);
        this.spinner = false;
      });
    },
    getNumber(e){
        this.numberRate = e
    },
    noterEntreprise() {
      // console.log("NOTATION", this.detailsStudents.id);
      instance
        .post("rate_entreprise", {
          offre_id: this.$route.params.id,
          student_id: this.details_offre.pivot.student_id,
          avis: this.avis,
          notes: this.numberRate,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === false) {
            Swal.fire({
              icon: "info",
              title: res.data.message,
              showConfirmButton: true,
            });
          }
          if(res.data.status){
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.showModal = false;
          }
       
          
        
        });
    },
  },
  created() {
    this.get_details_offres_postule();
    // this.getall()
  },
};
</script>

<template>
  <div class="page-body position-relative">

    <section v-if="this.details_offre != null">
      <HeaderDashboard
      :TitleHeader="`Détails de l' Offres postulé`"
      :subTitleHeader="`Détails de l' Offres postulé`"
    />
      <n-modal v-model:show="showModal">
        <n-card
          style="width: 600px"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          
         <h1>
            Evaluation du service
         </h1>
         <h2 class="text-center my-3"></h2>
        <div class="text-center my-3">
            <n-rate size="large" :value="numberRate" 
            :on-update:value="getNumber"
            />
        </div>
           <div>
            <label for="comment">Commentaire</label>
            <textarea v-model="avis" name="" id="" 
            cols="30" rows="10" class="w-100">
            </textarea>
           </div>

            <div class="text-center">
                <button class="btn-lg bg-warning mx-3"
                @click="noterEntreprise"
                >Envoyer</button>
                <button class="btn-lg mx-3 bg-dark"
                 @click="showModal = !showModal"
                 >Plus tard</button>
                
            </div>
     
        </n-card>
      </n-modal>
      <div class="container-fluid">
        <div class="details_entreprise card">
          <h1>Offre : {{ details_offre.nom_offre }}</h1>
          <h4>
            Lieu : <b>{{ details_offre.lieu }}</b>
          </h4>
          <span
            v-if="details_offre.salaire != null"
            class="d-block badge bg-warning"
          >
            Prime : {{ moneyFormat.format(details_offre.salaire) }} Fcfa</span
          >
          <span
            v-else
            class="d-block text-light badge bg-primary"
            >Prime pas fixée</span
          >
          <hr />
      
          <h3>Description complète de l'offre</h3>
          <div class="p-5" v-html="details_offre.description">
          </div>
          <hr />
          <h6
            >Date et heure début  :
            <b>{{
              details_offre.debut
            }}</b></h6
          >
          <h6
            >Date et heure fin  :
            <b>{{
              details_offre.fin
            }}</b></h6
          >
          
            <button
            v-if="JSON.stringify(new Date().toISOString().substring(0,10)) 
            > JSON.stringify(new Date(this.details_offre.fin).toISOString().slice(0,10))"
            class="btn-lg bg-warning mt-3" 
            @click="showModal = !showModal"
            >Evaluer le service</button>
        
        </div>
        
      </div>
    </section>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<style scoped>
.mt-5 {
  margin-top: 101px !important;
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
  padding:2em;
}
.details_entreprise span {
  color: gray;
}
.w-25 {
  width: 120px !important;
}
.badge{
  color:white !important;
  width:200px;
  font-weight:bold  !important;

}
</style>
