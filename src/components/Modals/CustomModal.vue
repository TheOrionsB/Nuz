<template>
    <div v-if="isVisible === true"
        class="bg-black bg-opacity-75 h-screen w-screen z-30 absolute -top-10 left-0 flex flex-col items-center justify-center">
        <div class="h-[40%] w-[40%] bg-gray-900 rounded show-xl boreder border-purple-400 flex flex-col justify-around items-center p-5">
            <div class="h-3/4 w-full">
                <slot class="" />
            </div>
            <div class="w-1/2">
                <button @click="isVisible = !isVisible" class="rounded border-gray-500 border text-gray-600 w-full p-2">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, ref, toRefs, watch } from 'vue';

const isVisible = ref(true);
const props = defineProps({
    visible: Boolean
})
const { visible } = toRefs(props);

watch(visible, () => {
    console.log("visible changed value")
    isVisible.value = !isVisible.value;
})
</script>