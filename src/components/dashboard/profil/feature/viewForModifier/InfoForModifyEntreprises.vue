<script>
import instance, { lienPhoto } from "../../../../../api/api";
// import VueMultiselect from "vue-multiselect";
import { mapActions, mapState } from "pinia";
import { Help } from "../../../../../utils";
import { useLoadingSpinner } from "../../../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
import { useInfoPersonnel } from "../../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";

export default {
  name: "InfoForModifyEntreprises",
  components: {
    // VueMultiselect,
  },
  data() {
    return {
      user: "",
      emails_cc:[],
      lienPhoto: lienPhoto,
      StoreLoading: useLoadingSpinner(),
      itemsQualificationDynamicInput: [],
      placeholderDynamicInput: ["05-02-2020", "05-03-2025"],
      westAfricaCodes: [
        { label: "Bénin", value: "+229" },
        { label: "Burkina Faso", value: "+226" },
        { label: "Cap-Vert", value: "+238" },
        { label: "Côte d’Ivoire", value: "+225" },
        { label: "Gambie", value: "+220" },
        { label: "Ghana", value: "+233" },
        { label: "Guinée", value: "+224" },
        { label: "Guinée-Bissau", value: "+245" },
        { label: "Liberia", value: "+231" },
        { label: "Mali", value: "+223" },
        { label: "Niger", value: "+227" },
        { label: "Nigeria", value: "+234" },
        { label: "Sénégal", value: "+221" },
        { label: "Sierra Leone", value: "+232" },
        { label: "Togo", value: "+228" },
      ],
      countryCode:null,
      dataStudentUpdated:null
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
      "update_compte_particulier",
      "update_compte_student",
      "addAnRegistreDoc",
      "addAnPieceDoc",
      "addAnLogo",
      "changeValueForToogleModalInfoPersonnelle"
    ]),
    async getInfoUser() {
      this.StoreLoading.launchLoading(true);
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          
          if (resp.data.status === true) {
            
        console.log("getInfoUser25",resp.data.user)
        const statutUser = resp.data.user.user.statut.statut
        if(statutUser === 'entreprise'){
        this.emails_cc = resp.data.user.emails.map(item=> item.email_cc)
        this.$store.commit("UPDATE_INFO_CONPANY",resp.data.user);
        console.log("COMPANY_INFOS",resp.data.user) 
        }
        if(statutUser === 'etudiant'){
          resp.data.user.qualifications.map(item=>{
            return {
              date_debut:item.date_debut.split(' ')[0],
              date_fin:item.date_fin.split(' ')[0],
              objet:item.objet,
              detail:item.detail
            }
          });
          this.$store.commit("UPDATE_INFO_CONPANY",resp.data.user);
          
          console.log("STUDENT_INFOS",resp.data.user) 
          }
            // console.log("this.emails_cc",this.emails_cc)
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.StoreLoading.launchLoading(false);
        });
    },

    async updateInfoEntreprise(company) {
      
      const data = await this.update_compte_entreprise({
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
        email_cc:this.emails_cc.length ? this.emails_cc:[]
      });
      if(data.status){
        this.$store.commit("UPDATE_INFO_CONPANY",data.data);
        // this.$store.state.infoUserConnected = this.$store.state.infoUserConnected;
        this.changeValueForToogleModalInfoPersonnelle({ isCv: false, isbtnPdf: false })
      }
      // console.log("COMPANY_UPDATE",this.$store.state.infoUserConnected)
    },
    async updateInfoStudent(Etudiants) {
      console.log("updateInfoStudent",Etudiants)
      const data = await this.update_compte_student({
        nom: Etudiants.nom,
        email: Etudiants.email,
        prenoms: Etudiants.prenoms,
        commune: Etudiants.commune,
        quartier: Etudiants.quartier,
        contact: Etudiants.phone,
        ville: Etudiants.ville,
        bio: Etudiants.bio,
        diplome: Etudiants.diplome,
        titreCv: Etudiants.titreCv,
        // qualifications: Etudiants.qualifications,
        competences: Help.retirerIdIntoArrayCompetence(Etudiants.competences),
      });
      // console.log("DATA UPDATE STUDENT",data)
      if(data.status){
        this.$store.commit("UPDATE_INFO_CONPANY",data.compte);
        this.changeValueForToogleModalInfoPersonnelle()
      }
    },
   async handleUpdate(payload) {
     
      if (this.$store.state.infoUserConnected.user.statut.statut === "entreprise") {
        this.updateInfoEntreprise(payload);
    
      } else if (this.$store.state.infoUserConnected.user.statut.statut === "particulier") {
        
        this.update_compte_particulier(payload);
          await this.getInfoUser();
      } else {
        this.updateInfoStudent(payload);
          // await this.getInfoUser();
      }
    
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
  async created() {
    this.getCompetences();
    await this.getInfoUser();
  },
};
</script>
<template>
  <div class="card-body text-left py-4" v-if="this.$store.state.infoUserConnected">
    <div class="row">
      <legend>
        Info personnelle
        {{
          this.$store.state.infoUserConnected &&
          (this.$store.state.infoUserConnected.user.statut.statut === "entreprise" ||
            this.$store.state.infoUserConnected.user.statut.statut === "particulier")
            ? "sur l'entreprise"
            : null
        }}
      </legend>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">{{
            this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === "entreprise"
              ? "Raison sociale"
              : "Nom"
          }}</label>
          <input v-model="this.$store.state.infoUserConnected.nom" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12" v-if='this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === "entreprise"'>
        <div class="mb-3">
          <label class="form-label"
            >RCCM (Registre du Commerce et du Crédit Mobilier)</label
          >
          <input v-model="this.$store.state.infoUserConnected.matricule_cc" class="form-control" type="text" />
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
      <div class="col-md-12" v-if='this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === "entreprise"'>
        <div class="mb-3">
          <label class="form-label">Forme juridique</label>
          <input v-model="this.$store.state.infoUserConnected.forme_juridique" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12" v-if='this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === "entreprise"' >
        <div class="mb-3">
          <label class="form-label">NCC (Numéro de compte contribuable)</label>
          <input v-model="this.$store.state.infoUserConnected.NCC" class="form-control" type="text" />
        </div>
      </div>
      <div
        class="col-md-12"
        v-if="
          this.$store.state.infoUserConnected &&
          (this.$store.state.infoUserConnected.user.statut.statut == 'entreprise' ||
            this.$store.state.infoUserConnected.user.statut.statut == 'particulier')
        "
      >
        <div class="mb-3">
          <label class="form-label">{{
            this.$store.state.infoUserConnected.user.statut.statut == "entreprise"
              ? "Contact téléphonique de l'entreprise"
              : "Contact téléphonique"
          }}</label>
          <input v-model="this.$store.state.infoUserConnected.contact" class="form-control" type="text" />
        </div>
      </div>
      <div
        class="col-md-12"
        v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'"
      >
        <div class="mb-3">
          <label class="form-label">Prénoms</label>
          <input v-model="this.$store.state.infoUserConnected.prenoms" class="form-control" type="text" />
        </div>
      </div>
      <div
        class="col-md-12"
        v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === 'particulier'"
      >
        <div class="mb-3">
          <label class="form-label">Prénoms</label>
          <input v-model="this.$store.state.infoUserConnected.particulier_prenoms" class="form-control" type="text" />
        </div>
      </div>

      <div class="col-md-12" v-if="this.$store.state.infoUserConnected">
        <div class="mb-3">
          <label class="form-label">{{
            this.$store.state.infoUserConnected.user.statut.statut == "entreprise"
              ? "Contact mail de l'entreprise"
              : "Email"
          }}</label>
          <input v-model="this.$store.state.infoUserConnected.email" class="form-control" type="email" />
        </div>
      </div>
      <div class="col-md-12 my-2" 
      v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut == 'entreprise'">
      <label class="form-label">Emails secondaires(cc)</label>
      <n-dynamic-input
       v-model:value="emails_cc"
         placeholder="Ajouter un email en copie"
  :max="6"
  :item-style="{
    borderColor: 'gray'
  }"
