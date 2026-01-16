<script>
import Swal from "sweetalert2";
import instance, { LocalPhoto } from "../../../api/api";
import InfoEntreprise from "./feature/InfoEntreprise.vue";
import InfoStudents from "./feature/InfoStudents.vue";
// import InfoParticulier from "./feature/InfoParticulier.vue"
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import ModalForModifyInfo from "./feature/ModalForModifyInfo.vue";
import CompetencesAndExperience from "../etudiant-route/CompetencesAndExperience.vue";
import QualificationsStudent from "../etudiant-route/QualificationsStudent.vue";
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
    QualificationsStudent,
    InfoStudents,
    TabView,
    TabPanel,
    MonPlanAbonnement,
  },
  data() {
    return {
      texte88: "",
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
      nom: "",
      prenoms: "",
      LocalPhoto: LocalPhoto,
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
      if (
        this.$store.state.infoUserConnected.user.statut.statut === "entreprise" ||
        this.$store.state.infoUserConnected.user.statut.statut === "particulier"
      ) {
        this.update_compte_entreprise();
      }
      if (this.$store.state.infoUserConnected.user.statut.statut === "etudiant") {
        this.update_compte_etudiant();
      }
      if (this.$store.state.infoUserConnected.user.statut.statut === "admin") {
        this.updateCompteAdmin();
      }
    },
    modifyPassword() {
      if (this.$store.state.infoUserConnected.user.statut.statut === "etudiant") {
        this.modifyPasswordOfStudent();
      }
      if (
        this.$store.state.infoUserConnected.user.statut.statut === "entreprise" ||
        this.$store.state.infoUserConnected.user.statut.statut === "particulier"
      ) {
        this.modifyPasswordOfEntreprise();
      }
      if (this.$store.state.infoUserConnected.user.statut.statut === "admin") {
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
            console.log(error);
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
          console.log(err);
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
          console.log(error);
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
    //  async getInfoUser() {
    //       await instance
    //         .get("voirInfoUserConnect")
    //         .then((resp) => {
    //           if (resp.data.status === true) {
    //             return resp.data.user;
    //           }
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     },
    async seeMessageUploadProfil() {
      await this.$store.dispatch("getInfoUser");
      const infoUser = this.$store.state.infoUserConnected;

      if(infoUser.user.statut.statut === 'etudiant'){
      console.log("seeMessageUploadProfil", infoUser);
      const competences = infoUser.competences;
      const qualifications = infoUser.qualifications;
      const jours = infoUser.jours;

      let message = "";

      if (!competences.length) {
        message = "Veuillez renseigner vos compétences pour continuer.";
      } else if (!qualifications.length) {
        message = "Veuillez renseigner vos qualifications pour continuer.";
      } else if (!jours.length) {
        message = "Veuillez renseigner vos disponibilités pour continuer.";
      }

      if (message) {
        Swal.fire({
          icon: "info",
          title: "Profil incomplet",
          text: message,
          showConfirmButton: true,
        });
      }
      }
      
    },

    async getInfoUser() {
      await this.$store.dispatch("getInfoUser");
      console.log(
        "this.$store.state.infoUserConnected",
        this.$store.state.infoUserConnected
      );
    },
  },
  async created() {
    this.texte = await this.handleTranslate("Mon profil");
    this.texte1 = await this.handleTranslate(`Infos personnelles`);
    this.texte2 = await this.handleTranslate("Nom :");
    this.texte3 = await this.handleTranslate("Email :");
    this.texte4 = await this.handleTranslate("Matricule/cc :");
    this.texte5 = await this.handleTranslate("Contact :");
    this.texte6 = await this.handleTranslate("Ville :");
    this.texte7 = await this.handleTranslate("Commune :");
    this.texte8 = await this.handleTranslate("Quartier :");
    this.texte9 = await this.handleTranslate("Registre :");
    this.texte10 = await this.handleTranslate("Forme juridique :");
    this.texte88 = await this.handleTranslate("Logo entreprise :");
    this.texte11 = await this.handleTranslate("Gérant :");
    this.texte12 = await this.handleTranslate("Pièce d'identité :");
    this.texte13 = await this.handleTranslate("Diplôme :");
    this.texte14 = await this.handleTranslate("Prénoms :");
    this.texte15 = await this.handleTranslate("Formule d'abonnement");
    this.getInfoUser();
    this.seeMessageUploadProfil();
  },
};
</script>

