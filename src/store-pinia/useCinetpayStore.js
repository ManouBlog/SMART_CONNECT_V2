import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import { useStore } from 'vuex';
import instance from "../api/api";
// import axios from 'axios'
// import Paystack from '@paystack/inline-js';
// import { useEntreprisesStore } from "../store-pinia/Entreprise/useEntreprisesStore";

export const useCinetpayStore = defineStore('cinetpay',()=>{
// const store = useStore();
// const storeEntreprise = useEntreprisesStore();
    // const PAYSTACK_PUBLIC_KEY = ref(process.env.VUE_APP_PAYSTACK_PUBLIC_KEY);

    const paymentCinetpay = async (payload)=>{
        const randomPart = Math.random().toString(36).substring(2);
        console.log("payload",payload)
        
        const data = {
            abonement_id:payload.idAbonnement,
            channels:"undefined",
            transaction_id:randomPart
        }
        try{

           const RESPONSEINITALISATION = await instance.post("payStack/paiement",data);
             console.log("RESPONSEINITALISATION",RESPONSEINITALISATION)
             localStorage.setItem('@reference',JSON.stringify(randomPart))
             window.location.href = RESPONSEINITALISATION.data.data.authorization_url;
        }catch(error){
        console.log(error)
        }
    }

//     const paymentCinetpay = (payload)=>{
//       console.log("payload",payload)
//      const popup = new Paystack()
//      popup.newTransaction({
//      key: PAYSTACK_PUBLIC_KEY.value,
//      email: store.state.user.email,
//      amount: payload.priceAbonnement,
//      onSuccess: async(transaction) => {
//     console.log(transaction);
//     if(transaction.status === 'success'){
//      const response = await instance.get("payStack/payment/callback/success/"+JSON.parse(localStorage.getItem("@ID")));
//      if(response.data.status){
//       localStorage.removeItem("@ID")
//       await storeEntreprise.get_all_abonnement();
//      }
//     }
//      },
//      onLoad: async (response) => {
//      console.log("onLoad: ", response);
//      localStorage.setItem("@RESPONSEID",JSON.stringify(response.customer.id))
//      localStorage.setItem("@ACCESCODE",JSON.stringify(response.accessCode))
//      },
//      onCancel: async() => {
//        console.log("onCancel");
//        popup.resumeTransaction(JSON.parse(localStorage.getItem("@ACCESCODE")))
//       // await verifIfPayementIsOk(JSON.parse(localStorage.getItem("@RESPONSEID")))
//        const response = await instance.get("payStack/payment/callback/cancel/"+JSON.parse(localStorage.getItem("@ID")));
//        if(response.data.status){
//       localStorage.removeItem("@ID")
//      }
//       },
//       onError: (error) => {
//        console.log("Error: ", error.message);
//         localStorage.removeItem("@ID")
//        }
// })

//     }

    return{
        paymentCinetpay
    }
})