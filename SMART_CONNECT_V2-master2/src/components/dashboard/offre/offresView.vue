<script>
// import TableDatabaseView from "../../../Shared/Compoments/TableDatabaseView.vue";
import { FilterMatchMode } from "primevue/api";
import DatatablePrimeVue from "../../../Shared/Compoments/DatatablePrimeVue.vue";
import { mapActions, mapState } from "pinia";


import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import Swal from "sweetalert2";
import instance from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import ModalSuppression from "../../../Shared/Compoments/ModalSuppression.vue";
import { useModalSuppressionStore } from "../../../store-pinia/ModalSuppession/useModalSuppressionStore";
// import HeaderDashboardTable from "../../../Shared/Compoments/HeaderDashboardTable.vue";

export default {
  name: "OffresView",
  components: {
    // TableDatabaseView,
    DatatablePrimeVue,
    HeaderDashboard,
    ModalSuppression,
    // HeaderDashboardTable,
  },
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
      offre: null,
      salaire: null,
      lieu: null,
      debut: null,
      fin: null,
      description: null,
      offres: [],
      spinner: false,
      offre_id: null,
      modify_offre: false,
      id_offre_update: null,
      loading: false,
      creer: true,
      confirmation_for_delete: false,
      id_for_delete: "",
      moneyFormat: new Intl.NumberFormat("de-DE"),
      categorie: "",
      categories: null,
      Today: new Date().toJSON().slice(0, 10),
      spinnerModify: false,
      OptionsOfpointage: [],
      pointage: "",
      fieldsForFilter: ["nom_offre", "salaire"],
      allColumnsData: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nom_offre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      elmentsOfBtn: [
        {
          name_btn: "Créer une offre",
          color_btn: "primary",
        },
      ],
    };
  },
  computed: {
    ...mapState(useOffreStore, ["offreCreatedByEntreprise"]),
    ...mapState(useModalSuppressionStore, ["showModalSuppression"]),
  },
  methods: {
    handleListAllColumnsData(){
      
    },
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useOffreStore, [
      "getAllOffresCreatedByEntreprise",
      "handleDeleteOffre",
    ]),
    show_offre_modify() {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = "";
    },

    create_offre() {
      this.loading = true;
      this.creer = false;
      let capitalizeFirstLetterOffre = this.offre[0].toUpperCase();
      let offreConcat = capitalizeFirstLetterOffre + this.offre.substring(1);
      // console.log(offreConcat);
      let data = {
        nom_offre: offreConcat,
        salaire: this.salaire,
        description: this.description,
        debut: this.debut,
        fin: this.fin,
        lieu: this.lieu,
        pointage: this.pointage,
        categorie_offre_id: this.categorie,
      };
      instance
        .post("create_offre", data)
        .then((res) => {
          this.spinner = true;
          this.loading = false;
          // console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.spinner = false;

            this.creer = true;
            //setTimeout(() => {
            //location.reload(true);
            //}, 1500);
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.spinner = false;
            this.creer = true;
          }
        })
        .catch((res) => {
          // console.log(res.response.data.message);
          Swal.fire({
            icon: "error",
            title: res.response.data.message,
            showConfirmButton: true,
          });
          this.loading = false;
          this.creer = true;
        });
    },
    show_box_confirmation_delete(id) {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = id;
      // console.log("ID_DELETE", this.id_for_delete);
    },
    not_delete() {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = "";
    },

    get_categorie() {
      this.spinner = true;
      instance
        .get("seeCategorie")

        .then((res) => {
          // console.log("TIMETABLE", res);
          this.categories = res.data.data;
          // console.log("CATEGORIE", this.categories);
          this.spinner = false;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    declencheRedirectionforGoOnRoute() {
      // console.log("declencheRedirectionforGoOnRoute");
      this.$router.push("/dashboard/creation_offre");
    },
    handleDeleteItem(idItem) {
      this.handleDeleteOffre(idItem);
    },
  },
  async created() {
    this.getAllOffresCreatedByEntreprise();
    this.get_categorie();
    const nom_offre = await this.handleTranslate('Offre')
    const Lieu = await this.handleTranslate('Lieu')
    const Honoraire= await this.handleTranslate('Honoraire')
    const Date_limite = await this.handleTranslate('Date limite')
    const JOUR = await this.handleTranslate('Jour')
    const Heure = await this.handleTranslate('Heure')
    this.allColumnsData = [
        { fieldName: "nom_offre", headerName: nom_offre },
        { fieldName: "lieu", headerName: Lieu },
        { fieldName: "salaire", headerName: Honoraire },
        { fieldName: "fin", headerName: Date_limite },
      ]
      this.OptionsOfpointage = [
        {
          id: 1,
          libelle: JOUR,
        },
        {
          id: 2,
          libelle: Heure,
        },
      ]
    this.texte = await this.handleTranslate('Liste des offres');
  },
};
</script>
<template>
  <section>
    <ModalSuppression v-if="showModalSuppression" @handleDeleteItem="handleDeleteItem" />
    <HeaderDashboard
      :TitleHeader="texte"
      :subTitleHeader="texte"
    />
    <div class="page-body position-relative">
      <DatatablePrimeVue
        :DATAVALUE="offreCreatedByEntreprise"
        :DATACOLUMN="allColumnsData"
        :globalFilterFields="fieldsForFilter"
        :DATAfORfILTER="filters"
        :nameDatatable="'liste des offres'"
      />
    </div>
  </section>
</template>
<style scoped>
.text-dark a em {
  color: black !important;
}
.mb-3 {
  text-align: left;
}
.conteneur_editor {
  border: 1px solid black;
  color: black !important;
  border-radius: 5px;
  padding: 0 1em;
  height: auto;
}
label {
  font-weight: bold;
}
.btn-secondary {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
}

select {
  border-radius: 5px !important;
  width: 100%;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}

.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: transparent !important;
  display: flex;
  place-items: center;
  justify-content: center;
}
.plan-modify {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: transparent;
  display: flex;
  place-items: center;
  justify-content: center;
}
.delete_article {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: transparent;
  display: flex;
  place-items: center;
  justify-content: center;
}
.ecran {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 99;
}
.modify-form {
  margin-left: 50%;
  transform: translateX(-35%);
}
.bi {
  font-size: 1.3em !important;
  margin: 0 0.5em;
  cursor: pointer;
}

.my_card {
  background: rgb(255 255 255) !important;
  padding: 1.5em;
  box-shadow: 1px 1px 3px rgb(0 0 0);
}
</style>
