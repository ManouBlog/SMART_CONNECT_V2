<script>
import { mapState, mapActions } from "pinia";
import instance from "../../../api/api";
import Swal from "sweetalert2";
import { useListeFavoris } from "../../../store-pinia/ListeFavoris/useListeFavoris";
import { useNotificationsStore } from "../../../store-pinia/useNotificationsStore";

export default {
  name: "ListeAlarmStudent",
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
      dataAlarm: [],
    };
  },
  computed: {
    ...mapState(useListeFavoris, ["myListOfFavoris"]),
    ...mapState(useNotificationsStore, ["unreadNotifications"]),
  },
  methods: {
    ...mapActions(useNotificationsStore, ["getListNotification"]),
    voirDetailPostulants(nameOffre) {
      this.get_offres_interess_by_student();
      this.$router.push({
        name: "detailsPostulants",
        params: { offre: nameOffre?.nom_offre },
      });
    },
    async get_offres_interess_by_student() {
      try {
        const response = await instance.get("list_offres_interess_by_students");
        if (response["status"] === 200) {
          this.dataAlarm = Object.values(response?.data || {})
  .filter(item => typeof item === 'object' && !Array.isArray(item))
  .filter(item => item?.recruit === 0);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async seeMyNotifications() {
      try {
        const response = await instance.get("markAllAsRead");
        if (response["status"] === 200) {
          this.$router.push({
            name: "notifications",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "info",
          title: error,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  },
  async created() {
    this.get_offres_interess_by_student();
    this.getListNotification();
  },
};
</script>
<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent="seeMyNotifications">
      <em
        class="bi bi-bell"
        style="font-size: 1.5em;margin-left:-0.6em;color: gray;"
        @click="showWishList = !showWishList"
      ></em>
      <span v-if="this.unreadNotifications.length > 0" class="badge bg-danger">{{
        this.unreadNotifications.length
      }}</span>
    </a>
    <template #overlay>
      <a-menu style="margin-left: -4.5em">
        <h6 style="color: orange; font-weight: bold; padding: 0 1em">Notifications</h6>
        <div class="cont px-3">
          <div v-if="!this.unreadNotifications.length">
            <h6 style="text-align: center; color: gray">Pas de notification(s)
              
            </h6>
          </div>
          <div v-else>
            <h6 style="text-align: center; color: gray">
              Vous avez {{ this.$store.state.contratStudent ? this.unreadNotifications.length+this.$store.state.contratStudent:this.unreadNotifications.length}} notification(s)
            </h6>
          </div>
        </div>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style scoped>
.ant-dropdown-link {
  cursor: pointer;
}
.bi-balloon-heart {
  font-size: 1.6em;
}
.conteneurWishlist {
  position: relative;
}
</style>
