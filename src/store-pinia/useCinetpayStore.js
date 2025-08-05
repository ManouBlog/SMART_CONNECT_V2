import { defineStore } from 'pinia'
import { ref } from 'vue'
// import instance from "../api/api";
import axios from 'axios'
// import Paystack from '@paystack/inline-js';

export const useCinetpayStore = defineStore('cinetpay',()=>{


    const PAYSTACK_SECRET_KEY = ref(process.env.VUE_APP_PAYSTACK_SECRET_KEY);


    const paymentCinetpay = async(payload)=>{
      try{
     let data = JSON.stringify({
        'email' : payload.user.email,
        'amount' : payload.amount,
        'reference' : payload.reference,
        'callback_url' :'http://127.0.0.1:8000/api/payStack/payment/callback/'+payload.reference,
          });

      const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',data,
      {
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY.value}`,
          'Content-Type': 'application/json',
        },
      }
        );
          const lien = response.data.data.authorization_url;
          console.log("MY LIEN",lien)
          window.open(lien,"_self")
      }catch(error){
        console.log(error)
      }
        
    }

//     const paymentCinetpay = (payload)=>{
//       console.log("payload",payload)
//      const popup = new Paystack()
//      popup.newTransaction({
//      key: "",
//      email: payload.user.email,
//      currency: "XOF",
//      amount: payload.amount,
//   onSuccess: (transaction) => {
//     console.log(transaction);
//   },
//   onLoad: (response) => {
//     console.log("onLoad: ", response);
//   },
//   onCancel: () => {
//     console.log("onCancel");
//   },
//   onError: (error) => {
//     console.log("Error: ", error.message);
//   }
// })
//     }

    return{
        paymentCinetpay
    }
})