import { defineStore } from 'pinia'
// import Swal from "sweetalert2";
import instance from "../../api/api";
import { useLoadingSpinner } from "../LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner();
export const useInfoStudentStore = defineStore('studentsInfo', {
    state: () => ({
        offres:null,
        list_offre:[]
    }),
    actions: {
        async get_all_student() {
            loadingSpinner.launchLoading(true);
            await instance
              .get("get_offres_postule")
              .then((res) => {
                console.log(res);
                this.offres = res.data;
                const { offres } = res.data.data;
                console.log("OFFRES", offres);
                this.list_offre = offres;
                console.log("this.list_offre", this.list_offre);
                loadingSpinner.launchLoading(false);
              })
              .catch((err) => {
                console.log(err);
                loadingSpinner.launchLoading(false);
              });
          },
      
     

    },
  })