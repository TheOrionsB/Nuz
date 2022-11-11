<template>
    <div class="flex flex-col w-full items-center">
        <div class="h-92 flex px-[10%] flex-row w-3/4 justify-center text-white p-10">
            <div
                class="flex flex-col justify-center items-center p-10 w-2/6 bg-purple-900 text-white bg-opacity-90 space-y-4">
                <div class="text-center" v-if="formState === 'signin'">
                    <h2  class="text-3xl font-bold">Welcome back!</h2>
                    <a class="text-gray-400" href="/login?signup=1">I don't have an account :(</a>
                </div>
                <div class="text-center" v-if="formState === 'signup'">
                    <h2  class="text-3xl font-bold">Become one of us!</h2>
                    <a class="text-gray-400" href="/login">Duh, I have an account</a>
                </div>
            </div>
            <SignIn v-if="formState === 'signin'" />
            <SignUp v-if="formState === 'signup'" />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import SignIn from '@/components/Authentication/SignIn.vue';
import SignUp from '@/components/Authentication/SignUp.vue';
import { useRoute } from 'vue-router';
/**
 * Determines if this view should render the sign in or sign up form
 */
let formState = ref("signin");
const route = useRoute()
route.query.signup ? formState = "signup" : formState = "signin";

</script>