<script>
import ButtonsHeader from "../../../Shared/Compoments/ButtonsHeader.vue";
import { mapActions } from "pinia";
import { useRegisterStore } from "../../../store-pinia/register/useRegisterStore";
export default {
  name: "HeaderBanner",
  components: { ButtonsHeader },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    goToRoute(payload) {
      this.$router.push(payload);
    },
  },
};
</script>
<template>
  <div class="header_banner">
    <div class="ecriteau">
      <h1>
        {{$t("Home.headline.emploi")}} <br />
        {{$t("Home.headline.oneClick")}}
      </h1>
      <h5 class="my-5">
        Nous vous accompagnons pour <br />
        trouver votre prochaine opportunité.
      </h5>
      <ButtonsHeader
        @handleBtn="changeValueIsModal"
        v-if="!this.$store.state.user"
        :title="'Connexion'"
      />
      <ButtonsHeader
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user.statut.statut == 'etudiant'
        "
        @handleBtn="goToRoute('/jobs')"
        :title="'Offres'"
      />
      <ButtonsHeader
        v-if="
          (this.$store.state.user &&
            this.$store.state.user.user.statut.statut == 'entreprise') ||
          (this.$store.state.user &&
            this.$store.state.user.user.statut.statut === 'particulier')
        "
        @handleBtn="goToRoute('/timetable')"
        :title="'Talents disponibles'"
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
