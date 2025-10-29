<script>
import instance, { lienPhoto } from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { Help } from "../../../utils";
import Swal from "sweetalert2";
import { mapActions } from "pinia";
// import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
const spinnerLoading = useLoadingSpinner();
export default {
  name: "DetailPostulantsView",
  components: { HeaderDashboard },
  data() {
    return {
      Help:Help,
      texte0: "",
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
      studentRecruit: null,
      lienPhoto: lienPhoto,
      offre: null,
      offres: null,
      spinner: false,
      tableauRecruit: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      showModal: false,
      numberRate: 0,
      identifiant: {},
      avis: "",
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    // ...mapActions(useEntreprisesStore, ["get_students_contact"]),
    async get_offres_interess_by_student() {
      spinnerLoading.launchLoading(true);
      await instance
        .get("getStudentRecruit")
        .then((res) => {
          console.log("getStudentRecruit", res);
          this.studentRecruit = res.data;
          for (let item in this.studentRecruit) {
            if (item === this.$route.params.offre) {
              this.tableauRecruit = this.studentRecruit[item];
            }
          }
          console.log("this.tableauRecruit",this.tableauRecruit)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(()=>{
        spinnerLoading.launchLoading(false);
        })
    },
    getNumber(e) {
      this.numberRate = e;
    },
    rateStudent(id) {
      this.showModal = true;
      console.log("rateStudent",id)
       console.log("this.tableauRecruit",this.tableauRecruit)
      this.identifiant = this.tableauRecruit.find(item=>Number(item.student_id) === Number(id))
       console.log("this.identifiant",this.identifiant)
    },
    async sendAppreciation() {
     spinnerLoading.launchLoading(true);
      await instance
        .post("giveAvis", {
          notes: this.numberRate,
          student_id: this.identifiant.student_id,
          avis: this.avis,
          offre_id: this.identifiant.offre_id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.showModal = !this.showModal
            this.numberRate = 0
            this.avis = null
          }
        }).catch((error)=>{
          console.log(error)
        })
        .finally(()=>{
          spinnerLoading.launchLoading(false);
        });
    },
  },
  async created() {
    this.get_offres_interess_by_student();
    this.texte0 = await this.handleTranslate('Détail-offre :');
    this.texte1 = await this.handleTranslate(`Evaluer le personnel`);
    this.texte2 = await this.handleTranslate("Commentaire");
    this.texte3 = await this.handleTranslate('Envoyer');
    this.texte4 = await this.handleTranslate('Plus tard');
    this.texte5 = await this.handleTranslate('Etudiant');
    this.texte6 = await this.handleTranslate('Email');
    this.texte7 = await this.handleTranslate('Ville');
    this.texte8 = await this.handleTranslate('Quartier');
    this.texte9 = await this.handleTranslate("Commune");
    this.texte10 = await this.handleTranslate('Télephone');
    this.texte11 = await this.handleTranslate('Diplome');
    this.texte12 = await this.handleTranslate(`Carte étudiant`);
    this.texte13 = await this.handleTranslate("Evaluer");
 
    this.texte14 = await this.handleTranslate('Plus tard');
    this.texte15 = await this.handleTranslate('Etudiant');

  },
};
</script>

<template>
  <section>
    <HeaderDashboard
      :TitleHeader="`${texte0} ${this.$route.params.offre}`"
      :subTitleHeader="texte0"
    />
    <div class="page-body position-relative">
      <div v-if="tableauRecruit != null" class="conteneur-detail">
        <n-modal v-model:show="showModal">
          <n-card
            style="width: 600px"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
          >
            <h1>{{texte1}}</h1>
            <h2 class="text-center my-3"
            style="text-transform:capitalize;"
            >
              {{ this.identifiant.student.nom }} {{ this.identifiant.student.prenoms }}
            </h2>
            <div class="text-center my-3">
              <n-rate size="large" :value="numberRate" :on-update:value="getNumber" />
            </div>
            <div v-if="numberRate >= 3">
              <label for="comment">{{texte2}}</label>
              <textarea v-model="avis" name="" id="" cols="30" rows="10" class="w-100">
              </textarea>
            </div>

            <div class="text-center">
              <button
                v-if="numberRate"
                class="btn-lg bg-warning mx-3"
                @click="sendAppreciation"
              >
                {{texte3}}
              </button>
              <button class="btn-lg mx-3" @click="()=>{
                this.showModal = !this.showModal
                this.numberRate = 0
              }">
                {{texte4}}
              </button>
            </div>
          </n-card>
        </n-modal>
        <p style="text-align:center;">
           Du {{ new Date(tableauRecruit[0].offre.job_debut).toLocaleDateString('fr') }}  au {{  new Date(tableauRecruit[0].offre.job_fin).toLocaleDateString('fr') }}
        </p>
        <div class="conteneur-evaluation-offre">
          <a-card
            v-for="(item, index) in tableauRecruit"
            :key="item.id"
            style="width: 400px; background: var(--secondary-color) !important;color: var(--third-color) !important;"
          >
            <h1 class="badge bg-warning w-25">{{texte5}} {{ index + 1 }}</h1>

            <div class="d-flex align-items-center">
              <!-- <h1><em class="bi bi-person h1"></em></h1> -->
              <n-avatar
            v-if="item.student.photo_profil"
            class="user-avatar"
            style="border: 2px solid orange; object-fit: cover"
            round
            :size="40"
            :src="lienPhoto + item.student.photo_profil"
          />
          <span
          class="user-avatar"
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
           <span style="font-size:1em;color:white;">{{Help.toADfirstTwo(item.student.nom)}}</span>
          </span>
              <h1 style="color:white;font-weight:bold;">{{ item.student.nom }} {{ item.student.prenoms }}</h1>
            </div>
            <section class="text-left">
              <h4><span style="color:orange;">{{texte6}} :</span> {{ item.student.email }}</h4>
              <h4><span style="color:orange;">{{texte7}} :</span> {{ item.student.ville }}</h4>
              <h4 v-if="item.student.quartier"><span style="color:orange;">{{texte8}} :</span> {{ item.student.quartier }}</h4>
              <h4><span style="color:orange;">{{texte9}} :</span> {{ item.student.commune }}</h4>
              <h4><span style="color:orange;">{{texte10}} :</span> {{ item.student.phone }}</h4>
              <h4><span style="color:orange;">{{texte11}} :</span> {{ item.student.diplome }}</h4>
              <h4>
                <span style="color:orange;">{{texte12}} :</span>
                <img
                  :src="lienPhoto + item.student.photo"
                  class="w-25 border-2 rounded"
                  :alt="item.student.photo"
                />
              </h4>
              
              <button
               v-if="!item.student?.etoiles?.some(rate => Number(rate.offre_id) === Number(item.offre_id))"
                style="border: none"
                class="btn-lg bg-warning mt-3"
                @click="rateStudent(item.student_id)"
              >
                {{texte13}}
              </button>
              <p style="text-align:center;" v-else>Évaluation effectuée</p>
            </section>
          </a-card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.ant-card-body){
  height:780px !important;
}
:deep(.n-modal-container){
  z-index:99 !important;
}
h4{
  margin:1.5em 0;
}
.conteneur-evaluation-offre {
  display: flex;
  justify-content: center;
  align-items: center;
  place-content: center;
  gap: 1em;
  flex-wrap: wrap;
}

.bi-person {
  font-size: 3em;
}
.badge {
  width: 300px !important;
  font-weight: bold !important;
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
