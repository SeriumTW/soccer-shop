import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './style.css';
import { setupToast } from './plugins/toast';
import './plugins/validation';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

setupToast(app);

app.mount('#app');
