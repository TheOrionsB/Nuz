<template>
    <main>
        <div class="h-screen w-screen bg-gradient-to-br from-indigo-900 via-black to-black">
            <div
                class="h-screen w-screen bg-transparent flex flex-col items-center overflow-x-hidden">
                <HeaderGlobal />
                <RouterView class="h-full w-full max-w-screen-fhd" />
                <Particles class="z-0" id="tsparticles" :particlesInit="particlesInit" :options="ParticlesConfig" />
                <CustomToast />
            </div>
        </div>
    </main>
</template>
<script setup>
import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue';
import { loadFull } from "tsparticles";
import ParticlesConfig from '@/assets/particlesconfig.json'
import HeaderGlobal from './components/HeaderGlobal.vue';
import CustomToast from './components/Toast/CustomToast.vue';
import { useAuthenticationStore } from './stores/AuthStore'
const particlesInit = async engine => {
    await loadFull(engine);
};
const authStore = useAuthenticationStore()

const areSetCookiesValid = async () => {
    if (document.cookie.split('=').length > 2) {
        const cookies = document.cookie.split(';');
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT}/user/verifycookie`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${cookies[0].split('=')[1]}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: cookies[1].split('=')[1] })
        });
        if (response.status !== 200) {
            document.cookie = `username=${authStore.getUsername()};expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            document.cookie = `token=${authStore.getToken()};expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        } else {
            authStore.authenticateUser(cookies[1].split('=')[1], cookies[0].split('=')[1]);
        }
    }
}

onBeforeMount(async () => {
    await areSetCookiesValid();
})
</script>
