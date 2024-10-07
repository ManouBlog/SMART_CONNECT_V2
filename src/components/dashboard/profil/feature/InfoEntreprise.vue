<script>
import Swal from "sweetalert2";
import instance, { lienPhoto } from "../../../../api/api";
import Buttons from "../../../../Shared/Compoments/Buttons.vue"
export default {
  name: "InfoEntreprise",
  components:{
    Buttons
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
      user: this.$store.state.user,
      nom: "",
      isLoading: false,
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
      formState: { username: "", password: "" },
      elmentsOfBtn:[
  {
    name_btn: "Modifier",
    color_btn: "primary",
  },
],
    };
  },
  methods: {
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
            console.log(resp);
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
    update_compte_entreprise() {
      this.isLoading = true;
      console.log("update_compte_entreprise");
      let data = new FormData();
      data.append("nom", this.user.nom_entreprise);
      data.append("email", this.user.email);
      data.append("gerant", this.user.gerant);
      data.append("numero_gerant", this.user.numero_gerant);
      data.append("piece_gerant", this.user.fileForPieceGerant);
      data.append("commune", this.user.commune);
      data.append("forme_juridique", this.user.formeJuridique);
      data.append("quartier", this.user.quartier);
      data.append("contact", this.user.contact);
      data.append("ville", this.user.ville);
      data.append("matricule_cc", this.user.matriculeCC);
      data.append("password", this.user.password);
      data.append("statut_id", 1);
      data.append("registre", this.user.fileForRegistre);

      instance
        .post("modifier_profil", data)
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            // localStorage.setItem("user", JSON.stringify(res.data.user));
            // this.$store.state.user = res.data.user;
            // this.isLoading = false;
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            // this.isLoading = false;
          }
          this.isLoading = false;
        })

        .catch((err) => {
          console.log(err);
          this.isLoading = false;
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
  <section style="padding:2em 3em;">
    <a-card style="width: auto; background: rgba(179, 201, 255, 0.38)">
      <h1 class="fw-bold">Informations personnelles</h1>
      <section>
        <div class="row">
          <div
            v-for="(item, index) in infoPersonellesEntreprise"
            :key="index"
            class="col-lg-4 col-sm-6"
          >
            <p>{{ item.libelle }}</p>
            <h6 class="fw-bold">{{ item.value }}</h6>
          </div>
        </div>
      </section>
      <h1 class="fw-bold">Gérant</h1>
      <section>
        <div class="row">
          <div
            v-for="(item, index) in infoPersonellesGerant"
            :key="index"
            class="col-lg-4 col-sm-6"
          >
            <p>{{ item.libelle }}</p>
            <h6 class="fw-bold">{{ item.value }}</h6>
          </div>
        </div>
      </section>
      <section>
        <Buttons :elmentsOfBtn="elmentsOfBtn" :shapeBtn="'round'" />
        <!-- <button>Modifier</button> -->
      </section>
    </a-card>

    <a-card style="width: auto; background: rgba(179, 201, 255, 0.38); margin: 2em 0">
      <h1 class="fw-bold">Modifier mot de passe</h1>
      <section>
        <a-form
          :layout="'vertical'"
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          style="display: flex;gap:2em;align-items:center;flex-wrap:wrap;justify-content:space-between;"
        >
          <a-form-item
            label="Entrer votre mot de passe actuel"
            name="Entrer votre mot de passe actuel"
            :rules="[{ required: true, message: 'Entrer votre mot de passe actuel' }]"
          >
          <a-input-password v-model:value="formState.password" />
          </a-form-item>
          <a-form-item  label="Nouveau mot de passe" name="Nouveau mot de passe">
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
          <a-form-item
      
            label="Confirmer le nouveau mot de passe"
            name="Confirmer le nouveau mot de passe"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">Modifier</a-button>
          </a-form-item>
        </a-form>
      </section>
    </a-card>
    <!-- <div
    class="card-body text-left py-4"
    v-if="this.user.user.statut.statut === 'entreprise'"
  >
    <div class="row">
        <legend class="w-25 mx-5">Entreprise</legend>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Nom</label>
          <input
            v-model="user.nom"
            class="form-control"
            type="text"
            disabled
          />
        </div>
      </div>

      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="user.email"
            class="form-control"
            type="email"
            
          />
        </div>
      </div>

      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Matricule/cc</label>
          <input
            v-model="user.matricule_cc"
            class="form-control"
            type="text"
            disabled
          />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Contact</label>
          <input
            v-model="user.contact"
            class="form-control"
            type="text"
            
          />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Ville</label>
          <input
            v-model="user.ville"
            class="form-control"
            type="text"
            disabled
          />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Commune</label>
          <input
            v-model="user.commune"
            class="form-control"
            type="text"
            disabled
          />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3"  v-if="user.quartier">
          <label class="form-label">Quartier</label>
          <input
          
            v-model="user.quartier"
            class="form-control"
            type="text"
            disabled
          />
         
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3" v-if="user.registre">
          <label class="form-label d-block">Registre</label>
          <i class="bi bi-filetype-pdf"></i>
                    <a :href="lienPhoto + user.registre" download>Download</a>
        </div>
      </div>
      <legend class="w-25 mx-5">Gérant</legend>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Nom & prénoms</label>
          <input
            v-model="user.gerant"
            class="form-control"
            type="text"
         
          />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Numéro</label>
          <input
            v-model="user.numero_gerant"
            class="form-control"
            type="text"
            
          />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label d-block">Pièce d'identité</label>
          <img
                      :src="
                      lienPhoto + user.piece_gerant
                      "
                      :alt="user.piece_gerant"
                      class="w-25"
                    />
        <div class="my-3">
            <label for="add_file">Nouvelle pièce d'identité</label>
            <input type="file" id="add_file" class="w-100" >
        </div>
        </div>
      </div>
    </div>
    <div class="text-right">
        <button class="btn-lg bg-warning"
        :disabled="isLoading"
         @click.prevent="update_compte_entreprise">
         
        {{ isLoading ? "chargement...":"Modifier" }} 
        
        </button>
    </div>
  </div> -->
  </section>
</template>
<style scoped>

h6,h1 {
  text-align: left;
}
</style>
