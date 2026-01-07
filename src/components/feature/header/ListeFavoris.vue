<script>
import { mapState } from "pinia";
import FavorisCard from "../../FavorisCard.vue";
import { useListeFavoris } from "../../../store-pinia/ListeFavoris/useListeFavoris";
export default {
  name: "ListeFavoris",
  components: { FavorisCard },
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
  computed: { ...mapState(useListeFavoris, ["myListOfFavoris"]) },
  methods: {
    voirDetailTimetable(payload) {
      // console.log("voirDetailTimetable",payload)
      this.$router.push({
        name: "detailStudent",
        params: { id: payload.id },
      });
    },
  },
};
</script>
<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <em
        class="bi bi-heart-fill"
        :class="this.$store.state.whistListPerson.length ? 'text-danger' : null"
        style="font-size: 1.3em"
        @click="showWishList = !showWishList"
      ></em>
      <span v-if="this.$store.state.whistListPerson.length > 0" class="badge bg-dark">{{
        this.$store.state.whistListPerson.length
      }}</span>
      <!-- <DownOutlined /> -->
    </a>
    <template #overlay>
      <a-menu style="margin-left: -4.5em">
        <h6 style="color: orange; font-weight: bold; padding: 0 1em">Mes favoris</h6>
        <div class="cont px-3">
          <div
            v-for="(item, index) in this.$store.state.whistListPerson"
            :key="index"
            class="listWhistPerson"
          >
            <FavorisCard :favoris="item" @accept="voirDetailTimetable" />
          </div>
          <div v-if="!this.$store.state.whistListPerson.length">
            <h6 style="text-align: center; color: gray">
              Retrouvez en un clic les talents que vous aimez le plus.
            </h6>
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
