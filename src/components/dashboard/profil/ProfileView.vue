<script>
import Swal from "sweetalert2";
import instance, { lienPhoto } from "../../../api/api";
import InfoEntreprise from "./feature/InfoEntreprise.vue";
import InfoStudents from "./feature/InfoStudents.vue";
// import InfoParticulier from "./feature/InfoParticulier.vue"
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import ModalForModifyInfo from "./feature/ModalForModifyInfo.vue";
import CompetencesAndExperience from "../etudiant-route/CompetencesAndExperience.vue";
import MonPlanAbonnement from "./feature/MonPlanAbonnement.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";

export default {
  name: "ProfileView",
  components: {
    InfoEntreprise,
    HeaderDashboard,
    ModalForModifyInfo,
    CompetencesAndExperience,
    InfoStudents,
    TabView,
    TabPanel,
    MonPlanAbonnement,
  },
  data() {
    return {
      texte88:"",
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
      user: "",
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
      cpassword: "",
      msgErr: false,
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    update_offre() {
      if (this.user.user.statut.statut === "entreprise" || this.user.user.statut.statut === "particulier") {
        this.update_compte_entreprise();
      }
      if (this.user.user.statut.statut === "etudiant") {
        this.update_compte_etudiant();
      }
      if (this.user.user.statut.statut === "admin") {
        this.updateCompteAdmin();
      }
    },
    modifyPassword() {
      if (this.user.user.statut.statut === "etudiant") {
        this.modifyPasswordOfStudent();
      }
      if (this.user.user.statut.statut === "entreprise" || this.user.user.statut.statut === "particulier") {
        this.modifyPasswordOfEntreprise();
      }
      if (this.user.user.statut.statut === "admin") {
        this.modifyPasswordOfAdmin();
      }
    },
    modifyPasswordOfStudent() {
      let info = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(info);
    },
    modifyPasswordOfEntreprise() {
      let Entreprise = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(Entreprise);
    },

    modifyPasswordOfAdmin() {
      let admin = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(admin);
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
            alert(JSON.stringify(error,null,2));
          });
      }
    },
    update_compte_etudiant() {
      let data = new FormData();
      data.append("nom", this.nom);
      data.append("prenoms", this.prenoms);
      data.append("email", this.email);
      data.append("commune", this.commune);
      data.append("quartier", this.quartier);
      data.append("phone", this.phone);
      data.append("ville", this.ville);
      data.append("diplome", this.diplome);
      data.append("photo", this.photo);
      instance
        .post("modifier_profil", data)
        .then((res) => {
          // console.log(res.data.user);
          // console.log("COMPTE", res.data.compte);
          if (res.data.status === true) {
            this.$store.state.user = res.data.user;
            this.$store.state.compte = res.data.compte;
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("compte", JSON.stringify(res.data.compte));
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          alert(JSON.stringify(err,null,2))
          Swal.fire({
            icon: "error",
            title: err.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    updateCompteAdmin() {
      instance
        .put("modifier_profil", {
          nom: this.nom,
          password: this.password,
          oldPassword: this.oldPassword,
        })
        .then((reponse) => {
          // console.log(reponse);
          if (reponse.data.status === true) {
            Swal.fire({
              icon: "success",
              title: reponse.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            localStorage.setItem("user", JSON.stringify(reponse.data.user));
            this.$store.state.user = reponse.data.user;
            //setTimeout(() => {
            //location.reload(true);
            //}, 1500);
          }
          if (reponse.data.status === false) {
            Swal.fire({
              icon: "error",
              title: reponse.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          alert(JSON.stringify(error,null,2));
          Swal.fire({
            icon: "error",
            title: error.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    see(e) {
      this.photo = e.target.files[0];
      // console.log(this.photo);
    },
    async getInfoUser(){
      await instance
          .get("voirInfoUserConnect")
          .then((resp) => {
            // console.log("voirInfoUserConnect",resp);
            if (resp.data.status === true) {
             this.user = resp.data.user
            }
          })
          .catch((error) => {
            alert(JSON.stringify(error,null,2));
          });
    },
  },
  async created() {
    this.texte = await this.handleTranslate('Profil');
    this.texte1 = await this.handleTranslate(`Infos personnelles`);
    this.texte2 = await this.handleTranslate('Nom :');
    this.texte3 = await this.handleTranslate('Email :');
    this.texte4 = await this.handleTranslate('Matricule/cc :');
    this.texte5 = await this.handleTranslate('Contact :');
    this.texte6 = await this.handleTranslate('Ville :');
    this.texte7 = await this.handleTranslate('Commune :');
    this.texte8 = await this.handleTranslate('Quartier :');
    this.texte9 = await this.handleTranslate('Document :');
    this.texte10 = await this.handleTranslate('Forme juridique :');
    this.texte88 = await this.handleTranslate('Logo entreprise :');
    this.texte11 = await this.handleTranslate('Nom & Prénoms :');
    this.texte12 = await this.handleTranslate('Pièce d identite :');
    this.texte13 = await this.handleTranslate('diplome :');
    this.texte14 = await this.handleTranslate('Prénoms :');
    this.texte15 = await this.handleTranslate('Formule d\'abonnement');
    this.getInfoUser()
    
  },
};
</script>

<template>
  <section>
    <ModalForModifyInfo />
    <HeaderDashboard :TitleHeader="texte" :subTitleHeader="texte" />
    <div class="page-body" >
      <TabView>
        <TabPanel :header="texte1">
          <div>
            <InfoEntreprise
              v-if=" this.user && (this.user.user.statut.statut === 'entreprise' || this.user.user.statut.statut === 'particulier') "
              :infoPersonellesEntreprise="[
                { libelle: texte2, value: user.nom },
                { libelle: texte3, value: user.email },
                { libelle: texte4, value: user.matricule_cc ? user.matricule_cc:'néant' },
                { libelle: texte5, value: user.contact },
                { libelle: texte6, value: user.ville },
                { libelle: texte7, value: user.commune },
                { libelle: texte8, value: user.quartier },
                { libelle: texte88, value: user.logo },
                { libelle: texte9, value: user.registre ? user.registre:'néant'  },
                { libelle: texte10, value: user.forme_juridique ? user.forme_juridique:'néant' },
              ]"
              :infoPersonellesGerant="[
                { libelle: texte11, value: user.gerant ? user.gerant:user.nom },
                { libelle: texte5, value: user.numero_gerant ? user.numero_gerant:user.contact },
                { libelle: texte12, value: user.user.photos },
              ]"
            />
            <InfoStudents
              :infoPersonellesStudents="[
                { libelle: texte2, value: user.nom },
                { libelle: texte14, value: user.prenoms },
                { libelle: texte3, value: user.email },
                { libelle: texte6, value: user.ville },
                { libelle: texte7, value: user.commune },
                { libelle: texte8, value: user.quartier },
                { libelle: texte5, value: user.phone },
                { libelle: texte13, value: user.diplome },
                { libelle: texte12, value: user.user.photos },
              ]"
              :infoPersonellesCompetences="user.competences"
              v-if="this.user && this.user.user.statut.statut === 'etudiant'"
            />
          </div>
        </TabPanel>
        <TabPanel
          v-if="this.user && this.user.user.statut.statut === 'etudiant'"
          header="Compétences et Expériences"
        >
          <CompetencesAndExperience />
        </TabPanel>
        <TabPanel :header="texte15">
          <MonPlanAbonnement />
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>

<style scoped>
.mt-5 {
  margin-top: 101px !important;
}
.updateProfil {
  margin: 0 !important;
  transform: translateX(0) !important;
}
img {
  border: 5px solid black;
}

.mb-3 {
  margin-bottom: 1em !important;
}
</style>
