<template>
    <div v-if="isVisible === true"
        class="bg-black bg-opacity-75 h-screen w-screen z-30 absolute -top-10 left-0 flex flex-col items-center justify-center">
        <div class="max-fhd:h-[80%] max-fdh:w-[80%] w-[40%] h-[40%] bg-gray-800 rounded show-xl border border-purple-400 flex flex-col justify-around items-center p-5">
            <div class="h-3/4 w-full">
                <slot class="" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, ref, toRefs, watch } from 'vue';

const isVisible = ref(false);
const props = defineProps({
    visible: Boolean
})
const { visible } = toRefs(props);

watch(visible, () => {
    isVisible.value = !isVisible.value;
})
</script>