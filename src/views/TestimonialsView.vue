<script setup>
import { ref, onMounted } from 'vue';
import instance,{lienPhoto} from '../api/api';

const testimonials = ref([]);

onMounted(async () => {
  try {
    const response = await instance.get('temoignages');
    console.log("testimonials",response.data)
    testimonials.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des témoignages :", error);
  }
});
</script>
<template>
  <div class="testimonials">
    <h1 class="testimonials__title">Témoignages</h1>

    <div class="testimonials__list">
        <n-carousel autoplay :interval="2500">
<div class="testimonials__item"
      v-for="(item,index) in testimonials"
      :key="index"
      >
      <div class="testimonials__rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ 'star--filled': star <= item.rate }"
    >
      ★
    </span>
  </div>
        <div class="testimonials__quote">
          <span class="quote__mark">“</span>
          <p class="testimonials__text">
           {{ item.comment }}
          </p>
          <span class="quote__mark quote__mark--bottom">”</span>
        </div>
        <div class="testimonials__author">
          <div class="author__avatar">
            <img 
            v-if="item.user.statut.statut === 'etudiant'"
            :src="lienPhoto+item.student.photo_profil" 
            :alt="item.student.nom" 
            class="author__image"
            />
            <img 
            v-if="item.user.statut.statut === 'entreprise'"
            :src="lienPhoto + item.student.logo" 
            :alt="item.student.nom" 
            class="author__image"
            />
            <img 
            v-if="item.user.statut.statut === 'particulier'"
            src="../assets/brobroli_1.png" 
            :alt="item.student.nom" 
            class="author__image"
            />
          </div>
          <p style="display:flex;flex-direction:column;">
            <span class="author__name" v-if="item?.student">{{item?.student?.nom}} {{item?.student?.prenoms}}</span>
            
           <span>{{item.user.statut.statut}}</span>
        </p>
          
        </div>
      </div>
        </n-carousel>
      <!-- Témoignage 1 -->
      
    </div>
  </div>
</template>
<style scoped>
/* Réinitialisation des marges et padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.testimonials__rating {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  color: #ccc; /* Couleur par défaut des étoiles vides */
}

.star {
  font-size: 1.8rem;
  margin: 0 2px;
  transition: color 0.2s ease;
}

.star--filled {
  color: orange; /* Couleur dorée pour les étoiles pleines */
}

/* Police par défaut */
.testimonials {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  padding: 60px 20px;
}

/* Titre */
.testimonials__title {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 50px;
}

/* Conteneur des témoignages */
.testimonials__list {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

/* Carte de témoignage */
.testimonials__item {
  flex: 1;
  max-width: 100%;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Contenu du témoignage */
.testimonials__quote {
  position: relative;
  margin-bottom: 30px;
}

/* Guillemets */
.quote__mark {
  position: absolute;
  font-size: 3rem;
  color: orange;
  font-family: 'Arial', sans-serif;
  line-height: 1;
}

.quote__mark:not(.quote__mark--bottom) {
  top: -10px;
  left: -10px;
}

.quote__mark--bottom {
  bottom: -30px;
  right: 0;
}

/* Texte du témoignage */
.testimonials__text {
  font-size: 1.8em;
  line-height: 1.6;
  color: #333;
  text-align: left;
  margin: 20px 0;
  padding: 0 10px;
}

/* Auteur */
.testimonials__author {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Avatar de l'auteur */
.author__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid orange;
}

.author__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Nom de l'auteur */
.author__name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials__list {
    flex-direction: column;
    align-items: center;
  }

  .testimonials__title {
    font-size: 2rem;
  }
}
</style>
