<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      students: "",
      list_entreprise_contact: "",
      entreprise: "",
      user: this.$store.state.user,
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
  },
  created() {
    axios
      .get("http://192.168.1.14:8000/api/get_who_contact_student", {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.student = res.data;
        console.log("STUDENTS_ENTREPRISES", this.student);
        this.list_entreprise_contact = this.student.entreprises;
        console.log("ENTREPRISES", this.list_entreprise_contact);
        this.entreprise = this.list_entreprise_contact.find(
          (item) => parseInt(item.id) == this.$route.params.id
        );
        console.log(this.entreprise);
        this.spinner = false;
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
      });
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Entreprises interressées</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="tab-content" id="top-tabContent">
      <div class="container-fluid" id="printDetail">
        <div class="row">
          <div class="col-sm-12 card py-3 px-2">
            <div class="conteneur-img">
              <img src="../../assets/lce.png" alt="image" />
            </div>
            <h1>ATTESTATION DE TRAVAIL</h1>
            <p v-if="user">
              L'entreprise <strong>{{ this.entreprise.nom }}</strong> vous a contacté
              Mr(Mme) <strong>{{ user.nom }} {{ user.prenoms }}</strong> pour un poste au
              sein de son entreprise pour effectuer un travail vu votre disponibilité.
              <br />
              Merci de contacter l'entreprise pour plus de détail.
            </p>
            <strong v-if="this.entreprise" class="date">
              Abidjan le :
              {{ new Date(entreprise.pivot.created_at).toLocaleString("fr") }}
            </strong>
          </div>
        </div>
      </div>
      <button class="btn-lg bg-primary" @click="printDiv">Imprimer</button>
    </div>
  </div>
</template>
<style scoped>
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
