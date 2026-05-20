import { defineStore } from 'pinia'
import instance from "../../api/api";
import {useSwalPopup} from "../SwalPopup/useSwalPopup";
import {useLoadingSpinner} from '../LoadingSpinner/useLoadingSpinner'
// import Swal from 'sweetalert2';
export const useRegisterStore = defineStore('register', {
    state: () => ({
      count: 0,
      competencesChoosen:[],
      allCompetences:[],
      isPolitics:false,
      isModal:false,
      SWALPOPUP: useSwalPopup(),
      LOADINGSPINNER:useLoadingSpinner(),
      isLoading:false,
      infoUser:"",
      payload:"",
      answerForProfilHybride:""
    }),
    actions: {
      handleAnswerForProfilHybride(payload){
      this.answerForProfilHybride = payload
      },
       async getAllCompetences() {
            try{
           const response = await instance.get("GetAllCompetences");
          //  console.log("getAllCompetences",response)
           if(response['status'] === 200){
            this.allCompetences = response.data.data.filter(c => c.categorie_id !== null)
           }
            }catch(error){
                console.log(error)
            }
          },
        addTag(payload) {
            // console.log(payload);
            this.competencesChoosen = [];
            payload?.forEach((el) => {
              this.competencesChoosen.push(el.id);
            });
          },
        changeValueIsPolitics(payload){
          this.isPolitics = payload?.value
          this.infoUser = payload?.infoUser
          this.payload = payload?.payload
        },
        changeValueIsModal(){
          this.isModal = !this.isModal
        },
        changeIsValuePolitic(){
          this.isModal = !this.isPolitics
        },
       formatTime(date) {
  const d = new Date(date); // ← conversion obligatoire

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
},
        splithourWithDate(payload){
          // console.log("splithourWithDate",payload)
       const [startRaw, endRaw] = payload?.split("-");
      const result = `${this.formatTime(startRaw)}-${this.formatTime(endRaw)}`;
      return result;
        },
        async registerStudent(payload) {
          // console.log("registerStudent25",payload)
          this.LOADINGSPINNER.launchLoading(true)
          this.isLoading = true;
          let data = new FormData();

          // Compétences (array IDs)
if (payload?.myCompetence?.length > 0) {
  payload.myCompetence.forEach((item) => {
    if (item?.id) data.append("competence[]", item.id);
  });
}

// Photos (array fichiers)
if (payload?.photo?.length > 0) {
  payload.photo.forEach((item) => {
    if (item) data.append("photo[]", item);
  });
}

if(payload.statut_professionnel_artisan ){
  data.append("statut_professionnel_artisan ", payload.statut_professionnel_artisan );
}

// Photos (array fichiers)
if (payload?.profilHybride?.length > 0) {
  payload.profilHybride.forEach((item) => {
    if (item) data.append("profilHybride[]", item);
  });
}

// other_competences
if (payload?.otherCompetence?.length > 0) {
  payload.otherCompetence.forEach((item) => {
    if (item) data.append("otherCompetence[]", item);
  });
}

data.append("mode_discret", payload?.mode_discret ? 1 : 0);
data.append("via", "web");

if(payload?.CVupload){
  data.append("CVupload", payload?.CVupload[0]?.originFileObj);
}

// Qualifications (array objets → JSON)
if (payload?.qualifications?.length > 0) {
  payload.qualifications.forEach((item, index) => {
  // envoyer l'objet SANS le fichier
  data.append(
    `qualifications[${index}]`,
    JSON.stringify({
      objet: item.objet,
      date_debut: item.date_debut,
      date_fin: item.date_fin,
    })
  );

  // envoyer le fichier à part
  if (item.fileCharged) {
    data.append(`files[${index}]`, item.fileCharged);
  }
});
}



// Nom simple
if (payload?.nom) data.append("nom", payload.nom);

// 👇 Statut 2 : Horaires/Jours (logique INCHANGÉE)
if (payload?.statutId == 2) {
  if (payload?.jour?.length > 0) {
    payload.jour.forEach((item) => {
      if (item) data.append("jour[]", item);
    });
  }
  if (payload?.First_horaire) {
    data.append("First_horaire", this.splithourWithDate(payload.First_horaire));
  }
  if (payload?.Second_horaire) {
    data.append("Second_horaire", this.splithourWithDate(payload.Second_horaire));
  } else if (payload?.Second_horaire !== undefined) {
    data.append("Second_horaire", payload.Second_horaire);
  }
  if (payload?.totalHour !== undefined) data.append("totalHour", payload.totalHour);
  if (payload?.hour_periode_debut) data.append("hour_periode_debut", payload.hour_periode_debut);
  if (payload?.hour_periode_fin) data.append("hour_periode_fin", payload.hour_periode_fin);
  if (payload?.periode_debut) data.append("periode_debut", payload.periode_debut);
  if (payload?.periode_fin) data.append("periode_fin", payload.periode_fin);
  if (payload?.periode) data.append("periode", payload.periode);
  if (payload?.code_ambassadeur) data.append("code_ambassadeur", payload.code_ambassadeur);
}

// 👇 Statut 5/6 : Expertise (professionell et veteran)
if (payload?.statutId == 6 || payload?.statutId == 5) {
  if (payload?.niveauExpertise !== undefined) data.append("niveauExpertise", payload.niveauExpertise);
  if (payload?.modeTravail) data.append("modeTravail", payload.modeTravail);
  if (payload?.tempsTravail !== undefined) data.append("tempsTravail", payload.tempsTravail);
}

if (payload?.treatment_preferentiel) data.append("treatment_preferentiel", payload.treatment_preferentiel);

// Champs finaux
if (payload?.prenoms) data.append("prenoms", payload.prenoms);
if (payload?.email) data.append("email", payload.email);
if (payload?.commune) data.append("commune", payload.commune);
if (payload?.quartier) data.append("quartier", payload.quartier);
if (payload?.countryCode && payload?.phone) {
  data.append("phone", `${payload.countryCode}${payload.phone}`);
}
if (payload?.ville) data.append("ville", payload.ville);
if (payload?.niveauEtude) {
  const niveauEtude = payload.filiere ? `${payload.niveauEtude} ${payload.filiere}` : payload.niveauEtude;
  data.append("niveauEtude", niveauEtude);
}

if(payload?.statut_talent) data.append("statut_talent", payload.statut_talent);
if (payload?.password) data.append("password", payload.password);
if (payload?.statutId !== undefined) data.append("statut_base", payload.statutId);
if (payload?.photo_profil) data.append("photo_profil", payload.photo_profil);
if (payload?.bio) data.append("bio", payload.bio);
if (payload?.titreCv) data.append("titreCv", payload.titreCv);
      
          try{
          const response = await instance.post("list_users", data);
            if (response.data.status === true) {
                this.changeValueIsPolitics({value:false,infoUser:"",payload:""})
                this.changeValueIsModal()
                this.SWALPOPUP.declencheSwalPopup(
  "success",
  `${response.data.message}
  
Bienvenue parmi nous 🎉  
Un email d’activation vient de vous être envoyé.
Veuillez consulter votre boîte mail et cliquer sur le lien pour activer votre compte.`
);
              }
              if (response.data.status === false) {
                this.SWALPOPUP.declencheSwalPopup("error",response.data.message)
              }
          }catch(error){
            this.SWALPOPUP.declencheSwalPopup("info",error?.response.data.message)   
          }finally{
           this.isLoading = false;
           this.LOADINGSPINNER.launchLoading(false)
          }
        },
        async registerCompany(payload) {
          console.log("registerCompany",payload)
          this.isLoading = true;
          this.LOADINGSPINNER.launchLoading(true);
          let data = new FormData();
          // Photos gérant (array de fichiers)
if (payload?.photo?.length > 0) {
  payload?.photo?.forEach((item) => {
    if (item) {  // Sécurité supplémentaires par item
      data.append("piece_gerant[]", item);
    }
  });
}



// Emails CC (array optionnel)
if (payload?.email_cc?.length > 0) {
  payload.email_cc.forEach((item) => {
    if (item) {
      data.append("email_cc[]", item);
    }
  });
}

if (payload?.profilHybride?.length > 0) {
  payload.profilHybride.forEach((item) => {
    if (item) data.append("profilHybride[]", item);
  });
}
data.append("via", "web");
// Registre (fichier unique)
if (payload?.Registre?.[0]?.originFileObj) {
  data.append("registre", payload.Registre[0].originFileObj);
}

if (payload?.statut_entreprise) data.append("statut_entreprise", payload.statut_entreprise);

// Champs texte simples
if (payload?.nom) data.append("nom", payload.nom);
if (payload?.optionsPaperChoose !== undefined) data.append("is_company_verified", payload.optionsPaperChoose);
if (payload?.contact && payload?.countryCode) data.append("phone", `${payload.countryCode}${payload.contact}`);
if (payload?.ville) data.append("ville", payload.ville);
if (payload?.prenoms) data.append("particulier_prenoms", payload?.prenoms);
if (payload?.nom_particulier) data.append("nom_particulier", payload?.nom_particulier);
if (payload?.quartier) data.append("quartier", payload.quartier);
if (payload?.juridique) data.append("forme_juridique", payload.juridique);
if (payload?.email) data.append("email", payload.email);
if (payload?.commune) data.append("commune", payload.commune);
if (payload?.gerant) data.append("gerant", payload.gerant);
if (payload?.Phonegerant && payload?.countryCodePhoneGerant) {
  data.append("numero_gerant", `${payload.countryCodePhoneGerant}${payload.Phonegerant}`);
}
if (payload?.matricule_cc) data.append("matricule_cc", payload.matricule_cc);
if (payload?.password) data.append("password", payload.password);
if (payload?.statut_id !== undefined) data.append("statut_base", payload.statut_id);
if (payload?.ncc) data.append("NCC", payload.ncc);

// Logo (fichier unique)
if (payload?.Logo?.[0]?.originFileObj) {
  data.append("logo", payload.Logo[0].originFileObj);
}
          // payload?.photo.forEach((item) => {
          //   data.append("piece_gerant[]", item);
          // });
          // if(payload?.email_cc){
          // payload?.email_cc?.forEach((item) => {
          //   data.append("email_cc[]", item);
          // })}
          // data.append("registre", payload?.Registre[0]?.originFileObj);
          // data.append("nom", payload?.nom);
          // data.append("is_company_verified", payload?.optionsPaperChoose);
          // data.append("phone",`${payload?.countryCode}${payload?.contact}`);
          // data.append("ville", payload?.ville);
          // data.append("quartier", payload?.quartier);
          // data.append("forme_juridique", payload?.juridique);
          // data.append("email", payload?.email);
          // data.append("commune", payload?.commune);
          // data.append("gerant", payload?.gerant);
          // data.append("numero_gerant",`${payload?.countryCodePhoneGerant}${payload?.Phonegerant}`);
          // data.append("matricule_cc", payload?.matricule_cc);
          // data.append("password", payload?.password);
          // data.append("statut_id", payload?.statut_id);
          // data.append("NCC", payload?.ncc);
          // data.append("logo", payload?.Logo[0]?.originFileObj);
         await instance
            .post("list_users", data)
            .then((response) => {
              // console.log(response);
              if (response.data.status === true) {
                this.SWALPOPUP.declencheSwalPopup("success",response.data.message)
                  
                this.changeValueIsPolitics({value:false,infoUser:"",payload:""})
                this.changeValueIsModal()
        //          this.connexionUser({
        // email: payload?.email,
        // password: payload?.password,
        //    })
              }
              if (response.data.status === false) {
                this.SWALPOPUP.declencheSwalPopup("error",response.data.message)
                
              }
            })
            .catch((error) => {
              console.log(error);
              this.SWALPOPUP.declencheSwalPopup("info",error.response.data.message)              
            })
            .finally(()=>{
               this.isLoading = false;
               this.LOADINGSPINNER.launchLoading(false);
            })
        },
        async registerParticulier(payload) {
          // console.log("registerParticulier",payload)
          this.isLoading = true;
          this.LOADINGSPINNER.launchLoading(true);
          let data = new FormData();
          payload?.photo.forEach((item) => {
            data.append("piece_gerant[]", item);
          });
          data.append("nom", payload?.nom);
          data.append("particulier_prenoms", payload?.prenoms);
          data.append("nom_particulier", payload?.nom_particulier);
          data.append("via", "web");
          data.append("phone",`${payload?.countryCode}${payload?.contact}`);
          data.append("ville", payload?.ville);
          data.append("quartier", payload?.quartier);
          data.append("email", payload?.email);
          data.append("commune", payload?.commune);
          data.append("password", payload?.password);
          data.append("statut_id", 4);
         await instance
            .post("list_users", data)
            .then((response) => {
              // console.log(response);
              if (response.data.status === true) {
                this.SWALPOPUP.declencheSwalPopup("success",response.data.message)
                this.changeValueIsPolitics({value:false,infoUser:"",payload:""})
                this.changeValueIsModal()
        //          this.connexionUser({
        // email: payload?.email,
        // password: payload?.password,
        //    })
              }
              if (response.data.status === false) {
                this.SWALPOPUP.declencheSwalPopup("error",response.data.message)
                
              }
            })
            .catch((error) => {
              console.log(error);
              this.SWALPOPUP.declencheSwalPopup("info",error.response.data.message)              
            })
            .finally(()=>{
               this.isLoading = false;
               this.LOADINGSPINNER.launchLoading(false);
            })
        },
    },
  })