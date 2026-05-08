<script>
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
};
</script>
<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <em
        class="bi bi-heart-fill"
        :class="this.$store.state.whistListPerson?.length ? 'text-danger' : null"
        style="font-size: 1.5em;margin: 0 0.5em;color: gray;"
        @click="this.$router.push('/favoris')"
      ></em>
      <span v-if="this.$store.state.whistListPerson?.length > 0" class="badge bg-dark">{{
        this.$store.state.whistListPerson?.length
      }}</span>
    </a>
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
