<script>
/* eslint-disable */
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from "axios";
import Dialog from "primevue/dialog";
import Swal from "sweetalert2";
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';

export default {
  components: { Column, DataTable, InputText, Dialog },
  data() {
    return {
      partenaireDialog: false,
      selectedPartenaire: null,
      allPartenaires: [],
      filtersPartenaires: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      form: {
        nom_partenaire: "",
        type_partenaire: "",
        description: "",
        partenaire: null,
        pourcentage: null,
        code_partenaire: "",
      },
      categories: null,
      spinner: true,
      loading: false,
      lienAffiche: null,
      isButtonDisabled: true,
    };
  },

  methods: {
    fileUrl(path) {
      return `https://backend.monbrobroli.com/storage/app/public/images/${path}`;
    },
    showPartenaire(partenaire) {
      this.selectedPartenaire = partenaire;
      this.partenaireDialog = true;
    },
    resetDataPartenaire(){
  this.form.nom_partenaire = "";
  this.form.type_partenaire = "";
  this.form.description = "";
  this.form.pourcentage = 0;
  this.form.code_partenaire = "";
  this.form.partenaire = null;
  this.resetFileInput();
    },
    async save_partenaire() {
      this.spinner = true;
      const formData = new FormData();

      // Informations du partenaire
      formData.append("nom_partenaire", this.form.nom_partenaire);
      formData.append("type_partenaire", this.form.type_partenaire);
      formData.append("description", this.form.description);
      formData.append("pourcentage", this.form.pourcentage);
      formData.append("code_partenaire", this.form.code_partenaire);

      // Image
      if (this.form.partenaire) {
        formData.append("partenaire", this.form.partenaire);
      }
      await axios
        .post("https://backend.monbrobroli.com/api/admin/addPartenaire", formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status == true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.get_partenaire(1);
            this.resetDataPartenaire();
          }
          if (res.data.status == false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          this.spinner = false;
          this.lienAffiche = null;
        });
    },
    get_partenaire(isLoading = null) {
      if (isLoading === 1) {
        this.spinner = false;
      }
      axios
        .get("https://backend.monbrobroli.com/api/allPartenaire", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          this.allPartenaires = res.data.data;
          console.log("partenaires ALL", this.allPartenaires);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    deletePartenaire(idPartenaire) {
      this.spinner = true;
      axios
        .delete("https://backend.monbrobroli.com/api/admin/deletePartenaire/" + idPartenaire, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          alert(res.data.message);
          if (res.data.status) {
            const index = this.allPartenaires.findIndex((item) => item.id == idPartenaire);
            if (index !== -1) {
              this.allPartenaires.splice(index, 1);
            }
          }
        })
        .catch((err) => {
          console.log(err);

        })
        .finally(() => {
          this.spinner = false;
        });
    },
    handleDeletePartenaire(id) {
      if (confirm("Voulez-vous vraiment supprimer ce partenaire ?")) {
        // L'utilisateur a cliqué sur OK
        console.log("Action confirmée", id);
        this.deletePartenaire(id);
      } else {
        // L'utilisateur a cliqué sur Annuler
        console.log("Action annulée");
      }
    },
    handleFile(e) {
      console.log("This.partenaire", e.target.files);
      this.form.partenaire = e.target.files[0];
    },
    resetFileInput() {
    this.form.partenaire = null;

    if (this.$refs.partenaireInput) {
      this.$refs.partenaireInput.value = "";
    }
  }
  },
  created() {
    this.get_partenaire();
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
              <li class="breadcrumb-item">Partenaires</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <Dialog v-model:visible="partenaireDialog" modal 
    header="Détails du partenaire"
      :style="{ width: '650px', backgroundColor: 'white',padding:'1em' }" :breakpoints="{ '960px': '90vw', '640px': '95vw' }">
      <template v-if="selectedPartenaire">

        <div style="padding: 0.5em;">

          <!-- Header -->
          <div class="card-body">

            <div class="row align-items-center">

              <div class="col-md-3 text-center">

                <img v-if="selectedPartenaire.partenaire" :src="fileUrl(selectedPartenaire.partenaire)"
                  class="shadow-sm" style="width:140px;height:140px;object-fit:contain;" />

                <div v-else class="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                  style="width:140px;height:140px;">
                  <i class="pi pi-image" style="font-size:45px;color:#bdbdbd"></i>
                </div>

              </div>

              <div class="col-md-9">

                <h3 class="fw-bold mb-1">
                  {{ selectedPartenaire.nom_partenaire }}
                </h3>

                <span class="badge bg-primary fs-6">
                  {{ selectedPartenaire.type_partenaire }}
                </span>

                <div class="mt-4 row">

                  <div class="col-md-6 mb-3">

                    <div class="border rounded-3 p-3 h-100">

                      <small class="text-muted d-block">
                        Code partenaire
                      </small>

                      <h5 class="mb-0">
                        {{ selectedPartenaire.code_partenaire }}
                      </h5>

                    </div>

                  </div>

                  <div class="col-md-6 mb-3">

                    <div class="border rounded-3 p-3 h-100">

                      <small class="text-muted d-block">
                        Commission
                      </small>

                      <h5 class="text-success mb-0">
                        {{ selectedPartenaire.pourcentage }} %
                      </h5>

                    </div>

                  </div>

                </div>

              </div>

            </div>
            <h5 class="fw-bold mb-3">
              Description
            </h5>

            <div class="rounded-3" style="line-height:1.8;">
              {{ selectedPartenaire.description || "Aucune description disponible." }}
            </div>
  
          </div>

        </div>

      </template>


    </Dialog>

    <div class="col-sm-12 box-col-12">
      <div class="card timetable">
        <div class="social-tab">
          <ul class="nav nav-tabs" id="top-tab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="top-timeline" data-bs-toggle="tab" href="#voir_emploi_temps" role="tab"
                aria-controls="voir_emploi_temps" aria-selected="true"><i data-feather="clock"></i>Voir les
                partenaires</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="top-about" data-bs-toggle="tab" href="#timetable" role="tab"
                aria-controls="timetable" aria-selected="false"><i data-feather="alert-circle"></i>Ajouter des
                partenaires
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-content" id="top-tabContent">
      <div class="tab-pane fade" id="timetable" role="tabpanel" aria-labelledby="timetable">
        <div class="container-fluid">
          <div class="Myspinner" v-show="spinner">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="save_partenaire">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mb-3 text-start">
                            <label class="form-label fw-bold">Nom du partenaire</label>
                            <input type="text" class="form-control" v-model="form.nom_partenaire"
                              placeholder="Ex : Université Félix Houphouët-Boigny" required />
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mb-3 text-start">
                            <label class="form-label fw-bold">Type de partenaire</label>
                            <select class="form-select" v-model="form.type_partenaire" required>
                              <option disabled value="">Sélectionner</option>
                              <option value="institution">Institution</option>
                              <option value="ecole">École</option>
                            </select>
                          </div>
                        </div>


                        <div class="col-lg-6">
                          <div class="mb-3 text-start">
                            <label class="form-label fw-bold">Commission (%)</label>
                            <input type="number" class="form-control" v-model.number="form.pourcentage"
                              placeholder="Ex : 25" min="0" max="100" required />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mb-3 text-start">
                            <label class="form-label fw-bold">Code partenaire</label>
                            <input type="text" class="form-control" v-model="form.code_partenaire"
                              placeholder="Ex : PART-2026-001" required />
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="mb-3 text-start">
                            <label class="form-label fw-bold">Description</label>
                            <textarea class="form-control" rows="4" v-model="form.description"
                              placeholder="Décrivez brièvement ce partenaire..."></textarea>
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="mb-3 text-start">
                            <label class="form-label fw-bold">Logo du partenaire</label>

                            <input
                            ref="partenaireInput"
                            class="form-control" type="file" @change="handleFile" accept="image/*" required />

                            <small class="text-muted">
                              Formats acceptés : JPG, JPEG, PNG, WEBP.
                            </small>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button :disabled="!this.form.nom_partenaire && !this.form.type && !this.form.partenaire"
                              class="btn btn-primary me-3" type="submit">
                              <span class="spinner-border w-20" role="status"
                                v-show="loading"></span><span>Enregistrer</span>
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

      <div class="tab-pane fade show active" id="voir_emploi_temps" role="tabpanel" aria-labelledby="voir_emploi_temps">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <DataTable tableStyle="min-width: 70rem" :value="allPartenaires" paginator :rows="10"
                :rowsPerPageOptions="[5, 10, 20, 50]" v-model:filters="filtersPartenaires" :globalFilterFields="[
                  'nom_partenaire',
                  'type_partenaire',
                  'code_partenaire'
                ]" class="table">

                <!-- HEADER SEARCH -->
                <template #header>
                  <div class="flex" style="justify-content: flex-start !important;padding: 0 1em;">
                    <InputText v-model="filtersPartenaires['global'].value" placeholder="Recherche partenaire..." />
                  </div>
                </template>


                <!-- Date création -->
                <Column field="created_at" header="Date d'enregistrement" style="width: 15%; padding: 1em">
                  <template #body="slotProps">
                    {{ new Date(slotProps.data.created_at).toLocaleDateString("fr") }}
                  </template>
                </Column>


                <!-- Logo -->
                <Column header="Logo" style="width: 10%; padding: 1em">
                  <template #body="slotProps">

                    <img v-if="slotProps.data.partenaire" :src="fileUrl(slotProps.data.partenaire)"
                      width="50" height="50" style="object-fit: contain;" />

                    <span v-else>
                      -
                    </span>

                  </template>
                </Column>


                <!-- Nom partenaire -->
                <Column field="nom_partenaire" header="Partenaire" style="width: 20%; padding: 1em">
                  <template #body="slotProps">

                    <span>
                      {{ slotProps.data.nom_partenaire }}

                      <span v-if="slotProps.data.view == 1" class="badge bg-danger ms-1">
                        New
                      </span>

                    </span>

                  </template>
                </Column>


                <!-- Type -->
                <Column field="type_partenaire" header="Type" style="width: 15%; padding: 1em">
                  <template #body="slotProps">

                    <span class="badge bg-primary">
                      {{ slotProps.data.type_partenaire }}
                    </span>

                  </template>
                </Column>


                <!-- Code partenaire -->
                <!-- <Column field="code_partenaire" header="Code" style="width: 15%; padding: 1em">
                  <template #body="slotProps">

                    <code>
        {{ slotProps.data.code_partenaire }}
      </code>

                  </template>
                </Column> -->


                <!-- Pourcentage -->
                <!-- <Column field="pourcentage" header="Commission (%)" style="width: 10%; padding: 1em">
                  <template #body="slotProps">

                    <span class="badge bg-success">
                      {{ slotProps.data.pourcentage }} %
                    </span>

                  </template>
                </Column> -->


                <!-- Description -->
                <Column header="Action" style="width: 10%; padding: 1em">
                  <template #body="slotProps">
                    <i class="bi bi-eye me-2" @click="showPartenaire(slotProps.data)"></i>
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.p-inputtext) {
  border: 2px solid black;
}

