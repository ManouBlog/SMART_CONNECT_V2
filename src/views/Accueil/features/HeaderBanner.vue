<script>
import ButtonsHeader from "../../../Shared/Compoments/ButtonsHeader.vue";
import { mapActions } from "pinia";
import { useRegisterStore } from "../../../store-pinia/register/useRegisterStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
// import DefilementText from "../../../components/DefilementText.vue";
export default {
  name: "HeaderBanner",
  components: { 
    ButtonsHeader,
   // DefilementText 
  },
  data() {
    return {
      texte0: "",
      texte1: "",
      texte2: "",
      texte3: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte88: "",
      texte99: "",
      texte100:""
    };
  },
  methods: {
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    goToRoute(payload) {
      this.$router.push(payload);
    },
  },
  async created() {
    this.texte0 = await this.handleTranslate("Mon Brobroli");
    this.texte2 = await this.handleTranslate("en un clic");
   this.texte3 = await this.handleTranslate(
  `
  Vous avez les compétences. Nous avons les clients. MonBrobroli vous connecte en un clic.
  `
);
    this.texte88 = await this.handleTranslate(
  `
  TPE · PME · Grandes Entreprises · ONG · Institutions : trouvez votre talent immédiatement.
  `
);
    this.texte4 = await this.handleTranslate(`MonBrobroli. Simple. Sûr. Payé.`);
    this.texte100 = await this.handleTranslate(
  `
  Étudiants · Artisans · Particuliers · Professionnels · Consultants · Retraités : inscrivez-vous gratuitement.
  `
);
    this.texte99 = await this.handleTranslate(
  `
  MonBrobroli met en relation les entreprises, les particuliers et les talents de toutes compétences — du petit métier au conseil senior — avec un paiement garanti sur le canal de votre choix (Mobile Money, Wave, Virement Bancaire,…).

  Immédiatement. Pas de mauvaises surprises. Des profils vérifiés. Des missions réelles.
  `
);
    this.texte5 = await this.handleTranslate("Connexion");
    this.texte6 = await this.handleTranslate("Offres");
    this.texte7 = await this.handleTranslate("Talents disponibles");
  },
};
</script>
<template>
  <div class="header_banner">
    <div class="ecriteau">
      <h1 style="font-size: 4.5em; color: orange">
        {{ texte0 }}<br />
        {{ texte2 }}
      </h1>
      <!-- <DefilementText /> -->
      <div class="my-5" style="padding: 0 2em;" >
        <h4 style="margin: 0.2em;padding: 0.2em;">{{ texte3 }}</h4>
        <h4 style="margin: 0.2em;padding: 0.2em;">{{ texte100 }}</h4>
         <h4 style="margin: 0.2em;padding: 0.2em;">{{ texte88 }}</h4>
         <h4 style="margin: 0.2em;padding: 0.2em;">{{ texte99 }}</h4>
        <h4 style="margin: 0.2em;padding: 0.2em;">{{ texte4 }}</h4>
      </div>
      <ButtonsHeader
        @handleBtn="changeValueIsModal"
        v-if="!this.$store.state.user"
        :title="texte5"
      />
      <ButtonsHeader
        v-if="
  ($store.state.user?.user?.statuses || []).some(s => s.statut === 'Etudiant')
"
        @handleBtn="goToRoute('/jobs')"
        :title="texte6"
      />
      <ButtonsHeader
       
        v-if="
  ($store.state.user?.user?.statuses || []).some(s => s.statut !== 'Etudiant')
"
        @handleBtn="goToRoute('/timetable')"
        :title="texte7"
      />
    </div>
    <div class="ecriteau_image">
      <img
        src="../../../assets/postuler.png"
        class="position-absolute image"
        alt="postuler"
      />
    </div>
  </div>
</template>
<style scoped>
h4{
  padding:1.5em;
  color:black;
  text-align: left;
}
.image {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
}
.ecriteau_image {
  position: relative;
  flex: 2 2 200px;
}
.ecriteau {
  flex: 3 3 200px;
  text-align: center;
}
.ecriteau > h1 {
  font-weight: bold;
  font-size: 5em;
}
.header_banner {
  width: 100%;
  height: auto;
  padding: 0 0 1em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 6.5em;
}
@media screen and (max-width: 500px) {
  h4{
    padding:1em;
    text-align: left;
    font-size: 1em;
    
  }
  .header_banner {
    margin-top: 4em;
  }
  .ecriteau_image {
  position: relative;
   margin-top: 3em;
   text-align:center;
}
.ecriteau_image img{
  width:70%;
}
}
@media screen and (max-width: 400px) {
  .header_banner {
    margin-top: 0.5em;
  }
  
}
</style>
