<template>
    <form class="flex flex-col p-8 justify-center w-4/6  bg-gray-500 bg-opacity-20 "
        @submit.prevent="authenticateUser">
        <span class="flex flex-col h-full justify-around space-y-4">
            <span class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Who are you ?</label>
                <input v-model="formInputs.username.value.content"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="text" placeholder="Username" />
            </span>
            <span v-if="formInputs.username.value.content" class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Hm, what's the code ?</label>
                <input v-model="formInputs.password.value"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="password" placeholder="Password" />
            </span>
            <div class="flex flex-col space-y-2" v-if="formInputs.password.value">
                <div
                    class="bg-transparent w-[50%] self-center text-center text-lg text-purple-300 border border-purple-300 rounded p-2">
                    <input v-if="loggingIn === false" class="" type="submit" value="Let's try" />
                    <font-awesome-icon v-if="loggingIn === true" class="text-purple-300 animate-spin"
                        :icon="['fas', 'fan']" />
                </div>
                <p v-if="error" class="text-red-300">An error occurred while signing in. Check your credentials and try
                    again.</p>
            </div>
        </span>
    </form>
</template>
<script setup>
import { authenticate } from '../../api/UsersApi';
import { ref } from 'vue';
import { useAuthenticationStore } from '../../stores/AuthStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const loggingIn = ref(false);
const formInputs = {
    username: ref({ content: null, isvalid: null }),
    password: ref(null)
}
const error = ref(false);
const authStore = useAuthenticationStore();

const authenticateUser = async () => {
    loggingIn.value = true;
    const response = await authenticate({ username: formInputs.username.value.content, password: formInputs.password.value }, "authenticate");
    if (response.success !== true) {
        loggingIn.value = false;
        error.value = true;
        return;
    } else {
        authStore.authenticateUser(formInputs.username.value.content, response.token);
        router.push({ path: '/dashboard' });
    }
}
</script>