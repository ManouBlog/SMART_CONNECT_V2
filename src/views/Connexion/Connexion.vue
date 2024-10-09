<script>
import LoginView from "./login/LoginView.vue"
import RegisterView from "./Register/RegisterView.vue"
import { mapActions,mapState } from "pinia";
import {useRegisterStore} from "../../store-pinia/register/useRegisterStore"
export default {
    name:'Connexion',
    components:{
        LoginView,
        RegisterView
    },
   data(){
    return{
        tabsActive:1,
    }
   },
   computed:{
    ...mapState(useRegisterStore,["isModal"]),
   },
   methods:{
    ...mapActions(useRegisterStore,{
     toogleModal:"changeValueIsModal"
    }),
    seeTabsChange(value){
        this.tabsActive = value
    }
   }
}
</script>
<template>
    <a-modal  :footer="null" v-model:open="isModal" @cancel="toogleModal" 
    @ok="toogleModal">
        <div v-if="Number(tabsActive) === 1">
            <h2 class="text-center">Saisissez votre e-mail</h2>
            <span>Nous vous aiderons à créer un compte si vous n'êtes pas encore inscrit</span>
        </div>
        <div v-if="Number(tabsActive) === 2">
            <h2 class="text-center">Trouvez un emploi aujourd'hui</h2>
            <span>Nous vous aiderons à créer un compte si vous n'êtes pas encore inscrit</span>
        </div>
        <a-tabs centered :size="'default'"
        @change="seeTabsChange"
        >
            <a-tab-pane key="1" tab="CONNEXION">
                <LoginView />
            </a-tab-pane>
            <a-tab-pane key="2" tab="INSCRIPTION">
                <RegisterView />
            
            </a-tab-pane>
          </a-tabs>
      </a-modal>
</template>