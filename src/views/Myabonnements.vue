<template>
  <div class="page-body position-relative">
    <HeaderDashboard :TitleHeader="texte0" :subTitleHeader="texte0" />

    <div class="tab-content" id="top-tabContent">
      <!-- ✅ Desktop -->
      <DataTable
        v-if="!isMobile"
        paginator
        :rows="10"
        :globalFilterFields="['abonement.libelle']"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :value="list_abonnement"
        v-model:filters="filters"
      >
        <template #paginatorstart>
          <div
            style="display: flex; justify-content: flex-start; font-size: 1em; border: none;"
          >
            {{ texte1 }} {{ list_abonnement.length }} {{ texte3 }}
          </div>
        </template>

        <template #header>
          <div class="conteneur_search" style="display:flex;align-items:center;">
            <div class="mx-3">
              <button class="btn bg-warning py-2" @click="handleNouvelAbonnement">
                {{ texte2 }}
              </button>
            </div>
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                style="width: 300px; font-size: 1.5em; border: 2px solid orange"
                v-model="filters['global'].value"
                :placeholder="texte9"
              />
            </IconField>
          </div>
        </template>

        <Column
          style="font-size: 1.8em; padding: 1em; text-align: center"
          field="created_at"
          :header="texte10"
        >
          <template #body="slotProps">
            <span>{{ configUtils.getFormatDateFr(slotProps.data.created_at) }}</span>
          </template>
        </Column>

        <Column style="font-size: 1.8em; padding: 1em; text-align: center" field="abonement.libelle" :header="texte4"/>
        <Column style="font-size: 1.8em; padding: 1em; text-align: center" field="montant" :header="texte5"/>
        <Column style="font-size: 1.8em; padding: 1em; text-align: center" field="echeance" :header="texte6"/>
        <Column style="font-size: 1.8em; padding: 1em; text-align: center" field="statut" :header="texte7">
          <template #body="slotProps">
            <span
              class="px-2"
              :class="slotProps.data.statut === 'success' ? 'bg-success' : 'bg-danger'"
            >
              {{ STATUTABONNEMENT[slotProps.data.statut] }}
            </span>
          </template>
        </Column>
      </DataTable>

      <!-- ✅ Mobile -->
      <div v-else>
        <div v-for="item in list_abonnement" :key="item.id" class="abonnement-card">
          <div class="card-header">
            <span>{{ configUtils.getFormatDateFr(item.created_at) }}</span>
            <span :class="['px-2', item.statut === 'success' ? 'bg-success' : 'bg-danger']">
              {{ STATUTABONNEMENT[item.statut] }}
            </span>
          </div>
          <div class="card-body">
            <p><strong>{{ texte4 }} :</strong> {{ item.abonement.libelle }}</p>
            <p><strong>{{ texte5 }} :</strong> {{ item.montant }}</p>
            <p><strong>{{ texte6 }} :</strong> {{ item.echeance }}</p>
          </div>
          <div class="card-footer">
            <button class="btn bg-warning" @click="handleNouvelAbonnement">
              {{ texte2 }}
            </button>
          </div>
        </div>

        <div v-if="!list_abonnement.length">
          <h1 class="not_data">Pas de donnée</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { mapActions, mapState } from "pinia";
import { configUtils } from "../Shared/Utils";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import HeaderDashboard from "../Shared/Compoments/HeaderDashboard.vue";
import { useEntreprisesStore } from "../store-pinia/Entreprise/useEntreprisesStore";
import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
import { useWindowSize } from "@vueuse/core";

const STATUTABONNEMENT = { success: "Actif", expired: "Non Actif" };

export default {
  name: "Myabonnements",
  components: { DataTable, Column, HeaderDashboard, IconField, InputIcon, InputText },
  data() {
    return {
      texte0: "",
      texte1: "",
      texte2: "",
      texte3: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte9: "",
      texte10: "",
      configUtils,
      STATUTABONNEMENT,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  computed: {
    ...mapState(useEntreprisesStore, ["list_abonnement"]),
    isMobile() {
      const { width } = useWindowSize();
      return width.value < 768;
    },
  },
  methods: {
    ...mapActions(useEntreprisesStore, ["get_all_abonnement"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    handleNouvelAbonnement() {
      this.$router.push({ name: "abonnements" });
    },
  },
  async created() {
    this.get_all_abonnement();
    this.texte0 = await this.handleTranslate("Mes abonnements");
    this.texte1 = await this.handleTranslate(`Affichage de 1 à 10 sur`);
    this.texte2 = await this.handleTranslate("Nouvel Abonnement");
    this.texte3 = await this.handleTranslate("entrées.");
    this.texte4 = await this.handleTranslate("Formule");
    this.texte5 = await this.handleTranslate("Prix (Fcfa)");
    this.texte6 = await this.handleTranslate("Echéance");
    this.texte7 = await this.handleTranslate("Statut");
    this.texte9 = await this.handleTranslate("Recherche:");
    this.texte10 = await this.handleTranslate("Date de paiement");
  },
};
</script>

<style scoped>
/* ✅ Card mobile */
.abonnement-card {
  background: #fff;
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 1em;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;
}
.card-body p {
  margin: 0.3em 0;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
}
.btn {
  padding: 0.5em 1em;
}
</style>
