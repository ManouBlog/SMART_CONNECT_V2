<script>
import instance, { lienPhoto } from "../../api/api";
import HeaderDashboard from "../../Shared/Compoments/HeaderDashboard.vue";
import Swal from "sweetalert2";
import { Help } from "../../utils";
import "primeicons/primeicons.css";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../store-pinia/LoadingSpinner/useLoadingSpinner";
import ShimmerCard from "./feature/ShimmerCard.vue";
const loadingSpinner = useLoadingSpinner();
// const abonnementsStore = useAbonnementsStore();
export default {
    name:"ListFavoris",
    components:{ShimmerCard,HeaderDashboard},
  data() {
    return {
      lienPhoto: lienPhoto,
      Help: Help,
      competenceAdd: null,
      texte01: "",
      texte: "",
      texte2: "",
      dateSelectConvert: "",
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
      lieu: "",
      isLoading: true,
      dateRendezVousStudentWithEntreprise: null,
      MyDateRendezVous: [],
      user: this.$store.state.user,
      competences: [],
      competence: "",
      contacter: false,
      datesSelect: [],
      jours: [],
      page: 1,
      details_timetable: false,
      id_detail_timetable: "",
      timetable_for_student: "",
      path: "",
      schedule: "",
      compte: 4,
      hideButton: false,
      MylistEmploi: null,
      allFavoris:[],
      location: "",
      list: [],
      contrat: false,
      NewListEmploi: "",
      length: 9,
      hideButtons: false,
      isWhished: [],
      lengthOfTalents: "",
      spinner: false,
      dateDebut: null,
      dateFin: null,
      Myarray: [],
      showEndResearch: false,
      langage: [],
      selected: null,
      newlist: [],
      color: false,
      selectedService: [],
      verfIfStudentExistInWishlist: [],
      addColor: false,
      Today: new Date().toJSON().slice(0, 10),
      showCalender: false,
      datesPickers: [],
      selecteDatepickers: {},
      checkboxDate: false,
      checkbox: false,
      option: "",
      MyJour: null,
      moreExist: false,
      nextPage: 0,
      loadSpinner: false,
      competencesPredefini: [],
      range: {
        start: new Date(),
        end: new Date(),
      },
      rangeSearch: {
        start: new Date(),
        end: new Date(),
      },
      toogleExperience: false,
      days: [],
      showCalenderFilter: false,
      selectedCompetenceWithDate: "",
      selectedCompetenceWithPeriode: "",
      totalPages: "",
      maxVisibleButtons: "2",
      myWhilistUserConnected:[],
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
   async addPersonAtWishLit(person) {
     loadingSpinner.launchLoading(true);
    try{
   await this.$store.dispatch("addListFavoris", person);
    }catch(error){
      console.log(error);
    }finally{
        await this.$store.dispatch("handleListeFavoris");
        await this.get_list_Talents(1)
    }
    },
   
    addOtherElement(payload) {
      return payload?.map((element) => {
        // Transform jours
        const days = element.student.jours.map((day) => day.jour);
        const hours = element.student.jours.map((day) => day.totalHour);

        // Transform competences
        const competences = element.student.competences.map((comp) => comp.competence);

        // Ajoutez les nouvelles propriétés
        element.days = days;
        element.hours = hours;
        element.acquis = competences;


        return element;
      });
    },

   async get_list_Talents(launch=null) {
    
    if(!launch){
    loadingSpinner.launchLoading(true);
    }
  try {
    const response = await instance.get("list_emplois_temps");
    console.log("res_ALL", response);
   this.allFavoris = response.data.data.filter(item=>this.$store.state.whistListPerson.includes(item.id));

   console.log("DATA_LISTE", this.allFavoris);

    this.list = this.addOtherElement(this.allFavoris);
    console.log("get_list_Talents", this.list);
  } catch (error) {
    console.log(error);
  } finally {
    loadingSpinner.launchLoading(false);
    this.isLoading = false;
  }
},
    voirDetailTimetable(item) {
      if (
  this.user &&
  (this.user.user?.statuses || []).some(s =>
    ['Entreprise', 'Particulier'].includes(s.statut)
  )
) {
 this.$router.push({
            name: "detailStudent",
            params: { id: item.id, user_id: item.user_id },
          });
        
      } else {
        Swal.fire({
          icon: "info",
          title: "Veuillez-vous connecter!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          this.$router.push({
            path: "/registre",
            query: { redirect: this.path },
          });
        }, 2000);
      }
    },
    verfEnter() {
  console.log("verfEnter", this.user);

  if (!this.user) return;

  const statutPrincipal = this.user?.user?.statut?.statut;
  const statuses = this.user?.user?.statuses || [];

  const hasParticulierOrArtisan = statuses.some(s =>
    ['Particulier', 'Artisan'].includes(s.statut)
  );

  if (statutPrincipal === 'Etudiant' && !hasParticulierOrArtisan) {
    this.$router.push("/");

    Swal.fire({
      icon: "info",
      title: "Vous n'êtes pas autorisé",
      showConfirmButton: false,
      timer: 1000,
    });
  }
},
  },
  async created() {
    this.verfEnter();
    await this.$store.dispatch("getInfoUser");
    await this.$store.dispatch("handleListeFavoris");
    this.get_list_Talents();
    this.texte = await this.handleTranslate("Mes favoris");
    this.texte1 = await this.handleTranslate("Talents disponibles");
    this.texte01 = await this.handleTranslate("Talent disponible");
    this.texte2 = await this.handleTranslate(" Nous avons trouvé");
    this.texte3 = await this.handleTranslate("disponibilité(s).");
    this.texte4 = await this.handleTranslate("Chargement...");
    this.texte5 = await this.handleTranslate("Voir plus");
    this.texte6 = await this.handleTranslate("Charger plus");
    this.texte7 = await this.handleTranslate("Vous avez atteint la fin");
    this.texte8 = await this.handleTranslate("Sélectionne les jours");
    this.texte9 = await this.handleTranslate("Compétence");
    this.texte10 = await this.handleTranslate("Commune");
  },
};
</script>
<template>
  <section>
       <HeaderDashboard :TitleHeader="texte" :subTitleHeader="texte" />
    <div
    v-if="!isLoading"
      class="container-fluid timetableSchedule"
      :class="isLoading ? 'conteneur_offre' : null"
    >
      <div>        
        <div class="container-fuid d-grid px-3" v-if="this.allFavoris.length">
          <div
            v-for="(emploi, index) in this.allFavoris"
            :key="index"
            class="card Mycard-body"
          >
            <div class="icons_interesse">
              <em
                @click="addPersonAtWishLit(emploi)"
                style="cursor: pointer;"
                :class="this.$store.state.whistListPerson?.some(item=>item == emploi.id) ? 'text-danger' : 'null'"
                class="bi bi-heart-fill"
              ></em>
            </div>
            <div style="position: absolute;top:1em;left: 1em;">
              <n-avatar
                v-if="emploi?.student?.photo_profil"
                style="border: 2px solid orange; object-fit: cover"
                round
                :size="60"
                :src="lienPhoto + emploi?.student?.photo_profil"
              />
          <span
     v-else
  :style="{
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',

    padding: emploi?.is_verified ? '0px' : '25px',

    border: '2px solid orange',
    borderRadius: '50%',
    background: 'gray',

    minWidth: '40px',
    minHeight: '40px'
  }"
