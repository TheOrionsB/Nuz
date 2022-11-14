import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Particles from "vue3-particles";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFan } from '@fortawesome/free-solid-svg-icons';
import './assets/tailwind.css'

library.add(faFan);

const HomeView = () => import('./views/HomeView.vue');
const AuthView = () => import('./views/AuthView.vue');
const AboutView = () => import('./views/AboutView.vue');
const DashboardView = () => import('./views/DashBoard.vue')

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: AuthView },
    { path: '/about', component: AboutView },
    { path: '/dashboard', component: DashboardView }

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
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
