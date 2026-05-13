<script>
import { mapActions } from "pinia";
import { useOffreStore } from "../../store-pinia/Offres/useOffreStore";
export default {
  name: "SearchViewTable",
  props: {
    allData: {
      type: Array,
    },
  },
  data() {
    return {
      formState: {
        search: "",
      },
    };
  },
  methods: {
    ...mapActions(useOffreStore, ["filterInArrayOffreCreatedByEntreprise"]),
  },
  watch: {
    "formState.search": function (oldValue, newValue) {
      if (newValue) {
       
        this.allData.filter((item) =>
          item.offre.toLowerCase().includes(newValue.toLowerCase())
        );
        this.filterInArrayOffreCreatedByEntreprise(newValue.toLowerCase());
    
      }
    },
  },
};
</script>
<template>
  <a-form
    class="conteneur-form"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onHandleFailed"
  >
    <a-form-item>
      <a-input
        class="input-search"
        v-model:value="formState.search"
        placeholder="Rechercher :"
      />
    </a-form-item>
  </a-form>
</template>
<style scoped>
@import "../../Shared/styles/stylesShared.css";
.input-search {
  width: 300px;
  border: 2px solid var(--main-color) !important;
}
.conteneur-form {
  display: flex;
  justify-content: flex-end;
  padding: 1em 2em;
}
</style>
