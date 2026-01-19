<script>
/* eslint-disable */
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Image from "primevue/image";
export default {
  name: "DétailStudentView",
  components: {
    Image,
  },
  data() {
    return {
      student: null,
      students: null,
      jours: null,
      spinner: false,
      pdfVisible: false,
      pdfUrl: null,
      recruitStatus: {
        0: "En attente de confirmation",
        1: "Accepté",
        2: "Non retenu",
      },
    };
  },
  methods: {
    isPdf(path) {
      return path?.toLowerCase().endsWith(".pdf");
    },
    fileUrl(path) {
      return `http://192.168.1.14:8000/storage/app/public/images/${path}`;
    },
    openPdf(path) {
      this.pdfUrl = this.fileUrl(path);
      this.pdfVisible = true;
    },
    closePdf() {
      this.pdfVisible = false;
      this.pdfUrl = null;
    },
    get_details_students() {
      this.spinner = true;
      console.log("this.$route", this.$route);
      axios
        .get(
          "http://192.168.1.14:8000/api/get_detail_user/" + this.$route.params.id,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log("get_details_students", res);
          this.student = res.data.data;
          this.jours = this.student?.jours;
          if ($.fn.DataTable.isDataTable("#MyTableData")) {
            $("#MyTableData").DataTable().destroy();
          }
          if ($.fn.DataTable.isDataTable("#MyTableData2")) {
            $("#MyTableData2").DataTable().destroy();
          }
          if ($.fn.DataTable.isDataTable("#MyTableData_offres")) {
            $("#MyTableData_offres").DataTable().destroy();
          }
          this.$nextTick(() => {
            // Initialisation séparée pour chaque table
            $("#MyTableData").DataTable({
              pagingType: "full_numbers",
              pageLength: 10,
              processing: true,
              order: [],
              responsive: true, // Ajout du responsive
              language: {
                decimal: "",
                emptyTable: "Aucune donnée disponible dans le tableau",
                info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
                infoEmpty: "Affichage de 0 à 0 sur 0 entrées",
                infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
                lengthMenu: "Afficher _MENU_ entrées",
                loadingRecords: "Chargement...",
                processing: "Traitement...",
                search: "Rechercher :",
                zeroRecords: "Aucun résultat trouvé",
                paginate: {
                  first: "Premier",
                  last: "Dernier",
                  next: "Suivant",
                  previous: "Précédent",
                },
              },
            });

            // Si vous avez une deuxième table
            if ($("#MyTableData2").length) {
              $("#MyTableData2").DataTable({
                pagingType: "full_numbers",
                pageLength: 10,
                processing: true,
                order: [],
                responsive: true,
                language: {
                  decimal: "",
                  emptyTable: "Aucune donnée disponible dans le tableau",
                  info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
                  infoEmpty: "Affichage de 0 à 0 sur 0 entrées",
                  infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
                  lengthMenu: "Afficher _MENU_ entrées",
                  loadingRecords: "Chargement...",
                  processing: "Traitement...",
                  search: "Rechercher :",
                  zeroRecords: "Aucun résultat trouvé",
                  paginate: {
                    first: "Premier",
                    last: "Dernier",
                    next: "Suivant",
                    previous: "Précédent",
                  },
                },
              });
            }

            if ($("#MyTableData_offres").length) {
              $("#MyTableData_offres").DataTable({
                pagingType: "full_numbers",
                pageLength: 10,
                processing: true,
                order: [],
                responsive: true,
                language: {
                  decimal: "",
                  emptyTable: "Aucune donnée disponible dans le tableau",
                  info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
                  infoEmpty: "Affichage de 0 à 0 sur 0 entrées",
                  infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
                  lengthMenu: "Afficher _MENU_ entrées",
                  loadingRecords: "Chargement...",
                  processing: "Traitement...",
                  search: "Rechercher :",
                  zeroRecords: "Aucun résultat trouvé",
                  paginate: {
                    first: "Premier",
                    last: "Dernier",
                    next: "Suivant",
                    previous: "Précédent",
                  },
                },
              });
            }

            this.spinner = false;
          });
        });
    },
    verifIfAbonnementCurrently(value) {
      let valueAbonnementCurrently = null;
      if (value && !value.length) {
        return "Pas d'abonnement";
      }
      value?.forEach((element) => {
        if (element.statut === "success") {
          valueAbonnementCurrently = element;
        }
      });
      return valueAbonnementCurrently?.abonement?.libelle
        ? valueAbonnementCurrently?.abonement?.libelle
        : null;
    },
  },
  created() {
    this.get_details_students();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <i class="bi bi-arrow-left-circle" @click="$router.go(-1)"></i>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Détails Talents</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="student != null">
      <div class="card-body">
        <span v-if="student != null" class="badge bg-primary h3">{{
          `${student.nom}  ${student.prenoms}`
        }}</span>
        <div class="text-start">
          <h4 class="badge bg-info">
            <b>Formule d'abonnement</b> :
            {{ this.verifIfAbonnementCurrently(student?.user?.abonement) ? this.verifIfAbonnementCurrently(student?.user?.abonement):'Pas abonnée' }}
          </h4>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Nom</label>
              <input disabled v-model="student.nom" class="form-control" type="text" />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Prénoms</label>
              <input
                disabled
                v-model="student.prenoms"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Email</label>
              <input v-model="student.email" class="form-control" type="email" disabled />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Téléphone</label>
              <input disabled v-model="student.phone" class="form-control" type="text" />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">ville</label>
              <input disabled v-model="student.ville" class="form-control" type="text" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Commune</label>
              <input
                disabled
                v-model="student.commune"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Quartier</label>
              <input
                disabled
                v-model="student.quartier"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Diplome academique</label>
              <input
                disabled
                v-model="student.diplome"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Carte étudiant</label>
              <div style="display: flex; flex-wrap: wrap; gap: 10px">
                <template v-for="(item, index) in student?.user?.photos" :key="index">
                  <!-- CAS IMAGE -->
                  <Image
                    v-if="!isPdf(item.path)"
                    :src="fileUrl(item.path)"
                    :alt="item.path"
                    width="250"
                    preview
                  />

                  <!-- CAS PDF -->
                  <div v-else style="border: 1px solid #ccc; padding: 10px">
                    <button class="btn btn-primary btn-sm" @click="openPdf(item.path)">
                      Voir la carte étudiant
                    </button>
                  </div>
                </template>
              </div>

              <div v-if="!student?.user?.photos?.length">Pas de carte étudiant.</div>

              <!-- IFRAME PDF -->
              <div v-if="pdfVisible" class="pdf-modal-overlay" @click.self="closePdf">
                <iframe
                  :src="pdfUrl"
                  width="80%"
                  height="500"
                  style="border: 1px solid #ccc"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="student != null">
      <h1 class="text-decoration-underline py-3">Emploi du temps</h1>
      <div class="row">
        <div class="col-sm-12 card py-3 px-2">
          <table id="MyTableData" class="table">
            <thead>
              <tr>
                <th class="bg-light">Jours</th>
                <th class="bg-light">Premiere Plage Horaire</th>
                <th class="bg-light">Seconde Plage Horaire</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in jours" :key="index">
                <td>
                  <p>
                    {{ item.jour }}
                  </p>
                </td>
                <td class="text-center">
                  <p v-if="item.periode">
                    Du {{ new Date(item.periode_debut).toLocaleDateString() }} à
                    {{ item.hour_periode_debut }} au
                    {{ new Date(item.periode_fin).toLocaleDateString() }} à
                    {{ item.hour_periode_fin }}
                  </p>
                  <p v-else>
                    {{ item.First_horaire.replace("-", " à ") }}
                  </p>
                </td>
                <td>
                  <p v-if="item.Second_horaire">
                    {{ item.Second_horaire.replace("-", " à ") }}
                  </p>
                  <p v-else>Pas de plage horaire</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="student != null">
      <h1 class="text-decoration-underline py-3">Offres</h1>
      <div class="row">
        <div class="col-sm-12 card py-3 px-2">
          <table id="MyTableData_offres" class="table">
            <thead>
              <tr>
                <th class="bg-light">Offre</th>
                <th class="bg-light">Heure de debut de travail</th>
                <th class="bg-light">Entreprise</th>
                <th class="bg-light">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in student.offres" :key="index">
                <td>
                  <p>
                    {{ item.nom_offre }}
                  </p>
                </td>
                <td class="text-center">
                  {{ item.job_debut }}
                </td>
                <td>
                  {{ item.entreprise.nom }}
                </td>
                <td>
                  <span
                    :class="
                      item.pivot.recruit === 1
                        ? 'bg-success'
                        : item.pivot.recruit === 0
                        ? 'bg-warning'
                        : 'bg-danger'
                    "
                    style="padding: 0.5em; font-weight: bold"
                  >
                    {{ recruitStatus[item.pivot.recruit] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="student != null">
      <h1 class="text-decoration-underline py-3">Abonnements</h1>
      <div class="row">
        <div class="col-sm-12 card py-3 px-2">
          <table id="MyTableData2" class="table">
            <thead>
              <tr>
                <th class="bg-light">Date de l'enregistrement</th>
                <th class="bg-light">Identifiant</th>
                <th class="bg-light">Formule d'abonnement</th>
                <!-- <th class="bg-light">Moyen de paiement</th> -->
                <th class="bg-light">Montant (Fcfa)</th>
                <th class="bg-light">Echeance</th>
                <th class="bg-light">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in student?.user?.abonement.filter(item=>item.statut !== 'EN ATTENTE')" :key="index">
                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>
                <td>
                  {{ item.transaction_id }}
                </td>
                <td>
                  {{ item?.abonement?.libelle }}
                </td>

                <td>
                  {{ item.montant }}
                </td>
                <td>
                  {{ item.echeance }}
                </td>
                <td>
                  <p
                    class="badge"
                    :class="item.statut === 'success' ? 'bg-success' : item.statut === 'EN ATTENTE' ? 'bg-warning':'bg-danger'"
                  >
                    {{ item.statut }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.pdf-modal-content {
  width: 80%;
  height: 80%;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.bi-arrow-left-circle {
  cursor: pointer;
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
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}
</style>
