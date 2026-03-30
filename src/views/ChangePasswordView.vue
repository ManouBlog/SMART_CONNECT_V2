<script>
import instance from "../api/api";
import Swal from "sweetalert2";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner();
export default {
  name: "ChangePasswordView",
  data() {
    return {
     password:"",
     cpassword:"",
     email:"",
     spinner:false,
    };
  },
  methods: {
      verificationMotdepasse(){
        
        if(this.password !== this.cpassword){
          Swal.fire({
              icon: "error",
              title: "Veuillez-vous assurer que les deux mots de passe correspondent.",
              showConfirmButton: true,
            });
        }else{
           this.sendPassword()
        }        
        
      },
     sendPassword(){
      this.spinner = true;
       loadingSpinner.launchLoading(true);
        instance.post("password/reset",{
            email:this.$route.params.email,
            password:this.password,
            token:this.$route.params.token
        })
        .then((res) => {
            // console.log(res);
             Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
        })
        .catch((err) => {
            console.log(err)
            Swal.fire({
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
        })
        .finally(()=>{
         loadingSpinner.launchLoading(false);
         this.spinner = false;
        })
     }
  },
};
</script>
<template>
  <!-- Page Title-->
  <div class="container-fluid page-title bg-image">
     <h1 class="py-4" style="text-align:left;color:orange;">Nouveau mot de passe</h1>
    <form class="w-100 p-3"  @submit.prevent="verificationMotdepasse">
      <div class="row container-fluid px-5">
       <div class="col-lg-12 text-left">
    <label for="email" class="d-block my-3">Entrez votre nouveau mot de passe</label>

      <input class="w-100 px-4" type="password" v-model="password" placeholder=" Entrez votre nouveau mot de passe" required>
       </div>
       <div class="col-lg-12 text-left">
    <label for="email" class="d-block my-3">Confirmation de mot de passe</label>
    
      <input class="w-100 px-4" type="password" v-model="cpassword" placeholder=" Entrez de nouveau votre mot de passe" required>
       </div>
      </div>
      <br>
      <div>
      <button
      style="background: var(--secondary-color) !important;color: var(--third-color) !important;"
      :disabled="spinner ? true:false" 
      class="btn my-5" 
      type="submit">
       Envoyer
        </button>
      </div>
        
      </form>
  </div>
  <!-- Page Title-->

</template>
<style scoped>
  .position-relative{
    position: relative;
  }
  .charg{
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    width:100%;
    height:122%;
    background: rgb(239, 239, 239);
    display:flex;
    justify-content:center;
    place-items:center;
    z-index:1;
  }
.d-block{
    display:block;
}
.bg-primary{
  background: rgb(25, 53, 90) !important;
}
h5{
    color:rgb(0, 0, 0) !important;
}
form{
    width:50%;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.152);
    padding:5.15em 0;
    margin-bottom: 2em;
    margin-left:50%;
    transform: translateX(-50%);
    border-radius:10px;
}
.w-100{
    width:50%;
    padding:.3em 0;
}
label{
    font-size: 1em;
}



</style>
