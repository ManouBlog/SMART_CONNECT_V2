<script>
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
    };
  },
};
</script>
<template>
  <section class="conteneur_message_formulaire">
    <div class="conteneur_message">
      <div>
        <h1 class="fw-bold">
          Nous <br />
          sommes <br />là pour vous <br />
          aider.
        </h1>
        <p>
          Vous avez pris la décision de vous lancer à la recherche d'un nouvel emploi.
          Nous sommes là pour vous accompagner dans cette belle aventure en vous
          facilitant l'accès à de nouvelles opportunités.
        </p>
        <p>
          Contactez-nous et faites-nous savoir comment nous pouvons vous aider à
          simplifier votre recherche d'emploi. Notre équipe sera ravie de vous lire et de
          répondre à toutes vos questions.
        </p>
      </div>
      <div>
        <img src="../../../assets/sendmessage.png" alt="sendmessage" class="w-50" />
      </div>
    </div>
    <div class="conteneur_formulaire">
      <a-card style="width: auto; background: rgba(179, 201, 255, 0.38)">
        <h6 class="fw-bold">Envoyez-nous un message</h6>
        <a-form
          :layout="'vertical'"
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item label="Nom" name="nom">
            <a-input placeholder="Entrez votre nom" v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="Adresse e-mail" name="Adresse e-mail">
            <a-input
              placeholder="Entrez votre adresse e-mail"
              v-model:value="formState.password"
            />
          </a-form-item>
          <a-form-item label="Raison du contact" name="Raison du contact">
            <a-input
              placeholder="Sélectionnez la raison de votre contact"
              v-model:value="formState.password"
            />
          </a-form-item>

          <a-form-item label="Message">
            <a-textarea
              placeholder="Dites-nous comment pouvons nous vous aider."
              v-model:value="formState.desc"
            />
          </a-form-item>

          <a-form-item>
            <div class="d-flex justify-content-center">
              <a-button type="primary" shape="round" :size="'large'" html-type="submit">
                Soumettre</a-button
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
