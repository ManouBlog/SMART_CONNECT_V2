<script>
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions, mapState } from "pinia";
import InfoForModifyEntreprises from "./viewForModifier/InfoForModifyEntreprises.vue";
import CvStudent from "./CvStudent.vue";
import { lienPhoto } from "../../../../api/api";
import { Help } from "../../../../utils";
export default {
  name: "ModalForModifyInfo",
  components: {
    InfoForModifyEntreprises,
    CvStudent,
  },
  data() {
    return {
      Help: Help,
      lienPhoto: lienPhoto,
    };
  },
  methods: {
    ...mapActions(useInfoPersonnel, ["changeValueForToogleModalInfoPersonnelle"]),
  },
  computed: {
    ...mapState(useInfoPersonnel, [
      "toogleModalInfoPersonnelle",
      "isbtnPdf",
      "isCv",
      "infoUserConnected",
    ]),
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    style="width: 850px; padding: 0 1em"
    v-model:open="toogleModalInfoPersonnelle"
    @cancel="changeValueForToogleModalInfoPersonnelle({ isCv: false, isbtnPdf: false })"
    @ok="changeValueForToogleModalInfoPersonnelle({ isCv: false, isbtnPdf: false })"
  >
    <CvStudent
      :isbtnPdf="this.isbtnPdf"
      :nom="this.infoUserConnected?.user?.nom +' '+this.infoUserConnected?.user?.prenoms"
      :photo="this.infoUserConnected?.photo_profil ? lienPhoto + this.infoUserConnected?.photo_profil:null"
      :telephone="`${this.infoUserConnected?.phone}`"
      :email="this.infoUserConnected?.user?.email"
      nationalite="Ivoirienne"
      :titreCv="this.infoUserConnected?.titreCv"
      :description="this.infoUserConnected?.bio"
      :qualifications="
        this.infoUserConnected?.qualifications?.map((qualifi) => {
          return {
            periode: `${Help.formatDateToMonthYear(
              qualifi?.date_debut
            )} - ${Help?.formatDateToMonthYear(qualifi?.date_fin)}`,
            detail: qualifi?.detail,
            objet:qualifi?.objet
          };
        })
      "
      :experiences="
        this.infoUserConnected?.experiences?.map((experience) => {
          return {
            periode: `${Help.formatDateToMonthYear(
              experience?.dateDebut
            )} - ${Help.formatDateToMonthYear(experience?.dateFin)}`,
            detail: experience?.poste,
          };
        })
      "
      :competences="
        this.infoUserConnected?.competences?.map((item) => {
          return { comp: item?.competence };
        })
      "
      v-if="isCv"
    />
    <div v-else>
      <h5>Modifier Mes informations personnelles</h5>
      <InfoForModifyEntreprises />
    </div>
  </a-modal>
</template>
