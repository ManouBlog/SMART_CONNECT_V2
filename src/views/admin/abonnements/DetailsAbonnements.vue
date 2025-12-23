<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import Editor from "@/components/text-editor.vue";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "DetailsAbonnements",
  components: {
    Editor,
  },
  data() {
    return {
      entreprise: null,
      abonnements: null,
      detail_abonnement: null,
      offres: null,
      spinner: false,
      isLoading: false,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      isDisabled: true,
      data: {
        categorie_id: "",
        libelle: "",
        periode: "",
        prix: "",
        description: "",
      },
      categories: [],
    };
  },
  methods: {
    get_details_abonnement() {
      this.spinner = true;
      axios
        .get("http://127.0.0.1:8000/api/getAbonnement", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          this.detail_abonnement = res.data.data.find(
            (item) => item.id == this.$route.params.id
          );
          console.log("detail_abonnement", this.detail_abonnement);
          this.data.categorie_id = this.detail_abonnement.categorie.id;
          this.data.libelle = this.detail_abonnement.libelle;
          this.data.periode = this.detail_abonnement.periode;
          this.data.prix = this.detail_abonnement.prix;
          this.data.description = this.detail_abonnement.description;
          this.spinner = false;
        });
    },
    handleDescription(e) {
      console.log(e);
      this.data.description = e;
    },
    updateAbonnement() {
      this.isLoading = true;
      axios
        .put(
          "http://127.0.0.1:8000/api/admin/updateAbonnement/" +
            this.$route.params.id,
          this.data,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log("TIMETABLE", res);
          this.categories = res.data.data;
          console.log("CATEGORIE", this.categories);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
          this.get_details_abonnement();
          this.get_categorie();
          this.isDisabled = true;
        });
    },
    get_categorie() {
      axios
        .get("http://127.0.0.1:8000/api/getCategorie", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          this.categories = res.data.data;
          console.log("CATEGORIE", this.categories);
        })
        .catch((err) => {
          console.log(err);
        });
      // .finally(() => {
      //   this.spinner = false;
      // });
    },
  },
  created() {
    this.get_details_abonnement();
    this.get_categorie();
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <i class="bi bi-arrow-left-circle" @click="$router.go(-1)"></i>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Détails abonnement</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="detail_abonnement != null">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Catégorie</label>
              <select
                name="categorie"
                id="categorie"
                v-model="data.categorie_id"
                :disabled="isDisabled"
              >
                <option value="" disabled>Sélectionne une catégorie</option>
                <option
                  :value="item.id"
                  v-for="(item, index) in this.categories"
                  :key="index"
                >
                  {{ item.categorie }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Libelle</label>
              <input
                :disabled="isDisabled"
                v-model="data.libelle"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Période</label>
              <input
                v-model="data.periode"
                class="form-control"
                type="number"
                min="0"
                :disabled="isDisabled"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Prix (Fcfa)</label>
              <input
                :disabled="isDisabled"
                v-model="data.prix"
                class="form-control"
                type="number"
                min="10"
              />
            </div>
          </div>
          <div class="col-sm-9 col-md-9 text-start p-2" v-if="isDisabled">
            <label class="form-label">Description</label>
            <div
              style="
                width: 100%;
                background: #e9ecef;
                border-radius: 10px;
                padding: 0.5em;
              "
              v-html="data.description"
            ></div>
          </div>
          <div class="col-lg-12" v-else>
            <div class="mb-3 text-start">
              <label>Description</label>
              <div class="conteneur_editor">
                <editor
                  @update:modelValue="handleDescription"
                  :modelValue="data.description"
                  v-model="data.description"
                />
              </div>
            </div>
          </div>

          <div class="text-end">
            <button
              class="btn-lg bg-primary"
              v-if="isDisabled"
              @click="isDisabled = !isDisabled"
            >
              Modifier
            </button>
            <button
              :disabled="isLoading"
              class="btn-lg bg-success"
              v-else
              @click="updateAbonnement"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
h4 {
  text-align: left;
}
</style>
