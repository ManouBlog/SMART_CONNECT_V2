<script>
// import { mapActions, mapState } from "pinia";
// import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { mapActions } from "pinia";
import Swal from "sweetalert2";
import instance from "../../../api/api";
export default {
  name: "NewsLetter",
  data() {
    return { spinnerAlert: false,emailForNewsletter:"",texte: "", texte4: "", texte2: "", texte3: "", texte1: "" , };
  },
  computed: {
    // ...mapState(useOffreStore, ["ListOffre"]),
  },
  methods: {
    // ...mapActions(useOffreStore, ["getOffres"]),
    async SendMailBienvenueNewsletter() {
      this.spinnerAlert = true;
      await instance
        .post("SendMailAtEmailToNewsletter", {
          email: this.emailForNewsletter,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.status) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.spinnerAlert = false;
          }
          if (!res.data.status) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.spinnerAlert = false;
          }
        })
        .catch((error) => {
          alert(JSON.stringify(error,null,2));
          Swal.fire({
            icon: "info",
            title: error.response.data.message,
            showConfirmButton: true,
          });
          this.spinnerAlert = false;
        });
    },
    ...mapActions(useTranslateStore, ["handleTranslate"]),
  },
  async created() {
    this.texte = await this.handleTranslate("Alertes Offres");
    this.texte1 = await this.handleTranslate("Vous voulez reçevoir les offres d'emploi");
    this.texte2 = await this.handleTranslate("Inscrivez-vous à la newsletter");
    this.texte3 = await this.handleTranslate("Chargement...");
    this.texte4 = await this.handleTranslate("Envoyer");
  },
};
</script>
<template>
  <h1 class="fw-bold">{{texte}}</h1>
  <div class="alerte_emploi">
    <div class="ecriteau_alerte_emploi">
      <h4>
        {{texte1}}<br />
        {{texte2}}
      </h4>
      <div class="inputSendmail">
        <input
          type="text"
          class="input_mail"
          v-model="emailForNewsletter"
          placeholder="Your email"
        />
        <button
          class="btn btn_send_mail"
          :disabled="spinnerAlert ? true : false"
          @click="SendMailBienvenueNewsletter"
          v-if="this.emailForNewsletter"
        >
          {{ spinnerAlert ? texte3 : texte4 }}
        </button>
      </div>
    </div>
    <div class="ecriteau_image">
      <img src="../../../assets/alertes_offre.png" 
      class="position-absolute image"
       alt="alertes_offre" />
    </div>
  </div>
</template>
<style scoped>
.image {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
}
.btn_send_mail {
  position: absolute;
  right: 1em;
  top: 0.3em;
  padding: 0.8em;
  font-weight: bold;
  color: white;
  width: 150px;
  background: #f77f00 !important;
  border: 2px solid black;
}
.input_mail {
  width: 100%;
  padding: 2em;
  border-radius: 10px;
}
.inputSendmail {
  position: relative;
  width: 100%;
  margin-bottom: 1em;
}
.alerte_emploi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  margin: 1em 0 0 0;
}
.ecriteau_image {
  position: relative;
  flex: 1 1 200px;
}
.ecriteau_alerte_emploi {
  flex: 1 1 200px;
}
</style>
