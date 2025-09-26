<template>
  <div class="cv-container">
    <div id="cv-content" class="cv-content">
      <!-- En-tête avec photo et infos personnelles -->
      <div class="header">
        <div class="photo-placeholder">
          <img
            src="https://via.placeholder.com/150"
            alt="Photo de profil"
            class="profile-photo"
          />
       'hui
        </div>
        <div class="personal-info">
          <h1>Jean beauchamp</h1>
          <h2>Homme de ménage / Agent d’entretien</h2>
          <p>
            <strong>Date et lieu de naissance :</strong> 23/12/1998 à TANO
            AKAKRO
          </p>
        </div>
      </div>

      <!-- Coordonnées -->
      <div class="contact-info">
        <p>📞 +225 07 87 10 22 22</p>
        <p>✉️ jeanbeauchamp@gmail.com</p>
        <p>🇨🇮 Ivoirien</p>
      </div>

      <!-- Description -->
      <div class="section">
        <h3>DESCRIPTION</h3>
        <p>
          Agent d’entretien expérimenté, capable de maintenir des environnements
          propres et sains. Efficace, organisé et respectueux des consignes de
          sécurité.
        </p>
      </div>

      <!-- Qualifications -->
      <div class="section">
        <h3>QUALIFICATIONS</h3>
        <p><strong>Octobre 2021 - Mars 2022 :</strong> Caissier en pharmacie et super marché</p>
      </div>

      <!-- Expériences professionnelles -->
      <div class="section">
        <h3>EXPÉRIENCES PROFESSIONNELLES</h3>
        <p><strong>Janvier 2023 - Présent :</strong> Homme de ménage</p>
      </div>

      <!-- Compétences -->
      <div class="section">
        <h3>COMPÉTENCES</h3>
        <ul>
          <li>Maîtrise des techniques de nettoyage et de désinfection</li>
          <li>Gestion du temps et autonomie dans le travail</li>
          <li>Connaissance des produits d’entretien et de leur utilisation sécurisée</li>
          <li>Discrétion et respect de la vie privée des occupants</li>
          <li>Capacité à réparer les besoins d’entretien et à s’adapter à différents environnements</li>
        </ul>
      </div>

      <!-- Langues, centres d'intérêt et atouts -->
      <div class="bottom-sections">
        <div class="bottom-section">
          <h3>LANGUES</h3>
          <p>Français</p>
        </div>
        <div class="bottom-section">
          <h3>Centre d’intérêt</h3>
          <ul>
            <li>Sport</li>
            <li>Musique</li>
            <li>Voyage</li>
          </ul>
        </div>
        <div class="bottom-section">
          <h3>Atouts</h3>
          <ul>
            <li>Volonté</li>
            <li>Détermination et ponctualité</li>
            <li>Disponibilité et bonne volonté</li>
          </ul>
        </div>
      </div>

      <!-- Barre verticale teal -->
      <div class="teal-sidebar"></div>
    </div>

    <!-- Bouton de téléchargement -->
    <button @click="downloadCV" class="download-button">Télécharger le CV</button>
  </div>
</template>

<script setup>
// import { ref } from "vue";
import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

const downloadCV = async () => {
  const cvContent = document.getElementById("cv-content");
  const canvas = await html2canvas(cvContent, {
    scale: 2,
    logging: false,
    useCORS: true,
    allowTaint: true,
  });
  const imgData = canvas.toDataURL("image/png");

  // Téléchargement en image
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "CV_Jean_Beauchamp.png";
  link.click();

  // Option pour PDF (décommentez si vous préférez un PDF)
  /*
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  pdf.save("CV_Jean_Beauchamp.pdf");
  */
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
