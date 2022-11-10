<template>
    <form class="flex flex-col p-8 justify-center  w-4/6  bg-gray-500 bg-opacity-20 ">
        <span class="flex flex-col h-full justify-around space-y-4">
            <span  class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Choose a username</label>
                <input v-model="formInputs.username.value"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="text" placeholder="Username" />
            </span>
            <span v-if="formInputs.username.value !== null" class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Find a strong password</label>
                <input v-model="formInputs.password.value"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="password" placeholder="Password" />
            </span>
            <span v-if="formInputs.password.value !== null" class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Confirm it...</label>
                <input v-model="formInputs.passwordconf.value"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="password" placeholder="Password confirmation" />
            </span>
            <input v-if="formInputs.passwordconf.value"
                class="bg-transparent w-[50%] self-center text-xl text-purple-300 border border-purple-300 rounded p-3"
                type="submit" value="I want to sign up" />
        </span>
    </form>
</template>
<script setup >
import { ref } from 'vue';
const formInputs = {
    username: ref(null),
    password: ref(null),
    passwordconf: ref(null)
}
</script>