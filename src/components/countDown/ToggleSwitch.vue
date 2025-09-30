<template>
  <div style="width:10px;height:10px;border-radius:100%;margin-top:20px"
  v-if="isBoule"
  :class="colorBoule"
  ></div>
  <button
    class="toggle-switch"
    :class="{ active: isActive }"
    @click="$emit('toggle')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import {defineProps} from 'vue';
defineProps({
  isActive: Boolean,
  isBoule:Boolean,
  colorBoule:String
});
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
