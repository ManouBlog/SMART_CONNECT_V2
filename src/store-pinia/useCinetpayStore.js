import { defineStore } from 'pinia'
import Swal from "sweetalert2";
import instance from "../api/api";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";


export const useCinetpayStore = defineStore('cinetpay',()=>{
const storeLoading = useLoadingSpinner();

    const paymentCinetpay = async (payload)=>{
     
        storeLoading.launchLoading(true);

           const formData = new FormData();

// On vérifie chaque valeur avant l'ajout
if (payload.abonement_id) formData.append('abonement_id', payload.abonement_id);
if (payload.channels && payload.channels !== 'undefined') formData.append('channels', payload.channels);
if (payload.mode_payment) formData.append('mode_payment', payload.mode_payment);


if (payload.transaction_id) formData.append('transaction_id', payload.transaction_id);
if (payload.isAddProfilHybride !== undefined) formData.append('isAddProfilHybride', payload.isAddProfilHybride);
if (payload.statut_base) formData.append('statut_base', payload.statut_base);
if (payload.isChangeProfil !== undefined) formData.append('isChangeProfil', payload.isChangeProfil);
if (payload.treatment_preferentiel) formData.append('treatment_preferentiel', payload.treatment_preferentiel);
if (payload.niveauExpertise) formData.append('niveauExpertise', payload.niveauExpertise);
if (payload.modeTravail) formData.append('modeTravail', payload.modeTravail);
if (payload.tempsTravail) formData.append('tempsTravail', payload.tempsTravail);
if (payload.niveauEtude) formData.append('niveauEtude', payload.niveauEtude);
if (payload.CVupload) formData.append('CVupload', payload.CVupload);
if (payload.statut_talent) formData.append('statut_talent', payload.statut_talent);

// Pour les tableaux, on utilise JSON.stringify
// Ajout des tableaux avec JSON.stringify pour Laravel
if (payload.profilHybride?.length) {
  payload.profilHybride
    .map(item => item.id)
    .forEach(id => {
      formData.append("profilHybride[]", id);
    });
}
if (payload.upload) formData.append('cni', payload.upload[0]);
// if (payload.upload?.length) {
//   payload.upload.forEach(item => {
//       formData.append("cni[]", item);
//     });
// }

if (payload.addProfilHybride?.length) {
  payload.addProfilHybride
    .map(item => item.id)
    .forEach(id => {
      formData.append("addProfilHybrideOnly[]", id);
    });
}

// Autres champs
if (payload.nom) formData.append('nom', payload.nom);
if (payload.expertise) formData.append('expertise', payload.expertise);
if (payload.photo) formData.append('photo', payload.photo);
if (payload.diplome) formData.append('diplome', payload.diplome);
if (payload.ville) formData.append('ville', payload.ville);
if (payload.commune) formData.append('commune', payload.commune);
if (payload.quartier) formData.append('quartier', payload.quartier);
if (payload.statut_professionnel_artisan) formData.append('statut_professionnel_artisan', payload.statut_professionnel_artisan);
if (payload.statut_entreprise) formData.append('statut_entreprise', payload.statut_entreprise);
if (payload.email_cc) formData.append('email_cc', payload.email_cc);
if (payload.Phonegerant) formData.append('Phonegerant', payload.Phonegerant);
if (payload.gerant) formData.append('gerant', payload.gerant);
if (payload.email) formData.append('email', payload.email);
if (payload.phone) formData.append('phone', payload.phone);
if (payload.ncc) formData.append('ncc', payload.ncc);
if (payload.juridique) formData.append('juridique', payload.juridique);
if (payload.matricule_cc) formData.append('matricule_cc', payload.matricule_cc);
if (payload.contact) formData.append('contact', payload.contact);

console.log("formData21",formData)
        
        try{
           const RESPONSEINITALISATION = await instance.post("payStack/paiement",formData);
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