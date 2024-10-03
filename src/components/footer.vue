<script>
export default {
  name: "Footer",
  data() {
    return {
      user:this.$store.state.user
    };
  },
};
</script>

<template> 

  
  <section  v-if="this.$store.state.translate === 'FR'">
    <div class="container-fluid footer">
      <div class="row bg-primary">
        <div class="container main-container-home">
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            
            <ul class="list-group">
             
                <img src="../assets/lce.png"  alt="La Locomotive(lce)">
             
                <div class="reseaux_sociaux">
                 <a href="https://www.instagram.com/lalocomotivelce/"><em class="bi bi-instagram"></em></a> 
             
            
                <a href="https://www.facebook.com/lalocomotivesarl/"><em class="bi bi-facebook"></em></a>
              
              
                <a href="https://www.linkedin.com/company/la-locomotive-sarl-ci/mycompany/"><em class="bi bi-linkedin"></em></a>
                </div>
             
            </ul>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <ul class="list-group">
              <h3>Accès rapide</h3>
              <li><router-link to="/contact">Contactez Nous</router-link></li>
              <li>
                <router-link :to="{ name: 'registre' }"
                  >Se connecter/Inscription</router-link
                >
              </li>
              <li v-if="!user || user.user.statut.statut === 'etudiant'">
                <router-link :to="{ name: 'jobs' }"
                  >Offre d'emploi</router-link
                >
              </li>
              <li v-if="!user || user.user.statut.statut === 'entreprise'">
                <router-link :to="{ name: 'timetable' }"
                  >Talents</router-link
                >
              </li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 conteneur_nous">
            <h3>Reférences</h3>
            <p> <em class="bi bi-geo-alt"></em> Angré nouveau chu</p>
            <p><em class="bi bi-telephone"></em>+225 05245852152</p>
            <a href="mailto:hotline@lce-ci.com"><em class="bi bi-envelope"></em> hotline@lce-ci.com</a>
            <br>
            <a href="https://www.lce-ci.com"> <em class="bi bi-globe"></em> https://www.lce-ci.com</a>
          </div>
          
  
          
        </div>
      </div>
    </div>
  </section>
  <section  v-if="this.$store.state.translate === 'EN'">
    <div class="container-fluid footer">
      <div class="row bg-primary">
        <div class="container main-container-home">
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            
            <ul class="list-group">
             
                <img src="../assets/lce.png"  alt="La Locomotive(lce)">
             
                <div class="reseaux_sociaux">
                 <a href="https://www.instagram.com/lalocomotivelce/">
                  <em class="bi bi-instagram"></em></a> 
             
            
                <a href="https://www.facebook.com/lalocomotivesarl/"><em class="bi bi-facebook"></em></a>
              
              
                <a href="https://www.linkedin.com/company/la-locomotive-sarl-ci/mycompany/"><em class="bi bi-linkedin"></em></a>
                </div>
             
            </ul>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <ul class="list-group">
              <h3>Quick access</h3>
              <li><router-link to="/contact">Contact-us</router-link></li>
              <li>
                <router-link :to="{ name: 'registre' }"
                  >Sign in / Register</router-link
                >
              </li>
              <li v-if="!user || user.user.statut.statut === 'etudiant'">
                <router-link :to="{ name: 'jobs' }"
                  >Job offer</router-link
                >
              </li>
              <li v-if="!user || user.user.statut.statut === 'entreprise'">
                <router-link :to="{ name: 'timetable' }"
                  >Talents</router-link
                >
              </li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 conteneur_nous">
            <h3>References</h3>
            <p> <em class="bi bi-geo-alt"></em> Angré nouveau chu</p>
            <p><em class="bi bi-telephone"></em>+225 05245852152</p>
            <a href="mailto:hotline@lce-ci.com"><em class="bi bi-envelope"></em> hotline@lce-ci.com</a>
            <br>
            <a href="https://www.lce-ci.com"> <em class="bi bi-globe"></em> https://www.lce-ci.com</a>
          </div>
          
  
          
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
*{
  color:rgb(255, 255, 255) !important;
  font-size:.98em !important;
}
.footer{
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.498);
  margin-left:0 !important;
  padding:0 1em 0 0 !important;
}
.main-container-home .list-group a::before{
  content:none !important;
}
.list-group img{
  width:50%;
  background: transparent;
  height:100px;
  margin:1em;
}
.reseaux_sociaux > a{
  margin:0 1em;
  font-size:1.5em !important;
}

.list-group,.conteneur_nous {
  text-align: left;
}
.main-container-home{
  padding:15px 0;

}
.bg-primary{
  background-color: rgb(5, 35, 73) !important;
}

</style>
