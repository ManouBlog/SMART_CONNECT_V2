<script>
import { mapState, mapActions } from "pinia";
import { useMenuMobile } from "../store-pinia/MenuMobile/useMenuMobileStore";
import SelectLanguage from "./feature/header/SelectLanguage.vue";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";
export default {
  name: "MenuMobile",
  components: {
    SelectLanguage,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useMenuMobile, ["showMenuMobile"]),
  },
  methods: {
    ...mapActions(useMenuMobile, ["changeValueForshowMenuMobile"]),
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
  },
};
</script>
<template>
  <a-drawer
    v-model:open="showMenuMobile"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    placement="right"
    @close="changeValueForshowMenuMobile"
  >
    <p>
      <SelectLanguage />
    </p>
    <p>
      <a href="#" class="login_user_mobile" @click.prevent="changeValueIsModal">
        Connexion
      </a>
    </p>
    <p>
      <router-link
        :to="{ name: 'Bienvenue' }"
        @click.prevent="changeValueForshowMenuMobile"
        class="d-block lien"
      >
        Accueil
      </router-link>
    </p>
    <p>
      <router-link
        :to="{ name: 'abonnements' }"
        @click.prevent="changeValueForshowMenuMobile"
        class="d-block lien"
      >
        Abonnements
      </router-link>
    </p>
    <p>
      <router-link
        :to="{ name: 'contact' }"
        @click.prevent="changeValueForshowMenuMobile"
        class="d-block lien"
      >
        Contactez-nous
      </router-link>
    </p>
  </a-drawer>
</template>
<style scoped>
p {
  padding: 0 1.5em;
  font-weight: bold;
  color: black;
}
</style>
