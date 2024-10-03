<script>
 import { VueperSlides, VueperSlide } from 'vueperslides';
 import Swal from "sweetalert2";
import 'vueperslides/dist/vueperslides.css';
import Vue3autocounter from 'vue3-autocounter';
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import instance from "../api/api";
export default {
  name: "Bienvenue",
  components: { VueperSlides, VueperSlide ,Flicking: Flicking, 'vue3-autocounter': Vue3autocounter},
  data() {
    return {
      offre_emploi_du_jour: "",
      image1: require("../assets/call.png"),
      image2: require("../assets/The Little Things - Working.png"),
      image3: require("../assets/Happy Bunch - Desk.png"),
      image4: require("../assets/Olá - Relaxing.png"),
      image5:require("../assets/candidates-waiting-for-job-interview.jpg"),
      user:this.$store.state.user,
      timetable:"",
      spinnerAlert:false,
      offres:"",
      emailForNewsletter:"",
      entreprises:"",
      charte:window.localStorage.getItem("charte"),
      newletter:null,
      ListOffre:[],
      spinner: false,
      slides:[
        {
          id:1,
          photo:require("../assets/logo-jumia-mall-2114415253.jpg"),
        },{
          id:2,
         photo:require("../assets/KFC-Logo-362893771.jpg"),
        },{
          id:3,
         photo:require("../assets/41715b307038cad1018232d2f01f326b-1154425032.jpg"),
        },{
          id:4,
         photo:require("../assets/Radisson_SAS-3112560756.jpg"),
        },
        {
          id:5,
         photo:require("../assets/deliv.png"),
        },
        
      ]
    };
  },
  methods: {
      async getOffre(){
      
     await instance.get("list_offres")
        .then((response) =>{
          console.log("Mes Offres",response);
          this.offres = response.data.data;
          let offresWithDateExpirationSupAtToday = []
          this.offres.find((item)=>{
            if(new Date(item.fin) >= new Date()){
              offresWithDateExpirationSupAtToday.push(item)
            }else{
              offresWithDateExpirationSupAtToday = this.offres.slice(0,4)
            }
          })
          console.log("OFRES", offresWithDateExpirationSupAtToday);
          this.ListOffre = offresWithDateExpirationSupAtToday.slice(0,4);
        })

    },
     async getEntreprise(){
     await instance.get("AllEntrepriseWithTimetables")
        .then((response) =>{
          console.log("ENTREPRISE",response);
          this.entreprises = response.data.data;
          this.timetable = response.data.timetable;
        })
    },
    closeCharte(){
      this.charte = 0
      window.localStorage.setItem("charte",0)
    },
   async SendMailBienvenueNewsletter(){
      this.spinnerAlert = true
      await instance.post("SendMailAtEmailToNewsletter",{
        email:this.emailForNewsletter
      })
      .then(res=>{
        console.log(res)
        if(res.data.status){
          Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.spinnerAlert = false
        }
        if(!res.data.status){
          Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.spinnerAlert = false
        }
       
      })
      .catch(error=>{
        console.log(error)
        Swal.fire({
              icon: "info",
              title: error.response.data.message,
              showConfirmButton: true,
            });
            this.spinnerAlert = false
      })
    },
    voirDetailTimetable() {
      if (this.user) {
         
        this.$router.push({
            name: 'jobs',
          });
      } else {
        Swal.fire({
          icon: "info",
          title: "Veuillez-vous connecter!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          this.$router.push({
            path: "/registre",
            query: { redirect: this.path },
          });
        }, 2000);
      }
    },
    async handleGoogleCallBack(){
      const URL_PARAMS = new URLSearchParams(window.location.search);
      const code = URL_PARAMS.get('code')
      if(code){
        try{
      const response = await instance.get(`auth/google/callback?code=${code}`)
      const {token,user}=response.data;
      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify(user));
     }catch(error){
      console.log(error)
     }
      }else{
        return;
      }
    
      
    }

  },
  created(){
    this.getOffre();
    this.getEntreprise();
    this.handleGoogleCallBack()
  }
};
</script>
<template>
<section v-if="this.$store.state.translate === 'FR'">
  
  <div  class="Myspinner" v-show="spinner">
    <div class="spinner-border text-primary" role="status">
       <h1 class="text-dark">chargement.....</h1> 
    </div>
  </div>
  <div class="header_banner">
  <div class="ecriteau">
    <h1 class="fw-bold h1">Mon emploi <br> en un clic</h1>

   <router-link to="/registre"><button class="btn btn-Conex"
     v-if="!this.$store.state.user"> Se Connecter</button></router-link>
   <router-link to="/jobs"><button class="btn-lg btn-Conex"
     v-if="this.$store.state.user && this.$store.state.user.user.statut.statut == 'etudiant'">Offres</button>
    </router-link>
    <router-link to="/timetable"><button class="btn-lg btn-Conex" 
      v-if="(this.$store.state.user && this.$store.state.user.user.statut.statut == 'entreprise') ||
       (this.$store.state.user && this.$store.state.user.user.statut.statut === 'particulier')">
      Talents disponibles</button></router-link>
  </div>
  <div class="ecriteau_image">
   <img src="../assets/images.png" class="position-absolute image" alt="">
  </div>
  </div>
  <div class="container main-container-home" v-if="!this.$store.state.user">
    <h1 class="fw-bold step_suivre">Etapes à suivre.</h1>
    <span class="text-secondary">Les instructions à suivre pour contacter du personnel ou postuler à une offre.</span>
    <br>
    <br>
    <br>
    <div class="container-fluid row cont">
     
    <div class="col-lg-3 col-md-3 col-sm-12">
    <h1 class="nb">1</h1>
    <h5 class="fw-bold">Créer un compte</h5>
    <p class="text-secondary">Remplissez le formulaire</p>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12">
    <h1 class="nb">2</h1>
    <h5 class="fw-bold">Choisir une option</h5>
          <p class="text-secondary">
            <span>Etudiant : Obtenir un emploi à temps partiel</span>
            <br>
            <br>
           
            <span>Employeur : Besoin d'employés à temps partiel</span>
          </p>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12">
    <h1 class="nb">3</h1>
     <h5 class="fw-bold">Vivez une expérience unique</h5>
          <p class="text-secondary">
            <span>Etudiant : Choisir le meilleur profil.</span>
            <br>
            <br>
            <br>
            <span>Employeur :Démarrer une nouvelle expérience Pro.</span>

          </p>
    </div>
    </div>

    <div class="jobs_results">
      <div class="jobs-result">
        <div class="col-lg-12">
          <router-link to="/registre"><button class="login text-light btn-Conex">
            Se connecter
          </button></router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-if="user" class="p-5 mt-5">
    <h1 class="fw-bold">Nos performances</h1>
  </div>
  <div class="container-fluid stat mt-5">
   <div class="row">
    
  <div class="container main-container">
        <div v-if="!user">
          <h1 class="fw-bold">Nos performances</h1>
        </div>

         <div class="container main-container countjobs" id="cjobs">
        <div>
          <ul class="text-align-center row conteneur_liste">
            <li class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div class="count">
                <em class="bi bi-building icon "></em>
                <h1 class="num"> <vue3-autocounter ref='counter' :startAmount='0' :endAmount='entreprises.length' :duration='1'  :autoinit='true'/></h1>
               
              </div>
              <span class="textSt fw-bold">Partenaire(s)</span>
            </li>
              <li class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div class="count">
                <em class="bi bi-briefcase-fill icon"></em>
                <h1 class="num"> <vue3-autocounter ref='counter' :startAmount='0' :endAmount='offres.length' :duration='1'  :autoinit='true'/></h1>
              </div>
              <span  class="textSt fw-bold">Offre(s)</span>
            </li>
            <li class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div class="count">
                <em class="bi bi-person-lines-fill icon"></em>
                <h1 class="num"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='timetable.length' :duration='1'  :autoinit='true'/></h1>
              </div>
              <span class="textSt fw-bold">Ressource(s)</span>
            </li>
          </ul>
        </div>
      </div>
      </div>
      </div>
      
  
  </div>
  <section>
    <h1 class="fw-bold">Offres récentes</h1>
    <br>
    <br>
    <div class="wrapper">
      <Flicking class="job-container" :defaultIndex="1">
      <div class="job_div" style="width: 35%;" v-for="(item,index) in ListOffre" :key="index">
        <h1 class="fw-bold">{{item.nom_offre}}</h1>
        <span><em class="bi bi-geo-alt"></em> {{item.lieu}}</span>
        <br>
        <br>
        <span><em class="bi bi-calendar-date"></em>  Du {{ item.debut}}</span> au <span>{{item.fin }}</span>
        <br>
        <br>
        <div class="desc_crop">
          <span class="fw-bold">Description</span>
          <div class="desc" v-html="item.description">

          </div>
          <p class="lire"></p>
        </div>
        <span class="publie_offre">Publié le:{{new Date(item.created_at).toLocaleDateString('fr')}}</span>
      </div>
    </Flicking>
    
    </div>
    <a href="#" class="h5 plusOffre" 
    v-if="user && user.user.statut.statut === 'etudiant'"
    @click.prevent="voirDetailTimetable"
      >Plus d'offres
      <em class="bi bi-arrow-right"></em> </a
    >
 
  </section>
  <div
    class="container testimionals"
  >
    <div> 
      <div class="container-fluid row gx-5 main-container info">
        <div class="cont-one">
         <h5 class="fw-bold">Trouver du personnels <br> qualifiés.</h5>
         <em class="bi bi-person-lines-fill"></em>
         <h6>Trouver des personnes vu leur <br> disponibilité grâce à leur emploi du temps.</h6>
        </div>
         <div class="cont-two">
        <h5 class="fw-bold">Trouver des offres </h5>
        <em class="bi bi-briefcase-fill"></em>
        <h6>Trouver pleins d'offres sur la plateforme.</h6>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
  <h1 class="fw-bold">Nos Partenaires.</h1>
  <br>
  <vueper-slides autoplay class="no-shadow"
  :visible-slides="3"
  :slide-ratio="1 / 5"
  :dragging-distance="70"
  :arrows="false"
  :bullets="false"
  :duration="1000">
    <vueper-slide v-for="(slide, i) in slides"
      :key="i"
      :image="slide.photo" />
    <template #pause>
      <em class="icon pause_circle_outline"></em>
    </template>
  </vueper-slides> 
  </div>
  <div class="alerte_emploi"> 
    <div class="ecriteau_alerte_emploi">
   <h1 class="fw-bold">Alertes Offres</h1>
   <h4>Vous voulez reçevoir les offres d'emploi<br>Inscrivez-vous à la newsletter</h4>
     <div class="inputSendmail">
      <input type="text" class="input_mail" 
      v-model="emailForNewsletter" placeholder="Your email">
      <button class="btn btn_send_mail"
      :disabled="spinnerAlert ? true:false" 
      @click="SendMailBienvenueNewsletter"
       v-if="emailForNewsletter">
       {{spinnerAlert ? 'Loading...': 'Envoyer'}}</button>
     </div>
    </div>
    <div class="image_alert_emploi">

    </div>

  </div>