>
  <img
   v-if="emploi?.is_verified"
    src="/profil_verified.png"
    alt="profil_verified"
    style="
      display: block;
      object-fit: contain;
      width: 50px;
    "
  />

  <span style="font-size: 14px; color: white;position: absolute;">
    {{ Help.toADfirstTwo(emploi.student.nom) }}
  </span>
</span>
               
            </div>
            
            <div class="card-body">
              <h5 class="name" style="color: white; font-weight: bold;text-align: center;">
                {{ emploi.student.nom }}
              </h5>
              <p class="biStar">
                <Rating 
                 :class="emploi.star_color === 'gold' ? 'color_gold':'color_yellow'" 
                 v-model="emploi.average" 
                 readonly :cancel="false"/>
              </p>
              <p class="text-center p-0 m-0">
               <span 
           :style="{
          display: 'flex',
           flexWrap: 'wrap',
           gap: '6px',
           justifyContent:'center', 
            marginTop:'2px'
             }">
        <span
        v-for="(status, index) in emploi.statuses || []"
    :key="index"
    class="badge"
    style="background:orange; font-size:0.5em !important;"
  >
    {{ status.statut }}
     </span>
     </span>
              </p>
              <div class="jour">
                <span
                  v-for="(item, index) in emploi.student?.competences.slice(0, 3)"
                  :key="index"
                >
                  <strong class="bg-teal cpt">{{ item.competence }}</strong>
                </span>
                <span v-if="emploi.student?.competences?.length > 3"> ... </span>
              </div>
              
              <button
                class="btn bg-primary voirPlus"
                @click="voirDetailTimetable({ id: emploi.student.id, user_id: emploi.student.user_id })"
              >
                {{ texte5 }}

                <em class="bi bi-eye"></em>
              </button>
            </div>
          </div>
        </div>
      <div v-else style="
        min-height: 60vh !important;
        text-align: center;
        padding: 2em;
        font-weight: bold;
      ">
        <p class="text-center text-muted py-4">
        Aucun talents disponibles
       </p>
      </div>
      </div>
    </div>
     <section v-else>
    <div
      style="
        min-height: 60vh !important;
        text-align: center;
        padding: 2em;
        font-weight: bold;
      "
      class="shimmer-text"
    >
       <div class="container-fuid d-grid px-3" style="justify-content: center;">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        </div>
    </div>
   
  </section>
   
  </section>