/>
      </div>
  
      <div
        class="col-md-12"
        v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'"
      >
        <div class="mb-3">
          <label class="form-label">Contact</label>
          <!-- <a-form-item
      :label="texte2"
      name="phone"
      :rules="[{ required: true, message: texte15 }]"
    >
      <a-input
        type="tel"
        v-model:value="this.$store.state.infoUserConnected.phone"
        placeholder="Entrez votre numéro téléphonique"
      >
        <template #addonBefore>
          <a-select
            v-model:value="countryCode"
            :options="westAfricaCodes"
            show-search
            option-filter-prop="label"
            option-label-prop="value"
            style="width: 120px"
          />
        </template>
      </a-input>
    </a-form-item> -->
          <input v-model="this.$store.state.infoUserConnected.phone" class="form-control" type="text" />
        </div>
      </div>

      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Ville</label>
          <input v-model="this.$store.state.infoUserConnected.ville" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Commune</label>
          <input v-model="this.$store.state.infoUserConnected.commune" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Quartier</label>
          <input v-model="this.$store.state.infoUserConnected.quartier" class="form-control" type="text" />
        </div>
      </div>
      <section v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'">
        <!-- <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Compétences</label>
            <VueMultiselect
              v-model="this.$store.state.infoUserConnected.competences"
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
        </div> -->
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Dernier diplôme academique</label>
            <input v-model="this.$store.state.infoUserConnected.diplome" class="form-control" type="text" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label"
              >Mon Profil
              <small class="text-muted"
                >(ex. : Développeur Web, Designer UX, etc.)</small
              ></label
            >
            <input v-model="this.$store.state.infoUserConnected.titreCv" class="form-control" type="text" />
          </div>
        </div>
      </section>
      <section v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Bio (max 300 caractères)</label>
            <textarea
              id="msg"
              name="msg"
              maxlength="300"
              style="width: 100%; border-radius: 5px; height: 100px"
              placeholder="Présentez-vous en quelques lignes..."
              v-model="this.$store.state.infoUserConnected.bio"
            ></textarea>
          </div>
        </div>
      </section>
      <section v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === 'entreprise'">
        <div class="col-md-12">
          <div class="my-3">
            <label for="add_file_logo">Logo</label>
            <input type="file" @input="addAnLogo" id="add_file_logo" class="w-100" />
          </div>
        </div>

        <legend>Info sur le gérant</legend>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Gérant</label>
            <input v-model="this.$store.state.infoUserConnected.gerant" class="form-control" type="text" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Numéro téléphonique du Gérant</label>
            <input v-model="this.$store.state.infoUserConnected.numero_gerant" class="form-control" type="text" />
          </div>
        </div>
      </section>

      <div class="col-md-12">
        <div class="my-3">
          <label for="add_file">
            {{
              this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === "etudiant"
                ? "Nouvelle carte étudiant"
                : "Nouvelle pièce du gérant (jpg,png,webp,pdf)"
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
      <!-- <div
        class="col-md-12"
        v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'"
      >
        <div class="my-3">
          <label class="form-label">Qualifications</label>
           <n-dynamic-input
              v-model:value="this.$store.state.infoUserConnected.qualifications"
              :on-create="onCreateQualification"
            >
              
              <template #create-button-default>
                <slot name="create-button"> Ajouter des qualifications </slot>
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
                  <div style="width: 100%">
                    <label for="objet">Diplôme</label>
                    <input
                      type="text"
                      class="input_class"
                      id="objet"
                      v-model="value.objet"
                    />
                  </div>

                  <div style="width: 100%">
                    <label for="periode">Période</label>
                    <div style="display: flex; gap: 1em; align-items: center">
                      <input
                        type="date"
                        class="input_class"
                        id="periode"
                        
                        v-model="value.date_debut"
                      />
                      <p>À</p>
                      <input type="date" 
                      :min="value.date_debut"
                      class="input_class" v-model="value.date_fin" />
                    </div>
                  </div>
                  <div style="width: 100%;">
                    <label for="description">Description (max 300 caractères)</label>
                    <textarea
                      maxlength="300"
                      id="description"
                      style="
                        width: 100%;
                        border-radius: 5px;
                        padding: 0.5em;
                        border: 1px solid gray;
                      "
                      v-model="value.detail"
                    ></textarea>
                  </div>
                </div>
              </template>
            </n-dynamic-input>
        </div>
      </div> -->
    </div>
    <div class="text-right">
      <button
        class="btn bg-warning"
        style="border: none"
        @click.prevent="handleUpdate(this.$store.state.infoUserConnected)"
      >
        Modifier
      </button>
    </div>
  </div>
  <div v-else style="text-align:center;">
   Chargement...
  </div>
</template>
<style scoped>
.input_class {
  width: 100%;
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid gray;
}
:deep(.n-input__input-el:hover) {
  color: orange !important;
}
.form-control {
  padding: 1.5em !important;
  border-radius: 10px !important;
}
</style>
