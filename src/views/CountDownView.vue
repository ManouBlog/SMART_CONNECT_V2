<template>
  <div class="app-container">
    <header class="header">
      <div style="display: flex; justify-content: center">
        <img
          style="width: 150px; height: 100px; margin: 0 !important;"
          src="../assets/logo_white.png"
          alt="Mon Brobroli Logo"
          class="logo"
        />
      </div>
      <h1 class="title">La nouvelle façon de connecter</h1>
      
      <div class="toggle-container">
        <ToggleSwitch
          v-for="(item, index) in toggleItems"
          :key="index"
          :isActive="activeToggle === index"
          :isBoule="item === 'Entreprises' || item === 'Particuliers'"
          :colorBoule="item === 'Entreprises' ? 'bg-danger':item === 'Particuliers'? 'bg-success':null"
          @toggle="setActiveToggle(index)"
        >
          {{ item }}
        </ToggleSwitch>
      </div>
      <p class="subtitle">autour d'opportunités réelles.</p>
    </header>
    <CountdownTimer targetDate="2025-10-01T00:00:00" />
    <div class="auth-container">
      <EmailInput />
      <AuthButton>S'inscrire</AuthButton>
    </div>

    <footer>
      <h2 class="coming-soon">Coming Soon</h2>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CountdownTimer from "../components/countDown/CountdownTimer.vue";
import AuthButton from "../components/countDown/AuthButton.vue";
import ToggleSwitch from "../components/countDown/ToggleSwitch.vue";
import EmailInput from "../components/countDown/EmailInput.vue";

const toggleItems = ["Étudiants", "Entreprises", "Particuliers"];
const activeToggle = ref(1);

const setActiveToggle = (index) => {
  activeToggle.value = index;
};
</script>

<style scoped>
.app-container {
  background: linear-gradient(159deg, rgb(101, 126, 126) 10%, rgb(1, 63, 80) 100%);
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  width: 100%;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

.title,
.subtitle {
  color: white;
  font-size: 5vh;
  text-align: center;
  margin-bottom: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.703);
}

.toggle-container {
  display: flex;
  gap: 10px;
  margin: 1em 0;
  justify-content: center;
}

.auth-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.footer {
  margin-top: 50px;
}

.coming-soon {
  color: white;
  font-size: 15vh;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.703);
}
</style>
