<script>
import { mapState } from "pinia";
import FavorisCard from "../../FavorisCard.vue";
import { useListeFavoris } from "../../../store-pinia/ListeFavoris/useListeFavoris";
export default {
  name: "ListeFavoris",
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
      <em class="bi bi-balloon-heart" @click="showWishList = !showWishList"></em>
      <!-- <DownOutlined /> -->
    </a>
    <template #overlay>
      <a-menu style="margin-left:-4.5em;">
        <h6 class="text-center">Mes favoris</h6>
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
            <!-- <div class="p-2 d-flex align-items-center">
              <em class="bi bi-person mx-2" style="font-size:1.8em;"></em>
              <h4 class="name">
                {{ item.nom }} {{ item.prenoms }}
              </h4>
            </div>
            <div>
              <button
                style="background: var(--secondary-color) !important;color: var(--third-color) !important;"
                class="btn btnForInteress"
                @click="voirDetailTimetable(item.id)"
              >
                Voir plus
              </button>
            </div> -->
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
