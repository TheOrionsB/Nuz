import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/tailwind.css'

import { createRouter, createWebHistory } from 'vue-router'
import Particles from "vue3-particles";


const HomeView = () => import('./views/HomeView.vue');
const AuthView = () => import('./views/AuthView.vue');
const AboutView = () => import('./views/AboutView.vue');

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: AuthView },
    { path: '/about', component: AboutView },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const app = createApp(App)
const pinia = createPinia();
app.use(pinia)
    .use(router)
    .use(Particles)
    .mount('#app')
