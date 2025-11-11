<script>
import instance from "../api/api";
import Swal from "sweetalert2";
export default {
  name: "ResetPasswordView",
  data() {
    return {
     email:"",
     spinner:false,
    };
  },
  methods: {
     
     sendEmail(){
      this.spinner = true
        instance.post("password/createNewPassword",{
            email:this.email,
            // mobile:1,
        })
        .then((res) => {
            // console.log(res.data.message);
             Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
        })
        .catch((err) => {
            console.log(err)
            Swal.fire({
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: true,
            });
          
        })
        .finally(()=>{
          this.spinner = false;
        });
     }
  },
};
</script>
<template>
 
 
 <section  v-if="this.$store.state.translate === 'FR'">
  <div>
 
 
    <div class="container-fluid page-title bg-image position-relative">
     <div class="row section-title">
       <div class="container main-container">
         <div class="col-lg-8 col-md-8 col-sm-8">
           <h5 class="image-heading fw-bold">Réinitialiser votre mot de passe</h5>
         </div>
       </div>
     </div>
     <form  @submit.prevent="sendEmail" >
     
       <div class="row container-fluid">
        <div class="col-lg-12">
     <label for="email" class="d-block">Entrez votre adresse email et nous vous enverrons <br>  un lien de réinitialisation de mot de passe</label>
       <input class="w-100 p-4 "
     
       type="email"
        v-model="email" placeholder=" Entrez votre adresse email" required>
        </div>
       </div>
       <br>
       <div>
       <button class="btn btn-Conex" :disabled="spinner ? true:false" type="submit">
         
       <span v-if="spinner">chargements...</span>
       <span v-else>Envoyer</span>  
       </button>
       </div>
         
       </form>
   </div>
 
   
  </div>
 </section>
 <section  v-if="this.$store.state.translate === 'EN'">
  <div>
 
 
    <div class="container-fluid page-title bg-image position-relative">
     <div class="row section-title">
       <div class="container main-container">
         <div class="col-lg-8 col-md-8 col-sm-8">
           <h5 class="image-heading fw-bold">Reset your password</h5>
         </div>
       </div>
     </div>
     <form  @submit.prevent="sendEmail" >
     
       <div class="row container-fluid">
        <div class="col-lg-12">
     <label for="email" class="d-block">Enter your email address and we will 
      send you a password reset link</label>
       <input class="w-100 p-4 "
     
       type="email"
        v-model="email" placeholder=" Enter your e-mail adress" required>
        </div>
       </div>
       <br>
       <div>
       <button class="btn btn-Conex" :disabled="spinner ? true:false" type="submit">
         
       <span v-if="spinner">Loading...</span>
       <span v-else>Send</span>  
       </button>
       </div>
         
       </form>
   </div>
 
   
  </div>
 </section>
</template>
<style scoped>
.p-4{
  padding: 1em;
}
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
  .btn-Conex{
    background: #F77F00 !important;
    color:white;
    border:1px solid black;
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
}
label{
    font-size: 1em;
}
@media (max-width: 1200px){
  form{
    width:100%;
}
}



</style>
