<script>
export default {
  name: "HeaderDetailStudent",
  props: {
    timetable_for_student: { type: Object },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="info_student_detail">
    <section class="section_student_header">
      <em class="bi bi-person"></em>
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
      class="text-left conteneur_competences my-3"
    >
      <span
        v-for="(item, index) in timetable_for_student.competences"
        :key="index"
        class="badge bg-dark"
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
}
</style>
