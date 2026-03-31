<template>
  <div class="tap-top"><i data-feather="chevrons-up"></i></div>
  <div class="page-wrapper compact-wrapper" id="pageWrapper">
    <HeaderDash />
    <div class="page-body-wrapper">
      <NavbarDash />
      <!-- <FooterDash /> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderDash from "@/components/header-dash";
import NavbarDash from "@/components/navbar-dash";
// import FooterDash from "@/components/footer-dash";

export default {
  name: "HomeView",
  components: {
    HeaderDash,
    NavbarDash,
    // FooterDash,
  },
};
</script>
