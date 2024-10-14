<script>
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
import Header from "@/components/header";
import FooterView from "@/components/footer";
import Banniere from "../Banner/Banniere.vue";
import LoadingSpinner from "../Shared/Compoments/LoadingSpinner.vue";
import Connexion from "./Connexion/Connexion.vue";
import { mapActions, mapState } from "pinia";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";
import { useListeFavoris } from "../store-pinia/ListeFavoris/useListeFavoris";
import {useVerificationStore} from "../store-pinia/Verification/useVerificationStore";

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
    return {dateActive:null};
  },
  computed: {
    ...mapState(useRegisterStore, ["isModal"]),
    ...mapState(useLoadingSpinner, ["isLoadingVisible"]),
  },
  methods: {
    ...mapActions(useRegisterStore, {
      toogleModal: "changeValueIsModal",
    }),
    ...mapActions(useVerificationStore,["verifIfAbonementIsExpied"]),
    ...mapActions(useListeFavoris,["handleListeFavoris"]),
    getDateAbonementActive(){
      this.$store.state.user.user.abonement.forEach(item=>{
        if(item.statut  === 'ACCEPTED'){
          this.dateActive = item.echeance
        }
      })
    }
  },
  created(){
    this.handleListeFavoris(this.$store.state.token)
    this.getDateAbonementActive()
  },
  mounted(){
    console.log(this.dateActive)
    this.verifIfAbonementIsExpied(this.dateActive)
  }
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
