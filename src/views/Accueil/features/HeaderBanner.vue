<script>
import ButtonsHeader from "../../../Shared/Compoments/ButtonsHeader.vue";
import { mapActions } from "pinia";
import { useRegisterStore } from "../../../store-pinia/register/useRegisterStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
export default {
  name: "HeaderBanner",
  components: { ButtonsHeader },
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
      texte88:"",
      texte99:"",
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
    this.texte3 = await this.handleTranslate("Gagne de l’expérience professionnelle");
    this.texte88 = await this.handleTranslate("et de l’argent tout en étant étudiant(e).");
    this.texte4 = await this.handleTranslate("Avec MonBrobroli, la galère est derrière vous,");
    this.texte99 = await this.handleTranslate("grâce à des opportunités taillées à votre mesure.");
    this.texte5 = await this.handleTranslate("Connexion");
    this.texte6 = await this.handleTranslate("Offres");
    this.texte7 = await this.handleTranslate("Talents disponibles");
    
  },
};
</script>
<template>
  <div class="header_banner">
    <div class="ecriteau">
      <h1 style="font-size:4.5em;color:orange;">
        {{ texte0 }}<br />
        {{ texte2 }}
      </h1>
      <div class="my-5" style="letter-spacing:0.2em;">
        <h3>{{ texte3 }}</h3>
        <h3>{{ texte88 }}</h3>
        <br>
       <h3>{{ texte4 }}</h3> 
       <h3>{{texte99}}</h3>
      </div>
      <ButtonsHeader
        @handleBtn="changeValueIsModal"
        v-if="!this.$store.state.user"
        :title="texte5"
      />
      <ButtonsHeader
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user.statut.statut == 'etudiant'
        "
        @handleBtn="goToRoute('/jobs')"
        :title="texte6"
      />
      <ButtonsHeader
        v-if="
          this.$store.state.user && this.$store.state.user.user.statut.statut != 'etudiant'
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
  padding: 0 0 0 1.5em;
  flex: 3 3 200px;
  text-align:center;
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
  margin-top:6.5em;
}
@media screen and (max-width: 500px) {
 .header_banner {
  margin-top:4em;
}
}
@media screen and (max-width: 400px) {
  .header_banner {
  margin-top:0.5em;
}
}
</style>
