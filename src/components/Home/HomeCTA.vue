<template>
    <div v-if="username === ''" class="flex flex-col justify-center items-center space-y-2 w-full">
        <a name="mainCTA" href="/login?signup=1"
            class="text-3xl text-purple-300 border border-purple-300 rounded-xl p-5">{{ HomeStrings.CTA.mainCTA }}</a>
        <a name="subCTA" href="/login" class="text-xl text-gray-500">{{ HomeStrings.CTA.subCTA }}</a>
    </div>
    <div v-if="username !== ''" class="flex flex-col justify-center items-center space-y-2 w-full">
        <h2 name="mainCTA" class="text-3xl text-purple-300 p-2">Glad to see you back {{ username }} !</h2>
        <a name="subCTA" href="/login" class="text-xl text-gray-500">Go to your dashboard</a>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import HomeStrings from '../../assets/translations/english/homestrings.json'
import { useAuthenticationStore } from '../../stores/AuthStore';

const authStore = useAuthenticationStore();

const { username } = storeToRefs(authStore);
</script>