<template>
  <div class="notification-item">
    <div class="notification-avatar">
      <img
        v-if="favoris?.student.photo_profil"
        :src="lienPhoto + favoris?.student.photo_profil"
        alt="Avatar"
        style="width: 90px !important; height: 90px !important"
      />
      <span
        class="user-avatar"
        style="
          border: 2px solid orange;
          object-fit: contain;
          width: 150px !important;
          height: 150px !important;
          line-height: 50px;
          text-align: center;
          padding: 1em;
          font-size: 1em;
          border-radius: 10%;
          background: gray;
        "
        v-else
      >
        <span style="font-size: 1em; color: white" v-if="favoris?.student.nom">{{
          Help.toADfirstTwo(favoris?.student.nom)
        }}</span>
      </span>
    </div>
    <div class="notification-content">
      <div class="notification-header">
        <span class="notification-username"
          >{{ favoris?.student.nom }} {{ favoris?.student.prenoms }}</span
        >
        <span style="color: gray" v-if="favoris?.offre.nom_offre && isDetailPostulant">
          vient de postuler à l'offre:{{ favoris?.offre.nom_offre }}
        </span>
        <span class="notification-time" v-if="favoris?.created_at && isDetailPostulant">{{
          formattedTimestamp
        }}</span>
      </div>
    </div>
    <div class="favoris-actions">
      <button @click="handleAccept" class="accept-button">Voir+</button>
    </div>
  </div>
</template>

<script>
import { Help } from "../utils";
import { lienPhoto } from "../api/api";
export default {
  name: "favorisCard",
  data() {
    return {
      lienPhoto: lienPhoto,
      Help: Help,
    };
  },
  props: {
    favoris: {
      type: Object,
      required: false,
    },
    isDetailPostulant: {
      type: Boolean,
      default: false,
    },
    arrayNotifications: Array,
  },
  computed: {
    formattedTimestamp() {
      if (this.favoris.created_at) {
        return new Date(this.favoris.created_at).toLocaleString("fr-FR", {
          timeZone: 'Africa/Abidjan',
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      } else {
        return new Date();
      }
    },
  },
  methods: {
    handleAccept() {
    
      this.$emit("accept", this.favoris.offre);
    },
  },
};
</script>

<style scoped>
.accept-button {
  border: none;
  padding: 1em;
  background: orange;
  color: white;
}
.notification-objet {
  font-weight: bold;
  color: orange;
  margin-right: 4px;
}
.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 25px 16px;
  border-radius: 8px;
  position: relative;
  background-color: #ffffff;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.265);
  width: 100%;
  height: auto;
}
.listWhistPerson {
  padding: 0 !important;
}

.notification-avatar img {
  width: 150px;
  height: 150px;
  border-radius: 10%;
  padding: 1em;
  object-fit: contain;
}
.flou_image {
  filter: blur(3px);
}

.notification-content {
  flex: 1;
  margin-left: 12px;
}

.notification-header {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  flex-direction: column;
}

.notification-username {
  font-weight: 600;
  color: #1a1a1a;
  margin-right: 4px;
}

.notification-action {
  color: #666;
  margin-right: 4px;
}

.notification-time {
  color: #8e8e8e;
  font-size: 12px;
  font-weight: bold;
}

.notification-indicator {
  width: 8px;
  height: 8px;
  background-color: #ff4757;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  left: 8px;
}
</style>
