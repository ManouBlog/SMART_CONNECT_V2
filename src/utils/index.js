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
    convertInMoney(value){
        return new Intl.NumberFormat('de-DE').format(value)
    },
    groupBy(value){
    const g = value.reduce((group,item)=>{
        if(group[item.nom_offre] == null){
            group[item.nom_offre]=[]
        }
        group[item.nom_offre].push(item)
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
 }

  };