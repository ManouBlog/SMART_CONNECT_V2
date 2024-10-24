<script>
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { mapActions } from "pinia";
export default {
  name: "FormulaireView",
  data() {
    return {
      formState: {
        username: "",
        password: "",
        remember: true,
        desc: "",
      },
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
    ...mapActions(useTranslateStore, ["handleTranslate"]),
  },

  async created() {
    this.texte4 = await this.handleTranslate("Soumettre");
    this.texte3 = await this.handleTranslate("Envoyez-nous un message");
    this.texte2 = await this.handleTranslate(
      "Contactez-nous et faites-nous savoir comment nous pouvons vous aider à simplifier votre recherche d'emploi. Notre équipe sera ravie de vous lire et de répondre à toutes vos questions.."
    );
    this.texte = await this.handleTranslate(
      "Vous avez pris la décision de vous lancer à la recherche d'un nouvel emploi.Nous sommes là pour vous accompagner dans cette belle aventure en vous facilitant l'accès à de nouvelles opportunités."
    );
    this.texte5 = await this.handleTranslate("Entrez votre nom");
    this.text6 = await this.handleTranslate("Entrez votre adresse e-mail");
    this.texte7 = await this.handleTranslate("Sélectionnez la raison de votre contact");
    this.texte8 = await this.handleTranslate(
      "Dites-nous comment pouvons nous vous aider."
    );
    this.texte9 = await this.handleTranslate("Nous");
    this.texte10 = await this.handleTranslate("sommes");
    this.texte11 = await this.handleTranslate("là pour vous");
    this.texte12 = await this.handleTranslate("aider.");
    this.text13 = await this.handleTranslate("Nom");
    this.text14 = await this.handleTranslate("Adresse e-mail");
    this.text15 = await this.handleTranslate("Raison du contact");
    this.texte16 = await this.handleTranslate("Message");
    console.log(this.texte);
  },
};
</script>
<template>
  <section class="conteneur_message_formulaire">
    <div class="conteneur_message">
      <div>
        <h1 class="fw-bold">
          {{ texte9 }} <br />
          {{ texte10 }}<br />{{ texte11 }} <br />
          {{ texte12 }}
        </h1>
        <p>
          {{ this.texte }}
        </p>
        <p>
          {{ texte2 }}
        </p>
      </div>
      <div>
        <img src="../../../assets/sendmessage.png" alt="sendmessage" class="w-50" />
      </div>
    </div>
    <div class="conteneur_formulaire">
      <a-card style="width: auto; background: rgba(179, 201, 255, 0.38)">
        <h6 class="fw-bold">{{ texte3 }}</h6>
        <a-form
          :layout="'vertical'"
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item :label="text13" name="nom">
            <a-input :placeholder="texte5" v-model:value="formState.username" />
          </a-form-item>

          <a-form-item :label="text14" name="Adresse e-mail">
            <a-input :placeholder="text6" v-model:value="formState.password" />
          </a-form-item>
          <a-form-item :label="text15" name="Raison du contact">
            <a-input :placeholder="texte7" v-model:value="formState.password" />
          </a-form-item>

          <a-form-item :label="texte16">
            <a-textarea :placeholder="texte8" v-model:value="formState.desc" />
          </a-form-item>

          <a-form-item>
            <div class="d-flex justify-content-center">
              <a-button type="primary" shape="round" :size="'large'" html-type="submit">
                {{ texte4 }}</a-button
              >
            </div>
          </a-form-item>
        </a-form>
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
</style>
