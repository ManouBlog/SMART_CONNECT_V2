<script>
// import instance, { lienPhoto } from "../../../api/api";
// import Swal from "sweetalert2";

import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { mapState, mapActions } from "pinia";
import { configUtils } from "../../../Shared/Utils";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import TableauDeBord from "../../../Shared/Compoments/TableauDeBord.vue";
// import Editor from "../components/text-editor.vue";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
import { useInfoStudentStore } from "../../../store-pinia/InfoStudent/useInfoStudentStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
export default {
  name: "AccueilView",
  components: {
    HeaderDashboard,
    TableauDeBord,
  },
  data() {
    return {
      configUtils: configUtils,
      date_filter: dayjs("2026", "YYYY"),
      texte0: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      texte19: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      IsAmbassador:"",
      statistiquesEntreprise:""
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useOffreStore, [
      "getAllOffresCreatedByEntreprise",
      "filterOffreWithYear",
    ]),
    ...mapActions(useEntreprisesStore, [
      // "get_students_contact",
      // "get_offres_interess_by_student",
      "handleStatistiquesEntreprise",
    ]),
    ...mapActions(useInfoStudentStore, [
      "filterDataWithYear",
      "getStatistiqueDashboardStudent",
    ]),
    handleData(year) {
    
     if (this.isStudentProfile){
        this.getStatistiqueDashboardStudent({ annee: this.date_filter.$y });
      } else{
         this.filterOffreWithYear(year);
      }
    },
    async verifUserProfilEtudiantComplet() {
      await this.$store.dispatch("getInfoUser")
  const user = this.$store.state.infoUserConnected;
 
  this.IsAmbassador = user?.user?.code_ambassadeur
  if (user.user?.statuses.some(s => s.statut === 'Etudiant')){
if (!user.competences.length || !user.qualifications.length) {
    this.$router.push('/dashboard/profil');
   }
   if(!user.jours.length){
    this.$router.push('/dashboard/emploi_du_temps');
   }
  }
  
},

  },
  computed: {
    ...mapState(useInfoStudentStore, ["statistiqueDashboard"]),
    ...mapState(useOffreStore, ["offreCreatedByEntreprise"]),
    ...mapState(useEntreprisesStore, ["student","offresInteressByStudents","studentRecruit", "list_students","statistiquesFormelleOrInformelleEntreprise"]),
     userStatuses() {
    return this.$store.state.user?.user?.statuses || [];
  },

  isStudentProfile() {
    return this.userStatuses.some(item =>
      ['Etudiant', 'Professionnel', 'Artisan', 'Vétéran'].includes(item.statut)
    );
  },

  isEntrepriseProfile() {
    return this.userStatuses.some(item =>
      ['Entreprise', 'Particulier'].includes(item.statut)
    );
  },

  isEntrepriseInformelleOrFormelleProfile() {
    return this.userStatuses.some(item =>
      ['Entreprise'].includes(item.statut)
    );
  },

  tableauDeBordInfos() {
    const referral = this.statistiqueDashboard?.personreferral || [];

    const baseStats = [
      {
        libelle: this.texte1,
        isVisible: this.isStudentProfile,
        nbre: Number(this.statistiqueDashboard?.offrePostule || 0),
        infosReferrals: []
      },
      {
        libelle: this.texte2,
        isVisible: this.isStudentProfile,
        nbre: this.statistiqueDashboard?.offrePending || 0,
        infosReferrals: []
      },
      {
        libelle: this.texte3,
        isVisible: this.isStudentProfile,
        nbre: this.statistiqueDashboard?.offreAccepted || 0,
        infosReferrals: []
      },
      {
        libelle: this.texte4,
        isVisible: this.isStudentProfile,
        nbre: this.statistiqueDashboard?.offreCancel || 0,
        infosReferrals: []
      },
      {
        libelle: this.$store.state.user?.user?.statut.statut == 'Particulier' ? 'Nombre de missions postulées':this.texte5,
        isVisible: this.isEntrepriseProfile,
        nbre:this.statistiquesFormelleOrInformelleEntreprise?.offrePostule
      },
      {
        libelle: this.texte6,
        isVisible: this.isEntrepriseProfile,
        nbre: this.statistiquesFormelleOrInformelleEntreprise?.offrePending
      },
      {
        libelle: this.texte7,
        isVisible: this.isEntrepriseProfile,
        nbre: this.statistiquesFormelleOrInformelleEntreprise?.offreCancel
      },
      {
        libelle: this.texte8,
        isVisible: this.isEntrepriseProfile,
        nbre:this.statistiquesFormelleOrInformelleEntreprise?.offreAccepted
      }
    ];

    if (this.IsAmbassador) {
      baseStats.unshift({
        libelle: 'Personnes parrainées',
        nbre: referral.length,
        btn: true,
        infosReferrals: referral.map(item => ({
          name:
            item?.referred?.student?.nom +
            ' ' +
            item?.referred?.student?.prenoms,
          is_registered: item?.referred?.id,
          has_subscription: item?.subscription_paid,
          formule: item?.formule
        }))
      });
    }

    return baseStats;
  }
  },
  async created() {
   if(this.isEntrepriseProfile){
   await this.handleStatistiquesEntreprise({ annee: this.date_filter.$y })
    }
    if(this.isStudentProfile){
     this.verifUserProfilEtudiantComplet()
    this.getStatistiqueDashboardStudent({ annee: this.date_filter.$y });
}



    this.texte0 = await this.handleTranslate("Tableau de bord");
    this.texte1 = await this.handleTranslate(`Mes candidatures`);
    this.texte2 = await this.handleTranslate(`Candidatures en attente de réponse`);
    this.texte3 = await this.handleTranslate(`Candidatures acceptées`);
    this.texte4 = await this.handleTranslate(`Candidatures rejetées`);
    this.texte5 = await this.handleTranslate(`Nombre d'offres publiées`);
    this.texte6 = await this.handleTranslate(`Candidatures reçues`);
    this.texte7 = await this.handleTranslate(`Candidatures rejetées`);
    this.texte8 = await this.handleTranslate(`Candidatures acceptées`);
    this.texte9 = await this.handleTranslate("Vous devez faire un abonnement");

   
    
  },
};
</script>

<template>
  <section>
    
    <HeaderDashboard :TitleHeader="texte0" :subTitleHeader="texte0" />
    <div class="conteneur_filter">
      <a-date-picker v-model:value="date_filter" @change="handleData" picker="year" />
    </div>
    <TableauDeBord :infosArray="tableauDeBordInfos" />
   
  </section>
</template>
<style scoped>
.conteneur_filter {
  display: flex;
  justify-content: flex-end;
  padding: 0 10em;
  margin-bottom: 1em;
}

/* Ciblage du date picker Ant Design */
:where(.css-dev-only-do-not-override-17yhhjv).ant-picker {
  width: 200px;
  border: 1px solid black !important;
  border-radius: 6px;
  padding: 1em;
}

/* Responsive: adaptation sur tablettes et mobiles */
@media screen and (max-width: 1024px) {
  .conteneur_filter {
    padding: 0 3em;
  }
}

@media screen and (max-width: 768px) {
  .conteneur_filter {
    justify-content: center;
  }

  :where(.css-dev-only-do-not-override-17yhhjv).ant-picker {
    width: 100%;
    max-width: 300px;
  }
}

@media screen and (max-width: 480px) {
  .conteneur_filter {
    flex-direction: column;
    align-items: center;
  }

  :where(.css-dev-only-do-not-override-17yhhjv).ant-picker {
    width: 100%;
  }
}
</style>
