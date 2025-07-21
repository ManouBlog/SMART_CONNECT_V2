<script>
import axios from "axios";
export default {
  name: "ModifierTimetable",
  data() {
    return {};
  },
  methods: {
    get_timetable() {
      axios
        .get()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<template>
  <div class="container-fluid">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="form theme-form projectcreate">
              <form @submit.prevent="create_offre">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="mb-3">
                      <label>Nom de l'offre</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="offre"
                        placeholder="ex:serveuse,barman,pianiste"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="mb-3">
                      <label>Prime</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model.number="salaire"
                        placeholder="ex:35.000 Fcfa"
                        required
                      />
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <div class="mb-3">
                      <label>lieu</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="ville"
                        placeholder="ex:Angré"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="mb-3">
                      <label>Date de fin du contrat</label>
                      <input
                        class="form-control"
                        type="date"
                        v-model="deadline"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="mb-3">
                      <label>Description</label>
                      <!-- <input
                              class="form-control"
                              type="text"
                              v-model="description"
                              required
                            /> -->
                      <textarea
                        name="description"
                        id=""
                        cols="100"
                        rows="5"
                        v-model="description"
                        placeholder="ex:Besoin d'un barman pour la semaine du 12 au 20."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-end">
                      <button class="btn btn-secondary me-3" type="submit">
                        Créer</button
                      ><button class="btn btn-danger" type="submit">
                        Annuler
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
</template>
