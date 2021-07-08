import { createApp } from 'vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue'
import {store} from './store'
import router from './router';
import GoogleAuth from 
const app  = createApp(App)
app.use(router);
app.use(store);
app.use(GoogleAuthg, gauthOption);
app.use(DKToast, toastOptions);
app.use(Toast);
app.mount('#app')
