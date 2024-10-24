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
      texte: "",
      texte1: "",
      texte2: "",
      texte3: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
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
    this.texte = await this.handleTranslate("Mon emploi");
    this.texte2 = await this.handleTranslate("en un clic");
    this.texte3 = await this.handleTranslate("Nous vous accompagnons pour");
    this.texte4 = await this.handleTranslate("trouver votre prochaine opportunité");
    this.texte5 = await this.handleTranslate("Connexion");
    this.texte6 = await this.handleTranslate("Offres");
    this.texte7 = await this.handleTranslate("Talents disponibles");
  },
};
</script>
<template>
  <div class="header_banner">
    <div class="ecriteau">
      <h1>
        {{ texte }}<br />
        {{ texte2 }}
      </h1>
      <h5 class="my-5">
        {{ texte3 }} <br />
        {{ texte4 }}
      </h5>
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
          (this.$store.state.user &&
            this.$store.state.user.user.statut.statut == 'entreprise') ||
          (this.$store.state.user &&
            this.$store.state.user.user.statut.statut === 'particulier')
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
}
</style>
