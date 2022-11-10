<template>
    <div class="flex flex-col h-full w-full items-center">
        <div class="h-92 flex px-[10%] flex-row w-3/4 pt-24 justify-center text-white p-10">
            <div class="flex flex-col justify-center items-center p-10 w-2/6 bg-purple-900 text-white bg-opacity-90 space-y-4">
                <h2 class="text-3xl font-bold">Welcome back!</h2>
            </div>
           <SignIn/>
        </div>
    </div>
</template>
<script setup>
import SignIn from '@/components/Authentication/SignIn.vue';

</script>