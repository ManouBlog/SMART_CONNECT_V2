<script>
import { lienPhoto } from "../../../api/api";
import ModalForModifyInfo from "../../../components/dashboard/profil/feature/ModalForModifyInfo.vue";
import { Help } from "../../../utils";
import { useInfoPersonnel } from "../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions } from "pinia";
import Swal from "sweetalert2";
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
    };
  },
  methods: {
    ...mapActions(useInfoPersonnel, [
      "changeValueForToogleModalInfoPersonnelle",
      "addInfoUserConnected",
    ]),
    handleModalInfo() {
      if (
        this.$store.state.infoUserConnected.user.abonement.length &&
        this.$store.state.infoUserConnected.user.abonement.some(
          (item) => item.statut === "success" && item.abonement.libelle === "PLATINUM"
        )
      ) {
        this.addInfoUserConnected(this.timetable_for_student);
        this.changeValueForToogleModalInfoPersonnelle({ isCv: true, isbtnPdf: false });
      } else {
        Swal.fire({
          icon: "info",
          title: "Veuillez souscrire à l’abonnement PLATINUM.",
          text: "Accédez aux fonctionnalités premium.",
          confirmButtonText: "Voir les abonnements",
          showCancelButton: true,
          cancelButtonText: "Plus tard",
          confirmButtonColor: "orange", // violet / premium
          cancelButtonColor: "#6c757d", // gris neutre
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: "abonnements" });
          }
        });
      }
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
    <div
      style="display: flex; justify-content: space-between; align-items: center; gap: 1em"
    >
      <section class="section_student_header">
        <!-- <em class="bi bi-person"></em> -->
        <n-avatar
          v-if="timetable_for_student.photo_profil"
          style="border: 2px solid orange; object-fit: cover"
          round
          :size="50"
          :src="lienPhoto + timetable_for_student.photo_profil"
        />
        <span
          style="
            border: 2px solid orange;
            object-fit: cover;
            padding: 1em 1.5em;
            line-height: 50px;
            text-align: center;
            border-radius: 100%;
            background: gray;
          "
          v-else
        >
          <span style="font-size: 1.8em; font-weight: bold; color: white">{{
            Help.toADfirstTwo(timetable_for_student.nom)
          }}</span>
        </span>
        <div>
          <h1 class="text-left my-3">
            {{ timetable_for_student.nom }} {{ timetable_for_student.prenoms }}
          </h1>

          <n-rate
            v-if="timetable_for_student.average"
            readonly
            :default-value="timetable_for_student.average"
          />
        </div>
      </section>
      <button
        @click="handleModalInfo"
        style="
          width: auto;
          border-radius: 10%;
          color: white;
          background: orange;
          border: 1px solid white;
        "
      >
        Voir le CV
      </button>
    </div>

    <div v-if="timetable_for_student.bio">
      <!-- <p style="color: orange; font-weight: bold">Bio</p> -->
      <p
        style="
          text-align: justify;
          padding: 0.4em;
          font-weight: bold;
          background: #80808085;
          border-radius: 5px;
          margin: 1em 0;
          color: black;
        "
      >
        {{ timetable_for_student.bio }}
      </p>
    </div>
    <div class="text-left p-5">
      <h3 class="my-3">
        <em class="bi bi-geo-alt"></em> {{ timetable_for_student.commune }}
      </h3>
      <h4 class="my-3">
        <em class="bi bi-mortarboard"></em>
        {{ timetable_for_student.diplome }}
      </h4>
    </div>
    <div
      v-if="timetable_for_student.competences.length"
      class="text-left my-3"
      style="width: 50%"
    >
      <p style="color: orange; font-weight: bold">Compétences</p>
      <span
        v-for="(item, index) in timetable_for_student.competences"
        :key="index"
        class="badge bg-dark my-2"
      >
        <strong>{{ item.competence }}</strong>
      </span>
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
  align-items: flex-start;
  width: 100%;
}
</style>
