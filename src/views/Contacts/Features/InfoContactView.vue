<script>
import CardFooter from "../../../components/feature/Footer/CardFooter.vue";
import {useTranslateStore} from "../../../store-pinia/Translate/useTranslateStore"
import {mapActions} from "pinia"
export default {
  name: "InfoContactView",
  components: {
    CardFooter,
  },
  data() {
    return {texte:"",texte2:"",texte3:""};
  },
  methods:{
  ...mapActions(useTranslateStore,["handleTranslate"])
},
async created(){
this.texte = await this.handleTranslate("Adresse");
this.texte2 = await this.handleTranslate("Adresse email");
this.texte3 = await this.handleTranslate("Contact")
// console.log(this.texte);
  }
};
</script>
<template>
  <section class="main-container-footer">
    <CardFooter
      :icone_name="'bi bi-building'"
      :title="texte"
      :listLien="['Cocody Angre Nouveau CHU Immeuble Bissié 1er Etage Porte D']"
    />
    <CardFooter
      :icone_name="'bi bi-envelope'"
      :title="texte2"
      :listLien="['Support@lce-ci.com']"
    />
    <CardFooter
      :icone_name="'bi bi-person'"
      :title="texte3"
      :listLien="['+225 07 0796 9672']"
    />
  </section>
</template>
<style scoped>
.main-container-footer {
  display: flex;
  justify-content: space-between;
  gap: 2em;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
