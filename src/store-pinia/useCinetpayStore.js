import { defineStore } from 'pinia'
// import { ref } from 'vue'
import instance from "../api/api";


export const useCinetpayStore = defineStore('cinetpay',()=>{

    // const CINETPAY_API_KEY = ref(process.env.VUE_APP_CINETPAY_API_KEY);
    // const CINETPAY_SECRET_KEY = ref(process.env.VUE_APP_CINETPAY_SECRET_KEY);
    // const CINETPAY_SITE_ID = ref(process.env.VUE_APP_CINETPAY_SITE_ID)

    const paymentCinetpay = async(payload)=>{
        let data = JSON.stringify({
        'email' : payload.user.email,
        'amount' : payload.amount,
        'reference' : payload.reference,
        'callback_url' :'http://127.0.0.1:8000/api/payStack/payment/callback/'+payload.reference,
            // apikey: CINETPAY_API_KEY.value,
            // site_id: CINETPAY_SITE_ID.value,
            // transaction_id:payload.transaction_id,
            // amount: payload.price,
            // currency: "XOF",
            // notify_url:payload.notify_url,
            // return_url: process.env.VUE_APP_RETURN_URL,
            // cancel_url: payload.notify_url,
            // close_after_response: true,
            // alternative_currency: "XOF",
            // description: " TEST INTEGRATION",
            // customer_id: payload.user.id,
            // customer_name: payload.user.name,
            // customer_surname: payload.user.surname,
            // customer_email: payload.user.email,
            // customer_address: "Abidjan",
            // customer_city: "Abidjan",
            // channels: "ALL",
            // lock_phone_number: false,
            // lang: "FR",
          });
const elements = "sk_live_9307351ab449ed4e40b13e69a7ae7511fe5718a8"
         console.log("VUE_PAYSTACK_SECRET_KEY",elements)
         console.log("Bearer ${elements}",`Bearer ${elements}`)
          let config = {
            method: "post",
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${elements}` 
            },
            data: data,
          };
          const response = await instance(config)
          
          const lien = response.data.authorization_url;
          console.log("MY LIEN",lien)
          // localStorage.setItem('transaction_id',payload.transaction_id);
          window.open(lien,"_self")
    }

    return{
        // CINETPAY_API_KEY,
        // CINETPAY_SECRET_KEY,
        paymentCinetpay
    }
})