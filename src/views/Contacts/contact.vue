<script>
import FormulaireView from './Features/FormulaireView.vue'
import InfoContactView from "./Features/InfoContactView.vue"
export default {
  name: "Contact",
  components:{
    FormulaireView,
    InfoContactView
  }
};
</script>

<template>
  <section>
    <FormulaireView />
    <InfoContactView />
  </section>
</template>
<style scoped>
@import url("../../assets/w3.css");

[type="submit"] {
  color: white !important;
}
.bi {
  font-size: 1.8em !important;
}
.contat_us {
  font-size: 49px;
  margin: 0;
  padding: 0;
}
.blue-banner {
  background: rgb(255, 255, 255) !important;
  color: rgb(5, 35, 73) !important;
}
.footer {
  margin-left: 0 !important;
}
.main-container-home {
  padding: 2em 1em;
}
.main-container-home div {
  border-radius: 10px !important;
  height: auto;
  transition: box-shadow 0.5s;
  padding: 2em;
  text-align: left;
}
.main-container-home div:hover {
  box-shadow: 1px 1px 6px rgba(19, 169, 183, 0.488) !important;
}
.page-title .main-container {
  padding: 1em 0 32px !important;
}
@media (max-width: 1200px) {
  .page-title .main-container {
    padding: 0 !important;
  }
}
</style>
