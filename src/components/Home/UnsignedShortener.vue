<template>
    <div class="flex flex-col justify-start space-y-4">
        <h2 class="text-3xl font-bold text-white ">Shorten without signing up!</h2>
        <form class="flex flex-row w-full space-x-2" @submit.prevent="submitShortener">
            <input name="targetUrlInput" class="text-white bg-white bg-opacity-20 border-gray-700 border rounded text-xl p-5 w-3/4"
                type="text" v-model="targetUrl" placeholder="Your target URL" />
            <input class="text-white border w-1/4 border-purple-400 bg-none text-xl rounded p-5" type="submit"
                value="Shorten now!" />
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';

let targetUrl = ref('')
const submitShortener = () => {
    console.log(`Form submitted with target: ${targetUrl.value}`);
}
</script>