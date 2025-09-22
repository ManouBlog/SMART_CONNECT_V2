<template>
  <div class="favoris-card">
    <div class="favoris-header">
          <n-avatar
            v-if="favoris.photo_profil"
            class="user-avatar"
            style="border: 2px solid orange; object-fit: cover"
            round
            :size="55"
            :src="lienPhoto + favoris.photo_profil"
          />
          <span
          class="user-avatar"
            style="
              border: 2px solid orange;
              object-fit: cover;
              width: 50px;
              height:50px;
              line-height:50px;
              text-align:center;
              font-size:1em;
              border-radius: 100%;
              background: gray;
            "
            v-else
          >
           <span style="font-size:1em;color:white;">{{Help.toADfirstTwo(favoris.nom)}}</span>
          </span>
      <div class="favoris-info">
        <p class="user-name">{{ favoris.nom }} {{ favoris.prenoms }}</p>
        <!-- <p class="event-name">vous a invité à {{ favoris.eventName }}</p> -->
        <!-- <p class="timestamp">{{ formattedTimestamp }}</p> -->
      </div>
    </div>
    <div class="favoris-actions">
      <!-- <button
        @click="handleDecline"
        class="decline-button"
      >
        Supprimer
      </button> -->
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
      Help:Help
    };
  },
  props: {
    favoris: {
      type: Object,
      required: false,
    },
  },
  computed: {
    formattedTimestamp() {
      return new Date(this.favoris.timestamp).toLocaleString('fr-FR', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  methods: {
    handleAccept() {
      this.$emit('accept', this.favoris.id);
    },
    // handleDecline() {
    //   this.$emit('decline', this.favori.id);
    // },
  },
};
</script>

<style scoped>
.favoris-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px 1.5em;
  width: auto;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.favoris-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}

.favoris-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  margin: 0;
}

.event-name {
  margin: 4px 0;
  color: #666;
}

.timestamp {
  margin: 0;
  color: #999;
  font-size: 0.9em;
}

.favoris-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.decline-button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.accept-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: orange;
  color: white;
  cursor: pointer;
}
</style>
