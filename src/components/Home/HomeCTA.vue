<template>
    <div class="flex flex-col justify-center items-center space-y-2 w-full">
        <a name="mainCTA" href="/login?signup=1" class="text-3xl text-purple-300 border border-purple-300 rounded-xl p-5">{{ HomeStrings.CTA.mainCTA }}</a>
        <a name="subCTA" href="/login" class="text-xl text-gray-500">{{ HomeStrings.CTA.subCTA }}</a>
    </div>
</template>
<script setup>
import HomeStrings from '../../assets/homestrings.json'
</script>