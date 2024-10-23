<script>
import CardFooter from "../components/feature/Footer/CardFooter.vue";
import LogoComponent from "../Shared/Compoments/LogoComponent.vue";
export default {
  name: "Footer",
  components: {
    CardFooter,
    LogoComponent,
  },
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>

<template>
  <section>
    <div class="container-fluid footer">
      <div class="row conteneur-footer">
        <div class="container main-container-footer">
          <CardFooter :title="$t('FOOTER.Adresse.title')" :listLien="['Cocody angré nouveau chu']" />
          <CardFooter
            :title="$t('FOOTER.ACCES.title')"
            :listLien="[
              $t('FOOTER.ACCES.one'),
              $t('FOOTER.ACCES.two'),
              $t('FOOTER.ACCES.three'),
            ]"
          />
          <CardFooter
            :title="$t('FOOTER.CONTACT.title')"
            :listLien="[`+225 0707070707`, 'support@smartconnect.com']"
          />
          <LogoComponent />
        </div>
      </div>
    </div>
  </section>
  <section class="py-2 background_main">
    <p class="text-center">SMART CONNECT ©2024. {{$t('FOOTER.COPYRIGHT.title')}}</p>
  </section>
</template>
<style scoped>
@import "../Shared/styles/stylesShared.css";
.conteneur-footer {
  background: var(--secondary-color) !important;
}
.main-container-footer {
  display: flex;
  justify-content: space-between;
  gap: 2em;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
