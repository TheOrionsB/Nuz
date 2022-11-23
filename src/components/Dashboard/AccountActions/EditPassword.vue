<template>
    <div class="flex flex-col space-y-4 w-full items-center justify-center">
        <h2 class="text-2xl font-extralight w-1/2">Reset your password:</h2>
        <form @submit.prevent="submitNewPass()" class="flex flex-col space-y-2 w-1/2">
            <input v-model="oldpass"
                class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                type="password" placeholder="Old password or Recovery key" />
            <input v-model="newpass"
                class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                type="password" placeholder="New password" />
            <input v-model="newpassconf"
                class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                type="password" placeholder="Confirm new password" />
            <div
                class="bg-transparent w-[50%] self-center text-center text-lg text-purple-300 border border-purple-300 rounded p-2">
                <input v-if="isLoading === false" class="" type="submit" value="Edit password" />
                <font-awesome-icon v-if="isLoading === true" class="text-purple-300 animate-spin"
                    :icon="['fas', 'fan']" />
            </div>
            <p v-if="passMismatch" class="text-red-400">Password mismatch</p>
            <p v-if="passStatus.error.value === true" class="text-red-400">{{ passStatus.reason.value }}</p>
            <p v-if="!passStatus.error.value && passStatus.reason.value.length > 0" class="text-purple-400">
                {{ passStatus.reason.value }}</p>
        </form>
    </div>
</template>
<script setup>
import { updatePassword } from '@/api/UsersApi';
import { useToastStore } from '@/stores/ToastStore';
import { ref } from 'vue';
const passMismatch = ref(false);

const passStatus = {
    error: ref(false),
    reason: ref("")
}
const oldpass = ref("");
const newpass = ref("");
const newpassconf = ref("");
const toastStore = useToastStore();

const submitNewPass = async () => {
    if (newpass.value.length < 6) {
        passStatus.error.value = true;
        passStatus.error.reason = "Invalid new password. It should at least be 6 characters long";
    }
    if (newpass.value !== newpassconf.value) {
        passMismatch.value = true;
        return;
    } else {
        passMismatch.value = false;
        const response = await updatePassword(oldpass.value, newpass.value);
        switch (response) {
            case 401:
                toastStore.setError("Could not reset your password, either your password or recovery key is invalid.")
                break;
            case 404:
                toastStore.setError("We were unable to find your account. Log out and back it again.")
                break;
            case 200:
                toastStore.setSuccess("Password reset successfully !")
                break;
            default:
                toastStore.setError("An unknown error occurred while resetting your password.")
                break;
        }
        newpass.value = "";
        newpassconf.value = "";
        oldpass.value = "";
    }
}

const isLoading = ref(false)
</script>