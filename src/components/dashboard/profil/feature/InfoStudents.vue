<script>
import Swal from "sweetalert2";
import instance, { lienPhoto,lienPDF } from "../../../../api/api";
import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { useLoadingSpinner } from "../../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { mapActions } from "pinia";
import { Help } from "../../../../utils";
import ParagrapheDetail from "../ParagrapheDetail.vue";

export default {
  name: "InfoStudents",
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
      Help: Help,
      user: "",
      nom: "",
      modeActif: false,
      lienPDF: lienPDF,
      showCvModal : false,
      showModalBadgeVerifi:false,
      prenoms: "",
      lienPhoto: lienPhoto,
      password: null,
      commune: "",
      quartier: "",
      ville: "",
      diplome: "",
      phone: "",
      registre_commerce: "",
      showPdf:false,
      oldPassword: "",
      photo: {},
      isLoading: false,
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
      "updateCompteUser",
      "addInfoUserConnected",
    ]),
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
   
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
     
        const reponse = await this.updateCompteUser({
          photo_profil: file,
        });
        if(reponse.status){
         this.user = reponse?.compte
         await this.getInfoUser()
        }
      
      }
    },
    async getInfoUser() {
      this.isLoading = true;
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          if (resp.data.status === true) {
            this.user = resp.data.user;
             this.$store.dispatch("getInfoUser");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleModalInfo(payload = null){
    this.addInfoUserConnected( this.user)
      if (payload) {
        this.changeValueForToogleModalInfoPersonnelle({ isCv: true, isbtnPdf: true });
      } else {
        this.changeValueForToogleModalInfoPersonnelle({ isCv: false, isbtnPdf: true });
      }
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
   await this.getInfoUser();
  },
};
</script>

<template>
  <section>
   
    <div v-if="isLoading">
      <h5 style="text-align: center" class="shimmer-text">Chargement...</h5>
    </div>
    <a-card
      v-if="user"
      style="
        width: auto;
        color: var(--third-color) !important;
        background: var(--secondary-color) !important;
      "
    >
      <div class="info-header" style="display: flex; justify-content: space-between">
        <h1 class="fw-bold my-3" style="color: orange;font-size: 2em;">Infos personnelles</h1>
        <div>
         <button
          style="
            height: auto;
            width: auto;
            background: orange;
            color: white;
            font-weight: bold;
            border-radius: 10%;
            padding:0.5em;
          "
          @click="handleModalInfo(1)"
        >
          Voir Mon CV
        </button>
        </div>
        
      </div>
      <div
        class="conteneur_activation"
        style="display: flex; align-items: center;"
      >
        <span
          class="badge"
          style="text-align: center"
          :class="user.user.verif_email ? 'bg-success' : 'bg-danger'"
        >
          Compte {{ user.user.verif_email ? "Activé" : "Inactif" }}
    </span>

        <button
          v-if="!user.user.verif_email"
          style="background: orange; color: white; font-weight: 900"
          @click="handleActivationCompteEmail"
        >
          Activer mon compte
        </button>
        
      </div>
     <!-- {{ user }} -->

      <div class="d-flex" style="position: relative">
        <input
          id="hiddenFile"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleFileChange"
        />
        <button
          class="btn_photo_profil"
          onclick="document.getElementById('hiddenFile').click()"
        >
          <n-avatar
            v-if="user.photo_profil"
            style="
              border: 3px solid white;
              object-fit: cover;
              width: 120px;
              height: 120px;
            "
            round
            :src="lienPhoto + user.photo_profil"
          />
          <p
            style="
              border: 3px solid white;
              object-fit: cover;
              width: 100px;
              height: 100px;
              line-height: 100px;
              text-align: center;
              font-size: 1em;
              border-radius: 100%;
              background: gray;
            "
            v-else
          >
            <span style="font-size: 2.5em">{{ Help.toADfirstTwo(user.nom) }}</span>
          </p>
          
        </button>
        <i class="bi bi-patch-check-fill" 
          v-if="this.$store?.state?.user?.user?.is_verified"
          style="color:rgb(0, 171, 251);font-size: 1em !important;"></i> 
        <i class="bi bi-camera-fill"></i>
      </div>
      <div v-if="infoPersonnelles?.titreCv">
        <p  style="color: orange; font-weight: bold">Profil</p>
        <p style="text-transform: uppercase;">
          {{ infoPersonnelles?.titreCv }}
        </p>
      </div>
      <div v-if="infoPersonnelles?.bio">
        <p  style="color: orange; font-weight: bold">Biographie de votre profil</p>
        <p
         
          style="
            text-align: justify;
            padding: 0.4em;
            font-weight: bold;
            background: #80808085;
            border-radius: 10px;
          "
        >
          {{ infoPersonnelles?.bio }}
        </p>
      </div>
     
      <section class="my-5">     
       <div>
        <div class="row gy-2">
    <div class="col-md-6" style="flex:1">
     <!-- <P>Code de parrainage : {{ infoPersonnelles }}</P> -->
    </div>
   
  </div>
  <div class="row gy-2">
    <div class="col-md-6" style="flex:1">
      <ParagrapheDetail :item="{ libelle: 'Nom', value: infoPersonnelles.nom }" />
    </div>
    <div class="col-md-6" style="flex:1">
      <ParagrapheDetail :item="{ libelle: 'Prénoms', value: infoPersonnelles.prenoms }" />
    </div>
  </div>

  <!-- Ligne 2 -->
  <div class="row gy-2">
    <div class="col-md-6" style="flex:1">
      <ParagrapheDetail :item="{ libelle: 'Email', value: infoPersonnelles.email }" />
    </div>
    <div class="col-md-6" style="flex:1">
      <ParagrapheDetail :item="{ libelle: 'Contact', value: infoPersonnelles.phone }" />
    </div>
  </div>

  <!-- Ligne 3 -->
  <div class="row gy-2">
    <div class="col-md-6" style="flex:1">
      <ParagrapheDetail :item="{ libelle: 'Ville', value: infoPersonnelles.ville }" />
    </div>
    <div class="col-md-6" style="flex:1">
      <ParagrapheDetail :item="{ libelle: 'Commune', value: infoPersonnelles.commune }" />
    </div>
  </div>

  <!-- Ligne 4 -->
  <div class="row gy-2">
    <div class="col-md-12" style="flex:1" v-if="infoPersonnelles.quartier">
      <ParagrapheDetail  :item="{ libelle: 'Quartier', value: infoPersonnelles.quartier }" />
    </div>
   <div class="col-md-12" 
      v-if="infoPersonnelles.user.photos.length">
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
      libelle: 'Titre d\'identifications',
      value: null,
      valueArray: infoPersonnelles.user.photos.filter(item =>
        !item.path.includes('CNI') || !item.path.includes('cni')  &&
        !item.path.includes('Carte_etudiant')
      )
    }"
  />

        </div>

      </div>
