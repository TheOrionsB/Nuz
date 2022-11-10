<template>
  <header class="flex flex-row justify-between px-2 lg:px-10 py-4 ">
    <div class="flex flex-row space-x-1 lg:space-x-4 items-center">
      <a name="nuz" class="text-white rounded py-1 font-bold px-4 bg-gradient-to-r from-purple-400 to-purple-500"
        href="/">Nuz</a>
      <RouterLink class="text-white" v-for="(item, index) in HomeStrings.Navigation" :key="index" :to="item.path">{{ item.pretty }}</RouterLink>
    </div>
    <div class="flex flex-row space-x-1 lg:space-x-4 items-center">
      <RouterLink name="login" to="/login" class="text-gray-300">{{ HomeStrings.login }}</RouterLink>
      <RouterLink name="sign up" to="/login?signup=1" class="text-purple-300 border border-purple-300 rounded py-2 px-2">{{ HomeStrings.signup }}</RouterLink>
    </div>
  </header>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import HomeStrings from '../assets/homestrings.json'
</script>