import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStore } from 'vuex';
import instance from "../api/api";
// import axios from 'axios'
import Paystack from '@paystack/inline-js';

export const useCinetpayStore = defineStore('cinetpay',()=>{
const store = useStore();

    const PAYSTACK_PUBLIC_KEY = ref(process.env.VUE_APP_PAYSTACK_PUBLIC_KEY);
    // const PAYSTACK_SECRET_KEY = ref(process.env.VUE_APP_PAYSTACK_SECRET_KEY);
    // async function verifIfPayementIsOk(reference){
    //   console.log("verifIfPayementIsOk",reference)
    //   try{
    //     const response = await axios.get('https://api.paystack.co/transaction/verify/'+reference,{
    //        headers: {
    //     'Authorization': `Bearer ${PAYSTACK_SECRET_KEY.value}`,
    //    'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //    }
    //     })
    //     console.log("response",response)
    //   }catch(error){
    //     console.log(error)
    //   }finally{
    //     localStorage.removeItem("@RESPONSEID")
    //   }
    // }

    const paymentCinetpay = (payload)=>{
      console.log("payload",payload)
     const popup = new Paystack()
     popup.newTransaction({
     key: PAYSTACK_PUBLIC_KEY.value,
     email: store.state.user.email,
     amount: payload.priceAbonnement,
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
     localStorage.setItem("@RESPONSEID",JSON.stringify(response.customer.id))
     },
     onCancel: async() => {
       console.log("onCancel");
      // await verifIfPayementIsOk(JSON.parse(localStorage.getItem("@RESPONSEID")))
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