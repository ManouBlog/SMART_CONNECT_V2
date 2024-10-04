import { defineStore } from 'pinia'
import { ref } from 'vue'
import instance from "../api/api";


export const useCinetpayStore = defineStore('cinetpay',()=>{

    const CINETPAY_API_KEY = ref(process.env.VUE_APP_CINETPAY_API_KEY);
    const CINETPAY_SECRET_KEY = ref(process.env.VUE_APP_CINETPAY_SECRET_KEY);
    const CINETPAY_SITE_ID = ref(process.env.VUE_APP_CINETPAY_SITE_ID)

    const paymentCinetpay = async(payload)=>{
        let data = JSON.stringify({
            apikey: CINETPAY_API_KEY.value,
            site_id: CINETPAY_SITE_ID.value,
            transaction_id:payload.transaction_id,
            amount: payload.price,
            currency: "XOF",
            notify_url:payload.notify_url,
            return_url: process.env.VUE_APP_RETURN_URL,
            cancel_url: payload.notify_url,
            close_after_response: true,
            alternative_currency: "XOF",
            description: " TEST INTEGRATION",
            customer_id: payload.user.id,
            customer_name: payload.user.name,
            customer_surname: payload.user.surname,
            customer_email: payload.user.email,
            customer_address: "Abidjan",
            customer_city: "Abidjan",
            channels: "ALL",
            lock_phone_number: false,
            lang: "FR",
          });
    
          let config = {
            method: "post",
            url: "https://api-checkout.cinetpay.com/v2/payment",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };
          const response = await instance(config)
          const lien = response.data.data.payment_url;
          localStorage.setItem('transaction_id',payload.transaction_id);
          window.open(lien,"_self")
    }

    return{
        CINETPAY_API_KEY,
        CINETPAY_SECRET_KEY,
        paymentCinetpay
    }
})