<template>
  <div class="app-container">
    <header class="header">
      <div style="display: flex; justify-content: center">
        <img
          style="width: 150px; height: 100px; margin: 0 !important"
          src="../assets/logo_white_1.png"
          alt="MonBrobroli Logo"
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
    <CountdownTimer :targetDate="targetDate" />
    <div class="auth-container" v-if="spinnerAlert">
      <EmailInput @notify="SendMailBienvenueNewsletter" />
    </div>
    <p v-else style="color: white">Email stocké</p>
    <p v-if="isloading" style="color: white">Chargement...</p>
    <footer>
      <h2 class="coming-soon">Coming Soon</h2>
    </footer>
    <!-- <div class="image-container">
  <img src="../assets/img_accueil.png" alt="image" />
</div> -->
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import Swal from "sweetalert2";
import instance from "../api/api";
import CountdownTimer from "../components/countDown/CountdownTimer.vue";
import ToggleSwitch from "../components/countDown/ToggleSwitch.vue";
import EmailInput from "../components/countDown/EmailInput.vue";

const toggleItems = ["Étudiants", "Entreprises", "Particuliers"];
const activeToggle = ref(1);
const spinnerAlert = ref(true);
const isloading = ref(false);

defineProps({
  targetDate: {
    type: String,
    required: true,
  },
});

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
    .finally(() => {
      isloading.value = false;
    });
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
.image-container {
  width: 90%;
  aspect-ratio: 21/9; /* ou 21/9, 4/3 selon ton design */
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: 6.5em; /* très grand pour desktop */
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.703);
  text-align: center; /* centré par défaut */
  line-height: 1.2;
}

/* Tablette */
@media (max-width: 768px) {
  .coming-soon {
    font-size: 5em;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .coming-soon {
    font-size: 3em;
  }
}
</style>
