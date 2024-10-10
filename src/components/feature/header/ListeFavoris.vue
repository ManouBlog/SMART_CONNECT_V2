<script>
import { mapState } from "pinia";
import { useListeFavoris } from "../../../store-pinia/ListeFavoris/useListeFavoris";
export default {
  name: "ListeFavoris",
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
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <h6 class="text-center">Liste de favoris</h6>
        <div v-if="myListOfFavoris > 0" class="cont px-3">
          <div
            v-for="(item, index) in myListOfFavoris"
            :key="index"
            class="listWhistPerson"
          >
            <div>
              <h4 class="name">{{ item.nom }} {{ item.prenoms }}</h4>
            </div>
            <div>
              <button
                class="btn bg-primary btnForInteress"
                @click="voirDetailTimetable(item.id)"
              >
                Voir plus
              </button>
            </div>
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
