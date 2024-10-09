<script>
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
import Header from "@/components/header";
import FooterView from "@/components/footer";
import Banniere from "../Banner/Banniere.vue";
import LoadingSpinner from "../Shared/Compoments/LoadingSpinner.vue";
import Connexion from "./Connexion/Connexion.vue";
import { mapActions, mapState } from "pinia";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";

export default {
  name: "Home",
  components: {
    Header,
    FooterView,
    Banniere,
    LoadingSpinner,
    Connexion,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useRegisterStore, ["isModal"]),
    ...mapState(useLoadingSpinner, ["isLoadingVisible"]),
  },
  methods: {
    ...mapActions(useRegisterStore, {
      toogleModal: "changeValueIsModal",
    }),
  },
};
</script>
<template>
  <div class="home position-relative">
    <div v-if="isLoadingVisible">
      <LoadingSpinner />
    </div>
    <Connexion v-if="isModal" />
    <Header />
    <Banniere />
    <router-view />
    <FooterView />
  </div>
</template>
