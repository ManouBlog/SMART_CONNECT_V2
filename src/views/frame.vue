<script>

import HeaderDash from "@/components/header-dash";
import NavbarDash from "@/components/navbar-dash";
import FooterDash from "@/components/footer-dash";
// import $ from "jquery";
export default {
  name: "Frame",
  components: {
    HeaderDash,
    NavbarDash,
    FooterDash,
  },
  data() {
    return {
      user: this.$store.state.user,
    };
  },

};
</script>

<template>
  <div class="tap-top"><i data-feather="chevrons-up"></i></div>
  <div class="page-wrapper compact-wrapper" id="pageWrapper">
    <HeaderDash />
    <div class="page-body-wrapper">
      <NavbarDash />
      <FooterDash class="footer-dash" />
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
/*@import url("../../src/dash/css/color-1.css");
@import url("../../src/dash/css/vendors/font-awesome.css");
@import url("../../src/dash/css/vendors/icofont.css");
@import url("../../src/dash/css/vendors/themify.css");
@import url("../../src/dash/css/vendors/flag-icon.css");

@import url("../../src/dash/css/vendors/feather-icon.css");

@import url("../../src/dash/css/vendors/scrollbar.css");

@import url("../../src/dash/css/vendors/animate.css");

@import url("../../src/dash/css/vendors/date-picker.css");

@import url("../../src/dash/css/vendors/photoswipe.css");


@import url("../../src/dash/css/style.css");

@import url("../../src/dash/css/color-1.css");


@import url("../../src/dash/css/responsive.css");*/
.footer-dash {
  bottom: 0 !important;
  position: absolute !important;
  width: 100%;
}
</style>
