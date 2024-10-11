<script>
// import instance, { lienPhoto } from "../../../api/api";
// import Swal from "sweetalert2";

import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
// import Editor from "../components/text-editor.vue";
export default {
  name: "AccueilView",
  components: {
    HeaderDashboard,
  },
  data() {
    return {
      
    };
  },
  methods: {

  },
  computed: {
    
  },
  created() {
  },
};
</script>

<template>
  <section>
    <HeaderDashboard
      :TitleHeader="'Tableau de bord'"
      :subTitleHeader="'Tableau de bord'"
    />
    
  </section>
</template>
