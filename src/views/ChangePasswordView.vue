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

  <h1
    class="py-4"
    style="text-align:left;color:orange;"
  >
    Nouveau mot de passe
  </h1>

  <a-form
    layout="vertical"
    class="w-100 p-3"
    @finish="verificationMotdepasse"
  >

    <div class="row container-fluid px-5">

      <div class="col-lg-12">

        <a-form-item
          label="Entrez votre nouveau mot de passe"
          name="password"
          :rules="[
            {
              required: true,
              message: 'Veuillez entrer votre mot de passe',
            }
          ]"
        >
          <a-input-password
            v-model:value="password"
            size="large"
            placeholder="Entrez votre nouveau mot de passe"
          />
        </a-form-item>

      </div>

      <div class="col-lg-12">

        <a-form-item
          label="Confirmation de mot de passe"
          name="cpassword"
          :rules="[
            {
              required: true,
              message: 'Veuillez confirmer votre mot de passe',
            }
          ]"
        >
          <a-input-password
            v-model:value="cpassword"
            size="large"
            placeholder="Entrez de nouveau votre mot de passe"
          />
        </a-form-item>

      </div>

    </div>

    <div class="px-5">

      <a-button
        html-type="submit"
        type="primary"
        size="large"
        :loading="spinner"
        style="background: orange;border-color: orange;"
      >
        Envoyer
      </a-button>

    </div>

  </a-form>

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
  background: orange !important;
}
h5{
    color:rgb(0, 0, 0) !important;
}
form{
    width:50%;
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
  .page-title{
    margin-top: 7em;
  }


</style>
