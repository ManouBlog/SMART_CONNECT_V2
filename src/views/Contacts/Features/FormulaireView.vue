<script>
import instance from "../../../api/api";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { mapActions } from "pinia";
export default {
  name: "FormulaireView",
  data() {
    return {
      formState: {
        nom: "",
        email: "",
        objet:"",
        message: "",
        prenoms:"",
      },
      isMsgSend:false,
      texte: "",
      texte2: "",
      texte3: "",
      texte4: "",
      texte5: "",
      text6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      text13: "",
      text14: "",
      text15: "",
      texte16: "",
    };
  },
  methods: {
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
     onFinish(values) {
      console.log("Success:", values);
      this.sendUsEmail();
    },
    onHandleFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
     sendUsEmail() {
      this.launchLoading(true);
      instance
        .post("sendUsEmail", this.formState)
        .then((res) => {
          console.log(res);
           this.isMsgSend = true;
          // if (res.data.status === true) {
          //   Swal.fire({
          //     icon: "success",
          //     title: res.data.message,
          //     showConfirmButton: false,
          //     timer: 3000,
          //   });
          // }
        })
        .catch((err) => {
          console.log(JSON.stringify(err,null,2))
          // Swal.fire({
          //   icon: "error",
          //   title: err.data.message,
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        })
        .finally(()=>{
          this.launchLoading(false);
        })
    },
  },

  async created() {
    this.texte4 = await this.handleTranslate("Soumettre");
    this.texte3 = await this.handleTranslate("Envoyez-nous un message");
    this.texte2 = await this.handleTranslate(
      "Contactez-nous et notre équipe se tient à votre disposition pour vous accompagner dans votre intégration."
    );
    // this.texte = await this.handleTranslate(
    //   "Vous avez pris la décision de vous lancer à la recherche d'un nouvel emploi.Nous sommes là pour vous accompagner dans cette belle aventure en vous facilitant l'accès à de nouvelles opportunités."
    // );
    this.texte5 = await this.handleTranslate("Entrez votre nom");
    this.text6 = await this.handleTranslate("Entrez votre adresse e-mail");
    this.texte7 = await this.handleTranslate("Objet");
    this.texte8 = await this.handleTranslate(
      "Dites-nous comment pouvons-nous vous aider?"
    );
    this.texte9 = await this.handleTranslate("MonBrobroli,");
    this.texte10 = await this.handleTranslate("un pont Géant");
    this.texte11 = await this.handleTranslate("qui vous connecte");
    this.texte12 = await this.handleTranslate("à votre cible.");
    this.text13 = await this.handleTranslate("Nom");
    this.text14 = await this.handleTranslate("Adresse e-mail");
    this.text15 = await this.handleTranslate("Objet");
    this.texte16 = await this.handleTranslate("Message");
    // console.log(this.texte);
  },
};
</script>
<template>
  <section class="conteneur_message_formulaire myconteneur">
    <div class="conteneur_message">
      <div>
        <h1 class="fw-bold">
          {{ texte9 }} <br />
          {{ texte10 }}<br />{{ texte11 }} <br />
          {{ texte12 }}
        </h1>
        <!-- <p>
          {{ this.texte }}
        </p> -->
        <h3>
          {{ texte2 }}
        </h3>
      </div>
      <div>
        <img src="../../../assets/sendmessage.png" alt="sendmessage" class="w-50" />
      </div>
    </div>
    <div class="conteneur_formulaire">
      <a-card  style="color: var(--third-color) !important; background: var(--secondary-color) !important">
        <h6 class="fw-bold">{{ texte3 }}</h6>
        <a-form
        v-if="!isMsgSend"
          :layout="'vertical'"
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onHandleFailed"
        >
          <a-form-item 
          :label="text13"
          :rules="[{ required: true, message: 'Ajoutez le nom' }]"
          name="nom"
          >
            <a-input :placeholder="texte5" v-model:value="formState.nom" />
          </a-form-item>
          <a-form-item 
          :label="'Prénoms'"
          :rules="[{ required: true, message: 'Ajoutez vos prénoms' }]"
          name="prenoms"
          >
            <a-input :placeholder="'Entrer vos prénoms'" v-model:value="formState.prenoms" />
          </a-form-item>

          <a-form-item 
          :label="text14" 
          name="email"
          :rules="[{ required: true, message: 'Ajoutez l\'adresse email' }]"
          >
            <a-input :placeholder="text6" v-model:value="formState.email" />
          </a-form-item>
          <a-form-item 
          :label="text15"
          name="objet"
          :rules="[{ required: true, message: 'Ajoutez un objet' }]"
           >
            <a-input :placeholder="texte7" v-model:value="formState.objet" />
          </a-form-item>

          <a-form-item 
          :label="texte16"
          name="message"
          :rules="[{ required: true, message: 'Ajoutez un message' }]"
          >
            <a-textarea style="height:150px;" 
            :placeholder="texte8" v-model:value="formState.message" />
          </a-form-item>

          <a-form-item>
            <div class="d-flex justify-content-center">
              <a-button type="primary" 
              shape="round" :size="'large'" html-type="submit">
                {{ texte4 }}</a-button
              >
            </div>
          </a-form-item>
        </a-form>
        <div class="card" v-else>
         Message envoyé
        </div>
      </a-card>

    </div>
  </section>
</template>
<style scoped>
@import "../../../Shared/styles/stylesShared.css";

h1 {
  color: var(--main-color) !important;
  text-align: left;
}
.conteneur_message {
  flex: 2 2 200px;
}
.conteneur_formulaire {
  flex: 1 1 200px;
}
.conteneur_message_formulaire {
  display: flex;
  justify-content: space-between;
  gap: 2em;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 2em;
}
.conteneur_message {
  display: flex;
  justify-content: center;
  gap: 2em;
  align-items: center;
  flex-wrap: wrap;
}
.conteneur_message p {
  text-align: justify;
}
.conteneur_message div {
  flex: 1 1 200px;
}
:deep(.ant-form-item-required){
  color:white !important;
}
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-form-item .ant-form-item-label >label){
  color:white !important;
}
</style>
