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
      background: linear-gradient(346deg, #ff6a00, #ffffff); /* dégradé orange → blanc */
      border-radius: 16px;
      padding: 1em;
    "
    @update:show="$emit('update:visible', $event)"
  >
    <template #header>{{header}}</template>

    <template #default>
     <slot></slot>
    </template>

    <template #footer v-if="buttonTitle">
      <n-button size="large" type="warning" @click="ctaAction">
        Activez votre bonus dès maintenant !
      </n-button>
    </template>
  </n-modal>
</template>

<script>
export default {
  name: "PromotionModal",
  props: {
    visible: Boolean,
    buttonTitle:Boolean,
    header:String,
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
