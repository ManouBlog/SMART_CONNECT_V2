<script>
import instance,{ lienPhoto } from "../../../../../api/api";
import VueMultiselect from "vue-multiselect";
import { mapActions, mapState } from "pinia";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
import { useInfoPersonnel } from "../../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
export default {
  name: "InfoForModifyEntreprises",
  components: {
    VueMultiselect,
  },
  data() {
    return {
      user: this.$store.state.user,
      lienPhoto: lienPhoto,
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences"]),
  },
  methods: {
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      getCompetences: "getAllCompetences",
    }),
    ...mapActions(useInfoPersonnel, [
      "update_compte_entreprise",
      "addAnRegistreDoc",
      "addAnPieceDoc",
    ]),
    async getInfoUser(){
      await instance
          .get("voirInfoUserConnect")
          .then((resp) => {
            console.log("voirInfoUserConnect",resp);
            if (resp.data.status === true) {
             this.user = resp.data.user
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
  created() {
    this.getCompetences();
    this.getInfoUser()
  },
};
</script>
<template>
  <div class="card-body text-left py-4">
    <div class="row">
      <legend>
        Info personnelle
        {{ this.user.user.statut.statut === "entreprise" ? "sur l'entreprise" : null }}
      </legend>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Nom</label>
          <input v-model="user.nom" class="form-control" type="text" />
        </div>
      </div>

      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="user.email" class="form-control" type="email" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Contact</label>
          <input v-model="user.contact" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Ville</label>
          <input v-model="user.ville" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Commune</label>
          <input v-model="user.commune" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Quartier</label>
          <input v-model="user.quartier" class="form-control" type="text" />
        </div>
      </div>
      <section v-if="this.user.user.statut.statut === 'etudiant'">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Compétences</label>
            <VueMultiselect
              v-model="user.competences"
              :options="allCompetences"
              :multiple="true"
              :taggable="true"
              :tag="handleCompetence"
              @update:model-value="handleCompetence"
              label="competence"
              track-by="competence"
              class="vuemulti"
            >
            </VueMultiselect>
          </div>
        </div>
      </section>
      <section v-if="this.user.user.statut.statut === 'entreprise'">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Forme juridique</label>
            <input v-model="user.forme_juridique" class="form-control" type="text" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="my-3">
            <label for="add_file">Registre</label>
            <input
              type="file"
              @input="addAnRegistreDoc"
              id="add_file_registre"
              class="w-100"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Matricule/cc</label>
            <input v-model="user.matricule_cc" class="form-control" type="text" />
          </div>
        </div>
        <legend>Info sur le gérant</legend>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Nom & prénoms</label>
            <input v-model="user.gerant" class="form-control" type="text" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Numéro</label>
            <input v-model="user.numero_gerant" class="form-control" type="text" />
          </div>
        </div>
      </section>

      <div class="col-md-12">
        <div class="my-3">
          <label for="add_file">Nouvelle pièce d'identité</label>
          <input type="file" @input="addAnPieceDoc" id="add_file_piece" class="w-100" />
        </div>
      </div>
    </div>
    <div class="text-right">
      <button
        class="btn-lg bg-warning"
        style="border: none"
        @click.prevent="
          update_compte_entreprise({
            nom: user.nom,
            email: user.email,
            gerant: user.gerant,
            numero_gerant: user.numero_gerant,
            commune: user.commune,
            forme_juridique: user.forme_juridique,
            quartier: user.quartier,
            contact: user.contact,
            ville: user.ville,
            matricule_cc: user.matricule_cc,
          })
        "
      >
        Modifier
      </button>
    </div>
  </div>
</template>
