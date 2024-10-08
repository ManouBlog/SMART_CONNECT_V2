<script>
import Swal from "sweetalert2";
import instance, { lienPhoto } from "../../../../api/api";
import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions } from "pinia";
export default {
  name: "InfoEntreprise",
  components: {
    Buttons,
  },
  props: {
    infoPersonellesEntreprise: {
      type: Array,
    },
    infoPersonellesGerant: {
      type: Array,
    },
  },
  data() {
    return {
      user: this.$store.state.user,
      nom: "",

      prenoms: "",
      lienPhoto: lienPhoto,
      password: null,
      commune: "",
      quartier: "",
      ville: "",
      diplome: "",
      phone: "",
      registre_commerce: "",
      oldPassword: "",
      photo: {},

      confirmation_password: "",
      nouveau_password: "",
      msgErr: false,
      formState: { username: "", password: "" },
      elmentsOfBtn: [
        {
          name_btn: "Modifier",
          color_btn: "primary",
        },
      ],
    };
  },
  methods: {
    ...mapActions(useInfoPersonnel, [
      "changeValueForToogleModalInfoPersonnelle",
      "verifIfPasswordIsExact",
    ]),
    handleModalInfo() {
      this.changeValueForToogleModalInfoPersonnelle();
    },
    modifyPasswordOfEntreprise() {
      let Entreprise = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(Entreprise);
    },

    routeForLaunch(data) {
      if (this.cpassword !== this.password) {
        this.msgErr = true;
      } else {
        instance
          .post("passwordModify", data)
          .then((resp) => {
            console.log(resp);
            if (resp.data.status === true) {
              Swal.fire({
                icon: "success",
                title: "Mot de passe changé",
                showConfirmButton: false,
                timer: 1500,
              });
              //setTimeout(() => {
              //location.reload(true);
              //}, 1500);
            }
            if (resp.data.status === false) {
              Swal.fire({
                icon: "error",
                title: resp.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    see(e) {
      this.photo = e.target.files[0];
      console.log(this.photo);
    },
  },
};
</script>

<template>
  <section style="padding: 2em 3em">
    <a-card style="width: auto; background: rgba(179, 201, 255, 0.38)">
      <h1 class="fw-bold">Informations personnelles</h1>
      <section>
        <div class="row">
          <div
            v-for="(item, index) in infoPersonellesEntreprise"
            :key="index"
            class="col-lg-4 col-sm-6"
          >
            <p>{{ item.libelle }}</p>
            <h6
              v-if="
                item.value !== null &&
                item.value !== 'null' &&
                item.value !== 'undefined' &&
                item.libelle !== 'Document :'
              "
              class="fw-bold"
            >
              {{ item.value }}
            </h6>
            <div style="display: flex; justify-content: flex-start">
              <img
                v-if="item.libelle === 'Document :'"
                :src="lienPhoto + item.value"
                :alt="item.value"
                class="w-25"
              />
            </div>
          </div>
        </div>
      </section>
      <h1 class="fw-bold">Gérant</h1>
      <section>
        <div class="row">
          <div
            v-for="(item, index) in infoPersonellesGerant"
            :key="index"
            class="col-lg-4 col-sm-6"
          >
            <p>{{ item.libelle }}</p>
            <h6 class="fw-bold" v-if="item.libelle !== 'Pièce d identite :'">
              {{ item.value }}
            </h6>
            <div style="display: flex; justify-content: flex-start">
              <img
                v-if="item.libelle === 'Pièce d identite :'"
                :src="lienPhoto + item.value"
                :alt="item.value"
                class="w-25"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Buttons
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleModalInfo"
        />
      </section>
    </a-card>

    <a-card style="width: auto; background: rgba(179, 201, 255, 0.38); margin: 2em 0">
      <h1 class="fw-bold">Modifier mot de passe</h1>
      <section>
        <div class="card-body text-left py-4">
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">Ancien mot de passe</label>
                <input v-model="password" class="form-control" type="password" />
              </div>
            </div>

            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">Nouveau mot de passe</label>
                <input v-model="nouveau_password" class="form-control" type="password" />
              </div>
            </div>

            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">Confirmation du nouveau mot de passe</label>
                <input
                  v-model="confirmation_password"
                  class="form-control"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div class="text-right">
            <button
              class="btn-lg bg-warning"
              style="border: none"
              @click.prevent="
                verifIfPasswordIsExact({
                  confirmation_password: confirmation_password,
                  password: nouveau_password,
                  oldPassword: password,
                })
              "
            >
              Modifier
            </button>
          </div>
        </div>
      </section>
    </a-card>
  </section>
</template>
<style scoped>
h6 {
  text-align: left;
  font-size: 1.5em;
}
h1 {
  text-align: left;
}
</style>
