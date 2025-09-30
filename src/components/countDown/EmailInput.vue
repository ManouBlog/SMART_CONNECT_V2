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
  padding: 1em;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 1.5em;
  min-width: 400px;
  outline: none;
  font-family: 'Poppins', sans-serif;
}
</style>
