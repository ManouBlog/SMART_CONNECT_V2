import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStore } from 'vuex';
import instance from "../api/api";
// import axios from 'axios'
import Paystack from '@paystack/inline-js';

export const useCinetpayStore = defineStore('cinetpay',()=>{
const store = useStore();

    const PAYSTACK_PUBLIC_KEY = ref(process.env.VUE_APP_PAYSTACK_PUBLIC_KEY);

    const paymentCinetpay = (payload)=>{
      console.log("payload",payload)
     const popup = new Paystack()
     popup.newTransaction({
     key: PAYSTACK_PUBLIC_KEY.value,
     email: store.state.user.email,
     currency: "XOF",
     amount: payload.priceAbonnement*100,
     onSuccess: async(transaction) => {
    console.log(transaction);
    if(transaction.status === 'success'){
     const response = await instance.get("payStack/payment/callback/success/"+JSON.parse(localStorage.getItem("@ID")));
     if(response.data.status){
      localStorage.removeItem("@ID")
     }
    }
     },
     onLoad: async (response) => {
     console.log("onLoad: ", response);
      await instance.post("payStack/paiement", {
          abonement_id: payload?.idAbonnement,
          channels: "undefined",
          transaction_id:response?.id
        });
       localStorage.setItem("@ID",JSON.stringify(response?.id))
     },
     onCancel: async() => {
       console.log("onCancel");
       const response = await instance.get("payStack/payment/callback/cancel/"+JSON.parse(localStorage.getItem("@ID")));
       if(response.data.status){
      localStorage.removeItem("@ID")
     }
      },
      onError: (error) => {
       console.log("Error: ", error.message);
        localStorage.removeItem("@ID")
       }
})

    }

    return{
        paymentCinetpay
    }
})