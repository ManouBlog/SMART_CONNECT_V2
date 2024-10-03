<script>
export default {
  name: "Contact",
};
</script>

<template>

 <section v-if="this.$store.state.translate === 'FR'">
  <div class="container-fluid page-title">
    <div class="row blue-banner">
      <div class="container main-container">
        <div class="col-lg-6 col-md-6 col-sm-5 col-xs-12">
          <h3 class="contat_us"><span>Contactez-nous</span>  <span>📞</span> </h3>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-7 col-xs-12">
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid footer">
    <div class="row">
      <div class="container-fluid main-container-home">
        <div class=" Adresse col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <h3>Adresse</h3>
            <i class="bi bi-building"></i>
          <p>Angre</p>
          <p>Cocody nouveau CHU angré</p>
          <p>Immeuble Bissié 1er Etage Porte D</p>
          <a href="http://www.lce-ci.com">https://www.lce-ci.com</a>
        </div>
      
        <div class=" Email two col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <h3>Email & Telephone</h3>
          <p><i class="bi bi-envelope"></i></p>
          <a href="mailto:hotline@lce-ci.com">hotline@lce-ci.com</a>
          <p>+225 05 46 66 77 66 / +225 07 07 96 96 72</p>
        </div>
       
        <div class=" Me col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <h3>Qui nous sommes</h3>
          <i class="bi bi-building"></i>
          <p>
            La locomotive Sarl est une entreprise de fourniture de services qui
            a pour mission d’accompagner les entreprises dans l’accroissement de
            leur productivité et compétitivité par la mise à disposition de
            solutions numériques innovantes.
          </p>
        </div>
      </div>
    </div>
  </div>
 </section>
 <section v-if="this.$store.state.translate === 'EN'">
  <div class="container-fluid page-title">
    <div class="row blue-banner">
      <div class="container main-container">
        <div class="col-lg-6 col-md-6 col-sm-5 col-xs-12">
          <h3 class="contat_us"><span>Contact us</span>  <span>📞</span> </h3>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-7 col-xs-12">
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid footer">
    <div class="row">
      <div class="container-fluid main-container-home">
        <div class=" Adresse col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <h3>Address</h3>
            <i class="bi bi-building"></i>
          <p>Angre</p>
          <p>Cocody nouveau CHU angré</p>
          <p>Immeuble Bissié 1er Etage Porte D</p>
          <a href="http://www.lce-ci.com">https://www.lce-ci.com</a>
        </div>
      
        <div class=" Email two col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <h3>Email & Phone</h3>
          <p><i class="bi bi-envelope"></i></p>
          <a href="mailto:hotline@lce-ci.com">hotline@lce-ci.com</a>
          <p>+225 05 46 66 77 66 / +225 07 07 96 96 72</p>
        </div>
       
        <div class=" Me col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <h3>Who we are</h3>
          <i class="bi bi-building"></i>
          <p>
            La locomotive Sarl is a service provision company which
            has the mission of supporting companies in increasing their
            their productivity and competitiveness by making available
            innovative digital solutions.
          </p>
        </div>
      </div>
    </div>
  </div>
 </section>
</template>
<style scoped>
@import url("../assets/w3.css");

[type="submit"] {
  color: white !important;
}
.bi {
  font-size: 1.8em !important;
}
.contat_us{
  font-size: 49px;
  margin:0;
  padding:0;
}
.blue-banner {
  background: rgb(255, 255, 255) !important;
  color: rgb(5, 35, 73) !important;
}
.footer{
  margin-left:0 !important;
  
}
.main-container-home{
  padding:2em 1em;
}
.main-container-home div{
  border-radius:10px !important;
  height:auto;
  transition: box-shadow .5s;
  padding:2em ;
  text-align: left;
}
.main-container-home div:hover{
   box-shadow: 1px 1px 6px rgba(19, 169, 183, 0.488) !important;
}
.page-title .main-container{
  padding:1em 0 32px !important;
}
@media (max-width: 1200px) {
  .page-title .main-container{
    padding: 0 !important;
  }
}
</style>
