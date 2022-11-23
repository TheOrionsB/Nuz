<template>
    <div class="w-full h-full flex flex-col justify-start items-center">
        <div class="mt-32 text-white p-8 bg-gray-900 rounded border border-purple-400 space-y-4 text-xl">
            <h1 class="text-3xl font-extralight text-center text-purple-400">This link is password protected.</h1>
            <p>If you want to access this ressource, please provide its password so we can redirect you.</p>
            <form class="flex flex-col space-y-4" @submit.prevent="requestRedirection(password, shortened)">
                <input type="password" placeholder="Password" v-model="password"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50" />
                <div
                    class="hover:bg-purple-900  hover:border-purple-900 hover:bg-opacity-90  duration-150 hover:rounded-lg hover:cursor-pointer hover:text-white bg-transparent w-[50%] self-center text-center text-lg text-purple-300 border border-purple-300 rounded p-2">
                    <input type="submit" value="Let me in" />
                    <!-- <font-awesome-icon v-if="loggingIn === true" class="text-purple-300 animate-spin"
                        :icon="['fas', 'fan']" /> -->
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { requestRedirection } from '../api/ShortenApi'
const route = useRoute();
const router = useRouter();
const password = ref("")
const shortened = ref("");

onBeforeMount(() => {
    if (!route.query.sf) return router.push({ path: '/nf' });
    shortened.value = route.query.sf;
})
</script>