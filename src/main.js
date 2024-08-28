import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css' 
// import './assets/tailwind.css'
// createApp(App).use(router).use(store).mount('#app')


const app = createApp(App);

app.use(router);
app.use(store);

store.dispatch('fetchUser');

app.mount('#app');