<template>
  <section>
    <ModalForModifyInfo />
    <HeaderDashboard :TitleHeader="texte" :subTitleHeader="texte" />
    <div class="page-body">
      <!-- {{ JSON.stringify(this.$store.state.infoUserConnected,null,2) }} -->
      <TabView v-if="this.$store.state.infoUserConnected">
        <TabPanel :header="texte1">
          <div>
            <InfoEntreprise
              v-if="
                this.$store.state.infoUserConnected &&
                (this.$store.state.infoUserConnected.user.statut.statut ===
                  'entreprise' ||
                  this.$store.state.infoUserConnected.user.statut.statut ===
                    'particulier')
              "
              :infoPersonellesEntreprise="
                this.$store.state.infoUserConnected.user.statut.statut === 'entreprise'
                  ? [
                      {
                        libelle: 'Raison sociale :',
                        value: this.$store.state.infoUserConnected.nom,
                      },
                      {
                        libelle: 'Contact mail :',
                        value: this.$store.state.infoUserConnected.email,
                      },
                      {
                        libelle: 'RCCM (Registre du Commerce et du Crédit Mobilier) :',
                        value: this.$store.state.infoUserConnected.matricule_cc
                          ? this.$store.state.infoUserConnected.matricule_cc
                          : 'néant',
                      },
                      {
                        libelle: 'NCC (Numéro de compte contribuable) :',
                        value: this.$store.state.infoUserConnected.NCC
                          ? this.$store.state.infoUserConnected.NCC
                          : 'néant',
                      },
                      {
                        libelle: texte5,
                        value: this.$store.state.infoUserConnected.contact,
                      },
                      {
                        libelle: texte6,
                        value: this.$store.state.infoUserConnected.ville,
                      },
                      {
                        libelle: texte7,
                        value: this.$store.state.infoUserConnected.commune,
                      },
                      {
                        libelle: texte8,
                        value: this.$store.state.infoUserConnected.quartier,
                      },
                      {
                        libelle: texte88,
                        value: this.$store.state.infoUserConnected.logo,
                      },
                      {
                        libelle: texte9,
                        value: this.$store.state.infoUserConnected.registre
                          ? this.$store.state.infoUserConnected.registre
                          : 'néant',
                      },
                      {
                        libelle: texte10,
                        value: this.$store.state.infoUserConnected.forme_juridique
                          ? this.$store.state.infoUserConnected.forme_juridique
                          : 'néant',
                      },
                      {
                        libelle: 'Emails en copie :',
                        value: this.$store.state.infoUserConnected.emails.length
                          ? this.$store.state.infoUserConnected.emails
                          : null,
                      },
                    ]
                  : [
                      {
                        libelle: 'Nom :',
                        value: this.$store.state.infoUserConnected.nom,
                      },
                      {
                        libelle: 'Prénoms :',
                        value: this.$store.state.infoUserConnected.particulier_prenoms,
                      },
                      {
                        libelle: 'Email :',
                        value: this.$store.state.infoUserConnected.email,
                      },
                      {
                        libelle: texte5,
                        value: this.$store.state.infoUserConnected.contact,
                      },
                      {
                        libelle: texte6,
                        value: this.$store.state.infoUserConnected.ville,
                      },
                      {
                        libelle: texte7,
                        value: this.$store.state.infoUserConnected.commune,
                      },
                      {
                        libelle: texte8,
                        value: this.$store.state.infoUserConnected.quartier,
                      },
                      {
                        libelle: texte12,
                        value: this.$store.state.infoUserConnected.user.photos,
                      },
                    ]
              "
              :infoPersonellesGerant="
                this.$store.state.infoUserConnected.user.statut.statut === 'entreprise'
                  ? [
                      {
                        libelle: texte11,
                        value: this.$store.state.infoUserConnected.gerant
                          ? this.$store.state.infoUserConnected.gerant
                          : user.nom,
                      },
                      {
                        libelle: 'Contact téléphonique du gérant : ',
                        value: this.$store.state.infoUserConnected.numero_gerant
                          ? this.$store.state.infoUserConnected.numero_gerant
                          : user.contact,
                      },
                      {
                        libelle: 'Pièce du gérant',
                        value: this.$store.state.infoUserConnected.user.photos,
                      },
                    ]
                  : []
              "
            />
            <InfoStudents
              :infoPersonellesStudents="[
                { libelle: texte2, value: this.$store.state.infoUserConnected.nom },
                { libelle: texte14, value: this.$store.state.infoUserConnected.prenoms },
                { libelle: texte3, value: this.$store.state.infoUserConnected.email },
                { libelle: texte6, value: this.$store.state.infoUserConnected.ville },
                { libelle: texte7, value: this.$store.state.infoUserConnected.commune },
                { libelle: texte8, value: this.$store.state.infoUserConnected.quartier },
                { libelle: texte5, value: this.$store.state.infoUserConnected.phone },
                { libelle: texte13, value: this.$store.state.infoUserConnected.diplome },
                {
                  libelle: 'Carte étudiant',
                  value: this.$store.state.infoUserConnected.user.photos,
                },
              ]"
              :infoPersonellesQualifications="
                this.$store.state.infoUserConnected.qualifications.length
                  ? this.$store.state.infoUserConnected.qualifications
                  : []
              "
              :infoBioStudent="this.$store.state.infoUserConnected.bio"
              :infoPersonellesCompetences="
                this.$store.state.infoUserConnected.competences
              "
              v-if="
                this.$store.state.infoUserConnected &&
                this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'
              "
            />
          </div>
        </TabPanel>
        <TabPanel
          v-if="
            this.$store.state.infoUserConnected &&
            this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'
          "
          header="Compétences et Expériences"
        >
          <CompetencesAndExperience />
        </TabPanel>
        <TabPanel
          v-if="
            this.$store.state.infoUserConnected &&
            this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'
          "
          header="Qualifications"
        >
          <QualificationsStudent />
        </TabPanel>
        <TabPanel :header="texte15">
          <MonPlanAbonnement />
        </TabPanel>
      </TabView>
      <div v-else style="text-align:center;padding:2em;">
      Chargement...
      </div>
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
:deep(ul) {
  list-style-type: none;
}
:deep(.p-highlight) {
  background: orange;
}

:deep(a:hover) {
  color: black;
}
:depp(.p-highlight a) {
  color: white !important;
  font-weight: bold !important;
}
img {
  border: 5px solid black;
}

.mb-3 {
  margin-bottom: 1em !important;
}
</style>
