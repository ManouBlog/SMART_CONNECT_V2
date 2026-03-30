<script>
export default {
  name: "ButtonsHeader",
  props: {
    title: String,
  },
  emits: ["handleBtn"],
  data() {
    return {};
  },
};
</script>
<template>
  <button class="btn-Conex" @click.prevent="$emit('handleBtn')">
    {{ title }}
  </button>
</template>
<style scoped>
.btn-Conex {
  background: #f77f00 !important;
  color: white;
  width: 300px;
  padding: 1em 2em;
  border-radius: 50px;
  border: none;
}
</style>
