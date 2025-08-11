<script>
import instance from "../../../api/api";

import Swal from "sweetalert2";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import {mapActions} from "pinia";
import { FilterMatchMode } from "primevue/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
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
      texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte90:"",
      texte11:"",
      texte12:"",
      texte13:"",
      texte14:"",
      texte15:"",
      texte16:"",
      texte17:"",
      texte18:"",
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
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    get_entreprise_who_contact_student() {
      loadingSpinner.launchLoading(true);
      instance
        .get("get_who_contact_student")
        .then((res) => {
          console.log(res);
          this.list_entreprise_contact = res.data;
          console.log("STUDENTS_ENTREPRISES", this.list_entreprise_contact);
          // this.list_entreprise_contact = this.student.entreprises;
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
  async created() {
    this.get_entreprise_who_contact_student();
    this.texte = await this.handleTranslate('Contrats');
    this.texte1 = await this.handleTranslate(`Voulez-vous accepter l'offre ?`);
     this.texte2 = await this.handleTranslate("Accepter");
     this.texte3 = await this.handleTranslate(` Annuler`);
     this.texte4 = await this.handleTranslate("Voulez-vous rejeter l'offre ?");
     this.texte5 = await this.handleTranslate('Rejeter');
     this.texte6 = await this.handleTranslate('Recherche:');
     this.texte7 =  await this.handleTranslate(`Nom de l'entreprise`);
     this.texte8 =  await this.handleTranslate(`Email de l'entreprise`);
     this.texte9 = await this.handleTranslate(`Echéance`);
     this.texte90 = await this.handleTranslate(`Offre`);
     this.texte10 = await this.handleTranslate("accepter");
     this.texte11 = await this.handleTranslate('refuser');
     this.texte12 = await this.handleTranslate('En attente de reponse');
     this.texte13 = await this.handleTranslate('Rejeter');
     this.texte14 = await this.handleTranslate('Accepter');
     this.texte15 =  await this.handleTranslate('Expirée');
     this.texte16 =  await this.handleTranslate('Détails');
  },
};
</script>
<template>
  <div class="page-body position-relative">

    <HeaderDashboard
    :TitleHeader="texte"
    :subTitleHeader="texte"
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
                <h5>{{texte1}}</h5>
                <button class="btn-lg bg-primary" @click="acceptJob">
                  {{texte2}}
                </button>
                <button class="btn-lg bg-danger mx-2" @click="annuleContrat">
                 {{texte3}}
                </button>
              </div>
            </div>
            <div class="verfAccept" v-if="showMsgRejectoffre">
              <div class="msgForAccept">
                <h5>{{texte4}}</h5>
                <button class="btn-lg bg-primary" @click="rejectJob">
                  {{texte5}}
                </button>
                <button class="btn-lg bg-danger mx-2" @click="annuleRejetContrat">
                  {{texte3}}
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
                      :placeholder="texte6"
                    />
                  </IconField>
                </div>
              </template>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="id"
                :header="texte7"
              >
            <template #body="slotProps">
                  <div>
                    <span>{{ slotProps.data.offre.entreprise.nom }}
                    </span>                    
                  </div>
                </template>
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="email"
                :header="texte8"
              >
            <template #body="slotProps">
                  <div>
                    <span>{{ slotProps.data.offre.entreprise.email }}
                    </span>                    
                  </div>
                </template>
            </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="id"
                :header="texte9"
              >
                <template #body="slotProps">
                  <div>
                    <span
                      >{{
                        slotProps.data?.offre?.fin
                      }}
                    </span>
                  </div>
                </template>
              </Column>
               <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="id"
                :header="texte90"
              >
                <template #body="slotProps">
                  <div>
                    <span
                      >{{
                        slotProps.data?.offre?.nom_offre
                      }}
                    </span>
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
                    <span v-if="slotProps.data?.recruit === 1" 
                    class="badge bg-info"
                      >{{texte10}}</span
                    >
                    <span
                      v-else-if="slotProps.data?.recruit === 2"
                      class="badge bg-danger"
                      >{{texte11}}</span
                    >
                    <span v-else class="badge bg-warning">
                      {{texte12}}
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
                    <div v-if="slotProps.data?.recruit === 0">
                      <a
                      href="#"
                      class="text-danger d-block"
                      @click.prevent="rejetJob(slotProps.data?.id)"
                      >{{texte13}}</a
                    >
                    <a 
                      href="#"
                      class="text-primary"
                      @click.prevent="showIdForAccept(slotProps.data?.id)"
                      >{{texte14}}</a
                    >
                    <span
                      class="mx-2"
                      v-if=" slotProps.data?.recruit === 0 && 
                      (JSON.stringify(new Date().toISOString().substring(0,10)) >=
                       JSON.stringify(new Date(slotProps.data?.offre.debut).toISOString().slice(0,10)))"
                      >{{texte15}}</span>
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
              :header="texte16"
            >
              <template #body="slotProps">
                <div>
                <em
                  class="bi bi-dash-circle text-danger"
                  v-if="slotProps.data?.recruit === 0 || 
                  slotProps.data?.recruit === 2"
                ></em>
                <router-link
                @click="seeDetailOffre(slotProps.data?.id)"
                :to="{
                  name: 'imprimeLeContrat',
                  params: { id: slotProps.data?.id },
                }"
                v-if="slotProps.data?.recruit === 1"
                ><em class="bi bi-eye"></em
              ></router-link>
              <span v-if="slotProps.data?.pivot?.alarm === 1"
               class="badge bg-danger mx-3">New</span>
              </div>
              </template>
            </Column>
            </DataTable>
            <div v-if="!list_entreprise_contact.length">
              <h1>Pas de donnée.</h1>
            </div>
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
