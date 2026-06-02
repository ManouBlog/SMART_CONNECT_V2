<template>
  <a
    v-if="enabled"
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-btn d-flex align-items-center justify-content-center shadow"
    :title="tooltip"
  >
    <i class="fab fa-whatsapp fs-3" style="font-size: 2.5em;"></i>
  </a>
</template>

<script>
export default {
  name: "WhatsAppButton",

  props: {
    phone: {
      type: String,
      required: true
    },

    message: {
      type: String,
      default: "Bonjour, je voudrais des informations."
    },

    enabled: {
      type: Boolean,
      default: true
    },

    tooltip: {
      type: String,
      default: "Contact WhatsApp"
    }
  },

  computed: {
    whatsappUrl() {
      return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`
    }
  }
}
</script>

<style scoped>
.whatsapp-btn {
  position: fixed;
  bottom: 1em;
  right: 1em;

  width: 55px;
  height: 55px;

  background-color: #25d366;
  color: white;

  border-radius: 50%;
  text-decoration: none;

  z-index: 99999;

  transition: all 0.3s ease;
}

.whatsapp-btn:hover {
  transform: scale(1.1);
  background-color: #1ebe5d;
}
</style>