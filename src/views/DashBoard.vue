<template>
    <div v-if="username !== ''" class="text-white space-y-10 p-[7%] px-[1%] qhd:p-[5%] h-full max-sm:px-1 max-sm:py-[3%]">
        <div class="flex flex-row max-lg:flex-col w-full lg:space-x-10 h-full">
            <div class="flex lg:hidden flex-row justify-center">
                <component :is="DashBoardNavigationTitle" :title="subComponents[index].name" :icon="subComponents[index].icon" @click="currentComponentIndex = index" v-for="(subComponent, index) in subComponents" :key="index" :class="{ ['bg-black bg-opacity-50']: currentComponentIndex === index }" class="hover:bg-black first-of-type:rounded-t-md last-of-type:rounded-b-md cursor-pointer hover:bg-opacity-50 transition-all ease-in-out duration-150"></component>
            </div>
            <div class="flex flex-col w-1/4 space-y-5 max-lg:hidden">
                <div class="bg-gray-900 bg-opacity-70 p-4 space-y-4 text-2xl rounded-md ">
                    <h2>{{ authStore.getUsername() }}</h2>
                    <button class="text-red-300 hover:text-black p-1 px-2 hover:bg-red-300 rounded ease-in-out duration-200 text-lg" @click="callLogout()"><font-awesome-icon class="text-purple-300 text-inherit w-10" :icon="['fas', 'right-from-bracket']" />Log out</button>
                </div>
                <div class="bg-gray-900 border-purple-400 border-2 border-opacity-50 bg-opacity-70 flex flex-col rounded-md">
                    <component :is="DashBoardNavigationTitle" :title="subComponents[index].name" :icon="subComponents[index].icon" @click="currentComponentIndex = index" v-for="(subComponent, index) in subComponents" :key="index" :class="{ ['bg-black bg-opacity-50']: currentComponentIndex === index }" class="hover:bg-black first-of-type:rounded-t-md last-of-type:rounded-b-md cursor-pointer hover:bg-opacity-50 transition-all ease-in-out duration-150"></component>
                </div>
            </div>
            <div class="bg-gray-900 rounded-md border-2 bg-opacity-80 border-purple-400 border-opacity-40 w-full lg:w-3/4 max-sm:w-full">
                <component :is="subComponents[currentComponentIndex].component"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthenticationStore } from '../stores/AuthStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import NewLink from '../components/Dashboard/NewLink.vue'
import MyLinks from '../components/Dashboard/MyLinks.vue';
import DashBoardNavigationTitle from '../components/Titles/DashBoardNavigationTitle.vue';
import DashHome from '../components/Dashboard/DashHome.vue';
import DashAccount from '../components/Dashboard/DashAccount.vue';

const authStore = useAuthenticationStore();
const router = useRouter()
const { username } = storeToRefs(authStore);
if (username.value === "") router.push({ path: '/' });
const currentComponentIndex = ref(0);

const callLogout = () => {
    document.cookie = `username=${authStore.getUsername()};expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `token=${authStore.getToken()};expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    authStore.logout();
}

const subComponents = [
    {name: "Home", icon: ['fas', 'house'], component: DashHome},
    {name: "New link", icon: ['fas', 'plus'], component: NewLink},
    {name: "My links", icon: ['fas', 'list'], component: MyLinks},
    {name: "Account", icon: ['fas', 'user'], component: DashAccount}
]
</script>