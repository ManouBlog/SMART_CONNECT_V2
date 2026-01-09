<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";

export default {
  name: "Derails_user_admins",
  data() {
    return {
      spinner: false,
      loading: false,
      permissions: [],
      checkedPermissions: [],
    };
  },
  methods: {
    savePermissions() {
      console.log("this.checkedPermissions", this.checkedPermissions);
      //   this.loading = true;
      //   axios
      //     .post(
      //       "https://backend.monbrobroli.com/api/savePermissions",
      //       { permissions: this.permissions },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${this.$store.state.token}`,
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       Swal.fire({
      //         icon: "success",
      //         title: response.data.message || "Permissions enregistrées !",
      //         showConfirmButton: true,
      //       });
      //     })
      //     .catch((error) => {
      //       console.error("Erreur API:", error);
      //     })
      //     .finally(() => {
      //       this.loading = false;
      //     });
    },
    getAllPermission() {
      this.loading = true;
      axios
        .get("https://backend.monbrobroli.com/api/listerPermission", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("RESPONSE_listerPermission", response);
          this.permissions = response.data.data;
        })
        .catch((error) => {
          console.error("Erreur API:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.getAllPermission();
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Gestion des permissions</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-content" id="top-tabContent">
      <div role="tabpanel" aria-labelledby="permissions_tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <!-- Formulaire de permissions -->
                    <form @submit.prevent="savePermissions">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1.5em">
                              Gestion des Permissions
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-3" style="text-align: left">
                            <n-checkbox-group
                            
                            v-model:value="checkedPermissions">
                              <n-space vertical>
    
                                <n-checkbox v-for="perm in permissions" :value="perm.id">
                                  <span class="fw-bold">{{ perm.name }}</span>
                                  <small class="text-muted d-block">
                                    {{ perm.label }}
                                  </small>
                                </n-checkbox>
                              </n-space>
                            </n-checkbox-group>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col text-end">
                          <button
                            :disabled="loading"
                            class="btn btn-primary me-3"
                            type="submit"
                          >
                            <span
                              class="spinner-border spinner-border-sm me-2"
                              role="status"
                              v-show="loading"
                            ></span>
                            Enregistrer les permissions
                          </button>
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
.bi {
  font-size: 1.5em !important;
  cursor: pointer;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
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
</style>
