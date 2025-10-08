<script>
import instance, { lienPhoto } from "../../../../../api/api";
import VueMultiselect from "vue-multiselect";
import { mapActions, mapState } from "pinia";
import { Help } from "../../../../../utils";
import { useLoadingSpinner } from "../../../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
import { useInfoPersonnel } from "../../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";

export default {
  name: "InfoForModifyEntreprises",
  components: {
    VueMultiselect,
  },
  data() {
    return {
      user: "",
      lienPhoto: lienPhoto,
      StoreLoading: useLoadingSpinner(),
      itemsQualificationDynamicInput: [],
      placeholderDynamicInput: ["05-02-2020", "05-03-2025"],
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences"]),
    ...mapState(useInfoPersonnel, ["otherInfoPersonnelle"]),
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
      console.log(
        "this.itemsQualificationDynamicInput",
        this.itemsQualificationDynamicInput
      );
     
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
        qualifications: this.itemsQualificationDynamicInput,
        competences: Help.retirerIdIntoArrayCompetence(Etudiants.competences),
      });
    },
    handleUpdate(user) {
      if (this.user.user.statut.statut === "entreprise") {
        this.updateInfoEntreprise(user);
      } else if(this.user.user.statut.statut === "particulier"){
        const data={
          commune:user.commune,
          contact:user.contact,
          nom:user.nom,
          particulier_prenoms:user.particulier_prenoms,
          quartier:user.quartier,
        }
        console.log("updateInfoParticulier",data)
        // this.updateInfoParticulier(user);
      }else{
        this.updateInfoStudent(user);
      }
      this.getInfoUser();
    },
    onCreateQualification() {
      return { detail: "", date_debut: new Date(), date_fin: new Date() };
    },
    handleInputInput(valueDate) {
      console.log("valueDate", valueDate);
      // console.log("itemsQualificationDynamicInput",this.itemsQualificationDynamicInput)
    },
    handleInputChange(valueDate) {
      console.log("valueDate", valueDate);
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
      <legend>
        Info personnelle
        {{
          this.user &&
          (this.user.user.statut.statut === "entreprise" ||
            this.user.user.statut.statut === "particulier")
            ? "sur l'entreprise"
            : null
        }}
      </legend>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">{{ this.user && this.user.user.statut.statut === "entreprise" ?
          'Raison sociale':'Nom' 
          }}</label>
          <input v-model="user.nom" class="form-control" type="text" />
        </div>
      </div>
      <div
        class="col-md-12"
        v-if="this.user && this.user.user.statut.statut === 'etudiant'"
      >
        <div class="mb-3">
          <label class="form-label">Prénoms</label>
          <input v-model="user.prenoms" class="form-control" type="text" />
        </div>
      </div>
      <div
        class="col-md-12"
        v-if="this.user && this.user.user.statut.statut === 'particulier'"
      >
        <div class="mb-3">
          <label class="form-label">Prénoms</label>
          <input v-model="user.particulier_prenoms" class="form-control" type="text" />
        </div>
      </div>

      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="user.email" class="form-control" type="email" />
        </div>
      </div>
      <div class="col-md-12" v-if="this.user && this.user.user.statut.statut === 'etudiant'">
        <div class="mb-3">
          <label class="form-label">Contact</label>
          <input v-model="user.phone" class="form-control" type="text" />
        </div>
      </div>
       <div class="col-md-12" v-if="this.user && (this.user.user.statut.statut == 'entreprise' || this.user.user.statut.statut == 'particulier')">
        <div class="mb-3">
          <label class="form-label">Contact téléphonique</label>
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
      <section v-if="this.user && this.user.user.statut.statut === 'etudiant'">
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
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Dernier diplôme academique</label>
            <input v-model="user.diplome" class="form-control" type="text" />
          </div>
        </div>
      </section>
      <section v-if="this.user && this.user.user.statut.statut === 'etudiant'">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Bio (max 300 caractères)</label>
            <textarea
              id="msg"
              name="msg"
              maxlength="300"
              style="width: 100%; border-radius: 5px; height: 100px"
              placeholder="Présentez-vous en quelques lignes..."
              v-model="user.bio"
            ></textarea>
          </div>
        </div>
      </section>
      <section v-if="this.user && this.user.user.statut.statut === 'entreprise'">
        
       
        <div class="col-md-12">
          <div class="my-3">
            <label for="add_file_logo">Logo</label>
            <input type="file" @input="addAnLogo" id="add_file_logo" class="w-100" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">RCCM (Registre du Commerce et du Crédit Mobilier)</label>
            <input v-model="user.matricule_cc" class="form-control" type="text" />
          </div>
            <div class="my-3">
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
            <label class="form-label">Forme juridique</label>
            <input v-model="user.forme_juridique" class="form-control" type="text" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">NCC (Numéro de compte contribuable)</label>
            <input v-model="user.NCC" class="form-control" type="text" />
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
          <label for="add_file">
            {{
              this.user && this.user.user.statut.statut === "etudiant"
                ? "Nouvelle carte étudiant"
                : "Nouvelle pièce d'identité"
            }}</label
          >
          <input 
          type="file"
          multiple
          @input="addAnPieceDoc" 
          id="add_file_piece" 
          class="w-100" 
          />
        </div>
      </div>
      <div class="col-md-12" v-if="this.user && this.user.user.statut.statut === 'etudiant'">
        <div class="my-3">
          <label class="form-label">Qualifications</label>
          <n-dynamic-input
            v-model:value="itemsQualificationDynamicInput"
            :on-create="onCreateQualification"
          >
            <template #create-button-default>
              <slot name="create-button">Ajouter des qualifications</slot>
            </template>
            <template #default="{ value }">
              <div
                style="
                  display: flex;
                  align-items: center;
                  width: 100%;
                  gap: 1em;
                  flex-direction: column;
                "
              >
                <div style="display: flex; width: 100%; gap: 1em">
                  <input style="width: 100%" type="date" v-model="value.date_debut">
                  <p>À</p>
                  <input style="width: 100%" type="date" v-model="value.date_fin">
                </div>

                <textarea
                  id="msg"
                  name="msg"
                  maxlength="300"
                  style="width: 100%; border-radius: 5px; padding: 1em"
                  placeholder="Détails (max 300 caractères)"
                  v-model="value.detail"
                ></textarea>
              </div>
            </template>
          </n-dynamic-input>
        </div>
      </div>
    </div>
    <div class="text-right">
      <button
        class="btn-lg bg-warning"
        style="border: none"
        @click.prevent="handleUpdate(user)"
      >
        Modifier
      </button>
    </div>
  </div>
</template>
<style scoped>
:deep(.n-input__input-el:hover) {
  color: orange !important;
}
</style>
