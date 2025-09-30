<template>
  <button class="auth-button">
    <slot></slot>
  </button>
</template>

<script setup></script>

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
</style>
