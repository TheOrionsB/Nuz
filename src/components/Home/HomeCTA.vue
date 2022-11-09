<template>
    <div class="flex flex-col justify-center items-center space-y-2 w-full">
        <RouterLink to="/login?signup=1" class="text-3xl text-purple-300 border border-purple-300 rounded-xl p-5">Get started with an account</RouterLink>
        <RouterLink to="/login" class="text-xl text-gray-500">Log in with existing an account</RouterLink>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>