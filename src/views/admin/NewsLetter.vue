<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "UserView",
  data() {
    return {
      messages: [],
      spinner: false,
      modify_timetable: false,
      loading:false,
      campaign :{
  objet: "",
  msg: "",
  type: "newsLetter",
}
    };
  },
  methods: {
    get_messages() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/getEmailNewsletter", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("getEmailNewsletter", res);
          const allMessages = [...res.data.data.newsletter,...res.data.data.notifications]
          this.messages = allMessages.map(item=>{
            return{
              id:item.id,
              email:item.email || item.user.email,
               objet:item.objet ? item.objet:'Visite de profile',
                type:item.type ? item.type:'Notification',
                 created_at:item.created_at
            }
          }) 
          console.log("this.messages", this.messages);
          this.spinner = false;
          setTimeout(function () {
            $("#MyTableData").DataTable({
              pagingType: "full_numbers",
              pageLength: 10,
              processing: true,
              order: [],
              language: {
                décimal: "",
                emptyTable: "Aucune donnée disponible dans le tableau",
                infoEmpty: "Showing 0 to 0 of 0 entries",
                info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
                infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
                infoPostFix: "",
                thousands: ",",
                lengthMenu: "Afficher les entrées du _MENU_",
                loadingRecords: "Loading...",
                processing: "Processing...",
                search: "Chercher :",
                stateSave: true,
                zeroRecords: "Aucun enregistrement correspondant trouvé",
                paginate: {
                  first: "Premier",
                  last: "Dernier",
                  next: "Suivant",
                  previous: "Précédent",
                },
                aria: {
                  sortAscending: ": activate to sort column ascending",
                  sortDescending: ": activate to sort column descending",
                },
              },
            });
          }, 10);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createCampaign() {
  console.log('Campaign data:', this.campaign);
   const ROUTE_BACKEND = this.campaign.type === 'newsLetter' ? "sendNewsletterAtUser":"sendNotificationsAtUser";
  axios.post(
    "https://backend.monbrobroli.com/api/"+ROUTE_BACKEND,
    this.campaign, // <- corps de la requête
    {
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    console.log("✅ Campaign created successfully:", response.data);
    // Tu peux afficher une notification visuelle ici (ex: toast ou alert)
  })
  .catch((error) => {
    if (error.response) {
      console.error("❌ API Error:", error.response.data);
    } else {
      console.error("⚠️ Network Error:", error.message);
    }
  });
}

  },
  created() {
    this.get_messages();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Messages</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12 box-col-12">
      <div class="card timetable">
        <div class="social-tab">
          <ul class="nav nav-tabs" id="top-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#see_msg"
                role="tab"
                aria-controls="see_msg"
                aria-selected="true"
                ><i data-feather="clock"></i>Voir les messages</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-about"
                data-bs-toggle="tab"
                href="#send_msg"
                role="tab"
                aria-controls="send_msg"
                aria-selected="false"
                ><i data-feather="alert-circle"></i>Envoyer un message
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-content" id="top-tabContent">
      <div class="tab-pane fade" id="send_msg" role="tabpanel" aria-labelledby="send_msg">
        <div class="container-fluid">
          <div class="Myspinner" v-show="spinner">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="createCampaign">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1.5em">
                              Envoi de message
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mb-3" style="text-align:left;">
                            <label class="form-label fw-bold">Type de message</label>
                            <select
                              class="form-select"
                              v-model="campaign.type"
                              required
                            >
                              <option value="" disabled>-- Sélectionnez un type --</option>
                              <option value="newsLetter">NewsLetter</option>
                              <option value="notifications">Notifications</option>
                            </select>
                          </div>
                        </div>
                         <div class="col-lg-6">
                          <div class="mb-3" style="text-align:left;">
                            <label class="form-label fw-bold">Objet</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model="campaign.objet"
                              placeholder="ex : Nos nouveautés du mois"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <!-- Contenu -->
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-3" style="text-align:left;">
                            <label class="form-label fw-bold">Contenu</label>
                            <textarea
                              class="form-control"
                              rows="6"
                              v-model="campaign.msg"
                              placeholder="Écrivez le contenu de votre campagne ici..."
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <!-- Statut -->
                      <!-- <div class="row">
                        <div class="col-lg-6">
                          <div class="mb-3" style="text-align:left;">
                            <label class="form-label fw-bold">Statut</label>
                            <select
                              class="form-select"
                              v-model="campaign.status"
                              required
                            >
                              <option value="">-- Sélectionnez un statut --</option>
                              <option value="draft">Brouillon</option>
                              <option value="scheduled">Planifiée</option>
                              <option value="sent">Envoyée</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-lg-6" v-if="campaign.status === 'scheduled'">
                          <div class="mb-3" style="text-align:left;">
                            <label class="form-label fw-bold">Date d’envoi</label>
                            <input
                              type="datetime-local"
                              class="form-control"
                              v-model="campaign.sent_at"
                            />
                          </div>
                        </div>
                      </div> -->

                      <!-- Bouton d’envoi -->
                      <div class="row">
                        <div class="col text-end">
                          <button
                            :disabled="!campaign.objet || !campaign.msg"
                            class="btn btn-primary me-3"
                            type="submit"
                          >
                            <span
                              class="spinner-border spinner-border-sm me-2"
                              role="status"
                              v-show="loading"
                            ></span>
                            <span>Envoyer</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade show active"
        id="see_msg"
        role="tabpanel"
        aria-labelledby="see_msg"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Date d'enregistrement</th>
                    <th class="bg-light">Type de message</th>
                    <th class="bg-light">Objet</th>
                    <th class="bg-light">Email</th>
                    <th class="bg-light">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in messages" :key="index">
                    <td>{{ new Date(item.created_at).toLocaleDateString("fr") }}</td>
                     <td>{{ item.type }}</td>
                     <td>{{ item.objet }}</td>
                    <td>{{ item.email }}</td>
                      <td>
                    <p class="d-flex justify-content-center align-items-center">
                      <router-link
                      :to="{
                        name: 'details_notification',
                        params: {
                          id: item.id,
                        },
                      }"
                      ><em class="bi bi-eye"></em
                    ></router-link>
                    </p>
                  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Container-fluid Ends-->
</template>
<style scoped>
.bi {
  font-size: 1.5em !important;
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
