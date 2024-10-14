import { defineStore } from 'pinia'
import { useRouter} from 'vue-router';
import { useStore } from 'vuex';
import {useCinetpayStore} from '../useCinetpayStore'
import {useSwalPopup} from "../SwalPopup/useSwalPopup"
import {useLoadingSpinner} from "../LoadingSpinner/useLoadingSpinner"
import instance from "../../api/api";

const isHolding={
    'entreprise':true
  }
export const useAbonnementsStore =defineStore('abonnements',()=>{
     const cinetpayStore = useCinetpayStore()
     const loadingSpinner = useLoadingSpinner()
     const SWALPOPUP = useSwalPopup(); 
    const router = useRouter()
    const store = useStore();


   const createAbonement = async (idAbonnement,priceAbonnement)=>{
      if(!store.state.token){
        router.push('/registre');
      }else{
        loadingSpinner.launchLoading(true)
        const TRANSACTION_ID = Math.floor(Math.random() * 100000000).toString();
        const NOTIFY_URL = "https://lce-ci.com/"
         try {
        const response = await instance.post("cintepay/paiement", {
          abonement_id: idAbonnement,
          channels: "MTN",
          transaction_id:TRANSACTION_ID
        });
        SWALPOPUP.declencheSwalPopup("success",response.data.message)
        if(response['status'] === 200){
            const payload = {
                price:priceAbonnement,
                transaction_id:TRANSACTION_ID,
                notify_url:NOTIFY_URL,
                user:{
                  id:store.state.user.id,
                  name:store.state.user.user.nom,
                  surname:isHolding[store.state.user.user.statut.statut] ? "Entreprise":store.state.user.user.prenoms,
                  email:store.state.user.email
                }
              }
              cinetpayStore.paymentCinetpay(payload);
        }
        loadingSpinner.launchLoading(false)
        console.log("RESPONSE_getAbonnement", response.data);
       
      } catch (error) {
        console.log(error);
        SWALPOPUP.declencheSwalPopup("info",error.response.data.message)
        loadingSpinner.launchLoading(false)
      }
        
    
      }
      
    };

   
    return{
        createAbonement,
    }
})