</div>
  </div>

  <!-- Ligne 5 -->
  <div class="row gy-2">
    <div class="col-md-6" style="flex:1" v-if="infoPersonnelles.statut_talent || infoPersonnelles.user.statut_professionnel_artisan">
        <p 
    style="color: orange; font-weight: bold"
        
      >
        Statut Professionnel :
      </p>
      <p v-for="item in [infoPersonnelles.statut_talent, infoPersonnelles.user.statut_professionnel_artisan]"
      :key="item"
      style="display: flex;gap:1em;align-items:center"
      >
     <span class="badge bg-warning">{{ item }}</span>
      </p>
     
      <!-- <ParagrapheDetail
        v-if="infoPersonnelles.statut_talent || infoPersonnelles.user.statut_professionnel_artisan"
        :item="{
          libelle: 'Statut Professionnel',
         
          valueArray: ,
        }"
      /> -->
    </div>
    <div class="col-md-6" style="flex:1" v-if="infoPersonnelles.diplome">
      <ParagrapheDetail :item="{ libelle: 'Niveau d\'étude', value: infoPersonnelles.diplome }" />
    </div>
  </div>

  <!-- Ligne 6 -->
  <div class="row gy-2">
    <div class="col-md-6" style="flex:1" v-if="infoPersonnelles.modeTravail">
      <ParagrapheDetail :item="{ libelle: 'Mode de travail', value: infoPersonnelles.modeTravail }" />
    </div>
    <div class="col-md-6" style="flex:1" v-if="infoPersonnelles.tempsTravail">
      <ParagrapheDetail :item="{ libelle: 'Temps de travail', value: infoPersonnelles.tempsTravail }" />
    </div>
     <div class="col-md-6" style="flex:1" v-if="infoPersonnelles.treatment_preferentiel">
      <ParagrapheDetail :item="{ libelle: 'Traitement préferentiel', value: infoPersonnelles.treatment_preferentiel }" />
    </div>
  </div>

    <!-- Ligne 7 -->
  <div class="row gy-2" v-if="infoPersonnelles?.CVupload">
    <div class="col-md-6" style="flex:1">
       <p style="color: orange; font-weight: bold">
      CV Chargé : 
      </p>
      <div>
    <!-- Bouton pour afficher le CV -->
    <button @click="showPdf = true" 
    style="
    border:2px solid orange;
    background-color: orange;">
      Voir mon CV Chargé
    </button>

    <!-- Cadre (iframe) pour afficher le PDF -->
   <!-- Modal -->
    <div class="modal" v-if="showPdf" @click.self="showPdf = false">
      <div class="modal-content">
        <div class="modal-header">
          <h5 style="color: black;">Mon CV chargé</h5>
          <button @click="showPdf = false">✕</button>
        </div>

        <div class="modal-body">
          <iframe
            :src="lienPhoto+infoPersonnelles.CVupload"
            width="100%"
            height="500"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
    </div>
   
  </div>
