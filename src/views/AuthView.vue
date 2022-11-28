<template>
    <div class="flex flex-col w-full items-center">
        <div class="h-92 flex max-lg:p-2 lg:px-[10%] flex-row max-lg:w-full lg:w-3/4 justify-center text-white p-10 mt-32">
            <div
                class="flex flex-col justify-center items-center max-lg:py-[5%] lg:p-10 max-lg:w-3/6 lg:w-2/6 bg-purple-900 text-white bg-opacity-90 space-y-4">
                <div class="text-center" v-if="formState === 'signin'">
                    <h2 class="max-lg:text-xl lg:text-3xl font-bold">Welcome back!</h2>
                    <router-link class="text-gray-400" to="/auth?signup=1">I don't have an account :(</router-link>
                </div>
                <div class="text-center" v-if="formState === 'signup'">
                    <h2 class="max-lg:text-xl lg:text-3xl  font-bold">Become one of us!</h2>
                    <router-link class="text-gray-400" to="/auth?signup=0">Duh, I have an account</router-link>
                </div>
            </div>
            <SignIn v-if="formState === 'signin'" />
            <SignUp v-if="formState === 'signup'" />
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import SignIn from '@/components/Authentication/SignIn.vue';
import SignUp from '@/components/Authentication/SignUp.vue';
import { useRoute } from 'vue-router';
/**
 * Determines if this view should render the sign in or sign up form
 */
const route = useRoute()
let formState = ref(Number(route.query.signup) === 1 ? "signup" : "signin");
watch(route, () => {
    if (Number(route.query.signup) === 1)
        formState.value = "signup"
    else
        formState.value = "signin"
})

</script>