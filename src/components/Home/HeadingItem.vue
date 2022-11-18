<template>
    <div class="pt-10 flex flex-col justify-center items-center">
        <h1 class="lg:text-5xl text-3xl font-extrabold bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">{{greeting}}</h1>
    </div>
</template>
<script setup>
import HomeStrings from '../../assets/translations/english/homestrings.json'
const greeting = HomeStrings.motd[Math.round(Math.random() * (HomeStrings.motd.length - 1))];
</script>