<script>
import instance from "../../../api/api";

import Swal from "sweetalert2";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

import { FilterMatchMode } from "primevue/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
const  loadingSpinner = useLoadingSpinner()
export default {
  name: "see_who_interresse_by_profil_studentView",
  components: {
    HeaderDashboard,
    IconField,
    InputIcon,
    InputText,
  },
  data() {
    return {
      list_entreprise_contact: [],
      student: null,
      spinner: false,
      lentghOfList_entreprise_contact: "",
      idOffre: "",
      showMsgAcceptoffre: false,
      showMsgRejectoffre: false,
      user: this.$store.state.user,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        formule: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
    };
  },
  methods: {
    get_entreprise_who_contact_student() {
      loadingSpinner.launchLoading(true);
      instance
        .get("get_who_contact_student")
        .then((res) => {
          console.log(res);
          this.student = res.data;
          console.log("STUDENTS_ENTREPRISES", this.student);
          this.list_entreprise_contact = this.student.entreprises;
          // this.$store.commit("ADD_ITEM",this.student.entreprises)
          localStorage.setItem("length", this.list_entreprise_contact.length);
          console.log("LISTS_ENTREPRISES", this.list_entreprise_contact);
          loadingSpinner.launchLoading(false);
          
        })
        .catch((err) => {
          console.log(err);
          loadingSpinner.launchLoading(false);
        });
    },
    showIdForAccept(id) {
      this.idOffre = id;
      console.log("ID", this.idOffre);
      this.showMsgAcceptoffre = !this.showMsgAcceptoffre;
    },
    annuleContrat() {
      this.idOffre = null;
      console.log("ID", this.idOffre);
      this.showMsgAcceptoffre = !this.showMsgAcceptoffre;
    },
    annuleRejetContrat() {
      this.idOffre = null;
      console.log("ID", this.idOffre);
      this.showMsgRejectoffre = !this.showMsgRejectoffre;
    },
    rejetJob(id) {
      this.idOffre = id;
      console.log("ID", this.idOffre);
      this.showMsgRejectoffre = !this.showMsgRejectoffre;
    },
    acceptJob() {
      instance
        .put("changeStatutJob/" + this.idOffre, {
          contrat: 1,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
      
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    rejectJob() {
      instance
        .put("changeStatutJob/" + this.idOffre, {
          contrat: 2,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            // setTimeout(function () {
            //   //location.reload(true);
            // }, 1500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    seeDetailOffre(idOffre){
      instance
        .put("confirmAlarm/" + idOffre)
        .then((response) => {
          console.log("confirmAlarm",response);
          if (response.data.status === true) {
           this.$store.commit("DECREASE_ALARM")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created() {
    this.get_entreprise_who_contact_student();
  },
};
</script>
<template>
  <div class="page-body position-relative">

    <HeaderDashboard
    :TitleHeader="'Contrats'"
    :subTitleHeader="'Contrats'"
  />
    <div
      class="tab-content"
      id="top-tabContent"
      
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 py-3 px-2">
            <div class="verfAccept" v-if="showMsgAcceptoffre">
              <div class="msgForAccept">
                <h5>Voulez-vous accepter l'offre ?</h5>
                <button class="btn-lg bg-primary" @click="acceptJob">
                  Accepter
                </button>
                <button class="btn-lg bg-danger mx-2" @click="annuleContrat">
                  Annuler
                </button>
              </div>
            </div>
            <div class="verfAccept" v-if="showMsgRejectoffre">
              <div class="msgForAccept">
                <h5>Voulez-vous rejeter l'offre ?</h5>
                <button class="btn-lg bg-primary" @click="rejectJob">
                  Rejeter
                </button>
                <button class="btn-lg bg-danger mx-2" @click="annuleRejetContrat">
                  Annuler
                </button>
              </div>
            </div>
            <DataTable
              paginator
              :rows="10"
              :globalFilterFields="['formule']"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              :value="list_entreprise_contact"
              v-model:filters="filters"
            >
              <template #paginatorstart>
                <div
                  style="
                    display: flex;
                    justify-content: flex-start;
                    font-size: 1em;
                    border: none;
                  "
                >
                  Affichage de 1 à 10 sur{{ list_entreprise_contact.length }} entrées.
                </div>
              </template>
              <template #header>
                <div class="conteneur_search">
                  <IconField iconPosition="left">
                    <InputIcon>
                      <i class="pi pi-search" />
                    </InputIcon>
                    <InputText
                      style="width: 300px; font-size: 1.5em; border: 2px solid orange"
                      v-model="filters['global'].value"
                      placeholder="Recherche:"
                    />
                  </IconField>
                </div>
              </template>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="nom"
                header="Nom de l'entreprise"
              >
            
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="email"
                header="Email de l'entreprise"
              ></Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="id"
                header="Date de l'emploi"
              >
                <template #body="slotProps">
                  <div>
                    <span v-if="slotProps.data.pivot.date_debut !== null"
                      >{{
                        slotProps.data.pivot.date_debut
                      }}
                      au
                    </span>

                    <span v-if="slotProps.data.pivot.date_fin !== null">{{
                      slotProps.data.pivot.date_fin
                    }}</span>
                    <span v-if="slotProps.data.pivot.date !== null">{{
                      slotProps.data.pivot.date
                    }}</span>
                  </div>
                </template>
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="id"
                header="Statut"
              >
                <template #body="slotProps">
                  <div class="d-flex align-items-center justify-content-center">
                    <span v-if="slotProps.data.pivot.contrat === 1" 
                    class="badge bg-info"
                      >accepter</span
                    >
                    <span
                      v-else-if="slotProps.data.pivot.contrat === 2"
                      class="badge bg-danger"
                      >refuser</span
                    >
                    <span v-else class="badge bg-warning">
                      En attente de reponse
                    </span>
                  </div>
                </template>
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="id"
                header="Actions"
              >
                <template #body="slotProps">
                  <div>
                    <div v-if="slotProps.data.pivot.contrat === 0">
                      <a
                      href="#"
                      class="text-danger d-block"
                      @click.prevent="rejetJob(slotProps.data.pivot.id)"
                      >Rejeter</a
                    >
                    <a 
                      href="#"
                      class="text-primary"
                      @click.prevent="showIdForAccept(slotProps.data.pivot.id)"
                      >Accepter</a
                    >
                    <span
                      class="mx-2"
                      v-if=" slotProps.data.pivot.contrat === 0 && 
                      (JSON.stringify(new Date().toISOString().substring(0,10)) >=
                       JSON.stringify(new Date(slotProps.data.pivot.offre.debut).toISOString().slice(0,10)))"
                      >Expirée</span>
                    </div>
                    
                    <em 
                    v-else
                    class="bi bi-dash-circle text-danger"
                  ></em>
                  </div>
                </template>
              </Column>
              <Column
              style="font-size: 1.8em; padding: 1em; text-align: center"
              field="id"
              header="Détails"
            >
              <template #body="slotProps">
                <div>
                <em
                  class="bi bi-dash-circle text-danger"
                  v-if="slotProps.data.pivot.contrat === 0 || 
                  slotProps.data.pivot.contrat === 2"
                ></em>
                <router-link
                @click="seeDetailOffre(slotProps.data.pivot.id)"
                :to="{
                  name: 'imprimeLeContrat',
                  params: { id: slotProps.data.pivot.id },
                }"
                v-if="slotProps.data.pivot.contrat === 1"
                ><em class="bi bi-eye"></em
              ></router-link>
              <span v-if="slotProps.data.pivot.alarm === 1"
               class="badge bg-danger mx-3">New</span>
              </div>
              </template>
            </Column>
            </DataTable>
            <!-- <table id="MyTableData" class="table">
              <thead>
                <tr>
                  <th class="bg-light">Nom de l'entreprise</th>
                  <th class="bg-light">Email de l'entreprise</th>
                  <th class="bg-light">Date de l'emploi</th>
                  <th class="bg-light">Statut</th>
                  <th class="bg-light">Action</th>
                  <th class="bg-light">Détails</th>
                </tr>
              </thead>
              <tbody >
                <tr
                  v-for="(item, index) in list_entreprise_contact"
                  :key="index"
                >
                  <td>{{ item.nom }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <span v-if="item.pivot.date_debut !== null"
                      >{{
                        item.pivot.date_debut
                      }}
                      au
                    </span>

                    <span v-if="item.pivot.date_fin !== null">{{
                      item.pivot.date_fin
                    }}</span>
                    <span v-if="item.pivot.date !== null">{{
                      item.pivot.date
                    }}</span>
                  </td>
                  <td>
                    <span v-if="item.pivot.contrat === 1" class="badge bg-info"
                      >accepter</span
                    >
                    <span
                      v-else-if="item.pivot.contrat === 2"
                      class="badge bg-danger"
                      >refuser</span
                    >
                    
                    <span v-else class="badge bg-warning">
                      En attente de reponse
                    </span>
                  </td>
                  <td>
                    <div v-if="item.pivot.contrat === 0">
                      <a
                      href="#"
                      class="text-danger d-block"
                      @click.prevent="rejetJob(item.pivot.id)"
                      >Rejeter</a
                    >
                    <a 
                      href="#"
                      class="text-primary"
                      @click.prevent="showIdForAccept(item.pivot.id)"
                      >Accepter</a
                    >
                    <span
                      class="mx-2"
                      v-if=" item.pivot.contrat === 0 && 
                      (JSON.stringify(new Date().toISOString().substring(0,10)) >=
                       JSON.stringify(new Date(item.pivot.offre.debut).toISOString().slice(0,10)))"
                      >Expirée</span>
                    </div>
                    
                    <em 
                    v-else
                    class="bi bi-dash-circle text-danger"
                  ></em>
                  </td>
                  <td>
                    <em
                      class="bi bi-dash-circle text-danger"
                      v-if="item.pivot.contrat === 0 || item.pivot.contrat === 2"
                    ></em>
                    <router-link
                    @click="seeDetailOffre(item.pivot.id)"
                    :to="{
                      name: 'imprimeLeContrat',
                      params: { id: item.pivot.id },
                    }"
                    v-if="item.pivot.contrat === 1"
                    ><em class="bi bi-eye"></em
                  ></router-link>
                  <span v-if="item.pivot.alarm === 1" class="badge bg-danger mx-3">New</span>
                  </td>
                </tr>
              </tbody>
            </table> -->
           
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<style scoped>
.mt-5 {
  margin-top: 101px !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
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
.verfAccept {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: transparent;
  display: flex;
  place-items: center;
  justify-content: center;
}
.msgForAccept {
  width: auto;
  padding: 1.5em;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.356);
}
</style>
