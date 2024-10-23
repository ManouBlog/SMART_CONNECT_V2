<script>
// import { mapActions, mapState } from "pinia";
// import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import Swal from "sweetalert2";
import instance from "../../../api/api";
export default {
  name: "NewsLetter",
  data() {
    return { spinnerAlert: false,emailForNewsletter:"" };
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
          console.log(res);
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
          console.log(error);
          Swal.fire({
            icon: "info",
            title: error.response.data.message,
            showConfirmButton: true,
          });
          this.spinnerAlert = false;
        });
    },
  },
  created() {},
};
</script>
<template>
  <h1 class="fw-bold">{{$t("Home.ALERTES.title")}}</h1>
  <div class="alerte_emploi">
    <div class="ecriteau_alerte_emploi">
      <h4>
        {{$t("Home.ALERTES.description1")}}<br />
        {{$t("Home.ALERTES.description2")}}
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
          {{ spinnerAlert ? $t("Home.ALERTES.description4") : $t("Home.ALERTES.description3") }}
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
  width: 100%;
  height: 100%;
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
  padding: 1em;
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
