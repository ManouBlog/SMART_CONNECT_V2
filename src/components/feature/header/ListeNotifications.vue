<script>
import { mapState } from "pinia";
import FavorisCard from "../../FavorisCard.vue";
import { useListeFavoris } from "../../../store-pinia/ListeFavoris/useListeFavoris";
export default {
  name: "ListeNotifications",
  components:{FavorisCard},
  props: {
    texte: String,
    route_lien: String,
    statut_user: String,
    isNeedConnection: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showWishList: false,
    };
  },
  computed: {...mapState(useListeFavoris,["myListOfFavoris"])},
  methods: {
    voirDetailTimetable(id) {
      this.$router.push({
        name: "detailStudent",
        params: { id: id },
      });
    },
  },
};
</script>
<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <em class="bi bi-bell" style="font-size:1.1em"
       @click="showWishList = !showWishList"></em>
     <span  class="badge bg-danger">2</span>
    </a>
    <template #overlay>
      <a-menu style="margin-left:-4.5em;">
        <h6 style="color:orange;font-weight:bold;">Notifications</h6>
        <div class="cont px-3">
          <div
            v-for="(item, index) in this.$store.state.whistListPerson"
            :key="index"
            class="listWhistPerson"
          >
          <FavorisCard 
           :favoris="item"
           @accept="voirDetailTimetable"
          />
          </div>
          <div  v-if="!this.$store.state.whistListPerson.length">
            <h6 style="text-align:center;color:gray">Pas de messages</h6>
          </div>
        </div>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style scoped>
.bi-balloon-heart {
  font-size: 1.6em;
}
.conteneurWishlist {
  position: relative;
}
</style>
