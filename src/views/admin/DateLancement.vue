<script>
/* eslint-disable */
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "DateLancement",
  data() {
    return {
      lancement_date: null,
      loading:false,
      today:new Date().toISOString().split("T")[0],
      spinner:false
    };
  },
  methods: {
    async save_date_lancement() {
      this.spinner = true;
      this.loading= true;
      const formData = new FormData();
     formData.append("date", this.lancement_date);
      await axios
        .post("https://backend.monbrobroli.com/api/addDateLancement", formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.spinner = false;
           this.loading= false;
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
          this.spinner = false;
          this.loading = false;
        });
    },
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
              <li class="breadcrumb-item">Date de lancement</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->

   
    <div class="tab-content" id="top-tabContent">
      <div
        id="timetable"
        role="tabpanel"
        aria-labelledby="timetable"
      >
        <div class="container-fluid">
          <div class="Myspinner" v-show="spinner">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="save_date_lancement">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1.5em">
                              Ajouter la date de lancement
                            </p>

                            <input
                              class="form-control"
                              type="date"
                              v-model="lancement_date"
                              :min="today"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              :disabled="!lancement_date"
                              class="btn btn-primary me-3"
                              type="submit"
                            >
                              <span
                                class="spinner-border w-20"
                                role="status"
                                v-show="loading"
                              ></span
                              ><span>Enregistrer</span>
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
