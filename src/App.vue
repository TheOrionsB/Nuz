<template>
  <main>
    <div class="h-screen w-screen bg-gradient-to-br from-indigo-900 via-black to-black">
      <RouterView />
      <Particles
            id="tsparticles"
            :particlesInit="particlesInit"
            :options="ParticlesConfig"/>
    </div>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { loadFull } from "tsparticles";
import ParticlesConfig from './assets/particlesconfig.json'

const particlesInit = async engine => {
    await loadFull(engine);
};
</script>

<style>

</style>
