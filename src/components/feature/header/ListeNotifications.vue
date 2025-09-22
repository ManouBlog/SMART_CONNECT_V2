<script>
import { mapState } from "pinia";
import instance from "../../../api/api";
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
      dataAlarm:[]
    };
  },
  computed: {...mapState(useListeFavoris,["myListOfFavoris"])},
  methods: {
    voirDetailPostulants(nameOffre) {
      this.$router.push({
        name: "detailsPostulants",
        params: { offre: nameOffre?.nom_offre },
      });
    },
     async get_offres_interess_by_student() {
      try {
        const response = await instance.get("list_offres_interess_by_students");
        // console.log(
        //  "get_offres_interess_by_student",
        //  response.data.filter((item) => item.recruit === 1)
        // );
        if (response["status"] === 200) {
          this.dataAlarm = response.data.filter((item) => item.recruit === 1);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
   async created() {
    this.get_offres_interess_by_student();
    // console.log("dataAlarmNOTIFICATIONS",this.dataAlarm)
  },
};
</script>
<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <em class="bi bi-bell" style="font-size:1.1em"
       @click="showWishList = !showWishList"></em>
     <span  class="badge bg-danger">{{this.dataAlarm.length}}</span>
    </a>
    <template #overlay>
      <a-menu style="margin-left:-4.5em;">
        <h6 style="color:orange;font-weight:bold;padding:0 1em;">Notifications</h6>
        <div class="cont px-3">
          <div
            v-for="(item, index) in this.dataAlarm"
            :key="index"
            class="listWhistPerson"
          >
          <FavorisCard 
           :favoris="item"
           @accept="voirDetailPostulants"
           :isDetailPostulant="true"
          />
          </div>
          <div  v-if="!this.dataAlarm.length">
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
