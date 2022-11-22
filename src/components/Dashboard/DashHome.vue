<template>
    <div class="flex flex-col space-y-4 p-8 h-full w-full overflow-y-scroll">
        <div v-if="currentShortenedList.length > 0" class="flex flex-col h-full">
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
                                class="text-purple-400 underline">{{
                                        genFullLink(currentShortenedList.slice(-1)[0].source)
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
                        class="hover:bg-gray-700 ease-in-out duration-300 flex flex-row p-4 justify-between items-center first-of-type:border-t-transparent border-b border-b-transparent border-t-2 border-purple-300 border-opacity-40 space-x-4 text-xl">
                        <span class="flex flex-row w-full items-center">
                            <h4 class="text-2xl w-12 text-center text-purple-200 font-bold">
                                {{ idx + 1 }}
                            </h4>
                            <h3>(Hits: {{ item.stats.nHit }})</h3>
                        </span>
                        <span class="flex flex-row space-x-2 w-full items-center">
                            <p>Name:</p>
                            <h3 class="text-purple-300">{{ item.name.length > 12 ? `${item.name.slice(0, 12)}...`: item.name }}</h3>
                        </span>
                        <span class="flex w-full flex-row">
                            <p class="mr-2">Target:</p>
                            <a class="w-1/2 underline text-purple-500" v-bind:href="genFullLink(item.source)">{{
                                    item.target.split('/')[2]
                            }}</a>
                        </span>
                        <span class="flex flex-row space-x-2 w-full items-center justify-end">
                            <button @click="copyToClipBoard(genFullLink(item.source))"
                                class="bg-purple-700 rounded hover:bg-purple-300 hover:text-black duration-150 ease-in-out p-2 w-1/4 text-center text-lg">
                                <font-awesome-icon :icon="['fas', 'copy']" />
                            </button>
                            <a target="_blank" :href="genFullLink(item.source)"
                                class="bg-purple-700 rounded hover:bg-purple-300 hover:text-black duration-150 ease-in-out p-2 w-1/4 text-center text-lg">
                                <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
                            </a>
                            <button
                                class="bg-red-700 rounded hover:bg-red-300 hover:text-black duration-150 ease-in-out p-2 w-1/4 text-center text-lg">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </button>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="">
                <h3 class="text-2xl font-extralight">Link usage over time:</h3>
                <Line :width="'50%'" :height="300" :chart-data="{
                    datasets: [
                        {
                            label: 'Number of hits',
                            fill: true,
                            fillColor: '#d8b4fe',
                            data: chartDataSets,
                            borderColor: '#d8b4fe',
                            tension: 0.2,
                        }
                    ],
                    labels: chartLabels
                }" :chart-options="{ backgroundColor: '#d8b4fe', responsive: true }" chart-id="heat" />
            </div>
        </div>
        <div v-if="currentShortenedList.length === 0"
            class="w-full h-full flex-col justify-center items-center relative top-[25%] text-center">
            <h1 class="text-5xl font-extralight">Nothing to see here... Yet !</h1>
            <p class="text-3xl font-extralight">Navigate to 'New link' to create your first link and have a summuary
                right here :)</p>
        </div>
    </div>
</template>
<script setup>
import { getShortened, getHitHistory } from '@/api/ShortenApi';
import { onBeforeMount, ref } from 'vue';
import { useAuthenticationStore } from '../../stores/AuthStore';
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale
)
const authStore = useAuthenticationStore();
const currentShortenedList = ref([])
const currentTopShortenedList = ref([])
const chartLabels = ref([]);
const chartDataSets = ref([]);

const genFullLink = (suffix) => {
    return `http://${process.env.VUE_APP_REDIRECTION_BASEURL}/${suffix}`;
}

const copyToClipBoard = (toCopy) => {
    navigator.clipboard.writeText(toCopy)
}

onBeforeMount(async () => {
    currentShortenedList.value = await (await getShortened()).shortened
    currentTopShortenedList.value = await (await getShortened('top')).shortened
    const hitHistory = await (await getHitHistory()).history.reverse();
    chartLabels.value = hitHistory.map((historyEntry) => historyEntry.label);
    chartDataSets.value = hitHistory.map((historyEntry) => { return (historyEntry.hitCount) });
    console.log(chartLabels.value, chartDataSets.value)
})
</script>