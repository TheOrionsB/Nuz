<template>
    <div class="pt-10 flex flex-col justify-center items-center">
        <h1 class="text-5xl font-extrabold bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">{{greeting}}</h1>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
    greeting: {
        type: String,
        default: "Let's shorten it!"
    }
})
</script>