<script>
export default {
    name:'LoginView',
   data(){
    return{
        open :true,
        formState:{
  username: '',
  password: '',
  remember: true,
},
    }
   },
   methods:{
     onFinish(values) {
  console.log('Success:', values);
},
 onFinishFailed(errorInfo){
  console.log('Failed:', errorInfo);
}
   }
}
</script>
<template>
    <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Veuillez renseigner votre email!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Mot de passe"
      name="mot de passe"
      :rules="[{ required: true, message: 'Veuillez renseigner votre mot de passe!' }]"
    >
      <a-input-password v-model:value="formState.password" />
      
    </a-form-item>
    <a-form-item>
        <div class="text-right">
            <a class="login-form-forgot text-danger" href="">Mot de passe oublié</a>
        </div>
      
      </a-form-item>
    <a-form-item>
        <div class="d-flex justify-content-center">
            <a-button  type="primary" shape="round"  :size="'large'" html-type="submit">
                Se connecter</a-button>
        </div>
    
    </a-form-item>
  </a-form>
</template>