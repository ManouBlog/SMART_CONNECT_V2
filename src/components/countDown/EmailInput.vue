<template>
  <input
    type="email"
    class="email-input"
    placeholder="monmail@email.com"
    v-model="email"
    @keyup.enter="notify"
  />
   <button class="auth-button" @click="notify">
    m’informer
  </button>
</template>

<script setup>
import { ref,defineEmits } from 'vue';

const emit = defineEmits(['notify']);
const email = ref('');
const notify = () => {
  if (email.value) {
    emit('notify', email.value);
  }
};

</script>

<style scoped>
.auth-button {
  background-color: #ff9500;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #e68500;
}
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
