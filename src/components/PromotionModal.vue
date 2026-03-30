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
      background: #25525f;
      border-radius: 16px;
      padding: 1em;
      color: white;
    "
    @update:show="$emit('update:visible', $event)"
  >
    <template #header>
      <div style="color: white; font-weight: bold">
        {{ header }}
      </div>
    </template>

    <template #default>
      <slot></slot>
    </template>

    <template #footer v-if="buttonTitle">
      <n-button
  size="large"
  :bordered="false"
  style="
    background-color: #ff9900;
    font-weight: bold;
    width: 100%;
    color: white;
    border-radius: 10px;

    white-space: normal;
    line-height: 1.3;
    padding: 14px 16px;
    text-align: center;
  "
  @click="ctaAction"
>
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
    buttonTitle: Boolean,
    header: String,
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
