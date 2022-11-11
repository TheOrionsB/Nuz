<template>
    <form class="flex flex-col p-8 justify-center  w-4/6  bg-gray-500 bg-opacity-20 ">
        <span class="flex flex-col h-full justify-around space-y-4">
            <span class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Choose a username</label>
                <input v-model="formInputs.username.value" @focus="isUsernameFocused = true"
                    @blur="isUsernameFocused = false"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="text" placeholder="Username" />
                <p class="text-purple-300" v-if="isUsernameValid === true">This username is available</p>
                <p class="text-red-300" v-if="isUsernameValid === false && hasFirstKeyBeenPressedUsername === true">This
                    username is already taken
                </p>
            </span>
            <span v-if="formInputs.username.value !== null" class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Find a strong password</label>
                <input @focus="isPasswordFocused='true'" @blur="isPasswordFocused = false" v-model="formInputs.password.value"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="password" placeholder="Password" />
            </span>
            <span v-if="formInputs.password.value !== null" class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Confirm it...</label>
                <input @focus="isPasswordConfFocused = true" @blur="isPasswordConfFocused = false"
                    v-model="formInputs.passwordconf.value"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="password" placeholder="Password confirmation" />
                <p class="text-purple-300" v-if="doPasswordsMatch === true && isUsernameValid === true">Everything looks good !</p>
                <p class="text-red-300"
                    v-if="doPasswordsMatch === false && hasFirstKeyBeenPressedPasswordConf === true">Passwords mismatch
                </p>
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
const isUsernameFocused = ref(false);
const isUsernameValid = ref(false);
const hasFirstKeyBeenPressedUsername = ref(false);

const isPasswordConfFocused = ref(false);
const isPasswordFocused = ref(false);
const doPasswordsMatch = ref(false);
const hasFirstKeyBeenPressedPasswordConf = ref(false);

let timeSinceLastInput = setTimeout(() => null, 2000);

const verifyUsername = () => {
    if (hasFirstKeyBeenPressedUsername.value === false) hasFirstKeyBeenPressedUsername.value = true;
    isUsernameValid.value = Math.round(Math.random()) === 1 ? true : false;
}

const verifyMatchingPasswords = () => {
    if (hasFirstKeyBeenPressedPasswordConf.value === false) hasFirstKeyBeenPressedPasswordConf.value = true;
    doPasswordsMatch.value = formInputs.password.value === formInputs.passwordconf.value ? true : false;
}

const handleKeyDown = () => {
    if (isUsernameFocused.value) {
        clearTimeout(timeSinceLastInput);
        timeSinceLastInput = setTimeout(() => verifyUsername(), 1000);
    }
    if (isPasswordConfFocused.value || (isPasswordFocused.value && hasFirstKeyBeenPressedPasswordConf.value)) {
        clearTimeout(timeSinceLastInput);
        timeSinceLastInput = setTimeout(() => verifyMatchingPasswords(), 300);
    }
}

window.addEventListener("keydown", handleKeyDown);

</script>