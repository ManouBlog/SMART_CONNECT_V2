<template>
  <div class="payment-success-container">
    <div class="payment-card">
      <div class="success-icon">
        ✓
      </div>

      <h1 class="title">
        Paiement réussi
      </h1>

      <span class="description">
        Ton paiement est réussi.
      </span>

      <button
        class="home-button"
        @click="goToHome"
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentSuccess",

  methods: {
    goToHome() {
    window.location.href = "/";
  }
  }
};
</script>

<style scoped>
.payment-success-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fc;
  padding: 20px;
}

.payment-card {
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  max-width: 450px;
  width: 100%;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #28a745;
  color: white;
  font-size: 40px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 25px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
}

.description {
  display: block;
  font-size: 16px;
  color: #666;
  margin-bottom: 35px;
}

.home-button {
  background-color: orange;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.home-button:hover {
  opacity: 0.9;
}
</style>