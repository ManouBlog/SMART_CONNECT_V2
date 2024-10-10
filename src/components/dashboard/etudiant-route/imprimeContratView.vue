<script>
import instance from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
export default {
  name:"imprimeContratView",
  components: {
    HeaderDashboard
  },
  data() {
    return {
      offreDetail:"",
      list_entreprise_contact: "",
      entreprise:null,
      user: this.$store.state.user,
      myOffre:null,
      created_at:"",
    };
  },
  methods: {
    printDiv() {
      let divContents = document.getElementById("printDetail");
      let a = window.open("", "", "height=400,width=400");
      a.document.write("<html><head>");
      a.document.write("</head><body>");
      a.document.write(`<div>
      ${divContents.innerHTML}
      </div>`);
      a.document.write("</body></html>");
      a.document.close();
      setTimeout(() => {
        a.print();
        a.close();
      }, 300);
    },
    getDetail(){
      instance
      .get("get_who_contact_student")
      .then((res) => {
        console.log("get_who_contact_student",res);
        this.offreDetail = res.data;
        console.log("this.$route.params.id",this.$route.params.id)
        console.log("ENTREPRISES", this.list_entreprise_contact);
        this.entreprise = this.offreDetail.entreprises.find(
          (item) => Number(item.pivot.id) === Number(this.$route.params.id)
        );
        this.myOffre = this.entreprise.pivot.offre
        console.log("this.myOffre",this.myOffre)
        this.created_at = this.entreprise.pivot.created_at
        console.log("this.entreprise",this.entreprise);
        this.spinner = false;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  created() {
   this.getDetail()
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="`Attestation d'admission`"
      :subTitleHeader="`Attestation d'admission`"
    />
    
  
    <div class="tab-content" id="top-tabContent">
      <div id="printDetail">
        
          <div class="text-left px-5" v-if="this.myOffre && this.entreprise">
            <div class="conteneur-img">
            </div>
            <h1 class="text-center">ATTESTATION D'ADMISSION</h1>
            <h2>
              Offre : {{this.myOffre.nom_offre}}
            
            </h2>
            <h5 class="text-left">
              L'entreprise
              <strong>{{ this.entreprise.nom }}</strong> vous a contacté Mr(Mme)
              <strong>{{ user.nom }} {{ user.prenoms }}</strong>
              pour un poste au sein de son entreprise pour effectuer un travail
              vu votre disponibilité.Merci de contacter l'entreprise pour plus de détail.
              
            </h5>
            <div>
              <h4>Honoraire : {{myOffre.salaire}} Fcfa</h4>
              <h4>Contact du gérant : {{entreprise.contact}}</h4>
              <h4>Lieu : {{myOffre.lieu}}</h4>
            </div>
            <strong v-if="this.entreprise" class="date">
              Abidjan le :
              {{ new Date(this.created_at).toISOString().slice(0,16) }}
            </strong> 
          </div>
      </div>
      <button class="btn-lg p-5 bg-warning" style="border:none" @click="printDiv" v-if="this.myOffre && this.entreprise">Imprimer</button>
    </div>
  </div>
</template>
<style scoped>
.mt-5 {
  margin-top: 101px !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
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
@media screen, print {
  .conteneur-img {
    width: 150px;
    height: 150px;
    position: relative;
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: center;
  }
  .card {
    text-align: left !important;
    border-radius: 0 !important;
  }
  .card h1 {
    text-align: center;
    border: 1px solid black;
    width: 40%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-bottom: 1em !important;
  }
  .card p {
    text-align: center;
  }
  .date {
    text-align: right !important;
    margin-bottom: -10px;
  }
}
</style>
