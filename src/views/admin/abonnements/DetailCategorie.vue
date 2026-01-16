<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
// import Editor from "@/components/text-editor.vue";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "DetailsCategorie",
  //   components: {
  //     Editor,
  //   },
  data() {
    return {
      entreprise: null,
      abonnements: null,
      detail_categorie: null,
      offres: null,
      spinner: false,
      isLoading: false,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      isDisabled: true,
      data: {
        libelle: "",
      },
    };
  },
  methods: {
    get_details_categorie() {
      this.spinner = true;
      axios
        .get("http://192.168.1.2:8000/api/getCategorie", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          this.detail_categorie = res.data.data.find(
            (item) => item.id == this.$route.params.id
          );
          console.log("detail_categorie", this.detail_categorie);
          this.data.libelle = this.detail_categorie.categorie;
          this.spinner = false;
        });
    },
    handleDescription(e) {
      console.log(e);
      this.data.description = e;
    },
    updateCategorie() {
      this.isLoading = true;
      axios
        .put(
          "http://192.168.1.2:8000/api/editCategorie/" + this.$route.params.id,
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
          this.get_details_categorie();
          this.get_categorie();
          this.isDisabled = true;
        });
    },
    get_categorie() {
      axios
        .get("http://192.168.1.2:8000/api/getCategorie", {
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
          setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
        });
      // .finally(() => {
      //   this.spinner = false;
      // });
    },
  },
  created() {
    this.get_details_categorie();
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
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Détails categorie</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="detail_categorie != null">
      <div class="card-body">
        <div class="row">
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
              @click="updateCategorie"
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
