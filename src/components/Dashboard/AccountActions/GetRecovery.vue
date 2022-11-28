<template>
    <div class="flex flex-col space-y-4 w-full items-center justify-center">
        <div class="space-y-1">
            <h2 class="text-2xl font-extralight max-lg:w-full lg:w-1/2">Request recovery key</h2>
            <p class="text-purple-400">If you previously have set up a recovery, the old one won't be usable anymore.</p>
            <p class="text-purple-400">The recovery key is used to recover your account if you forgot your password. Don't share it with anyone.
            </p>
            <p class="text-purple-400">Your password is required to generate a new recovery key.</p>
        </div>
        <form @submit.prevent="requestKey()" class="flex flex-col space-y-2  max-lg:w-full lg:w-1/2">
            <input v-model="password"
                class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                type="password" placeholder="Password" />
            <div
                class="bg-transparent max:-lg:w-full lg:w-[50%] self-center text-center text-lg text-purple-300 border border-purple-300 rounded p-2">
                <input v-if="isLoading === false" class="" type="submit" value="Generate recovery key" />
                <font-awesome-icon v-if="isLoading === true" class="text-purple-300 animate-spin"
                    :icon="['fas', 'fan']" />
            </div>
            <p v-if="error" class="text-red-400">An error occurred while requesting your key. Please check your password and try again.</p>
            <p v-if="success" class="text-purple-400">Your new recovery key: {{key}}</p>
        </form>
    </div>
</template>
<script setup>
import { getRecoveryKey } from '@/api/UsersApi';
import { ref } from 'vue';

const password = ref("");
const error = ref(false);
const success = ref(false);
const isLoading = ref(false);
const key = ref("")

const requestKey = async () => {
    const response = await getRecoveryKey(password.value);
    if (!response.success) {
        error.value = true;
        return;
    }
    success.value = true;
    key.value = response.key;
    return;
}

</script>