import { defineStore } from 'pinia'
import Swal from "sweetalert2";
import instance from "../../api/api";
import { useLoadingSpinner } from "../LoadingSpinner/useLoadingSpinner";
const Spinner = useLoadingSpinner()
export const useInfoPersonnel = defineStore('infoPersonnelle', {
    state: () => ({
        toogleModalInfoPersonnelle:false,
        registre:null,
        pieceIdentiteGerant:null,
        logoEntreprise:"",
        isCv:null,
        isbtnPdf:false,
        infoUserConnected:null,
    }),
    actions: {
       changeValueForToogleModalInfoPersonnelle(payload){
        // console.log("this.toogleModalInfoPersonnelle",this.toogleModalInfoPersonnelle)
        this.toogleModalInfoPersonnelle = !this.toogleModalInfoPersonnelle
        this.isCv = payload ? payload.isCv:null
        this.isbtnPdf = payload ? payload.isbtnPdf:null 
       },
       async getInfoUser(){
      await instance
          .get("voirInfoUserConnect")
          .then((resp) => {
            console.log("voirInfoUserConnect",resp);
            if (resp.data.status === true) {
             this.user = resp.data.user
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    async update_compte_entreprise(payload) {
  Spinner.launchLoading(true);

  try {
    const data = new FormData();

    this.pieceIdentiteGerant?.forEach(item => {
      data.append("piece_gerant[]", item);
    });

    payload?.email_cc?.forEach(item => {
      data.append("email_cc[]", item);
    });

    data.append("nom", payload.nom);
    data.append("particulier_prenoms", payload.particulier_prenoms);
    data.append("email", payload.email);
    data.append("gerant", payload.gerant);
    data.append("numero_gerant", payload.numero_gerant);
    data.append("commune", payload.commune);
    data.append("forme_juridique", payload.forme_juridique);
    data.append("quartier", payload.quartier);
    data.append("contact", payload.contact);
    data.append("ville", payload.ville);
    data.append("logo", this.logoEntreprise);
    data.append("matricule_cc", payload.matricule_cc);
    data.append("registre", this.registre);

    const res = await instance.post("modifier_profil", data);

    if (res.data.status === true) {
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return res.data;
    }

    Swal.fire({
      icon: "error",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });

    return null; // explicite

  } catch (err) {
    console.error(err);
    throw err; // laisse l'appelant décider
  } finally {
    Spinner.launchLoading(false);
  }
}
,
      // async update_compte_entreprise(payload) {
      //   Spinner.launchLoading(true)
      //   let data = new FormData();
      //   this.pieceIdentiteGerant?.forEach((item)=>{
      //   data.append("piece_gerant[]", item);
      //   })
      //  payload?.email_cc?.forEach((item)=>{
      //   data.append("email_cc[]", item);
      //   })
      //   data.append("nom", payload.nom);
      //   data.append("particulier_prenoms", payload.particulier_prenoms);
      //   data.append("email", payload.email);
      //   data.append("gerant", payload.gerant);
      //   data.append("numero_gerant", payload.numero_gerant);
      //   // data.append("piece_gerant", this.pieceIdentiteGerant);
      //   data.append("commune", payload.commune);
      //   data.append("forme_juridique", payload.forme_juridique);
      //   data.append("quartier", payload.quartier);
      //   data.append("contact", payload.contact);
      //   data.append("ville", payload.ville);
      //   data.append("logo",this.logoEntreprise);
      //   data.append("matricule_cc", payload.matricule_cc);
      //   // data.append("statut_id", 1);
      //   data.append("registre", this.registre);
  
      //  await instance
      //     .post("modifier_profil", data)
      //     .then((res) => {
      //       // console.log(res);
      //       if (res.data.status === true) {
      //         Swal.fire({
      //           icon: "success",
      //           title: res.data.message,
      //           showConfirmButton: false,
      //           timer: 1500,
      //         });
               
      //         this.toogleModalInfoPersonnelle = !this.toogleModalInfoPersonnelle
      //         return res.data.data
             
      //       }
      //       if (res.data.status === false) {
      //         Swal.fire({
      //           icon: "error",
      //           title: res.data.message,
      //           showConfirmButton: false,
      //           timer: 1500,
      //         });
             
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     })
      //     .finally(()=>{
      //       Spinner.launchLoading(false)
      //     })
      // },
      async update_compte_particulier(payload) {
        // console.log("this.pieceIdentiteGerant",this.pieceIdentiteGerant)
        Spinner.launchLoading(true)
        let data = new FormData();
        this.pieceIdentiteGerant?.forEach((item)=>{
        data.append("piece_gerant[]", item);
        })
        data.append("nom", payload.nom);
         data.append("particulier_prenoms", payload.particulier_prenoms);
        data.append("email", payload.email);
        data.append("commune", payload.commune);
        data.append("quartier", payload.quartier);
        data.append("contact", payload.contact);
        data.append("ville", payload.ville);
  
       await instance
          .post("modifier_profil", data)
          .then((res) => {
            // console.log(res);
            if (res.data.status === true) {
              Swal.fire({
                icon: "success",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              this.getInfoUser()
              this.toogleModalInfoPersonnelle = !this.toogleModalInfoPersonnelle
              
            }
            if (res.data.status === false) {
              Swal.fire({
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              this.getInfoUser()
            }
          })
  
          .catch((err) => {
            console.log(err);
          })
          .finally(()=>{
            Spinner.launchLoading(false)
          })
      },
      async update_compte_student(payload) {
  console.log("payload_update_compte_student", payload);

  Spinner.launchLoading(true);

  let data = new FormData();

  if (payload.photo_profil) {
    data.append("photo_profil", payload.photo_profil);
  } else {
    payload?.competences?.forEach(element => {
      data.append("competences[]", element);
    });

    payload?.qualifications?.forEach(element => {
      data.append("qualifications[]", JSON.stringify(element));
    });

    this.pieceIdentiteGerant?.forEach(element => {
      data.append("carte[]", element);
    });
   if(payload?.nom !== null && payload?.nom !== 'null'){
   data.append("nom", payload?.nom);
   }
if (payload?.prenoms != null && payload?.prenoms !== 'null') {
  data.append("prenoms", payload.prenoms);
}

if (payload?.email != null && payload?.email !== 'null') {
  data.append("email", payload.email);
}

if (payload?.bio != null && payload?.bio !== 'null') {
  data.append("bio", payload.bio);
}

if (payload?.diplome != null && payload?.diplome !== 'null') {
  data.append("diplome", payload.diplome);
}

if (payload?.commune != null && payload?.commune !== 'null') {
  data.append("commune", payload.commune);
}

if (payload?.quartier != null && payload?.quartier !== 'null') {
  data.append("quartier", payload.quartier);
}

if (payload?.contact != null && payload?.contact !== 'null') {
  data.append("phone", payload.contact);
}

if (payload?.ville != null && payload?.ville !== 'null'){
  data.append("ville", payload.ville);
}

if (payload?.titreCv != null && payload?.titreCv !== 'null'){
  data.append("titreCv", payload.titreCv);
}
if(payload?.modeTravail != null && payload?.modeTravail !== 'null'){
  data.append('modeTravail',payload.modeTravail)
}

if(payload?.tempsTravail != null && payload?.tempsTravail !== 'null'){
  data.append('tempsTravail',payload.tempsTravail)
}

if(payload?.statut_id != null && payload?.statut_id !== 'null'){
  data.append('statut_id',payload.statut_id)
}

if(payload?.niveauExpertise != null && payload?.niveauExpertise !== 'null'){
  data.append('niveauExpertise',payload.niveauExpertise)
}
  }

  try {
    const res = await instance.post("modifier_profil", data);
    // console.log("update_compte_student", res.data);
    if (res.data.status === true) {
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return res.data;
      
    } else {
      Swal.fire({
        icon: "error",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
     return null; // explicite
    }
  } catch (err) {
    console.log(err);
    throw err; // optionnel mais propre
  } finally {
    Spinner.launchLoading(false);
  }
},
      addInfoUserConnected(payload){
        this.infoUserConnected = payload;
        // console.log("addInfoUserConnected",payload)
      },
      addAnRegistreDoc(payload){
        // console.log(payload.target.files[0])
       this.registre = payload.target.files[0]
      },
      addAnPieceDoc(payload){
        this.pieceIdentiteGerant = [];
        // console.log("addAnPieceDoc",payload.target)
        Object.values(payload.target.files).forEach(item => {
       this.pieceIdentiteGerant.push(item)
      });
        // console.log("this.pieceIdentiteGerant",this.pieceIdentiteGerant)
      },
      addAnLogo(payload){
        this.logoEntreprise = payload.target.files[0]
      },
      verifIfPasswordIsExact(payload){
        if (payload.confirmation_password !== payload.password) {
          Swal.fire({
            icon: "info",
            title: "la confirmation du mot de passe et le nouveau mot de passe ne correspond pas",
            showConfirmButton: false,
            timer: 1500,
          });
        }else if(!payload.password || !payload.confirmation_password){
          Swal.fire({
            icon: "info",
            title: "Veuillez Ajoutez un mot de passe",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          this.routeForLaunchModifyPassword({
            oldPassword: payload.oldPassword,
            password: payload.password,
          })
        }
      },
      async routeForLaunchModifyPassword(data) {
        // console.log(data)
        try{
        const response = await instance.post("passwordModify",data)
        // console.log("routeForLaunchModifyPassword",response)
        if(response["status"] === 200){
          Swal.fire({
            icon: "success",
            title: "Mot de passe changé",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          Swal.fire({
            icon: "info",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        }catch(error){
          console.log(error)
        }

      },
      // updateOtherInfoPersonnelle(payloadOtherData){
      //   console.log('payloadOtherData',payloadOtherData)
      //   this.otherInfoPersonnelle.valueQualification = payloadOtherData 
      //   // otherInfoPersonnelle:{
      //   //   titre_cv:null,
      //   //   date_naissance:null,
      //   //   valueQualification:null,
      //   //   valueExperiencePro:null,
      //   //   langues:null,
      //   //   centre_interet:null,
      //   //   atouts:null
      //   // }
      // }

    },
  })