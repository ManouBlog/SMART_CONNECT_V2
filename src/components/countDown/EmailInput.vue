<template>
  <input
    type="email"
    class="email-input"
    placeholder="monmail@email.com"
    v-model="email"
    @keyup.enter="notify"
  />
  <button class="auth-button" @click="notify">m’informer</button>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import Swal from "sweetalert2";
const emit = defineEmits(["notify"]);
const email = ref("");
const notify = () => {
  if (email.value) {
    emit("notify", email.value);
  } else {
    Swal.fire({
      icon: "info",
      title: "Veuillez-ajouter un email",
      showConfirmButton: true,
    });
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
  width: 100%; /* occupe toute la largeur dispo */
  max-width: 500px; /* limite pour éviter qu’il devienne trop grand sur PC */
  outline: none;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box; /* pour que padding soit inclus dans la largeur */
}

/* Tablette */
@media (max-width: 768px) {
  .email-input {
    font-size: 1.2em;
    max-width: 400px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .email-input {
    font-size: 1em;
    max-width: 100%; /* prend toute la largeur du mobile */
  }
}
</style>
