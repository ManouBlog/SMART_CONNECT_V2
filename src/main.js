/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import naive from 'naive-ui'
import PrimeVue from "primevue/config";

import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(store).use(naive).use(router).use(PrimeVue).mount("#app");
