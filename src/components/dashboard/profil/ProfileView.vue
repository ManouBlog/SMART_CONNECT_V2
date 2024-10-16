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
      cpassword: "",
      msgErr: false,
    };
  },
  methods: {
    update_offre() {
      if (this.user.user.statut.statut === "entreprise") {
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
      if (this.user.user.statut.statut === "entreprise") {
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
            console.log(resp);
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
          console.log(res.data.user);
          console.log("COMPTE", res.data.compte);
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
          console.log(reponse);
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
      console.log(this.photo);
    },
  },
};
</script>

<template>
  <section>
    <ModalForModifyInfo />
    <HeaderDashboard :TitleHeader="'Profil'" :subTitleHeader="'Profil'" />
    <div class="page-body">
      <TabView>
        <TabPanel header="Infos personnelles">
          <div>
            <InfoEntreprise
              v-if="this.user.user.statut.statut === 'entreprise'"
              :infoPersonellesEntreprise="[
                { libelle: 'Nom :', value: user.nom },
                { libelle: 'Email :', value: user.email },
                { libelle: 'Matricule/cc :', value: user.matricule_cc },
                { libelle: 'Contact :', value: user.contact },
                { libelle: 'Ville :', value: user.ville },
                { libelle: 'Commune :', value: user.commune },
                { libelle: 'Quartier :', value: user.quartier },
                { libelle: 'Document :', value: user.registre },
                { libelle: 'Forme juridique :', value: user.forme_juridique },
              ]"
              :infoPersonellesGerant="[
                { libelle: 'Nom & Prénoms :', value: user.gerant },
                { libelle: 'Contact :', value: user.numero_gerant },
                { libelle: 'Pièce d identite :', value: user.piece_gerant },
              ]"
            />
            <InfoStudents
              :infoPersonellesStudents="[
                { libelle: 'Nom :', value: user.nom },
                { libelle: 'Prénoms :', value: user.prenoms },
                { libelle: 'Email :', value: user.email },
                { libelle: 'Ville :', value: user.ville },
                { libelle: 'Commune :', value: user.commune },
                { libelle: 'Quartier :', value: user.quartier },
                { libelle: 'Contact :', value: user.phone },
                { libelle: 'diplome :', value: user.diplome },
                { libelle: 'Pièce d identite :', value: user.photo },
              ]"
              :infoPersonellesCompetences="user.competences"
              v-if="this.user.user.statut.statut === 'etudiant'"
            />
          </div>
        </TabPanel>
        <TabPanel
          v-if="this.user.user.statut.statut === 'etudiant'"
          header="Compétences et Expériences"
        >
          <CompetencesAndExperience />
        </TabPanel>
        <TabPanel header="Mon Abonnement">
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
