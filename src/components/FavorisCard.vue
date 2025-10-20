<template>
  <div class="notification-item">
    <div class="notification-avatar">
      <img
      v-if="favoris?.photo_profil"
        :src="lienPhoto + favoris?.photo_profil"
        alt="Avatar"
      />
      <span
          class="user-avatar"
            style="
              border: 2px solid orange;
              object-fit: cover;
              width: 40px;
              height:40px;
              line-height:40px;
              text-align:center;
              font-size:1em;
              border-radius: 100%;
              background: gray;
            "
            v-else
          >
           <span style="font-size:1em;color:white;" v-if="favoris?.nom">{{Help.toADfirstTwo(favoris?.nom)}}</span>
          </span>
    </div>
    <div class="notification-content">
      <div class="notification-header">
        <span class="notification-username">{{ favoris?.nom }} {{ favoris?.prenoms }}</span>
         <span class="notification-objet" v-if="favoris?.nom_offre && isDetailPostulant">
    vient de postuler à l'offre:{{favoris?.nom_offre}}
  </span>
        <span class="notification-time"
        v-if="favoris?.created_at && isDetailPostulant"
        >{{ formattedTimestamp }}</span>
      </div>
    </div>
     <div class="favoris-actions">
      <button
        @click="handleAccept"
        class="accept-button"
>
        Voir+
      </button>
    </div>
  </div>
</template>

<script>
import { Help } from '../utils';
import { lienPhoto } from '../api/api';
export default {
  name: 'favorisCard',
  data() {
    return {
      lienPhoto: lienPhoto,
      Help:Help,
    };
  },
  props: {
    favoris: {
      type: Object,
      required: false,
    },
    isDetailPostulant:{
        type:Boolean,
        default:false
    },
    arrayNotifications:Array
  },
  computed: {
    formattedTimestamp() {
        if(this.favoris.created_at){
 return new Date(this.favoris.created_at).toLocaleString('fr-FR', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      });
        }else{
            return new Date();
        }
    },
  },
  methods: {
    handleAccept() {
      console.log("this.favoris",this.favoris)
      this.$emit('accept', this.favoris);
    },
  },
};
</script>

<style scoped>
.notification-objet {
  font-weight: bold;
  color: orange;
  margin-right: 4px;
}
.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 8px;
  position: relative;
  background-color: #ffffff;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.265);
}

.notification-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 10%;
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
