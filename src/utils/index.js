export const Help = {
    is_number(value) {
      return /^\d{10}$/.test(value);
    },
    showMsgErrorObjet(value) {
      let msgError = [];
      for (const property in value.data.message) {
        msgError = [...msgError, value.data.message[property]];
      }
      return msgError;
    },
     calculateAbonnementPrice(basePrice, profilsCount = 0) {
  let multiplier = 1;

  if (profilsCount == 1) multiplier = 1.3;
  else if (profilsCount >= 2) multiplier = 1.5;

  return Math.round(basePrice * multiplier);
},
    convertInMoney(value){
        return new Intl.NumberFormat('de-DE').format(value)
    },
    groupByRecruit(value){
 const g = value.reduce((group,item)=>{
        if(group[item.nom_offre] == null){
            group[item.nom_offre]=[]
        }
        group[item.nom_offre].push(item)
        return group;
    },{})

    return g
    },
    groupBy(value){
    const g = value.reduce((group,item)=>{
        if(group[item.offre.nom_offre] == null){
            group[item.offre.nom_offre]=[]
        }
        group[item.offre.nom_offre].push(item)
        return group;
    },{})

    return g
},
calculeTotal(value) {
  let total = 0;
  value.forEach((element) => {
    total += element.pivot.nombre;
  });
  return total;
},
 getRoute(value){
  if(value === 'Superviseur'){
   return "/requete_traitee_agence";
  }else{
   return "/requete_traite_gestionnaire";
  }
 },
 retirerIdIntoArrayCompetence(value){
  const newArrayCompetenceWithId = [];
  if(value.length>0){
 value.forEach(element => {
    newArrayCompetenceWithId.push(element.id)
  });
  }
  return newArrayCompetenceWithId;
 },
toADfirstTwo(str) {
  if (!str || str.length === 0) return '';
  return str.slice(0, 2).toUpperCase();
},
formatDateToMonthYear(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return ""; // vérifie si la date est valide

   const options = { year: "numeric", month: "long", day: "2-digit" };
  const formatted = date.toLocaleDateString("fr-FR", options);

  // Met la première lettre en majuscule
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
},
splitFilename(filename) {
  const parts = filename.split('.');
  const extension = parts[1];
  return extension;
}


  };