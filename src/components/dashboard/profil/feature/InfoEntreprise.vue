<script>
import Swal from "sweetalert2";
import instance, { lienPhoto, lienPDF } from "../../../../api/api";
import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
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
      showModal: false,
      lienPDF: lienPDF,
      texte0: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
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
    ...mapActions(useTranslateStore, ["handleTranslate"]),
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
  async created() {
    this.texte0 = await this.handleTranslate("Informations personnelles");
    this.texte1 = await this.handleTranslate(`Gérant`);
    this.texte2 = await this.handleTranslate("Modifier mot de passe");
    this.texte3 = await this.handleTranslate("Ancien mot de passe");
    this.texte4 = await this.handleTranslate("Nouveau mot de passe");
    this.texte5 = await this.handleTranslate("Confirmation du nouveau mot de passe");
    this.texte6 = await this.handleTranslate("Modifier");
  },
};
</script>

<template>
  <section style="padding: 2em 3em">
    <a-card
      style="
        width: auto;
        color: var(--third-color);
        background: var(--secondary-color) !important;
      "
    >
      <h1 class="fw-bold" style="color: orange">{{ texte0 }}</h1>

      <span class="badge" :class="user.user.verif_email ? 'bg-success' : 'bg-danger'"
        >Compte {{ user.user.verif_email ? "Activé" : "Inactif" }}</span
      >
      <section class="my-5">
        <div class="row">
          <div
            v-for="(item, index) in infoPersonellesEntreprise"
            :key="index"
            class="col-lg-4 col-sm-6"
          >
            <p style="color: orange">{{ item.libelle }}</p>
            <h6
              v-if="
                item.value !== null &&
                item.value !== 'null' &&
                item.value !== 'undefined' &&
                item.libelle !== 'Registre :' &&
                item.libelle !== 'Logo entreprise :' &&
                item.libelle !== 'Pièce d\'identité :'
              "
              class="fw-bold"
            >
              {{ item.value }}
            </h6>
            <div style="display: flex; justify-content: flex-start">
              <n-image
                :alt="item.value"
                v-if="item.libelle === 'Logo entreprise :'"
                width="100"
                :src="lienPhoto + item.value"
              />
            </div>
            <div
              v-if="item.libelle === 'Pièce d\'identité :'"
              style="display: flex; justify-content: flex-start"
            >
              <n-image
                v-for="(piece,index) in item.value"
                :key="index"
                :alt="piece.path"
                width="100"
                :src="lienPhoto + piece.path"
              />
            </div>

            <div
              v-if="item.libelle === 'Registre :' && item.value"
              style="display: flex; justify-content: flex-start"
            >
              <div>
                <n-button type="warning" @click="showModal = true">
                  Voir le registre
                </n-button>

                <n-modal v-model:show="showModal" style="width: 80%; max-width: 900px">
                  <n-card title="Document PDF" closable @close="showModal = false">
                    <iframe
                      :src="lienPDF + item.value"
                      style="width: 100%; height: 600px; border: none"
                    ></iframe>
                  </n-card>
                </n-modal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <h1 class="fw-bold" style="color: orange" v-if="infoPersonellesGerant.length">
        {{ texte1 }}
      </h1>
      <section>
        <div class="row" v-if="infoPersonellesGerant.length">
          <div
            v-for="(item, index) in infoPersonellesGerant"
            :key="index"
            class="col-lg-4 col-sm-6"
          >
            <p style="color: orange">{{ item.libelle }}</p>
            <h6 class="fw-bold" v-if="item.libelle !== 'Pièce d\'identité :'">
              {{ item.value }}
            </h6>
            <div
              v-if="item.libelle === 'Pièce d\'identité :'"
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
              <span v-if="!item.value.length"
                >Veuillez ajouter une pièce d'identité.</span
              >
            </div>
          </div>
        </div>
      </section>
      <section style="display: flex; justify-content: center; padding: 1.5em">
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
      <h1 class="fw-bold" style="color: orange">{{ texte2 }}</h1>
      <section>
        <div class="card-body text-left py-4">
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">{{ texte3 }}</label>
                <input v-model="password" class="form-control" type="password" />
              </div>
            </div>

            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">{{ texte4 }}</label>
                <input v-model="nouveau_password" class="form-control" type="password" />
              </div>
            </div>

            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">{{ texte5 }}</label>
                <input
                  v-model="confirmation_password"
                  class="form-control"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div class="text-center">
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
              {{ texte6 }}
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
