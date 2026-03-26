<template>
  <div class="p-3 border rounded">
    <a-form layout="vertical">

      <!-- Upload document -->
      <a-form-item v-if="isValidProfil && config?.label" :label="config?.label">
        <input 
          type="file" 
          :accept="acceptString"
          @change="handleFileChange"
        />
        <small class="form-text text-muted">
          {{ config.description }}
        </small>
      </a-form-item>



      <!-- Aperçu fichier -->
      <div v-if="fileName" class="mt-2">
        <span class="badge bg-primary">
          <i class="bi bi-file-earmark-fill me-1"></i>
          {{ fileName }}
        </span>
      </div>

      <!-- Bouton -->
      <a-form-item class="mt-3">
        <button 
          type="button"
          class="btn btn-success"
          :disabled="!canSubmit"
          @click="submitRequest"
        >
          Soumettre la demande
        </button>
      </a-form-item>

      <!-- Statut -->
      <div v-if="status" class="mt-2">
        <span class="badge" :class="statusClass">
          <i v-if="status === 'approved'" class="bi bi-patch-check-fill me-1"></i>
          {{ statusMessage }}
        </span>
      </div>

    </a-form>
  </div>
</template>

<script setup>
import { computed, ref, defineProps, watch } from 'vue'
import { message } from 'ant-design-vue'

/**
 * PROPS
 */
const props = defineProps({
  userProfil: {
    type: String,
    required: true
  }
})

/**
 * CONFIG
 */
const verificationConfig = {
  professionnel: {
    label: "Téléverser votre diplôme",
    accepted: ["pdf", "jpg", "png"],
    description: "Diplôme ou attestation de réussite"
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
}

/**
 * STATE
 */
const file = ref(null)
const fileName = ref('')
const status = ref('') // pending, approved, rejected...

/**
 * COMPUTED
 */

// Vérifie si profil valide
const isValidProfil = computed(() => {
  console.log("props.userProfil",props.userProfil)
  return Object.keys(verificationConfig).includes(props.userProfil)
})

// Config dynamique
const config = computed(() => {
  return verificationConfig[props.userProfil] || {}
})

// Accept string pour input file
const acceptString = computed(() => {
  return config.value.accepted?.map(ext => `.${ext}`).join(',') || ''
})

// Peut soumettre ?
const canSubmit = computed(() => {
  return file.value && isValidProfil.value
})

// Classe statut
const statusClass = computed(() => {
  return {
    'bg-warning text-dark': status.value === 'pending',
    'bg-info text-white': status.value === 'under_review',
    'bg-success text-white': status.value === 'approved',
    'bg-danger text-white': status.value === 'rejected'
  }
})

// Texte statut
const statusMessage = computed(() => {
  const map = {
    pending: 'En attente',
    under_review: 'En cours d’analyse',
    approved: 'Validé',
    rejected: 'Rejeté'
  }
  return map[status.value] || ''
})

/**
 * METHODS
 */

// Gestion fichier
const handleFileChange = (event) => {
  const f = event.target.files[0]

  if (!f) {
    file.value = null
    fileName.value = ''
    return
  }

  // Validation extension
  const ext = f.name.split('.').pop().toLowerCase()
  if (!config.value.accepted.includes(ext)) {
    message.error("Format de fichier non autorisé")
    return
  }

  file.value = f
  fileName.value = f.name
}

// Submit
const submitRequest = async () => {
  if (!canSubmit.value) {
    message.error("Formulaire invalide")
    return
  }

  try {
    status.value = 'pending'

    // Simule API
    await new Promise(resolve => setTimeout(resolve, 1000))

    message.success("Demande envoyée avec succès")

    // Exemple Laravel
    // const formData = new FormData()
    // formData.append('type', props.userProfil)
    // formData.append('file', file.value)
    // await axios.post('/api/verification-request', formData)

  } catch (e) {
    message.error("Erreur lors de l'envoi")
  }
}

/**
 * WATCH (reset si profil change)
 */
watch(() => props.userProfil, () => {
  file.value = null
  fileName.value = ''
  status.value = ''
})
</script>