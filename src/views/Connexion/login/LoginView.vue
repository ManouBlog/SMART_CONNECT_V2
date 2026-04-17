<script>
import instance from "../../../api/api";
import Swal from "sweetalert2";
import { mapActions } from "pinia";
import ForgotPassword from "./ForgotPassword.vue";
import { useRegisterStore } from "../../../store-pinia/register/useRegisterStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
export default {
  name: "LoginView",
  components: {
    ForgotPassword,
  },
  data() {
    return {
      texte: "",
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
      isModalForgotPassword: false,
      formState: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useRegisterStore, {
      toogleModal: "changeValueIsModal",
    }),
    toogleForgotPassword() {
      this.isModalForgotPassword = !this.isModalForgotPassword;
      // console.log(this.isModalForgotPassword);
    },
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    onFinish(values) {
      // console.log("Success:", values);
      this.connexionUser(values);
    },
    //   connexionUser(dataValue) {
    //   this.launchLoading(true);

    //   instance
    //     .post("auth_login", dataValue)
    //     .then((response) => {
    //       if (response.data.status === true) {
    //         const user = response.data.user;

    //         Swal.fire({
    //           icon: "success",
    //           title: response.data.message,
    //           showConfirmButton: true,
    //         });

    //         this.$store.commit("ADD_ITEM");

    //         window.localStorage.setItem("user", JSON.stringify(user));
    //         window.localStorage.setItem(
    //           "token",
    //           JSON.stringify(response.data.access_token)
    //         );

    //         this.$store.state.user = user;
    //         this.$store.state.token = response.data.access_token;

    //         this.toogleModal();

    //         // 🔑 RÈGLES MÉTIER (sans changer la logique)
    //         const isStudent = user?.user?.statut?.statut === "etudiant";

    //         const hasCompetences =
    //           Array.isArray(user?.competences) && user.competences.length > 0;

    //         const hasJours =
    //           Array.isArray(user?.jours) && user.jours.length > 0;

    //         if (isStudent && !hasCompetences) {
    //           // 1️⃣ Étudiant sans compétences
    //           this.$router.replace("/dashboard/profil");

    //         } else if (isStudent && hasCompetences && !hasJours) {
    //           // 2️⃣ Étudiant avec compétences mais sans emploi du temps
    //           this.$router.replace("/dashboard/emploi_du_temps");

    //         } else {
    //           // 3️⃣ Tous les autres cas
    //           const redirect = this.$route.query.redirect;
    //           if (redirect) {
    //             this.$router.replace(redirect);
    //           } else {
    //             this.$router.replace("/");
    //           }
    //         }

    //         this.launchLoading(false);
    //       }

    //       if (response.data.status === false) {
    //         Swal.fire({
    //           icon: "info",
    //           title: response.data.message,
    //           showConfirmButton: true,
    //         });
    //         this.launchLoading(false);
    //       }
    //     })
    //     .catch((error) => {
    //       Swal.fire({
    //         icon: "info",
    //         title: error.response?.data?.message || "Erreur serveur",
    //         showConfirmButton: true,
    //       });
    //       this.launchLoading(false);
    //     });
    // },
    connexionUser(dataValue) {
      this.launchLoading(true);
      console.log('route 1 pour se connecter')
      instance
        .post("auth_login", dataValue)
        .then((response) => {
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: true,
            });

            this.$store.commit("ADD_ITEM");
            window.localStorage.setItem("user", JSON.stringify(response.data.user));
            window.localStorage.setItem(
              "token",
              JSON.stringify(response.data.access_token)
            );
            this.$store.state.user = response.data.user;
            this.$store.state.token = response.data.access_token;
            this.toogleModal();
            // if (this.$store.state.token) {
            //   await this.$store.dispatch("getInfoUser");
            // }
            const redirect = this.$route.query.redirect;
            if (redirect) {
              this.$router.replace(redirect);
            } else {
              this.$router.replace("/");
            }
            this.launchLoading(false);
          }
          if (response.data.status === false) {
            Swal.fire({
              icon: "info",
              title: response.data.message,
              showConfirmButton: true,
            });
            this.launchLoading(false);
          }
        })
        .catch((response) => {
          Swal.fire({
            icon: "info",
            title: response.response.data.message,
            showConfirmButton: true,
          });
          this.launchLoading(false);
        });
    },
    onHandleFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
  },
  async created() {
    this.texte = await this.handleTranslate("Réinitialiser votre mot de passe");
    this.texte1 = await this.handleTranslate(
      "Entrez votre adresse email et nous vous enverrons"
    );
    this.texte2 = await this.handleTranslate(
      "un lien de réinitialisation de mot de passe"
    );
    this.texte3 = await this.handleTranslate("Email");
    this.texte4 = await this.handleTranslate("Mot de passe");
    this.texte5 = await this.handleTranslate("Mot de passe oublié");
    this.texte6 = await this.handleTranslate("Se connecter");
    this.texte7 = await this.handleTranslate("Veuillez renseigner votre email!");
    this.texte8 = await this.handleTranslate("Veuillez renseigner votre mot de passe!");
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    v-model:open="isModalForgotPassword"
    @cancel="isModalForgotPassword"
    @ok="toogleForgotPassword"
  >
    <h2 class="text-center fw-bold" style="color: orange">
      {{ texte }}
    </h2>
    <h6 class="text-center fw-bold">
      {{ texte1 }} <br />
      {{ texte2 }}
    </h6>
    <ForgotPassword />
  </a-modal>
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="on"
    @finish="onFinish"
    @finishFailed="onHandleFailed"
  >
    <div style="padding: 0.5em 0; text-align: center; color: red">
      Les champs avec astérisque (*) sont obligatoires
    </div>
    <a-form-item
      :label="texte3"
      name="email"
      :rules="[{ required: true, message: texte7 }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item
      :label="texte4"
      name="password"
      :rules="[{ required: true, message: texte8 }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <a-form-item>
      <div class="text-right">
        <a
          class="login-form-forgot text-danger"
          href="#"
          @click.prevent="toogleForgotPassword"
          >{{ texte5 }}</a
        >
      </div>
    </a-form-item>
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" shape="round" :size="'large'" html-type="submit">
          {{ texte6 }}</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>
<style scoped>
@media (min-width: 768px) {
  :deep(.ant-form-item) {
    width: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
