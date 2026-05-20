<script>
/* eslint-disable */
import axios from "axios";
import BadgeCompVue from "../../components/BadgeComp.vue";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';

export default {
  name: "UserView",
  components: {
    BadgeCompVue,Column,DataTable,InputText
  },
  data() {
    return {
      students: [],
      studentsNonAbonnee: [],
       filtersAbonnees:{
     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
     filtersPasAbonnees:{
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
     },
      see_detail_students: false,
      id_student: null,
      student: null,
      spinner: false,
      currentFilter:"",
      talentsChoose:"abonne",
      statusFilter: 'Tous',
      statusAbonneeFilter:'Tous'
    };
  },
  computed: {
  filteredTalentsPasAbonnee() {
    if (this.statusFilter === 'Tous') {
      return this.studentsNonAbonnee;
    }
 console.log('this.statusFilter',this.statusFilter)
   console.log('this.studentsNonAbonnee',this.studentsNonAbonnee)
    return this.studentsNonAbonnee.filter(item =>{
if(item.user?.statuses.length){
   return item.user?.statuses?.some(s =>
        s.statut === this.statusFilter
      )
}else{
  return item.user.statut === this.statusFilter;
}
    } 
    );
  },
   filteredTalentsAbonne() {
    if (this.statusAbonneeFilter === 'Tous') {
      return this.students;
    }
  //  console.log('this.statusAbonneeFilter',this.statusAbonneeFilter)
  //  console.log('this.students',this.students)
    return this.students.filter(item =>{
if(item.user?.statuses.length){
   return item.user?.statuses?.some(s =>
        s.statut === this.statusAbonneeFilter
      )
}else{
  item.user.statut === this.statusAbonneeFilter;
}
    } 
    );
    
  },
  
},
  methods: {
    verifIfAbonnementCurrently(value) {
      let valueAbonnementCurrently = null;
      if (!value) {
        return "Pas d'abonnement";
      }
      value?.forEach((element) => {
        if (element.statut === "success") {
          valueAbonnementCurrently = element;
        }
      });
      return valueAbonnementCurrently?.abonement?.libelle
        ? valueAbonnementCurrently?.abonement?.libelle
        : null;
    },
    setFilter(value){
      console.log(value)
    },
    see_details(id) {
      this.see_detail_students = !this.see_detail_students;
      this.id_student = id;
      console.log("ID_STUDENT", this.id_student);
    },
    get_details_students(id) {
      this.see_detail_students = !this.see_detail_students;
      axios
        .get("https://backend.monbrobroli.com/api/list_students", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.students = res.data.data;
          this.student = this.students.find((item) => item.id === id);
          console.log("ID_STUDENT", this.student);
        });
    },
   
  getBtnClass(type) {
  return this.currentFilter === type
    ? "btn-active"
    : "btn-gray";
},
    async get_students() {
  this.spinner = true;
  await axios.get("https://backend.monbrobroli.com/api/list_students", {
      headers: {
        Authorization: "Bearer " + this.$store.state.token,
      },
    })
    .then((res) => {
      this.students = res.data.data;
      console.log("students230",this.students)
      this.spinner = false;
    })
    .catch((err) => {
      console.log(err);
    });
},
    async get_Visiteurs() {
      this.spinner = true;
     await axios
        .get("https://backend.monbrobroli.com/api/list_visiteurs", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          console.log("list_visiteurs",response);
          this.studentsNonAbonnee = response.data.data;
          console.log("studentsNonAbonnee", this.studentsNonAbonnee);
          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  
    async getDetailNotSuscribe(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("https://backend.monbrobroli.com/api/updateBadgeStudent/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_detail_users", res);
          if (res.data.status) {
            this.$store.commit("DECREMENT_STUDENT_NOT_SUSCRIBE");
            this.$router.push({
              name: "details",
              params: { id: id, name: "visiteur" },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
        });
    },
    async getDetailSuscribe(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("https://backend.monbrobroli.com/api/updateBadgeStudent/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_detail_users", res);
          if (res.data.status) {
            this.$store.commit("DECREMENT_STUDENT_NOT_SUSCRIBE");
            this.$router.push({
              name: "details",
              params: { id: id, name: "talents" },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
        });
    },
  },
  async created() {
    await this.get_students();
    await this.get_Visiteurs();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Talents</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 box-col-12">
      <div class="card timetable">
        <div class="social-tab">
          <ul class="nav nav-tabs" id="top-tab" role="tablist">
            <li class="nav-item">
              <a
              @click.prevent="()=>{
                talentsChoose = 'abonne'
                setFilter('')
              }"
                class="nav-link active"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#abonnées"
                role="tab"
                aria-controls="abonnées"
                aria-selected="true"
                ><i data-feather="clock"></i>Abonnées({{ this.students.length ? this.students?.length:0 }})
                <BadgeCompVue
                  v-if="this.$store.state.listStudentAbonne > 0"
                  :nbreTotal="this.$store.state.listStudentAbonne"
                />
              </a>
            </li>
            <li class="nav-item">
              <a
              @click.prevent="()=>{
                talentsChoose = 'NonAbonnes'
                setFilter('')
              }"
                class="nav-link"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#nonAbonnees"
                role="tab"
                aria-controls="nonAbonnees"
                aria-selected="true"
                ><i data-feather="clock"></i>Pas abonnées
                ({{ this.studentsNonAbonnee ? this.studentsNonAbonnee.length:0 }})
                <BadgeCompVue
                  v-if="this.$store.state.listStudentPasAbonne > 0"
                  :nbreTotal="this.$store.state.listStudentPasAbonne"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
      <!-- filter with buttons-->
   
    <!-- Container-fluid starts-->
  <div class="tab-content" id="top-tabContent">
 
      <div
        class="tab-pane fade show active"
        id="abonnées"
        role="tabpanel"
        aria-labelledby="abonnées"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <DataTable
              tableStyle="min-width: 50rem"
  :value="filteredTalentsAbonne"
  stripedRows
  paginator
  :rows="10"
  :rowsPerPageOptions="[5, 10, 20, 50]"
  v-model:filters="filtersAbonnees"
  :globalFilterFields="[
    'nom',
    'email',
    'ville',
    'commune',
    'quartier',
    'phone'
  ]"
>

  <!-- HEADER SEARCH -->
  <template #header>
    <div style="display: flex;justify-content: space-between;">
       <div>
      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusAbonneeFilter === 'Tous' }"
        @click="statusAbonneeFilter = 'Tous'"
      >
        Tous
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusAbonneeFilter === 'Etudiant' }"
        @click="statusAbonneeFilter = 'Etudiant'"
      >
        Etudiants
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusAbonneeFilter === 'Professionnel' }"
        @click="statusAbonneeFilter = 'Professionnel'"
      >
        Professionnels
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusAbonneeFilter === 'Vétéran' }"
        @click="statusAbonneeFilter = 'Vétéran'"
      >
        Vétérans
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusAbonneeFilter === 'Artisan' }"
        @click="statusAbonneeFilter = 'Artisan'"
      >
        Artisans
      </button>
    </div>
    <div>
       <InputText
        v-model="filtersAbonnees['global'].value"
        placeholder="Recherche..."
      />
    </div>
    </div>
  </template>

  <!-- Date -->
  <Column style="width: 20%; padding: 1em;" field="created_at" header="Date d'enregistrement">
    <template #body="slotProps">
      {{ new Date(slotProps.data.created_at).toLocaleDateString("fr") }}
    </template>
  </Column>

   <!-- VIA -->
  <Column style="width: 20%; padding: 1em;" field="nom" header="Enregistrer via">
    <template #body="slotProps">
      {{ slotProps.data.user.via ? slotProps.data.user.via:'-' }}
    </template>
  </Column>

  <!-- Statut -->
  <Column style="width: 20%; padding: 1em;" header="Statut">
    <template #body="slotProps">
      <span v-if="slotProps.data.user?.statuses?.length">
        <span
          v-for="statut in slotProps.data.user.statuses"
          :key="statut.id"
          style="display:flex;gap:1em;"
        >
          <span class="badge bg-primary">
            {{ statut.statut }}
          </span>
        </span>
      </span>

      <span v-else class="badge bg-primary">
        {{ slotProps.data.user?.statut?.statut }}
      </span>
    </template>
  </Column>

  <!-- Nom -->
  <Column style="width: 20%; padding: 1em;" field="nom" header="Nom">
    <template #body="slotProps">
      {{ slotProps.data.nom }}
      <span v-if="slotProps.data.view == 1" class="badge bg-danger">
        New
      </span>
    </template>
  </Column>

  <!-- Email -->
  <Column style="width: 20%; padding: 1em;" field="email" header="Email" />

  <!-- Ville -->
  <Column style="width: 20%; padding: 1em;" field="ville" header="Ville" />

  <!-- Commune -->
  <Column style="width: 20%; padding: 1em;" field="commune" header="Commune" />

  <!-- Quartier -->
  <Column style="width: 20%; padding: 1em;" field="quartier" header="Quartier" />

  <!-- Téléphone -->
  <Column style="width: 20%; padding: 1em;" field="phone" header="Téléphone" />

  <!-- Abonnement -->
  <Column style="width: 20%; padding: 1em;" header="Formule d'abonnement">
    <template #body="slotProps">
      {{
        slotProps.data?.user?.abonement?.length
          ? verifIfAbonnementCurrently(slotProps.data.user.abonement)
          : "Pas d'abonnement."
      }}
    </template>
  </Column>

  <!-- Détails -->
  <Column style="width: 20%; padding: 1em;" header="Détails">
    <template #body="slotProps">
      <a
        href="#"
        @click.prevent="getDetailSuscribe(slotProps.data.id)"
      >
        <i class="bi bi-eye"></i>
      </a>
    </template>
  </Column>

