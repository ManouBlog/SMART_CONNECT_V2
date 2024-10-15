<script>
import { mapActions, mapState } from "pinia";
import { lienPhoto } from "../../../api/api";
import { useModalExperienceStore } from "../../../store-pinia/ModalExperience/useModalExperienceStore";
export default {
  name: "CardOtherExperience",
  props:{experiences:{type:Array}},
  data() {
    return {lienPhoto:lienPhoto};
  },
  computed: { ...mapState(useModalExperienceStore, ["showModalExperience"]) },
  methods: {
    ...mapActions(useModalExperienceStore, ["changeValueForshowModalExperience"]),
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    v-model:open="showModalExperience"
    @cancel="changeValueForshowModalExperience"
    @ok="changeValueForshowModalExperience"
  >
  <h1 class="text-center" style="color:orange;">Expériences</h1>
    <div
      class="experiences position-relative px-4 pb-5 my-4"
      v-for="(item, index) in experiences"
      :key="index"
    >
      <div class="rond position-absolute"></div>
      <div class="contenteur_experience">
        <div class="proof_experience" v-if="item.proof">
          <n-image width="100" :src="lienPhoto + item.proof" />
        </div>
        <h3 class="text-start">
          {{ item.entreprise }}
        </h3>
        <h6 class="text-start ms-2 fw-bold">
          <span class="badge bg-warning text-light fw-bold">{{ item.poste }}</span>
        </h6>
        <p>
          <em class="bi bi-geo-alt"></em>
          {{ item.lieu }}
        </p>
        <h6 class="text-start ms-2">
          <em class="bi bi-calendar-date"></em>
          {{
            `${new Date(item.dateDebut).toLocaleDateString()} au ${new Date(
              item.dateFin
            ).toLocaleDateString()}`
          }}
        </h6>
        <p class="text-start ms-2" v-if="item.experience">
          {{ item.experience }}
        </p>
      </div>
    </div>
  </a-modal>
</template>
<style scoped>
@import "../../../Shared/styles/stylesExperience.css";
</style>
