<script>
import instance from "../../../api/api";
// import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Help } from "../../../utils";
export default {
  data() {
    return {
      list_students: null,
      student: [],
      spinner: false,
      isActive: false,
      tab: false,
      studentRecruit: {},
    };
  },
  methods: {
    async get_students_contact() {
      this.spinner = true;
      try {
        const listStudent = await instance.get(
          "list_students_contact_by_entreprise"
        );
        console.log("listStudent", listStudent);
        const studentRecruit = await instance.get("getStudentRecruit");
        console.log("studentRecruit", studentRecruit);
        this.list_students = listStudent.data.data;
        this.student = this.list_students.students;
        this.studentRecruit = Help.groupBy(studentRecruit.data);
        console.log("this.studentRecruit", this.student);
        this.spinner = false;
        setTimeout(function () {
          $("#MyTableData,#MyTableData1,#MyTableData2,#MyTableData3").DataTable({
            pagingType: "full_numbers",
            pageLength: 10,
            processing: true,
            order: [],
            language: {
              décimal: "",
              emptyTable: "Aucune donnée disponible dans le tableau",
              infoEmpty: "Showing 0 to 0 of 0 entries",
              info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
              infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
              infoPostFix: "",
              thousands: ",",
              lengthMenu: "Afficher les entrées du _MENU_",
              loadingRecords: "Loading...",
              processing: "Processing...",
              search: "Chercher :",
              stateSave: true,
              zeroRecords: "Aucun enregistrement correspondant trouvé",
              paginate: {
                first: "Premier",
                last: "Dernier",
                next: "Suivant",
                previous: "Précédent",
              },
              aria: {
                sortAscending: ": activate to sort column ascending",
                sortDescending: ": activate to sort column descending",
              },
            },
          });
        }, 10);
      } catch (error) {
        console.log(error);
      }
    },
    getOtherTab() {
      this.tab = !this.tab;
      this.isActive = !this.isActive;
    },
  },
  created() {
    this.get_students_contact();
  },
};
</script>
<template>
  <section v-if="this.$store.state.translate === 'FR'">
    <div class="page-body position-relative mt-5">
      <div class="container-fluid">
        <div class="page-title d-flex">
          <ol
            :class="!isActive ? 'breadcrumb' : 'breadcrumb_two'"
            class="mx-3"
            @click="getOtherTab"
          >
            <li class="breadcrumb-item">Personnels contactés</li>
          </ol>
          <ol
            :class="isActive ? 'breadcrumb' : 'breadcrumb_two'"
            class="mx-3"
            @click="getOtherTab"
          >
            <li class="breadcrumb-item">Personnels sélectionnés</li>
          </ol>
        </div>
      </div>
  
      <div class="tab-content" id="top-tabContent" v-show="!tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Nom</th>
                    <th class="bg-light">Prénoms</th>
                    <th class="bg-light">Email</th>
                    <th class="bg-light">Télephone</th>
                    <th class="bg-light">Statut</th>
                    <th class="bg-light">Offre</th>
                    <th class="bg-light">Détails</th>
                  </tr>
                </thead>
                <tbody v-if="student.length">
                  <tr v-for="(item, index) in student" :key="index">
                    <td>{{ item.nom }}</td>
                    <td>{{ item.prenoms }}</td>
                    <td>
                      {{ item.email }}
                    </td>
                    <td>
                      {{ item.phone }}
                    </td>
                    <td>
                      
                      <div>
                        <span v-if="item.pivot.contrat === 1" class="badge bg-teal"
                        >Accepter</span
                      >
                      <span
                      class="mx-2"
                      v-if=" item.pivot.contrat === 0 && 
                      (JSON.stringify(new Date().toISOString().substring(0,10)) >=
                       JSON.stringify(new Date(item.pivot.offre.debut).toISOString().slice(0,10)))"
                      >Expirée</span>
                      
                      <span
                        v-if="item.pivot.contrat === 2"
                        class="badge bg-danger"
                        >Refuser</span
                      >
                      <span
                        v-if="item.pivot.contrat === 0"
                        class="badge bg-primary"
                        >En attente de réponse</span
                      >
                      </div>
                      
                      
                    </td>
                    <td>
                      {{item.pivot.offre.nom_offre}}
                    </td>
                    <td class="d-flex justify-content-center align-items-center">
                      <router-link
                        v-if="item.pivot.contrat === 1"
                        :to="{
                          name: 'details_students_contactes',
                          params: {
                            name: item.nom,
                            date: item.pivot.created_at,
                          },
                        }"
                        ><em class="bi bi-eye"></em
                      ></router-link>
                      <em
                        class="bi bi-dash-circle"
                        v-if="
                          item.pivot.contrat === 2 || item.pivot.contrat === 0
                        "
                      ></em>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="spinner">
                <h1>Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content" id="top-tabContent" v-show="tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData1" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Offre</th>
                    <th class="bg-light">Nombre d'étudiants</th>
                    <th class="bg-light">Détail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in studentRecruit" :key="index">
                    <td>{{ index }}</td>
                    <td>{{ item.length }}</td>
  
                    <td class="d-flex justify-content-center align-items-center">
                      <router-link
                        :to="{
                          name: 'detailsStudentsRecruit',
                          params: {
                            offre: index,
                          },
                        }"
                        ><em class="bi bi-eye"></em
                      ></router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="spinner">
                <h1>Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-if="this.$store.state.translate === 'EN'">
    <div class="page-body position-relative mt-5">
      <div class="container-fluid">
        <div class="page-title d-flex">
          <ol
            :class="!isActive ? 'breadcrumb' : 'breadcrumb_two'"
            class="mx-3"
            @click="getOtherTab"
          >
            <li class="breadcrumb-item">Personnel contacted</li>
          </ol>
          <ol
            :class="isActive ? 'breadcrumb' : 'breadcrumb_two'"
            class="mx-3"
            @click="getOtherTab"
          >
            <li class="breadcrumb-item">Selected personnel</li>
          </ol>
        </div>
      </div>
  
      <div class="tab-content" id="top-tabContent" v-show="!tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData2" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">last name</th>
                    <th class="bg-light">first name</th>
                    <th class="bg-light">Email</th>
                    <th class="bg-light">Phone</th>
                    <th class="bg-light">Status</th>
                    <th class="bg-light">Offer</th>
                    <th class="bg-light">Details</th>
                  </tr>
                </thead>
                <tbody v-if="student.length">
                  <tr v-for="(item, index) in student" :key="index">
                    <td>{{ item.nom }}</td>
                    <td>{{ item.prenoms }}</td>
                    <td>
                      {{ item.email }}
                    </td>
                    <td>
                      {{ item.phone }}
                    </td>
                    <td>
                      <span v-if="item.pivot.contrat === 1" class="badge bg-teal"
                        >Accept</span
                      >
                      <span
                        v-if="item.pivot.contrat === 2"
                        class="badge bg-danger"
                        >Refuse</span
                      >
                      <span
                        v-if="item.pivot.contrat === 0"
                        class="badge bg-primary"
                        >Waiting for a response</span
                      >
                    </td>
                    <td>
                      {{item.pivot.offre.nom_offre}}
                    </td>
                    <td class="d-flex justify-content-center align-items-center">
                      <router-link
                        v-if="item.pivot.contrat === 1"
                        :to="{
                          name: 'details_students_contactes',
                          params: {
                            name: item.nom,
                            date: item.pivot.created_at,
                          },
                        }"
                        ><em class="bi bi-eye"></em
                      ></router-link>
                      <em
                        class="bi bi-dash-circle"
                        v-if="
                          item.pivot.contrat === 2 || item.pivot.contrat === 0
                        "
                      ></em>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="spinner">
                <h1>Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content" id="top-tabContent" v-show="tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData3" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Offer</th>
                    <th class="bg-light">Number of students</th>
                    <th class="bg-light">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in studentRecruit" :key="index">
                    <td>{{ index }}</td>
                    <td>{{ item.length }}</td>
  
                    <td class="d-flex justify-content-center align-items-center">
                      <router-link
                        :to="{
                          name: 'detailsStudentsRecruit',
                          params: {
                            offre: index,
                          },
                        }"
                        ><em class="bi bi-eye"></em
                      ></router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="spinner">
                <h1>Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>

.mt-5 {
  margin-top: 101px !important;
}
.bi-dash-circle {
  color: crimson;
}
th{
  border: thin solid rgba(141, 140, 140, 0.692);
}
.bg-teal {
  background: rgb(1, 172, 47);
}
.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}
</style>
