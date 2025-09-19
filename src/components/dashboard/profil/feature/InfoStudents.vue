<script>
import Swal from "sweetalert2";
import instance, { lienPhoto } from "../../../../api/api";
import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions } from "pinia";
export default {
  name: "InfoStudents",
  components: {
    Buttons,
  },
  props: {
    infoBioStudent: {
      type: String,
      required: false,
    },
    infoPersonellesStudents: {
      type: Array,
    },
    infoPersonellesCompetences: {
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
      "update_compte_student",
    ]),
    
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("Fichier choisi :", file);
        this.update_compte_student({
            photo_profil:file
          })
          this.getInfoUser()
      }
    },
    async getInfoUser() {
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          // console.log("voirInfoUserConnect",resp);
          if (resp.data.status === true) {
            this.user = resp.data.user;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
            // console.log(resp);
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
      // console.log(this.photo);
    },
  },
  created() {
    this.getInfoUser();
  },
};
</script>

<template>
  <section style="padding: 2em 3em">
    <a-card
      style="
        width: auto;
        color: var(--third-color) !important;
        background: var(--secondary-color) !important;
      "
    >
      <h1 class="fw-bold my-3">Informations personnelles</h1>
      <span class="badge" :class="user.user.verif_email ? 'bg-success' : 'bg-danger'"
        >Compte {{ user.user.verif_email ? "Activé" : "Inactif" }}</span
      >
      <div class="d-flex" style="position: relative">
        <input
          id="hiddenFile"
          type="file"
          style="display: none"
          @change="handleFileChange"
        />
        <button
          class="btn_photo_profil"
          onclick="document.getElementById('hiddenFile').click()"
        >
          <n-avatar
            style="border: 3px solid white;object-fit:cover;"
            round
            :size="120"
             :src="lienPhoto + user.photo_profil"
          />
        </button>
        <i class="bi bi-camera-fill"></i>
      </div>
      <div>
        <p style="color: orange; font-weight: bold">Bio</p>
        <p
          v-if="infoBioStudent"
          style="
            text-align: justify;
            padding: 0.4em;
            font-weight: bold;
            background: #80808085;
            border-radius: 10px;
          "
        >
          {{ infoBioStudent }}
        </p>
        <p
          v-else
          style="
            text-align: justify;
            padding: 0.4em;
            font-weight: bold;
            background: #80808085;
            border-radius: 10px;
          "
        >
          Écrivez quelques mots sur vous...
        </p>
      </div>
      <section class="my-5">
        <div class="row">
          <div
            v-for="(item, index) in infoPersonellesStudents"
            :key="index"
            class="col-lg-4 col-sm-6"
          >
            <p style="color: orange; font-weight: bold">{{ item.libelle }}</p>
            <h6
              v-if="
                item.value !== null &&
                item.value !== 'null' &&
                item.value !== 'undefined' &&
                item.libelle !== 'Pièce d identite :'
              "
              class="fw-bold"
            >
              {{ item.value }}
            </h6>
            <div
              v-if="item.libelle === 'Pièce d identite :'"
              style="display: flex; justify-content: flex-start; gap: 1em"
            >
              <n-image
                v-for="(photo, index) in item.value"
                :key="index"
                :alt="photo.path"
                width="120"
                height="100"
                :src="lienPhoto + photo.path"
              />
            </div>
          </div>
        </div>
      </section>
      <h1 v-if="infoPersonellesCompetences.length" class="fw-bold my-3">Compétences</h1>
      <section>
        <div
          v-for="(item, index) in infoPersonellesCompetences"
          :key="index"
          style="display: flex; justify-content: flex-start"
        >
          <h6 class="fw-bold">-{{ item.competence }}</h6>
        </div>
      </section>

      <section class="my-5">
        <Buttons
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleModalInfo"
        />
      </section>
    </a-card>

    <a-card
      style="
        width: auto;
        color: var(--third-color) !important;
        background: var(--secondary-color) !important;
        margin: 2em 0;
      "
    >
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
              style="border: none; border-radius: 10%"
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
.btn_photo_profil {
  background: transparent;
  border: none;
}
.bi-camera-fill {
  font-size: 1.2em !important;
  position: absolute;
  bottom: 0;
  left: 5em;
  z-index: 1;
  color: rgb(0, 0, 0);
  font-weight: bold;
  background: rgb(255, 255, 255);
  padding: 0.5em;
  border-radius: 100%;
}
h6 {
  text-align: left;
  font-size: 1.5em;
}
h1 {
  text-align: left;
}
</style>
