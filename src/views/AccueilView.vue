<script>
// import $ from "jquery";
export default {
  name: "AccueilView",
  data() {
    return {
      user: this.$store.state.user,
    };
  },
  created() {
    console.log("user", this.$store.state.user);
  },
};
</script>

<template>
  <div class="page-body">
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-md-10 col-sm-10">
            <!-- <h3>Default</h3> -->
          </div>
          <div class="col-md-2 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a class="home-item" href="index.html"
                  ><i data-feather="home"></i
                ></a>
              </li>
              <li class="breadcrumb-item">Accueil</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid default-dash">
      <div class="row">
        <div class="col-xl-6 col-md-6 dash-xl-50">
          <div class="card profile-greeting">
            <div class="card-body">
              <div class="media">
                <div class="media-body">
                  <div class="greeting-user">
                    <h1 v-if="user">Hello, {{ this.user.nom }}</h1>
                    <p>Welcome back, your dashboard is ready!</p>
                    <a
                      class="btn btn-outline-white_color"
                      href="blog-single.html"
                      >Get Started<i class="icon-arrow-right"> </i
                    ></a>
                  </div>
                </div>
              </div>
              <div class="cartoon-img">
                <img
                  class="img-fluid"
                  src="http://admin.pixelstrap.com/zeta/asset/images/images.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-xl-3 col-md-6 dash-xl-50">
          <div class="card weekly-column">
            <div class="card-body p-0">
              <div id="weekly-chart"></div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <table class="table table-striped" id="MyTableData">
      <thead>
        <tr>
          <th>jours</th>
          <th>heure_start</th>
          <th>heure_end</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table> -->
  </div>
</template>
<style scoped>

</style>
