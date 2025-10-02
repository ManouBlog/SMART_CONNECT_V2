<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
import instance from "../../api/api";
// import Swal from "sweetalert2";

// import { useCinetpayStore } from "../../store-pinia/useCinetpayStore";

import i18n from "../../plugins/i18n";
const { t } = i18n.global;
// const isHolding = {
//   entreprise: true,
// };
const router = useRouter();
// const store = useStore();
const abonnements = ref([]);
// const cinetpayStore = useCinetpayStore();
const isLoading = ref(true);

const offreBasic = ref(false);

const isChoose = ref(false);
const handleAbonement = async () => {
  try {
    const response = await instance.get("getAbonnement");
    abonnements.value = response.data.data;
    // console.log("RESPONSE_getAbonnement", response.data);
    isLoading.value = false;
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
};

const createAbonement = () => {
   router.push("/registre"); 
};


onMounted(async () => {
  await handleAbonement();
});
</script>

<template>
  <div class="wrapped">
    <div class="d-flex justify-content-between px-3">
      <h1>
        {{ $t("Header.Menu.Abonnement") }}
        <!-- Abonnements -->
      </h1>
    </div>
    <div class="spinner" v-show="isChoose">
      <span class="fw-bold text-light">chargement</span>
      <n-space>
        <n-spin size="large" />
      </n-space>
    </div>
    <n-card>
      <n-tabs type="line" size="large" animated justify-content="center">
        <n-tab-pane name="Etudiant" tab="Etudiant">
          <h1 v-if="isLoading">{{ t("spinnerText") }}</h1>
          <div class="conteneur-flex">
            <div
              v-for="item in abonnements.filter(
                (item) => item.categorie.categorie === 'Etudiant'
              )"
              :key="item.id"
              class="abonnement-classique"
            >
              <h1 class="text-start">{{ item.libelle }}</h1>
              <h3 class="text-start">{{ item.prix }} Fcfa</h3>
              <h5 class="text-start">{{ item.periode }} année</h5>
              <div class="px-5" v-html="item.description"></div>

              <div class="text-center conteneur-btn">
                <button
                  class="btn-lg bg-dark"
                  @click.prevent="createAbonement()"
                >
                  Je choisi
                </button>
              </div>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="Entreprise" tab="Entreprise">
          <div class="conteneur-flex">
            <div
              v-for="(item, index) in abonnements.filter(
                (item) => item.categorie.categorie === 'Entreprise'
              )"
              :key="index"
              class="abonnement-classique"
            >
              <h1 class="text-start">{{ item.libelle }}</h1>
              <h3 class="text-start">{{ item.prix }} Fcfa</h3>
              <h5 class="text-start">
                {{ item.periode }} année{{ item.periode > 1 ? "s" : null }}
              </h5>
              <div>{{ item.description }}</div>

              <div
                class="text-center conteneur-btn"
                :class="offreBasic ? 'show_btn_clique' : 'hidden'"
              >
                <button
                  class="btn-lg bg-dark"
                  @click.prevent="createAbonement(item.id)"
                >
                  Je choisi
                </button>
              </div>
            </div>
            <div
              v-if="
                !abonnements.filter((item) => item.categorie.categorie === 'Entreprise')
                  .length
              "
            >
              Pas de formules
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
<style scoped>
.spinner {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.425);
  z-index: 9879;
  display: flex;
  justify-content: center;
  place-items: center;
  place-content: center;
}
.conteneur-btn {
  position: absolute;
  bottom: 1em;
  display: flex;
  justify-content: center;
  width: 100%;
}
.fermer {
  height: 50px !important;
  width: 50px !important;
  padding: 0 2em 0 0;
  border: none !important;
}
ul,
.abonnement-classique {
  padding: 1.5em;
}
.abonnement-classique {
  width: 300px;
  height: 450px;
  margin-bottom: 2em;
  text-align: left;
  border-radius: 10px;
  box-shadow: 3px 3px 6px 6px rgba(0, 0, 0, 0.126);
  transition: all 1s ease-in-out;
  position: relative;
  padding: 1.5em;
}

.hidden {
  display: none;
}
.show_btn_clique {
  display: block;
}
.wrapped {
  padding: 2em 1em;
}

.conteneur-flex {
  display: flex !important;
  justify-items: center !important;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
}
</style>
