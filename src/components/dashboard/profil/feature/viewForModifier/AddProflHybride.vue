<script>
import instance from '../../../../../api/api';
import Abonnements from '../../../../../views/Abonnements/Abonnements.vue';
import { useAbonnementsStore } from '../../../../../store-pinia/Abonnements/useAbonnementsStore';
import { mapActions } from 'pinia';
export default {
  name: 'AddProflHybride',
  components: {
    Abonnements
  },
  props: {
    ProfilsUser: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      isLoading: true,
      choiceProfilHybrideForAdd: [],
      allProfilsHybrides: [],
      profilhybrideUserConnected: [],
      showModalChangeProfilOfBase: false,
      showModalAbonnements: false,
      selectedParseStatus: "",
      showModalAddProfilHybride: false,
      StatutArtisans: [
        // { value: "Maitre Artisan", label: "Maitre Artisan" },
        { value: "Artisan", label: "Artisan" }
      ],
      niveauxEtudes: [
        // Aucun / base
        { value: "aucun", label: "Aucun niveau" },

        // Primaire
        { value: "cepe", label: "CEPE (Certificat d'Études Primaires et Élémentaires)" },

        // Collège
        { value: "6eme", label: "6ème" },
        { value: "5eme", label: "5ème" },
        { value: "4eme", label: "4ème" },
        { value: "3eme", label: "3ème" },
        { value: "bepc", label: "BEPC (Brevet d'Études du Premier Cycle)" },

        // Lycée
        { value: "2nde", label: "Seconde" },
        { value: "1ere", label: "Première" },
        { value: "terminale", label: "Terminale" },
        { value: "bac", label: "BAC" },

        // Professionnel / technique
        { value: "cap", label: "CAP (Certificat d'Aptitude Professionnelle)" },
        { value: "cqp", label: "CQP (Certificat de Qualification Professionnelle)" },
        { value: "bt", label: "BT (Brevet de Technicien)" },
        { value: "bp", label: "BP (Brevet Professionnel)" },
        { value: "bep", label: "BEP (Brevet d'Études Professionnelles)" },
        { value: "bts", label: "BTS (Brevet de Technicien Supérieur)" },
        { value: "dut", label: "DUT (Diplôme Universitaire de Technologie)" },
        { value: "licence_pro", label: "Licence professionnelle" },
        { value: "ingenieur", label: "Diplôme d'ingénieur" },

        // Supérieur général
        { value: "bac+1", label: "BAC+1" },
        { value: "bac+2", label: "BAC+2" },
        { value: "bac+3", label: "BAC+3 (Licence)" },
        { value: "bac+4", label: "BAC+4 (Maîtrise)" },
        { value: "bac+5", label: "BAC+5 (Master)" },
        { value: "bac+6", label: "BAC+6" },
        { value: "bac+7", label: "BAC+7" },
        { value: "doctorat", label: "Doctorat (BAC+8 et plus)" },
      ],
      formData: {
        niveauEtude: "",
        ville: "",
        quartier: "",
        commune: "",
        statut_professionnel_artisan: "Artisan",
        cni_carte: null,
        file: null
      },
      rules: {
        // Champs Artisan
        niveauEtude: [
          {
            required: true,
            message: "Veuillez choisir un niveau d'étude",
            type: "string",
            trigger: "change",
          },
        ],
        // Champs Particulier
        ville: [
          {
            required: true,
            message: "Veuillez entrer une ville",
            trigger: "blur",
          },
        ],
        quartier: [
          {
            required: true,
            message: "Veuillez entrer un quartier",
            trigger: "blur",
          },
        ],
        commune: [
          {
            required: true,
            message: "Veuillez entrer une commune",
            trigger: "blur",
          },
        ],
        // Fichier
        file: [
          {
            required: true,
            validator: (_, value) => {
              if (!value) {
                return Promise.reject("Veuillez Ajouter votre CNI");
              }
              return Promise.resolve();
            },
            trigger: "change",
          },
        ],
      },
      optionsAnswer: null,
      selectedStatus: "",
      profilHybride: [],
      allStatuses: [],
      descriptionProfil: {
        Etudiant: "Tu as les compétences. Nous avons les clients. Postule aux missions disponibles partout en CI . Tu es payé sur le digital dès la première mission validée. Zéro agence. Zéro intermédiaire.",
        Artisan: "Ton métier mérite des clients sérieux. Publie tes compétences, reçois des missions partout. Tu arrives. C'est fait. Le client paye.",
        Particulier: "Trouvez un prestataire vérifié par d'autres particuliers. Paiement digital uniquement si le travail est fait. Zéro risque",
        Professionnel: "Votre expertise mérite d'être trouvée par les bonnes entreprises. Accédez aux mandats disponibles partout en CI, candidatez directement et recevez votre paiement digitalisé après chaque mission.",
        Vétéran: "Votre parcours est rare. Les organisations qui cherchent une expertise comme la vôtre sont sur MonBrobroli. Accédez aux mandats stratégiques, entrez en contact direct avec les décideurs et recevez votre paiement après chaque mandat. Votre expérience a enfin la plateforme qu'elle mérite.",
      }
    }
  },
  computed: {
    hasArtisanProfil() {
      return this.choiceProfilHybrideForAdd.some((item) =>
        item.statut?.includes("Artisan")
      );
    },
    hasParticulierProfil() {
      return this.choiceProfilHybrideForAdd.some((item) =>
        item.statut?.includes("Particulier")
      );
    },
    filteredProfilsHybrides() {
      const userStatut = this.ProfilsUser?.user?.statut.statut;

      const result = (this.allProfilsHybrides || []).filter(
        item =>
          item.statut !== userStatut &&
          !(this.profilhybrideUserConnected || []).some(
            profil => profil.statut === item.statut
          )
      );

      return result.length ? result : [];
    }
  },
  watch: {
    choiceProfilHybrideForAdd: {
      handler(newValue) {
        const hasArtisan = (newValue || []).some(
          item => item.statut === "Artisan"
        );

        if (!hasArtisan) {
          this.formData.statut_professionnel_artisan = '';
          this.formData.niveauEtude = ""
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions(useAbonnementsStore, ['handleChangeInfoForAbonnement', 'handleHybrideAddProfil']),
    handleFileChange(info) {
      const files = Array.from(info.target.files)[0];
      // console.log("file info",info)
      this.formData.cni_carte = files;
    },
    async validateAndSubmit() {
      try {
        // console.log("Validation réussie, données du formulaire :", this.formData);
        this.handleChangeInfoForAbonnement(this.formData)
        // console.log("Profil hybride choisi pour ajout :", this.choiceProfilHybrideForAdd);
        this.handleHybrideAddProfil(this.choiceProfilHybrideForAdd)
        this.showModalAbonnements = true;
      } catch (error) {
        console.log(error);
      }
    },
    async lister_statut() {


      try {
        const response = await instance.get("listStatut");

        this.allProfilsHybrides = response.data.data.filter(item => item.statut === 'Particulier' || item.statut === 'Artisan');
        this.profilhybrideUserConnected = this.ProfilsUser.user?.statuses.filter(item => item.statut !== this.ProfilsUser.user?.statut?.statut);

      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async created() {
    await this.lister_statut();
  },
}
</script>
<template>
  <section>
    <n-modal style="width:80%; 
   height: 600px;
   
    overflow-y: auto; 
    max-height: 80vh;" :closable="false" v-model:show="showModalAbonnements">
      <template #header>
        <div class="modal-header">
          <h3>Abonnement</h3>
        </div>
      </template>
      <div style="background-color: white;">
        <!-- <p>profilUser23 :{{ this.ProfilsUser.statut_talent}}</p> -->
        <Abonnements :ProfilAbonnement="this.ProfilsUser.user?.statut?.statut"
          :statut_talent_choice="this.ProfilsUser?.statut_talent" />
      </div>
    </n-modal>
    <div v-if="isLoading">
      <p class="shimmer-text" style="text-align:center;padding:2em;">Chargement...</p>
    </div>
    <div v-if="!isLoading">
      <label style="color: rgba(0, 0, 0, 0.88); font-size: 14px;">
        Profils hybrides
      </label>
      <div v-if="ProfilsUser.user?.statut?.statut !== 'Entreprise'">
        <div class="round-container" v-if='filteredProfilsHybrides.length'>
          <label v-for="item in filteredProfilsHybrides" :key="item.id" class="round-item">
            <input type="checkbox" :value="item" v-model="choiceProfilHybrideForAdd" />

            <span class="round-label">
              {{ item.statut }}
            </span>
          </label>
        </div>

        <div v-else style="text-align: center;">Pas de profils trouvés</div>
      </div>
      <div v-if="ProfilsUser.user?.statut?.statut === 'Entreprise'">
        <div class="round-container" v-if='filteredProfilsHybrides.filter(item => item.statut == "Artisan").length'>

          <label v-for="item in filteredProfilsHybrides.filter(item => item.statut == 'Artisan')" :key="item.id"
            class="round-item">
            <input type="checkbox" :value="item" v-model="choiceProfilHybrideForAdd" />

            <span class="round-label">
              {{ item.statut }}
            </span>
          </label>
        </div>
        <div v-else style="text-align: center;">Pas de profils trouvés</div>
      </div>

    </div>

    <div v-if="choiceProfilHybrideForAdd.length">
      <a-form ref="formRef" layout="vertical" :model="formData" :rules="rules">

        <!-- Particulier -->
        <a-row :gutter="[16, 24]">
          <a-col :xs="24" :md="12" v-if="hasArtisanProfil && !ProfilsUser.niveauEtude">
            <a-form-item label="Niveau d'étude" name="niveauEtude">
              <a-select v-model:value="formData.niveauEtude" placeholder="Sélectionnez votre niveau d’étude" show-search
                option-filter-prop="label">
                <a-select-option v-for="item in niveauxEtudes" :key="item.value" :value="item.value"
                  :label="item.label">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :xs="24" :md="12" v-if="hasArtisanProfil">
            <a-form-item label="Statut professionnel artisan" name="statut_professionnel_artisan">
              <a-select style="width: 100%;" v-model:value="formData.statut_professionnel_artisan"
                placeholder="Sélectionnez votre Statut professionnel" show-search option-filter-prop="label">
                <a-select-option v-for="item in StatutArtisans" :key="item.value" :value="item.value"
                  :label="item.label">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col :xs="24" :md="12" v-if="hasParticulierProfil && !ProfilsUser.ville">
            <a-form-item label="Ville" name="ville">
              <a-input v-model:value="formData.ville" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" v-if="hasParticulierProfil && !ProfilsUser.quartier">
            <a-form-item label="Quartier" name="quartier">
              <a-input v-model:value="formData.quartier" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" v-if="hasParticulierProfil && !ProfilsUser.commune">
            <a-form-item label="Commune" name="commune">
              <a-input v-model:value="formData.commune" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12"
            v-if="!ProfilsUser.user.photos.some(item => item.path.includes('cni') || item.path.includes('CNI'))">
            <a-form-item label="Ajouter votre CNI (carte nationale d'identité)" name="file">
              <div>
                <input ref="fileInput" 
                type="file" 
                accept="image/*" 
                :multiple="false" 
                @change="handleFileChange" />

              </div>

            </a-form-item>

          </a-col>

        </a-row>
        <a-form-item>
          <a-button type="primary" @click="validateAndSubmit">
            Ajouter
          </a-button>
        </a-form-item>

      </a-form>
    </div>
  </section>
</template>
<style scoped>
.input-disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
  filter: grayscale(100%);
}

.shimmer-text {
  font-weight: 600;
  background: linear-gradient(90deg,
      #999 0%,
      #fff 50%,
      #999 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>