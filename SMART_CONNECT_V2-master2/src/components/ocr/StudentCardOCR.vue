<template>
  <div class="ocr-container">
    <h2>Vérification carte étudiant</h2>

    <a-form 
    layout="vertical"  
    :validateMessages="{
    required: 'Ce champ est obligatoire'
    }" 
    :model="fileList">
      <a-form-item
        name="fileList"
        label="Ajouter une image de la carte étudiant (jpg, png)"
        :rules="[{ required: true, message: 'Ajoute une image' }]"
      >
        <a-upload
          v-model:fileList="fileList"
          :beforeUpload="() => false"
          :maxCount="1"
          accept="image/*"
          @change="onUploadChange"
        >
          <a-button>Cliquer pour charger</a-button>
        </a-upload>
      </a-form-item>
    </a-form>

    <a-spin v-if="loading" />

    <!-- <pre v-if="rawText">
{{ rawText }}
    </pre> -->

    <div v-if="result && !loading">
      <h3>Résultat</h3>
      <p>Score : {{ result.score }}%</p>
      <p>
        Verdict :
        <strong :style="{ color: result.isStudentCard ? 'green' : 'red' }">
          {{ result.isStudentCard ? 'Carte étudiant probable' : 'Non reconnu' }}
        </strong>
      </p>
      <p v-if="result.reason">{{ result.reason }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import Tesseract from 'tesseract.js'

/* =====================
   CONSTANTES MÉTIER
===================== */

const SCHOOL_KEYWORDS = [
  // Carte étudiante (formes tolérantes OCR)
  'carte etudiant',
  'carte d etudiant',
  'carte a etudiant',
  'carte etudiante',

  // Étudiant (avec ou sans accents, fautes OCR)
  'etudiant',
  'etudiante',
  'etudant',
  'etud',

  // Institution / enseignement
  'ministere de l enseignement',
  "ministere de l'enseignement",
  'enseignement superieur',
  'ufr',
  'faculte',
  'faculté',
  'ecole',
  'institut',

  // Scolarité
  'filiere',
  'filiere',
  'niveau',
  'licence',
  'master',
  'doctorat',

  // Niveaux courts (attention : à combiner avec d’autres mots)
  'l1',
  'l2',
  'l3',
  'm1',
  'm2',

  // Identifiant
  'matricule'
]



/* =====================
   STATE
===================== */

const fileList = ref([])
const loading = ref(false)
const rawText = ref('')
const result = ref(null)
/* =====================
   HANDLERS UI
===================== */

function onUploadChange({ fileList: newList }) {
  fileList.value = newList

  if (!newList.length) return

  rawText.value = ''
  result.value = null

  runOCR(newList)
}

/* =====================
   OCR – PRÉTRAITEMENT
===================== */

function preprocessImage(file) {
  return new Promise(resolve => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = () => (img.src = reader.result)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = img.width
      canvas.height = img.height

      ctx.filter = 'grayscale(1) contrast(1.5)'
      ctx.drawImage(img, 0, 0)

      resolve(canvas)
    }

    reader.readAsDataURL(file)
  })
}

/* =====================
   OCR – PIPELINE
===================== */

async function runOCR(files) {
  loading.value = true
  let fullText = ''

  for (const f of files) {
    const file = f.originFileObj
    if (!file || !file.type.startsWith('image/')) continue

    const canvas = await preprocessImage(file)
    const { data } = await Tesseract.recognize(canvas, 'fra')
    fullText += '\n' + (data.text || '')
  }

  rawText.value = cleanOCRText(fullText)

  if (!hasReadableText(fullText)) {
    result.value = {
      score: 0,
      isStudentCard: false,
      reason: 'Aucun texte exploitable détecté'
    }
    loading.value = false
    return
  }

  analyzeText(fullText)
  loading.value = false
}

/* =====================
   VALIDATION TEXTE
===================== */

function hasReadableText(text) {
  const lettersOnly = text
    .replace(/\s/g, '')
    .replace(/[^a-zA-ZÀ-ÿ]/g, '')

  return lettersOnly.length >= 5
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')              // enlève les accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')  // ponctuation OCR bizarre
    .replace(/\s+/g, ' ')
}

/* =====================
   ANALYSE MÉTIER
===================== */

// function hasSchool(text) {
//   const newText = text.toLowerCase()
// const normalized = normalizeText(newText)
//   const hasSchoolKeyword = SCHOOL_KEYWORDS.some(keyword =>
//     normalized.includes(keyword)
//   )

//   return hasSchoolKeyword;
// }


// function hasNamePattern(text) {
//   return text
//     .split('\n')
//     .some(line => {
//       const words = line.trim().split(' ')
//       return words.length >= 2 && words.every(w => w.length > 2)
//     })
// }

function cleanOCRText(text) {
  return text
    // supprimer caractères parasites fréquents OCR
    .replace(/[|«»“”]/g, '')
    .replace(/_{2,}/g, ' ')
    .replace(/-{2,}/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim()
}


function analyzeText(text) {
  const cleanText = normalizeText(text)
  let score = 0

  if (cleanText.length > 80) score += 20

  const keywordHits = SCHOOL_KEYWORDS.filter(k =>
    cleanText.includes(k)
  ).length

  score += Math.min(keywordHits * 10, 40)

  if (cleanText.includes('matricule')) score += 20
  if (cleanText.match(/\b(l[123]|m[12])\b/)) score += 10

  result.value = {
    score,
    isStudentCard: score >= 60
  }
}

</script>

<style scoped>
.ocr-container {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}

pre {
  background: #f4f4f4;
  padding: 1rem;
  white-space: pre-wrap;
}
</style>
