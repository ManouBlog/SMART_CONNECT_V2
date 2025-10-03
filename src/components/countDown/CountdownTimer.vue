<template>
  <div class="countdown">
    <span class="countdown-item">{{ days }}J</span>
    <span class="countdown-separator">:</span>
    <span class="countdown-item">{{ hours }}H</span>
    <span class="countdown-separator">:</span>
    <span class="countdown-item">{{ minutes }}M</span>
    <span class="countdown-separator">:</span>
    <span class="countdown-item">{{ seconds }}S</span>
  </div>
</template>

<script setup>
import { ref, onMounted,defineProps } from 'vue';

const props = defineProps({
  targetDate: {
    type: String,
    required: true,
    default: null
  },
});
function deletePageAnnonces() {
    console.log("deletePageAnnonces",deletePageAnnonces)
}

const days = ref('00');
const hours = ref('00');
const minutes = ref('00');
const seconds = ref('00');

onMounted(() => {
  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = new Date(props.targetDate).getTime() - now;

    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');
    hours.value = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, '0');
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    if (distance < 0) {
      clearInterval(countdown);
      days.value = '00';
      hours.value = '00';
      minutes.value = '00';
      seconds.value = '00';
      deletePageAnnonces();
    }
  }, 1000);
});
</script>

<style scoped>
.countdown {
  display: flex;
  flex-direction: row; /* forcer row même en mobile */
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  font-family: 'Poppins', sans-serif;
}
.countdown-item {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
}

.countdown-separator {
  font-size: 3rem;
  color: white;
}

/* Ajustement pour tablettes */
@media (max-width: 768px) {
  .countdown {
    font-size: 2.5rem;
    gap: 8px;
  }
  .countdown-separator {
  font-size: 1.5rem !important;
}
}

/* Ajustement pour mobiles */
@media (max-width: 480px) {
  .countdown-separator {
  font-size: 1.5rem !important;
}
  .countdown {
    font-size: 1.5rem;
    gap: 5px;
  }
}


</style>
