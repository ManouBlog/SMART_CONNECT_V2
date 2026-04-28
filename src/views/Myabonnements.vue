<template>
  <div class="page-body position-relative">
   <n-modal
  v-model:show="showModalDetailAbonnement"
  :closable="false"
  preset="card"
  style="width: 80%; max-width: 900px;"
>
  <template #header>
    <div style="padding:12px 16px;border-radius:6px;">
      <h3 style="margin:0;">Détails de l'abonnement</h3>
    </div>
  </template>

  <div style="max-height:70vh; overflow-y:auto; padding:10px;">
<!-- {{ detailsAbonnement }} -->
    <div class="card">

      <div class="card-body" v-if="detailsAbonnement">
        <div class="row mb-3">
          <div class="col-md-6 mb-3">
            <strong>Formule de l’abonnement :</strong>
            <div>{{ detailsAbonnement?.abonement?.libelle }}</div>
          </div>
          <div class="col-md-6 mb-3">
            <strong>Statut de l'abonnement :</strong>
            <div>
              <span
         class="badge"
         :style="{
          background: detailsAbonnement?.statut === 'success' ? '#28a745' : '#dc3545',
           color: 'white'
             }"
            >{{ detailsAbonnement?.statut }} 
              </span>
            </div>
          </div>

        </div>

        <div class="row mb-3">

          <div class="col-md-6 mb-3">
  <strong>Montant payé :</strong>
  <div>{{ moneyFormat.format(detailsAbonnement?.montant) }} Fcfa</div>

  <!-- <div>
    <small>Profil de base :</small>
    <div>
<span
        class="badge me-1"
      >
        {{ detailsAbonnement?.abonement?.categorie?.categorie }}
      </span>
    </div>
    
  </div> -->
</div>

          <div class="col-md-6 mb-3">
            <strong>Moyen de paiement :</strong>
            <div>{{detailsAbonnement?.moyen_paiement}}</div>
          </div>
        </div>
         <div class="row mb-3">
          <div class="col-md-6 mb-3">
            <strong>Profil de base :</strong>
            <div>
       <span class="badge bg-warning">
        {{ detailsAbonnement?.abonement?.categorie?.categorie }}
      </span>
       </div>
          </div>
         </div>

        <div class="row mb-3">

          <div class="col-md-6 mb-3">
            <strong>Date de paiement :</strong>
            <div>{{ configUtils.getFormatDateFr(detailsAbonnement?.created_at) }}</div>
          </div>

          <div class="col-md-6 mb-3">
            <strong>Fin de l'abonnement :</strong>
            <div>{{ detailsAbonnement?.echeance }}</div>
          </div>
        </div>
         <div class="row mb-3">
         <div class="col-md-6 mb-3">
            <strong>Référence de la transaction :</strong>
            <div>{{ detailsAbonnement?.transaction_id }}</div>
          </div>
         </div>
         <div v-if="detailsAbonnement?.add_profil_hybrides?.length" class="mt-2">
  <h5>Profils hybrides inclus :</h5>
  <div class="table-container mt-2">
  <table class="profil-hybride-table" style="width: 100%;">
    <thead style="border: 2px solid #dee2e6; border-bottom: none;">
      <tr style="background: linear-gradient(135deg, #495057, #6c757d);">
        <th style="
          color: white; 
          padding: 16px 12px; 
          font-weight: 600; 
          border-right: 1px solid rgba(255,255,255,0.2);
          text-align: left;
        ">Date de paiement</th>
        <th style="
          color: white; 
          padding: 16px 12px; 
          font-weight: 600; 
          border-right: 1px solid rgba(255,255,255,0.2);
          text-align: left;
        ">Profil</th>
        <th style="
          color: white; 
          padding: 16px 12px; 
          font-weight: 600; 
          border-right: 1px solid rgba(255,255,255,0.2);
          text-align: left;
        ">Moyen de paiement</th>
        <!-- <th style="
          color: white; 
          padding: 16px 12px; 
          font-weight: 600; 
          border-right: 1px solid rgba(255,255,255,0.2);
          text-align: left;
        ">Mode de paiement</th> -->
        <th style="
          color: white; 
          padding: 16px 12px; 
          font-weight: 600; 
          border-right: 1px solid rgba(255,255,255,0.2);
          text-align: right;
        ">Montant (Fcfa)</th>
        <th style="
          color: white; 
          padding: 16px 12px; 
          font-weight: 600; 
          text-align: right;
        ">Référence</th>
      </tr>
    </thead>
    <tbody style="border: 2px solid #dee2e6; border-top: none;">
      <tr v-for="(item, index) in detailsAbonnement.add_profil_hybrides" :key="index"
          style="border-bottom: 1px solid #e9ecef;">
          <td style="padding: 10px;text-align: center;">
          <span>
            {{ new Date(item.created_at).toLocaleDateString('fr') }}
          </span>
        </td>
        <td style="padding: 10px;text-align: center;">
          <span class="badge bg-warning">
            {{ item.profil_hybride_add?.statut || 'N/A' }}
          </span>
        </td>
        <td style="padding: 10px;text-align: center;">{{ item.moyen_paiement || 'Non spécifié' }}</td>
        <!-- <td style="padding: 10px;text-align: center;">{{ item.mode_paiement || 'Non spécifié' }}</td> -->
        <td style="padding: 10px;text-align: center; text-align: right; font-weight: 600; color: #198754;">
          {{ item.montant ? item.montant + ' FCFA' : '0 FCFA' }}
        </td>
        <td style="padding: 10px;text-align: center; text-align: right;">
          {{ item.transaction_id || '-' }}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
      </div>
    </div>

  </div>

