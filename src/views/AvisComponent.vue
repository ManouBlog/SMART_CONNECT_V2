<template>
  <div class="avis-container">
    <h2>Donnez votre avis sur monBrobroli</h2>

    <!-- Affichage des étoiles -->
    <div class="star-rating">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ 'filled': star <= rating }"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>

    <!-- Champ de commentaire -->
    <div class="comment-section">
      <textarea
        v-model="comment"
        placeholder="Laissez un commentaire..."
        rows="4"
      ></textarea>
    </div>

    <!-- Bouton de soumission -->
    <button @click="submitAvis" class="submit-button">Envoyer</button>

    <!-- Message de confirmation -->
    <div v-if="submitted" class="confirmation-message">
      Merci pour votre avis !
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import instance from '../api/api';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useLoadingSpinner } from '../store-pinia/LoadingSpinner/useLoadingSpinner';
const rating = ref(0);
const router = useRouter();
const comment = ref('');
const submitted = ref(false);
const loadingSpinner = useLoadingSpinner();
const vuexStore = useStore();


// Fonction pour définir la note
const setRating = (star) => {
  rating.value = star;
};

function verifUserProfilEtudiantComplet() {
  // Charger l'utilisateur et attendre la fin
   vuexStore.dispatch("getInfoUser");

  const user = vuexStore.state.infoUserConnected;
  // console.log("USER",user)
  if(user.user.statut.statut === 'etudiant'){
  if (!user.competences.length || !user.qualifications.length) {
    router.replace("/dashboard/profil");
  }
  if(!user.jours.length){
    this.$router.push('/dashboard/emploi_du_temps');
   }
  }

  
}
verifUserProfilEtudiantComplet();
// Fonction pour soumettre l'avis
const submitAvis = async() => {
  if (rating.value === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Note manquante',
      text: 'Veuillez sélectionner une note.',
      confirmButtonText: 'OK',
    });
    return;
  }
  if (!comment.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Commentaire manquant',
      text: 'Veuillez laisser un commentaire.',
      confirmButtonText: 'OK',
    });
    return;
  }
loadingSpinner.launchLoading(true);
const data= {
    rate: rating.value,
    comment: comment.value,
  }
  try{
  const response = await instance.post('temoignages',data)
  // console.log("response",response)
  if(response.status === 201 ||response.status === 200){
     Swal.fire({
      icon: 'info',
      title: response.data.message,
    //   text: 'Veuillez laisser un commentaire.',
      confirmButtonText: 'OK',
    });
  }
  }catch(error){
console.log(error)
  }finally{
    loadingSpinner.launchLoading(false);
  }

  // Ici, vous pouvez envoyer les données à votre backend
  // console.log({
  //   rating: rating.value,
  //   comment: comment.value,
  // });

  // Réinitialisation après soumission
  submitted.value = true;
  rating.value = 0;
  comment.value = '';

  // Masquer le message après 3 secondes
  setTimeout(() => {
    submitted.value = false;
  }, 3000);
};
</script>

<style scoped>
.avis-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5em;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-top:8.5em;
  margin-bottom: 8.5em;
}

h2 {
  text-align: center;
  color: #333;
}

.star-rating {
  text-align: center;
  margin: 20px 0;
  font-size: 2rem;
}

.star {
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}

.star.filled {
  color: #ffd700;
}

.comment-section {
  margin: 20px 0;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:hover {
  background-color: orange;
}

.confirmation-message {
  margin-top: 20px;
  text-align: center;
  color: orange;
  font-weight: bold;
}
</style>
