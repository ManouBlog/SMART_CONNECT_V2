<script>
import { lienPhoto } from "../../../api/api";
import ModalForModifyInfo from "../../../components/dashboard/profil/feature/ModalForModifyInfo.vue";
import { Help } from "../../../utils";
import { useInfoPersonnel } from "../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions } from "pinia";
// import Swal from "sweetalert2";
export default {
  name: "HeaderDetailStudent",
  components: {
    ModalForModifyInfo,
  },
  props: {
    timetable_for_student: { type: Object },
  },
  data() {
    return {
      lienPhoto: lienPhoto,
      Help: Help,
      showCvModal: false,
    };
  },
  methods: {
    ...mapActions(useInfoPersonnel, [
      "changeValueForToogleModalInfoPersonnelle",
      "addInfoUserConnected",
    ]),
    handleModalInfo() {
      this.addInfoUserConnected(this.timetable_for_student);
      // console.log('this.timetable_for_student', this.timetable_for_student)
      this.changeValueForToogleModalInfoPersonnelle({ isCv: true, isbtnPdf: false });
      // if (
      //   this.$store.state.infoUserConnected.user.abonement.length &&
      //   this.$store.state.infoUserConnected.user.abonement.some(
      //     (item) => item.statut === "success"
      //   )
      // ) {

      // } else {
      //   Swal.fire({
      //     icon: "info",
      //     title: "Veuillez souscrire à l’abonnement PLATINUM.",
      //     text: "Accédez aux fonctionnalités premium.",
      //     confirmButtonText: "Voir les abonnements",
      //     showCancelButton: true,
      //     cancelButtonText: "Plus tard",
      //     confirmButtonColor: "orange", // violet / premium
      //     cancelButtonColor: "#6c757d", // gris neutre
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       this.$router.push({ name: "abonnements" });
      //     }
      //   });
      // }
    },
  },
  async created() {
    await this.$store.dispatch("getInfoUser");
  },
};
</script>
<template>
  <ModalForModifyInfo />
  <div class="info_student_detail">

    <div style="display: flex; justify-content: space-between; 
      align-items: center; gap: 1em;
      flex-wrap: wrap;
      ">
      <section class="section_student_header">
        <div>
          <n-avatar v-if="timetable_for_student.photo_profil" style="border: 2px solid orange; object-fit: cover" round
            :size="100" :src="lienPhoto + timetable_for_student.photo_profil" />
          <span style="
            border: 2px solid orange;
            object-fit: cover;
            padding: 35px;
            min-width: 40px;
            min-height: 40px;
            text-align: center;
            border-radius: 100%;
            background: gray;
          " v-else>
            <span style="font-size: 1.2em; font-weight: bold; color: white">{{
              Help.toADfirstTwo(timetable_for_student.nom)
            }}</span>

          </span>
          <i class="bi bi-patch-check-fill" v-if="this.$store?.state?.user?.user?.is_verified"
            style="color:rgb(0, 171, 251);font-size: 1em !important;"></i>

        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5em; align-items: flex-start">
          <h3 class="text-left my-3" style="font-size: clamp(1rem, 3vw, 2rem);">
            {{ timetable_for_student.nom }} {{ timetable_for_student.prenoms }}
          </h3>
          <h4 v-if="timetable_for_student.titreCv !== 'null' && timetable_for_student.titreCv !== null &&
            timetable_for_student.titreCv !== 'undefined' && timetable_for_student.titreCv !== undefined">{{
              timetable_for_student.titreCv }}</h4>
          <!-- Conteneur avec flex et gap -->
          <div v-for="item in timetable_for_student?.user.statuses" :key="item.id">
            <span class="badge bg-warning">{{ item.statut }}</span>

          </div>

          <n-rate v-if="timetable_for_student.average" readonly :default-value="timetable_for_student.average" />
        </div>
      </section>
      <div v-if="timetable_for_student.CVupload">
        <n-modal v-model:show="showCvModal" preset="card" style="width: 80vw; max-width: 1000px;">
          <template #header>
            Curriculum Vitae de {{ timetable_for_student.nom }} {{ timetable_for_student.prenoms }}
          </template>

          <div style="height: 80vh;">
            <iframe :src="this.lienPhoto + timetable_for_student.CVupload"
              style="width: 100%; height: 100%; border: none;"></iframe>
          </div>
        </n-modal>
        <section>
          <div v-if="timetable_for_student.CVupload">
            <n-button type="warning" @click="() => showCvModal = true">
              Voir le CV
            </n-button>
          </div>
        </section>
      </div>
      <div v-if="
        this.$store.state.infoUserConnected.user.abonement.length &&
        this.$store.state.infoUserConnected.user.abonement.some(
          (item) => item.statut === 'success'
        ) && !timetable_for_student.CVupload
      ">
        <button @click="handleModalInfo" style="
          width: auto;
          border-radius: 10%;
          color: white;
          background: orange;
          border: 1px solid white;
        ">
          Voir le CV
        </button>
      </div>

    </div>

    <div v-if="timetable_for_student.bio !== null && timetable_for_student.bio !== 'null'">
      <!-- <p style="color: orange; font-weight: bold">Bio</p> -->
      <p style="
          text-align: justify;
          padding: 0.4em;
          font-weight: bold;
          background: #80808085;
          border-radius: 5px;
          margin: 1em 0;
          color: black;
        ">
        {{ timetable_for_student.bio }}
      </p>
    </div>
    <div class="text-left p-5">
      <h3 class="my-3" v-if="timetable_for_student.commune">
        <em class="bi bi-geo-alt"></em> {{ timetable_for_student.commune }}
      </h3>
      <h4 class="my-3" v-if="timetable_for_student.diplome">
        <em class="bi bi-mortarboard"></em>
        {{ timetable_for_student.diplome }}
      </h4>
    </div>
    <div v-if="timetable_for_student.competences.length" class="text-left my-3" style="width: 50%">
      <p style="
  color: orange; 
  font-weight: bold;
  border-bottom: 1px solid orange;
  padding-bottom: 2px;
  display: inline-block;
  margin-bottom: 1rem;
  ">Compétences :</p>
      <div>
        <span v-for="(item, index) in timetable_for_student.competences" :key="index" class="badge bg-dark my-1">
          <strong>{{ item.competence }}</strong>
        </span>
      </div>

    </div>
    <div v-if="timetable_for_student.qualifications.length" class="text-left my-3" style="width: 50%">
      <p style="
  color: orange; 
  font-weight: bold;
  border-bottom: 1px solid orange;
  padding-bottom: 2px;
  display: inline-block;
  margin-bottom: 1rem;
  ">Qualifications :</p>
      <ul class="list-unstyled cv-qualifications" style="padding: 0 1em;">
        <li v-for="(item, index) in timetable_for_student.qualifications" :key="index" style="list-style-type: disc;"
          class="mb-3 p-3 bg-white border-start border-3 border-primary rounded-end shadow-sm">
          <div class="d-flex align-items-center">
            <!-- Photo ou icône -->
            <div class="mx-3 flex-shrink-0">
              <n-image v-if="item.fileCharged" :src="this.lienPhoto + item.fileCharged" class="rounded-circle"
                width="48" height="48" style="object-fit: cover;" />

            </div>

            <!-- Texte -->
            <div class="flex-grow-1">
              <h6 class="mb-1 fw-bold text-dark">{{ item.objet }}</h6>
              <small class="text-muted">
                📅 {{ new Date(item.date_debut).toLocaleString('fr-FR') }}
                - {{ new Date(item.date_fin).toLocaleString('fr-FR') }}
              </small>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.info_student_detail {
  text-transform: capitalize;
}

.bi-person {
  font-size: 4em;
}

.section_student_header {
  display: flex;
  gap: 1em;
  align-items: center;
  position: relative;
  width: 100%;
}
</style>
