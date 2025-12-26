<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import Image from "primevue/image";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "DétailEntrepriseView",
  components: {
    Image,
  },
  data() {
    return {
      entreprise: null,
      entreprises: null,
      offres: null,
      spinner: false,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      abonnementsEntreprise: [],
      showModal: false,
      pdfVisible: false,
      pdfUrl: null,
    };
  },
  methods: {
    isPdf(path) {
      return path?.toLowerCase().endsWith(".pdf");
    },
    fileUrl(path) {
      return `https://backend.monbrobroli.com/storage/app/public/images/${path}`;
    },
    openPdf(path) {
      this.pdfUrl = this.fileUrl(path);
      this.pdfVisible = true;
    },
    closePdf() {
      this.pdfVisible = false;
      this.pdfUrl = null;
    },
    get_details_entreprise() {
      this.spinner = true;

      axios
        .get("https://backend.monbrobroli.com/api/list_entreprise", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          this.entreprises = res.data.data;
          this.entreprise = this.entreprises.find(
            (item) => item.id == this.$route.params.id
          );

          console.log("responseDETAIL", this.entreprise);
          this.offres = this.entreprise.offre || [];
          this.abonnementsEntreprise = this.entreprise?.user?.abonement || [];

          // Destruction des tables DataTable existantes si elles existent
          if ($.fn.DataTable.isDataTable("#MyTableData")) {
            $("#MyTableData").DataTable().destroy();
          }
          if ($.fn.DataTable.isDataTable("#MyTableData2")) {
            $("#MyTableData2").DataTable().destroy();
          }

          // Rafraîchissement du DOM avant l'initialisation de DataTables
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
                  // Même configuration de langue que ci-dessus
                },
              });
            }

            this.spinner = false;
          });
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
          this.spinner = false;
        });
    },
    verifIfAbonnementCurrently(value) {
      let valueAbonnementCurrently = null;
      if (!value) {
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
    this.get_details_entreprise();
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
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Détails Entreprise</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="entreprise != null">
      <div class="card-body body-card">
        <span class="h3">Entreprise : </span
        ><span class="badge bg-primary h3">{{ `${entreprise.nom}` }}</span>
        <div>
          <h4>
            <b>Formule d'abonnement actuelle</b> :
            {{
              entreprise?.user?.abonement.length
                ? this.verifIfAbonnementCurrently(entreprise?.user?.abonement)
                : "Pas d'abonnement."
            }}
          </h4>
          <h4><b>Email</b> : {{ entreprise.email }}</h4>
          <h4>
            <b>Commune</b> :
            {{ entreprise.commune ? entreprise.commune : null }}
          </h4>
          <h4>
            <b>Quartier</b> :
            {{ entreprise.quartier ? entreprise.quartier : null }}
          </h4>
          <h4><b>Contact</b> : {{ entreprise.contact }}</h4>
          <h4 v-if="entreprise.gerant">
            <b>Gérant</b> : {{ entreprise.gerant }} ({{ entreprise.numero_gerant }})
          </h4>
          <h4
            v-if="entreprise?.piece_gerant"
            style="display: flex; align-items: center; gap: 1em"
          >
            <b>Pièce du gérant</b> :
            <n-image
              :alt="entreprise?.piece_gerant"
              width="100"
              :src="
                'https://backend.monbrobroli.com/storage/app/public/images/' +
                entreprise?.piece_gerant
              "
            />
          </h4>
          <h4 v-if="entreprise.matricule_cc">
            <b>Matricule_cc</b> :
            {{ entreprise.matricule_cc ? entreprise.matricule_cc : null }}
          </h4>
          <h4 v-if="entreprise.forme_juridique">
            <b>Matricule_cc</b> :
            {{ entreprise.forme_juridique ? entreprise.forme_juridique : null }}
          </h4>
          <h4
            v-if="entreprise?.logo"
            style="display: flex; align-items: center; gap: 1em"
          >
            <b>Logo</b> :
            <n-image
              :alt="entreprise?.logo"
              width="100"
              :src="
                'https://backend.monbrobroli.com/storage/app/public/images/' +
                entreprise?.logo
              "
            />
          </h4>

          <h4 v-if="entreprise?.registre">
            <b
              >Registre de commerce :

              <n-button type="warning" @click="showModal = true">
                Voir le registre
              </n-button>
              <n-modal v-model:show="showModal" style="width: 80%; max-width: 900px">
                <n-card title="Document PDF" closable @close="showModal = false">
                  <iframe
                    :src="
                      'https://backend.monbrobroli.com/storage/app/public/pdf/' +
                      entreprise?.registre
                    "
                    style="width: 100%; height: 600px; border: none"
                  ></iframe>
                </n-card>
              </n-modal>
            </b>
          </h4>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3 text-start">
              <label class="form-label">Pièce d'identité</label>
              <div style="display: flex; flex-wrap: wrap; gap: 10px">
                <template v-for="(item, index) in entreprise?.user?.photos" :key="index">
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
                      Voir la pièce d'identité
                    </button>
                  </div>
                </template>
              </div>

              <div v-if="!entreprise?.user?.photos?.length">Pas de piéce.</div>

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
    <div class="container-fluid" v-if="entreprise != null">
      <h1 class="text-decoration-underline py-3">Offres</h1>
      <div class="row">
        <div class="col-sm-12 card py-3 px-2">
          <table id="MyTableData" class="table">
            <thead>
              <tr>
                <th class="bg-light">Nom de l'offre</th>
                <th class="bg-light">Rémuneration (Fcfa)</th>
                <th class="bg-light">Lieu</th>
                <th class="bg-light">Date de publication</th>
                <th class="bg-light">Date limite</th>
                <th class="bg-light">Postulants</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in offres" :key="index">
                <td>{{ item.nom_offre }}</td>
                <td v-if="item.salaire != null">
                  {{ moneyFormat.format(item.salaire) }} Fcfa
                </td>
                <td v-else>Prime pas fixée</td>
                <td>{{ item.lieu }}</td>
                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>
                <td>
                  {{ new Date(item.fin).toLocaleDateString("fr") }}
                </td>
                <td>
                  {{ new Date(item.fin).toLocaleDateString("fr") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="entreprise != null">
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
              <tr v-for="(item, index) in abonnementsEntreprise" :key="index">
                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>
                <td>
                  {{ item.transaction_id }}
                </td>
                <td>
                  {{ item?.abonement?.libelle }}
                </td>
                <!-- <td>{{ item.moyen_paiement }}</td> -->
                <td>
                  {{ item.montant }}
                </td>
                <td>
                  {{ item.echeance }}
                </td>
                <td>
                  <p
                    class="badge"
                    :class="item.statut === 'success' ? 'bg-success' : 'bg-danger'"
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
h4 {
  margin: 1em 0;
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
.body-card {
  background: transparent;
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
h4 {
  text-align: left;
}
</style>
