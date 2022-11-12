<template>
    <div v-if="username !== ''" class="text-white space-y-10 px-[5%] pt-10 qhd:px-[15%]">
        <div class="flex flex-row w-full space-x-10">
            <div class="flex flex-col w-1/4 space-y-5">
                <div class="bg-gray-900 bg-opacity-70 p-4 text-2xl ">
                    <h2>{{ authStore.getUsername() }}</h2>
                    <button class="text-red-300" @click="authStore.logout()">Log out</button>
                </div>
                <div class="bg-gray-900 border-purple-400 border-2 border-opacity-50 bg-opacity-70 text-2xl  class flex flex-col text-left">
                    <button @click="currentComponentIndex = index" v-for="(subComponent, index) in subComponents" :key="index" :class="{ ['bg-black bg-opacity-50']: currentComponentIndex === index }" class="text-white py-4 px-8 w-full hover:bg-black hover:bg-opacity-50 text-left transition-all ease-in-out duration-150 first-of-type:rounded-t-xl">{{subComponent.name}}</button>
                </div>
            </div>
            <div class="bg-gray-900 border-2 bg-opacity-80 border-purple-400 border-opacity-40 w-3/4 ">
                <component :is="subComponents[currentComponentIndex].component"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthenticationStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import NewLink from '../components/Dashboard/NewLink.vue'

const authStore = useAuthenticationStore();
const router = useRouter()
const { username } = storeToRefs(authStore);
if (username.value === "") router.push({ path: '/' });
console.log(username.value);

const currentComponentIndex = ref(0);

const subComponents = [
    {name: "Home", component: <div>Home</div>},
    {name: "New link", component: <NewLink/>},
    {name: "My links", component: <div>My links</div>},
    {name: "Advanced", component: <div>Advanced</div>}
]
</script>