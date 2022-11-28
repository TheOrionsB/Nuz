<template>
    <div v-if="username === ''" class="flex flex-col justify-center items-center space-y-2 w-full">
        <router-link name="mainCTA" to="/auth?signup=1"
            class="hover:bg-purple-400 hover:border-purple-400 hover:text-white hover:rounded-lg duration-200 max-lg:text-xl lg:text-3xl text-purple-300 border border-purple-300 rounded-xl p-5">{{ HomeStrings.CTA.mainCTA }}</router-link>
        <router-link name="subCTA" to="/auth?signup=0" class="text-xl text-gray-500">{{ HomeStrings.CTA.subCTA }}</router-link>
    </div>
    <div v-if="username !== ''" class="flex flex-col justify-center items-center space-y-2 w-full">
        <h2 name="mainCTA" class="max-lg:text-xl lg:text-3xl text-purple-300 p-2">Glad to see you back {{ username }} !</h2>
        <router-link name="subCTA" to="/dash" class="text-xl text-gray-500">Go to your dashboard</router-link>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import HomeStrings from '../../assets/translations/english/homestrings.json'
import { useAuthenticationStore } from '../../stores/AuthStore';

const authStore = useAuthenticationStore();

const { username } = storeToRefs(authStore);
</script>