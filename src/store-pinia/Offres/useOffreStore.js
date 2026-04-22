import { defineStore } from 'pinia'
import instance from "../../api/api";
import Swal from "sweetalert2";
import {useModalSuppressionStore} from "../ModalSuppession/useModalSuppressionStore"
import { useLoadingSpinner } from "../LoadingSpinner/useLoadingSpinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
const Modal = useModalSuppressionStore();
const Spinner = useLoadingSpinner()
export const useOffreStore = defineStore('offres', {
    state: () => ({
        offres: [],
        ListOffre:[],
        offreCreatedByEntreprise:[],
        filterOffreCreatedByEntreprise:[],
        ListeForFilterInOffreCreatedByEntreprise:[],
        idItemDelete:null,
        categoriesOffres:[],
        allCompetences:[]
    }),
    actions: {
      filterOffreWithYear(payload){
        // console.log("offreCreatedByEntreprise",this.offreCreatedByEntreprise)
        this.offreCreatedByEntreprise = this.filterOffreCreatedByEntreprise.filter(item=>dayjs(item.created_at,'YYYY').isSame(dayjs(payload)))
       },
       async getOffres() {
            try{
           const response = await instance.get("list_offres");
          //  console.log("list_offres",response)
           if(response['status'] === 200){
            this.offres = response.data.data
            let offresWithDateExpirationSupAtToday = [];
            this.offres.find((item) => {
                if (new Date(item.fin) >= new Date()) {
                  offresWithDateExpirationSupAtToday.push(item);
                } else {
                  offresWithDateExpirationSupAtToday = this.offres.slice(0, 4);
                }
              });
              this.ListOffre = offresWithDateExpirationSupAtToday.slice(0, 4);
           }
            }catch(error){
                console.log(error)
            }
          },
          async getAllOffresCreatedByEntreprise(){
            Spinner.launchLoading(true)
            try{
              const response = await instance.get("get_offres_entreprise");
              // console.log("RESPONSE_OFFRE",response)
              if(response['status'] === 200){
                // console.log("response.data.data1",response.data.data)
                this.ListeForFilterInOffreCreatedByEntreprise = response.data.data
                this.offreCreatedByEntreprise = response.data.data
                this.filterOffreCreatedByEntreprise = response.data.data

              }
              Spinner.launchLoading(false)
            }catch(error){
              console.log(error)
              Spinner.launchLoading(false)
            }
          },
          filterInArrayOffreCreatedByEntreprise(payload){
            // console.log("payload",payload)
            this.ListeForFilterInOffreCreatedByEntreprise.filter(item=>item.offre.toLowerCase().includes(payload))
              this.offreCreatedByEntreprise = this.ListeForFilterInOffreCreatedByEntreprise
           
              // console.log("this.offreCreatedByEntreprise",this.offreCreatedByEntreprise)
          },
          handleIdItemDelete(payload){
            this.idItemDelete = payload
          },
          handleDeleteOffre() {
            // console.log("idItemDelete",this.idItemDelete)
            Spinner.launchLoading(true)
            instance
              .delete("delete_offre_entreprise/" + this.idItemDelete)
      
              .then((res) => {
                // console.log(res);
      
                if (res.data.status === true) {
                  Modal.changeValueForShowModalSuppression()
                  Swal.fire({
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  const index = this.offreCreatedByEntreprise.findIndex(
                    (objet) => objet.id === this.idItemDelete
                  );
                  this.offreCreatedByEntreprise.splice(index, 1);
                }
              })
              .catch((err) => {
                // console.log("ERR MSG",err)
                if (err) {
                  Swal.fire({
                    icon: "info",
                    title: err.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              })
              .finally(()=>{
                Spinner.launchLoading(false)
              })
          },
          async get_categorie() {
            Spinner.launchLoading(true)
            await instance
              .get("seeCategorie")
              .then((res) => {
                // console.log("TIMETABLE", res);
                this.categoriesOffres = res.data.data;
                // console.log("CATEGORIE", this.categories);
                Spinner.launchLoading(false)
              })
              .catch((err) => {
                console.log(err);
                Spinner.launchLoading(false)
              });
          },
          async getAllCompetences() {
            Spinner.launchLoading(false)
            try {
              const reponse = await instance.get("GetAllCompetences");
              this.allCompetences = reponse.data.data.filter(c => c.categorie_id !== null);
              // console.log("GetAllCompetences", this.competences);
              Spinner.launchLoading(false)
            } catch (e) {
              console.log(e);
              Spinner.launchLoading(false)
            }
          },
    },
  })