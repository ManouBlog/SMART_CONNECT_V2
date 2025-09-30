<template>
  <input
    type="email"
    class="email-input"
    placeholder="monmail@email.com"
    v-model="email"
  />
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
</script>

<style scoped>
.email-input {
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 300px;
  outline: none;
  font-family: 'Poppins', sans-serif;
}
</style>
