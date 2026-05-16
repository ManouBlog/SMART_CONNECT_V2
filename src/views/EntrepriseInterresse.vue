<script>
import HeaderDashboard from "../Shared/Compoments/HeaderDashboard.vue";
import { FilterMatchMode } from "primevue/api";
import { configUtils } from "../Shared/Utils";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
import { useInfoStudentStore } from "../store-pinia/InfoStudent/useInfoStudentStore";
import { useWindowSize } from "@vueuse/core"; // <-- ajout VueUse

const statut = {
  0: "Réponse en attente",
  1: "Acceptée",
  3: "Annulée",
  2: "Rejetée",
};
const colorStatut = {
  0: "bg-info",
  1: "bg-success",
   3: "bg-danger",
  2: "bg-danger",
};

export default {
  name: "Offres_postulerView",
  components: {
    HeaderDashboard,
    IconField,
    InputIcon,
    InputText,
  },
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
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      colorStatut,
      statut,
      configUtils,
      spinner: false,
      currentPage: 1,
      pageSize: 5,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        formule: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    ...mapState(useInfoStudentStore, ["list_entreprise_interesse"]),
    list_entreprise_interesse_mobile(){
     const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.list_entreprise_interesse.slice(start, end);
    },
    isMobile() {
      const { width } = useWindowSize();
      return width.value < 768;
    },
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useInfoStudentStore, ["get_entreprise_interesse"]),
     async verifUserProfilEtudiantComplet() {
      await this.$store.dispatch("getInfoUser")
  const user = this.$store.state.infoUserConnected;
  
  if(user.user?.statuses.some(s => s.statut === 'Etudiant')){
if (!user.competences.length || !user.qualifications.length) {
    this.$router.push('/dashboard/profil');
   }
   if(!user.jours.length){
    this.$router.push('/dashboard/emploi_du_temps');
   }
  }
}
  },
  async created() {
    this.verifUserProfilEtudiantComplet();
    await this.get_entreprise_interesse();
    this.texte0 = await this.handleTranslate(`Recruteurs intéressés`);
    this.texte1 = await this.handleTranslate(`Nom de l'offre`);
    this.texte2 = await this.handleTranslate("Lieu du travail");
    this.texte3 = await this.handleTranslate(`Honoraire (Fcfa)`);
    this.texte5 = await this.handleTranslate("Statut");
    this.texte6 = await this.handleTranslate("Détails");
    this.texte14 = await this.handleTranslate("Voir plus");
    this.texte15 = await this.handleTranslate("Offre Expirée");
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <HeaderDashboard :TitleHeader="texte0" :subTitleHeader="texte0" />

    <div class="tab-content" id="top-tabContent">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 py-3 px-2">
            <!-- ✅ Desktop: Table -->
            <DataTable
              v-if="!isMobile"
              paginator
              :rows="10"
              :globalFilterFields="['formule']"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              :value="list_entreprise_interesse"
              v-model:filters="filters"
            >
              <template #paginatorstart>
                <div class="pagination-info">
                  Affichage de 1 à 10 sur {{ list_entreprise_interesse.length }} entrées.
                </div>
              </template>

              <template #header>
                <div class="conteneur_search">
                  <IconField iconPosition="left">
                    <InputIcon><i class="pi pi-search" /></InputIcon>
                    <InputText
                      style="width: 300px; font-size: 1.2em; border: 2px solid orange"
                      v-model="filters['global'].value"
                      placeholder="Recherche:"
                    />
                  </IconField>
                </div>
              </template>

              <Column
                field="nom_offre"
                :header="texte1"
                style="font-size: 1.1em; text-align: center"
              >
                <template #body="{ data }">{{ data.offre.nom_offre }}</template>
              </Column>

              <Column
                field="lieu"
                :header="texte2"
                style="font-size: 1.1em; text-align: center"
              >
                <template #body="{ data }">{{ data.offre.lieu }}</template>
              </Column>

              <Column
                field="entreprise"
                header="Recruteurs"
                style="font-size: 1.1em; text-align: center"
              >
                <template #body="{ data }">{{ data.entreprise?.nom }}</template>
              </Column>

              <Column
                field="salaire"
                :header="texte3"
                style="font-size: 1.1em; text-align: center"
              >
                <template #body="{ data }">{{
                  moneyFormat.format(data.offre.salaire)
                }}</template>
              </Column>

              <Column field="statut" :header="texte5" style="text-align: center">
                <template #body="{ data }">
                  <span :class="colorStatut[data.contrat]" class="badge">
                    {{ statut[data.contrat] }}
                  </span>
                </template>
              </Column>

              <Column field="details" :header="texte6" style="text-align: center">
                <template #body="{ data }">
                  <router-link
                    :to="{ name: 'entreprise_interesse_detail', params: { id: data.id } }"
                    class="btn-action"
                  >
                    <i class="bi bi-eye"></i>
                  </router-link>
                </template>
              </Column>
            </DataTable>

            <!-- ✅ Mobile: Cards -->
            <div v-else class="mobile-list">
              <div
                v-for="(item, index) in list_entreprise_interesse_mobile"
                :key="index"
                class="mobile-card"
              >
                <div class="mobile-card-header">
                  <h2 class="offre-nom">{{ item.offre.nom_offre }}</h2>
                 
                  <span :class="['badge', colorStatut[item.contrat]]">
                    {{ statut[item.contrat] }}
                  </span>
                </div>
                <span style="color:orange;">{{ item.offre?.competence?.categorie?.categorie }}</span>
                <p><strong>Lieu :</strong> {{ item.offre.lieu }}</p>
                <p><strong>Recruteur :</strong> {{ item.entreprise?.nom }}</p>
                <p>
                  <strong>Rémuneration</strong>
                  {{ moneyFormat.format(item.offre.salaire) }} Fcfa
                </p>

                <div class="mobile-actions">
                  <router-link
                    :to="{ name: 'entreprise_interesse_detail', params: { id: item.id } }"
                    class="btn-mobile"
                  >
                    <i class="bi bi-eye"></i> {{ texte14 }}
                  </router-link>
                </div>
              </div>
              <div
                class="d-flex justify-content-center my-4"
                v-if="list_entreprise_interesse_mobile.length > 0"
              >
                <n-pagination
                  v-model:page="currentPage"
                  :page-size="pageSize"
                  :item-count="list_entreprise_interesse_mobile.length"
                  show-size-picker
                  :page-sizes="[5, 10, 20]"
                  @update:page="currentPage = $event"
                  @update:page-size="
                    (size) => {
                      pageSize = size;
                      currentPage = 1;
                    }
                  "
                />
              </div>

              <div v-if="!list_entreprise_interesse.length" class="not_data">
                Pas de donnée.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Table */
th,
td {
  border: thin solid rgba(141, 140, 140, 0.3) !important;
  padding: 1rem !important;
  vertical-align: middle;
  text-align: center;
}

/* Mobile Cards */
.mobile-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-card {
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background: #25535f;
  color: white;
}

.mobile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.offre-nom {
  font-size: 1.5em;
  font-weight: bold;
  color: #ffffff;
}

.badge {
  padding: 0.4em 0.9em;
  border-radius: 12px;
  color: #fff;
  font-size: 0.9em;
}

.bg-info {
  background-color: #17a2b8 !important;
}
.bg-success {
  background-color: #28a745 !important;
}
.bg-danger {
  background-color: #dc3545 !important;
}

.mobile-actions {
  margin-top: 1rem;
  text-align: right;
}

.btn-mobile {
  background: orange;
  color: white;
  padding: 0.6em 1.2em;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}

.btn-mobile:hover {
  opacity: 0.85;
}

.not_data {
  text-align: center;
  padding: 2rem;
  color: #555;
}
:deep(td) {
  padding: 1em;
  text-align: center;
}
:deep(.p-column-header-content) {
  padding: 1em;
  justify-content: center !important;
}
</style>
