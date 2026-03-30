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
       valueTempsTravail: [
  { value: "Temps partiel", label: "Temps partiel" },
  { value: "Temps plein", label: "Temps plein" },
],
valueModeDeTravail: [
  { value: "Présentiel", label: "Présentiel" },
  { value: "Télétravail", label: "Télétravail" },
  { value: "Hybride", label: "Hybride" }
],
      user: "",
      emails_cc:[],
      lienPhoto: lienPhoto,
      StoreLoading: useLoadingSpinner(),
      itemsQualificationDynamicInput: [],
      documentLabels : {
  etudiant: "Nouvelle carte d'étudiant",
  professionnel: "Copie du diplôme",
  artisan: "Copie de la CNI",
  veteran: "Attestation de travail"
},
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
      dataStudentUpdated:null,
      allStatuses:[],
      form: {
      nom: "",
      prenoms: "",
      email: "",
      contact: "",
      phone: "",
      ville: "",
      commune: "",
      quartier: "",
      matricule_cc: "",
      forme_juridique: "",
      NCC: "",
      diplome: "",
      modeTravail: "",
      tempsTravail: "",
      titreCv: "",
      bio: "",
      gerant: "",
      numero_gerant: "",
      particulier_prenoms: "",
      statut_id:""
    },
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences"]),
    ...mapState(useInfoPersonnel, ["otherInfoPersonnelle"]),
  },
  methods: {
       initForm() {
    const user = this.$store.state.infoUserConnected;
    console.log("initForm",user)
    if (!user) return;

    this.form.nom = user.nom || "";
    this.form.prenoms = user.prenoms || "";
    this.form.email = user.email || "";
    this.form.contact = user.contact || "";
    this.form.phone = user.phone || "";
    this.form.ville = user.ville || "";
    this.form.commune = user.commune || "";
    this.form.quartier = user.quartier || "";
    this.form.statut_id = user.user.statut_id || "";

    this.form.matricule_cc = user.matricule_cc || "";
    this.form.forme_juridique = user.forme_juridique || "";
    this.form.NCC = user.NCC || "";

    this.form.diplome = user.diplome || "";

    this.form.modeTravail = user.modeTravail || "";
    this.form.tempsTravail = user.tempsTravail || "";

    this.form.titreCv = user.titreCv || "";
    this.form.bio = user.bio || "";

    this.form.gerant = user.gerant || "";
    this.form.numero_gerant = user.numero_gerant || "";

    this.form.particulier_prenoms = user.particulier_prenoms || "";
  },
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
    async lister_statut(){
      try {
        const response =  await instance.get("listStatut")
        console.log("lister_statut",response.data.data.filter(item=>item.statut != 'admin'))
        this.allStatuses = response.data.data.filter(item=>item.statut != 'admin')
      } catch (error) {
        console.log(error);
      }
    },
    async getInfoUser() {
      this.StoreLoading.launchLoading(true);
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          
          if (resp.data.status === true) {
            
        // console.log("getInfoUser25",resp.data.user)
        const statutUser = resp.data.user.user.statut.statut
        if(statutUser === 'entreprise'){
        this.emails_cc = resp.data.user.emails.map(item=> item.email_cc)
        this.$store.commit("UPDATE_INFO_CONPANY",resp.data.user);
        // console.log("COMPANY_INFOS",resp.data.user) 
        }
        if(statutUser === 'etudiant' || statutUser === 'professionnel' || statutUser === 'artisan' || statutUser === 'veteran'){
          resp.data.user.qualifications.map(item=>{
            return {
              date_debut:item.date_debut.split(' ')[0],
              date_fin:item.date_fin.split(' ')[0],
              objet:item.objet,
              detail:item.detail
            }
          });
          this.$store.commit("UPDATE_INFO_CONPANY",resp.data.user);
          
          // console.log("STUDENT_INFOS",resp.data.user) 
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
      // console.log("updateInfoStudent",Etudiants)
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
        modeTravail: Etudiants.modeTravail,
        tempsTravail:Etudiants.tempsTravail,
        competences:Etudiants?.competences?.length > 0 ? Help.retirerIdIntoArrayCompetence(Etudiants.competences):[],
      });
      // console.log("DATA UPDATE STUDENT",data)
      if(data.status){
        this.$store.commit("UPDATE_INFO_CONPANY",data.compte);
        this.changeValueForToogleModalInfoPersonnelle()
      }
    },
   async handleUpdate(payload) {
    console.log('handleUpdate',payload)
     
      if (this.$store.state.infoUserConnected.user.statut.statut === "entreprise") {
        this.updateInfoEntreprise(payload);
    
      } else if (this.$store.state.infoUserConnected.user.statut.statut === "particulier") {
        
        this.update_compte_particulier(payload);
          await this.getInfoUser();
      } else {
        this.updateInfoStudent(payload);
          await this.getInfoUser();
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
  mounted() {
  this.initForm();
},
  async created() {
    this.getCompetences();
    this.lister_statut();
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
            <label class="form-label">Statut</label>
            <select 
            name="statut_id" 
            id="statut_id"
            style="width:100%;padding:0.8em;border-radius: 10px;border:1.2px solid orange"
            v-model="form.statut_id"
            >
              <option 
              style="text-transform: capitalize;"
              :value="item.id"
              :key="item.id" 
              v-for="item in allStatuses">
                {{ item.statut }}
              </option>
            </select>
            <!-- <input v-model="form.diplome" class="form-control" type="text" /> -->
            </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">{{
            this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === "entreprise"
              ? "Raison sociale"
              : "Nom"
          }}</label>
          <input v-model="form.nom" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12" v-if='this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === "entreprise"'>
        <div class="mb-3">
          <label class="form-label"
            >RCCM (Registre du Commerce et du Crédit Mobilier)</label
          >
          <input v-model="form.matricule_cc" class="form-control" type="text" />
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
          <input v-model="form.forme_juridique" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12" v-if='this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === "entreprise"' >
        <div class="mb-3">
          <label class="form-label">NCC (Numéro de compte contribuable)</label>
          <input v-model="form.NCC" class="form-control" type="text" />
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
          <input v-model="form.contact" class="form-control" type="text" />
        </div>
      </div>
      <div
        class="col-md-12"
        v-if='this.$store.state.infoUserConnected && (
  this.$store.state.infoUserConnected.user.statut.statut === "etudiant" ||
  this.$store.state.infoUserConnected.user.statut.statut === "professionnel" ||
  this.$store.state.infoUserConnected.user.statut.statut === "artisan" ||
  this.$store.state.infoUserConnected.user.statut.statut === "veteran"
)
        '
      >
        <div class="mb-3">
          <label class="form-label">Prénoms</label>
          <input v-model="form.prenoms" class="form-control" type="text" />
        </div>
      </div>
      <div
        class="col-md-12"
        v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected.user.statut.statut === 'particulier'"
      >
        <div class="mb-3">
          <label class="form-label">Prénoms</label>
          <input v-model="form.particulier_prenoms" class="form-control" type="text" />
        </div>
      </div>

      <div class="col-md-12" v-if="this.$store.state.infoUserConnected">
        <div class="mb-3">
          <label class="form-label">{{
            this.$store.state.infoUserConnected.user.statut.statut == "entreprise"
              ? "Contact mail de l'entreprise"
              : "Email"
          }}</label>
          <input v-model="form.email" class="form-control" type="email" />
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
        v-if='this.$store.state.infoUserConnected && (
  this.$store.state.infoUserConnected.user.statut.statut === "etudiant" ||
  this.$store.state.infoUserConnected.user.statut.statut === "professionnel" ||
  this.$store.state.infoUserConnected.user.statut.statut === "artisan" ||
  this.$store.state.infoUserConnected.user.statut.statut === "veteran"
)
        '
      >
        <div class="mb-3">
          <label class="form-label">Contact</label>
          <input v-model="form.phone" class="form-control" type="text" />
        </div>
      </div>

      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Ville</label>
          <input v-model="form.ville" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Commune</label>
          <input v-model="form.commune" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Quartier</label>
          <input v-model="form.quartier" class="form-control" type="text" />
        </div>
      </div>
      <section v-if='this.$store.state.infoUserConnected && (
  this.$store.state.infoUserConnected.user.statut.statut === "etudiant" ||
  this.$store.state.infoUserConnected.user.statut.statut === "professionnel" ||
  this.$store.state.infoUserConnected.user.statut.statut === "artisan" ||
  this.$store.state.infoUserConnected.user.statut.statut === "veteran"
)
        '>
      
        <div class="col-md-12">
          <div class="mb-3" v-if="this.$store.state.infoUserConnected.user.statut.statut === 'etudiant'">
            <label class="form-label">Dernier diplôme academique</label>
            <input v-model="form.diplome" class="form-control" type="text" />
          </div>
          <div class="mb-3" v-if="this.$store.state.infoUserConnected.user.statut.statut === 'professionnel'">
            <div>
     <label class="form-label">Niveau actuel + diplome</label>
            <input v-model="form.diplome" class="form-control" type="text" />
            </div>

            <div>
              <!-- {{ this.$store.state.infoUserConnected }} -->
            <label class="form-label">Mode de travail</label>
            <select 
            name="mode_travail1" 
            id="mode_travail1"
          style="width:100%;padding:0.8em;border-radius: 10px;border:1.2px solid orange"
            v-model="form.modeTravail"
            >
              <option value="">Séléctionne un mode de travail</option>
              <option 
              :value="item.value"
              :key="item.value" 
              v-for="item in valueModeDeTravail">
                {{ item.label }}
              </option>
            </select>
            </div>
            <div>
            <label class="form-label">Temps de travail</label>
            <select 
            name="time_work" 
            id="time_work"
            style="width:100%;padding:0.8em;border-radius: 10px;border:1.2px solid orange"
            v-model="form.tempsTravail"
            >
              <option value="">Séléctionne un temps de travail</option>
              <option 
              :value="item.value"
              :key="item.value" 
              v-for="item in valueTempsTravail">
                {{ item.label }}
              </option>
            </select>
            <!-- <input v-model="form.diplome" class="form-control" type="text" /> -->
            </div>
       
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
            <input v-model="form.titreCv" class="form-control" type="text" />
          </div>
        </div>
      </section>
      <section v-if='this.$store.state.infoUserConnected && (
  this.$store.state.infoUserConnected.user.statut.statut === "etudiant" ||
  this.$store.state.infoUserConnected.user.statut.statut === "professionnel" ||
  this.$store.state.infoUserConnected.user.statut.statut === "artisan" ||
  this.$store.state.infoUserConnected.user.statut.statut === "veteran"
)
        '>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Biographie – résumé de votre profil (max 300 caractères)</label>
            <textarea
              id="msg"
              name="msg"
              maxlength="300"
              style="width: 100%; border-radius: 5px; height: 100px"
              placeholder="Présentez-vous en quelques lignes..."
              v-model="form.bio"
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
            <input v-model="form.gerant" class="form-control" type="text" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Numéro téléphonique du Gérant</label>
            <input v-model="form.numero_gerant" class="form-control" type="text" />
          </div>
        </div>
      </section>

      <div class="col-md-12">
        <div class="my-3">
          <label for="add_file">
  {{
    documentLabels[
      this.$store.state.infoUserConnected?.user?.statut?.statut
    ] || "Nouvelle pièce du gérant (jpg,png)"
  }}
</label>
         
          <input
            type="file"
            multiple
            @input="addAnPieceDoc"
            id="add_file_piece"
            class="w-100"
          />
        </div>
      </div>
      
    </div>
    <div class="text-right">
      <button
        class="btn bg-warning"
        style="border: none"
        @click.prevent="handleUpdate(this.form)"
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
