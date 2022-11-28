<template>
    <div class="p-4">
        <div class="font-extralight">
            <h2 class="text-white text-2xl lg:flex lg:flex-row">
                <font-awesome-icon class="text-inherit w-14" :icon="props.icon" />
                <p class="max-lg:hidden">{{ props.title }}</p>
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