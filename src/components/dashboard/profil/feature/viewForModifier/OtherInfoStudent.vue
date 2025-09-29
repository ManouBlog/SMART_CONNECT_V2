<script>
import instance, { lienPhoto } from "../../../../../api/api";
// import VueMultiselect from "vue-multiselect";
import { mapActions, mapState } from "pinia";
import { Help } from "../../../../../utils";
import { useLoadingSpinner } from "../../../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
import { useInfoPersonnel } from "../../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import DynaminInput from "../../../../../Shared/Compoments/DynaminInput.vue";
export default {
  name: "InfoForModifyEntreprises",
  components: {
    // VueMultiselect,
    DynaminInput,
  },
  data() {
    return {
      user: "",
      lienPhoto: lienPhoto,
      StoreLoading: useLoadingSpinner(),
      itemsQualificationDynamicInput: [{ string: "Hello" }],
      itemsExperienceProfessionnelleDynamicInput: [{ string: "Hello" }],
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
      "update_compte_student",
      "addAnRegistreDoc",
      "addAnPieceDoc",
      "addAnLogo",
    ]),
    async getInfoUser() {
      this.StoreLoading.launchLoading(true);
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          // console.log("voirInfoUserConnect",resp);
          if (resp.data.status === true) {
            this.user = resp.data.user;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.StoreLoading.launchLoading(false);
        });
    },

    updateInfoEntreprise(company) {
      this.update_compte_entreprise({
        nom: company.nom,
        email: company.email,
        gerant: company.gerant,
        numero_gerant: company.numero_gerant,
        commune: company.commune,
        forme_juridique: company.forme_juridique,
        quartier: company.quartier,
        contact: company.contact,
        ville: company.ville,
        matricule_cc: company.matricule_cc,
      });
    },
    updateInfoStudent(Etudiants) {
      console.log("Etudiants", JSON.stringify(Etudiants, null, 2));
      const competenceWithId = Help.retirerIdIntoArrayCompetence(Etudiants.competences);
      console.log("competenceWithId", competenceWithId);
      this.update_compte_student({
        nom: Etudiants.nom,
        email: Etudiants.email,
        prenoms: Etudiants.prenoms,
        commune: Etudiants.commune,
        quartier: Etudiants.quartier,
        contact: Etudiants.phone,
        ville: Etudiants.ville,
        bio: Etudiants.bio,
        diplome: Etudiants.diplome,
        competences: Help.retirerIdIntoArrayCompetence(Etudiants.competences),
      });
    },
    handleUpdate(user) {
      if (this.user.user.statut.statut === "entreprise") {
        this.updateInfoEntreprise(user);
      } else {
        this.updateInfoStudent(user);
      }
      this.getInfoUser();
    },
  },
  created() {
    this.getCompetences();
    this.getInfoUser();
  },
};
</script>
<template>
  <div class="card-body text-left py-4">
    <div class="row">
      <legend>Autres infos personnelles</legend>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Titre CV</label>
          <input v-model="user.titre_cv" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Date de naissance</label>
          <input v-model="user.date_naissance" class="form-control" type="date" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="my-3">
          <label class="form-label">Qualifications</label>
          <DynaminInput 
          TitleBtnName="Ajouter des qualifications"
          v-model:value="itemsQualificationDynamicInput" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="my-3">
          <label class="form-label">Expériences professionnelles</label>
          <DynaminInput
          TitleBtnName="Ajouter des expériences professionnelles"
          v-model:value="itemsExperienceProfessionnelleDynamicInput" />
        </div>
      </div>
    </div>
  </div>
</template>