</section>

<section v-if="this.$store.state.translate === 'EN'">


  <div  class="Myspinner" v-show="spinner">
    <div class="spinner-border text-primary" role="status">
       <h1 class="text-dark">Loading.....</h1> 
    </div>
  </div>
  <div class="header_banner">
  <div class="ecriteau">
    <h1 class="fw-bold h1">My Job <br> in One Click</h1>

   <router-link to="/registre"><button class="btn btn-Conex"
     v-if="!user"> Sign In</button></router-link>
   <router-link to="/jobs"><button class="btn-lg btn-Conex"
     v-if="user && user.user.statut.statut == 'etudiant'">Jobs</button>
    </router-link>
    <router-link to="/timetable"><button class="btn-lg btn-Conex" 
      v-if="(user && user.user.statut.statut == 'entreprise') ||
       (user && user.user.statut.statut === 'particulier')">
       Talent available</button></router-link>
  </div>
  <div class="ecriteau_image">
   <img src="../assets/images.png" class="position-absolute image" alt="">
  </div>
  </div>
  <div class="container main-container-home" v-if="!user">
    <h1 class="fw-bold step_suivre">Steps to follow.</h1>
    <span class="text-secondary">Instructions to follow for
      contact staff or apply for an offer</span>
    <br>
    <br>
    <br>
    <div class="container-fluid row cont">
     
    <div class="col-lg-3 col-md-3 col-sm-12">
    <h1 class="nb">1</h1>
    <h5 class="fw-bold">Create an account</h5>
    <p class="text-secondary">Complete the form</p>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12">
    <h1 class="nb">2</h1>
    <h5 class="fw-bold">Choose an option</h5>
          <p class="text-secondary">
            <span>Student: Getting a part-time job</span>
            <br>
            <br>
           
            <span>Employer: Need for part-time employees</span>
          </p>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12">
    <h1 class="nb">3</h1>
     <h5 class="fw-bold">Live a unique experience</h5>
          <p class="text-secondary text-center">
            <span>Student: Choose the best profile</span>
            <br>
            <br>
            <span>Employer: Start a new experience.</span>

          </p>
    </div>
    </div>

    <div class="jobs_results">
      <div class="jobs-result">
        <div class="col-lg-12">
          <router-link to="/registre"><button class="login text-light btn-Conex">
            Sign in
          </button></router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-if="user" class="p-5 mt-5">
    <h1 class="fw-bold">Our performance</h1>
  </div>
  <div class="container-fluid stat mt-5">
   <div class="row">
    
  <div class="container main-container">
        <div v-if="!user">
          <h1 class="fw-bold">Our performance</h1>
        </div>

         <div class="container main-container countjobs" id="cjobs">
        <div>
          <ul class="text-align-center row conteneur_liste">
            <li class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div class="count">
                <em class="bi bi-building icon "></em>
                <h1 class="num"> <vue3-autocounter ref='counter'
                   :startAmount='0' :endAmount='entreprises.length' 
                   :duration='1'  :autoinit='true'/></h1>
               
              </div>
              <span class="textSt fw-bold">Partners</span>
            </li>
              <li class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div class="count">
                <em class="bi bi-briefcase-fill icon"></em>
                <h1 class="num"> <vue3-autocounter ref='counter'
                   :startAmount='0' :endAmount='offres.length' :duration='1'  :autoinit='true'/></h1>
              </div>
              <span  class="textSt fw-bold">Jobs</span>
            </li>
            <li class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div class="count">
                <em class="bi bi-person-lines-fill icon"></em>
                <h1 class="num"><vue3-autocounter ref='counter'
                   :startAmount='0' :endAmount='timetable.length'
                    :duration='1'  :autoinit='true'/></h1>
              </div>
              <span class="textSt fw-bold">Talents</span>
            </li>
          </ul>
        </div>
      </div>
      </div>
      </div>
      
  
  </div>
  <section>
    <h1 class="fw-bold">Recent offers</h1>
    <br>
    <br>
    <div class="wrapper">
      <Flicking class="job-container" :defaultIndex="1">
      <div class="job_div" style="width: 35%;" 
      v-for="(item,index) in ListOffre" :key="index">
        <h1 class="fw-bold">{{item.nom_offre}}</h1>
        <span><em class="bi bi-geo-alt"></em> {{item.lieu}}</span>
        <br>
        <br>
        <span><em class="bi bi-calendar-date"></em>  Du {{ item.debut}}</span> au <span>{{item.fin }}</span>
        <br>
        <br>
        <div class="desc_crop">
          <span class="fw-bold">Description</span>
          <div class="desc" v-html="item.description">

          </div>
          <p class="lire"></p>
        </div>
        <span class="publie_offre">
          Published on:{{new Date(item.created_at).toLocaleDateString('fr')}}</span>
      </div>
    </Flicking>
    
    </div>
    <a href="#" class="h5 plusOffre" 
    v-if="user && user.user.statut.statut === 'etudiant'"
    @click.prevent="voirDetailTimetable"
      >More offers
      <em class="bi bi-arrow-right"></em> </a
    >
 
  </section>
  <div
    class="container testimionals"
  >
    <div> 
      <div class="container-fluid row gx-5 main-container info">
        <div class="cont-one">
         <h5 class="fw-bold">Find qualified personnel</h5>
         <em class="bi bi-person-lines-fill"></em>
         <h6>Find people given their
          <br>  availability thanks to their schedule.</h6>
        </div>
         <div class="cont-two">
        <h5 class="fw-bold">Find Jobs</h5>
        <em class="bi bi-briefcase-fill"></em>
        <h6>Find lots of offers on the platform</h6>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
  <h1 class="fw-bold">Our partners.</h1>
  <br>
  <vueper-slides autoplay class="no-shadow"
  :visible-slides="3"
  :slide-ratio="1 / 5"
  :dragging-distance="70"
  :arrows="false"
  :bullets="false"
  :duration="1000">
    <vueper-slide v-for="(slide, i) in slides"
      :key="i"
      :image="slide.photo" />
    <template #pause>
      <em class="icon pause_circle_outline"></em>
    </template>
  </vueper-slides> 
  </div>
  <div class="alerte_emploi"> 
    <div class="ecriteau_alerte_emploi">
   <h1 class="fw-bold">Offer Alerts</h1>
   <h4>You are student,and you want to receive job offers, <br>subscribe to the newsletter</h4>
     <div class="inputSendmail">
      <input type="text" class="input_mail" 
      v-model="emailForNewsletter" placeholder="Your email">
      <button class="btn btn_send_mail"
      :disabled="spinnerAlert ? true:false" 
      @click="SendMailBienvenueNewsletter"
       v-if="emailForNewsletter">
       {{spinnerAlert ? 'Loading...': 'Envoyer'}}</button>
     </div>
    </div>
    <div class="image_alert_emploi">

    </div>

  </div>
 