</n-modal>
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
      <template #empty>
    <div class="text-center" style="padding:2em;font-weight:bold;">
      Aucune donnée disponible
    </div>
  </template>
        <template #paginatorstart>
          <div
            style="
              display: flex;
              justify-content: flex-start;
              font-size: 1em;
              border: none;
            "
          >
            {{ texte1 }} {{ list_abonnement.length }} {{ texte3 }}
          </div>
        </template>

        <template #header>
          <div class="conteneur_search" style="display: flex; align-items: center">
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
                style="width: 300px; font-size: 1.2em; border: 2px solid orange"
                v-model="filters['global'].value"
                :placeholder="texte9"
              />
            </IconField>
          </div>
        </template>

        <Column
          style="font-size: 1.3em; padding: 1em; text-align: center"
          field="created_at"
          :header="texte10"
        >
          <template #body="slotProps">
            <span>{{ configUtils.getFormatDateFr(slotProps.data.created_at) }}</span>
          </template>
        </Column>
        <!-- <Column
          style="font-size: 1.3em; padding: 1em; text-align: center"
          field="created_at"
          :header="'Moyen de paiement'"
        >
          <template #body="slotProps">
            <span>{{ slotProps.data.moyen_paiement }}</span>
          </template>
        </Column> -->

        <Column
          style="font-size: 1.3em; padding: 1em; text-align: center"
          field="abonement.libelle"
          :header="texte4"
        />
        <!-- <Column
          style="font-size: 1.3em; padding: 1em; text-align: center"
          field="montant"
          :header="texte5"
        /> -->
        <Column
          style="font-size: 1.3em; padding: 1em; text-align: center"
          field="echeance"
          :header="texte6"
        />
        <Column
          style="font-size: 1.3em; padding: 1em; text-align: center"
          field="statut"
          :header="texte7"
        >
          <template #body="slotProps">
            <span
              class="px-2"
              :class="slotProps.data.statut === 'success' ? 'bg-success' : 'bg-danger'"
            >
              {{ STATUTABONNEMENT[slotProps.data.statut] }}
            </span>
          </template>
        </Column>
         <Column
          style="font-size: 1.3em; padding: 1em; text-align: center"
          field="statut"
          :header="'Détail'"
        >
          <template #body="slotProps">
            <i class="bi bi-eye" style="cursor: pointer;" @click="handleDetailAbonnement(slotProps.data)"></i> 
          </template>
        </Column>
      </DataTable>

      <!-- ✅ Mobile -->
      <div v-else style="padding: 1em">
        <div class="card-footer my-3">
            <button class="btn bg-warning" @click="handleNouvelAbonnement">
              {{ texte2 }}
            </button>
          </div>
        <div v-for="item in list_abonnement" :key="item.id" class="abonnement-card">
          <div class="card-header">
            <span>{{ configUtils.getFormatDateFr(item.created_at) }}</span>
            <span
              :class="['px-2', item.statut === 'success' ? 'bg-success' : 'bg-danger']"
            >
              {{ STATUTABONNEMENT[item.statut] }}
            </span>
          </div>
          <div class="card-body">
            <p>
              <strong>{{ texte4 }} :</strong> {{ item.abonement.libelle }}
            </p>
            <p>
              <strong>{{ texte5 }} :</strong> {{ item.montant }}
            </p>
            <p>
              <strong>{{ texte6 }} :</strong> {{ item.echeance }}
            </p>
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
import { Help } from "../utils";
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
      Help:Help,
      texte10: "",
      configUtils,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      STATUTABONNEMENT,
      showModalDetailAbonnement:false,
      detailsAbonnement:null,
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
    async verifUserProfilEtudiantComplet() {
      await this.$store.dispatch("getInfoUser")
  const user = this.$store.state.infoUserConnected;
  // console.log("USER_INFO",user)
  if(user.user?.statuses.some(s => s.statut === 'Etudiant')){
if (!user.competences.length || !user.qualifications.length) {
    this.$router.push('/dashboard/profil');
   }
   if(!user.jours.length){
    this.$router.push('/dashboard/emploi_du_temps');
   }
  }
},
handleDetailAbonnement(payload){
  this.detailsAbonnement = payload;
  console.log("handleDetailAbonnement",payload)
  this.showModalDetailAbonnement=true
}
  },
  async created() {
    this.verifUserProfilEtudiantComplet();
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
  background: #25535f;
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 1em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: white;
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
