<script>
import instance from "../api/api";
import Swal from "sweetalert2";
// import RotateLoader from "vue-spinner/src/RotateLoader.vue";
export default {
  name: "OffreDetails",
  // components: { RotateLoader },
  data() {
    return {
      Offre: "",
      list_offre: "",
      moneyFormat: new Intl.NumberFormat("de-DE"),
      user: this.$store.state.user,
      loadSpinner: false,
      path: "",
      listEntrepriseOffre: [],
    };
  },
  methods: {
    get_list_offre() {
      this.loadSpinner = true;
      instance.get("list_offres")
        .then((res) => {
          console.log("list_offres",res);
          this.list_offre = res.data.data;
          this.Offre = this.list_offre.find(
            (item) => item.id == this.$route.params.id
          );
          this.list_offre.forEach((el) => {
            if (el.entreprise.nom === this.Offre.entreprise.nom) {
              this.listEntrepriseOffre.push(el);
            }
          });
          this.loadSpinner = false;
          console.log("OFFRES", this.list_offre);
          console.log("OFFRE", this.Offre);
          console.log("LIST ENTREPRISE", this.listEntrepriseOffre);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendDataPost(id) {
      this.loadSpinner = true;
      instance.post(
          "postule_offre",
          {
            offre_id: id,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.loadSpinner = false;
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "info",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.loadSpinner = false;
          }
        })
        .catch((err) => {
          console.log(err);
          // Swal.fire({
          //   icon: "error",
          //   title: "Veuillez-vous connecter",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          // setTimeout(() => {
          //   this.$router.push({
          //     path: "/registre",
          //      query: { redirect: this.path }
          //   })
          // })
          this.loadSpinner = false;
        });
    },
    verfEnter() {
      if (this.user && this.user.user.statut.statut === "entreprise") {
        Swal.fire({
          icon: "error",
          title: "Vous n'êtes pas autorisé.",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      }
    },
  },
  created() {
    this.get_list_offre();
    this.path = window.location.pathname;
    this.verfEnter();
  },
};
</script>
<template>
  <!-- <div class="loading" v-show="loadSpinner">
    <RotateLoader :loading="true"></RotateLoader>
  </div> -->

  <div class="container-fluid page-title bg-image">
   
  </div>

  <div class="position-relative">
    
    <div class="jobs_filters">
      <div class="container blueprint p-5">
        <h1>{{ Offre.nom_offre }}</h1>
      </div>
    </div>
    <div class="container main-container" v-if="Offre">
      <div class="col-lg-12">
        <div class="offres_disponible row container">
          <div class="col-md-3 col-sm-12">
            <h4 class="detail_offre">Détails de l'offre</h4>
            <h2 class="fw-bold nom_offre">{{ Offre.nom_offre }}</h2>
            <hr />
            <h2><em class="bi bi-geo-alt"></em> {{ Offre.lieu }}</h2>
            <hr />
            <h5 v-if="Offre.salaire != null">
              <em class="bi bi-cash-stack"></em>
              {{ moneyFormat.format(Offre.salaire) }} Fcfa /
              {{ Offre.pointage }}
            </h5>
            <h5 v-else><em class="bi bi-cash-stack"></em> Prime pas fixée</h5>
            <hr />
            <h5><em class="bi bi-building"></em> {{ Offre.entreprise.nom }}</h5>
            <br />
            <br />

            <div>
             <p class="text-danger" v-if="Offre.nbre_person">
              Recherche : {{Offre.nbre_person}} Personnes</p>
              <button
               :disabled="loadSpinner ? true:false"
               class="btn-lg bg-dark"
               @click="sendDataPost(Offre.id)">
                {{loadSpinner ? 'Loading...':'Postuler'}} <em class="bi bi-send"></em>
              </button>
            </div>
          </div>
          <div class="col-md-9 col-sm-12 entreprise">
            <h1>Description</h1>
            <div v-html="Offre.description" id="conteneur_description">
            </div>
            <h1>Entreprise</h1>
            <span>
              <em class="bi bi-building"></em> {{ Offre.entreprise.nom }}</span
            >
            <span>
              <em class="bi bi-envelope"></em>
              {{ Offre.entreprise.email }}</span
            >
            <br />
            <br />
            <span
              >Date et heure début  :
              {{ Offre.debut }}</span
            >
            <span
              >Date et heure fin  :
              {{ Offre.fin }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="conteneur-chargement" v-else>
      <h1>Chargements....</h1>
    </div>

  </div>
</template>
<style scoped>
.conteneur-chargement{
  height: 80vh;
  width: 100%;
  display: flex;
  place-content: center;
  justify-items: stretch;
  text-align: center;
}


.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  place-items: center;
  z-index: 99;
}
.image-heading {
  color: black;
}

.offres_disponible h4,
.offres_disponible h5,
p,
.nom_offre {
  text-align: left;
}
span {
  text-align: left;
}
.detail_offre {
  font-weight: 900 !important;
  color: orange;
}
.spinner-border {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(190, 189, 189, 0.289);
  display: flex;
  justify-content: center;
  place-items: center;
  align-items: center;
}
.hideOffreIfUserIsBuisness {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(21, 21, 21, 0.886);
  display: flex;
  justify-content: center;
  place-items: center;
  align-items: center;
}
.entreprise span {
  display: block;
}
.entreprise {
  padding: 0 5em;
  text-align: center;
}

.blueprint h1 {
  color: white;
  font-size: 3em;
}
.entreprise h1 {
  text-align: left;
  color: orange;
}
.blueprint h1::first-letter {
  font-size: 4em;
}
button {
  width: 100% !important;
  border: 0;
}
.jobs_filters {
  box-shadow: none !important;
}
</style>
