import { defineStore } from 'pinia'
import instance from "../../api/api";
// import {Help} from "../../utils"
import { useLoadingSpinner } from "../LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner()
export const useEntreprisesStore = defineStore('entreprise', {
    state: () => ({
        entreprises: [],
        timetable:[],
        list_students:[],
        student:[],
        studentRecruit:[],
        offresInteressByStudents:{},
        list_abonnement:[],
        planAbonnement:null,
        dataAlarm:null,
        statistiquesFormelleOrInformelleEntreprise:null
    }),
    actions: {
       async getEntreprise() {
            try{
           const response = await instance.get("AllEntrepriseWithTimetables");
          //  console.log("AllEntrepriseWithTimetables",response)
           if(response['status'] === 200){
            this.entreprises = response.data.data
            this.timetable = response.data.timetable;
           }
            }catch(error){
                console.log(error)
            }
          },
          tableData(dataPayload) {
      return Object.entries(dataPayload).map(([nomOffre, students]) => ({
        nom_offre: nomOffre,
        count: students.length,
        students
      }));
    },
          async get_students_contact() {
            loadingSpinner.launchLoading(true)
            try{
           const listStudent = await instance.get("list_students_contact_by_entreprise");
           const studentRecruit = await instance.get("getStudentRecruit");
           
           
          //  console.log("const_studentRecruit",studentRecruit)
           if(listStudent['status'] === 200 && studentRecruit['status'] === 200 ){
            this.list_students = listStudent.data.data;
            this.student = this.list_students?.students;
             this.studentRecruit = this.tableData(studentRecruit.data);
            // this.studentRecruit = elementFilter.map(item=> {
            //   return item.students;
            // }).flat();
            loadingSpinner.launchLoading(false)
            // const flattened = studentFilterRecruit.flat() 

            // console.log('this.studentRecruit',this.studentRecruit)
           }
            }catch(error){
                console.log(error)
            }
          },
          async get_offres_interess_by_student() {
            loadingSpinner.launchLoading(true)
            try{
             const response = await instance.get("list_offres_interess_by_students")
            //  console.log("get_offres_interess_by_student85")
             if(response['status'] === 200){
              // this.dataAlarm = response.data.filter((item) => item.recruit === 0).length;
                // this.offresInteressByStudents = Help.groupBy(response.data)
                // const groupedData = response.data.reduce((acc, curr) => {
                //     // Check if there's already an entry for the current `nom_offre`
                //     const existingEntry = acc.find(entry => entry?.offre?.nom_offre === curr?.offre?.nom_offre);
                
                //     // If it exists, push the current item into the `value` array
                //     if (existingEntry) {
                //         existingEntry.nbre.push(curr);
                //     } else {
                //         // If it doesn't exist, create a new entry
                //         acc.push({
                //             nom_offre: curr?.offre.nom_offre,
                //             nbre: [curr]
                //         });
                //     }
                
                //     return acc;
                // }, []);
                this.offresInteressByStudents = response.data
                loadingSpinner.launchLoading(false)
                // console.log("this.offresInteressByStudents",this.offresInteressByStudents)
             }
            }catch(error){
                console.log(error)
            }
          },
          async handleStatistiquesEntreprise(payload){
   await instance
              .post("statistiqueDashboard/entreprise",payload)
              .then((res) => {
                console.log("statistiqueDashboard",res.data);
                this.statistiquesFormelleOrInformelleEntreprise = res.data;
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(()=>{
                 loadingSpinner.launchLoading(false);
              })
},
          handlePlanAbonnement(payload) {
    
      payload.forEach((item) => {
        if (item.statut === "success") {
          item.abonement.echeance = item.echeance
          this.planAbonnement = item;
        }
      });
      // console.log("STOREABONNEMENT",this.planAbonnement)
    },
    putPlanAbonnementAtNull(){
    this.planAbonnement = null
    },
          async get_all_abonnement() {
            loadingSpinner.launchLoading(true)
           try{
           const response = await instance.get("abonnement_user")
           console.log("abonnement_user_response23",response)
           if(response["status"] === 200){
            this.list_abonnement = response.data.data
           this.handlePlanAbonnement(this.list_abonnement)
           }
           
           }catch(error){
            console.log(error)
           }
           loadingSpinner.launchLoading(false)
          },
    },
  })