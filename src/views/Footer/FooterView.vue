<script setup>
import { ref } from "vue";
import ListeCadre from "./Features/ListeCadre.vue";
// import { useRouter} from 'vue-router';
const {
  user: {
    statut: { statut },
  },
} = JSON.parse(localStorage.getItem("user"));
const Statut = ref(statut);
const ADRESSE = ref([
  {
    libelle: "Cocody, abidjan, cote d’ivoire",
    isVisible: true,
    img: false,
  },
]);
const ACCESS_RAPIDE = ref([
  {
    libelle: "Contactez Nous",
    link: true,
    name_link: "contact",
    isVisible: true,
    img: false,
  },
  {
    libelle: "Se connecter/Inscription",
    link: true,
    name_link: "registre",
    isVisible: true,
    img: false,
  },
  {
    libelle: "Offre d'emploi",
    link: true,
    name_link: "jobs",
    img: false,
    isVisible: Statut.value === "Etudiant" ||
           Statut.value === "Professionnel" ||
           Statut.value === "Artisan" ||
           Statut.value === "Vétéran",
  },
  {
    libelle: "Talents",
    link: true,
    name_link: "timetable",
    img: false,
    isVisible: Statut.value === "Entreprise" || Statut.value === "Particulier",
  },
]);
const ABOUTUS = ref([
  {
    libelle: "0574857485",
    isVisible: true,
    img: false,
  },
  {
    libelle: "contact@monbrobroli.com",
    isVisible: true,
    img: false,
  },
]);

const LOGO_IMG = ref([
  {
    isVisible: true,
    img: "/broboli_footer_1.png",
    alt_img: "MonBrobroli",
  },
]);
</script>

<template>
  <section class="conteneur-flex background_secondary py-5">
    <ListeCadre :titleListe="$t('FOOTER.Adresse.title')" :array_liste="ADRESSE" />
    <ListeCadre :titleListe="$t('FOOTER.ACCES.title')" :array_liste="ACCESS_RAPIDE" />
    <ListeCadre :titleListe="$t('FOOTER.CONTACT.title')" :array_liste="ABOUTUS" />
    <ListeCadre :array_liste="LOGO_IMG" />
    <!-- <div class="cadre">
      <ul>
        <img src="../../assets/lce.png" alt="La Locomotive(lce)" class="w-25" />

        <div class="reseaux_sociaux">
          <a href="https://www.instagram.com/lalocomotivelce/"
            ><em class="bi bi-instagram"></em
          ></a>

          <a href="https://www.facebook.com/lalocomotivesarl/"
            ><em class="bi bi-facebook"></em
          ></a>

          <a href="https://www.linkedin.com/company/la-locomotive-sarl-ci/mycompany/"
            ><em class="bi bi-linkedin"></em
          ></a>
        </div>
      </ul>
    </div>
  
    <div class="cadre">
      <h3>Reférences</h3>
      <p><em class="bi bi-geo-alt"></em> Angré nouveau chu</p>
      <p><em class="bi bi-telephone"></em>+225 05245852152</p>
      <a href="mailto:contact@monbrobroli.com"
        ><em class="bi bi-envelope"></em> contact@monbrobroli.com</a
      >
      <br />
      <a href="https://www.lce-ci.com">
        <em class="bi bi-globe"></em> https://www.lce-ci.com</a
      >
    </div> -->
  </section>
  
</template>
