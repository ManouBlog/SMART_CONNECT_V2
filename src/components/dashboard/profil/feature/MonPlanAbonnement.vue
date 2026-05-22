<script>
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useEntreprisesStore } from "../../../../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "MonPlanAbonnement",
  data() {
    return {
      texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      texte27:"",
      periodePayment:{
        year:'An',
        month:'Mois'
      }
    };
  },
  computed: { 
    ...mapState(useEntreprisesStore, ["list_abonnement","planAbonnement"]),
  MyMontantAbonnement(){
  if(this.planAbonnement.add_profil_hybrides.length > 0){
    return Number(this.planAbonnement.montant) + Number(this.planAbonnement.add_profil_hybrides.reduce((acc,cur)=>acc + cur.montant,0))
  }
  return Number(this.planAbonnement.montant)
}
   },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useEntreprisesStore, ["get_all_abonnement"]),
    handleNouvelAbonnement() {
      this.$router.push({ name: "abonnements" });
    },
  },
  async mounted() {
    await this.$store.dispatch("getInfoUser");
     await this.get_all_abonnement();
    this.texte = await this.handleTranslate('année');
    this.texte1 = await this.handleTranslate('an');
    this.texte2 = await this.handleTranslate('Aucun abonnement');
    this.texte3 = await this.handleTranslate('Souscrire à un abonnement');
  },
};

</script>
<template>
  {{ planAbonnement }}
  <div class="conteneur_tableau_de_bord d-flex justify-content-center" v-if="planAbonnement">
    <!-- {{ JSON.stringify(planAbonnement,null,2) }} -->
    <a-card :title="planAbonnement?.abonement?.libelle" :bordered="false" style="width: 400px">
      <!-- <p class="text-start">{{ planAbonnement.periode }} {{texte}}</p> -->
      <div class="px-5" 
      v-html="planAbonnement.mode_payment === 'year' || !planAbonnement.mode_payment ? planAbonnement?.abonement?.description:planAbonnement?.abonement?.description_month"></div>
      <hr />
      <div class="d-flex align-items-center gap-5 justify-content-center main-color">
        <h1 class="text-start" style="font-size: 2em">
          {{ new Intl.NumberFormat('de-DE').format(MyMontantAbonnement) }}Fcfa
        </h1>
        <span class="mx-2">/</span>
        <span style="font-size: 2em">{{periodePayment[planAbonnement.mode_payment]}}</span>
      </div>
      <div>
        <p style="color:red"> <span style="font-weight: bold;">Fin de l'abonnement:</span><span>{{planAbonnement.echeance}}</span></p>
       
      </div>
    </a-card>
  </div>
  <div v-else class="p-5">
    <h5 class="py-5 text-center">{{texte2}}</h5>
    <div class="d-flex justify-content-center p-5">
      <button class="btn bg-warning" @click="handleNouvelAbonnement">
        {{texte3}}
      </button>
    </div>
  </div>
</template>
<style scoped>
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-card .ant-card-head){
  background: orange !important;
  color:white !important;
}
:deep(li){
  list-style-type:circle !important;
}
</style>
