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
    <div class="conteneur_tableau_de_bord">
      <a-card title="Postulations" :bordered="false" style="width: 300px">
       <h1>20</h1>
      </a-card>
      <a-card title="Contrats" :bordered="false" style="width: 300px">
        <h1>30</h1>
      </a-card>
    </div>
  
    
  </section>
</template>
<style>
.conteneur_tableau_de_bord{
 display:flex;
 align-items:center;
 flex-wrap: wrap;
 place-content: center;
 justify-content: center;
 gap:1em;
 padding:5em 0;
}
</style>
