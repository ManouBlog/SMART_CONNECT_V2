<script>
import CardFooter from "../../../components/feature/Footer/CardFooter.vue";
export default {
  name: "InfoContactView",
  components: {
    CardFooter,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <section class="main-container-footer">
    <CardFooter
      :icone_name="'bi bi-building'"
      :title="'Adresse'"
      :listLien="['Cocody Angre Nouveau CHU Immeuble Bissié 1er Etage Porte D']"
    />
    <CardFooter
      :icone_name="'bi bi-envelope'"
      :title="'Adresse email'"
      :listLien="['Support@lce-ci.com']"
    />
    <CardFooter
      :icone_name="'bi bi-person'"
      :title="'Contact'"
      :listLien="['+225 07 0796 9672']"
    />
  </section>
</template>
<style scoped>
.main-container-footer {
  display: flex;
  justify-content: space-between;
  gap: 2em;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
