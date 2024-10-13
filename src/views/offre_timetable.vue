<script>
import instance from "../api/api";
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
import {configUtils} from "../Shared/Utils";
import {useLoadingSpinner} from "../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner()
export default {
  name: "Offre_timetable",
  components: { VueMultiselect },
  data() {
    return {
      configUtils:configUtils,
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
    };
  },
  computed: {
    list_offre() {
      return this.filtreOffre();
    },
  },
  methods: {
    selectCategorie(cat) {
      this.MylistOffre = [];
      this.hideButtons = true;
      this.MylistsOffres.find((element) => {
        if (element.categorie.categorie === cat) {
          this.MylistOffre.push(element);
        }
      });
    },
    filtreOffre() {
      if (this.searchLieu !== "") {
        return this.MylistOffre.filter((item) => {
          let lieu = item.lieu.toLowerCase().includes(this.searchLieu.toLowerCase());
          let offre = item.nom_offre
            .toLowerCase()
            .includes(this.searchName.toLowerCase());
          if (lieu && offre) {
            return item;
          }
        });
      } else if (this.searchName !== "") {
        return this.MylistOffre.filter((item) => {
          return item.nom_offre.toLowerCase().includes(this.searchName.toLowerCase());
        });
      }

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
    FiltreWithLoadMore(a, b, c) {
      for (let i = 0; i < a; i++) {
        const element = b[i];
        c.push(element);
      }
    },
    findElement() {
      this.list_offre = [];
      this.MylistsOffres.find((element) => {
        if (
          element.categorie == this.categorie &&
          element.lieu == this.searchLieu &&
          element.nom_offre == this.searchName
        ) {
          this.MylistOffre.push(element);
        }
      });
    },
    async get_list_offre() {
   loadingSpinner.launchLoading(true)
      await instance
        .get("list_offres")
        .then((res) => {
          console.log("list_offres", res);

          if (res.data.status) {
            this.MylistOffre = res.data.data.filter(item=>{
              return JSON.stringify(new Date().toISOString().substring(0, 10)) <
   JSON.stringify(new Date(item.fin).toISOString().slice(0, 10))
            });
            this.MylistsOffres = res.data.data.filter(item=>{
              return JSON.stringify(new Date().toISOString().substring(0, 10)) <
   JSON.stringify(new Date(item.fin).toISOString().slice(0, 10))
            });
            this.lengthOfMylistOffre = this.MylistsOffres.length;
         
          }
          loadingSpinner.launchLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    newLoadmore() {
      if (this.length > this.MylistOffre.length) return;
      this.length = this.length + 3;
    },
    get_list_categorie() {
      instance.get("seeCategorie").then((res) => {
        console.log(res);
        this.list_categorie = res.data.data;
        console.log("CATEGORIE", this.list_categorie);
      });
    },
    post(id) {
      console.log("ID_OFFRE", id);
      instance
        .post("postule_offre", {
          offre_id: id,
        })
        .then((res) => {
          console.log(res);
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
      console.log(newTag);
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
  },
  mounted() {
    this.get_list_offre();
    this.get_list_categorie();
    this.dayOfday = JSON.stringify(new Date().toISOString().substring(0, 10));
    console.log("MADATE", JSON.stringify(new Date()));
  },
};
</script>
<template>
  <section>
    <div class="jobs_filters">
      <div class="container-fluid">
        <form>
          <div>
            <div class="form-group">
              <VueMultiselect
                v-model="categorie"
                :options="list_categorie"
                :multiple="true"
                :taggable="true"
                :tag="addTag"
                @update:model-value="addTag"
                label="categorie"
                track-by="categorie"
                placeholder="selectionne une categorie"
              >
              </VueMultiselect>
            </div>
          </div>

          <div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="serveur,barman,jardinier"
                v-model="searchName"
              />
              <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
            </div>
          </div>

          <div>
            <div class="form-group position-relative">
              <input
                type="text"
                class="form-control"
                placeholder="ex: Angre"
                v-model="searchLieu"
              />
              <span class="glyphicon fa fa-location-arrow" aria-hidden="true"></span>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="container-fluid main-container" v-if="list_offre">
      <div class="col-lg-12" :class="spinner ? 'conteneur_offre' : null">
        <div class="offres_disponible d-flex justify-content-between align-items-center">
          <h5 class="image-heading">
            <span class="list_offre"> {{ lengthOfMylistOffre }}</span> Offres
          </h5>
          <span class="text-secondary"
            >Nous avons trouvé {{ lengthOfMylistOffre }} Offres</span
          >
        </div>
        <div
          class="container_result content"
          v-for="(offre, index) in list_offre"
          :key="index"
        >
          <section class="one conteneur_ecriteau">
            <div class="logo_img_offre">
              <div class="conteneur-image-logo_jobs">
                <img src="/smart-connect.png" alt="smart-connect" >
            </div>
            </div>
            <div class="informations_offres">
              <span
                class="badge bg-danger badge_new"
                :class="configUtils.showJobNew(offre.created_at) ? null : 'd-none'
                "
                >New</span
              >
              <h1>{{ offre.nom_offre }}</h1>
              <span class="lieu"><em class="bi bi-geo-alt"></em> {{ offre.lieu }}</span>
              <h1 class="badge badge_categorie">{{ offre.categorie.categorie }}</h1>
              <div v-html="offre.description" id="conteneur-description" class="ellipse_text">
              </div>
            </div>
          </section>
          <div class="two my-3">
            <div>
              <h6>
                <em class="bi bi-calendar-date"></em>
                {{ new Date(offre.debut).toLocaleDateString("fr") }} au
                {{ new Date(offre.fin).toLocaleDateString("fr") }}
              </h6>
              <router-link :to="{ name: 'OffreDetail', params: { id: offre.id } }">
                <button
                  :class="configUtils.ifJobIsEnd(offre.fin) ? 'd-none':null
                  "
                  class="btn btn-Conex"
                >
                  Voir les Détails <em class="bi bi-eye"></em>
                </button>
              </router-link>
              <strong
                class="text-danger"
                v-if="configUtils.ifJobIsEnd(offre.fin)"
                >Offre Expirée</strong
              >
            </div>
          </div>
        </div>
        <div>
          <div class="col-lg-12 lgPlus" v-if="MylistOffre.length">
            <button
              @click="newLoadmore"
              v-if="length < MylistOffre.length"
              class="btn-lg bg-primary"
            >
              Charger plus <em class="bi bi-chevron-down"></em>
            </button>
            <h2 v-if="length >= MylistOffre.length || length >= MylistsOffres.length">
              Vous avez atteint la fin
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.main-container{
  padding:0 2em;
}
.conteneur-image-logo_jobs {
  width: 100px;
  height:50px;
  position: relative;
}
.conteneur-image-logo_jobs img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
form{
  display: flex;
  align-items: center;
  place-content: center;
  gap:1em;
  flex-wrap: wrap;
}

.form-group {
  position:relative;
  width:400px !important;
}
.glyphicon {
  position:absolute;
  right:1em;
  top:10px;
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
  justify-content: flex-start;
  align-items: flex-start;
  gap:1em;
  flex-wrap: wrap;
}
.d-none {
  display: none !important;
}
.green-banner {
  background: rgb(155, 184, 223);
}
.jobs_filters {
  padding: 2em 0;
  margin: 2em 0;
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: rgba(179, 201, 255, 0.38);
  padding: 2em 1em;
  border-radius: 10px;
  flex-wrap: wrap;
  margin: 1em 0;
}
.container_result .two button {
  margin: 0 1em !important;
}
.badge {
  display: block;
}
.badge_categorie {
  width: 100px !important;
  background: #f77f00 !important;
}
.badge_new {
  width: 50px !important;
  position: absolute;
  right: 1em;
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
.lgPlus {
  margin: 5em 0;
}
.list_offre {
  color: #f77f00 !important;
}
.btn-Conex {
  background: #f77f00 !important;
  color: white;
  border: 1px solid black;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
