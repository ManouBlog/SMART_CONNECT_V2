<script>
import instance from "../../../api/api";
import html2pdf from "html2pdf.js";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner.js";
const loadingSpinner = useLoadingSpinner();
export default {
  name: "imprimeContratView",
  components: {
    HeaderDashboard,
  },
  data() {
    return {
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
      texte27:"",
      offreDetail: "",
      list_entreprise_contact: "",
      entreprise: null,
      user: this.$store.state.user,
      myOffre: null,
      created_at: "",
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    generatePDF() {
      const element = this.$refs.printSection; // Référence à la div à imprimer

      // Options pour personnaliser le PDF
      const options = {
        margin: 1,
        filename: "piece.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Générer le PDF
      html2pdf().from(element).set(options).save();
    },
    printDiv() {
      // Récupérer le contenu de l'élément à imprimer
      let divContents = document.getElementById("printDetail").innerHTML;

      // Ouvrir une nouvelle fenêtre
      let printWindow = window.open("", "", "height=600,width=800");

      // Écrire le contenu HTML dans la nouvelle fenêtre
      printWindow.document.write("<html><head><title>Print</title>");
      // Inclure les styles actuels (tu peux aussi spécifier un fichier CSS si nécessaire)
      // printWindow.document.write(
      //   '<link rel="stylesheet" href="path_to_your_styles.css" type="text/css" />'
      // );
      printWindow.document.write("</head><body>");
      printWindow.document.write(`<style>
      .attestation_logo .img_card {
  width: 200px;
  height: 100px;
  position: relative;
}
.attestation_logo .img_card img {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
h5 {
  text-align: left;
}
.section_card_conteneur {
  padding: 0 5em;
}
.conteneur_abidjan_sign {
  display: flex;
  justify-content: flex-end;
}
.attestation_infos p {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.attestation_logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
}
.mt-5 {
  margin-top: 101px !important;
}

.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}
  h2{
  text-align:center;}
@media screen, print {
  .conteneur-img {
    width: 150px;
    height: 150px;
    position: relative;
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: center;
  }
  .card {
    text-align: left !important;
    border-radius: 0 !important;
  }
  .card h1 {
    text-align: center;
    border: 1px solid black;
    width: 40%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-bottom: 1em !important;
  }
  .card p {
    text-align: center;
  }
  .date {
    text-align: right !important;
    margin-bottom: -10px;
  }
}
      </style>`);
      printWindow.document.write(divContents); // Ajouter le contenu à imprimer
      printWindow.document.write("</body></html>");

      // Fermer le flux d'écriture
      printWindow.document.close();

      // Attendre le chargement complet avant d'imprimer
      printWindow.onload = function () {
        printWindow.focus(); // Mettre la fenêtre en avant
        printWindow.print(); // Lancer l'impression
        // printWindow.close(); // Fermer la fenêtre après impression
      };
    },
    
    async getDetail() {
      loadingSpinner.launchLoading(true);
      await instance
        .get("get_who_contact_student")
        .then((res) => {
          // // console.log("get_who_contact_student", res);
          this.offreDetail = res.data;
          // // console.log("this.$route.params.id", this.$route.params.id);
          // // console.log("ENTREPRISES", this.list_entreprise_contact);
          this.entreprise = this.offreDetail.find(
            (item) => Number(item.id) === Number(this.$route.params.id)
          );
          this.myOffre = this.entreprise.offre;
          // // console.log("this.myOffre", this.myOffre);
          this.created_at = this.entreprise.created_at;
          // // console.log("this.entreprise", this.entreprise);
          loadingSpinner.launchLoading(false);
        })
        .catch((err) => {
          alert(JSON.stringify(err,null,2))
          loadingSpinner.launchLoading(false);
        });
    },
  },
  async created() {
    this.getDetail();
    this.texte0 = await this.handleTranslate(`Attestation d'admission`);
    this.texte1 = await this.handleTranslate(`Adresse :`);
     this.texte2 = await this.handleTranslate("Téléphone :");
     this.texte3 = await this.handleTranslate(`ATTESTATION D'ADMISSION`);
     this.texte4 = await this.handleTranslate('Offre :');
     this.texte5 = await this.handleTranslate("L'entreprise");
     this.texte6 = await this.handleTranslate('vous a contacté Mr(Mme)');
     this.texte7 =  await this.handleTranslate("pour un poste au sein de son entreprise pour effectuer un travail vu votre disponibilité.Merci de contacter l'entreprise pour plus de détail.");
     this.texte8 =  await this.handleTranslate('Honoraire :');
     this.texte9 = await this.handleTranslate(`Contact du gérant :`);
     this.texte10 = await this.handleTranslate("Lieu :");
     this.texte11 = await this.handleTranslate('Abidjan le :');
     this.texte12 = await this.handleTranslate('Télécharger PDF');
     this.texte13 = await this.handleTranslate('Imprimer');
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="texte0"
      :subTitleHeader="texte0"
    />
    <section
      ref="printSection"
      class="section_card_conteneur"
      id="printDetail"
      v-if="this.myOffre && this.entreprise"
    >
      <div class="attestation_logo">
        <div class="img_card">
          <img src="/brobroli.png" alt="smart-connect" />
        </div>
        <div class="img_card">
          <img src="/brobroli.png" alt="smart-connect" />
        </div>
        <div class="img_card">
          <img src="/brobroli.png" alt="smart-connect" />
        </div>
      </div>
      <div class="attestation_infos">
        <p>
          <span class="span_info">{{texte1}}</span>
          <span>{{ this.entreprise.offre.entreprise.nom }}</span>
        </p>
        <p>
          <span class="span_info">{{texte2}}</span>
          <span>{{ this.entreprise.offre.entreprise.contact }}</span>
        </p>
      </div>
      <div class="my-5">
        <h2 class="text-center">{{texte3}}</h2>
      </div>
      <div class="d-flex">
        <h3>{{texte4}} {{ this.myOffre.nom_offre }}</h3>
      </div>

      <p>
        {{texte5}}
        <span class="mx-2">"{{ this.entreprise.offre.entreprise.nom }}"</span>{{texte6}}
        <span class="mx-2">"{{ user.nom }} {{ user.prenoms }}"</span>
        {{texte7}}
      </p>
      <div>
        <h5 class="my-5">{{texte8}} {{ myOffre.salaire }} Fcfa</h5>
        <h5>{{texte9}} {{ entreprise.offre.entreprise.contact }}</h5>
        <h5 class="my-5">{{texte10}} {{ myOffre.lieu }}</h5>
      </div>

      <div class="conteneur_abidjan_sign">
        <strong v-if="this.entreprise" class="date">
          {{texte11}}
          {{ new Date(this.created_at).toISOString().slice(0, 16) }}
        </strong>
      </div>
    </section>
    <section class="conteneur_abidjan_sign my-5">
      <button class="btn-lg p-5 bg-dark" style="border: none" @click="generatePDF">
        {{texte12}}
      </button>
      <button
        class="btn-lg p-5 bg-warning mx-3"
        style="border: none"
        @click="printDiv"
        v-if="this.myOffre && this.entreprise"
      >
        {{texte13}}
      </button>
    </section>
  </div>
</template>
<style scoped>
.attestation_logo .img_card {
  width: 200px;
  height: 100px;
  position: relative;
}
.attestation_logo .img_card img {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
h5 {
  text-align: left;
}
.section_card_conteneur {
  padding: 0 5em;
}
.conteneur_abidjan_sign {
  display: flex;
  justify-content: flex-end;
}
.attestation_infos p {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.attestation_logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
}
.mt-5 {
  margin-top: 101px !important;
}

.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}
@media screen, print {
  .conteneur-img {
    width: 150px;
    height: 150px;
    position: relative;
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: center;
  }
  .card {
    text-align: left !important;
    border-radius: 0 !important;
  }
  .card h1 {
    text-align: center;
    border: 1px solid black;
    width: 40%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-bottom: 1em !important;
  }
  .card p {
    text-align: center;
  }
  .date {
    text-align: right !important;
    margin-bottom: -10px;
  }
}
</style>
