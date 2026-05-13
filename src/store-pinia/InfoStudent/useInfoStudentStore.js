import { defineStore } from 'pinia'
// import Swal from "sweetalert2";
import instance from "../../api/api";
import { useLoadingSpinner } from "../LoadingSpinner/useLoadingSpinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
const loadingSpinner = useLoadingSpinner();

export const useInfoStudentStore = defineStore('studentsInfo', {
    state: () => ({
        offres:null,
        list_offre:[],
        data_offre_filter:[],
        list_entreprise_interesse:[]
    }),
    actions: {
        async get_all_student() {
            loadingSpinner.launchLoading(true);
            await instance
              .get("get_offres_postule")
              .then((res) => {
                // console.log("get_all_student",res);
                this.list_offre = res.data.data;
                this.data_offre_filter = res.data.data;
                loadingSpinner.launchLoading(false);
              })
              .catch((err) => {
                console.log(err);
                loadingSpinner.launchLoading(false);
              });
          },
          async get_entreprise_interesse() {
            loadingSpinner.launchLoading(true);
            await instance
              .get("entrepriseInteressee")
              .then((res) => {
                // console.log("entrepriseInteressee",res);
                this.list_entreprise_interesse = res.data.data;
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(()=>{
                  loadingSpinner.launchLoading(false);
              })
          },
         filterDataWithYear(payload){
          this.list_offre = this.data_offre_filter.filter(item=>dayjs(item.created_at,'YYYY').isSame(dayjs(payload)))
         },
         async getStatistiqueDashboardStudent(payload){
          loadingSpinner.launchLoading(true);
            await instance
              .post("statistiqueDashboard/student",payload)
              .then((res) => {
                // console.log("statistiqueDashboard",res.data);
                this.statistiqueDashboard = res.data;
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(()=>{
                 loadingSpinner.launchLoading(false);
              })
         }
      
     

    },
  })