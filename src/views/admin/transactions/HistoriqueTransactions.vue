<script>
/* eslint-disable */
import axios from "axios";
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
export default {
  name: "HistoriqueTransactions",
  components:{Column,DataTable},
  data() {
    return {
      Historique: null,
      spinner: false,
      modify_timetable: false,
    };
  },
  methods: {
    get_Historique() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/admin/historiqueTransaction", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.Historique = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    // async getPayStackHistorique() {
    //   await axios
    //     .get("https://backend.monbrobroli.com/api/payStack/transactions", {
    //       headers: {
    //         Authorization: "Bearer " + this.$store.state.token,
    //       },
    //     })
    //     .then((response) => {
    //       console.log("RESPONSE_GetPayStackHistorique", response);
    //       // this.get_Historique()
    //     });
    // },
  },
  created() {
    this.get_Historique();
    // this.getPayStackHistorique();
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
              <li class="breadcrumb-item">Historique de paiement</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="tab-content" id="top-tabContent">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 card py-3 px-2">
           <DataTable
  :value="Historique"
  :rows="10"
  :rowsPerPageOptions="[5, 10, 20, 50]"
  tableStyle="min-width: 50rem"
>
  <Column style="width: 20%; padding: 1em;" header="Date de paiement">
    <template #body="{ data }">
      {{ new Date(data.created_at).toLocaleDateString("fr") }}
    </template>
  </Column>

  <Column style="width: 20%; padding: 1em;" field="transaction_id" header="Identifiant" />

  <Column style="width: 20%; padding: 1em;" header="Montant (Fcfa)">
    <template #body="{ data }">
      {{ data.montant }}
    </template>
  </Column>

  <Column style="width: 20%; padding: 1em;" header="Client">
    <template #body="{ data }">
      {{ data?.user?.nom }}
    </template>
  </Column>

  <Column style="width: 20%; padding: 1em;" header="Profil du client">
    <template #body="{ data }">
    
      <span v-if="data.user.statuses.length">
       <span class="badge bg-primary" v-for="item in data.user.statuses"
       :key="item">
      {{ item.statut }}
       </span>
      </span>
      <span class="badge bg-primary" v-if="!data.user.statuses.length && data.user?.statut?.statut">
      {{ data.user?.statut?.statut }}
      </span>
    </template>
  </Column>

  <Column style="width: 20%; padding: 1em;" header="Formule">
    <template #body="{ data }">
      {{ data.abonement.libelle }}
    </template>
  </Column>

  <Column style="width: 20%; padding: 1em;" header="Date d'écheance">
    <template #body="{ data }">
      {{ data.echeance }}
    </template>
  </Column>

  <Column style="width: 20%; padding: 1em;" header="Statut du paiement">
    <template #body="{ data }">
      <span
        class="badge"
        :class="
          data.statut === 'EN ATTENTE'
            ? 'bg-warning'
            : data.statut !== 'success'
            ? 'bg-danger'
            : 'bg-success'
        "
      >
        {{ data.statut }}
      </span>
    </template>
  </Column>
</DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Container-fluid Ends-->
</template>
<style scoped>
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
