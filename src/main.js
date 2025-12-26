import { createApp} from 'vue'
import { createPinia } from 'pinia'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import App from './App.vue'
import router from './router'
import VueAgile from 'vue-agile'
import store from './store'
import 'bootstrap-icons/font/bootstrap-icons.css'
import naive from 'naive-ui'
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import Rating from 'primevue/rating';
import Dialog from 'primevue/dialog';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import PanelMenu from 'primevue/panelmenu';
import Multiselect from 'vue-multiselect'
import Paginator from 'primevue/paginator';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import i18n from "./plugins/i18n";
import Tooltip from 'primevue/tooltip';


const pinia = createPinia()


const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAgile);
app.use(naive);
app.use(PrimeVue);
app.use(pinia);
app.use(Antd);
app.use(i18n);
app.component('PrimeCalendar', Calendar);
app.directive('tooltip', Tooltip);
app.component('multiselect', Multiselect);
app.component('PanelMenu', PanelMenu);
app.component('Paginator', Paginator);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Rating',Rating)
app.component('Dialog',Dialog)
app.mount('#app');