</section>
</template>

<style scoped>
.h1{
  font-size: 5em;
}

.text-dark{
  color:black !important;
}
.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}
  .conteneur_liste li{
    list-style-type: none !important;
  }
  .desc_crop{
    width:100%;
    height:90px;
    overflow:hidden;
    position: relative;
  }
  .desc_crop .lire{
    position:absolute;
    bottom:-1em;
    left:0;
    width:100%;
    height:90px;
    text-align: center;
    margin: 0;
    padding:50px 0;
    border-radius: 10px;
    background-image: linear-gradient(to bottom,transparent, rgb(255, 255, 255));
  }
  section{
    position:relative;
    padding: 1em 0;
  }
  .lien{
    background: #F77F00 !important;
    padding:.5em;
    border-radius:5px;
  }
  a:hover{
    color:white;
  }
  section>a{
    position:absolute;
    right:3em;
    font-size:1.2em;
    color: #F77F00 !important;
    text-decoration:underline !important;
    
  }
  .job-container{
    background: rgb(5, 35, 73) !important;
  }
  .job_div{
    background: rgb(255, 255, 255);
    width:300px;
    height:300px;
    margin:.5em;
    border-radius:10px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.165);
    position: relative;
    text-align: left;
    padding:0 1em;
  }
  .publie_offre{
    position:absolute;
    bottom:1em;
  }
  .charte_btn_connect{
    color:#F77F00
  }
  .step_suivre{
    font-size:3.5em;
  }
  .text-secondary{
    color:gray
  }
  .inputSendmail{
    position:relative;
    width: 100%;
    margin-bottom: 1em;
  }
  .btn_send_mail{
  position:absolute;
  right: 1em;
  top:.3em;
  padding:.8em;
  font-weight: bold;
  color:white;
  width:150px;
  background: #F77F00 !important;
  border:2px solid black;
  }  
  .input_mail{
    width:100%;
    padding:1em;
    border-radius:10px;
  }
  .ecriteau_alerte_emploi{
    flex:1;
  }
  .image_alert_emploi{
   flex:1;
   width:40%;
   height:300px;
   background-image: url("../assets/set.png");
   background-repeat: no-repeat;
    background-position:top;
    background-size:cover;
    object-fit: cover;
  }

  .alerte_emploi{
    display:flex;
    justify-content:space-between;
    align-items:center;
    align-content: center;
    flex-wrap:wrap;
    margin:1em 0 0 10em;
  }
  .conteneur-team{
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    margin:1em 0;
    padding:3em 0;
  }
  .conteneur-team .teamOne{
    width:200px;
    height:200px;
    border-radius: 10px;
    background-image: url("../assets/KFC-Logo-362893771.jpg");
    background-repeat: no-repeat;
    background-position:center;
    background-size:cover;
    object-fit: cover;
  }
  .conteneur-team .teamTwo{
    width:200px;
    height:200px;
    border-radius: 10px;
    background-image: url("../assets/logo-jumia-mall-2114415253.jpg");
    background-repeat: no-repeat;
    background-position:center;
    background-size:cover;
    object-fit: center;
  }
  .conteneur-team .teamThree{
    width:200px;
    height:200px;
    border-radius: 10px;
    background-image: url("../assets/41715b307038cad1018232d2f01f326b-1154425032.jpg");
    background-repeat: no-repeat;
    background-position:center;
    background-size:cover;
    object-fit: center;
  }
  .conteneur-team .teamFour{
    width:200px;
    height:200px;
    border-radius: 10px;
    background-image: url("../assets/Radisson_SAS-3112560756.jpg");
    background-repeat: no-repeat;
    background-position:center;
    background-size:cover;
    object-fit: center;
  }
  .conteneur-team .teamFive{
    width:200px;
    height:200px;
    border-radius: 10px;
    background-image: url("../assets/deliv.png");
    background-repeat: no-repeat;
    background-position:center;
    background-size:cover;
    object-fit: center;
  }
  
  
  .icon{
    position: absolute;
    top:20px;
    left:110px;
    font-size:1.5em;
  }
  .bi-building{
    left:130px;
  }
  .nb{
    text-align: center;
    background: rgb(3, 83, 115);
    width:50px;
    height:50px;
    line-height:50px;
    border-radius:10px;
    color:white;
  }
