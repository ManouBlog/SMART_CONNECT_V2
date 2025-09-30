<template>
  <div class="app-container">
    <header class="header">
      <div style="display: flex; justify-content: center">
        <img
          style="width: 150px; height: 100px; margin: 0 !important"
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
          :colorBoule="
            item === 'Entreprises'
              ? 'bg-danger'
              : item === 'Particuliers'
              ? 'bg-success'
              : null
          "
          @toggle="setActiveToggle(index)"
        >
          {{ item }}
        </ToggleSwitch>
      </div>
      <p class="subtitle">autour d'opportunités réelles.</p>
    </header>
    <CountdownTimer targetDate="2025-10-01T00:00:00" />
    <div class="auth-container" v-if="spinnerAlert">
      
      <EmailInput @notify="SendMailBienvenueNewsletter" />
    </div>
    <p v-else style="color:white;">Email stocké</p>
<p v-if="isloading" style="color:white;">Chargement...</p>
    <footer>
      <h2 class="coming-soon">Coming Soon</h2>
    </footer>
    <div style="width: 90%; height: 300px; position: relative">
      <img
        style="
          top: -10px;
          left: 0;
          right: 0;
          bottom: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        "
        src="../assets/img_accueil.png"
        alt="image"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import instance from "../api/api";
import CountdownTimer from "../components/countDown/CountdownTimer.vue";
import ToggleSwitch from "../components/countDown/ToggleSwitch.vue";
import EmailInput from "../components/countDown/EmailInput.vue";

const toggleItems = ["Étudiants", "Entreprises", "Particuliers"];
const activeToggle = ref(1);
const spinnerAlert = ref(true);
const isloading = ref(false)

const setActiveToggle = (index) => {
  activeToggle.value = index;
};

const SendMailBienvenueNewsletter = async (value) => {
  isloading.value = true;
  await instance
    .post("SendMailAtEmailToNewsletter", {
      email: value,
    })
    .then((res) => {
      // console.log(res);
      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });
        spinnerAlert.value = true;
      }
      if (!res.data.status) {
        Swal.fire({
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "info",
        title: error.response.data.message,
        showConfirmButton: true,
      });
      spinnerAlert.value = false;
    })
    .finally(()=>{
      isloading.value = false;
    })
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
  padding: 1em;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.footer {
  margin-top: 50px;
}

.coming-soon {
  color: white;
  font-size: 8.5em;
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.703);
}
</style>
