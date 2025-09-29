<script>
import { useInfoPersonnel } from "../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions, mapState } from "pinia";
import InfoForModifyEntreprises from "./viewForModifier/InfoForModifyEntreprises.vue";
import CvStudent from "./CvStudent.vue";
export default {
  name: "ModalForModifyInfo",
  components: {
    InfoForModifyEntreprises,
    CvStudent,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useInfoPersonnel, 
    ["changeValueForToogleModalInfoPersonnelle"]),
  },
  computed: {
    ...mapState(useInfoPersonnel, ["toogleModalInfoPersonnelle", "isCv","infoUserConnected"]),
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    style="width: 850px; padding: 0 1em"
    v-model:open="toogleModalInfoPersonnelle"
    @cancel="changeValueForToogleModalInfoPersonnelle({ isCv: false })"
    @ok="changeValueForToogleModalInfoPersonnelle({ isCv: false })"
  >
    <CvStudent
      :nom="this.infoUserConnected.user.nom"
      titre="Homme de ménage / Agent d’entretien"
      naissance="23/12/1998"
      :telephone="`+225${this.infoUserConnected.phone}`"
      :email="this.infoUserConnected.user.email"
      nationalite="Ivoirienne"
      :description="this.infoUserConnected.bio"
      :qualifications="[
        {
          periode: 'Octobre 2025 - Mars 2022',
          detail: 'Caissier en pharmacie et super marché',
        },
      ]"
      :experiences="[{ periode: 'Janvier 2023 - Présent', detail: 'Homme de ménage' }]"
      :competences="this.infoUserConnected.competences.map(item=>{
        return{comp:item.competence}
      })"
      :langues="['Français']"
      :interets="['Sport', 'Musique', 'Voyage']"
      :atouts="[
        'Volonté',
        'Détermination et ponctualité',
        'Disponibilité et bonne volonté',
      ]"
      v-if="isCv"
    />
    <div v-else>
      <h5>Modifier ses informations personnelles</h5>
      <InfoForModifyEntreprises />
    </div>
  </a-modal>
</template>
