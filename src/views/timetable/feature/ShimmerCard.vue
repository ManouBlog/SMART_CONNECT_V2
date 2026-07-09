<!-- ShimmerCard.vue -->
<template>
  <div class="card Mycard-body shimmer-card">
    <!-- Coeur (shimmer) -->
    <div class="icons_interesse">
      <div class="shimmer-icon"></div>
    </div>

    <!-- Avatar / badge profil (shimmer) -->
    <div style="position: absolute; top: 1em; left: 1em;">
      <div class="shimmer-avatar"></div>
    </div>

    <!-- Contenu du card (shimmer) -->
    <div class="card-body">
      <div class="shimmer-title"></div>
      <div class="shimmer-rating"></div>
      <div class="shimmer-status"></div>
      <div class="shimmer-comp"></div>
      <div class="shimmer-button"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShimmerCard',
};
</script>

<style scoped>
:depp(.card) {
  height: 130px !important;
  width: 200px !important;
}

.shimmer-card {
  position: relative;

  margin-bottom: 10px;
  overflow: hidden;
  flex: 1;
}

.shimmer-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.3) 20%,
      rgba(255, 255, 255, 0.1) 60%,
      rgba(255, 255, 255, 0.1) 100%);
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.shimmer-icon,
.shimmer-avatar {
  background: #ccc;
  border-radius: 50%;
  opacity: 0.5;
}

.shimmer-icon {
  width: 1em;
  height: 1em;
}

.shimmer-avatar {
  width: 40px;
  height: 40px;
  border: 2px solid orange;
}

.shimmer-title {
  width: 70%;
  height: 1.2em;
  background: #ccc;
  border-radius: 4px;
  opacity: 0.5;
  margin-bottom: 8px;
}

.shimmer-rating {
  width: 50%;
  height: 1em;
  background: #ccc;
  border-radius: 4px;
  opacity: 0.5;
  margin-bottom: 6px;
}

.shimmer-status {
  width: 100%;
  height: 1em;
  background: #ccc;
  border-radius: 4px;
  opacity: 0.5;
  margin-bottom: 6px;
}

.shimmer-comp {
  width: 80%;
  height: 1.1em;
  background: #ccc;
  border-radius: 4px;
  opacity: 0.5;
  margin-bottom: 8px;
}

.shimmer-button {
  width: 60%;
  height: 1.5em;
  background: #ccc;
  border-radius: 4px;
  opacity: 0.5;
}

/* On garde exactement la même structure de ton card */
.card-body {
  padding: 2em;
}

.icons_interesse {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}
</style>