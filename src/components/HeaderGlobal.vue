<template>
      <header class="flex flex-row justify-between px-2 lg:px-10 py-4 ">
        <div class="flex flex-row space-x-1 lg:space-x-4 items-center">
          <a class="text-white rounded py-1 font-bold px-4 bg-gradient-to-r from-purple-400 to-purple-500" href="/">Nuz</a>
          <RouterLink class="text-white font-bold" to="/">Home</RouterLink>
          <RouterLink class="text-white font-bold" to="/about">About</RouterLink>
        </div>
        <div class="flex flex-row space-x-1 lg:space-x-4 items-center">
          <RouterLink to="/login" class="text-gray-300">Log in</RouterLink>
          <RouterLink to="/login?signup=1" class="text-purple-300 border border-purple-300 rounded py-2 px-2">Sign up</RouterLink>
        </div>
      </header>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>