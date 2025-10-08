<script>
export default {
  name: "CardView",
  props: {
    item: {
      type: Object,
    },
    cardPerfVisible:{
      type:Boolean
    }
  },
  data() {
    return {};
  },
};
</script>
<template>
  <a-card 
  
  :class="cardPerfVisible ? item.class:null"
  style="width: 300px;color: var(--third-color) !important; background: var(--secondary-color) !important">
    <div class="div_conteneur">
      <h6>{{ item.id }}</h6>
    </div>
    <h3 class="texte-center" style="color:var(--third-color) !important;">{{ item.title }}</h3>
    <div v-if="item.text_one || item.text_two">
      <p>
        {{ item.text_one }}</p>
      <p>{{ item.text_two }}</p>
    </div>
  </a-card>
</template>
<style scoped>
p {
  font-weight: 400;
}
h3,
h6 {
  font-weight: bold;
}
.div_conteneur {
  display: flex;
  justify-content: center;
}
h6 {
  width: 30px;
  height: 30px;
  padding: 1.2em;
  display: flex;
  justify-content: center;
  place-items: center;
  background: orange;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.152);
  border-radius: 5px;
}
p {
  font-size: 1em;
}
/* Animation depuis la gauche */
@keyframes slideFromLeft {
  from {
    transform: translateX(-150%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.slide-from-left {
  animation: slideFromLeft 0.8s ease-out forwards;
}

/* Animation de fondu */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.fade-in {
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 0.3s; /* Délai pour un effet séquentiel */
}

/* Animation depuis la droite */
@keyframes slideFromRight {
  from {
    transform: translateX(200%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.slide-from-right {
  animation: slideFromRight 0.8s ease-out forwards;
  animation-delay: 0.6s; /* Délai plus long pour le dernier élément */
}
</style>
