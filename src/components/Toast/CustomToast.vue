<template>
    <Transition enter-from-class="enter-from" enter-to-class="enter-to" enter-active-class="enter-active"
        leave-from-class="leave-from" leave-to-class="leave-to" leave-active-class="leave-active">
        <div v-if="toastStore.visible" :class="toastStore.error ? 'bg-red-700 ' : 'bg-purple-700 '"
            class="z-40 text-xl font-extralight w-[50%] absolute top-[10px] h-12 flex flex-col items-center justify-center text-center rounded-lg shadow text-white">
            <p>{{ toastStore.getMsg() }}</p>
        </div>
    </Transition>
</template>
<script setup>
import { useToastStore } from '../../stores/ToastStore';
const toastStore = useToastStore();
</script>
<style>
.enter-from {
    transform: translateY(-10px);
    opacity: 0;
}

.enter-to {
    transform: translateY(0);
    opacity: 1;
}

.enter-active {
    transition: all 0.3s ease;
}

.leave-from {
    transform: translateY(0);
    opacity: 1;
}

.leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.leave-active {
    transition: all 0.3s ease;
}
</style>