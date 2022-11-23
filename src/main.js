import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Particles from "vue3-particles";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFan, faHouse, faLink, faList, faPlus, faRightFromBracket, faCopy, faArrowUpRightFromSquare, faUser, faKey, faLock, faTrash, faScrewdriver, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './assets/tailwind.css'

library.add([faFan, faList, faHouse, faLink, faScrewdriver, faRightFromBracket, faCopy, faArrowUpRightFromSquare, faUser, faKey, faLock, faTrash, faMagnifyingGlass, faPlus]);

const HomeView = () => import('./views/HomeView.vue');
const AuthView = () => import('./views/AuthView.vue');
const DashboardView = () => import('./views/DashBoard.vue')
const LinkNotFound = () => import('./views/LinkNotFound.vue')
const ProtectedLink = () => import('./views/ProtectedLink.vue')

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: AuthView },
    { path: '/dashboard', component: DashboardView },
    { path: '/nf', component: LinkNotFound},
    { path: '/pp', component: ProtectedLink}

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
