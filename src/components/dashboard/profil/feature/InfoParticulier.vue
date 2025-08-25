
<script>
import Swal from "sweetalert2";
import instance,{lienPhoto} from "../../../../api/api";
export default {
  name: "InfoParticulier",
  data() {
    return {
      user: this.$store.state.user,
      nom: "",
      isLoading:false,
      prenoms: "",
      lienPhoto:lienPhoto, 
      password: null,
      commune: "",
      quartier: "",
      ville: "",
      diplome: "",
      phone: "",
      registre_commerce: "",
      oldPassword: "",
      photo: {},
      cpassword:"",
      msgErr:false
    };
  },
  methods: {
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
      this.routeForLaunch(info)
     
      
    },
    modifyPasswordOfEntreprise() {
      let Entreprise = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(Entreprise)
    
      
    },
   
    modifyPasswordOfAdmin() {
      let admin = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(admin)
     
    },
    routeForLaunch(data){
      if (this.cpassword !== this.password) {
        this.msgErr = true
      }else{
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
          alert(JSON.stringify(error,null,2));
        });
      }
    },
    update_compte_entreprise() {
        this.isLoading = true;
      let compte_entreprise = {
        nom: this.nom,
        registre_commerce: this.registre_commerce,
        password: this.password,
        oldPassword: this.oldPassword,
      };
      instance
        .put("modifier_profil", compte_entreprise)
        .then((res) => {
          // console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.$store.state.user = res.data.user;
            this.isLoading = false;
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.isLoading = false;
          }
        })
        .catch((err) => {
          alert(JSON.stringify(err,null,2))
          this.isLoading = false;
        });
    },
    see(e) {
      this.photo = e.target.files[0];
      // console.log(this.photo);
    },
  },
};
</script>

<template>
    <div
    class="card-body text-left py-4"
    v-if="this.user.user.statut.statut === 'particulier'"
  >
    <div class="row">
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
          <label class="form-label">Prénoms</label>
          <input
            v-model="user.particulier_prenoms"
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
        <div class="mb-3">
          <label class="form-label">Quartier</label>
          <input
           v-if="user.quartier !== null"
            v-model="user.quartier"
            class="form-control"
            type="text"
            disabled
          />
          <p v-else>Pas saisir</p>
        </div>
      </div>
      
<!-- 
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
      </div> -->
    </div>
    <div class="text-right">
        <button class="btn-lg bg-warning"
        :disabled="isLoading"
         @click.prevent="update_compte_entreprise">
         
        {{ isLoading ? "chargement...":"Modifier" }} 
        
        </button>
    </div>
  </div>
</template>