<script>
/* eslint-disable */
import axios from "axios";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';

export default {
  name: "UserView",
  components:{Column,DataTable,InputText},
  data() {
    return {
      entreprises: null,
      spinner: false,
      modify_timetable: false,
      filtersAbonnees:{
     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
     filtersPasAbonnees:{
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
     }
    };
  },
  methods: {
    seeNbreBadge(entreprise) {
      return entreprise?.filter((item) => item.view === 1).length || 0;
    },
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
    async getDetailCompanyNotSuscribe(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("https://backend.monbrobroli.com/api/updateBadgeEntreprise/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_detail_users", res);
          if (res.data.status) {
            this.$store.commit("DECREMENT_COMPANY_NOT_SUSCRIBE");
            this.$router.push({
              name: "detail_entreprise",
              params: { id: id },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
          this.get_users()
        });
    },
     async getDetailCompanySuscribe(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("https://backend.monbrobroli.com/api/updateBadgeEntreprise/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_detail_users", res);
          if (res.data.status) {
            this.$store.commit("DECREMENT_COMPANY_NOT_SUSCRIBE");
            this.$router.push({
              name: "detail_entreprise",
              params: { id: id },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
          this.get_users()
        });
    },
    
  },
  async mounted() {
    await this.$store.dispatch("get_users");
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="this.$store.state.spinnerLoading">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Entreprises</li>
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
               
                class="nav-link active"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#abonnées"
                role="tab"
                aria-controls="abonnées"
                aria-selected="true"
                ><i data-feather="clock"></i>Abonnées
                <span
                  class="badge bg-danger"
                  v-if="this.$store.state.nbreBdageEntrepriseAbonnee > 0"
                >
                  {{ this.$store.state.nbreBdageEntrepriseAbonnee }}
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#nonAbonnees"
                role="tab"
                aria-controls="nonAbonnees"
                aria-selected="true"
                ><i data-feather="clock"></i>Pas abonnées
                <span
                  class="badge bg-danger"
                  v-if="this.$store.state.nbreBdageEntreprisePasAbonnee > 0 "
                >
                  {{ this.$store.state.nbreBdageEntreprisePasAbonnee }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
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
  :value="$store.state.listEntrepriseAbonnee"
  paginator
  :rows="10"
  :rowsPerPageOptions="[5, 10, 20, 50]"
  v-model:filters="filtersAbonnees"
  :globalFilterFields="['nom', 'email', 'statut_entreprise']"
  class="table"
>

  <!-- HEADER SEARCH -->
  <template #header>
    <div class="flex" style="justify-content: flex-start !important;padding: 0 1em;">
      <InputText
        v-model="filtersAbonnees['global'].value"
        placeholder="Recherche..."
      />
    </div>
  </template>

  <!-- Date -->
  <Column
    field="created_at"
    header="Date d'enregistrement"
    style="width: 20%; padding: 1em"
  >
    <template #body="slotProps">
      {{ new Date(slotProps.data.created_at).toLocaleDateString("fr") }}
    </template>
  </Column>

  <!-- Entreprise -->
  <Column
    field="nom"
    header="Entreprise"
    style="width: 20%; padding: 1em"
  >
    <template #body="slotProps">
      <span>
        {{ slotProps.data.nom }}
        <span v-if="slotProps.data.view == 1" class="badge bg-danger ms-1">
          New
        </span>
      </span>
    </template>
  </Column>

  <!-- Email -->
  <Column
    field="email"
    header="Email"
    style="width: 20%; padding: 1em"
  />

  <!-- Structure -->
  <Column
    header="Structure"
    style="width: 20%; padding: 1em"
  >
    <template #body="slotProps">
      {{ slotProps.data?.statut_entreprise || '-' }}
    </template>
  </Column>

  <!-- Abonnement -->
  <Column
    header="Formule d'abonnement"
    style="width: 20%; padding: 1em"
  >
    <template #body="slotProps">
      {{
        slotProps.data?.user?.abonement?.length
          ? verifIfAbonnementCurrently(slotProps.data.user.abonement)
          : "Pas d'abonnement"
      }}
    </template>
  </Column>

  <!-- Action -->
  <Column
    header="Action"
    style="width: 10%; padding: 1em"
  >
    <template #body="slotProps">
      <a
        href="#"
        @click.prevent="getDetailCompanySuscribe(slotProps.data.id)"
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
  :value="$store.state.listEntreprisePasAbonnee"
  stripedRows
  paginator
  :rows="10"
  :rowsPerPageOptions="[5, 10, 20, 50]"
  v-model:filters="filtersPasAbonnees"
  :globalFilterFields="['nom', 'email', 'statut_entreprise']"
  class="table"
>

  <!-- HEADER SEARCH -->
  <template #header>
    <div class="flex" style="justify-content: flex-start !important;padding: 0 1em;">
      <InputText
        v-model="filtersPasAbonnees['global'].value"
        placeholder="Recherche..."
      />
    </div>
  </template>

  <!-- Date -->
  <Column
    field="created_at"
    header="Date d'enregistrement"
    style="width: 20%; padding: 1em"
  >
    <template #body="slotProps">
      {{ new Date(slotProps.data.created_at).toLocaleDateString("fr") }}
    </template>
  </Column>

  <!-- Entreprise -->
  <Column
    field="nom"
    header="Entreprise"
    style="width: 20%; padding: 1em"
  >
    <template #body="slotProps">
      <span>
        {{ slotProps.data.nom }}
        <span v-if="slotProps.data.view == 1" class="badge bg-danger ms-1">
          New
        </span>
      </span>
    </template>
  </Column>

  <!-- Email -->
  <Column
    field="email"
    header="Email"
    style="width: 20%; padding: 1em"
  />

  <!-- Structure -->
  <Column
    header="Structure"
    style="width: 20%; padding: 1em"
  >
    <template #body="slotProps">
      {{ slotProps.data?.statut_entreprise || '-' }}
    </template>
  </Column>

  <!-- Abonnement -->
  <Column
    header="Formule d'abonnement"
    style="width: 20%; padding: 1em"
  >
    <template #body="slotProps">
      {{
        slotProps.data?.user?.abonement?.length
          ? verifIfAbonnementCurrently(slotProps.data.user.abonement)
          : "Pas d'abonnement"
      }}
    </template>
  </Column>

  <!-- Action -->
  <Column
    header="Action"
    style="width: 10%; padding: 1em"
  >
    <template #body="slotProps">
      <a
        href="#"
        @click.prevent="getDetailCompanyNotSuscribe(slotProps.data.id)"
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
:deep(.p-inputtext){
  border: 2px solid black;
}
:deep(.p-datatable-header){
  border: none !important;
  display: flex;
  justify-content: flex-end;
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
.bi {
  font-size: 1.5em !important;
  cursor: pointer;
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
