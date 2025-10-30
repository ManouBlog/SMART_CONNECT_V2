<template>
  <div class="job-card" :class="{ available: job.isAvailable }">
    <div class="job-date">
      <div class="period">{{ job.date }}</div>
      <div class="location">{{ job.location }}</div>
    </div>

    <div class="job-info">
      <h3>{{ job.title }}</h3>
      <p>{{ job.entreprise }}</p>
    </div>

    <button class="apply-btn" :disabled="!job.isAvailable" @click="showModal = true">
      {{ job.isAvailable ? "Voir" : "Indisponible" }}
    </button>
  </div>
  <div>
    <!-- Modal de certification -->
    <n-modal v-model:show="showModal" preset="card" size="large">
      <template #header>
        <div class="modal-header">
          <h3>Certification de travail</h3>
        </div>
      </template>

       <div class="certificat-container" id="certification-content">
    <header class="header">
      <div class="logo-placeholder">
        <!-- Emplacement pour le logo -->
        <p>Insérer votre Logo ici</p>
      </div>
    </header>

    <main class="certificat-content">
      <h1 class="title">CERTIFICAT DE TRAVAIL</h1>

      <div class="certificat-text">
        <p>
          Nous soussignés, <strong>[Raison Sociale]</strong> (XX BP XXXXXXXX), certifions que Monsieur/Madame
          <strong>[Nom de l'étudiant]</strong>, a été employé dans notre société en qualité de
          <strong>[Intitulé de la position ou poste]</strong> du <strong>[JJ/MM/YYYY]</strong> au <strong>[JJ/MM/YYYY]</strong>.
        </p>

        <p>
          Il nous quitte ce jour, libre de tout engagement.
        </p>

        <p>
          En foi de quoi, nous lui délivrons ce présent certificat de travail, pour servir et valoir ce que de droit.
        </p>

        <div class="date-location">
          <p>Fait à <strong>[Ville]</strong>, le <strong>[JJ/MM/YYYY]</strong></p>
        </div>

        <div class="signature">
          <p>Le Représentant Légal</p>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-left">
        <p style="color:orange">Powered by LA LOCOMOTIVE (LCE)</p>
      </div>
      <div class="footer-right">
         <img style="width:80px;height:80px;" src="../../../assets/brobroli_1.png" alt="Photo" />
      </div>
    </footer>
  </div>
      <template #footer>
        <div class="modal-footer">
          <n-button @click="showModal = false" tertiary>Fermer</n-button>
          <n-button type="primary" @click="downloadCertification"> Télécharger </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, defineProps} from "vue";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
const SPINNERLOADING = useLoadingSpinner();
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});
const showModal = ref(false);

// Date du jour formatée
// const todayDate = computed(() => {
//   const date = new Date();
//   return date.toLocaleDateString("fr-FR", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// });
const downloadCertification = async () => {
SPINNERLOADING.launchLoading(true)
  const cvContent = document.getElementById("certification-content");
  console.log("cvContent",cvContent)
  if (!cvContent) return;

  // capture du DOM
  const canvas = await html2canvas(cvContent, {
    scale: 2,
    useCORS: true, // autoriser CORS
    allowTaint: true, // autoriser rendu d’images cross-domain
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // calcul de dimensions de l’image pour garder le ratio
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // première page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // ajouter les pages si nécessaire
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  // téléchargement
  pdf.save(`CV_${props.job.title.replace(/\s+/g, "_")}.pdf`);
  SPINNERLOADING.launchLoading(false)
};
</script>

<style scoped>
.job-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.job-card.available {
  border-left: 5px solid orange;
}

.job-date {
  background: #f0f4f8;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
}

.job-date .period {
  font-weight: 600;
}

.job-date .location {
  color: #555;
  font-size: 13px;
  margin-top: 4px;
}

.job-info h3 {
  margin: 0;
  font-size: 17px;
  color: #222;
}

.job-info p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #666;
}

.apply-btn {
  background: orange;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
  align-self: flex-start;
}

.apply-btn:hover {
  background: rgba(255, 166, 0, 0.812);
}

.apply-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}




.certificat-container {
  width: 95vw;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  padding: 2vw;
  box-sizing: border-box;
}
.certificat-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url('/icon_brobroli.png') center center no-repeat;
  background-size: 250px auto;
  opacity: 0.09; /* faible opacité, effet filigrane */
  z-index: 0;
}

.certificat-container * {
  position: relative;
  z-index: 1;
}

.header {
  text-align: center;
}

.logo-placeholder {
  font-size: 0.8rem;
}

.title {
  text-align: center;
  font-size: clamp(1.2rem, 5vw, 1.5rem);
  font-weight: bold;
}

.certificat-text {
  line-height: 1.6;
  font-size: clamp(0.9rem, 4vw, 1rem);
}


.date-location {
  margin-top: 1vw;
  text-align: center;
}
.date-location p {
  text-align: right;
}

.signature {
  margin-top: 1vw;
  text-align: center;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1vw;
  padding-top: 3vw;
  border-top: 1px solid #ccc;
  font-size: clamp(0.7rem, 3vw, 0.9rem);
}

.footer-left,
.footer-right {
  text-align: center;
}
@media print {
  .certificat-container {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 5px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  body {
    margin: 0;
    padding: 0;
  }
}

/* Media Queries pour les très petits écrans */
@media (max-width: 480px) {
  .certificat-container {
    padding: 10vw 5vw;
  }

  .footer {
    flex-direction: column;
    gap: 2vw;
  }
}

/* --- Version mobile --- */
@media (max-width: 600px) {
  .job-card {
    padding: 12px;
  }

  .job-info h3 {
    font-size: 15px;
  }

  .job-info p,
  .job-date {
    font-size: 13px;
  }

  .apply-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
