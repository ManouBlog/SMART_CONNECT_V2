<script>
export default {
    name:"TableauDeBord",
    props:{
    infosArray:{type:Array}
    },
    data() {
        return{

        }
    },
}
</script>
<template>
    <div class="conteneur_tableau_de_bord">
        <a-card v-for="(item,index) in infosArray"
        :key="index"
        :title="item.libelle" 
        :bordered="false"
        style="width: 300px">
          <h1>{{item.nbre}}</h1>
        </a-card>
      </div>
</template>
<style>
.conteneur_tableau_de_bord {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  place-content: center;
  justify-content: center;
  gap: 1em;
  padding: 5em 0;
}
</style>