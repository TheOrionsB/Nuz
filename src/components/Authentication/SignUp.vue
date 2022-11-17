<template>
    <form class="flex flex-col p-8 justify-center  w-4/6  bg-gray-500 bg-opacity-20 " @submit.prevent="registerUser">
        <span class="flex flex-col h-full justify-around space-y-4">
            <span class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Choose a username</label>
                <input v-model="formInputs.username.value" @focus="isUsernameFocused = true"
                    @blur="isUsernameFocused = false"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="text" placeholder="Username" />
                <p class="text-purple-300" v-if="isUsernameValid === 'available'">This username is available</p>
                <p class="text-red-300" v-if="isUsernameValid === 'exists' && hasFirstKeyBeenPressedUsername === true">
                    This
                    username is already taken
                </p>
                <div class="text-red-300"
                    v-if="isUsernameValid === 'invalid' && hasFirstKeyBeenPressedUsername === true">
                    <p>This username is invalid make sure:</p>
                    <ul>
                        <li>• You don't include special characters</li>
                        <li>• You don't include spaces</li>
                        <li>• Your username is at least 1 character long</li>
                    </ul>
                </div>
            </span>
            <span v-if="formInputs.username.value !== null" class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Find a strong password</label>
                <input @focus="isPasswordFocused = 'true'" @blur="isPasswordFocused = false"
                    v-model="formInputs.password.value"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="password" placeholder="Password" />
            </span>
            <span v-if="formInputs.password.value !== null" class="flex flex-col space-y-2">
                <label class="font-bold text-xl">Confirm it...</label>
                <input @focus="isPasswordConfFocused = true" @blur="isPasswordConfFocused = false"
                    v-model="formInputs.passwordconf.value"
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="password" placeholder="Password confirmation" />
                <p class="text-purple-300" v-if="doPasswordsMatch === true && isUsernameValid === 'available'">
                    Everything looks good !</p>
                <p class="text-red-300"
                    v-if="doPasswordsMatch === false">Passwords mismatch
                </p>
            </span>
            <div v-if="formInputs.passwordconf.value"
                class="bg-transparent w-[50%] text-center self-center text-xl text-purple-300 border border-purple-300 rounded p-3">
                <input v-if="!isSigningUp" :disabled="doPasswordsMatch ? false : true" class="" type="submit" value="Sign up" />
                <font-awesome-icon v-if="isSigningUp" :icon="['fas', 'fan']" class="animate-spin" />
            </div>
            <p class="text-red-300" v-if="error">An error occurred while registering :(</p>
        </span>
    </form>

</template>
<script setup >
import { ref } from 'vue';
import { doesUserExist, authenticate } from '../../api/UsersApi';
import { useAuthenticationStore } from '../../stores/AuthStore.js'
import { useRouter } from 'vue-router';

const router = useRouter()
const authenticationStore = useAuthenticationStore();
const formInputs = {
    username: ref(null),
    password: ref(null),
    passwordconf: ref(null)
}
const isUsernameFocused = ref(false);
const isUsernameValid = ref("pending");
const hasFirstKeyBeenPressedUsername = ref(false);

const isPasswordConfFocused = ref(false);
const isPasswordFocused = ref(false);
const isSigningUp = ref(false);
const error = ref(false);
const doPasswordsMatch = ref(false);
const hasFirstKeyBeenPressedPasswordConf = ref(false);

let timeSinceLastInput = setTimeout(() => null, 2000);

const verifyUsername = async () => {
    if (hasFirstKeyBeenPressedUsername.value === false) hasFirstKeyBeenPressedUsername.value = true;
    const response = await doesUserExist(formInputs.username.value);
    switch (response) {
        case 200:
            isUsernameValid.value = "available";
            break;
        case 409:
            isUsernameValid.value = "exists";
            break;
        default:
            isUsernameValid.value = "invalid"
            break;
    }
}

const verifyMatchingPasswords = () => {
    if (hasFirstKeyBeenPressedPasswordConf.value === false) hasFirstKeyBeenPressedPasswordConf.value = true;
    doPasswordsMatch.value = formInputs.password.value === formInputs.passwordconf.value ? true : false;
}

const handleKeyDown = () => {
    if (isUsernameFocused.value) {
        clearTimeout(timeSinceLastInput);
        timeSinceLastInput = setTimeout(() => verifyUsername(), 500);
    }
    if (isPasswordConfFocused.value || (isPasswordFocused.value && hasFirstKeyBeenPressedPasswordConf.value)) {
        clearTimeout(timeSinceLastInput);
        timeSinceLastInput = setTimeout(() => verifyMatchingPasswords(), 300);
    }
}

const registerUser = async () => {
    isSigningUp.value = true;
    if (formInputs.password.value !== formInputs.passwordconf.value) {
        doPasswordsMatch.value = false;
        return
    }
    const response = await authenticate({ username: formInputs.username.value, password: formInputs.password.value }, "register")
    if (response.success) {
        authenticationStore.authenticateUser(formInputs.username.value, response.token);
        router.push({ path: '/dashboard' });
    }
    else {
        isSigningUp.value = false;
        error.value = true;
    }

}

window.addEventListener("keypress", handleKeyDown);

</script>