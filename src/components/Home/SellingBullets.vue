<template>
    <div class="ring-white ring-1 ring-opacity-40 w-full p-8 rounded space-y-2">
        <h2 class="font-extrabold text-3xl text-white">{{ HomeStrings.bulletPoints.bulletHeading}}</h2>
        <ul class="font-bold text-2xl text-white pl-10">
            <li v-for="(item, index) in HomeStrings.bulletPoints.bulletPoints" :key="index">{{item.bullet}}</li>
        </ul>
    </div>
</template>
<script setup>
import HomeStrings from '../../assets/translations/english/homestrings.json'
</script>