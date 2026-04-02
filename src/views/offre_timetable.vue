<script>
import instance, { lienPhoto } from "../api/api";
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
import { configUtils } from "../Shared/Utils";
import { mapActions } from "pinia";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";

const RegisterStore = useRegisterStore();
const loadingSpinner = useLoadingSpinner();
export default {
  name: "Offre_timetable",
  components: { VueMultiselect },
  data() {
    return {
      list_countries:[{id:1,label:"Côte d'Ivoire"},{id:3,label:"Sénégal"},
      {id:4,label:"Mali"},{id:5,label:"Burkina Faso"},
      {id:6,label:"Niger"},{id:7,label:"Togo"},
      {id:8,label:"Bénin"},{id:9,label:"Ghana"},{id:10,label:"Guinée"}],
      selectedCountries: [],
      texte: "",
      texte1: "",
      texte2: "",
      texte3: "",
      texte4: "",
      texte5: "",
      texte6: "",
      lienPhoto: lienPhoto,
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
      texte27: "",
      configUtils: configUtils,
      MylistOffre: [],
      compte: 2,
      longueur: null,
      offre_id: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      show_button: true,
      searchLieu: "",
      searchName: "",
      list_categorie: "",
      length: 3,
      categorie: "",
      listOffre: [],
      newTableau: [],
      FilterLieu: null,
      MylistsOffres: [],
      lengthOfMylistOffre: "",
      hideButtons: false,
      spinner: false,
      showEndResearch: false,
      moreExist: false,
      nextPage: 0,
      user: this.$store.state.user,
      dayOfday: "",
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    isFormValid() {
    return (
      this.categorie?.length > 0 ||
      this.selectedCountries?.length > 0 ||
      this.searchName?.trim() !== '' ||
      this.searchLieu?.trim() !== ''
    );
  },
    list_offre() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      console.log("end", end);
      console.log("start", start);
      console.log("computed_listOffre",this.MylistOffre);
      return this.MylistOffre.slice(start, end);
    },
    fieldSearch() {
      return !this.searchName || !this.categorie || !this.searchLieu;
    },
  },
  methods: {
    handleSearchClick() {
      this.list_offre.length > 0 ? this.searchOffres() : this.get_list_offre();
    },
    searchOffres() {
      const dataSearch = {
        categorie: this.categorie.length ? this.categorie?.map((item) => item?.id) : [],
        nom_offre: this.searchName,
        lieu: this.searchLieu,
        pays: this.selectedCountries.length ? this.selectedCountries?.map((item) => item?.id) : [],
      };
      console.log("dataSearch", dataSearch);
      this.get_list_offre(dataSearch);
    },
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    // selectCategorie(cat) {
    //   this.MylistOffre = [];
    //   this.hideButtons = true;
    //   this.MylistsOffres.find((element) => {
    //     if (element.categorie.categorie === cat) {
    //       this.MylistOffre.push(element);
    //     }
    //   });
    // },
    async handleListOffresWithoutSearch() {
      loadingSpinner.launchLoading(true);
      await instance
        .get("list_offres")
        .then((res) => {
          console.log("list_offres23", res.data.data);
          if (res.data.status) {
            this.MylistOffre = res.data.data.filter((item) => {
             return new Date(item.fin) >= new Date();
            });
            console.log("MylistOffre23", this.MylistOffre);
            this.MylistsOffres = res.data.data.filter((item) => {
             return new Date(item.fin) >= new Date();
            });
            this.lengthOfMylistOffre = this.MylistsOffres.length;
          }
        })
        .catch((err) => {
          // console.log(err)
          console.log(err);
          RegisterStore.changeValueIsModal();
        })
        .finally(() => {
          loadingSpinner.launchLoading(false);
        });
    },
    handleListOffresWithSearch(data) {
      // console.log("handleListOffresWithSearch")
      loadingSpinner.launchLoading(true);
      instance
        .post("search_offres", data)
        .then((res) => {
          // console.log("search_offres", res);
          if (res.data.status) {
            // this.listOffre = res.data.data;
            this.MylistOffre = res.data.data.filter((item) => {
            
             return new Date(item.fin) >= new Date();
            });
            this.MylistsOffres = res.data.data.filter((item) => {
              return new Date(item.fin) >= new Date();
            });
            this.lengthOfMylistOffre = this.MylistsOffres.length;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loadingSpinner.launchLoading(false);
        });
    },
    get_list_offre(search = null) {
      if (!search) {
        this.handleListOffresWithoutSearch();
      } else {
        this.handleListOffresWithSearch(search);
      }
    },
    filtreOffre() {
      return this.MylistOffre.slice(0, this.length);
    },
    Myfiltre() {
      this.compte += 1;
      let array = [];
      for (let i = 0; i < this.compte; i++) {
        let element = this.MylistsOffres[i];
        array.push(element);
      }
      this.MylistOffre = array;

      if (this.lengthOfMylistOffre === this.MylistOffre.length) {
        this.showEndResearch = true;
        this.hideButtons = true;
      }
    },
    filtre() {
      if (this.compte) {
        this.Myfiltre();
      }
    },
   
    newLoadmore() {
      if (this.length > this.MylistOffre.length) return;
      this.length = this.length + 3;
    },
    get_list_categorie() {
      instance.get("seeCategorie").then((res) => {
        // console.log(res);
        this.list_categorie = res.data.data;
        // console.log("CATEGORIE", this.list_categorie);
      });
    },
    post(id) {
      // console.log("ID_OFFRE", id);
      instance
        .post("postule_offre", {
          offre_id: id,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: err.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    addTag(newTag) {
      // console.log(newTag);
      this.Myarray = [];
      this.MylistOffre = [];
      this.MylistsOffres.forEach((element) => {
        newTag.forEach((e) => {
          if (element.categorie.categorie.includes(e.categorie)) {
            this.Myarray.push(element);
          }
        });
      });
      this.MylistOffre = [...new Set(this.Myarray)];
      if (!newTag.length) {
        this.MylistOffre = this.MylistsOffres;
      }
    },
     goToOffre(id) {
      if (!id) return
      this.$router.push({
        name: 'OffreDetail',
        params: { id }
      })
    },
      async verifUserProfilEtudiantComplet() {
      await this.$store.dispatch("getInfoUser")
  const user = this.$store.state.infoUserConnected;
  // console.log("USER_INFO",user)
  if(user.user.statut.statut === 'etudiant'){
if (!user.competences.length || !user.qualifications.length) {
    this.$router.push('/dashboard/profil');
   }
   if(!user.jours.length){
    this.$router.push('/dashboard/emploi_du_temps');
   }
  }
  
}
  },
  async created() {
    this.verifUserProfilEtudiantComplet();
    this.texte = await this.handleTranslate(`Sélectionnez domaine`);
    this.texte1 = await this.handleTranslate(`Nom de l'offre`);
    this.texte2 = await this.handleTranslate("Ex:Lieu (Angré cocody)");
    this.texte3 = await this.handleTranslate("Offres");
    this.texte4 = await this.handleTranslate("Nous avons trouvé");
    this.texte5 = await this.handleTranslate("Nouveauté");
    this.texte6 = await this.handleTranslate("Voir les Détails");
    this.texte7 = await this.handleTranslate("Offre Expirée");
    this.texte8 = await this.handleTranslate("Charger plus");
    this.texte9 = await this.handleTranslate(`Vous avez atteint la fin`);
    this.texte10 = await this.handleTranslate("ex: Angre");
    this.texte11 = await this.handleTranslate("Offres");
    this.texte12 = await this.handleTranslate("Nous avons trouvé");
    this.texte13 = await this.handleTranslate("Nouveauté");
    this.texte14 = await this.handleTranslate("Voir les Détails");
    this.texte15 = await this.handleTranslate("Offre Expirée");
    this.texte16 = await this.handleTranslate("Charger plus");
  },
  mounted() {
    this.get_list_offre();
    this.get_list_categorie();
    this.dayOfday = JSON.stringify(new Date().toISOString().substring(0, 10));
  },
};
</script>
<template>
  <section class="myconteneur">
    <div class="jobs_filters">
       <div class="container-fluid">
        <form>
          <div>
              <VueMultiselect
                v-model="categorie"
                :options="list_categorie"
                :multiple="true"
                :taggable="true"
                :tag="addTag"
                label="categorie"
                track-by="categorie"
                :placeholder="texte"
              >
              </VueMultiselect>
  
            </div>
            <div>
        <VueMultiselect
          v-model="selectedCountries"
          :options="list_countries"
          :multiple="true"
          label="label"
          track-by="id"
          placeholder="Sélectionnez plusieurs pays"
        />
      </div>
         <div>
              <input
                type="text"
                class="form-control"
                style="min-height: 40px !important;"
                :placeholder="texte1"
                v-model="searchName"
              />
              <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
            </div>

           <div class="position-relative">
              <input
                type="text"
                class="form-control"
                style="min-height: 40px !important;"
                :placeholder="texte2"
                v-model="searchLieu"
              />
              <span class="glyphicon fa fa-location-arrow" aria-hidden="true"></span>
            </div>
           <div>
        
    </div>
          <div>
            <button
         class="btn-search btn"
         :disabled="!isFormValid"
         @click.prevent="handleSearchClick"
         >
         Rechercher
         </button>
            <!-- <button
              :disabled="!fieldSearch && !list_offre.length"
              :class="!fieldSearch ? null : 'bg-primary'"
              class="btn"
              @click.prevent="handleSearchClick"
            >
              Rechercher
            </button> -->
            <span
              v-if="!list_offre.length"
              @click.prevent="handleSearchClick"
              style="color: orange; font-weight: bold; cursor: pointer"
            >
               Toutes
            </span>
          </div>
        </form>
      </div> 
    </div>

    <div class="container-fluid main-container">
      <div class="col-lg-12" :class="spinner ? 'conteneur_offre' : null">
        <div
          class="offres_disponible d-flex flex-wrap justify-content-between align-items-center text-center text-md-start py-3 px-2"
        >
          <h5 class="image-heading mb-2 mb-md-0">
            <span class="list_offre">{{ lengthOfMylistOffre }}</span>
            {{ lengthOfMylistOffre > 1 ? texte3 : "Offre" }}
          </h5>

          <span class="text-secondary small small-md-normal">
            {{ texte4 }} {{ lengthOfMylistOffre }}
            {{ lengthOfMylistOffre > 1 ? texte3 : "Offre" }}
          </span>
        </div>
        <section
          style="
            display: flex;
            justify-content: center;
            place-content: center;
            gap: 1em;
            flex-wrap: wrap;
          "
        >
          <div
            class="container_result"
            v-for="(offre, index) in list_offre"
            :key="index"
            @click.prevent="goToOffre(offre.id)"
          >
            <section class="one conteneur_ecriteau">
              <div class="logo_img_offre">
                <div class="conteneur-image-logo_jobs">
                  <img
                    :src="
                      offre?.entreprise?.logo
                        ? lienPhoto + offre?.entreprise?.logo
                        : '/brobroli.png'
                    "
                    :alt="offre?.entreprise?.logo ? offre?.entreprise?.logo : 'smart-connect'"
                  />
                </div>
              </div>
              <div class="informations_offres">
                <span
                  class="badge bg-danger badge_new"
                  :class="configUtils.showJobNew(offre.created_at) ? null : 'd-none'"
                  >{{ texte5 }}</span
                >
                <h1 style="font-size: 1em; margin: 0.5em 0">{{ offre.nom_offre }}</h1>
                <span class="lieu"><em class="bi bi-geo-alt"></em> {{ offre.lieu }}</span>
                <br />
                <span><em class="bi bi-cash"></em> Rémuneration :</span>
                <span style="font-weight: bold; color: orange; margin: 0 0.5em"
                  >{{ new Intl.NumberFormat("fr-FR").format(offre.salaire) }} Fcfa /
                  {{ offre.pointage }}</span
                >
              </div>
            </section>
            <div class="two my-1">
              <div>
                <h6>
                  <em class="bi bi-calendar-date"></em>
                  <!-- {{ new Date(offre.debut).toLocaleDateString("fr") }} au -->
                  Date limite pour postuler :
                  {{ new Date(offre.fin).toLocaleDateString("fr") }}
                </h6>
                <router-link class="see_detail" :to="{ name: 'OffreDetail', params: { id: offre.id } }">
                  <button
                   
                    class="btn btn-Conex"
                  >
                  
                    {{ texte6 }} <em class="bi bi-eye"></em>
                  </button>
                </router-link>
                <!-- <strong class="text-danger" v-if="configUtils.ifJobIsEnd(offre.fin)">{{
                  texte7
                }}</strong> -->
              </div>
            </div>
          </div>
        </section>

        <div
          v-if="!list_offre.length"
          class="text-center fw-bold py-5 my-5 d-flex flex-column align-items-center justify-content-center"
        >
          <h2 class="mb-4 fs-4 fs-md-3">Pas d'offres</h2>
          <img
            src="/notOffers.png"
            alt="Aucune offre disponible"
            class="img-fluid"
            style="max-width: 350px"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center my-4" v-if="MylistOffre.length > 0">
      <n-pagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :item-count="MylistOffre.length"
        show-size-picker
        :page-sizes="[5, 10, 20]"
        @update:page="currentPage = $event"
        @update:page-size="
          (size) => {
            pageSize = size;
            currentPage = 1;
          }
        "
      />
    </div>
  </section>
</template>
<style scoped>
.btn-search:hover {
  background: #f77f00;
}
.btn-search {
  background: #f77f00;
  color: white;
  border: 1px solid black;
}

.btn-search:disabled {
  background: #999898;
  cursor: not-allowed;
}

:deep(.n-pagination) {
  margin-top: 2em;
  display: flex;
  justify-content: center;
}
.main-container {
  padding: 0 2em;
}
.conteneur-image-logo_jobs {
  width: 80px;
  height: 80px;
  position: relative;
}
.conteneur-image-logo_jobs img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: contain;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
form {
  display: flex;
  align-items: center;
  place-content: center;
  gap: 1em;
  flex-wrap: wrap;
}

.form-group {
  position: relative;
  width: 400px !important;
}
.glyphicon {
  position: absolute;
  right: 1em;
  top: 10px;
  z-index: 9;
}

.one {
  text-align: left;
}
.logo_img_offre {
  width: auto;
  height: auto;
  padding: 0.5em;
  text-align: center;
  line-height: 80px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.053);
  background: white;
}
.informations_offres {
  padding: 0 1em;
}
.conteneur_ecriteau {
  display: flex;
}
.d-none {
  display: none !important;
}
.green-banner {
  background: rgb(155, 184, 223);
}
.jobs_filters {
  padding: 2em 0;
  /* margin: 2em 0; */
}
.image-heading {
  color: black !important;
}
#load_more,
.filter-result:hover {
  border: 2px solid rgb(5, 35, 73) !important;
}
.bg-info {
  border: none !important;
  position: absolute !important;
  right: 0.5em;
  bottom: -2em;
}
select {
  height: inherit;
  padding: 20px 28px 20px 20px;
  border-radius: 11px;
  font-size: 14px;
  font-family: OpenSansSemibold;
  color: #333;
  border: none;
}
.offres_disponible {
  text-align: left;
}
.container_result {
  cursor:pointer;
  display: flex;
  gap: 1em;
  align-items: center;
  background: var(--secondary-color) !important;
  color: var(--third-color) !important;
  padding: 2em 1em;
  border-radius: 10px;
  flex-wrap: wrap;
  margin: 1em 0;
  width: 400px;
}

.badge {
  display: block;
}
.badge_categorie {
  min-width: 100px !important;
  background: #f77f00 !important;
}
.badge_new {
  width: 80px;
  margin: 0.5em 1em;
  animation: move 1s ease-in-out infinite alternate;
}
@keyframes move {
  from {
    transform: scale(1.2, 1.2);
  }
  to {
    transform: scale(1, 1);
  }
}
.two h5 {
  text-align: right !important;
}
.bg-primary {
  background: #f77f00 !important;
  border: 1px solid rgb(1, 1, 1) !important;
}
.btn:hover {
  border: 1px solid rgb(0, 0, 0) !important;
}
:deep(.multiselect__option--highlight) {
  background: orange;
}
:deep(.multiselect__tag) {
  background: orange !important;
}

.list_offre {
  color: #f77f00 !important;
}
.btn-Conex {
  background: #f77f00 !important;
  color: white;
  border: 1px solid black;
}
@media (max-width: 768px) {
  .see_detail{
    display:none;
  }
  .container_result {
    width: 500px;
  }
  .form-group {
    width: 350px !important; /* Pleine largeur sur mobile */
  }
  .jobs_filters {
    padding: 1em 0; /* réduit le padding vertical */
    /* margin: 0.5em 0;  */
  }
  .main-container {
    padding: 0;
  }
  .container_result {
    justify-content: flex-start;
  }
  .container_result .two button,
  .informations_offres {
    margin: 0 !important;
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
