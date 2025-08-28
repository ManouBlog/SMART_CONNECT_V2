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
        offresInteressByStudents:[],
        list_abonnement:[],
        planAbonnement:null,
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
          async get_students_contact() {
            loadingSpinner.launchLoading(true)
            try{
           const listStudent = await instance.get("list_students_contact_by_entreprise");
           const studentRecruit = await instance.get("getStudentRecruit");
           
          //  console.log("studentRecruit",studentRecruit)
          //  console.log("listStudent",listStudent)
           if(listStudent['status'] === 200 && studentRecruit['status'] === 200 ){
            this.list_students = listStudent.data.data;
            this.student = this.list_students.students;
            this.studentRecruit = studentRecruit.data;
            loadingSpinner.launchLoading(false)
            // console.log('this.list_students',this.list_students)
            // console.log("this.student",this.student)
           }
            }catch(error){
                console.log(error)
            }
          },
          async get_offres_interess_by_student() {
            loadingSpinner.launchLoading(true)
            try{
             const response = await instance.get("list_offres_interess_by_students")
            //  console.log("response",response.data)
             if(response['status'] === 200){
                // this.offresInteressByStudents = Help.groupBy(response.data)
                const groupedData = response.data.reduce((acc, curr) => {
                    // Check if there's already an entry for the current `nom_offre`
                    const existingEntry = acc.find(entry => entry.nom_offre === curr.nom_offre);
                
                    // If it exists, push the current item into the `value` array
                    if (existingEntry) {
                        existingEntry.nbre.push(curr);
                    } else {
                        // If it doesn't exist, create a new entry
                        acc.push({
                            nom_offre: curr.nom_offre,
                            nbre: [curr]
                        });
                    }
                
                    return acc;
                }, []);
                this.offresInteressByStudents = groupedData
                loadingSpinner.launchLoading(false)
                // console.log("this.offresInteressByStudents",this.offresInteressByStudents)
             }
            }catch(error){
                console.log(error)
            }
          },
          handlePlanAbonnement(payload) {
    
      payload.forEach((item) => {
        if (item.statut === "success") {
          item.abonement.echeance = item.echeance
          this.planAbonnement = item.abonement;
        }
      });
      // console.log("STOREABONNEMENT",this.planAbonnement)
    },
          async get_all_abonnement() {
            loadingSpinner.launchLoading(true)
           try{
           const response = await instance.get("abonnement_user")
          //  console.log("response",response)
           if(response["status"] === 200){
            this.list_abonnement = response.data.data.filter(item=>item.statut === 'success' || item.statut === 'expired')
           this.handlePlanAbonnement(this.list_abonnement)
            // console.log("this.list_abonnement",this.list_abonnement.filter(item=>item.statut === 'success'))
           }
           
           }catch(error){
            console.log(error)
           }
           loadingSpinner.launchLoading(false)
          },
    },
  })