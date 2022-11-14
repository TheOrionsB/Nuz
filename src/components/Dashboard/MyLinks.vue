<template>
    <div class="flex flex-col w-full justify-center items-center p-4">
        <div class="w-[90%]">
            <input id="search" ref="searchRef" @change="logValue" v-model="searchInput" type="text"
                class="focus:outline-none focus:border-none focus:outline-purple-400 text-lg bg-transparent w-full border-b-purple-400 border-b p-4 text-purple-300"
                placeholder="Search links... (⌘+K or Windows+K) " />
        </div>
        <div class="w-full p-4">
            <ul class="space-y-2 overflow-y-scroll">
                <li class="flex flex-row items-center justify-between border-b border-b-gray-800 last-of-type:border-none p-2"
                    v-for="(item, index) in shortenedList" :key="index">
                    <div class="flex flex-row w-2/3 justify-start space-x-4">
                        <p class="w-1/3">{{ item.name }}</p>
                        <button class="w-1/3 underline text-purple-500">Access statistics</button>
                    </div>
                    <div class="space-x-2 class flex flex-row w-1/3">
                        <button
                            class="border-gray-800 border p-2 bg-purple-700 text-purple-300 hover:bg-purple-900 hover:text-purple-200 ease-in-out duration-200 rounded w-full">Edit</button>
                        <button
                            class="border-gray-800 border p-2 bg-orange-700 text-orange-300 hover:bg-orange-900 hover:text-orange-200 ease-in-out duration-200 rounded w-full">Expire</button>
                        <button
                            class="border-gray-800 border p-2 bg-red-700 text-red-300 hover:bg-red-900 hover:text-red-200 ease-in-out duration-200 rounded w-full">Delete</button>
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

onMounted(async () => {
    document.addEventListener('keydown', (event) => {
        if (event.metaKey) {
            document.addEventListener('keydown', (e) => {
                if (e.code === "KeyK") {
                    searchRef.value.focus();
                }
            })
        }
    })
    shortenedList.value = (await getShortened()).shortened;
})
</script>