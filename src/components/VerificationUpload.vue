<template>
  <div class="container p-3 border rounded bg-light">
    <a-form :layout="'vertical'">
      <!-- Sélect profil (Ant Design) -->
      <a-form-item label="Sélectionnez votre profil">
        <a-select v-model="selectedProfil" placeholder="Choisir un profil" @change="onProfilChange">
          <a-select-option v-for="(label, key) in profils" :key="key" :value="key">
            {{ label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <!-- Upload document -->
      <a-form-item v-if="config.label" :label="config.label">
        <input 
          type="file" 
          class="form-control" 
          :accept="config.accepted.join(',')"
          @change="handleFileChange"
        />
        <small class="form-text text-muted">{{ config.description }}</small>
      </a-form-item>

      <!-- Aperçu du fichier -->
      <div v-if="fileName" class="mt-2">
        <span class="badge bg-primary">
          <i class="bi bi-file-earmark-fill me-1"></i> {{ fileName }}
        </span>
      </div>

      <!-- Bouton soumettre -->
      <a-form-item class="mt-3">
        <button class="btn btn-success" :disabled="!file || !selectedProfil" @click="submitRequest">
          Soumettre la demande
        </button>
      </a-form-item>

      <!-- Statut -->
      <div v-if="status" class="mt-2">
        <span 
          class="badge" 
          :class="statusClass"
        >
          <i v-if="status === 'approved'" class="bi bi-patch-check-fill me-1"></i>
          {{ statusMessage }}
        </span>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { message } from 'ant-design-vue';

const profils = {
  diplome: "Diplômé",
  consultant: "Consultant",
  artisan: "Artisan",
  veteran: "Veteran"
};

const verificationConfig = {
  diplome: {
    label: "Téléverser votre diplôme",
    accepted: ["pdf", "jpg", "png"],
    description: "Diplôme ou attestation de réussite"
  },
  consultant: {
    label: "Téléverser votre preuve d’expérience",
    accepted: ["pdf", "jpg", "png"],
    description: "Attestation de travail ou certification"
  },
  artisan: {
    label: "Téléverser votre CNI et certificat métier",
    accepted: ["pdf", "jpg", "png"],
    description: "Carte d’identité et document attestant votre activité"
  },
  veteran: {
    label: "Téléverser votre attestation officielle",
    accepted: ["pdf", "jpg", "png"],
    description: "Attestation de fonction ou lettre officielle"
  }
};

const selectedProfil = ref(null);
const file = ref(null);
const fileName = ref('');
const status = ref(''); // pending / approved / rejected

const config = computed(() => {
  return verificationConfig[selectedProfil.value] || {};
});

const onProfilChange = () => {
  file.value = null;
  fileName.value = '';
  status.value = '';
};

const handleFileChange = (event) => {
  if (event.target.files.length) {
    file.value = event.target.files[0];
    fileName.value = file.value.name;
  } else {
    file.value = null;
    fileName.value = '';
  }
};

const submitRequest = async () => {
  if (!file.value || !selectedProfil.value) {
    message.error("Veuillez sélectionner un profil et un fichier.");
    return;
  }

  // Simule l'upload
  status.value = 'pending';
  message.success("Demande soumise, en attente de validation.");

  // TODO: ici, POST vers ton API Laravel
  // axios.post('/api/verification-request', { type: selectedProfil.value, file: file.value })
  //   .then(res => status.value = 'under_review')
  //   .catch(err => message.error('Erreur lors de la soumission'));
};

const statusClass = computed(() => {
  switch (status.value) {
    case 'pending': return 'bg-warning text-dark';
    case 'under_review': return 'bg-info text-white';
    case 'approved': return 'bg-success text-white';
    case 'rejected': return 'bg-danger text-white';
    default: return 'bg-secondary text-white';
  }
});

const statusMessage = computed(() => {
  switch (status.value) {
    case 'pending': return 'En attente';
    case 'under_review': return 'En cours d’analyse';
    case 'approved': return 'Validé';
    case 'rejected': return 'Rejeté';
    default: return '';
  }
});
</script>

<style scoped>
.me-1 { margin-right: 0.25rem; }
</style>