<script>
import Buttons from "./Buttons.vue";
export default {
  name: "HeaderDashboardTable",
  emits: ["redirectionsRoute"],
  props: { elmentsOfBtn: { type: Array }, titleHeader: String },
  components: {
    Buttons,
  },
  data() {
    return {};
  },
  methods: {
    redirectionsBtn() {
      this.$emit("redirectionsRoute");
    },
  },
};
</script>
<template>
  <div class="conteneur-header-table">
    <h1 class="fw-bold">{{ titleHeader }}</h1>
    <Buttons
      :elmentsOfBtn="elmentsOfBtn"
      :shapeBtn="'round'"
      @created="redirectionsBtn"
    />
  </div>
</template>
<style scoped>
@import "../../Shared/styles/stylesShared.css";
h1 {
  color: var(--main-color) !important;
  font-size: 3em;
}
.conteneur-header-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  padding: 1em 2em;
}
</style>
