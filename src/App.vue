<template>
  <main>
    <div class="h-screen w-screen bg-gradient-to-br from-indigo-900 via-black to-black">
      <div class="h-screen w-screen bg-transparent flex flex-col items-center overflow-y-scroll overflow-x-hidden">
        <HeaderGlobal />
        <RouterView class="h-full w-full max-w-screen-fhd" />
        <Particles class="z-0" id="tsparticles" :particlesInit="particlesInit" :options="ParticlesConfig" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { loadFull } from "tsparticles";
import ParticlesConfig from '@/assets/particlesconfig.json'
import HeaderGlobal from '@/components/HeaderGlobal.vue';

const particlesInit = async engine => {
  await loadFull(engine);
};
</script>
