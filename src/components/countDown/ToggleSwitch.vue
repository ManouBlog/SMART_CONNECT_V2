<template>
  <div style="width:10px;height:10px;border-radius:100%;margin-top:20px"
  v-if="isBoule"
  :class="colorBoule"
  ></div>
  <button
    class="toggle-switch"
    :class="{ active: isActive }"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import {defineProps,defineEmits} from 'vue';
const emit = defineEmits(['toggle']);
defineProps({
  isActive: Boolean,
  isBoule:Boolean,
  colorBoule:String
});
const handleClick = () => {
  emit('toggle') // ⚡ bien émettre l'événement
}
</script>

<style scoped>
.toggle-switch {
  background-color: #94939387 ;
  color: #ebebeb;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 2vh;
  cursor: pointer;
  transition: all 0.3s;
  width:150px;
  height:55px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

</style>
