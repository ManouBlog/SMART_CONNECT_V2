<template>
  <HeaderDashboard TitleHeader="Certificat" />
  <div v-if="job">
     <div class="certificat-container" id="certification-content">
    <header class="header" v-if="job?.image_data">
      <div class="logo-placeholder">
        <img
          style="width: 80px; height: 80px"
          :src="job?.image_data"
          :alt="job?.image_data"
        />
      </div>
    </header>

    <main class="certificat-content">
      <div>
        <h1 class="title">CERTIFICAT DE TRAVAIL</h1>
        <div class="certificat-text">
          <p>
            Nous soussignés, <strong>{{ job?.offre?.entreprise?.nom }}</strong>
            <strong v-if="job?.offre?.entreprise?.adresse_postale">{{
              job?.offre?.entreprise?.adresse_postale
            }}</strong>
            , certifions que Monsieur/Madame
            <strong>{{ job?.student?.nom }} {{ job?.student?.prenoms }}</strong
            >, a été employé dans notre société en qualité de
            <strong>{{ job?.offre?.nom_offre }}</strong> du
            <strong>{{
              new Date(job?.offre?.job_debut).toLocaleDateString("fr")
            }}</strong>
            au
            <strong>{{ new Date(job?.offre?.job_fin).toLocaleDateString("fr") }}</strong
            >.
          </p>

          <p>Il nous quitte ce jour, libre de tout engagement.</p>

          <p>
            En foi de quoi, nous lui délivrons ce présent certificat de travail, pour
            servir et valoir ce que de droit.
          </p>

          <div class="date-location">
            <p>
              Fait à <strong>ABIDJAN</strong>, le <strong>{{ todayDate }}</strong>
            </p>
          </div>

          <div class="signature">
            <p style="text-align: right">Le Représentant Légal</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-left">
        <p style="color: orange">Powered by LA LOCOMOTIVE (LCE)</p>
      </div>
      <div class="footer-right">
        <img style="width: 200px; height: 60px" src="/logo_lce.png" alt="Photo" />
      </div>
    </footer>
    
  </div>
  <div class="modal-footer">
      <!-- <n-button @click="showModal = false" tertiary>Fermer</n-button> -->
      <n-button type="primary" style="margin: 0 1em" @click="downloadCertification">
        Télécharger
      </n-button>
    </div>
  </div>
  <div style="text-align:center;" v-if="isChargement && !job">
    <h2>Chargement...</h2>
  </div>
  <div style="text-align:center;" v-if="!isChargement && !job">
    <h2>Pas de certificat</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import instance from "../api/api";
import HeaderDashboard from "../Shared/Compoments/HeaderDashboard.vue";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
const SPINNERLOADING = useLoadingSpinner();
const route = useRoute();
const job = ref(null);
const isChargement = ref(true);
// Récupérer le paramètre "id"
const idParams = route.params.id;
// Date du jour formatée
const todayDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

const downloadCertification = async () => {
  SPINNERLOADING.launchLoading(true);
  const cvContent = document.getElementById("certification-content");
  // console.log("cvContent", cvContent);
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
  pdf.save(`CV_${job?.value.offre?.nom_offre.replace(/\s+/g, "_")}.pdf`);
  SPINNERLOADING.launchLoading(false);
};

const getCertificationsStudentConnecte = async () => {
  SPINNERLOADING.launchLoading(true);
  await instance
    .get("mes-certifications")
    .then((response) => {
      // console.log("getCertificationsStudentConnecte", response);
      job.value = response.data.find((item) => Number(item.offre_id) === Number(idParams));
      // console.log("job.value",job.value)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      SPINNERLOADING.launchLoading(false);
      isChargement.value = false
    })
};

onMounted(() => {
  getCertificationsStudentConnecte();
});
</script>

<style scoped>
.events-section {
  max-width: 100%;
  margin: 0 10px;
}

.events-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
}


.certificat-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* ou la hauteur que vous souhaitez */
  margin: 0;
}
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
:deep(.n-card){
  width:90% !important;
}

.apply-btn:hover {
  background: rgba(255, 166, 0, 0.812);
}

.apply-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.certificat-container {
  position: relative; /* important pour que ::before soit positionné par rapport à ce conteneur */
  width: 100vw;
  max-width: 900px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 1vw;
  box-sizing: border-box;
  z-index: 1; /* le contenu reste au-dessus du ::before */
}

.certificat-container::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 250px;
  transform: translate(-50%, -50%); /* centre parfaitement l’image */
  background: url('/brobroli_icon.png') center center no-repeat;
  background-size: contain;
  opacity: 0.1; /* effet filigrane discret */
  z-index: 0;
  pointer-events: none; /* évite de bloquer les clics */
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
  display: flex;
  justify-content: flex-start;
}

.title {
  text-align: center;
  margin:0 2vw;
  font-size: clamp(1.2rem, 5vw, 1.5rem);
  font-weight: bold;
}

.certificat-text {
  line-height: 1.6;
   margin-top:2vw;
  font-size: clamp(0.9rem, 4vw, 1rem);
}
.certificat-text p {
 margin-top:5vw;
}

.date-location {
  margin-top: 2vw;
  text-align: center;
}
.date-location p {
  text-align: right;
}

.signature {
  margin-top: 2vw;
  text-align: center;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5vw;
  padding-top: 1vw;
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
