<script>
import Swal from "sweetalert2";
import instance, { lienPhoto, lienPDF } from "../../../../api/api";
import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions } from "pinia";
import { useLoadingSpinner } from "../../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import ParagrapheDetail from "../ParagrapheDetail.vue";
export default {
  name: "InfoEntreprise",
  components: {
    Buttons,
    ParagrapheDetail
  },
  props: {
    infoPersonnelles:{
      type: Object,
      required: false,
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
      user: this.$store.state.infoUserConnected,
      nom: "",
texte0989:"",
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
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
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
    async handleActivationCompteEmail() {
      this.launchLoading(true);
      await instance
        .post("send-verification-email")
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: true,
            });
          }
        })

        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.launchLoading(false);
        });
    },
    see(e) {
      this.photo = e.target.files[0];
      
    },
  },
  async created() {
    this.texte0 = await this.handleTranslate("Infos sur l’entreprise");
     this.texte0989 = await this.handleTranslate(`Infos personnelle`);
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
  <section>
    <a-card
      style="
        width: auto;
        color: var(--third-color);
        background: var(--secondary-color) !important;
      "
    >
      <h1 class="fw-bold" style="color: orange">{{ user.user?.statut?.statut != 'Entreprise' ? texte0989:texte0 }}</h1>
      <div style="display: flex; align-items: center;">
        <span class="badge" :class="user.user.verif_email ? 'bg-success' : 'bg-danger'"
          >Compte {{ user.user.verif_email ? "Activé" : "Inactif" }}</span
        >
        <button
          v-if="!user.user.verif_email"
          style="background: orange; color: white; font-weight: 900"
          @click="handleActivationCompteEmail"
        >
          Activer mon compte
        </button>
      </div>

      <section class="my-5">
        <div class="container">
          <div class="row">

            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.statut_entreprise">
            <ParagrapheDetail  :item="{libelle:'Statut',
          value:this.infoPersonnelles?.statut_entreprise}" />
            </div>

            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.statut_entreprise == 'Formelle'">
    <ParagrapheDetail  
            :item="{libelle:'Raison social', value: this.infoPersonnelles?.nom}" />
            </div>
             <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.statut_entreprise == 'Informelle'">
            <ParagrapheDetail 
          :item="{libelle:'Nom de l\'entreprise', value: this.infoPersonnelles?.nom_particulier}" />
            </div>
            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.statut_entreprise == 'Informelle'">
           <ParagrapheDetail  
          :item="{libelle:'Nom du gérant', value: this.infoPersonnelles?.nom}" />
            </div>

            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.particulier_prenoms">
     <ParagrapheDetail  
          :item="{libelle:'Prénoms du gérant', value: this.infoPersonnelles?.particulier_prenoms}" />
            </div>
             <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles.user.statuses.some(item=>item.statut == 'Particulier')">
    <ParagrapheDetail :item="{libelle:'Nom', value: this.infoPersonnelles?.user?.nom}" />
            </div>
            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.prenoms">
  <ParagrapheDetail :item="{libelle:'Prénoms', value: this.infoPersonnelles?.prenoms}" />
            </div>

            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.email">
     <ParagrapheDetail :item="{libelle:'Email', value: this.infoPersonnelles?.email}" />
            </div>

             <div class="col-md-6" style="flex:1"  v-if="this.infoPersonnelles?.ville">
  <ParagrapheDetail :item="{libelle:'Ville', value: this.infoPersonnelles?.ville}" />
            </div>

            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.commune">
       <ParagrapheDetail :item="{libelle:'Commune', value: this.infoPersonnelles?.commune}" />
            </div>
             <div class="col-md-6" style="flex:1">
  <ParagrapheDetail :item="{libelle:'Quartier', value: this.infoPersonnelles?.quartier}" />
            </div>

            <div class="col-md-6" style="flex:1">
     <ParagrapheDetail :item="{libelle:'Contact téléphonique', value: this.infoPersonnelles?.phone}" />
            </div>

             <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.niveauEtude">
     <ParagrapheDetail :item="{libelle:'Niveau d\'etude', value: this.infoPersonnelles?.niveauEtude}" />
            </div>
            <div class="col-md-6" style="flex:1" v-if=this.infoPersonnelles?.user?.statut_professionnel_artisan>
     <ParagrapheDetail :item="{libelle:'Statut professionnel', 
     value: this.infoPersonnelles?.user?.statut_professionnel_artisan}" />
            </div>
            
            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.matricule_cc">
     <ParagrapheDetail  :item="{libelle:'Registre du Commerce et du Crédit Mobilier',
          value:this.infoPersonnelles?.matricule_cc}" />
            </div>
            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles.registre">
   <ParagrapheDetail  :item="{libelle:'Registre Pdf',
          value:null,valueArray:[{path:this.infoPersonnelles.registre}]}" />
            </div>

            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.NCC">
 <ParagrapheDetail  :item="{libelle:'NCC (Numéro de compte contribuable)',
          value:this.infoPersonnelles?.NCC}" />
            </div>
            <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.logo">
   <ParagrapheDetail  :item="{libelle:'Logo',
          value:null,valueArray:[{path:this.infoPersonnelles?.logo}]}" />
            </div>

            <div class="col-md-6" style="flex:1">
 <ParagrapheDetail :item="{libelle:'Forme Juridique',
          value:this.infoPersonnelles?.forme_juridique}" />
            </div>
             <div class="col-md-6" style="flex:1" v-if="this.infoPersonnelles?.emails?.length">
              <p 
    style="color: orange; font-weight: bold"
        
      >
        Emails en copies :
      </p>
      <div style="display:flex;gap:0.4em;flex-wrap: wrap;">
        <p v-for="el in this.infoPersonnelles?.emails"
            :key="el"
            >
            <span class="badge" style="background-color: gray;
            color: orange;font-weight: bold;padding: 0.5em;">{{  el?.email_cc }}</span>
            </p>
      </div>
              
            </div>

          </div>
  
        </div>

      </section>
      <h1 class="fw-bold" style="color: orange" v-if="this.infoPersonnelles?.gerant">
        {{ texte1 }}
      </h1>
      <section class="container">

        <div class="row">
            <div class="col-md-6" style="flex:1">
    <ParagrapheDetail :item="{libelle:'Nom du gérant',
          value:this.infoPersonnelles?.gerant}" />
            </div>
            <div class="col-md-6" style="flex:1">
    <ParagrapheDetail :item="{libelle:'Numéro du gérant',
          value:this.infoPersonnelles?.numero_gerant}" />
            </div>
          </div>

           <div class="row" v-if="this.infoPersonnelles?.user?.photos.length">
            <div class="col-md-6" 
            >
              <div class="row">
        <div class="col-md-4" v-if="infoPersonnelles.user.photos.some(item => item.path.includes('Carte_etudiant'))">
 <ParagrapheDetail
    :item="{
      libelle: 'Carte étudiant',
      value: null,
      valueArray: infoPersonnelles.user.photos.filter(item =>
        item.path.includes('Carte_etudiant')
      )
    }"
  />
        </div>
        <div class="col-md-4"  v-if="infoPersonnelles.user.photos.some(item => item.path.includes('CNI'))">
 <ParagrapheDetail
    :item="{
      libelle: 'Titre d\'identifications',
      value: null,
      valueArray: infoPersonnelles.user.photos.filter(item =>
        item.path.includes('CNI')
      )
    }"
  />
        </div>
        <div class="col-md-4" v-if="infoPersonnelles.user.photos.some(item =>
      !item.path.includes('CNI') &&
      !item.path.includes('Carte_etudiant')
    )">
   <ParagrapheDetail
    :item="{
      libelle: 'Pièces Jointes',
      value: null,
      valueArray: infoPersonnelles.user.photos.filter(item =>
        !item.path.includes('CNI') &&
        !item.path.includes('Carte_etudiant')
      )
    }"
  />
        </div>

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
            <!-- Ancien mot de passe -->
            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">{{ texte3 }}</label>
                <a-input-password v-model:value="password" />
              </div>
            </div>

            <!-- Nouveau mot de passe -->
            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">{{ texte4 }}</label>
                <a-input-password v-model:value="nouveau_password" />
              </div>
            </div>

            <!-- Confirmation -->
            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">{{ texte5 }}</label>
                <a-input-password v-model:value="confirmation_password" />
              </div>
            </div>
          </div>

          <!-- Bouton -->
          <div class="text-center">
            <button
              class="btn bg-warning"
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
  font-size: 1.2em;
}
h1 {
  text-align: left;
}
</style>
