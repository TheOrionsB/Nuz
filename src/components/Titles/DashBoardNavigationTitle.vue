<template>
    <div class="p-4">
        <div class="font-extralight">
            <h2 class="text-white text-2xl">
                <font-awesome-icon class="text-inherit w-14" :icon="props.icon" />
                {{ props.title }}
            </h2>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    icon: Array,
    title: String,
})
</script>