</template>
<style scoped>

.ecriteau {
  color: orange;
}

.conteneur_timetable {
  padding: 1em;
}
.flex-periode {
  flex-direction: column;
}
.conteneur_pagination {
  position: relative;
  bottom: 0;
}
.evaluation {
  margin-left: 0.5em;
  width: 160px;
  padding: 0.5em;
  border-radius: 5px;
  background: #f77f00 !important;
  color: rgb(255, 255, 255);
}
.text-secondary {
  color: gray;
}
.notes {
  top: 0;
  right: 0;
  position: absolute;
}
.selecte_service select {
  width: 30%;
  margin: 0.5em 0;
  border-radius: 5px;
  padding: 0.3em 0;
}
.para {
  color: rgb(92, 92, 92);
}
.font-weight-bold {
  font-weight: bold !important;
}
.content_experience {
  padding: 1em;
  display: flex;
  width: 40%;
  justify-content: space-between;
  align-items: top;
}
.content_commentaire {
  padding: 0.5em 0;
  display: flex;
  width: 80%;
  justify-content: flex-start;
  align-items: top;
}

.conteneur_ecriteau {
  width: 100% !important;
  padding: -1em 0;
  text-align: left;
  margin-left: 0.5em;
}
.conteneur_star_count {
  position: relative;
}
.conteneur_star_count span {
  position: absolute;
  top: 0;
  right: 82% !important;
}
.rond {
  width: 45px;
  height: 45px;
  margin-left: 1em;
  background: rgba(255, 255, 255, 0.232);
  border-radius: 100%;
  line-height: 45px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
}
.rondProfil {
  width: 50px;
  height: 70px;
  background: rgba(122, 121, 121, 0.232);
  border-radius: 100%;
  line-height: 70px;
  text-align: center;
  border: 3px solid rgb(152, 152, 152);
}
.experience {
  width: 50%;
  margin-top: 1em;
  text-align: left;
  font-weight: bold;
}

