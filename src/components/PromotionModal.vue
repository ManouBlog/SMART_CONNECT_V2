<template>
  <n-modal
    :show="visible"
    preset="card"
    :closable="true"
    :mask-closable="true"
    :mask-style="{ background: 'rgba(0,0,0,0.7)' }"
    style="
      max-width: 300px;
      min-width: 40%;
      text-align: center;
      background: #fff;
      border-radius: 16px;
      padding: 1em;
    "
    @update:show="$emit('update:visible', $event)"
  >
    <template #header> 🎉 Offre Spéciale Étudiants ! 🎓 </template>

    <template #default>
      <p style="font-size: 1.2em; color: #ff6a00; margin-bottom: 1em">
        <strong>Les 1000 premiers étudiants abonnés</strong> bénéficient de
        <strong>2 mois supplémentaires gratuits</strong> ! 😍
      </p>
      <p style="margin-bottom: 1.5em">
        Profitez de cette récompense exclusive et prolongez votre expérience dès
        aujourd'hui !
      </p>
    </template>

    <template #footer>
      <n-button size="large" type="warning" @click="ctaAction">
        Profitez-en maintenant
      </n-button>
    </template>
  </n-modal>
</template>

<script>
export default {
  name: "PromotionModal",
  props: {
    visible: Boolean,
    ctaAction: {
      type: Function,
      default: () => {},
    },
  },
  emits: ["update:visible"],
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
