<script>
import instance from "../../../api/api";
import Swal from "sweetalert2";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner();
export default {
  name: "Détails_entreprise_view",
  components: {
    HeaderDashboard,
  },
  data() {
    return {
      entreprise: null,
      offres: null,
      spinner: false,
      details_offre: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      showModal: false,
      Statut: {
        1: "Candidature retenue",
        2: "Candidature non retenue",
        0: "Candidature en cours d’examen",
      },
      statutColor: {
        1: "bg-success",
        2: "bg-danger",
        0: "bg-info",
      },
      avis: "",
      numberRate: "",
    };
  },
  methods: {
    get_details_offres_postule() {
      loadingSpinner.launchLoading(true);
      instance.get("offres_postulees/"+this.$route.params.id).then((res) => {
        // console.log("DETAILS_get_offres_postule", res);
        this.details_offre = res.data.data;
        loadingSpinner.launchLoading(false);
        // console.log("DETAILS_OFFRES", this.details_offre);
      });
    },
    getNumber(e) {
      this.numberRate = e;
    },
    noterEntreprise() {
      // // console.log("NOTATION", this.detailsStudents.id);
      instance
        .post("rate_entreprise", {
          offre_id: this.$route.params.id,
          student_id: this.details_offre.pivot.student_id,
          avis: this.avis,
          notes: this.numberRate,
        })
        .then((res) => {
          // // console.log(res);
          if (res.data.status === false) {
            Swal.fire({
              icon: "info",
              title: res.data.message,
              showConfirmButton: true,
            });
          }
          if (res.data.status) {
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
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <section v-if="this.details_offre != null">
      <HeaderDashboard
        :TitleHeader="details_offre.offre.statuses.some(item=>item.statut === 'Artisan') ? `Détails de la mission`: `Détails de l' Offre`"
        :subTitleHeader="details_offre.offre.statuses.some(item=>item.statut === 'Artisan') ? `Détails de la mission`: `Détails de l' Offre`"
      />
      <!-- <pre>{{details_offre.offre.statuses}}</pre> -->
      <n-modal v-model:show="showModal">
        <n-card
          style="width: 600px"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <h1>Evaluation du service</h1>
          <h2 class="text-center my-3"></h2>
          <div class="text-center my-3">
            <n-rate size="large" :value="numberRate" :on-update:value="getNumber" />
          </div>
          <div>
            <label for="comment">Commentaire</label>
            <textarea v-model="avis" name="" id="" cols="30" rows="10" class="w-100">
            </textarea>
          </div>

          <div class="text-center">
            <button class="btn mx-3 bg-warning" @click="noterEntreprise">
              Envoyer
            </button>
            <button class="btn mx-3 bg-danger" 
            @click="showModal = !showModal">Plus tard</button>
          </div>
        </n-card>
      </n-modal>
      <div class="container-fluid">
        <div class="details_entreprise card">
          <span class="badge my-2" :class="statutColor[details_offre.offre.recruit]">{{
              Statut[details_offre.offre.recruit]
            }}</span>
          <h4>
            Offre : <strong>{{ details_offre.offre.nom_offre }}</strong>
          </h4>
          <h4>
            Lieu : <strong>{{ details_offre.offre.lieu }}</strong>
          </h4>
          <span v-if="details_offre.offre.salaire != null" class="badge bg-warning">
            Honoraire : {{ moneyFormat.format(details_offre.offre.salaire) }} Fcfa</span
          >
          <span v-else class="text-light badge bg-primary"
            >Honoraire pas fixé</span
          >
          
         <div class="my-3" v-if="details_offre?.offre?.countries?.length">

          <div class="d-flex align-items-center flex-wrap">
            Pays :
         <span 
         v-for="country in details_offre?.offre.countries" 
         :key="country.id"
        class="badge bg-warning text-dark mx-2 my-3"
        style="border-radius: 3px;"
        >
          {{ country.label }}
          </span>
          </div>
        
        </div>
        <div>
         <h4>Description :</h4>
          <div class="p-5" v-html="details_offre.offre.description"></div>
        </div>
          <h6
           v-if="details_offre?.offre.debut"
            >Date et heure début  :
            {{
              details_offre?.offre.debut
            }}</h6
          >
          <h6 v-if="details_offre.offre.fin">
            Date limite de candidature : {{ details_offre.offre.fin }}
          </h6>
          <h6 v-if="details_offre.offre.job_debut" >
            Date de début de travail : {{ details_offre.offre.job_debut.split(' ')[0] }}
          </h6>
          <h6 v-if="details_offre.offre.job_fin">
            Date de fin de travail : {{ details_offre.offre.job_fin }}
          </h6>
          <button
            v-if="
              details_offre.recruit === 1 &&
              JSON.stringify(new Date().toISOString().substring(0, 10)) >
                JSON.stringify(
                  new Date(this.details_offre.offre.fin).toISOString().slice(0, 10)
                )
            "
            class="btn bg-warning mt-3"
            @click="showModal = !showModal"
          >
            Evaluer le service
          </button>
        </div>
      </div>
    </section>
    <div v-else style="min-height: 60vh;" class="shimmer-text">
      <p style="text-align:center;padding:1em;font-size: 1.5em;">Chargement...</p>
    </div>
  </div>
</template>

<style scoped>
.shimmer-text {
  font-weight: 600;
  background: linear-gradient(
    90deg,
    #999 0%,
    #fff 50%,
    #999 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
h6{
  font-size: 1em !important;
}
h4{
  margin: 1em 0;
}
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
  padding: 2em;
  background: #25535f;
  color: white;
  margin-bottom: 1em;
}
.w-25 {
  width: 120px !important;
}
.badge {
  color: white !important;
  font-weight: bold !important;
}
</style>
