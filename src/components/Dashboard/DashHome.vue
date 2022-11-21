<template>
    <div class="flex flex-col space-y-4 p-8 overflow-y-scroll">
        <div class="flex flex-row justify-evenly items-center">
            <div class="flex flex-col p-8 w-full">
                <h1 class="text-4xl font-light text-purple-500">Welcome home, {{ authStore.getUsername() }}</h1>
                <h2 class="text-2xl font-extralight">{{ currentShortenedList.length }} links up and running</h2>
            </div>
            <div v-if="currentShortenedList.slice(-1)[0]"
                class="w-full p-4 flex flex-col justify-center rounded-lg bg-gray-800">
                <h2 class="text-2xl font-extralight">Your latest link:</h2>
                <div class="text-xl">
                    <span class="flex flex-row space-x-2">
                        <p>Name:</p>
                        <h3 class="text-purple-300">{{ (currentShortenedList.slice(-1)[0]).name }}</h3>
                    </span>
                    <span class="flex flex-row space-x-2">
                        <p>Link: </p>
                        <a target='_blank' :href="genFullLink(currentShortenedList.slice(-1)[0].source)"
                            class="text-purple-400 underline">{{ genFullLink(currentShortenedList.slice(-1)[0].source)
                            }}</a>
                    </span>
                    <span class="flex flex-row space-x-2">
                        <p>Number of accesses: </p>
                        <h3 class="text-xl">{{ (currentShortenedList.slice(-1)[0]).stats.nHit }}</h3>
                    </span>
                </div>
            </div>
        </div>
        <div class="px-8 space-y-2">
            <h3 class="text-2xl font-extralight">Your most popular links:</h3>
            <ul class="font-light">
                <li v-for="(item, idx) in currentTopShortenedList" :key="idx"
                    class="flex flex-row p-4 justify-between items-center first-of-type:border-t-transparent border-b border-b-transparent border-t-2 border-purple-300 border-opacity-40 space-x-4 text-xl">
                    <span class="flex flex-row w-1/3 items-center">
                        <h4 class="text-2xl w-12 text-center text-purple-200 font-bold">
                            {{ idx + 1 }}
                        </h4>
                        <h3>(Hits: {{item.stats.nHit}})</h3>
                    </span>
                    <span class="flex flex-row space-x-2 w-1/3 items-center">
                        <p>Name:</p>
                        <h3 class="text-purple-300">{{ item.name }}</h3>
                    </span>
                    <span class="flex flex-row space-x-2 w-1/3 items-center">
                        <p>Link: </p>
                        <a target='_blank' :href="genFullLink(item.source)"
                            class="text-purple-400 underline w-1/3 text-center">{{ genFullLink(item.source)
                            }}</a>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { getShortened } from '@/api/ShortenApi';
import { onBeforeMount, ref } from 'vue';
import { useAuthenticationStore } from '../../stores/AuthStore';

const authStore = useAuthenticationStore();
const currentShortenedList = ref([])
const currentTopShortenedList = ref([])

const genFullLink = (suffix) => {
    return `http://${process.env.VUE_APP_REDIRECTION_BASEURL}/${suffix}`;
}

onBeforeMount(async () => {
    currentShortenedList.value = await (await getShortened()).shortened
    currentTopShortenedList.value = await (await getShortened('top')).shortened
})
</script>