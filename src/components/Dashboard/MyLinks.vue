<template>
    <div class="flex flex-col w-full justify-center items-center p-4">
        <div class="w-[90%] focus:outline-none focus:border-none focus:outline-purple-400 text-lg bg-transparent flex flex-row items-center border-b-purple-400 border-b p-4 text-purple-300">
            <font-awesome-icon class="text-opacity-50 text-gray-500 w-14" :icon="['fas', 'magnifying-glass']" />
            <input id="search" ref="searchRef" @change="logValue" v-model="searchInput" type="text"
                class="w-full border-none bg-transparent outline-none"
                placeholder="Search links... (⌘+K or Windows+K) " />
        </div>
        <div class="w-full p-4">
            <ul class="space-y-2 overflow-y-scroll">
                <li class="flex flex-row items-center justify-between border-b border-b-gray-800 last-of-type:border-none p-2"
                    v-for="(item, index) in shortenedList" :key="index">
                    <div class="flex flex-row w-2/3 justify-start space-x-4">
                        <p class="w-1/3">{{ item.name }}</p>
                        <a class="w-1/3 underline text-purple-500" v-bind:href="genFullLink(item.source)">{{
                                genFullLink(item.source)
                        }}</a>
                    </div>
                    <div class="space-x-2 class flex flex-row w-2/5 justify-end">
                        <button @click="copyToClipBoard(genFullLink(item.source))" class="bg-purple-700 rounded p-2 w-1/4 text-center text-lg"><font-awesome-icon :icon="['fas', 'copy']"/></button>
                        <a target='_blank' :href="genFullLink(item.source)"
                        class="bg-purple-700 rounded p-2 w-1/4 text-center text-lg"><font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']"/></a>
                        <button class="bg-red-700 rounded p-2 w-1/4 text-center text-lg"><font-awesome-icon :icon="['fas', 'trash']"/></button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { getShortened } from '../../api/ShortenApi';
import { onMounted, ref } from 'vue';

const searchInput = ref(null);
const searchRef = ref(null);
const shortenedList = ref([]);

const genFullLink = (suffix) => {
    return `${process.env.VUE_APP_REDIRECTION_BASEURL}/${suffix}`;
}
const copyToClipBoard = (item) => {
    navigator.clipboard.writeText(item)
}

onMounted(async () => {
    document.addEventListener('keydown', (event) => {
        if (event.metaKey) {
            document.addEventListener('keydown', (e) => {
                if (e.code === "KeyK") {
                    searchRef.value.focus();
                }
            })
        }
    });
    shortenedList.value = await (await getShortened()).shortened
})
</script>