.cont{
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
    
  }
.cont>div{
background: rgb(255, 255, 255);
box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.165);
margin:1em;
width:300px;
padding:1em;
height:auto;
display: inline-block;
border-radius:10px;
}
  .btn-Conex{
    background: #F77F00 !important;
    color:white;
    border:2px solid black;
    width:250px;
    padding:.5em 0;
  }
.chart_entreprise{
  box-shadow:1px 1px 6px rgba(0, 0, 0, 0.156);
  margin-bottom: 2em;
  border-radius:10px;
  padding:1em;
  color:black;
  text-align: left;
  background: white;
  position: relative;
}
.btn-ferme{
  position:absolute;
  right:0;
  bottom:1em;
  width:150px;
  background: rgb(255, 153, 0) !important;
}
.chart_entreprise p{
 font-size:.89em;
}
.showCharte{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  width:100%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background:rgba(0, 0, 0, 0.346);
}


@import url("../assets/w3.css");
.btn-lg{
  margin:0 1em !important;
}
select {
  font-size: 16px;
  padding: 10px 16px;
  font-family: LatoRegular;
  border: 1px solid rgb(5, 35, 73);
  width: 20%;
  border-radius: 6px;
}

#load_more {
  border: 1px solid rgb(5, 35, 73) !important;
}
.fw-bold{
  font-weight: 900 !important;
}
.num{
  font-size:5em;
}
.textSt{
  font-size:.8em;
}
.login {
  width: 200px;
  height: 50px;
  padding: 0 1em;
  border-radius: 5px;
  color:white !important;
}
.div{
  width:25px;
  margin:auto;
}
.login a {
  color: white !important;
}
.main-container-home {
  background: transparent;
}
.conteneur-how_run {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
  flex-wrap: wrap;
  padding: 3em 5em !important;
  position:relative;
}
.my-card {
  width: 100%;
  height: auto;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.332);
  padding:1em;
}
.sub_card_img {
  width: 90%;
  height: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
}
.count{
  position: relative;
}
.img-fluid {
  position: absolute;
  width: auto;
  height: 100%;
  margin-right: 50%;
  transform: translateX(-50%);
  object-fit: cover;
}
.bi-person-lines-fill,.bi-briefcase-fill,.bi-chat-square-text-fill{
  font-size:2em !important;
}
.stat{
  background: rgb(5, 35, 73) !important;
  padding: 2em;
  color:white !important;
}
.header_banner{
width:100%;
height:auto;
padding:6em 0 1em 0;
display:flex;
justify-content:center;
align-items: center;
flex-wrap: wrap !important;

}
h3{
  color:white;
  text-decoration: underline;
  padding:.5em 0;
}
.cont1{
  background: orange;
   height:50vh;
}
.ecriteau{
  left:0;
  top:35%;
  font-weight: bold;
  flex:1;
}
.ecriteau_image{
  width:100%;
  position:relative;
  flex:1;
}
.info{
  height:100% !important;
  display:flex;
  justify-content:center;
  align-items: center;
  flex-wrap: wrap;
  padding:4em 0;
}
.cont-one{
  transform:rotate(10deg) translateX(-63px);
}
.cont-two{
  transform:rotate(-10deg);
}
.cont-one,.cont-two{
  width:300px;
  height:300px;
  padding:1.5em;
  margin:0 1em;
  border-radius: 10px;
  background: rgba(0, 213, 255, 0.257);
}
.image{
  top:0;
  right:0;
  left:0;
  bottom:0;
  width:100%;
  height:100%;
  border-radius:30px;
}
@media screen and (max-width:1088px){
  .header_banner{
    padding:.5em !important;
    }
  .main-container-home{
    padding:1em 0;
  }
}
@media screen and (max-width:800px) {
  h1{
    font-size:25px;
  }
  .alerte_emploi{
  flex-direction:column;
  }
}
@media screen and (max-width:500px) {
  h1{
    font-size:20px;
  }
}
@media screen and (max-width:400px) {
  h1{
    font-size:15px;
  }
}
</style>
