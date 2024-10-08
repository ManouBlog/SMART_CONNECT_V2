<script>
import instance, { lienPhoto } from "../../../api/api";
// import $ from "jquery";
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Help } from "../../../utils";
import Swal from "sweetalert2";
export default {
  name: "DetailPostulantsView",
  data() {
    return {
      offresInteressByStudents: null,
      lienPhoto: lienPhoto,
      offre: null,
      offres: null,
      spinner: false,
      detailStudents: [],
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  methods: {
    get_offres_interess_by_student() {
      this.spinner = true;
      instance
        .get("list_offres_interess_by_students")
        .then((res) => {
          console.log(res);
          this.offresInteressByStudents = Help.groupBy(res.data);
          console.log("OFFRESINTERESSBYSTUDENTS", this.offresInteressByStudents);
          for (let item in this.offresInteressByStudents) {
            if (item === this.$route.params.offre) {
              this.detailStudents = this.offresInteressByStudents[item];
            }
          }

          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async chooseStudent(id, idStud) {
      console.log(id);
      try {
        const data = {
          id: id,
          recruit: 1,
        };
        const reponse = await instance.post("recruitStudent", data);
        if (reponse.data.status) {
          this.detailStudents.forEach((item) => {
            if (item.students_id === idStud) {
              item.recruit = 1;
            }
          });
          Swal.fire({
            icon: "success",
            title: reponse.data.message,
            showConfirmButton: true,
          });
        }
        console.log(reponse);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "success",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      }
    },
  },
  created() {
    this.get_offres_interess_by_student();
  },
};
</script>

<template>
  <section v-if="this.$store.state.translate === 'FR'">
    <div class="page-body position-relative mt-5">
      <div class="container-fluid">
        <div class="page-title">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              Postulants / Offre : {{ this.$route.params.offre }}
            </li>
          </ol>
        </div>
      </div>
      <h2 class="text-left my-5 mx-5">{{ detailStudents.length }} étudiants</h2>
      <div
        v-if="detailStudents != null"
        class="d-flex align-items-center justify-content-center flex-wrap"
      >
        <div
          class="details_entreprise card px-3 mx-3 w-100 position-relative"
          v-for="(item, index) in detailStudents"
          :key="index"
        >
          <h4><span>Nom</span> {{ item.nom }}</h4>
          <h4><span>Prénoms</span> {{ item.prenoms }}</h4>
          <h4><span>Email</span> {{ item.email }}</h4>
          <h4><span>Ville</span> {{ item.ville }}</h4>
          <h4><span>Quartier</span> {{ item.quartier }}</h4>
          <h4><span>Commune</span> {{ item.commune }}</h4>
          <h4><span>Télephone</span> {{ item.phone }}</h4>
          <h4><span>Diplome</span> {{ item.diplome }}</h4>
          <div>
            <h4><span>Carte étudiante</span></h4>
            <n-image width="100" :src="lienPhoto + item.photo" :alt="item.photo" />
          </div>
          <!-- <img :src="lienPhoto+item.photo"
           class="border-2 rounded" :alt="item.photo"> -->
          <button
            v-if="item.recruit === 0"
            class="btn-lg bg-dark mt-3"
            @click="chooseStudent(item.id, item.students_id)"
          >
            Sélectionner
          </button>
          <h3 v-else class="text-success">
            <i class="bi bi-check-lg"></i>
            Sélectionné
          </h3>
        </div>
      </div>
      <div v-else>
        <h1>Loading...</h1>
      </div>
    </div>
  </section>
  <section v-if="this.$store.state.translate === 'EN'">
    <div class="page-body position-relative mt-5">
      <div class="container-fluid">
        <div class="page-title">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              Applicants / Offer : {{ this.$route.params.offre }}
            </li>
          </ol>
        </div>
      </div>
      <h2 class="text-left my-5 mx-5">{{ detailStudents.length }} Students</h2>
      <div
        v-if="detailStudents != null"
        class="d-flex align-items-center justify-content-center flex-wrap"
      >
        <div
          class="details_entreprise card px-3 mx-3 w-100 position-relative"
          v-for="(item, index) in detailStudents"
          :key="index"
        >
          <h4><span>Last name</span> {{ item.nom }}</h4>
          <h4><span>First name</span> {{ item.prenoms }}</h4>
          <h4><span>Email</span> {{ item.email }}</h4>
          <h4><span>City</span> {{ item.ville }}</h4>
          <h4><span>Headquarter</span> {{ item.quartier }}</h4>
          <h4><span>Municipality</span> {{ item.commune }}</h4>
          <h4><span>Phone</span> {{ item.phone }}</h4>
          <h4><span>Diploma</span> {{ item.diplome }}</h4>
          <div>
            <h4><span>Student card</span></h4>
            <n-image width="100" :src="lienPhoto + item.photo" :alt="item.photo" />
          </div>
          <button
            v-if="item.recruit === 0"
            class="btn-lg bg-dark mt-3"
            @click="chooseStudent(item.id, item.students_id)"
          >
            Select
          </button>
          <h3 v-else class="text-success">
            <i class="bi bi-check-lg"></i>
            Selected
          </h3>
        </div>
      </div>
      <div v-else>
        <h1>Loading...</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
.breadcrumb {
  width: 400px;
}
.text-success {
  color: green !important;
}
img {
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 5;
  width: 300px;
  height: 300px;
}
.position-relative {
  position: relative;
}

.mt-5 {
  margin-top: 101px !important;
}
.badge {
  width: 300px !important;
  font-weight: bold !important;
  color: white !important;
}

.bi-arrow-left-circle {
  cursor: pointer;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.body-card {
  background: transparent;
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
.details_entreprise {
  text-align: left;
  padding: 1em 3em !important;
  align-self: flex-start;
}
.details_entreprise span {
  color: gray;
}
.w-25 {
  width: 120px !important;
}
</style>
