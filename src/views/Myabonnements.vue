<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapActions, mapState } from "pinia";
import { useEntreprisesStore } from "../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "Myabonnements",
  components:{
    DataTable,
    Column
  },
  data() {
    return {
      offre: null,
      offres: null,
    };
  },
  computed: { ...mapState(useEntreprisesStore, ["list_abonnement"]) },
  methods: { ...mapActions(useEntreprisesStore, ["get_all_student"]) },
  created() {
    this.get_all_student();
  },
};
</script>
<template>
  <div class="page-body position-relative mt-5">
    <div class="container-fluid">
      <div class="page-title">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Mes abonnements</li>
        </ol>
      </div>
    </div>

    <div class="tab-content" id="top-tabContent">
      <DataTable
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :value="list_abonnement"
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
            Affichage de 1 à 10 sur{{ list_abonnement.length }} entrées.
          </div>
        </template>
        <Column
          style="font-size: 1.8em; padding: 1em; text-align: center"
          field="nom_offre"
          header="Date"
        ></Column>
        <Column
          style="font-size: 1.8em; padding: 1em; text-align: center"
          field="nbre.length"
          header="Formule"
        ></Column>
        <Column
        style="font-size: 1.8em; padding: 1em; text-align: center"
        field="nbre.length"
        header="Prix (Fcfa)"
      ></Column>
      <Column
        style="font-size: 1.8em; padding: 1em; text-align: center"
        field="nbre.length"
        header="Echéance"
      ></Column>
      <Column
      style="font-size: 1.8em; padding: 1em; text-align: center"
      field="nbre.length"
      header="Statut"
    ></Column>
        
      </DataTable>

    </div>
  </div>
</template>
<style scoped>
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
.mt-5 {
  margin-top: 101px !important;
}
</style>
