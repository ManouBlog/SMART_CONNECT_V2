<template>
  <div class="cv-container">
    <div id="cv-content" class="cv-content">
      <!-- En-tête avec photo et infos personnelles -->
      <div class="header">
        <div class="photo-placeholder">
          <img :src="photo" alt="Photo de profil" class="profile-photo" />
        </div>
        <div class="personal-info">
          <h1>{{ nom }}</h1>
          <!-- <h2>{{ titre }}</h2> -->
          <!-- <p><strong>Date et lieu de naissance :</strong> {{ naissance }}</p> -->
        </div>
      </div>
      <!-- Coordonnées -->
      <div class="contact-info">
        <p>📞 {{ telephone }}</p>
        <p>✉️ {{ email }}</p>
        <p>🇨🇮 {{ nationalite }}</p>
      </div>
      <!-- Description -->
      <div class="section" v-if="description">
        <h3>DESCRIPTION</h3>
        <p>{{ description }}</p>
      </div>
      <!-- Qualifications -->
      <div class="section" v-if="qualifications.length">
        <h3>QUALIFICATIONS</h3>
        <p v-for="(q, i) in qualifications" :key="i">
          <strong>{{ q.periode }} :</strong> {{ q.detail }}
        </p>
      </div>
      <!-- Expériences professionnelles -->
      <div class="section" v-if="experiences.length">
        <h3>EXPÉRIENCES PROFESSIONNELLES</h3>
        <p v-for="(exp, i) in experiences" :key="i">
          <strong>{{ exp.periode }} :</strong> {{ exp.detail }}
        </p>
      </div>
      <!-- Compétences -->
      <div class="section" v-if="competences.length">
        <h3>COMPÉTENCES</h3>
        <ul style="padding:0 1.5em;">
          <li v-for="(c, i) in competences" :key="i">{{ c.comp }}</li>
        </ul>
      </div>
      <!-- Langues, centres d'intérêt et atouts -->
      <!-- <div class="bottom-sections">
        <div class="bottom-section" v-if="langues.length">
          <h3>LANGUES</h3>
          <p v-for="(langue, i) in langues" :key="i">{{ langue }}</p>
        </div>
        <div class="bottom-section" v-if="interets.length">
          <h3>Centres d’intérêt</h3>
          <ul>
            <li v-for="(interet, i) in interets" :key="i">{{ interet }}</li>
          </ul>
        </div>
        <div class="bottom-section" v-if="atouts.length">
          <h3>Atouts</h3>
          <ul>
            <li v-for="(atout, i) in atouts" :key="i">{{ atout }}</li>
          </ul>
        </div>
      </div> -->
      <!-- Barre verticale teal -->
      <div class="teal-sidebar"></div>
    </div>
    <!-- Bouton de téléchargement -->
    <button @click="downloadCV" class="download-button">Télécharger le CV</button>
  </div>
</template>
<script setup>
import html2canvas from "html2canvas";
import { defineProps } from "vue";
// import { jsPDF } from "jspdf";
const props = defineProps({
  nom: { type: String, required: true },
  // titre: { type: String, required: true },
  // naissance: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  nationalite: { type: String, required: true },
  photo: { type: String, default: "https://via.placeholder.com/150" },
  description: { type: String, default: "" },
  qualifications: { type: Array, default: () => [] },
  experiences: { type: Array, default: () => [] },
  competences: { type: Array, default: () => [] },
  // langues: { type: Array, default: () => [] },
  // interets: { type: Array, default: () => [] },
  // atouts: { type: Array, default: () => [] },
});
const downloadCV = async () => {
  const cvContent = document.getElementById("cv-content");
  const canvas = await html2canvas(cvContent, {
    scale: 2,
    logging: false,
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imgData;
  link.download = `CV_${props.nom.replace(/\s+/g, "_")}.png`;
  link.click();
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
  width: 800px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  padding: 20px;
  padding-right: 50px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4aa99e;
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
  padding: 10px;
  background: #f5f5f5;
  border-radius: 5px;
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  color: #4aa99e;
  border-bottom: 2px solid #4aa99e;
  padding-bottom: 5px;
  margin-bottom: 10px;
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
  background: #4aa99e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.download-button:hover {
  background: #3a8a80;
}
</style>
