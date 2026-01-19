<script>
/* eslint-disable */
import $ from "jquery";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
// import Swal from "sweetalert2";
export default {
  data() {
    return {
      afficheData: [],
      allAffiches: [],
      categories: null,
      spinner: true,
      loading: false,
      lienAffiche: null,
      appareal: "pc",
      localization: "pc",
      date_debut: null,
      date_fin: null,
      format: "iphone",
      today: new Date().toISOString().split("T")[0],
      typePublicite: "locomotive",
      company: null,
      customValue: [
        {
          key: "",
          value: null,
          lien: null,
        },
      ],
      formatOptions: [
        { label: "Smartphone", value: "iphone" },
        { label: "Tablette", value: "ipad" },
        { label: "Pc", value: "pc" },
      ],
      mobileFiles: [], // pour les fichiers mobile
    };
  },
  methods: {
    handleFile(event) {
      this.mobileFiles = Array.from(event.target.files);
    },


    // Méthode principale pour créer la publicité
    async create_publicite() {
     const payload = this.customValue
  .filter(item => item.value) // garder uniquement ceux avec un fichier
  .map(item => ({
    affiche: item.value,
    mobile_format: String(item.key || ""),
    lien: String(item.lien || "")
  }));
  console.log("payload",payload)
   const formData = new FormData();
   
if (this.localization === "pc" || this.localization === "pc_mobile") {
  payload.forEach(item => {
    // fichier
    formData.append("affiches[]", item.affiche);

    // ⚠️ champs MULTIPLES → tableaux
    formData.append("mobile_format[]", item.mobile_format);

    if (item.lien) {
      formData.append("lien[]", item.lien);
    }
  });

  // champs globaux → UNE seule fois
  formData.append("localization", this.localization);
  formData.append("company", this.typePublicite);
  formData.append("appareil", this.appareal);
}

//  if(this.localization === "pc" || this.localization === "pc_mobile"){
//   payload.forEach(item=>{
//     formData.append('affiches[]',item.affiche)
//    formData.append("localization", this.localization);
//    formData.append("company", this.typePublicite);
//    formData.append("appareil", this.appareal);
//    formData.append("mobile_format", item.mobile_format);
//    if(item.lien){
//    formData.append("lien", item.lien);
//    }
//   })
//  }

    if (this.localization === "mobile" || this.localization === "pc_mobile") {
    this.mobileFiles.forEach(item => {
      formData.append('affiches[]',item)
   formData.append("localization", this.localization);
   formData.append("company", this.typePublicite);
   formData.append("appareil", "mobile");
    });
  }

    if (this.typePublicite === "partenaire") {
          formData.append("date_debut", this.date_debut);
          formData.append("date_fin", this.date_fin);
        }
  
  
      try {
        this.spinner = true;
      
       
        // Ici tu peux envoyer formData à ton API via axios ou fetch
        // Exemple :
         const response = await axios.post("http://192.168.1.14:8000/api/admin/addAffiche", formData, {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      })


        console.log("FormData prêt à être envoyé :",response);
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

      //  Réinitialiser les champs après envoi
        this.localization = "";
        this.typePublicite = "";
        this.company = "";
        this.date_debut = "";
        this.date_fin = "";
        this.lienAffiche = "";
        this.mobileFiles = [];
        this.customValue = [{ key: "", value: null, lien: "" }];
      } catch (error) {
        console.error("Erreur création publicité :", error);
      } finally {
        this.spinner = false;
      }
    },
    // async create_publicite() {
    //   this.spinner = true;
    //   const formData = new FormData();
    //   this.afficheData.forEach((affiche) => {
    //     formData.append("affiche[]", affiche);
    //   });
    //   formData.append(
    //     "company",
    //     this.typePublicite === "locomotive" ? "locomotive" : this.company
    //   );

    //   if (this.lienAffiche) {
    //     formData.append("lien", this.lienAffiche);
    //   }

    //   // if (this.appareal) {
    //   formData.append(
    //     "appareil",
    //     this.localization === "mobile" ? "mobile" : this.appareal
    //   );
    //   // }

    //   if (this.format) {
    //     formData.append("mobile_format", this.format);
    //   }

    //   if (this.localization) {
    //     formData.append("localization", this.localization);
    //   }

    //   if (this.date_debut) {
    //     formData.append("date_debut", this.date_debut);
    //   }

    //   if (this.date_fin) {
    //     formData.append("date_fin", this.date_fin);
    //   }

    //   console.log("formData", formData);

    //   // await axios
    //   //   .post("http://192.168.1.14:8000/api/admin/addAffiche", formData, {
    //   //     headers: {
    //   //       Authorization: "Bearer " + this.$store.state.token,
    //   //     },
    //   //   })
    //   //   .then((res) => {
    //   //     console.log(res);
    //   //     if (res.data.status == true) {
    //   //       Swal.fire({
    //   //         icon: "success",
    //   //         title: res.data.message,
    //   //         showConfirmButton: false,
    //   //         timer: 1500,
    //   //       });
    //   //       this.afficheData = [];
    //   //       this.typePublicite === "locomotive";
    //   //       this.lienAffiche = null;
    //   //       this.appareal = null;
    //   //       this.format = null;
    //   //       this.localization = null;
    //   //       this.date_debut = null;
    //   //       this.date_fin = null;
    //   //     }
    //   //     if (res.data.status == false) {
    //   //       Swal.fire({
    //   //         icon: "error",
    //   //         title: res.data.message,
    //   //         showConfirmButton: false,
    //   //         timer: 1500,
    //   //       });
    //   //     }
    //   //   })
    //   //   .catch((error) => {
    //   //     alert(error);
    //   //   })
    //   //   .finally(() => {
    //   //     this.get_publicite(1);
    //   //     this.spinner = false;
    //   //     this.lienAffiche = null;
    //   //   });
    // },
    get_publicite(isLoading = null) {
      if (isLoading === 1) {
        this.spinner = false;
      }
      axios
        .get("http://192.168.1.14:8000/api/showAllAffiche", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          const elements = [];
          console.log("this.afficheAll", res.data.data);
          const DataAffiche = res.data.data;
          for (const company in DataAffiche) {
            console.log("Company:", DataAffiche[company]);
            elements.push(DataAffiche[company]);
          }
          console.log("elements", elements.flat());
          this.allAffiches = elements.flat();
          console.log("AFFICHES ALL", this.allAffiches);
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
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    deletePublicite(idPublicite) {
      this.spinner = true;
      axios
        .delete("http://192.168.1.14:8000/api/admin/delete_pub/" + idPublicite, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          alert(res.data.message);
          if (res.data.status) {
            const index = this.allAffiches.findIndex((item) => item.id == idPublicite);
            if (index !== -1) {
              this.allAffiches.splice(index, 1);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          // setTimeout(() => {
          //   this.$router.push("/");
          // }, 1500);
          // localStorage.removeItem("token");
          // localStorage.removeItem("user");
          // this.$store.state.user = null;
          // this.$store.state.token = null;
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    handleDeletePublicite(id) {
      if (confirm("Voulez-vous vraiment supprimer cette affiche ?")) {
        // L'utilisateur a cliqué sur OK
        console.log("Action confirmée", id);
        this.deletePublicite(id);
      } else {
        // L'utilisateur a cliqué sur Annuler
        console.log("Action annulée");
      }
    },
    // handleFile(e) {
    //   console.log("This.afficheData", e.target.files);
    //   this.afficheData = e.target.files;
    // },
    onCreate() {
      // Crée une nouvelle ligne vide pour le select et le fichier
      return {
        key: "",
        value: null,
        lien: null,
      };
    },
  },
  created() {
    this.get_publicite();
  },
};
</script>

<template>
  <div class="page-body">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Publicité</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->

    <div class="col-sm-12 box-col-12">
      <div class="card timetable">
        <div class="social-tab">
          <ul class="nav nav-tabs" id="top-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#voir_emploi_temps"
                role="tab"
                aria-controls="voir_emploi_temps"
                aria-selected="true"
                ><i data-feather="clock"></i>Voir les affiches</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-about"
                data-bs-toggle="tab"
                href="#timetable"
                role="tab"
                aria-controls="timetable"
                aria-selected="false"
                ><i data-feather="alert-circle"></i>Ajouter une affiche
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-content" id="top-tabContent">
      <div
        class="tab-pane fade"
        id="timetable"
        role="tabpanel"
        aria-labelledby="timetable"
      >
        <div class="container-fluid">
          <div class="Myspinner" v-show="spinner">
            <div class="spinner-border text-primary" role="status"></div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <p style="text-align: center; color: red">
                    Les champs avec astérisque (*) sont obligatoires.
                  </p>
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="create_publicite">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mb-3 text-start">
                            <p style="font-weight: bold; font-size: 1em">
                              <span style="color: red">*</span>Plateforme de diffusion
                            </p>
                            <select class="form-control" v-model="localization">
                              <option value="mobile">Mobile</option>
                              <option value="pc">Web</option>
                              <option value="pc_mobile">Web | mobile</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-lg-12" v-if="localization === 'pc' || localization === 'pc_mobile'">
                          <div class="mb-3 text-start">
                            <p style="font-weight: bold; font-size: 1em">
                              <span style="color: red">*</span> Formats
                            </p>
                            <n-dynamic-input
                              v-model:value="customValue"
                              :on-create="onCreate"
                            >
                              <!-- Texte du bouton -->
                              <template #create-button-default>
                                Ajouter un format
                              </template>

                              <!-- Contenu de chaque ligne -->
                              <template #default="{ value }">
                                <div
                                  style="
                                    display: flex;
                                    align-items: center;
                                    width: 100%;
                                    gap: 1em;
                                  "
                                >
                                  <div style="width: 100%">
                                    <label>Format</label>
                                    <!-- SELECT HTML -->
                                    <select
                                      style="width: 100%"
                                      :value="value.key"
                                      @change="value.key = $event.target.value"
                                    >
                                      <option disabled value="">Choisir le format</option>
                                      <option
                                        v-for="opt in formatOptions"
                                        :key="opt.value"
                                        :value="opt.value"
                                      >
                                        {{ opt.label }}
                                      </option>
                                    </select>
                                  </div>

                                  <!-- INPUT FILE -->
                                  <div style="width: 100%">
                                    <label>Affiche</label>
                                    <input
                                      type="file"
                                      class="form-control"
                                      @change="value.value = $event.target.files[0]"
                                    />
                                  </div>
                                  <div style="width: 100%">
                                    <label>Lien</label>
                                    <n-input v-model:value="value.lien" type="text" />
                                  </div>
                                </div>
                              </template>
                            </n-dynamic-input>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mb-3 text-start">
                            <p style="font-weight: bold; font-size: 1.2em">
                              <span style="color: red">*</span> Annonceur
                            </p>

                            <select class="form-control" v-model="typePublicite">
                              <option disabled value="">
                                -- Sélectionner l'annonceur --
                              </option>
                              <option value="locomotive">Locomotive</option>
                              <option value="partenaire">Partenaire</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-6" v-if="typePublicite === 'partenaire'">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1em">
                              <span style="color: red">*</span> Entreprise
                            </p>
                            <input class="form-control" type="text" v-model="company" />
                          </div>
                        </div>

                        <div class="col-lg-6" v-if="typePublicite === 'partenaire'">
                          <div class="mb-3 text-start">
                            <p style="font-weight: bold; font-size: 1.2em">
                              <span style="color: red">*</span>Date début
                            </p>
                            <input
                              type="datetime-local"
                              :min="today"
                              class="form-control"
                              v-model="date_debut"
                            />
                          </div>
                        </div>

                        <div class="col-lg-6" v-if="typePublicite === 'partenaire'">
                          <div class="mb-3 text-start">
                            <p style="font-weight: bold; font-size: 1.2em">
                              <span style="color: red">*</span> Date fin
                            </p>
                            <input
                              type="datetime-local"
                              :min="date_debut"
                              :disabled="!date_debut"
                              class="form-control"
                              v-model="date_fin"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6" v-if="localization === 'mobile' || localization === 'pc_mobile'">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1em">
                              <span style="color: red">*</span> Affiche (mobile)
                            </p>

                            <input
                              class="form-control"
                              type="file"
                              @change="handleFile"
                              accept="image/*"
                              multiple
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6" v-if="localization === 'mobile'">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1em">
                              Ajouter un lien
                            </p>
                            <input
                              class="form-control"
                              type="text"
                              v-model="lienAffiche"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button class="btn btn-primary me-3" type="submit">
                              <span
                                class="spinner-border w-20"
                                role="status"
                                v-show="loading"
                              ></span
                              ><span>Enregistrer une affiche</span>
                            </button>
                          </div>
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
        id="voir_emploi_temps"
        role="tabpanel"
        aria-labelledby="voir_emploi_temps"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Affiches</th>
                    <th class="bg-light">Propriétaires</th>
                    <th class="bg-light">Liens</th>
                    <th class="bg-light">Appareils</th>
                    <th class="bg-light">Période</th>
                    <th class="bg-light">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in allAffiches" :key="index">
                    <td>
                      <n-image
                        width="100"
                        :src="
                          'http://192.168.1.14:8000/storage/images/' +
                          item.affiche
                        "
                      />
                    </td>
                    <td>
                      {{ item.company ? item.company : "néant" }}
                    </td>
                    <td>
                      {{ item.lien ? item.lien : "Pas de lien" }}
                    </td>
                    <td>
                      {{
                        item.appareil
                      }} <span v-if="item.mobile_format">({{item.mobile_format}})</span>
                    </td>
                    <td>
                      {{
                        item.date_debut
                          ? item.date_debut + " Au " + item.date_fin
                          : "néant"
                      }}
                    </td>
                    <td>
                      <div class="d-flex justify-content-center gap-5 align-items-center">
                        <!-- <router-link
                          :to="{
                            name: 'modifications',
                            params: { id: item.id, name: 'categorie' },
                          }"
                          ><i class="bi bi-pencil"></i
                        ></router-link> -->
                        <button
                          class="bg-danger border-0"
                          @click="handleDeletePublicite(item.id)"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
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
</template>
<style scoped>
:deep(.n-dynamic-input .n-dynamic-input-item) {
  display: block;
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
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th {
  text-align: center;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
</style>
