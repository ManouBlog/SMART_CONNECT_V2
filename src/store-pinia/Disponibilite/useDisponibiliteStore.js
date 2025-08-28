import { defineStore } from 'pinia'
import instance from "../../api/api";
import Swal from "sweetalert2";
// import {Help} from "../../utils"
import {useLoadingSpinner} from "../LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner()
export const useDisponibiliteStore = defineStore('disponibilite', {
    state: () => ({
    }),
    actions: {
       async createdDisponiblite(payload) {
        loadingSpinner.launchLoading(true)
              await instance.post("create_schedule", {
            jour: payload.DateRendezVous,
            First_horaire: payload.firstHoraire,
            Second_horaire: payload.secondHoraire,
            totalHour: payload.TotalHourDisponi,
          })
          .then((res) => {
            // console.log(res);
            if (res.data.status === true) {
              Swal.fire({
                icon: "success",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
             
            }
            if (res.data.status === false) {
              Swal.fire({
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
             
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: err,
              showConfirmButton: false,
              timer: 1500,
            });
           
          })
          .finally(()=>{
            loadingSpinner.launchLoading(false)
          })
          },
       
    },
  })