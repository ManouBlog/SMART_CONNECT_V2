<script>
/* eslint-disable */
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Derails_user_admins",
  data() {
    return {
      spinner: false,
      loading: false,
      permissions: [],
      checkedPermissions: [],
      userProfil:null
    };
  },
  methods: {
   savePermissions() {
  this.$store.commit("TOOGLESPINNER", true);

  const userId = Number(this.$route.params.id);
    let formData = new FormData();

  const newPermissions = this.checkedPermissions.map(item => ({
    user_id: userId,
    permission_id: item,
  }));
  console.log("newPermissions",newPermissions)
  newPermissions.forEach((item) => {
        formData.append("permissions[]", JSON.stringify(item));
      });
  axios
    .post(
      "https://backend-test.monbrobroli.com/api/GivePermission/"+userId,formData,
      {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      }
    )
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: true,
      });
    })
    .catch((error) => {
      console.error("Erreur API GivePermission :", error);

      setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
    })
    .finally(() => {
      this.$store.commit("TOOGLESPINNER", false);
    });
},
    getAllPermission() {
      this.$store.commit("TOOGLESPINNER", true);
      axios
        .get("https://backend-test.monbrobroli.com/api/listerPermission", {
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
          setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
        });
    },
    async get_users() {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .get("https://backend-test.monbrobroli.com/api/listerUser", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          const userId = Number(this.$route.params.id);
          this.userProfil = res.data.data.find(item=>item.id == userId);
          this.checkedPermissions = this.userProfil.permissions.map(item=>{
            return item.id
          })
          console.log("this.checkedPermissions",this.checkedPermissions)
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
          
        })
        .finally(() => {
                 this.$store.commit("TOOGLESPINNER", false);
               });
    },
    onChangePermission(newValue){
    console.log('Permissions cochées :', newValue)
    const lastChanged = newValue.filter(id => !this.checkedPermissions.includes(id))
  console.log('Dernier coché :', lastChanged)
    }
  },
  created() {
    this.get_users();
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

    <div class="tab-content" id="top-tabContent" v-if="userProfil">
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
                              Gestion des Permissions de : {{ userProfil.nom }} {{ userProfil.prenoms }}
                            </p> 
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-3" style="text-align: left">
                            <n-checkbox-group
                            @update:value="onChangePermission"
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
