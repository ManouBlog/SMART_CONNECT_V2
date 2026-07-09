import { defineStore } from 'pinia'
import Swal from "sweetalert2";
import instance from "../api/api";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";


export const useCinetpayStore = defineStore('cinetpay',()=>{
const storeLoading = useLoadingSpinner();

    const paymentCinetpay = async (payload)=>{
     
        storeLoading.launchLoading(true);

        try{
           const RESPONSEINITALISATION = await instance.post("payStack/paiement",payload);
            //  console.log("RESPONSEINITALISATION",RESPONSEINITALISATION)
             if(RESPONSEINITALISATION.data.status){
                Swal.fire({
              icon: "success",
              title: "Veuillez patienter...",
              showConfirmButton: false,
              timer: 3500,
            });
             window.location.href = RESPONSEINITALISATION.data.data.authorization_url;
             }
        }catch(error){
        console.log(error)
          Swal.fire({
              icon: "info",
              title: error.response.data.message,
              showConfirmButton: true,
            });
        }finally{
            storeLoading.launchLoading(false);
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