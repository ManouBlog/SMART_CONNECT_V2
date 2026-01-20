import { defineStore } from 'pinia'
// import Swal from "sweetalert2";
// import instance from "../../api/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import instance from '../../api/api';
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
export const useVerificationStore = defineStore('verification', {
    state: () => ({
        isSameDate:false,
         intervalId:null
    }),
    actions: {
    
          async handleAbonnementExpired(){
            try{
             const response = await instance.get("handleAbonnementExpired")
            //  console.log("handleAbonnementExpired",response)
            }catch(error){
                console.log(error)
            }
              
          },
          verifIfAbonementIsExpied(paylod){
           
            this.intervalId = setInterval(()=>{
                if(JSON.parse(localStorage.getItem('token'))){
                    const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    const isDateInFuture = dayjs(paylod).isBefore(currentDate);
                    if(isDateInFuture){
                      this.handleAbonnementExpired()
                      clearInterval(this.intervalId);
                    }else{
                        // console.log('connected , but not expired')
                        return ;
                    }
                }else{
                    // console.log("not connected")
                    return;
                }
               
            },1000)
          },

    },
  })