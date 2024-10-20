<script>
import VueMultiselect from "vue-multiselect";
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
export default {
  name: "RegsiterStudents",
  components: {
    VueMultiselect,
    Politics,
  },
  data() {
    return {
      open: true,
      formState: {
        nom: "",
        prenoms: "",
        phone: "",
        ville: "",
        commune: "",
        quartier: "",
        diplome: "",
        carte_student: "",
        myCompetence: [],
      },
      verifChiffre: /[!@#$%^&*(),.?":{}|<>_-]/,
      competences: [],
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
  },
  methods: {
    onFinish(values) {
      console.log("Success:", values);
      console.log("formState",this.formState)
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
      console.log("formState",this.formState)
    },
    handleChangeCardStudent(value) {
      console.log(value.file.originFileObj);
    },
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      getCompetences: "getAllCompetences",
    }),
  },
  created() {
    this.getCompetences();
  },
};
</script>
<template>
  <Politics v-if="isPolitics" :registreUser="inscriptionUser" :status="status" />
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Nom"
      name="nom"
      :rules="[{ required: true, message: 'Veuillez renseigner votre nom!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      label="Prénoms"
      name="prénoms"
      :rules="[{ required: true, message: 'Veuillez renseigner vos Prénoms!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>

    <a-form-item
      label="Contact"
      name="contact"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Contact!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item label="Ville" name="ville">
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item label="Commune" name="commune">
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item label="Quartier" name="quartier">
      <a-input v-model:value="formState.nom" />
    </a-form-item>

    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Veuillez renseigner votre email!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item label="Compétences" name="Compétences">
      <VueMultiselect
        v-model="formState.myCompetence"
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
    </a-form-item>
    <a-form-item
      label="Diplôme"
      name="diplôme"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Diplôme!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item name="Carte étudiante" label="Carte étudiante">
      <a-upload
        @change="handleChangeCardStudent"
        v-model:fileList="formState.upload"
        name="logo"
        list-type="picture"
      >
        <a-button>
          <template #icon><UploadOutlined /></template>
          Click to upload
        </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item
      label="Mot de passe"
      name="mot de passe"
      :rules="[{ required: true, message: 'Veuillez renseigner votre mot de passe!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <a-form-item>
      <h5 style="margin: 1em 0">Votre mot de passe doit contenir:</h5>
      <ul style="padding: 0 2em">
        <li>
          <span class="d-block password_length"
            >Au moins 8 caractères
            <i
              v-if="formState.password && formState.password.length > 8"
              class="bi bi-check-lg"
            ></i>
          </span>
        </li>
        <li>
          <span class="d-block password_length"
            >Une lettre majuscule
            <i
              v-if="formState.password && /[A-Z]/.test(formState.password)"
              class="bi bi-check-lg"
            ></i>
          </span>
        </li>
        <li>
          <span class="d-block password_length"
            >Une lettre miniscule
            <i
              v-if="formState.password && /[a-z]/.test(formState.password)"
              class="bi bi-check-lg"
            ></i>
          </span>
        </li>
        <li>
          <span class="d-block password_length"
            >Un chiffre
            <i v-if="/\d/.test(formState.password)" class="bi bi-check-lg"> </i>
          </span>
        </li>
        <li>
          <span class="d-block password_length"
            >Un caractère spécial
            <i v-if="verifChiffre.test(formState.password)" class="bi bi-check-lg"></i>
          </span>
        </li>
      </ul>
    </a-form-item>
    <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item> -->
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" shape="round" :size="'large'" html-type="submit">
          S'inscrire</a-button
        >
      </div>
    </a-form-item>
  </a-form>

  <!-- <div id="register-account" class="tab-pane fade in white-text">
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 zero-padding-left">
      <form name="contact_us" class="contact_us" @submit.prevent="registerUser">
      
        <div
          class="w-100 text-left"
          v-if="status == 'student' || status == 'particulier'"
        >
          <Span :name="'Nom'" :isFacultatif="false" />
          <input type="text" class="w-100 my-3" v-model="nom" />
        </div>
        <div
          class="w-100 text-left"
          v-if="status == 'student' || status == 'particulier'"
        >
          <Span :name="'Prénoms'" :isFacultatif="false" />
          <input type="text" class="w-100 my-3" v-model="prenoms" />
        </div>
        <div class="w-100 text-left" v-if="status">
          <Span :name="'Contact'" :isFacultatif="false" />
          <input class="w-100 my-3" type="text" v-model="phone" pattern="[0-9]{10}" />
          <strong v-if="phone && !isPhoneCi(this.phone)"
            >Le numéro doit être un numéro valide 10 chiffres(ex:** ** ** ** **)</strong
          >
        </div>
        <div class="w-100 text-left" v-if="status">
          <Span :name="'Ville'" :isFacultatif="false" />
          <input type="text" class="w-100 my-3" v-model="ville" />
        </div>
        <div class="w-100 text-left" v-if="status">
          <Span :name="'Commune'" :isFacultatif="false" />
          <input type="text" class="w-100 my-3" v-model="commune" />
        </div>
        <div class="w-100 text-left" v-if="status">
          <Span :name="'Quartier'" :isFacultatif="true" />
          <input type="text" class="w-100 my-3" v-model="quartier" />
        </div>
        <div class="w-100 text-left" v-if="status == 'student'">
          <Span :name="'Diplôme'" :isFacultatif="true" />
          <input class="w-100 my-3" type="text" v-model="diplome" />
        </div>
        <div class="w-100 text-left" v-if="status == 'student'">
          <Span :name="'Carte étudiante'" :isFacultatif="false" />
          <input type="file" @change="see" class="w-100 my-3" accept="*" />
        </div>
        <div class="w-100 my-2 text-left" v-if="status == 'student'">
          <Span :name="'Compétence'" :isFacultatif="false" />
          <VueMultiselect
            v-model="competence"
            :options="competences"
            :multiple="true"
            :taggable="true"
            :tag="addTag"
            @update:model-value="addTag"
            label="competence"
            track-by="competence"
            class="vuemulti"
          >
          </VueMultiselect>
        </div>

        <div class="w-100 text-left" v-if="status">
          <Span
            :name="status === 'entreprise' ? 'Email de l\'Entreprise' : 'Email'"
            :isFacultatif="false"
          />
          <input type="email" name="email" class="w-100 my-3" v-model="email" />
        </div>

        <div class="w-100 text-left" v-if="status">
          <Span :name="'Mot de passe'" :isFacultatif="false" />
          <input
            type="password"
            name="password"
            id="password"
            class="w-100 my-3"
            v-model="password"
          />
          <p class="fw-bold">
            Votre mot de passe doit contenir:
            <span class="d-block password_length"
              >Au moins 8 caractères
              <i v-if="password && password.length > 8" class="bi bi-check-lg"></i>
            </span>
            <span class="d-block password_length"
              >Une lettre majuscule
              <i v-if="password && /[A-Z]/.test(password)" class="bi bi-check-lg"></i>
            </span>
            <span class="d-block password_length"
              >Une lettre miniscule
              <i v-if="password && /[a-z]/.test(password)" class="bi bi-check-lg"></i>
            </span>
            <span class="d-block password_length"
              >Un chiffre
              <i v-if="/\d/.test(password)" class="bi bi-check-lg"> </i>
            </span>

            <span class="d-block password_length"
              >Un caractère spécial
              <i v-if="verifChiffre.test(password)" class="bi bi-check-lg"></i>
            </span>
          </p>
        </div>

        <div class="form-group condition">
          <div v-if="isAcceptPolitic">
            <Politics :registreUser="inscriptionUser" :status="status" />
          </div>
        </div>

        <div
          class="form-group submit"
          :class="checkboxDate == false ? 'd-none' : ''"
          v-if="status"
        >
          <button
            :disabled="showLoader ? true : false"
            type="submit"
            class="bg-lg bg-second"
          >
            {{ showLoader ? "loading..." : `S'inscrire` }}
          </button>
        </div>
      </form>
    </div>
  </div> -->
</template>
<style
  src="../../../../../../node_modules/vue-multiselect/dist/vue-multiselect.css"
></style>
