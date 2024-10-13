import { createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueAgile from 'vue-agile'
import store from './store'
import 'bootstrap-icons/font/bootstrap-icons.css'
import naive from 'naive-ui'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
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


const pinia = createPinia()


const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAgile);
app.use(naive);
app.use(PrimeVue);
app.use(pinia);
app.use(Antd);
app.component('PrimeCalendar', Calendar);
app.component('multiselect', Multiselect);
app.component('PanelMenu', PanelMenu);
app.component('Paginator', Paginator);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Rating',Rating)
app.component('Dialog',Dialog)
app.mount('#app');

