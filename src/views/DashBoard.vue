<template>
    <div v-if="username !== ''" class="text-5xl text-white">
        Yes you can access this {{username}}
    </div>
</template>
<script setup>
import { useAuthenticationStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const authStore = useAuthenticationStore();
const router = useRouter()
const { username } = storeToRefs(authStore);
if (username.value === "") router.push({ path: '/' });
console.log(username.value);
</script>