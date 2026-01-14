<script>
import i18n from "../../plugins/i18n";
const { t } = i18n.global;
// import LogoAnimations from "../../components/LogoAnimations.vue";
export default {
  name: "LoadingSpinner",
  // components:{
  //   LogoAnimations
  // },
  data() {
    return {
      I8N: t,
    };
  },
};
</script>
<template>
  <div class="spinner_loading">
    <img
      src="../../assets/brobroli_1.png"
      alt="logo"
      style="width: 250px; height: 200px"
    />
    <a-spin size="large" wrapperClassName="style-spinner" />
    <!-- <LogoAnimations /> -->
  </div>
</template>
<style>
.ant-spin-dot > i {
  background: black !important;
}
.ant-spin-text {
  color: black !important;
  font-size: 1.5em !important;
  font-weight: bold;
}
</style>
<style scoped>
.spinner_loading {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-content: center;
  place-items: center;
  z-index: 999999;
}
</style>
