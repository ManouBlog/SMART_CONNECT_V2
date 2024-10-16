<script>
import instance from "../../../api/api";
import html2pdf from "html2pdf.js";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner.js";
const loadingSpinner = useLoadingSpinner();
export default {
  name: "imprimeContratView",
  components: {
    HeaderDashboard,
  },
  data() {
    return {
      offreDetail: "",
      list_entreprise_contact: "",
      entreprise: null,
      user: this.$store.state.user,
      myOffre: null,
      created_at: "",
    };
  },
  methods: {
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
    // printDiv() {
    //   let divContents = document.getElementById("printDetail");
    //   let a = window.open("", "", "height=400,width=400");
    //   a.document.write("<html><head>");
    //   a.document.write("</head><body>");
    //   a.document.write(`<div>
    //   ${divContents.innerHTML}
    //   </div>`);
    //   a.document.write("</body></html>");
    //   a.document.close();
    //   setTimeout(() => {
    //     a.print();
    //     a.close();
    //   }, 300);
    // },
    async getDetail() {
      loadingSpinner.launchLoading(true);
      await instance
        .get("get_who_contact_student")
        .then((res) => {
          console.log("get_who_contact_student", res);
          this.offreDetail = res.data;
          console.log("this.$route.params.id", this.$route.params.id);
          console.log("ENTREPRISES", this.list_entreprise_contact);
          this.entreprise = this.offreDetail.entreprises.find(
            (item) => Number(item.pivot.id) === Number(this.$route.params.id)
          );
          this.myOffre = this.entreprise.pivot.offre;
          console.log("this.myOffre", this.myOffre);
          this.created_at = this.entreprise.pivot.created_at;
          console.log("this.entreprise", this.entreprise);
          loadingSpinner.launchLoading(false);
        })
        .catch((err) => {
          console.log(err);
          loadingSpinner.launchLoading(false);
        });
    },
  },
  created() {
    this.getDetail();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="`Attestation d'admission`"
      :subTitleHeader="`Attestation d'admission`"
    />
    <section
      ref="printSection"
      class="section_card_conteneur"
      id="printDetail"
      v-if="this.myOffre && this.entreprise"
    >
      <div class="attestation_logo">
        <div class="img_card">
          <img src="/smart-connect.png" alt="smart-connect" />
        </div>
        <div class="img_card">
          <img src="/smart-connect.png" alt="smart-connect" />
        </div>
        <div class="img_card">
          <img src="/img/lce.c9a1a7c1.png" alt="smart-connect" />
        </div>
      </div>
      <div class="attestation_infos">
        <p>
          <span class="span_info">Adresse :</span>
          <span>{{ this.entreprise.nom }}</span>
        </p>
        <p>
          <span class="span_info">Téléphone :</span>
          <span>{{ this.entreprise.contact }}</span>
        </p>
      </div>
      <div class="my-5">
        <h2 class="text-center">ATTESTATION D'ADMISSION</h2>
      </div>
      <div class="d-flex">
        <h3>Offre : {{ this.myOffre.nom_offre }}</h3>
      </div>

      <p>
        L'entreprise
        <span class="mx-2">"{{ this.entreprise.nom }}"</span>vous a contacté Mr(Mme)
        <span class="mx-2">"{{ user.nom }} {{ user.prenoms }}"</span>
        pour un poste au sein de son entreprise pour effectuer un travail vu votre
        disponibilité.Merci de contacter l'entreprise pour plus de détail.
      </p>
      <div>
        <h5 class="my-5">Honoraire : {{ myOffre.salaire }} Fcfa</h5>
        <h5>Contact du gérant : {{ entreprise.contact }}</h5>
        <h5 class="my-5">Lieu : {{ myOffre.lieu }}</h5>
      </div>

      <div class="conteneur_abidjan_sign">
        <strong v-if="this.entreprise" class="date">
          Abidjan le :
          {{ new Date(this.created_at).toISOString().slice(0, 16) }}
        </strong>
      </div>
    </section>
    <section class="conteneur_abidjan_sign my-5">
      <button class="btn-lg p-5 bg-dark" style="border: none" @click="generatePDF">
        Télécharger PDF
      </button>
      <button
        class="btn-lg p-5 bg-warning"
        style="border: none"
        @click="printDiv"
        v-if="this.myOffre && this.entreprise"
      >
        Imprimer
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
