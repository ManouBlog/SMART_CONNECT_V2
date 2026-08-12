<template>
  <div class="cv-container">
    <div id="cv-content" class="cv-content">
      <!-- En-tête avec photo et infos personnelles -->
      <div class="header">
        <div class="photo-placeholder" v-if="photo">
          <img :src="photo" alt="Photo de profil" class="profile_photo" />
        </div>
        <div class="personal-info">
          <h1>{{ nom }}</h1>
        </div>
      </div>
      <!-- Coordonnées -->
      <div class="contact-info">
        <p><span class="icon">☎</span> {{ telephone }}</p>
        <p><span class="icon">✉</span> {{ email }}</p>
        <p><span class="icon">⚑</span> {{ nationalite }}</p>
      </div>

      <!-- Description -->
      <div class="section">
        <h4 style="text-transform: uppercase" v-if="titreCv">
          {{
            titreCv && titreCv != 'null' && isbtnPdf ? titreCv : description != 'null' ? "Profil" : null
          }}
        </h4>
        <p style="border-bottom: 3px solid black;padding-bottom:10px"
          v-if="description != null && description !== '' && description !== 'null'">{{ description }}</p>
      </div>
      <!-- Expériences professionnelles -->
      <div class="section" v-if="experiences.length">
        <h4>EXPÉRIENCES PROFESSIONNELLES</h4>
        
        <ul style="padding:0.5em 1em">
          <li v-for="(exp, i) in experiences" :key="i" style="padding:0.5em">
            <span style="font-weight:bold;" v-if="exp.periode">{{ exp.periode }} :</span> {{ exp.detail }}
          </li>
        </ul>

      </div>
      <!-- Compétences -->
      <div class="section" style="margin:1em 0;" v-if="competences.length">
        <h4>COMPÉTENCES</h4>
        <ul style="padding:1em">
          <li v-for="(c, i) in competences" :key="i">{{ c.comp }}</li>
        </ul>
      </div>

      <!-- Qualifications -->
      <div class="section" v-if="qualifications.length">
        <h4>QUALIFICATIONS</h4>
        <ul style="padding:1em">
          <li v-for="(q, i) in qualifications" :key="i">

            <span style="display:block;margin-bottom:0.5em"><span style="font-weight:bold;">{{ q.periode }}</span>: {{
              q.objet }}</span>
            <span style="display:block;margin-bottom:0.5em"
              v-if="q.detail !== null && q.detail !== '' && q.detail !== 'null'"><strong>Détail :</strong> {{ q.detail
              }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- Bouton de téléchargement -->
    <button @click="downloadCV" :disabled="isLoading" v-if="isbtnPdf" class="download-button">
      {{ isLoading ? "Téléchargement en cours..." : "Télécharger le CV" }}
    </button>
  </div>
</template>
<script setup>
import html2canvas from "html2canvas";
import { defineProps, ref } from "vue";
import { jsPDF } from "jspdf";

const isLoading = ref(false);
const props = defineProps({
  isbtnPdf: { type: Boolean, required: false, default: false },
  nom: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  nationalite: { type: String, required: true },
  photo: { type: String, default: "https://via.placeholder.com/150" },
  description: { type: String, default: "" },
  titreCv: { typs: String, default: "" },
  qualifications: { type: Array, default: () => [] },
  experiences: { type: Array, default: () => [] },
  competences: { type: Array, default: () => [] },
});
const downloadCV = async () => {
  isLoading.value = true;
  try {
    const cvContent = document.getElementById("cv-content");
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

    // Ajoutez les pages si nécessaire
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // téléchargement
    pdf.save(`CV_${props.nom.replace(/\s+/g, "_")}.pdf`);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<style scoped>
.cv-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
  color: #333;
}

.cv-content {
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: auto;
  padding: 20px;
  padding-right: 50px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile_photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f5f5f5;
  margin-right: 20px;
}

.personal-info h1 {
  color: #333;
  margin: 0;
  font-size: 28px;
}

.personal-info h2 {
  color: #666;
  margin: 5px 0;
  font-size: 18px;
  font-weight: normal;
}

.contact-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px 0;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}

.section {
  margin-bottom: 10px;
  padding-bottom: 1em;
}

.section h4 {
  color: #000000;
  font-weight: bold;
}

.bottom-sections {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.bottom-section {
  flex: 1;
  margin: 0 10px;
}

.teal-sidebar {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 100%;
  background: #4aa99e;
}

.download-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: orange;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.download-button:hover {
  background: #3a8a80;
}



@media (max-width: 500px) {

  .teal-sidebar {
    width: 15px;
    right: -0.5em;
  }
}
</style>
