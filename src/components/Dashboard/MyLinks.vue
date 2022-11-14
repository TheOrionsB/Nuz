<template>
    <div class="flex flex-col w-full justify-center items-center">
        <div class="w-[90%]">
            <input id="search" ref="searchRef" @change="logValue" v-model="searchInput" type="text" class="text-lg bg-transparent w-full border-b-purple-400 border-b p-4 text-purple-300"
                placeholder="Search links... (⌘+K or Windows+K) " />
        </div>
        <div></div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const searchInput = ref(null);
const searchRef = ref(null);

onMounted(() => {
    document.addEventListener('keydown', (event) => {
        if (event.metaKey) {
            document.addEventListener('keydown', (e) => {
                if (e.code === "KeyK") {
                    searchRef.value.focus();
                }
            })
        }
    })
})

</script>