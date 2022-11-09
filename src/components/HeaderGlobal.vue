<template>
  <header class="flex flex-row justify-between px-2 lg:px-10 py-4 ">
    <div class="flex flex-row space-x-1 lg:space-x-4 items-center">
      <a name="nuz" class="text-white rounded py-1 font-bold px-4 bg-gradient-to-r from-purple-400 to-purple-500"
        href="/">Nuz</a>
      <a v-for="(item, index) in HomeStrings.Navigation" :key="index" :href="item.path">{{ item.pretty }}</a>
    </div>
    <div class="flex flex-row space-x-1 lg:space-x-4 items-center">
      <a name="login" href="/login" class="text-gray-300">{{ HomeStrings.login }}</a>
      <a name="sign up" href="/login?signup=1" class="text-purple-300 border border-purple-300 rounded py-2 px-2">{{ HomeStrings.signup }}</a>
    </div>
  </header>
</template>
<script setup>
import HomeStrings from '../assets/homestrings.json'
</script>