<script>
import { lienPhoto } from "../../../../../api/api";
import { mapActions } from "pinia";
import { useInfoPersonnel } from "../../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
export default {
  name: "InfoForModifyEntreprises",
  data() {
    return {
      user: this.$store.state.user,
      lienPhoto: lienPhoto,
    };
  },
  methods: {
    ...mapActions(useInfoPersonnel, [
      "update_compte_entreprise",
      "addAnRegistreDoc",
      "addAnPieceDoc",
    ]),
  },
  created() {
    console.log("user", this.user);
  },
};
</script>
<template>
  <div class="card-body text-left py-4">
    <div class="row">
      <legend>Info sur l'entreprise</legend>
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
          <label class="form-label">Matricule/cc</label>
          <input v-model="user.matricule_cc" class="form-control" type="text" />
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
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Forme juridique</label>
          <input v-model="user.forme_juridique" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <!-- <div class="mb-3">
          <label class="form-label d-block">Registre</label>
          <i class="bi bi-filetype-pdf"></i>
          <a :href="lienPhoto + user.registre" download>Download</a>
        </div> -->
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
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label d-block">Pièce d'identité</label>
          <div class="my-3">
            <label for="add_file">Nouvelle pièce d'identité</label>
            <input type="file" @input="addAnPieceDoc" id="add_file_piece" class="w-100" />
          </div>
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
