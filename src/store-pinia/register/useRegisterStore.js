import { defineStore } from 'pinia'
import instance from "../../api/api";

export const useRegisterStore = defineStore('register', {
    state: () => ({
      count: 0,
      competencesChoosen:[],
      allCompetences:[],
      isPolitics:false,
      isModal:false,
    }),
    actions: {
       async getAllCompetences() {
            try{
           const response = await instance.get("GetAllCompetences");
           console.log("getAllCompetences",response)
           if(response['status'] === 200){
            this.allCompetences = response.data.data
           }
            }catch(error){
                console.log(error)
            }
          },
        addTag(payload) {
            console.log(payload);
            this.competencesChoosen = [];
            payload.forEach((el) => {
              this.competencesChoosen.push(el.id);
            });
          },
        changeValueIsPolitics(payload){
          this.isPolitics = payload
        },
        changeValueIsModal(){
          this.isModal = !this.isModal
        }
    },
  })