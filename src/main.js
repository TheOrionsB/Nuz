import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import { createRouter, createWebHashHistory } from 'vue-router'
import Particles from "vue3-particles";


const HomeView = () => import('./views/HomeView.vue');
const LoginView = () => import('./views/LoginView.vue');
const AboutView = () => import('./views/AboutView.vue');

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/about', component: AboutView },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

const app = createApp(App)
app.use(router)
app.use(Particles)
    .mount('#app')