</div>
      </section>
      <section class="my-5 text-center">
        <Buttons
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleModalInfo"
        />
      </section>
    </a-card>
    <a-card
      v-if="user"
      style="
        width: auto;
        color: var(--third-color) !important;
        background: var(--secondary-color) !important;
        margin: 2em 0;
      "
    >
      <h1 class="fw-bold" style="color: orange">Modifier mot de passe</h1>
      <section>
        <div class="card-body text-left py-4">
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">Ancien mot de passe</label>
                <a-input-password v-model:value="password" />
                <!-- <input v-model="password" class="form-control" type="password" /> -->
              </div>
            </div>

            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">Nouveau mot de passe</label>
                <a-input-password v-model:value="nouveau_password" />
              </div>
            </div>

            <div class="col-lg-4 col-sm-6">
              <div class="mb-3">
                <label class="form-label">Confirmation du nouveau mot de passe</label>
                <a-input-password v-model:value="confirmation_password" />
              </div>
            </div>
          </div>
          <div class="text-center">
            <button
              class="btn bg-warning"
              style="
                border-radius: 32px;
                padding-inline-start: 16px;
                padding-inline-end: 16px;
              "
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 90%;
  min-width: 300px;
  max-width: 800px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
}

.modal-header h5 {
  margin: 0;
  font-size: 16px;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 10px;
}

.modal-footer {
  padding: 12px 16px;
  border-top: 1px solid #eee;
  text-align: right;
}

.modal-footer button {
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.shimmer-text {
  font-weight: 600;
  background: linear-gradient(
    90deg,
    #999 0%,
    #fff 50%,
    #999 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.conteneur-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1em;
  justify-content: flex-start;
}

.btn_photo_profil {
  background: transparent;
  border: none;
  margin-top: 1em;
}
.badge_star{
   position: absolute;
   top:3em;
   left:5em;
  z-index: 1;
}

.bi-camera-fill {
  font-size: 1.2em !important;
  position: absolute;
  bottom: 0;
  left: 5em;
  z-index: 1;
  color: rgb(0, 0, 0);
  font-weight: bold;
  text-align: center;
  width: 43px;
  background: rgb(255, 255, 255);
  padding: 0.5em;
  border-radius: 100%;
}

h6 {
  text-align: left;
  font-size: 1.2em;
}
h1 {
  text-align: left;
}

/* ✅ Responsive pour tablettes et mobiles */
@media (max-width: 992px) {
  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .col-lg-4,
  .col-sm-6 {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .info-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8em;
  }

  .info-header h1 {
    font-size: 1.4rem;
  }

  .info-header button {
    font-size: 0.9rem;
    padding: 0.4em 0.8em;
    border-radius: 6px;
    margin: 1em 0;
  }

  .conteneur_activation {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 0.8em;
  }

  .bi-camera-fill {
    left: 3.5em;
    font-size: 1em;
  }

  .conteneur-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6em;
  }

  .n-image {
    width: 80px !important;
    height: auto !important;
  }
}

/* ✅ Très petits écrans (téléphones ≤ 480px) */
@media (max-width: 480px) {
  .info-header h1 {
    font-size: 1.2rem;
  }

  .info-header button {
    font-size: 0.8rem;
  }

  .bi-camera-fill {
    left: 2.8em;
  }

  h6 {
    font-size: 1.2em;
  }

  .a-card,
  section {
    padding: 0.1em !important;
  }
}
</style>

<!-- <style scoped>
.conteneur-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
  justify-content: space-between;
}
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
  font-size: 1.2em;
}
h1 {
  text-align: left;
}

/* ✅ Version mobile */
@media (max-width: 768px) {
  .info-header,
  conteneur_activation {
    margin: 2em 0;
  }

  .info-header h1 {
    font-size: 1.5rem;
  }

  .info-header button {
    width: auto;
    margin: 0 auto;
    font-size: 0.7em;
    border-radius: 8px !important;
  }
}
@media (max-width: 368px) {
  .conteneur-flex {
    place-content: center;
  }
}
</style> -->