.endResearch {
  margin-bottom: 1em;
  text-align: center;
}
.list_personnel {
  color: #f77f00 !important;
}
.voirPlus {
  position: absolute;
  bottom: 0.7em;
  padding: 0.3em 0.5em;
  margin-left: 50%;
  transform: translateX(-50%);
}

.filterDate {
  background: rgb(255, 252, 252);
  min-height: 40px;
  border-radius: 5px;
  padding: 5px 40px 0 8px;
  position: relative;
  width: 325px !important;
  line-height: 20px;
  text-align: left;
}

.dayChoose {
  background: #3c4440;
  padding: 0.3em 1em;
  color: rgb(255, 255, 254);
  position: relative;
  margin-left: 10px;
  margin-bottom: 14px;
  font-size: 0.8em;
  border-radius: 3px;
}
.closeday {
  position: absolute;
  right: 0;
  top: 0;
}
.calendarFilter {
  position: absolute;
  top: 40px;
  z-index: 999;
  margin-left: -30%;
  transform: translateX(26%);
}
.searchByDay {
  color: gray !important;
}
.bi-play {
  position: absolute;
  right: 1em;
  top: 0.3em;
  transform: rotateZ(210deg);
  color: gray !important;
  font-size: 1.3em !important;
}
.bi-play-fill {
  position: absolute;
  right: 1em;
  top: 0.6em;
  transform: rotateZ(30deg);
  font-size: 1.3em !important;
}
.datepickrs {
  margin: 1em 0;
}
.rangePickers {
  margin: 1em 0;
}
.border-input {
  padding: 0.5em 0.3em;
}
.mb-5 {
  margin-bottom: 1em !important;
}

.button {
  width: auto !important;
  padding: 0.9em !important;
  margin-left: 0.5em !important;
  margin-bottom: 0.2em !important;
  margin-top: 0.98em !important;
  background: rgb(255, 255, 255) !important;
  border-radius: 5px !important;
  border: none !important;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.303);
}

.conteneurInter {
  margin: 1em 0 0 0;
}
.myCalender {
  margin: 0 3em !important;
}
.btnAdd {
  margin: 1em 0 0 0 !important;
  position: relative !important;
  font-weight: bold;
  background: #f77f00 !important;
  color: white;
}

.disponibilite span strong {
  margin: 0 0.5em;
  border-radius: 100%;
  height: 15px;
  width: 15px;
  line-height: 25px;
  font-size: 0.8em;
  text-transform: capitalize;
}
.disponibilite span strong {
  background: rgba(128, 128, 128, 0.262);
  color: rgb(68, 68, 68);
}
.jou {
  background: linear-gradient(10deg, rgb(2, 123, 56), rgb(0, 230, 31)) !important;
  color: rgb(255, 255, 255) !important;
}
.multiselect__tag {
  background: rgb(5, 35, 73) !important ;
}

.colorForFirstHoraire {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: crimson !important;
}
.Mycard-body {
  position: relative !important;
  padding: 1em 0;
  text-transform: capitalize;
  margin: 0 !important;
}
.Mycard-body h3 {
  padding: 0;
  margin: 0 !important;
  text-align: center;
}
.Mycard-body .btn {
  font-size: 0.8em !important;
  margin-top: 1em;
}
.icons_interesse {
  position: absolute !important;
  top: 1em;
  right: 1em;
}

.totalHour {
  position: absolute !important;
  top: 1em;
  right: 1em;
}
.biStar {
   display: flex;
   justify-content: center;
   margin: 0.8em 0;
}
.biStar .color_star,
.biStar strong {
  color: orange;
}

.icons_interesse em {
  font-size: 1.5em !important;
}
.icons_interesse .bi {
  font-size: 1.5em !important;
}

