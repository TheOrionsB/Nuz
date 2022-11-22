<template>
    <div class="flex flex-col space-y-4 w-full items-center justify-center">
        <h2 class="text-2xl font-extralight w-1/2">Reset your password:</h2>
        <form class="flex flex-col space-y-2 w-1/2">
            <input
                class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                type="password" placeholder="Old password or Recovery key" />
            <input
                class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                type="password" placeholder="New password" />
            <input
                class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                type="password" placeholder="Confirm new password" />
            <div
                class="bg-transparent w-[50%] self-center text-center text-lg text-purple-300 border border-purple-300 rounded p-2">
                <input v-if="isLoading === false" class="" type="submit" value="Edit password" />
                <font-awesome-icon v-if="isLoading === true" class="text-purple-300 animate-spin"
                    :icon="['fas', 'fan']" />
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';


const isLoading = ref(false)
</script>