:deep(.p-datatable-header) {
  border: none !important;
  display: flex;
  justify-content: flex-end;
}

:deep(.p-datatable .p-datatable-paginator-bottom) {
  background: #ffffff;
  border: none;
  border-top: 1px solid #f1f5f9;
  padding: 1rem;
  border-radius: 0 0 16px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);
}

/* Boutons */
:deep(.p-paginator .p-paginator-page),
:deep(.p-paginator .p-paginator-prev),
:deep(.p-paginator .p-paginator-next),
:deep(.p-paginator .p-paginator-first),
:deep(.p-paginator .p-paginator-last) {
  width: 38px;
  height: 38px;

  border-radius: 10px;
  border: none;

  background: #f8fafc;
  color: #334155;

  transition: all 0.2s ease;
}

/* Hover */
:deep(.p-paginator .p-paginator-page:hover),
:deep(.p-paginator .p-paginator-prev:hover),
:deep(.p-paginator .p-paginator-next:hover),
:deep(.p-paginator .p-paginator-first:hover),
:deep(.p-paginator .p-paginator-last:hover) {
  background: #e2e8f0;
  transform: translateY(-1px);
}

/* Active */
:deep(.p-paginator .p-paginator-page.p-highlight) {
  background: #3b82f6;
  color: white;
  font-weight: 600;

  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

/* Texte */
:deep(.p-paginator .p-paginator-current) {
  margin: 0 1rem;
  color: #64748b;
  font-size: 14px;
}

/* Dropdown */
:deep(.p-paginator .p-dropdown) {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.bi {
  font-size: 1.5em !important;
  cursor: pointer;
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