</DataTable>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane"
        id="nonAbonnees"
        role="tabpanel"
        aria-labelledby="nonAbonnees"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <DataTable
              tableStyle="min-width: 50rem"
  :value="filteredTalentsPasAbonnee"
  stripedRows
  paginator
  :rows="20"
  :rowsPerPageOptions="[10, 20, 50]"
  v-model:filters="filtersPasAbonnees"
  :globalFilterFields="[
    'nom',
    'email',
    'ville',
    'commune',
    'quartier',
    'phone'
  ]"
>

  <!-- SEARCH -->
  <template #header>
    <div style="display: flex;justify-content: space-between;">
    <div>
      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusFilter === 'Tous' }"
        @click="statusFilter = 'Tous'"
      >
        Tous
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusFilter === 'Etudiant' }"
        @click="statusFilter = 'Etudiant'"
      >
        Etudiants
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusFilter === 'Professionnel' }"
        @click="statusFilter = 'Professionnel'"
      >
        Professionnels
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusFilter === 'Vétéran' }"
        @click="statusFilter = 'Vétéran'"
      >
        Vétérans
      </button>

      <button
        class="btn btn-sm"
        :class="{ 'btn-color': statusFilter === 'Artisan' }"
        @click="statusFilter = 'Artisan'"
      >
        Artisans
      </button>
    </div>
    <div>
     <InputText
        v-model="filtersPasAbonnees['global'].value"
        placeholder="Recherche..."
      />
    </div>
      
    </div>
  </template>

   <!-- VIA -->
  <Column style="width: 20%; padding: 1em;" field="nom" header="Enregistrer via">
    <template #body="slotProps">
      {{ slotProps.data.user.via ? slotProps.data.user.via:'-' }}
    </template>
  </Column>

  <!-- DATE -->
  <Column style="width: 20%; padding: 1em;" field="created_at" header="Date d'enregistrement">
    <template #body="slotProps">
      {{ new Date(slotProps.data.created_at).toLocaleDateString("fr") }}
    </template>
  </Column>

  <!-- STATUT -->
  <Column style="width: 20%; padding: 1em;" header="Statut">
    <template #body="slotProps">
      <span v-if="slotProps.data.user?.statuses?.length">
        <span
          v-for="statut in slotProps.data.user.statuses"
          :key="statut.id"
          style="display:flex;gap:1em;"
        >
          <span class="badge bg-primary">
            {{ statut.statut }}
          </span>
        </span>
      </span>

      <span v-else class="badge bg-primary">
        {{ slotProps.data.user?.statut?.statut }}
      </span>
    </template>
  </Column>

  <!-- NOM -->
  <Column style="width: 20%; padding: 1em;" field="nom" header="Nom">
    <template #body="slotProps">
      {{ slotProps.data.nom }}
      <span v-if="slotProps.data.view == 1" class="badge bg-danger">
        New
      </span>
    </template>
  </Column>

  <!-- EMAIL -->
  <Column style="width: 20%; padding: 1em;" field="email" header="Email" />

  <!-- VILLE -->
  <Column style="width: 20%; padding: 1em;" field="ville" header="Ville" />

  <!-- COMMUNE -->
  <Column style="width: 20%; padding: 1em;" field="commune" header="Commune" />

  <!-- QUARTIER -->
  <Column style="width: 20%; padding: 1em;" field="quartier" header="Quartier" />

  <!-- TELEPHONE -->
  <Column style="width: 20%; padding: 1em;" field="phone" header="Téléphone" />

  <!-- ABONNEMENT -->
  <Column style="width: 20%; padding: 1em;" header="Formule d'abonnement">
    <template #body="slotProps">
      {{
        slotProps.data?.user?.abonement?.length
          ? verifIfAbonnementCurrently(slotProps.data.user.abonement)
          : "Pas d'abonnement."
      }}
    </template>
  </Column>

  <!-- DETAILS -->
  <Column style="width: 20%; padding: 1em;" header="Détails">
    <template #body="slotProps">
      <a
        href="#"
        @click.prevent="getDetailNotSuscribe(slotProps.data.id)"
      >
        <i class="bi bi-eye"></i>
      </a>
    </template>
  </Column>

</DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.btn-sm){
  background-color: rgb(214, 213, 213) !important;
   padding: 0.7em !important;
   border-radius: 0px !important;
}
.btn-color{
  padding: 0.7em !important;
  background-color: rgb(2, 61, 72) !important;
  color:white;
  font-weight: bold;
  
}
:deep(.p-inputtext){
  border: 2px solid black;
}
:deep(.p-datatable-header){
  border: none !important;
}
:deep(.p-datatable .p-datatable-paginator-bottom) {
  background: #ffffff;
  border: none;
  border-top: 1px solid #f1f5f9;
  padding: 1rem;
  border-radius: 0 0 16px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);
}

/* Boutons */
:deep(.p-paginator .p-paginator-page),
:deep(.p-paginator .p-paginator-prev),
:deep(.p-paginator .p-paginator-next),
:deep(.p-paginator .p-paginator-first),
:deep(.p-paginator .p-paginator-last) {
  width: 38px;
  height: 38px;

  border-radius: 10px;
  border: none;

  background: #f8fafc;
  color: #334155;

  transition: all 0.2s ease;
}

/* Hover */
:deep(.p-paginator .p-paginator-page:hover),
:deep(.p-paginator .p-paginator-prev:hover),
:deep(.p-paginator .p-paginator-next:hover),
:deep(.p-paginator .p-paginator-first:hover),
:deep(.p-paginator .p-paginator-last:hover) {
  background: #e2e8f0;
  transform: translateY(-1px);
}

/* Active */
:deep(.p-paginator .p-paginator-page.p-highlight) {
  background: #3b82f6;
  color: white;
  font-weight: 600;

  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

/* Texte */
:deep(.p-paginator .p-paginator-current) {
  margin: 0 1rem;
  color: #64748b;
  font-size: 14px;
}

/* Dropdown */
:deep(.p-paginator .p-dropdown) {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.btn-gray {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-gray:hover {
  background-color: #e5e7eb;
}

.btn-active {
  background-color: orange;
  color: white;
  border: 1px solid orange;
}
.bi {
  font-size: 1.5em !important;
  cursor: pointer;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
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
</style>
