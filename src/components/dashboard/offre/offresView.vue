<script>
// import TableDatabaseView from "../../../Shared/Compoments/TableDatabaseView.vue";
import { FilterMatchMode } from "primevue/api";
import DatatablePrimeVue from "../../../Shared/Compoments/DatatablePrimeVue.vue";
import { mapActions, mapState } from "pinia";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import Swal from "sweetalert2";
import instance from "../../../api/api";
import HeaderDashboardTable from "../../../Shared/Compoments/HeaderDashboardTable.vue";

export default {
  name: "OffresView",
  components: {
    // TableDatabaseView,
    DatatablePrimeVue,
    HeaderDashboardTable,
  },
  data() {
    return {
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
      OptionsOfpointage: [
        {
          id: 1,
          libelle: "Jour",
        },
        {
          id: 2,
          libelle: "Heure",
        },
      ],
      pointage: "",
      fieldsForFilter:['nom_offre', 'salaire'],
      allColumnsData: [
        { fieldName: "nom_offre", headerName: "Offre" },
        { fieldName: "lieu", headerName: "Lieu" },
        { fieldName: "salaire", headerName: "Honoraire" },
        { fieldName: "fin", headerName: "Date limite" },
      ],
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
  },
  methods: {
    ...mapActions(useOffreStore, ["getAllOffresCreatedByEntreprise"]),
    show_offre_modify() {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = "";
    },

    create_offre() {
      this.loading = true;
      this.creer = false;
      let capitalizeFirstLetterOffre = this.offre[0].toUpperCase();
      let offreConcat = capitalizeFirstLetterOffre + this.offre.substring(1);
      console.log(offreConcat);
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
          console.log(res);
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
          console.log(res.response.data.message);
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
      console.log("ID_DELETE", this.id_for_delete);
    },
    not_delete() {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = "";
    },
    delete_offre() {
      this.loading = true;
      this.creer = false;
      instance
        .delete("delete_offre_entreprise/" + this.id_for_delete)

        .then((res) => {
          console.log(res);

          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.confirmation_for_delete = !this.confirmation_for_delete;
            const index = this.offres.findIndex(
              (objet) => objet.id === this.id_for_delete
            );
            this.offres.splice(index, 1);
            this.loading = false;
            this.creer = true;
          }
        })
        .catch((err) => {
          if (err) {
            this.confirmation_for_delete = !this.confirmation_for_delete;
            Swal.fire({
              icon: "error",
              title: "Contacter votre service informatique",
              showConfirmButton: false,
              timer: 1500,
            });
            this.loading = false;
            this.creer = true;
          }
        });
    },
    get_categorie() {
      this.spinner = true;
      instance
        .get("seeCategorie")

        .then((res) => {
          console.log("TIMETABLE", res);
          this.categories = res.data.data;
          console.log("CATEGORIE", this.categories);
          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getAllOffresCreatedByEntreprise();
    this.get_categorie();
  },
};
</script>
<template>
  <section class="px-5">
    <div class="page-body position-relative">
      <div class="ecran_for_delete delete_article" v-show="confirmation_for_delete">
        <div class="card my_card p-5">
          <p class="h3 my-2">Voulez-vous vraiment supprimer?</p>
          <div>
            <button class="btn-lg bg-warning" @click="delete_offre">
              <span class="spinner-border w-20" role="status" v-show="loading"></span
              ><span v-show="creer">Supprimer</span>
            </button>
            <button class="btn-lg bg-danger mx-2" @click="not_delete">Annuler</button>
          </div>
        </div>
      </div>
      <HeaderDashboardTable
        :elmentsOfBtn="elmentsOfBtn"
        :titleHeader="'Listes des offres'"
      />
      <DatatablePrimeVue
        :DATAVALUE="offreCreatedByEntreprise"
        :DATACOLUMN="allColumnsData"
        :globalFilterFields="fieldsForFilter"
        :DATAfORfILTER="filters"
      />

      <!-- <TableDatabaseView :columns="allColumns"
       :allData="offreCreatedByEntreprise" /> -->
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
  padding: 0 0 2em 0;
  height: auto;
}
label {
  font-weight: bold;
}
.btn-secondary {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
}
input,
textarea,
select {
  border: 2px solid rgb(86, 86, 86) !important;
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
th {
  text-align: center;
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
