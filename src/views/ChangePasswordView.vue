<script>
import instance from "../api/api";
import Swal from "sweetalert2";
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
        this.spinner = true
        instance.post("password/reset",{
            email:this.$route.params.email,
            password:this.password,
            token:this.$route.params.token
        })
        .then((res) => {
            console.log(res);
            this.spinner = false
             Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
        })
        .catch((err) => {
            console.log(err);
            this.spinner = false
            Swal.fire({
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
        })
     }
  },
};
</script>
<template>
  <!-- Page Title-->
  <div class="container-fluid page-title bg-image">
    <!-- <div class="charg" v-show="spinner"> 
      <div>
        <h1>Chargement....</h1>
      </div>
    </div> -->
    <div class="row section-title">
      <div class="container main-container">
        <div class="col-lg-8 col-md-8 col-sm-8">
          <h5 class="image-heading">Nouveau mot de passe</h5>
        </div>
      </div>
    </div>

    <form  @submit.prevent="verificationMotdepasse">
      <div class="row container-fluid">
       <div class="col-lg-12 text-left">
    <label for="email" class="d-block">Entrez votre nouveau mot de passe</label>

      <input class="w-100 px-4" type="password" v-model="password" placeholder=" Entrez votre nouveau mot de passe" required>
       </div>
       <div class="col-lg-12 text-left">
    <label for="email" class="d-block">Confirmation de mot de passe</label>
    
      <input class="w-100 px-4" type="password" v-model="cpassword" placeholder=" Entrez de nouveau votre mot de passe" required>
       </div>
      </div>
      <br>
      <div>
      <button :disabled="spinner ? true:false" class="btn-lg bg-primary" type="submit">
        {{ spinner ? "Loading...":"Envoyer"}}
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
