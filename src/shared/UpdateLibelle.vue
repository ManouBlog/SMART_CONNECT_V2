<script>
/* eslint-disable */
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      categorie: null,
      categories: null,
      spinner: true,
      loading: false,
      detailItem: null,
    };
  },
  methods: {
    async create_categorie() {
      await axios
        .post(
          "http://backend.monbrobroli.com/api/categorie",
          {
            categorie: this.categorie,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status == true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.categorie = "";
          }
          if (res.data.status == false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          this.get_categorie(1);
        });
    },
    launchRoute() {
      if (this.$route.params.name === "categorie") {
        this.get_categorie();
      } else {
        this.get_competence();
      }
    },
    get_categorie(isLoading = null) {
      if (isLoading === 1) {
        this.spinner = false;
      }
      axios
        .get("http://backend.monbrobroli.com/api/seeCategorie", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          res.data.data.find((item) => {
            if (item.id == this.$route.params.id) {
              this.detailItem = item.categorie;
              console.log("this.detailItem", this.detailItem);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    get_competence(isLoading = null) {
      if (isLoading === 1) {
        this.spinner = false;
      }
      axios
        .get("http://backend.monbrobroli.com/api/GetAllCompetences", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          res.data.data.find((item) => {
            if (item.id == this.$route.params.id) {
              this.detailItem = item.competence;
              console.log("this.detailItem", this.detailItem);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    async update_items() {
      this.spinner = true;
      const data =
        this.$route.params.name === "categorie"
          ? {
              categorie: this.detailItem,
            }
          : { competence: this.detailItem };
      const route =
        this.$route.params.name === "categorie"
          ? "update_categorie"
          : "update_competence";
      axios
        .put(
          "http://backend.monbrobroli.com/api/admin/" +
            route +
            "/" +
            this.$route.params.id,
          data,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log("TIMETABLE", res);
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.spinner = false;
        });
    },
  },
  mounted() {
    this.launchRoute();
  },
};
</script>

<template>
  <div class="page-body">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Modification</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-content" id="top-tabContent">
      <div>
        <div class="container-fluid">
          <div class="Myspinner" v-show="spinner">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="update_items">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1.5em">
                              {{
                                this.$route.params.name === "categorie"
                                  ? "Domaines"
                                  : "Poste"
                              }}
                            </p>
                            <input
                              class="form-control"
                              type="text"
                              v-model="detailItem"
                              placeholder="ex:Restauration,Menuisierie"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              :disabled="!detailItem"
                              class="btn btn-primary me-3"
                              type="submit"
                            >
                              <span
                                class="spinner-border w-20"
                                role="status"
                                v-show="loading"
                              ></span
                              ><span>Modifier</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th {
  text-align: center;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
</style>