.w-100 {
  width: 20%;
  padding: 0.5em 0;
}
.notDispo,
.red {
  background: crimson !important;
}
.d-block {
  display: block;
}

.loadPlus {
  margin-bottom: 2em;
}
.card_content {
  background: white;
  width: 70%;
  height: 50%;
}
.green-banner,
.image-heading {
  color: rgb(5, 35, 73) !important;
}
#load_more,
.filter-result:hover {
  border: 2px solid rgb(5, 35, 73) !important;
}
.job-footer {
  border: none;
}
.char {
  margin-bottom: 3em;
}
.timetableSchedule {
  padding: 1em 0 !important;
}
.card {
  border-radius: 5px !important;
  background: var(--secondary-color) !important;
  color: var(--third-color) !important;
  box-shadow: 3px 3px 3px 3px #00000033;
}
.spinner-border {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  place-items: center;
  align-items: center;
}

.d-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
  justify-content: center;
}
.see_details_emploi {
  position: fixed !important;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  place-items: center;
  background: rgba(141, 137, 137, 0.429);
  z-index: 99;
}
.hideschudleIfUserStudent {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  place-items: center;
  background: rgba(35, 35, 35, 0.887);
  z-index: 999;
}
.hideschudleIfUserStudent .student {
  width: 50%;
  background: white;
  height: auto;
  overflow-y: auto;
  border-radius: 10px;
}

.see_contrat {
  position: fixed !important;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  place-items: center;
  background: rgba(141, 137, 137, 0.547);
  z-index: 990;
}
.see_details_emploi .timetable {
  width: 700px;
  background: white;
  height: 90%;
  overflow-y: auto;
  border-radius: 10px;
  position: relative;
}

.bs {
  font-size: 3em !important;
  color: crimson;
  cursor: pointer;
}
.bx {
  position: absolute !important;
  font-size: 2.5em !important;
  cursor: pointer;
  right: 0.5em;
  top: 0.5em !important;
  color: crimson;
  font-weight: bold;
  box-shadow: 1px 1px 6px solid rgba(0, 0, 0, 0.69);
  border-radius: 100%;
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.card-body h5 {
  text-align: left;
  font-size: 1em;
}
.card-body h1 {
  text-align: left;
}
.info_student {
  text-align: left;
  margin-left: 1em;
  margin-top: 4em;
  text-transform: capitalize;
}
.conteneur_competences {
  margin-left: 1em;
  margin-top: 0.5em;
}
.p-calendar {
  width: 100% !important;
}
.info_student .h1 {
  font-size: 2em;
}

.name {
  text-transform: capitalize;
}
.info_student span {
  margin-top: 0.2em;
  font-size: 1.1em;
  display: block;
}
.bi-person {
  font-size: 3em !important;
}
.bg-primary {
  background: #f77f00 !important;
  border: 1px solid rgb(1, 1, 1) !important;
}
.timetable_disponible {
  text-align: left;
  padding: 0.5em 1.5em;
}
.jour {
  padding: 1em 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.jour span strong {
  margin: 0.5em 0.5em;
  font-size: 9px;
  padding: 0.3em 0.3em;
  color: rgb(3, 70, 70);
  border-radius: 2px;
  text-transform: capitalize;
  background: rgba(0, 255, 255, 0.249);
}
.not_dispo {
  width: 100%;
  padding: 0.69em 1em;
}
.fa-heart {
  color: rgb(185, 185, 185) !important;
}
.ff {
  color: #bcbbbbd3;
}
.text-danger {
  color: rgb(238, 9, 55) !important;
}
.bg-warning {
  background: rgb(25, 53, 90) !important;
}
.btn:focus {
  color: none !important;
}
@media screen and (max-width: 1199px) {
  .jobs_filters {
    margin: 0em 0 2em 0;
  }
  .d-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 992px) {
  .d-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 650px) {
  .d-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  .jobs_filters {
    margin: 0em 0 1em 0;
  }
}
.d-none {
  display: none !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
