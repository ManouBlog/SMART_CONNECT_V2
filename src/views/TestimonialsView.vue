<script setup>
import { ref, onMounted } from "vue";
import instance, { lienPhoto } from "../api/api";

const testimonials = ref([]);
const testimonialsEntreprises = ref([]);
const testimonialsEtudiants = ref([]);

onMounted(async () => {
  try {
    const response = await instance.get("temoignages");

    testimonials.value = response.data;
    testimonialsEntreprises.value = testimonials.value.filter(item =>
      item.user?.statuses.some(s => ['Entreprise', 'particulier'].includes(s.statut))
    );
    testimonialsEtudiants.value = testimonials.value.filter(item =>
      item.user?.statuses.some(s => s.statut === 'Etudiant') || item.user.statut.statut === 'Etudiant'
    );
  } catch (error) {
    console.error("Erreur lors du chargement des témoignages :", error);
  }
});
</script>
<template>
  <div class="testimonials">
    <section v-if="testimonialsEtudiants.length > 0">
      <h1 class="testimonials__title">
        <img src="../assets/am_brobroli.png" alt="am_brobroli" style="
            width: 100%;
            max-width: 260px;
            height: auto;
            display: block;
            margin: auto;
          " />
      </h1>

      <div class="testimonials__list">
        <n-carousel autoplay :interval="2500">
          <div class="testimonials__item" v-for="(item, index) in testimonialsEtudiants" :key="index">
            <div class="testimonials__rating">
              <span v-for="star in 5" :key="star" class="star" :class="{ 'star--filled': star <= item.rate }">
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
                <img :src="lienPhoto + item?.user?.student?.photo_profil" :alt="item?.user?.student?.nom"
                  class="author__image" />
              </div>
              <p style="display: flex; flex-direction: column">
                <span class="author__name" v-if="item?.user?.student">{{ item?.user?.student?.prenoms }}</span>
                <span v-if="item.user?.statuses.length && item.user.statut.statut">
                  <span v-for="(status, index) in item.user?.statuses" :key="index" class="status-item">
                    <span>{{ status.statut }}</span>
                  </span>
                </span>
                <span v-else-if="item.user?.statut?.statut && !item.user?.statuses.length">
                  {{ item.user?.statut?.statut }}
                </span>
              </p>
            </div>
          </div>
        </n-carousel>
        <!-- Témoignage 1 -->
      </div>
    </section>
    <section v-if="testimonialsEntreprises.length > 0">
      <h1 class="testimonials__title">
        <img src="../assets/am_brobroli_entreprise.png" alt="am_brobroli" style="
            width: 100%;
            max-width: 260px;
            height: auto;
            display: block;
            margin: auto;
          " />
      </h1>

      <div class="testimonials__list">
        <n-carousel autoplay :interval="2500">
          <div class="testimonials__item" v-for="(item, index) in testimonialsEntreprises" :key="index">
            <div class="testimonials__rating">
              <span v-for="star in 5" :key="star" class="star" :class="{ 'star--filled': star <= item.rate }">
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
                <img v-if="(item.user?.statuses || []).some(s => s.statut === 'Entreprise')"
                  :src="lienPhoto + item.student.logo" :alt="item.student.nom" class="author__image" />
                <img v-if="(item.user?.statuses || []).some(s => s.statut === 'particulier')"
                  src="../assets/brobroli_1.png" :alt="item.student.nom" class="author__image" />
              </div>
              <p style="display: flex; flex-direction: column">
                <span class="author__name" v-if="item?.student">{{ item?.user?.student?.nom }} {{
                  item?.user?.student?.prenoms }}</span>

                <span v-for="(status, index) in item.user?.statuses || []" :key="index" class="status-item">
                  <span>{{ status.statut }}</span>
                </span>
              </p>
            </div>
          </div>
        </n-carousel>
        <!-- Témoignage 1 -->
      </div>
    </section>
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
  color: #ccc;
  /* Couleur par défaut des étoiles vides */
}

.star {
  font-size: 1.8rem;
  margin: 0 2px;
  transition: color 0.2s ease;
}

.star--filled {
  color: orange;
  /* Couleur dorée pour les étoiles pleines */
}

/* Police par défaut */
.testimonials {
  font-family: "Arial", sans-serif;
  background-color: #f8f9fa;
  padding: 60px 20px;
}

/* Titre */
.testimonials__title {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: #000;
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
  font-family: "Arial", sans-serif;
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
  font-size: 1.2em;
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

.testimonials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 1rem;
}

.testimonials section {
  flex: 1 1 45%;
  min-width: 320px;
  box-sizing: border-box;
}

/* Image responsive */
.responsive-img {
  width: 100%;
  max-width: 260px;
  height: auto;
  display: block;
  margin: auto;
}

/* Mobile (iPhone et petits écrans) */
@media (max-width: 768px) {
  .testimonials {
    flex-direction: column;
    align-items: center;
  }

  .testimonials section {
    flex: 1 1 100%;
    width: 100%;
    max-width: 500px;
  }
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
