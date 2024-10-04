export const configUtils={
  verifDateWithDateToDay(value){
   const response =  JSON.stringify(new Date().toISOString().substring(0, 10)) < JSON.stringify(new Date(value))
   return response;
  },
  getFormatDateFr(value){
    return new Date(value).toLocaleDateString("fr")
  }
}
