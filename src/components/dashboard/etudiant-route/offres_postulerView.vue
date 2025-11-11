<script>
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { FilterMatchMode } from "primevue/api";
import { configUtils } from "../../../Shared/Utils";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useInfoStudentStore } from "../../../store-pinia/InfoStudent/useInfoStudentStore";
import { useWindowSize } from "@vueuse/core";

const statut = {
  0: "En attente",
  1: "Séléctionné",
  2: "Rejeté",
};
const colorStatut = {
  0: "bg-info",
  1: "bg-success",
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
      texte89: "",
      statut,
      colorStatut,
      configUtils,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      isMobile: false,
    };
  },
  computed: {
    ...mapState(useInfoStudentStore, ["list_offre"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useInfoStudentStore, ["get_all_student"]),

    getCertificatRoute(offreId) {
      this.$router.push({ name: "certifications", params: { id: offreId } });
    },
    getContratRoute(offreId) {
      this.$router.push({ name: "imprimeLeContrat", params: { id: offreId } });
    },
    getVoirPlusRoute(offreId) {
      this.$router.push({ name: "details_offres_postuler", params: { id: offreId } });
    },
  },
  async created() {
    this.get_all_student();

    const { width } = useWindowSize();
    this.$watch(
      () => width.value,
      (newWidth) => {
        this.isMobile = newWidth < 768;
      },
      { immediate: true }
    );

    this.texte0 = await this.handleTranslate(`Mes postulations`);
    this.texte1 = await this.handleTranslate(`Nom de l'offre`);
    this.texte2 = await this.handleTranslate("Lieu du travail");
    this.texte3 = await this.handleTranslate(`Honoraire (Fcfa)`);
    this.texte4 = await this.handleTranslate("Prime pas fixée.");
    this.texte5 = await this.handleTranslate("Statut");
    this.texte6 = await this.handleTranslate("Détails");
    this.texte89 = await this.handleTranslate("Entreprise");
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <HeaderDashboard :TitleHeader="texte0" :subTitleHeader="texte0" />

    <div class="tab-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 py-3 px-2">

            <!-- 🖥️ TABLEAU SUR GRAND ÉCRAN -->
            <div v-if="!isMobile" class="table-container p-3 rounded-4 shadow-sm bg-white">
              <DataTable
                paginator
                :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                :value="list_offre"
                v-model:filters="filters"
                :globalFilterFields="['formule']"
              >
                <template #header>
                  <div class="d-flex justify-content-end mb-3">
                    <IconField iconPosition="left">
                      <InputIcon><i class="pi pi-search" /></InputIcon>
                      <InputText
                        style="width: 300px; font-size: 1.1em; border: 2px solid orange"
                        v-model="filters['global'].value"
                        placeholder="Recherche..."
                      />
                    </IconField>
                  </div>
                </template>

                <Column field="entreprise.nom" :header="texte89" />
                <Column field="nom_offre" :header="texte1" />
                <Column field="lieu" :header="texte2" />
                <Column :header="texte3">
                  <template #body="{ data }">
                    {{ data.salaire ? moneyFormat.format(data.salaire) : texte4 }}
                  </template>
                </Column>
                <Column :header="texte5">
                  <template #body="{ data }">
                    <span :class="['badge', colorStatut[data.pivot.recruit]]">
                      {{ statut[data.pivot.recruit] }}
                    </span>
                  </template>
                </Column>
                <Column :header="texte6">
                  <template #body="{ data }">
                    <div class="d-flex justify-content-center align-items-center gap-3">
                      <n-button :bordered="false" size="large" @click="getVoirPlusRoute(data.id)">
                        <i class="bi bi-eye"></i>
                      </n-button>
                      <n-button
                        v-if="data.pivot.recruit === 1"
                        :bordered="false"
                        size="large"
                        @click="getContratRoute(data.pivot.offre_id)"
                      >
                        <i class="bi bi-file-earmark-text"></i>
                      </n-button>
                      <n-button
                        v-if="data.pivot.certificat === 1"
                        :bordered="false"
                        size="large"
                        @click="getCertificatRoute(data.pivot.offre_id)"
                      >
                        <i class="bi bi-award"></i>
                      </n-button>
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>

            <!-- 📱 VERSION MOBILE -->
            <div v-else class="mobile-container p-2">
              <div
                v-for="(item, i) in list_offre"
                :key="i"
                class="card_offre_mobile mb-3 p-3  shadow-sm"
              >
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="fw-bold text-primary">{{ item.nom_offre }}</h5>
                  <span :class="['badge', colorStatut[item.pivot.recruit]]">
                    {{ statut[item.pivot.recruit] }}
                  </span>
                </div>

                <p class="m-0"><strong>{{ texte89 }} :</strong> {{ item.entreprise.nom }}</p>
                <p class="m-0"><strong>{{ texte2 }} :</strong> {{ item.lieu }}</p>
                <p class="m-0">
                  <strong>{{ texte3 }} :</strong>
                  {{ item.salaire ? moneyFormat.format(item.salaire) : texte4 }}
                </p>

                <div class="d-flex justify-content-end mt-3 gap-3">
                  <n-button :bordered="false" size="large" @click="getVoirPlusRoute(item.id)">
                    <i class="bi bi-eye"></i>
                  </n-button>
                  <n-button
                    v-if="item.pivot.recruit === 1"
                    :bordered="false"
                    size="large"
                    @click="getContratRoute(item.pivot.offre_id)"
                  >
                    <i class="bi bi-file-earmark-text"></i>
                  </n-button>
                  <n-button
                    v-if="item.pivot.certificat === 1"
                    :bordered="false"
                    size="large"
                    @click="getCertificatRoute(item.pivot.offre_id)"
                  >
                    <i class="bi bi-award"></i>
                  </n-button>
                </div>
              </div>

              <div v-if="!list_offre.length" class="text-center py-4">
                <h4>Pas de donnée.</h4>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🖥️ TABLEAU STYLE */
.table-container {
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #ddd;
}

/* 📱 CARTE MOBILE STYLE */
.card_offre_mobile {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
   background: #fff;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.card_offre_mobile:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.badge {
  padding: 0.4em 0.8em;
  border-radius: 0.6em;
  font-size: 0.9em;
  color: #fff;
}
.bg-info {
  background-color: #17a2b8;
}
.bg-success {
  background-color: #28a745;
}
.bg-danger {
  background-color: #dc3545;
}

.bi-eye::before,
.bi-file-earmark-text::before,
.bi-award::before {
  font-size: 1.5em;
}

/* Global padding pour petits écrans */
.mobile-container {
  padding: 1rem;
}
:deep(td){
  padding:1em;
  text-align:center;
}
:deep(.p-column-header-content){
 padding:1em;
 justify-content: center !important;
}
</style>
