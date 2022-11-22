<template>
  <header class="flex flex-row justify-between px-2 lg:px-10 py-4 z-50 fixed w-full ">
    <div class="flex flex-row space-x-1 lg:space-x-4 items-center">
      <router-link name="nuz" class="text-white rounded py-1 font-bold px-4 bg-gradient-to-r from-purple-400 to-purple-500 hover:rounded-none duration-300 hover:animate-pulse ease-in-out"
        to="/">Nuz</router-link>
      <router-link class="text-white" v-for="(item, index) in HomeStrings.Navigation" :key="index" :to="item.path">{{ item.pretty }}</router-link>
    </div>
    <div v-if="username === ''" class="flex flex-row space-x-1 lg:space-x-4 items-center">
      <router-link name="login" to="/login" class="text-gray-300 p-2 hover:bg-purple-900 hover:text-white hover:rounded duration-150">{{ HomeStrings.login }}</router-link>
      <router-link name="sign up" to="/login?signup=1" class="hover:bg-purple-900 hover:border-purple-900 hover:text-white hover:rounded duration-150 text-purple-300 border border-purple-300 rounded p-2">{{ HomeStrings.signup }}</router-link>
    </div>
    <div v-if="username !== ''" class="flex flex-row space-x-1 lg:space-x-4 items-center">
      <router-link name="login" to="/dashboard" class="text-gray-300 underline">{{ authStore.getUsername() }}</router-link>
    </div>
  </header>
</template>
<script setup>
import HomeStrings from '../assets/translations/english/homestrings.json'
import { useAuthenticationStore } from '../stores/AuthStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthenticationStore();

const { username } = storeToRefs(authStore)

</script>