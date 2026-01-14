import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

export const configUtils={
  verifDateWithDateToDay(value){
   const response =  JSON.stringify(new Date().toISOString().substring(0, 10)) < JSON.stringify(new Date(value))
   return response;
  },
  getFormatDateFr(value){
    return new Date(value).toLocaleDateString('fr-FR',{
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  // hour: '2-digit',
  // minute: '2-digit',
  // second: '2-digit',
  hour12: false // 24h
})
  },
  formatedDisponibilite(value){
    return value.replace("-", " à ")
  },
  formatedDate(value){
    const tableauOfNewValue = []
    value.forEach(item=>{
      tableauOfNewValue.push(new Date(item).toISOString().slice(0, 10))
    })
    return tableauOfNewValue;
  },
  handleHeureOfDate(value){
    if(!value){
      return null
    }
  return dayjs(value).format('HH:mm');
  },
  getHourInDate(dateFrom,dateTo){
 if(dateFrom && dateTo){
// Conversion en objets Day.js
const dayjsDateFrom = dayjs(dateFrom);
const dayjsDateTo = dayjs(dateTo);
const differenceInHours = dayjsDateTo.diff(dayjsDateFrom, 'hour');
 return differenceInHours;
 }else{
  return 0;
 }

  },
  ifJobIsEnd(value){
   return new Date(value) >= new Date();
  },
  showJobNew(value){
    return JSON.stringify(new Date().toISOString().substring(0, 10)) ===
    JSON.stringify(
      new Date(value).toISOString().substring(0, 10)
    )
  },
  isAbonnementActif(value){
    return value.some(item=>item.statut === "success")
  },
  statistiqueEntreprise(value,nbre){
    return value.filter(item=>Number(item.pivot.contrat || item.pivot.recruit) === Number(nbre)).length
  },
  isValidEmail(email) {
    // Expression régulière pour valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  isValidPhoneNumber(phoneNumber) {
    // Vérifier si le numéro contient exactement 10 chiffres
    const phoneRegex = /^(?:\+225)?\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }
}
